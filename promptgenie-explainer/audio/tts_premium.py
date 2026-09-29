"""Regenerate the voice-over lines with a premium cloud voice.

    GOOGLE_TTS_API_KEY=...  python3 audio/tts_premium.py google [voice]      # default ar-XA-Chirp3-HD-Charon
    ELEVENLABS_API_KEY=...  python3 audio/tts_premium.py elevenlabs <voice_id>

Writes audio/vo/01.flac … 10.flac (48 kHz mono) from the plain Arabic lines below and prints
their durations; the scene timings in index.html / build_audio.py are then re-fitted to them.
"""
import base64, io, json, os, sys, urllib.request
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly

HERE = os.path.dirname(os.path.abspath(__file__))
LINES = [
    'هل كتبتَ فكرةً رائعة… لكنّ النتيجةَ جاءت عادية؟',
    'المشكلة ليست في الذكاء الاصطناعي… بل في طريقة كتابة الأمر نفسه.',
    'مع AI PromptGenie… حوِّل أيَّ فكرةٍ إلى أمرٍ احترافي في ثوانٍ.',
    'اكتب فكرتك ببساطة، ودع المارد يضيف: الدور، والهدف، والجمهور، والأسلوب.',
    'تصفّح مكتبة قوالب جاهزة لكل مجال: تسويق، وكتابة، وبرمجة، وتصميم.',
    'واستخدمه مع أدواتك المفضّلة: ChatGPT، وClaude، وGemini، وMidjourney.',
    'احفظ أوامرك المفضّلة، ونظّمها، وانسخها بنقرةٍ واحدة.',
    'ثلاث خطوات فقط: اكتب، حدّد، ثم انسخه.',
    'وقتٌ أقل… نتائج أدق… وبدون أي خبرة.',
    'جرّبه الآن… على ai-promptgenie.com',
]


def post(url, body, headers):
    req = urllib.request.Request(url, json.dumps(body).encode(), headers={'Content-Type': 'application/json', **headers})
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read()


def google(text, voice):
    key = os.environ['GOOGLE_TTS_API_KEY']
    body = {'input': {'text': text}, 'voice': {'languageCode': 'ar-XA', 'name': voice},
            'audioConfig': {'audioEncoding': 'LINEAR16', 'sampleRateHertz': 48000}}
    out = json.loads(post(f'https://texttospeech.googleapis.com/v1/text:synthesize?key={key}', body, {}))
    return sf.read(io.BytesIO(base64.b64decode(out['audioContent'])))


def elevenlabs(text, voice):
    key = os.environ['ELEVENLABS_API_KEY']
    body = {'text': text, 'model_id': 'eleven_multilingual_v2',
            'voice_settings': {'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.35, 'use_speaker_boost': True}}
    raw = post(f'https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=pcm_44100', body, {'xi-api-key': key})
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768, 44100


if __name__ == '__main__':
    engine = sys.argv[1]
    voice = sys.argv[2] if len(sys.argv) > 2 else 'ar-XA-Chirp3-HD-Charon'
    durs = {}
    for i, line in enumerate(LINES, 1):
        a, sr = (google if engine == 'google' else elevenlabs)(line, voice)
        if a.ndim > 1:
            a = a.mean(1)
        if sr != 48000:
            a = resample_poly(a, 48000, sr)
        nz = np.flatnonzero(np.abs(a) > 0.01)
        a = a[max(nz[0] - 480, 0): nz[-1] + 2400]
        sf.write(os.path.join(HERE, 'vo', f'{i:02d}.flac'), a, 48000)
        durs[i] = round(len(a) / 48000, 2)
    print(json.dumps(durs))
