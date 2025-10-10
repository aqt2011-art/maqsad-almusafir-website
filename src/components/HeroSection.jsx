import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '../assets/hero-kaaba.jpg';

export default function HeroSection() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="المسجد الحرام"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            مقصد المسافر
            <span className="block text-accent mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide opacity-95">حيث تلتقي الأصالة بالمستقبل</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed">
            نصمم لكم رحلات استثنائية، من روحانية الأراضي المقدسة إلى استكشاف كنوز المملكة المكنونة
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              onClick={() => scrollToSection('services')}
            >
              استكشف باقاتنا
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-bold text-lg px-8 py-6 rounded-full shadow-xl"
              onClick={() => scrollToSection('contact')}
            >
              تواصل معنا
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
}

