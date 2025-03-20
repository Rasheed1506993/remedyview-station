
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Heart, ShieldCheck, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-pharmacy-50 to-white">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className={`space-y-6 ${language === 'ar' ? 'lg:order-2' : ''}`}>
          <div className="inline-block px-3 py-1 bg-pharmacy-100 text-pharmacy-800 rounded-full text-sm font-medium animate-fade-in">
            <span className="flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1" />
              Trusted Pharmacy Services
            </span>
          </div>
          <h1 className="heading-1 text-gray-900 animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            {t('home.hero.title')}
          </h1>
          <p className="paragraph text-xl animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <Button size="lg" asChild>
              <Link to="/products" className="flex items-center">
                {t('home.hero.cta')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/consultation">
                {t('home.hero.secondary')}
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-pharmacy-600 mr-2" />
              <span className="text-sm text-gray-700">Quality Products</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-pharmacy-600 mr-2" />
              <span className="text-sm text-gray-700">Secure Ordering</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-pharmacy-600 mr-2" />
              <span className="text-sm text-gray-700">Fast Delivery</span>
            </div>
          </div>
        </div>
        
        <div className={`${language === 'ar' ? 'lg:order-1' : ''} relative`}>
          <div className="aspect-square rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-[1.02] animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <img 
              src="https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?q=80&w=1000&auto=format&fit=crop" 
              alt="Pharmacy services" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white p-4 md:p-6 rounded-xl shadow-lg animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Licensed Pharmacy</p>
                <p className="text-sm text-gray-600">All products verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
