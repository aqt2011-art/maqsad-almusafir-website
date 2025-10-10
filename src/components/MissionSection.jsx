import { Eye, Target, Lightbulb, Award } from 'lucide-react';
import missionImage from '../assets/alula-mountains.jpg';

export default function MissionSection() {
  const features = [
    {
      icon: Eye,
      title: 'رؤيتنا',
      description: 'أن نكون الكيان الرائد والموثوق في قطاع السياحة السعودي، وأن نضع معايير جديدة للتجارب الروحانية والسياحية.'
    },
    {
      icon: Target,
      title: 'رسالتنا',
      description: 'تقديم حلول سياحية متكاملة ومبتكرة، مدعومة بمنظومة من الشراكات الاستراتيجية ونموذج تشغيلي احترافي.'
    },
    {
      icon: Lightbulb,
      title: 'منهجيتنا',
      description: 'نعتمد على التخطيط الدقيق، والشراكات الموثوقة، والتقييم المستمر لضمان تجربة استثنائية.'
    },
    {
      icon: Award,
      title: 'قيمنا',
      description: 'الاحترافية، الأمانة، الجودة، والابتكار في كل خطوة من رحلتك معنا.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">من نحن</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            نحن كيان مؤسسي متخصص في هندسة وتنظيم الرحلات السياحية في المملكة. نصمم تجارب متكاملة تجمع بين العمق الروحاني للرحلات الدينية، وثراء الاستكشاف الثقافي لمدن المملكة.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={missionImage}
                alt="السياحة في السعودية"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

