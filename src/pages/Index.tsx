
import React, { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Services from '@/components/home/Services';
import HealthTips from '@/components/home/HealthTips';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <Services />
        <HealthTips />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
