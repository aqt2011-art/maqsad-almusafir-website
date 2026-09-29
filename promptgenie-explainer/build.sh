#!/usr/bin/env bash
# Full pipeline: soundtrack -> silent video -> final MP4 with audio.
# Needs: node + Playwright, python3 (numpy scipy soundfile), ffmpeg (or FFMPEG=/path/to/ffmpeg).
set -euo pipefail
cd "$(dirname "$0")"
FF="${FFMPEG:-ffmpeg}"
python3 audio/build_audio.py
"$FF" -loglevel error -y -i audio/soundtrack.wav \
  -af "alimiter=limit=0.9:level=disabled,loudnorm=I=-14:TP=-1.5:LRA=9" -ar 48000 -c:a aac -b:a 192k soundtrack.m4a
FPS=60 FFMPEG="$FF" node render.mjs video-silent.mp4
# finishing: frame-blend motion blur, subtle vignette, film grain, light sharpen
"$FF" -loglevel error -y -i video-silent.mp4 -i soundtrack.m4a -map 0:v -map 1:a \
  -vf "tmix=frames=2:weights='1 1',unsharp=5:5:0.35,vignette=angle=PI/5:mode=forward,noise=alls=4:allf=t" \
  -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -r 60 -c:a copy -shortest -movflags +faststart promptgenie-explainer-mobile.mp4
rm -f video-silent.mp4
echo "done: promptgenie-explainer-mobile.mp4"
