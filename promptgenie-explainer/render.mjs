// Renders index.html frame-by-frame into an MP4 (1920x1080, 30fps).
// Usage: node render.mjs [out.mp4] [--frames=t1,t2,...]   (--frames saves PNG stills instead)
// Needs Playwright (Chromium) and an ffmpeg binary (FFMPEG env var, or `ffmpeg` on PATH).
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = await import(path.join(process.env.PW_GLOBAL || '/opt/node22/lib/node_modules', 'playwright/index.mjs'))); }

const dir = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const stills = args.find(a => a.startsWith('--frames='));
const out = args.find(a => !a.startsWith('--')) || path.join(dir, 'promptgenie-explainer.mp4');
const FPS = 30;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(path.join(dir, 'index.html')).href + '?capture');
await page.evaluate(() => window.fontsReady);
await page.waitForTimeout(500);
const stage = page.locator('#stage');

if (stills) {
  for (const t of stills.slice(9).split(',').map(Number)) {
    await page.evaluate(t => window.seek(t), t);
    await stage.screenshot({ path: path.join(dir, `frame-${t}.png`) });
  }
} else {
  const duration = await page.evaluate(() => window.DURATION);
  const total = Math.round(duration * FPS);
  const ff = spawn(process.env.FFMPEG || 'ffmpeg', [
    '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < total; f++) {
    await page.evaluate(t => window.seek(t), f / FPS);
    const buf = await stage.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 150 === 0) console.log(`frame ${f}/${total}`);
  }
  ff.stdin.end();
  await new Promise((res, rej) => ff.on('close', c => c ? rej(new Error('ffmpeg exit ' + c)) : res()));
  console.log('wrote', out);
}
await browser.close();
