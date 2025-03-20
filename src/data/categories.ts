
export type Category = {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  image: string;
};

export const categories: Category[] = [
  {
    id: 'prescription-drugs',
    name: {
      en: 'Prescription Drugs',
      ar: 'أدوية الوصفات الطبية'
    },
    slug: 'prescription-drugs',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'otc-drugs',
    name: {
      en: 'Over-the-Counter',
      ar: 'أدوية بدون وصفة طبية'
    },
    slug: 'otc-drugs',
    image: 'https://images.unsplash.com/photo-1560136683-0b89a2a1715e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'vitamins',
    name: {
      en: 'Vitamins & Supplements',
      ar: 'فيتامينات ومكملات'
    },
    slug: 'vitamins',
    image: 'https://images.unsplash.com/photo-1577277625082-36df4a33d5ed?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'first-aid',
    name: {
      en: 'First Aid',
      ar: 'الإسعافات الأولية'
    },
    slug: 'first-aid',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'personal-care',
    name: {
      en: 'Personal Care',
      ar: 'العناية الشخصية'
    },
    slug: 'personal-care',
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'baby-mother',
    name: {
      en: 'Baby & Mother Care',
      ar: 'رعاية الأم والطفل'
    },
    slug: 'baby-mother',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b40?q=80&w=1000&auto=format&fit=crop'
  }
];
