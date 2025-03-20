
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object - in a real app, this would be loaded from JSON files
const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.prescription': 'Upload Prescription',
    'nav.consultation': 'Consultation',
    'nav.cart': 'Cart',

    // Home page
    'home.hero.title': 'Your Health, Our Priority',
    'home.hero.subtitle': 'Quality medications and personalized care',
    'home.hero.cta': 'Browse Products',
    'home.hero.secondary': 'Consult a Pharmacist',
    'home.featured.title': 'Featured Products',
    'home.featured.viewAll': 'View All Products',
    'home.services.title': 'Our Services',
    'home.services.prescription.title': 'Prescription Fulfillment',
    'home.services.prescription.description': 'Upload your prescription and get medications delivered to your doorstep',
    'home.services.consultation.title': 'Pharmacist Consultation',
    'home.services.consultation.description': 'Get expert advice from our qualified pharmacists',
    'home.services.delivery.title': 'Fast Delivery',
    'home.services.delivery.description': 'Track your order in real-time with our delivery tracking system',
    'home.tips.title': 'Health Tips',
    'home.tips.readMore': 'Read More',

    // Products
    'products.title': 'All Products',
    'products.search': 'Search products...',
    'products.filter': 'Filter',
    'products.sort': 'Sort by',
    'products.category': 'Category',
    'products.addToCart': 'Add to Cart',
    'products.outOfStock': 'Out of Stock',
    'products.viewDetails': 'View Details',
    
    // Product Detail
    'product.details': 'Product Details',
    'product.description': 'Description',
    'product.dosage': 'Dosage',
    'product.sideEffects': 'Side Effects',
    'product.ingredients': 'Ingredients',
    'product.addToCart': 'Add to Cart',
    'product.requiresPrescription': 'Requires Prescription',

    // Prescription
    'prescription.title': 'Upload Your Prescription',
    'prescription.subtitle': 'We accept digital prescriptions for quick processing',
    'prescription.dragDrop': 'Drag and drop your prescription here or click to upload',
    'prescription.formats': 'Accepted formats: JPG, PNG, PDF (Max: 10MB)',
    'prescription.contact': 'Contact Information',
    'prescription.name': 'Full Name',
    'prescription.email': 'Email Address',
    'prescription.phone': 'Phone Number',
    'prescription.notes': 'Additional Notes',
    'prescription.submit': 'Submit Prescription',

    // Consultation
    'consultation.title': 'Pharmacist Consultation',
    'consultation.subtitle': 'Get professional advice from our expert pharmacists',
    'consultation.schedule': 'Schedule a Consultation',
    'consultation.name': 'Full Name',
    'consultation.email': 'Email Address',
    'consultation.phone': 'Phone Number',
    'consultation.topic': 'Consultation Topic',
    'consultation.message': 'Your Message',
    'consultation.submit': 'Request Consultation',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.summary': 'Order Summary',
    'checkout.subtotal': 'Subtotal',
    'checkout.shipping': 'Shipping',
    'checkout.tax': 'Tax',
    'checkout.total': 'Total',
    'checkout.payment': 'Payment Method',
    'checkout.card': 'Credit Card',
    'checkout.paypal': 'PayPal',
    'checkout.address': 'Shipping Address',
    'checkout.place': 'Place Order',

    // Footer
    'footer.about': 'About Us',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact Us',
    'footer.copyright': '© 2023 PharmaCare. All rights reserved.',
  },
  ar: {
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.prescription': 'تحميل الوصفة الطبية',
    'nav.consultation': 'استشارة',
    'nav.cart': 'سلة التسوق',

    // Home page
    'home.hero.title': 'صحتك، أولويتنا',
    'home.hero.subtitle': 'أدوية عالية الجودة ورعاية شخصية',
    'home.hero.cta': 'تصفح المنتجات',
    'home.hero.secondary': 'استشر صيدلي',
    'home.featured.title': 'منتجات مميزة',
    'home.featured.viewAll': 'عرض جميع المنتجات',
    'home.services.title': 'خدماتنا',
    'home.services.prescription.title': 'صرف الوصفات الطبية',
    'home.services.prescription.description': 'قم بتحميل وصفتك الطبية واحصل على الأدوية الموصوفة حتى باب منزلك',
    'home.services.consultation.title': 'استشارة صيدلية',
    'home.services.consultation.description': 'احصل على نصائح الخبراء من الصيادلة المؤهلين لدينا',
    'home.services.delivery.title': 'توصيل سريع',
    'home.services.delivery.description': 'تتبع طلبك في الوقت الحقيقي مع نظام تتبع التوصيل لدينا',
    'home.tips.title': 'نصائح صحية',
    'home.tips.readMore': 'اقرأ المزيد',

    // Products
    'products.title': 'جميع المنتجات',
    'products.search': 'البحث عن المنتجات...',
    'products.filter': 'تصفية',
    'products.sort': 'ترتيب حسب',
    'products.category': 'التصنيف',
    'products.addToCart': 'أضف إلى السلة',
    'products.outOfStock': 'غير متوفر',
    'products.viewDetails': 'عرض التفاصيل',
    
    // Product Detail
    'product.details': 'تفاصيل المنتج',
    'product.description': 'الوصف',
    'product.dosage': 'الجرعة',
    'product.sideEffects': 'الآثار الجانبية',
    'product.ingredients': 'المكونات',
    'product.addToCart': 'أضف إلى السلة',
    'product.requiresPrescription': 'يتطلب وصفة طبية',

    // Prescription
    'prescription.title': 'تحميل الوصفة الطبية',
    'prescription.subtitle': 'نقبل الوصفات الطبية الرقمية للمعالجة السريعة',
    'prescription.dragDrop': 'اسحب وأفلت الوصفة الطبية هنا أو انقر للتحميل',
    'prescription.formats': 'الصيغ المقبولة: JPG، PNG، PDF (الحد الأقصى: 10 ميجابايت)',
    'prescription.contact': 'معلومات الاتصال',
    'prescription.name': 'الاسم الكامل',
    'prescription.email': 'البريد الإلكتروني',
    'prescription.phone': 'رقم الهاتف',
    'prescription.notes': 'ملاحظات إضافية',
    'prescription.submit': 'إرسال الوصفة الطبية',

    // Consultation
    'consultation.title': 'استشارة صيدلية',
    'consultation.subtitle': 'احصل على نصائح مهنية من صيادلتنا الخبراء',
    'consultation.schedule': 'جدولة استشارة',
    'consultation.name': 'الاسم الكامل',
    'consultation.email': 'البريد الإلكتروني',
    'consultation.phone': 'رقم الهاتف',
    'consultation.topic': 'موضوع الاستشارة',
    'consultation.message': 'رسالتك',
    'consultation.submit': 'طلب استشارة',
    
    // Checkout
    'checkout.title': 'الدفع',
    'checkout.summary': 'ملخص الطلب',
    'checkout.subtotal': 'المجموع الفرعي',
    'checkout.shipping': 'الشحن',
    'checkout.tax': 'الضريبة',
    'checkout.total': 'الإجمالي',
    'checkout.payment': 'طريقة الدفع',
    'checkout.card': 'بطاقة ائتمان',
    'checkout.paypal': 'باي بال',
    'checkout.address': 'عنوان الشحن',
    'checkout.place': 'تقديم الطلب',

    // Footer
    'footer.about': 'من نحن',
    'footer.terms': 'الشروط والأحكام',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.contact': 'اتصل بنا',
    'footer.copyright': '© 2023 فارما كير. جميع الحقوق محفوظة.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check if there's a stored language preference
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.setAttribute('dir', newLanguage === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', newLanguage);
  };

  useEffect(() => {
    // Set the initial direction and language
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Translation function
  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
