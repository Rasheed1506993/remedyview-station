
import { categories } from './categories';

export type Product = {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  description: {
    en: string;
    ar: string;
  };
  price: number;
  categoryId: string;
  image: string;
  dosage?: {
    en: string;
    ar: string;
  };
  sideEffects?: {
    en: string;
    ar: string;
  };
  ingredients?: {
    en: string;
    ar: string;
  };
  requiresPrescription: boolean;
  inStock: boolean;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: 'amoxicillin-500mg',
    name: {
      en: 'Amoxicillin 500mg',
      ar: 'أموكسيسيلين 500 مج'
    },
    slug: 'amoxicillin-500mg',
    description: {
      en: 'Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.',
      ar: 'أموكسيسيلين هو مضاد حيوي من البنسلين يحارب البكتيريا. يستخدم لعلاج أنواع مختلفة من العدوى التي تسببها البكتيريا، مثل التهاب اللوزتين والتهاب الشعب الهوائية والالتهاب الرئوي والتهابات الأذن والأنف والحلق والجلد أو المسالك البولية.'
    },
    price: 15.99,
    categoryId: 'prescription-drugs',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop',
    dosage: {
      en: 'Adults and children weighing 40 kg or more: 250-500 mg every 8 hours, or 500-875 mg every 12 hours.',
      ar: 'البالغين والأطفال الذين يزنون 40 كجم أو أكثر: 250-500 ملغ كل 8 ساعات، أو 500-875 ملغ كل 12 ساعة.'
    },
    sideEffects: {
      en: 'Diarrhea, nausea, vomiting, stomach pain, vaginal itching or discharge, headache, swollen, black, or "hairy" tongue.',
      ar: 'الإسهال، الغثيان، القيء، آلام المعدة، حكة مهبلية أو إفرازات، صداع، تورم، اسوداد، أو لسان "شعري".'
    },
    ingredients: {
      en: 'Active ingredient: Amoxicillin trihydrate. Inactive ingredients: Colloidal silicon dioxide, crospovidone, flavor, magnesium stearate, microcrystalline cellulose.',
      ar: 'المكون النشط: أموكسيسيلين ثلاثي الماء. المكونات غير النشطة: ثاني أكسيد السيليكون الغروي، كروسبوفيدون، نكهة، ستيرات المغنيسيوم، سليلوز دقيق البلورات.'
    },
    requiresPrescription: true,
    inStock: true,
    featured: true
  },
  {
    id: 'ibuprofen-200mg',
    name: {
      en: 'Ibuprofen 200mg',
      ar: 'إيبوبروفين 200 مج'
    },
    slug: 'ibuprofen-200mg',
    description: {
      en: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID). It works by reducing hormones that cause inflammation and pain in the body. Ibuprofen is used to reduce fever and treat pain or inflammation caused by many conditions such as headache, toothache, back pain, arthritis, menstrual cramps, or minor injury.',
      ar: 'إيبوبروفين هو دواء مضاد للالتهابات غير ستيرويدي (NSAID). يعمل عن طريق تقليل الهرمونات التي تسبب الالتهاب والألم في الجسم. يستخدم الإيبوبروفين لتقليل الحمى وعلاج الألم أو الالتهاب الناجم عن العديد من الحالات مثل الصداع وآلام الأسنان وآلام الظهر والتهاب المفاصل وتشنجات الدورة الشهرية أو الإصابات الطفيفة.'
    },
    price: 8.99,
    categoryId: 'otc-drugs',
    image: 'https://images.unsplash.com/photo-1626716493697-dfb3c8c34135?q=80&w=1000&auto=format&fit=crop',
    dosage: {
      en: 'Adults and children over 12 years: 200-400 mg every 4-6 hours as needed. Do not exceed 1200 mg in 24 hours.',
      ar: 'البالغين والأطفال فوق 12 سنة: 200-400 ملغ كل 4-6 ساعات حسب الحاجة. لا تتجاوز 1200 ملغ في 24 ساعة.'
    },
    sideEffects: {
      en: 'Upset stomach, mild heartburn, diarrhea, constipation, bloating, gas, dizziness, headache, nervousness, rash, blurred vision.',
      ar: 'اضطراب المعدة، حرقة معدة خفيفة، إسهال، إمساك، انتفاخ، غازات، دوخة، صداع، توتر، طفح جلدي، رؤية ضبابية.'
    },
    ingredients: {
      en: 'Active ingredient: Ibuprofen. Inactive ingredients: Carnauba wax, colloidal silicon dioxide, croscarmellose sodium, fumed silica gel, hypromellose, lactose, magnesium stearate, microcrystalline cellulose, propylene glycol, sodium benzoate, sodium lauryl sulfate, stearic acid, sucrose, synthetic iron oxides, titanium dioxide, white wax.',
      ar: 'المكون النشط: إيبوبروفين. المكونات غير النشطة: شمع الكارنوبا، ثاني أكسيد السيليكون الغروي، كروسكارميلوز الصوديوم، هلام السيليكا المدخن، هيبروميلوز، لاكتوز، ستيرات المغنيسيوم، سليلوز دقيق البلورات، جليكول البروبيلين، بنزوات الصوديوم، لوريل سلفات الصوديوم، حمض الستياريك، سكروز، أكاسيد الحديد الاصطناعية، ثاني أكسيد التيتانيوم، شمع أبيض.'
    },
    requiresPrescription: false,
    inStock: true,
    featured: true
  },
  {
    id: 'multivitamin-complex',
    name: {
      en: 'Multivitamin Complex',
      ar: 'فيتامينات متعددة مركبة'
    },
    slug: 'multivitamin-complex',
    description: {
      en: 'A comprehensive multivitamin and mineral supplement to support overall health and wellbeing. Contains essential vitamins and minerals to help fill nutritional gaps in your diet and maintain good health.',
      ar: 'مكمل شامل متعدد الفيتامينات والمعادن لدعم الصحة العامة والرفاهية. يحتوي على الفيتامينات والمعادن الأساسية للمساعدة في سد الفجوات الغذائية في نظامك الغذائي والحفاظ على الصحة الجيدة.'
    },
    price: 19.99,
    categoryId: 'vitamins',
    image: 'https://images.unsplash.com/photo-1584472376859-7059ef9240d0?q=80&w=1000&auto=format&fit=crop',
    dosage: {
      en: 'Adults: Take 1 tablet daily with food.',
      ar: 'البالغين: تناول قرص واحد يوميًا مع الطعام.'
    },
    sideEffects: {
      en: 'May cause upset stomach or constipation. Taking with food may reduce these effects.',
      ar: 'قد يسبب اضطرابات في المعدة أو إمساك. تناوله مع الطعام قد يقلل من هذه الآثار.'
    },
    ingredients: {
      en: 'Vitamin A, Vitamin C, Vitamin D, Vitamin E, Vitamin K, Thiamin, Riboflavin, Niacin, Vitamin B6, Folate, Vitamin B12, Biotin, Pantothenic Acid, Calcium, Iron, Magnesium, Zinc, Selenium, Copper, Manganese, Chromium, Molybdenum.',
      ar: 'فيتامين أ، فيتامين ج، فيتامين د، فيتامين هـ، فيتامين ك، ثيامين، ريبوفلافين، نياسين، فيتامين ب6، حمض الفوليك، فيتامين ب12، بيوتين، حمض البانتوثينيك، كالسيوم، حديد، مغنيسيوم، زنك، سيلينيوم، نحاس، منغنيز، كروميوم، موليبدينوم.'
    },
    requiresPrescription: false,
    inStock: true,
    featured: true
  },
  {
    id: 'first-aid-kit',
    name: {
      en: 'Emergency First Aid Kit',
      ar: 'عدة الإسعافات الأولية للطوارئ'
    },
    slug: 'first-aid-kit',
    description: {
      en: 'Comprehensive first aid kit for home, office, or travel. Contains essential items for treating minor injuries and emergencies.',
      ar: 'عدة إسعافات أولية شاملة للمنزل أو المكتب أو السفر. تحتوي على العناصر الأساسية لعلاج الإصابات الطفيفة وحالات الطوارئ.'
    },
    price: 29.99,
    categoryId: 'first-aid',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1000&auto=format&fit=crop',
    ingredients: {
      en: 'Bandages, antiseptic wipes, gauze pads, adhesive tape, scissors, tweezers, disposable gloves, instant cold pack, antibiotic ointment, burn gel, emergency blanket, CPR face shield, first aid guide.',
      ar: 'ضمادات، مناديل مطهرة، وسادات شاش، شريط لاصق، مقص، ملقط، قفازات يمكن التخلص منها، كمادة باردة فورية، مرهم مضاد حيوي، جل للحروق، بطانية للطوارئ، واقي وجه للإنعاش القلبي الرئوي، دليل الإسعافات الأولية.'
    },
    requiresPrescription: false,
    inStock: true,
    featured: false
  },
  {
    id: 'moisturizing-lotion',
    name: {
      en: 'Intensive Moisturizing Lotion',
      ar: 'غسول ترطيب مكثف'
    },
    slug: 'moisturizing-lotion',
    description: {
      en: 'Deeply hydrating lotion for dry and sensitive skin. Provides 24-hour moisture without feeling greasy. Fragrance-free and hypoallergenic.',
      ar: 'غسول مرطب بعمق للبشرة الجافة والحساسة. يوفر ترطيبًا لمدة 24 ساعة دون الشعور بالدهون. خالي من العطور ومضاد للحساسية.'
    },
    price: 12.99,
    categoryId: 'personal-care',
    image: 'https://images.unsplash.com/photo-1619451683812-30eb365832f1?q=80&w=1000&auto=format&fit=crop',
    ingredients: {
      en: 'Water, Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Helianthus Annuus (Sunflower) Seed Oil, Squalane, Sodium Hyaluronate, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Sodium Lauroyl Lactylate, Carbomer, Xanthan Gum, Phenoxyethanol, Sodium Benzoate.',
      ar: 'ماء، جليسرين، كحول سيتيريل، زيت ثلاثي الجليسريد الكابريليك/الكابريك، زيت بذور عباد الشمس، سكوالين، هيالورونات الصوديوم، سيراميد NP، سيراميد AP، سيراميد EOP، فيتوسفينغوزين، كوليسترول، لاكتيلات لاورويل الصوديوم، كاربومر، صمغ الزانثان، فينوكسيإيثانول، بنزوات الصوديوم.'
    },
    requiresPrescription: false,
    inStock: true,
    featured: false
  },
  {
    id: 'baby-shampoo',
    name: {
      en: 'Gentle Baby Shampoo',
      ar: 'شامبو لطيف للأطفال'
    },
    slug: 'baby-shampoo',
    description: {
      en: 'Tear-free, gentle formula specially designed for baby\'s delicate hair and scalp. Hypoallergenic and pH-balanced to be as gentle as water.',
      ar: 'تركيبة لطيفة وخالية من الدموع مصممة خصيصًا لشعر وفروة رأس الطفل الرقيقة. مضاد للحساسية ومتوازن الأس الهيدروجيني ليكون لطيفًا مثل الماء.'
    },
    price: 9.99,
    categoryId: 'baby-mother',
    image: 'https://images.unsplash.com/photo-1607006483167-9cb7384cead4?q=80&w=1000&auto=format&fit=crop',
    ingredients: {
      en: 'Water, Cocamidopropyl Betaine, PEG-80 Sorbitan Laurate, Sodium Trideceth Sulfate, PEG-150 Distearate, Glycerin, Polyquaternium-10, Tetrasodium EDTA, Quaternium-15, Sodium Chloride, Citric Acid, Fragrance.',
      ar: 'ماء، كوكاميدوبروبيل بيتاين، بولي إيثيلين جليكول-80 سوربيتان لورات، صوديوم تريديسيث سلفات، بولي إيثيلين جليكول-150 ديستيرات، جليسرين، بولي كواترنيوم-10، تيتراصوديوم EDTA، كواترنيوم-15، كلوريد الصوديوم، حمض الستريك، عطر.'
    },
    requiresPrescription: false,
    inStock: true,
    featured: false
  },
  {
    id: 'lisinopril-10mg',
    name: {
      en: 'Lisinopril 10mg',
      ar: 'ليسينوبريل 10 مج'
    },
    slug: 'lisinopril-10mg',
    description: {
      en: 'Lisinopril is an ACE inhibitor that is used to treat high blood pressure (hypertension) in adults and children who are at least 6 years old. It is also used to treat heart failure in adults, or to improve survival after a heart attack.',
      ar: 'ليسينوبريل هو مثبط للإنزيم المحول للأنجيوتنسين (ACE) يستخدم لعلاج ارتفاع ضغط الدم (فرط ضغط الدم) لدى البالغين والأطفال الذين لا تقل أعمارهم عن 6 سنوات. يستخدم أيضًا لعلاج فشل القلب لدى البالغين، أو لتحسين البقاء على قيد الحياة بعد نوبة قلبية.'
    },
    price: 12.99,
    categoryId: 'prescription-drugs',
    image: 'https://images.unsplash.com/photo-1584308666999-c785eee86ecb?q=80&w=1000&auto=format&fit=crop',
    dosage: {
      en: 'For high blood pressure: 10-40 mg once daily. For heart failure: 5-40 mg once daily. After a heart attack: 5 mg within 24 hours, 5 mg after 24 hours, then 10 mg after 48 hours, and continuing with 10 mg once daily for 6 weeks.',
      ar: 'لارتفاع ضغط الدم: 10-40 مجم مرة واحدة يوميًا. لفشل القلب: 5-40 مجم مرة واحدة يوميًا. بعد نوبة قلبية: 5 مجم خلال 24 ساعة، 5 مجم بعد 24 ساعة، ثم 10 مجم بعد 48 ساعة، ويستمر بـ 10 مجم مرة واحدة يوميًا لمدة 6 أسابيع.'
    },
    sideEffects: {
      en: 'Dizziness, headache, cough, low blood pressure, high potassium levels, fatigue, diarrhea, chest pain.',
      ar: 'دوخة، صداع، سعال، انخفاض ضغط الدم، ارتفاع مستويات البوتاسيوم، إرهاق، إسهال، ألم في الصدر.'
    },
    ingredients: {
      en: 'Active ingredient: Lisinopril. Inactive ingredients: Calcium phosphate, mannitol, corn starch, pregelatinized starch, magnesium stearate.',
      ar: 'المكون النشط: ليسينوبريل. المكونات غير النشطة: فوسفات الكالسيوم، مانيتول، نشا الذرة، نشا مسبق التهلم، ستيرات المغنيسيوم.'
    },
    requiresPrescription: true,
    inStock: true,
    featured: false
  },
  {
    id: 'paracetamol-500mg',
    name: {
      en: 'Paracetamol 500mg',
      ar: 'باراسيتامول 500 مج'
    },
    slug: 'paracetamol-500mg',
    description: {
      en: 'Paracetamol (also known as acetaminophen) is a pain reliever and fever reducer. It is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.',
      ar: 'الباراسيتامول (المعروف أيضًا باسم الأسيتامينوفين) هو مسكن للألم وخافض للحرارة. يستخدم لعلاج العديد من الحالات مثل الصداع وآلام العضلات والتهاب المفاصل وآلام الظهر وآلام الأسنان ونزلات البرد والحمى.'
    },
    price: 5.99,
    categoryId: 'otc-drugs',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=1000&auto=format&fit=crop',
    dosage: {
      en: 'Adults and children 12 years and over: 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.',
      ar: 'البالغين والأطفال من عمر 12 سنة فما فوق: 1-2 قرص كل 4-6 ساعات حسب الحاجة. لا تتجاوز 8 أقراص في 24 ساعة.'
    },
    sideEffects: {
      en: 'Rare allergic reactions including skin rash, hives, and breathing problems. High doses may cause liver damage.',
      ar: 'تفاعلات حساسية نادرة بما في ذلك طفح جلدي، شرى، ومشاكل في التنفس. قد تسبب الجرعات العالية تلف الكبد.'
    },
    ingredients: {
      en: 'Active ingredient: Paracetamol (acetaminophen). Inactive ingredients: Corn starch, magnesium stearate, povidone, pregelatinized starch.',
      ar: 'المكون النشط: باراسيتامول (أسيتامينوفين). المكونات غير النشطة: نشا الذرة، ستيرات المغنيسيوم، بوفيدون، نشا مسبق التهلم.'
    },
    requiresPrescription: false,
    inStock: true,
    featured: true
  }
];
