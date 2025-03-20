
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="text-sm font-medium transition-all duration-250 hover:bg-accent"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </Button>
    </div>
  );
};

export default LanguageToggle;
