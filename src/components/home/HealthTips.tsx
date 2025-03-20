
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Droplets, Apple, Sun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HealthTips: React.FC = () => {
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

    document.querySelectorAll('.tip-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (index: number) => visibleItems.includes(index);

  const healthTips = [
    {
      icon: <Heart className="h-6 w-6 text-rose-500" />,
      title: {
        en: "Maintain Heart Health",
        ar: "الحفاظ على صحة القلب"
      },
      content: {
        en: "Regular exercise, a balanced diet, and proper medication can help maintain heart health and prevent cardiovascular issues.",
        ar: "التمارين المنتظمة والنظام الغذائي المتوازن والأدوية المناسبة يمكن أن تساعد في الحفاظ على صحة القلب ومنع مشاكل القلب والأوعية الدموية."
      }
    },
    {
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
      title: {
        en: "Stay Hydrated",
        ar: "حافظ على ترطيب جسمك"
      },
      content: {
        en: "Drink at least 8 glasses of water daily to maintain proper hydration, especially during hot weather or when exercising.",
        ar: "اشرب 8 أكواب على الأقل من الماء يوميًا للحفاظ على الترطيب المناسب، خاصة خلال الطقس الحار أو عند ممارسة الرياضة."
      }
    },
    {
      icon: <Apple className="h-6 w-6 text-green-500" />,
      title: {
        en: "Eat Nutritious Foods",
        ar: "تناول الأطعمة المغذية"
      },
      content: {
        en: "Include plenty of fruits, vegetables, whole grains, and lean proteins in your diet to support overall health and immune function.",
        ar: "تضمين الكثير من الفواكه والخضروات والحبوب الكاملة والبروتينات الخالية من الدهون في نظامك الغذائي لدعم الصحة العامة ووظيفة المناعة."
      }
    },
    {
      icon: <Sun className="h-6 w-6 text-yellow-500" />,
      title: {
        en: "Get Enough Vitamin D",
        ar: "احصل على ما يكفي من فيتامين د"
      },
      content: {
        en: "Spend some time outdoors in the sunlight or consider vitamin D supplements, especially during winter months with less sunshine.",
        ar: "قضاء بعض الوقت في الهواء الطلق تحت أشعة الشمس أو النظر في مكملات فيتامين د، خاصة خلال أشهر الشتاء مع أقل أشعة الشمس."
      }
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-gray-900 mb-4">{t('home.tips.title')}</h2>
          <p className="paragraph max-w-2xl mx-auto">
            Tips and advice for maintaining optimal health and wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthTips.map((tip, index) => (
            <Card 
              key={index}
              className={`tip-card h-full card-hover transform transition-all duration-500 ${
                isVisible(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              data-index={index}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="bg-gray-100 p-3 rounded-full w-fit mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{tip.title[language]}</h3>
                <p className="text-gray-600 text-sm flex-grow">{tip.content[language]}</p>
                <Link 
                  to="#" 
                  className="mt-4 text-sm text-pharmacy-600 hover:text-pharmacy-700 font-medium flex items-center"
                >
                  {t('home.tips.readMore')}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthTips;
