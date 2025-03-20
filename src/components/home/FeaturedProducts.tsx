
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ShoppingCart, PrescriptionBottle } from 'lucide-react';
import { products } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedProducts = () => {
  const { t, language } = useLanguage();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const featuredProducts = products.filter(product => product.featured);

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

    document.querySelectorAll('.product-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (index: number) => visibleItems.includes(index);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="heading-2 text-gray-900">{t('home.featured.title')}</h2>
          <Button variant="ghost" asChild>
            <Link to="/products" className="flex items-center">
              {t('home.featured.viewAll')}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className={`product-card card-hover overflow-hidden transform transition-all duration-500 ${
                isVisible(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              data-index={index}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name[language]}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
                {product.requiresPrescription && (
                  <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium flex items-center">
                    <PrescriptionBottle className="h-3 w-3 mr-1" />
                    Rx
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{product.name[language]}</h3>
                    <p className="text-pharmacy-600 font-bold">${product.price.toFixed(2)}</p>
                  </div>
                  {product.inStock ? (
                    <Button variant="ghost" size="icon" aria-label="Add to cart">
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  ) : (
                    <span className="text-sm text-red-500 font-medium">{t('products.outOfStock')}</span>
                  )}
                </div>
                <Link 
                  to={`/products/${product.slug}`} 
                  className="mt-3 text-sm text-pharmacy-600 hover:text-pharmacy-700 font-medium flex items-center"
                >
                  {t('products.viewDetails')}
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

export default FeaturedProducts;
