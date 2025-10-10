import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function BlogSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    package: '',
    travelers: '',
    date: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // إنشاء رسالة واتساب
    const whatsappMessage = `السلام عليكم،
    
الاسم: ${formData.name}
الهاتف: ${formData.phone}
البريد الإلكتروني: ${formData.email}
الباقة المهتم بها: ${formData.package || 'غير محدد'}
عدد المسافرين: ${formData.travelers || 'غير محدد'}
التاريخ المفضل: ${formData.date || 'غير محدد'}

الرسالة: ${formData.message || 'لا توجد رسالة إضافية'}`;

    const whatsappUrl = `https://wa.me/966552731767?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'العنوان',
      content: 'الرياض، المملكة العربية السعودية\nحي الملك فهد، شارع الأمير محمد بن عبدالعزيز'
    },
    {
      icon: Phone,
      title: 'الهاتف',
      content: '055 273 1767',
      isLtr: true
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      content: 'm.maqsid.almusafir@gmail.com'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      content: 'السبت - الخميس: 9:00 ص - 6:00 م\nخدمة العملاء: 24/7'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">تواصل معنا</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            نحن هنا لمساعدتك في كل خطوة من رحلتك. تواصل معنا للحصول على استشارة مجانية أو لحجز رحلتك القادمة
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-2xl shadow-xl border border-border animate-fade-in-up">
            <h3 className="text-2xl font-bold text-primary mb-6">أرسل لنا رسالة</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">رقم الهاتف *</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="05xxxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الباقة المهتم بها</label>
                <select
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">اختر الباقة</option>
                  <option value="باقة أفئدة">باقة أفئدة - رحلات العمرة</option>
                  <option value="باقة متنفس">باقة متنفس - السياحة الداخلية</option>
                  <option value="باقة ربيع">باقة ربيع - الشراكات المؤسسية</option>
                  <option value="باقة مخصصة">باقة مخصصة</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عدد المسافرين</label>
                  <Input
                    type="number"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    min="1"
                    className="w-full"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">التاريخ المفضل للسفر</label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">رسالتك</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Send className="ml-2 h-5 w-5" />
                إرسال عبر واتساب
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-2xl font-bold text-primary mb-6">معلومات التواصل</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">{info.title}</h4>
                      <p className={`text-muted-foreground whitespace-pre-line ${info.isLtr ? 'ltr' : ''}`}>
                        {info.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-2xl font-bold text-primary mb-6">طرق التواصل السريع</h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/966552731767?text=السلام%20عليكم،%20أود%20الاستفسار%20عن%20خدمات%20مؤسسة%20مقصد%20المسافر"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span>تواصل عبر واتساب</span>
                </a>
                <a
                  href="mailto:M.maqsid.almusafir@gmail.com?subject=استفسار%20بخصوص%20خدمات%20مقصد%20المسافر"
                  className="flex items-center justify-center gap-3 bg-card hover:bg-secondary border-2 border-border text-primary font-bold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Mail className="h-6 w-6" />
                  <span>راسلنا عبر الإيميل</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

