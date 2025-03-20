
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HealthTips from '@/components/home/HealthTips';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {user && (
        <div className="bg-primary/10 py-2 text-center">
          <p>
            مرحباً بك في نظام إدارة الصيدليات. 
            <Link to="/dashboard" className="text-primary font-medium mx-2 hover:underline">
              انتقل إلى لوحة التحكم
            </Link>
          </p>
        </div>
      )}
      
      <Hero />
      <Services />
      <FeaturedProducts />
      <HealthTips />
      
      <div className="bg-pharmacy-50 py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="heading-2 text-gray-900 mb-4">ابدأ استخدام نظام إدارة الصيدليات اليوم</h2>
          <p className="paragraph max-w-2xl mx-auto mb-8">
            وفِّر الوقت والجهد مع نظامنا المتكامل لإدارة الصيدليات، الذي يتيح لك إدارة المخزون والمبيعات والعملاء بكفاءة عالية.
          </p>
          
          {user ? (
            <Button asChild size="lg">
              <Link to="/dashboard">الذهاب إلى لوحة التحكم</Link>
            </Button>
          ) : (
            <Button asChild size="lg">
              <Link to="/auth">تسجيل الدخول / إنشاء حساب</Link>
            </Button>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
