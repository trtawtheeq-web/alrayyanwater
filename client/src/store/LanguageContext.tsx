import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Lang = 'ar' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  isRTL: boolean;
  dir: 'rtl' | 'ltr';
}

const translations: Record<string, Record<Lang, string>> = {
  // Header
  'header.freeShipping': {
    ar: 'شحن مجاني للطلبات فوق 250 د.ك',
    en: 'Free shipping for orders over KWD 250',
  },
  'header.home': { ar: 'الرئيسية', en: 'HOME' },
  'header.allProducts': { ar: 'جميع المنتجات', en: 'ALL PRODUCTS' },
  'header.water': { ar: 'مياه طبيعية', en: 'NATURAL WATER' },
  'header.tissue': { ar: 'مناديل ورقية', en: 'TISSUE' },
  'header.searchPlaceholder': { ar: 'بحث...', en: 'Search...' },
  'header.cart': { ar: 'السلة', en: 'CART' },
  'header.signIn': { ar: 'تسجيل دخول', en: 'SIGN IN' },

  // Store Page
  'store.title': { ar: 'أبراج', en: 'ABRAAJ' },
  'store.subtitle': {
    ar: 'أبراج : مياه شرب نقية من الكويت',
    en: "RAYYAN : Pure Natural Drinking Water from Oman",
  },
  'store.description': {
    ar: 'تسوق مياه أبراج النقية بأحجام مختلفة. توصيل سريع في الكويت.',
    en: 'Shop Rayyan pure natural water in different sizes. Fast delivery in Oman.',
  },
  'store.viewAs': { ar: 'عرض كـ', en: 'VIEW AS' },
  'store.show': { ar: 'عرض', en: 'SHOW' },
  'store.itemsPerPage': { ar: 'منتج في الصفحة', en: 'items per page' },
  'store.sortBy': { ar: 'ترتيب حسب', en: 'BY TYPE' },
  'store.featured': { ar: 'مميز', en: 'Featured' },
  'store.priceLow': { ar: 'السعر: من الأقل', en: 'Price: Low to High' },
  'store.priceHigh': { ar: 'السعر: من الأعلى', en: 'Price: High to Low' },
  'store.nameAZ': { ar: 'الاسم: أ - ي', en: 'Name: A - Z' },
  'store.nameZA': { ar: 'الاسم: ي - أ', en: 'Name: Z - A' },
  'store.loading': { ar: 'جاري التحميل...', en: 'Loading...' },
  'store.showMore': { ar: 'عرض المزيد', en: 'SHOW MORE' },
  'store.noProducts': { ar: 'لا توجد منتجات', en: 'No products found' },

  // Product
  'product.addToCart': { ar: 'أضف للسلة', en: 'Add to Cart' },
  'product.added': { ar: 'تمت الإضافة', en: 'Added' },
  'product.soldOut': { ar: 'نفذت الكمية', en: 'SOLD OUT' },
  'product.unavailable': { ar: 'غير متوفر', en: 'UNAVAILABLE' },
  'product.quickView': { ar: 'عرض سريع', en: 'Quick View' },
  'product.quantity': { ar: 'الكمية', en: 'Quantity' },
  'product.description': { ar: 'الوصف', en: 'Description' },
  'product.relatedProducts': { ar: 'منتجات ذات صلة', en: 'Related Products' },
  'product.backToStore': { ar: 'العودة للمتجر', en: 'Back to Store' },
  'product.selectOptions': { ar: 'اختر الخيارات', en: 'SELECT OPTIONS' },
  'product.from': { ar: 'من', en: 'from' },

  // Cart
  'cart.title': { ar: 'سلة المشتريات', en: 'Shopping Cart' },
  'cart.empty': { ar: 'سلتك فارغة', en: 'Your cart is empty' },
  'cart.total': { ar: 'المجموع', en: 'Total' },
  'cart.checkout': { ar: 'إتمام الشراء', en: 'Checkout' },
  'cart.continueShopping': { ar: 'متابعة التسوق', en: 'Continue Shopping' },
  'cart.remove': { ar: 'حذف', en: 'Remove' },
  'cart.myCart': { ar: 'سلتي', en: 'My Cart' },
  'cart.subtotal': { ar: 'المجموع الفرعي', en: 'Subtotal' },

  // Search
  'search.resultsFor': { ar: 'نتائج البحث عن', en: 'Search results for' },
  'search.noResults': { ar: 'لا توجد نتائج', en: 'No results found' },
  'search.tryDifferent': { ar: 'حاول البحث بكلمات مختلفة', en: 'Try different keywords' },

  // Footer
  'footer.brandName': { ar: 'مياه أبراج الكويت', en: 'Abraaj Water Kuwait' },
  'footer.about': {
    ar: 'أبراج - مياه شرب نقية لحياة صحية أفضل. نوفر لك أجود أنواع المياه النقية في الكويت.',
    en: "Rayyan - Pure natural water for a healthier life. We provide the finest natural water in Oman.",
  },
  'footer.quickLinks': { ar: 'روابط سريعة', en: 'Quick Links' },
  'footer.categories': { ar: 'التصنيفات', en: 'Categories' },
  'footer.contactUs': { ar: 'تواصل معنا', en: 'Contact Us' },
  'footer.copyright': {
    ar: '© {year} مياه أبراج الكويت. جميع الحقوق محفوظة.',
    en: '© {year} Rayyan Water Oman. All rights reserved.',
  },
  'footer.paymentMethods': { ar: 'طرق الدفع', en: 'Payment Methods' },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('rayyan-lang');
      return (saved === 'en' || saved === 'ar') ? saved : 'ar';
    } catch {
      return 'ar';
    }
  });

  useEffect(() => {
    localStorage.setItem('rayyan-lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const setLang = useCallback((newLang: Lang) => setLangState(newLang), []);
  const toggleLang = useCallback(() => setLangState(prev => prev === 'ar' ? 'en' : 'ar'), []);

  const t = useCallback((key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry['en'] || key;
  }, [lang]);

  const isRTL = lang === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isRTL, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
