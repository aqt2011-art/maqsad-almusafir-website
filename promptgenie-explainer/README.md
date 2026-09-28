# AI PromptGenie — فيديو موشن جرافيك تعريفي

- `promptgenie-explainer.mp4` — الفيديو النهائي (1920×1080، 30fps، 62 ثانية، بدون صوت).
- `index.html` — المصدر المتحرك؛ افتحه في المتصفح للمعاينة (المسافة = إيقاف/تشغيل، الشريط السفلي للتنقل).
- `render.mjs` — يحوّل الصفحة إلى MP4 إطاراً بإطار:

```bash
FFMPEG=/path/to/ffmpeg node render.mjs            # فيديو كامل
node render.mjs --frames=5,24,60                  # صور ثابتة للمراجعة
```

يتطلب Playwright (Chromium) وffmpeg. النصوص والخصائص موجودة مباشرة داخل `index.html`
(المشاهد s1…s10، ومصفوفتا `templates` و`models`) لتعديلها ثم إعادة التصيير.
