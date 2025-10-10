import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BookingModal({ isOpen, onClose, packageType }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    entityType: '',
    tripType: '',
    mealsIncluded: '',
    hotelStars: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let emailBody = `طلب حجز جديد - ${packageType}\n\n`;
    emailBody += `الاسم: ${formData.name}\n`;
    emailBody += `البريد الإلكتروني: ${formData.email}\n`;
    emailBody += `رقم الهاتف: ${formData.phone}\n`;
    
    if (packageType === 'باقة ربيع') {
      emailBody += `نوع الجهة: ${formData.entityType}\n`;
      emailBody += `نوع الرحلة: ${formData.tripType}\n`;
      emailBody += `شامل الوجبات: ${formData.mealsIncluded}\n`;
      emailBody += `الفندق: ${formData.hotelStars}\n`;
    }
    
    if (formData.message) {
      emailBody += `\nملاحظات إضافية:\n${formData.message}`;
    }

    const mailtoLink = `mailto:m.maqsid.almusafir@gmail.com?subject=طلب حجز - ${packageType}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">احجز الآن</h2>
              <p className="text-white/90 text-sm mt-1">{packageType}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* الاسم */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الاسم الكامل <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="أدخل اسمك الكامل"
            />
          </div>

          {/* البريد الإلكتروني */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="example@email.com"
            />
          </div>

          {/* رقم الهاتف */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              رقم الهاتف <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="05xxxxxxxx"
              dir="ltr"
            />
          </div>

          {/* حقول خاصة بباقة ربيع */}
          {packageType === 'باقة ربيع' && (
            <>
              {/* نوع الجهة */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  نوع الجهة <span className="text-red-500">*</span>
                </label>
                <select
                  name="entityType"
                  required
                  value={formData.entityType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">اختر نوع الجهة</option>
                  <option value="خيرية">خيرية</option>
                  <option value="مؤسسة">مؤسسة</option>
                  <option value="شركة">شركة</option>
                  <option value="جهة حكومية">جهة حكومية</option>
                </select>
              </div>

              {/* نوع الرحلة */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  نوع الرحلة <span className="text-red-500">*</span>
                </label>
                <select
                  name="tripType"
                  required
                  value={formData.tripType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">اختر نوع الرحلة</option>
                  <option value="مكة">مكة</option>
                  <option value="مكة والمدينة">مكة والمدينة</option>
                </select>
              </div>

              {/* شامل الوجبات */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  شامل الوجبات <span className="text-red-500">*</span>
                </label>
                <select
                  name="mealsIncluded"
                  required
                  value={formData.mealsIncluded}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">اختر</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
              </div>

              {/* الفندق */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  الفندق <span className="text-red-500">*</span>
                </label>
                <select
                  name="hotelStars"
                  required
                  value={formData.hotelStars}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">اختر تصنيف الفندق</option>
                  <option value="٥ نجوم">٥ نجوم</option>
                  <option value="٤ نجوم">٤ نجوم</option>
                </select>
              </div>
            </>
          )}

          {/* ملاحظات إضافية */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ملاحظات إضافية
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              placeholder="أي ملاحظات أو طلبات خاصة..."
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="ml-2 h-5 w-5" />
              إرسال الطلب
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="px-8 py-6 rounded-xl font-bold"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

