import { Heart } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-6">
          {/* Logo and Title */}
          <div className="flex flex-col items-center">
            <div className="bg-white p-3 rounded-lg mb-4">
              <img src={logo} alt="مقصد المسافر" className="h-20 w-auto" />
            </div>
            <h3 className="text-2xl font-bold mb-2">مؤسسة مقصد المسافر</h3>
            <p className="text-white/80">حيث تلتقي الأصالة بالمستقبل</p>
          </div>

          {/* Divider */}
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <button
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-accent transition-colors"
            >
              الرئيسية
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-accent transition-colors"
            >
              من نحن
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-accent transition-colors"
            >
              خدماتنا
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-accent transition-colors"
            >
              تواصل معنا
            </button>
          </div>

          {/* Contact Info */}
          <div className="text-sm text-white/80 space-y-2">
            <p>الهاتف: 055 273 1767</p>
            <p>البريد الإلكتروني: m.maqsid.almusafir@gmail.com</p>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-white/20">
            <p className="text-sm text-white/70 flex items-center justify-center gap-2">
              © {currentYear} مؤسسة مقصد المسافر. جميع الحقوق محفوظة
              <Heart className="h-4 w-4 text-accent fill-accent" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

