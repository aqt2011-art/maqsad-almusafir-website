"""Re-time scenes, captions and SFX to the durations of audio/vo/*.flac.

Scenes only ever grow (their animations are authored for a minimum length); each scene must
hold its voice line (start offset + duration + tail). Patches ../index.html and build_audio.py.
"""
import os, re, glob
import soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
IDX = os.path.join(HERE, '..', 'index.html')
BLD = os.path.join(HERE, 'build_audio.py')
MIN_LEN = [5.8, 6.8, 9.6, 8.2, 7.8, 7.6, 6.4, 5.0, 4.7, 7.0]     # authored minimum scene lengths
VO_OFFSET = [0.5, 0.3, 2.6, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.4]    # voice start inside its scene
TAIL = 0.6
LOGO_OFF, CTA_OFF = 1.35, 0.5                                     # hits inside s3 / s10 (before offset)

durs = [round(sf.info(f).duration, 2) for f in sorted(glob.glob(os.path.join(HERE, 'vo', '[0-9][0-9].flac')))]
assert len(durs) == 10, 'need 10 voice lines'
lens = [max(m, o + d + TAIL) for m, o, d in zip(MIN_LEN, VO_OFFSET, durs)]
starts = [round(sum(lens[:i]), 2) for i in range(10)]
total = round(sum(lens), 2)
vo_starts = [round(s + o, 2) for s, o in zip(starts, VO_OFFSET)]
logo, cta = round(starts[2] + 1.35, 2), round(starts[9] + 0.5, 2)
logo = round(starts[2] + 1.35, 2)

s = open(IDX, encoding='utf8').read()
tl = ',\n  '.join(', '.join(f"['s{i+1}', {starts[i]}, {round(starts[i]+lens[i], 2)}]" for i in range(a, b)) for a, b in ((0, 5), (5, 10)))
s = re.sub(r"const TL = \[.*?\];", f"const TL = [\n  {tl},\n];", s, flags=re.S)
s = re.sub(r"const DURATION = [\d.]+;", f"const DURATION = {total};", s)
s = re.sub(r"const LOGO_HIT = [\d.]+, CTA_HIT = [\d.]+;", f"const LOGO_HIT = {logo}, CTA_HIT = {cta};", s)
i = [0]
def vo_line(m):
    k = i[0]; i[0] += 1
    return f"  [{vo_starts[k]}, {durs[k]}, {m.group(1)}]"
s = re.sub(r"  \[[\d.]+, [\d.]+, ('.*?')\](?=,)", vo_line, s)
open(IDX, 'w', encoding='utf8').write(s)

b = open(BLD).read()
b = re.sub(r"DUR = [\d.]+ \+ 0\.5", f"DUR = {total} + 0.5", b)
b = re.sub(r"SCENES = \[.*?\]", f"SCENES = {starts}", b)
b = re.sub(r"VO_STARTS = \[.*?\]", f"VO_STARTS = {vo_starts}", b)
b = re.sub(r"LOGO_HIT, CTA_HIT = [\d.]+, [\d.]+", f"LOGO_HIT, CTA_HIT = {logo}, {cta}", b)
open(BLD, 'w').write(b)
print('scenes', starts, 'total', total, 'logo', logo, 'cta', cta)
