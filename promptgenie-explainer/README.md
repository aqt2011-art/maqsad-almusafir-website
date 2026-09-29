# AI PromptGenie — فيديو موشن جرافيك تعريفي (نسخة الجوال)

- `promptgenie-explainer-mobile.mp4` — الفيديو النهائي: 1080×1920 (9:16)، 60fps، 69 ثانية، مع شخصية المارد المتحركة، وتعليق صوتي عربي، وموسيقى ومؤثرات، وترجمة نصية متزامنة.
- `index.html` — مصدر الأنيميشن (10 مشاهد). افتحه في المتصفح للمعاينة: المسافة = إيقاف/تشغيل، M أو النقر = تشغيل الصوت.
- `audio/vo/*.flac` — سطور التعليق الصوتي (نص مشكول في `audio/vo-script.txt`، مولّدة محلياً بصوت Piper ar_JO-kareem مع معالجة صوت المعلّق، ومُتحقَّق من نطقها بـ Whisper).
- `audio/build_audio.py` — يولّد الموسيقى والمؤثرات برمجياً ويمزجها مع التعليق مع خفض الموسيقى تحت الصوت.
- `render.mjs` — يحوّل الصفحة إلى فيديو إطاراً بإطار (Playwright).

```bash
FFMPEG=/path/to/ffmpeg ./build.sh          # بناء كامل: صوت + فيديو + دمج
node render.mjs --frames=5,24,60          # صور ثابتة للمراجعة
```

التوقيتات موجودة في `TL` و`VO` داخل `index.html` وفي `SCENES`/`VO_STARTS` داخل `build_audio.py` — عدّلهما معاً.

## استبدال التعليق الصوتي بصوت آخر
```bash
python3 audio/import_vo.py <مجلد فيه 01.wav … 10.wav>   # معالجة الصوت (قصّ الصمت + سلسلة معلّق إعلاني)
python3 audio/fit_vo.py                                  # إعادة ضبط المشاهد والترجمة والمؤثرات على مدد الصوت الجديد
FFMPEG=/path/to/ffmpeg ./build.sh                        # الإخراج النهائي
```
نصوص الأسطر العشرة في `audio/tts_premium.py` (LINES) وتوليد Higgsfield كان بصوت seed_audio.
