"""Synthesises the soundtrack: music bed + SFX synced to the animation + voice-over, ducked and mixed.

Output: audio/soundtrack.wav (48 kHz stereo). Timings mirror TL / VO in ../index.html.
Requires numpy, scipy, soundfile.
"""
import os
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt, fftconvolve

HERE = os.path.dirname(os.path.abspath(__file__))
SR = 48000
DUR = 68.9 + 0.5
N = int(DUR * SR)
rng = np.random.default_rng(7)

SCENES = [0, 5.8, 12.6, 22.2, 30.4, 38.2, 45.8, 52.2, 57.2, 61.9]
VO_STARTS = [0.5, 6.1, 15.2, 22.6, 30.7, 38.5, 46.1, 52.5, 57.5, 62.3]
LOGO_HIT, CTA_HIT = 13.95, 62.4


def t_(n):
    return np.arange(n) / SR


def filt(x, kind, f, order=2):
    return sosfilt(butter(order, f, btype=kind, fs=SR, output='sos'), x)


def place(buf, x, at, gain=1.0):
    i = int(at * SR)
    if i >= len(buf):
        return
    x = x[: len(buf) - i]
    buf[i:i + len(x)] += x * gain


def note(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


# ---------------------------------------------------------------- instruments
def kick():
    t = t_(int(.45 * SR))
    f = 44 + 90 * np.exp(-t / .035)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.tanh(1.6 * np.sin(ph) * np.exp(-t / .22)) + .3 * np.exp(-t / .004) * rng.standard_normal(len(t))


def clap():
    t = t_(int(.35 * SR))
    n = filt(rng.standard_normal(len(t)), 'bandpass', [900, 3200])
    e = sum(np.exp(-np.clip(t - d, 0, None) / .012) * (t >= d) for d in (0, .012, .024)) * .6 + np.exp(-t / .13) * .6
    return n * e


def hat(open_=False):
    t = t_(int((.25 if open_ else .06) * SR))
    return filt(rng.standard_normal(len(t)), 'highpass', 7500) * np.exp(-t / (.09 if open_ else .018))


def pluck(f, d=.4):
    t = t_(int(d * SR))
    x = np.sin(2 * np.pi * f * t) + .45 * np.sin(4 * np.pi * f * t) + .2 * np.sin(6 * np.pi * f * t)
    return x * np.exp(-t / .11) * (1 - np.exp(-t / .002))


def saw(f, n, det=0.0):
    ph = (np.arange(n) * f * (1 + det) / SR) % 1.0
    return 2 * ph - 1


def pad_chord(freqs, d):
    n = int(d * SR)
    x = sum(saw(f, n, dt) for f in freqs for dt in (-.004, .004)) / (2 * len(freqs))
    x = filt(x, 'lowpass', 1400)
    t = t_(n)
    return x * np.minimum(1, t / .25) * np.minimum(1, (d - t) / .25)


def bass(f, d):
    t = t_(int(d * SR))
    return np.tanh(2 * np.sin(2 * np.pi * f * t)) * np.exp(-t / .22) * (1 - np.exp(-t / .003))


# ---------------------------------------------------------------- sfx
def whoosh(d=.7, up=True):
    n = int(d * SR)
    t = t_(n)
    x = rng.standard_normal(n)
    lo, hi = filt(x, 'lowpass', 900), filt(x, 'bandpass', [1500, 6000])
    k = t / d if up else 1 - t / d
    return (lo * (1 - k) + hi * k) * np.sin(np.pi * t / d) ** 2


def riser(d=1.5):
    n = int(d * SR)
    t = t_(n)
    f = 200 + 1400 * (t / d) ** 2
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * .25
    return (filt(rng.standard_normal(n), 'highpass', 2000) * .7 + s) * (t / d) ** 2.2


def impact():
    t = t_(int(2.2 * SR))
    f = 32 + 60 * np.exp(-t / .08)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .6)
    crash = filt(rng.standard_normal(len(t)), 'highpass', 3000) * np.exp(-t / .5) * .35
    return np.tanh(1.4 * boom) + crash


def sparkle(n=9, spread=.6):
    out = np.zeros(int((spread + .6) * SR))
    scale = [81, 84, 86, 88, 91, 93, 96, 98]
    for i in range(n):
        f = note(scale[rng.integers(len(scale))])
        t = t_(int(.5 * SR))
        x = np.sin(2 * np.pi * f * t) * np.exp(-t / .15)
        place(out, x, i * spread / n, .5)
    return out


def pop(f0=520, f1=980):
    t = t_(int(.12 * SR))
    f = f0 + (f1 - f0) * np.minimum(1, t / .05)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .045)


def click():
    t = t_(int(.03 * SR))
    return filt(rng.standard_normal(len(t)), 'highpass', 2500) * np.exp(-t / .004) + np.sin(2 * np.pi * 1800 * t) * np.exp(-t / .006) * .5


def thud():
    t = t_(int(.4 * SR))
    return np.sin(2 * np.pi * (70 + 60 * np.exp(-t / .03)) * t) * np.exp(-t / .12) + filt(rng.standard_normal(len(t)), 'lowpass', 1500) * np.exp(-t / .03) * .4


def ding():
    t = t_(int(1.0 * SR))
    return (np.sin(2 * np.pi * 1318.5 * t) + .6 * np.sin(2 * np.pi * 1975.5 * t)) * np.exp(-t / .3) * .6


def swipe():
    t = t_(int(.25 * SR))
    return filt(rng.standard_normal(len(t)), 'bandpass', [2000, 7000]) * np.sin(np.pi * t / .25)


# ---------------------------------------------------------------- music bed
BPM = 110
BEAT = 60 / BPM
BAR = 4 * BEAT
CHORDS = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]   # Am F C G
ROOTS = [45, 41, 36, 43]

drums, basses, pads, arps = (np.zeros(N) for _ in range(4))
full_from, full_to = LOGO_HIT, CTA_HIT - .5
bar_i, tb = 0, 0.0
while tb < DUR:
    ch = CHORDS[bar_i % 4]
    place(pads, pad_chord([note(m) for m in ch] + [note(ch[0] + 12)], BAR + .3), tb)
    for b in range(8):            # eighth notes
        at = tb + b * BEAT / 2
        full = full_from <= at < full_to
        arp_n = ch[[0, 1, 2, 1][b % 4]] + 12 + (12 if b >= 4 and full else 0)
        if at >= 1.0:
            place(arps, pluck(note(arp_n)), at, .5 if full else .35)
        if full:
            place(basses, bass(note(ROOTS[bar_i % 4]), BEAT / 2), at + (0 if b % 2 == 0 else 0), .9 if b % 2 == 0 else .55)
            place(drums, hat(open_=(b % 2 == 1)), at, .18 if b % 2 == 0 else .12)
            if b % 2 == 0:
                place(drums, kick(), at, .9)
            if b in (2, 6):
                place(drums, clap(), at, .45)
        elif 5.8 <= at < LOGO_HIT and b % 2 == 1:
            place(drums, hat(), at, .1)
    bar_i += 1
    tb += BAR

# sidechain pump from the kick grid
t = t_(N)
since = (t - full_from) % BEAT
pump = np.where((t >= full_from) & (t < full_to), 1 - .55 * np.exp(-since / .09), 1.0)
pads *= pump
basses *= pump

music = drums + basses * .55 + pads * .5 + arps * .35
# breathe out the bed before the logo hit and the CTA hit
for hit in (LOGO_HIT, CTA_HIT):
    m = (t > hit - 1.2) & (t < hit)
    music[m] *= np.linspace(1, .25, m.sum())
music *= np.minimum(1, t / 1.0) * np.clip((DUR - t) / 2.5, 0, 1)
ir = rng.standard_normal(int(1.4 * SR)) * np.exp(-t_(int(1.4 * SR)) / .35)
ir = filt(ir, 'lowpass', 5000)
music = music + fftconvolve(music, ir)[:N] * .012

# ---------------------------------------------------------------- sfx track
def crash():
    t = t_(int(2.5 * SR))
    return filt(rng.standard_normal(len(t)), 'highpass', 4000) * np.exp(-t / .7) * .6


def snare_roll(d=1.0):
    out = np.zeros(int((d + .3) * SR))
    n = 16
    for i in range(n):
        at = d * (1 - (1 - i / n) ** 1.6)
        place(out, clap(), at, .15 + .5 * i / n)
    return out


def magic_rise(d=1.0):
    n = int(d * SR)
    t = t_(n)
    f = 400 * 2 ** (2.5 * t / d)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * .25 + filt(rng.standard_normal(n), 'bandpass', [3000, 9000]) * .4
    return x * np.sin(np.pi * t / d) ** 1.5


def crackle(d=1.5, n=60):
    out = np.zeros(int((d + .1) * SR))
    for _ in range(n):
        place(out, click(), rng.uniform(0, d) ** 1.3 / d ** .3, rng.uniform(.1, .35))
    return out


S = dict(zip(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10'], SCENES))
sfx = np.zeros(N)
for a in SCENES[1:]:
    place(sfx, whoosh(.7), a - .45, .5)
place(sfx, riser(1.6), LOGO_HIT - 1.6, .45)
place(sfx, snare_roll(1.0), LOGO_HIT - 1.0, .5)
place(sfx, riser(1.2), CTA_HIT - 1.2, .35)
place(sfx, snare_roll(.9), CTA_HIT - .9, .45)
for hit in (LOGO_HIT, CTA_HIT):
    place(sfx, impact(), hit, .9)
    place(sfx, crash(), hit, .6)
place(sfx, sparkle(12, .8), LOGO_HIT + .05, .6)
place(sfx, sparkle(10, .7), CTA_HIT + .05, .5)
for i in range(21):                                   # typing, scene 1 & 4
    place(sfx, click(), .35 + i * 1.2 / 21 + rng.uniform(-.01, .01), .25)
    place(sfx, click(), S['s4'] + .6 + i * 1.1 / 21 + rng.uniform(-.01, .01), .2)
place(sfx, pop(400, 700), 2.4, .35)
place(sfx, thud(), 3.5, .7)
place(sfx, swipe(), S['s2'] + 3.0, .45)              # strike-through
place(sfx, sparkle(5, .3), S['s2'] + 4.9, .35)       # underline
place(sfx, whoosh(.5), S['s3'] + .6, .25)            # lamp rub
place(sfx, magic_rise(1.1), S['s3'] + 1.4, .5)       # genie appears
place(sfx, sparkle(6, .4), S['s3'] + 2.4, .35)       # genie wave
place(sfx, whoosh(.6), S['s3'] + 2.9 - .3, .3)       # wordmark in
place(sfx, sparkle(8, .5), S['s4'] + 2.0, .4)        # wand
for at in (3.6, 4.4, 5.2, 6.1, 6.8):
    place(sfx, pop(), S['s4'] + at, .3)
    for k in range(8):
        place(sfx, click(), S['s4'] + at + .15 + k * .07, .08)
for i in range(8):
    place(sfx, pop(600 + i * 40, 1000 + i * 40), S['s5'] + .8 + i * .1, .18)
for at in (3.55, 4.35, 5.25, 6.15):
    place(sfx, click(), S['s5'] + at, .5)
for at in (3.1, 4.2, 5.1, 6.0, 6.6, 6.8):
    place(sfx, pop(450, 900), S['s6'] + at, .3)
for i in range(3):
    place(sfx, sparkle(3, .15), S['s7'] + 1.4 + i * .2, .25)
place(sfx, click(), S['s7'] + 2.5, .4)
place(sfx, click(), S['s7'] + 4.1, .6)
place(sfx, ding(), S['s7'] + 4.3, .45)
for at in (1.9, 2.6, 3.3):
    place(sfx, pop(300, 800), S['s8'] + at, .4)
for at in (.3, 1.4, 2.5):
    place(sfx, whoosh(.4), S['s9'] + at - .2, .3)
    place(sfx, pop(500, 1100), S['s9'] + at + .2, .25)
place(sfx, magic_rise(.9), S['s10'] + .3, .35)       # genie returns
place(sfx, crackle(1.6), CTA_HIT + .1, .5)           # confetti
place(sfx, pop(350, 900), S['s10'] + 1.8, .4)

# ---------------------------------------------------------------- voice-over
vo = np.zeros(N)
for i, at in enumerate(VO_STARTS, 1):
    x, sr = sf.read(os.path.join(HERE, 'vo', f'{i:02d}.flac'))
    assert sr == SR
    place(vo, x / (np.abs(x).max() + 1e-9), at, .9)

# duck music under the voice (smoothed envelope follower)
env = np.abs(vo)
env = filt(env, 'lowpass', 6)
env = np.clip(env / (env.max() + 1e-9) * 4, 0, 1)
duck = 1 - .5 * env
music_d = music * duck


def stereo(x, width_ms=0.0, pan=0.0):
    d = int(width_ms / 1000 * SR)
    l = x * (1 - max(pan, 0))
    r = np.concatenate([np.zeros(d), x[:len(x) - d]]) * (1 + min(pan, 0)) if d else x * (1 + min(pan, 0))
    return np.stack([l, r], 1)


mix = stereo(music_d * .3, 9) + stereo(sfx * .35, 4) + stereo(vo)
mix /= np.abs(mix).max() / .95
sf.write(os.path.join(HERE, 'soundtrack.wav'), mix.astype(np.float32), SR)
print('soundtrack.wav', round(len(mix) / SR, 2), 's')
