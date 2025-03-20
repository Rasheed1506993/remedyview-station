
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-pharmacy-600">PharmaCare</h3>
            <p className="text-gray-600 max-w-xs">
              Providing quality healthcare products and services to our customers for over 15 years.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-pharmacy-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pharmacy-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pharmacy-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-pharmacy-600 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-pharmacy-600 transition-colors">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link to="/prescription" className="text-gray-600 hover:text-pharmacy-600 transition-colors">
                  {t('nav.prescription')}
                </Link>
              </li>
              <li>
                <Link to="/consultation" className="text-gray-600 hover:text-pharmacy-600 transition-colors">
                  {t('nav.consultation')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-pharmacy-600 transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-pharmacy-600 transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-pharmacy-600 transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-pharmacy-600 transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-pharmacy-600 mt-0.5" />
                <span className="text-gray-600">123 Pharmacy Street, Health City, 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-pharmacy-600" />
                <span className="text-gray-600">+1 234 567 8901</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-pharmacy-600" />
                <span className="text-gray-600">contact@pharmacare.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
