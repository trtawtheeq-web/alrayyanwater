import React, { useState, useMemo } from 'react';
import { useRoute } from 'wouter';
import { useLang } from './LanguageContext';
import { useStore } from './StoreContext';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import ProductCard from './ProductCard';
import CartDrawer from './CartDrawer';

const categoryInfo: Record<string, { titleAr: string; titleEn: string }> = {
  all: { titleAr: 'جميع المنتجات', titleEn: 'All Products' },
  'عرض خاص': { titleAr: 'عرض خاص ولفترة محدودة', titleEn: 'Special Offers' },
  'عبوات': { titleAr: 'عبوات', titleEn: 'Bottles' },
  'جالونات': { titleAr: 'جالونات', titleEn: 'Gallons' },
  'الثلج والأكواب': { titleAr: 'الثلج والأكواب', titleEn: 'Ice & Cups' },
};

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function CollectionPage() {
  const [, params] = useRoute('/store/collection/:handle');
  const handle = params?.handle || 'all';
  const { t, lang, dir } = useLang();
  const { getProductsByCollection, products, isLoading } = useStore();
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const info = categoryInfo[handle] || { titleAr: handle, titleEn: handle };
  const title = lang === 'ar' ? info.titleAr : info.titleEn;

  const collectionProducts = useMemo(() => {
    if (handle === 'all') return products;
    return getProductsByCollection(handle);
  }, [handle, products, getProductsByCollection]);

  const sortedProducts = useMemo(() => {
    const sorted = [...collectionProducts];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => parseFloat(a.variants[0].price) - parseFloat(b.variants[0].price));
      case 'price-desc':
        return sorted.sort((a, b) => parseFloat(b.variants[0].price) - parseFloat(a.variants[0].price));
      case 'name-asc':
        return sorted.sort((a, b) => {
          const aName = lang === 'ar' && a.titleAr ? a.titleAr : a.title;
          const bName = lang === 'ar' && b.titleAr ? b.titleAr : b.title;
          return aName.localeCompare(bName);
        });
      case 'name-desc':
        return sorted.sort((a, b) => {
          const aName = lang === 'ar' && a.titleAr ? a.titleAr : a.title;
          const bName = lang === 'ar' && b.titleAr ? b.titleAr : b.title;
          return bName.localeCompare(aName);
        });
      default:
        return sorted;
    }
  }, [collectionProducts, sortBy, lang]);

  if (isLoading) {
    return (
      <div dir={dir}>
        <StoreHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0ea5e9] mx-auto"></div>
        </div>
        <CartDrawer />
      </div>
    );
  }

  return (
    <div dir={dir} className="min-h-screen bg-gray-50">
      <StoreHeader />

      {/* Collection Header */}
      <div className="bg-[#0ea5e9] text-white py-4 sm:py-8 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold">{title}</h1>
          <p className="text-xs sm:text-sm text-sky-200 mt-1 sm:mt-2">
            {sortedProducts.length} {lang === 'ar' ? 'منتج' : 'products'}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-500">
            {sortedProducts.length} {lang === 'ar' ? 'منتج' : 'products'}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs sm:text-sm border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 bg-white focus:outline-none focus:border-[#0ea5e9]"
          >
            <option value="featured">{t('store.featured')}</option>
            <option value="price-asc">{t('store.priceLow')}</option>
            <option value="price-desc">{t('store.priceHigh')}</option>
            <option value="name-asc">{t('store.nameAZ')}</option>
            <option value="name-desc">{t('store.nameZA')}</option>
          </select>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-3 md:gap-4">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-gray-500">{t('store.noProducts')}</p>
          </div>
        )}
      </div>

      <StoreFooter />
      <CartDrawer />
    </div>
  );
}
