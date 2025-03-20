
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import LanguageToggle from '@/components/ui/LanguageToggle';

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  // Close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-pharmacy-600">
            PharmaCare
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="font-medium text-gray-700 hover:text-pharmacy-600 transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/products" className="font-medium text-gray-700 hover:text-pharmacy-600 transition-colors">
            {t('nav.products')}
          </Link>
          <Link to="/prescription" className="font-medium text-gray-700 hover:text-pharmacy-600 transition-colors">
            {t('nav.prescription')}
          </Link>
          <Link to="/consultation" className="font-medium text-gray-700 hover:text-pharmacy-600 transition-colors">
            {t('nav.consultation')}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          
          <LanguageToggle />
          
          <div className="hidden md:block">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Account</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMobileMenu} 
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-white z-40 animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-xl font-medium py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/products" 
              className="text-xl font-medium py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              {t('nav.products')}
            </Link>
            <Link 
              to="/prescription" 
              className="text-xl font-medium py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              {t('nav.prescription')}
            </Link>
            <Link 
              to="/consultation" 
              className="text-xl font-medium py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              {t('nav.consultation')}
            </Link>
            <Button className="w-full mt-4" size="lg">
              <User className="h-4 w-4 mr-2" />
              <span>Account</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
