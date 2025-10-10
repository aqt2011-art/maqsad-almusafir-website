import { Handshake, Hotel, Utensils, Heart, BookOpen, Briefcase } from 'lucide-react';

export default function VolunteerSection() {
  const partners = [
    {
      icon: Briefcase,
      title: 'الشماسي',
      description: 'شريك أساسي لتوفير حقائب الإحرام ومستلزمات السفر عالية الجودة.'
    },
    {
      icon: Hotel,
      title: 'فنادق مكة والمدينة',
      description: 'شراكة مع أفضل الفنادق القريبة من الحرمين الشريفين.'
    },
    {
      icon: Utensils,
      title: 'متعهدو التغذية',
      description: 'تعاون مع أفضل مقدمي خدمات الطعام الحلال والصحي.'
    },
    {
      icon: Heart,
      title: 'الجمعيات الخيرية',
      description: 'شراكة لدعم ذوي الدخل المحدود والفئات المستحقة.'
    },
    {
      icon: BookOpen,
      title: 'مكاتب الدعوة',
      description: 'تعاون لإعداد برامج خاصة للمسلمين الجدد.'
    },
    {
      icon: Handshake,
      title: 'شركاء استراتيجيون',
      description: 'شبكة واسعة من الشركاء لضمان أفضل الخدمات.'
    }
  ];

  return (
    <section id="partners" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">شركاؤنا الاستراتيجيون</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            نعتمد على شبكة قوية من الشراكات الاستراتيجية لضمان تقديم خدمات عالية الجودة
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <partner.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{partner.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

