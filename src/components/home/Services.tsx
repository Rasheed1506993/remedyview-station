
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { PrescriptionBottle, UserRound, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.service-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (index: number) => visibleItems.includes(index);

  const services = [
    {
      icon: <PrescriptionBottle className="h-8 w-8 text-pharmacy-600" />,
      title: t('home.services.prescription.title'),
      description: t('home.services.prescription.description'),
      link: '/prescription'
    },
    {
      icon: <UserRound className="h-8 w-8 text-pharmacy-600" />,
      title: t('home.services.consultation.title'),
      description: t('home.services.consultation.description'),
      link: '/consultation'
    },
    {
      icon: <Truck className="h-8 w-8 text-pharmacy-600" />,
      title: t('home.services.delivery.title'),
      description: t('home.services.delivery.description'),
      link: '/products'
    }
  ];

  return (
    <section className="py-16 bg-pharmacy-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-gray-900 mb-4">{t('home.services.title')}</h2>
          <p className="paragraph max-w-2xl mx-auto">
            We provide comprehensive pharmacy services to meet all your healthcare needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link to={service.link} key={index}>
              <Card 
                className={`service-card h-full card-hover bg-white border-none shadow-sm hover:shadow-md transform transition-all duration-500 ${
                  isVisible(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-index={index}
              >
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="bg-pharmacy-100 p-4 rounded-full mb-5">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
