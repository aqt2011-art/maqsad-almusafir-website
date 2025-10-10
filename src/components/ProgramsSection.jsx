import { Church, Mountain, Users, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProgramsSection() {
  const programs = [
    {
      icon: Church,
      title: 'باقة أفئدة',
      subtitle: 'رحلات العمرة الروحانية',
      description: 'رحلة روحانية متكاملة إلى مكة والمدينة، مصممة لتوفير تجربة إيمانية عميقة مع أعلى مستويات الراحة والاحترافية.',
      features: [
        'إقامة فندقية فاخرة قريبة من الحرمين',
        'نقل مريح ومكيف طوال الرحلة',
        'وجبات صحية متنوعة',
        'مرشدون دينيون متخصصون',
        'زيارات للمعالم الدينية والتاريخية',
        'برامج توعوية وإرشادية'
      ],
      color: 'from-primary to-primary/80',
      featured: true
    },
    {
      icon: Mountain,
      title: 'باقة متنفس',
      subtitle: 'السياحة الداخلية',
      description: 'استكشف جمال المملكة من خلال رحلات سياحية منظمة إلى أجمل الوجهات السعودية، من الجبال الشامخة إلى الشواطئ الساحرة.',
      features: [
        'جولات سياحية منظمة',
        'إقامة في أفضل المنتجعات',
        'أنشطة ترفيهية متنوعة',
        'مرشدون سياحيون محترفون',
        'تجارب ثقافية أصيلة',
        'تصوير احترافي للذكريات'
      ],
      color: 'from-accent to-accent/80',
      featured: false
    },
    {
      icon: Users,
      title: 'باقة ربيع',
      subtitle: 'الشراكات المؤسسية',
      description: 'حلول سياحية مخصصة للمؤسسات والشركات، مع إمكانية التخصيص الكامل حسب احتياجاتكم وميزانيتكم.',
      features: [
        'تخطيط مخصص حسب الطلب',
        'أسعار تنافسية للمجموعات',
        'مرونة في التواريخ والبرامج',
        'خدمات VIP متميزة',
        'تقارير تفصيلية بعد الرحلة',
        'دعم فني على مدار الساعة'
      ],
      color: 'from-primary/70 to-accent/70',
      featured: false
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">خدماتنا المتميزة</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">باقات مصممة لكل رحلة</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            اختر الباقة المناسبة لك ودعنا نصنع لك تجربة لا تُنسى
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up ${
                program.featured ? 'lg:scale-105 border-2 border-accent' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {program.featured && (
                <div className="absolute top-4 left-4 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                  الأكثر طلباً
                </div>
              )}

              {/* Header with Gradient */}
              <div className={`bg-gradient-to-br ${program.color} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                    <program.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                  <p className="text-white/90 text-sm">{program.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {program.description}
                </p>

                <div className="space-y-3 mb-8">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <Check className="h-5 w-5 text-accent" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={scrollToContact}
                >
                  احجز الآن
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

