"""Master raw voice-over takes and drop them into audio/vo/.

    python3 audio/import_vo.py <folder with 01.wav … 10.wav> [--pitch 0.96]

Trims silence, EQ + de-ess + compress (announcer chain), writes 48 kHz mono FLAC to audio/vo/.
Then run:  python3 audio/fit_vo.py   to re-time scenes, captions and SFX to the new durations.
"""
import os, subprocess, sys, glob

HERE = os.path.dirname(os.path.abspath(__file__))
FF = os.environ.get('FFMPEG', 'ffmpeg')
src = sys.argv[1]
pitch = sys.argv[sys.argv.index('--pitch') + 1] if '--pitch' in sys.argv else '1.0'
CHAIN = (
    "silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
    "silenceremove=start_periods=1:start_threshold=-45dB,areverse,aresample=48000,"
    f"{'rubberband=pitch=' + pitch + ',' if pitch != '1.0' else ''}"
    "highpass=f=75,equalizer=f=130:t=q:w=1:g=3,equalizer=f=320:t=q:w=1.2:g=-2.5,"
    "equalizer=f=3200:t=q:w=1.2:g=3,equalizer=f=10000:t=q:w=1:g=2,deesser=i=0.4,"
    "acompressor=threshold=-22dB:ratio=3.5:attack=4:release=90:makeup=5,"
    "acompressor=threshold=-10dB:ratio=8:attack=1:release=40,aecho=0.85:0.6:28|47:0.10|0.07"
)
for f in sorted(glob.glob(os.path.join(src, '[0-9][0-9].*'))):
    n = os.path.basename(f)[:2]
    subprocess.run([FF, '-loglevel', 'error', '-y', '-i', f, '-af', CHAIN, '-ac', '1', os.path.join(HERE, 'vo', f'{n}.flac')], check=True)
    print('mastered', n)
