import { TrendingUp, Users, Heart, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function StatCard({ icon: Icon, value, label, suffix = '', delay = 0 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className="bg-card p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 shadow-lg">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
          {count.toLocaleString('ar-SA')}
          {suffix && <span className="text-accent">{suffix}</span>}
        </div>
        <p className="text-muted-foreground font-medium">{label}</p>
      </div>
    </div>
  );
}

export default function WhyChooseUsSection() {
  const stats = [
    { icon: Heart, value: 96.4, label: 'رضا العملاء', suffix: '%' },
    { icon: Users, value: 500, label: 'مستفيد', suffix: '+' },
    { icon: TrendingUp, value: 30, label: 'رحلة ناجحة', suffix: '+' },
    { icon: Star, value: 100, label: 'تقييم التنظيم', suffix: '%' }
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">أثرنا بالأرقام</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            نفخر بثقة عملائنا ونسعى دائماً لتقديم أفضل الخدمات
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">قصص ملهمة من عملائنا</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: 'تجربة رائعة ومنظمة بشكل احترافي. الفريق متعاون والخدمات متميزة. أنصح الجميع بالتعامل مع مقصد المسافر.',
                author: 'أحمد العتيبي',
                role: 'رحلة عمرة'
              },
              {
                text: 'الأجواء الإيمانية والراحة النفسية التي شعرنا بها لا توصف. شكراً لمقصد المسافر على هذه الفرصة العظيمة.',
                author: 'فاطمة السالم',
                role: 'رحلة عمرة عائلية'
              },
              {
                text: 'كعائلة، كنا نبحث عن رحلة مريحة ومنظمة. لقد فاق فريق مقصد توقعاتنا. نشكركم من القلب.',
                author: 'عائلة الشمري',
                role: 'رحلة سياحية'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-lg border-r-4 border-primary hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <p className="text-muted-foreground italic mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-primary">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

