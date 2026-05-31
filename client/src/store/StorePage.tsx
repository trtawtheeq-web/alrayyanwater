import React, { useState, useMemo } from 'react';
import { useLang } from './LanguageContext';
import { useStore, Product } from './StoreContext';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import ProductCard from './ProductCard';
import CartDrawer from './CartDrawer';
import DiscountPopup from './DiscountPopup';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function StorePage() {
  const { t, lang, dir } = useLang();
  const { products, isLoading } = useStore();
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showCount, setShowCount] = useState(60);

  const filteredProducts = useMemo(() => {
    return products;
  }, [products]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
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
  }, [filteredProducts, sortBy, lang]);

  const displayProducts = sortedProducts.slice(0, showCount);
  const hasMore = showCount < sortedProducts.length;

  if (isLoading) {
    return (
      <div dir={dir}>
        <StoreHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a5276] mx-auto mb-4"></div>
            <p className="text-gray-500">{t('store.loading')}</p>
          </div>
        </div>
        <CartDrawer />
      </div>
    );
  }

  return (
    <div dir={dir} className="min-h-screen bg-gray-50">
      <StoreHeader />
      <DiscountPopup />

      {/* Hero Banner */}
      <div className="relative text-white overflow-hidden" style={{ height: 'clamp(160px, 35vw, 420px)' }}>
        <img src="/banner-products.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0077b6]/60"></div>
        <div className="relative max-w-7xl mx-auto text-center z-10 flex flex-col items-center justify-center h-full px-3 sm:px-4">
          <h1 className="text-lg sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-3">{t('store.title')}</h1>
          <p className="text-[10px] sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {t('store.subtitle')}
          </p>
          <p className="text-[9px] sm:text-xs md:text-sm text-blue-200 mt-0.5 sm:mt-2 max-w-xl mx-auto">
            {t('store.description')}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-500">
            {sortedProducts.length} {lang === 'ar' ? 'منتج' : 'products'}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs sm:text-sm border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 bg-white focus:outline-none focus:border-[#1a5276]"
          >
            <option value="featured">{t('store.featured')}</option>
            <option value="price-asc">{t('store.priceLow')}</option>
            <option value="price-desc">{t('store.priceHigh')}</option>
            <option value="name-asc">{t('store.nameAZ')}</option>
            <option value="name-desc">{t('store.nameZA')}</option>
          </select>
        </div>

        {/* Product Grid */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3 md:gap-4">
            {displayProducts.map(product => (
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

        {/* Show More */}
        {hasMore && (
          <div className="text-center mt-6 sm:mt-8">
            <button
              onClick={() => setShowCount(prev => prev + 30)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#1a5276] text-white rounded-lg font-medium text-sm sm:text-base hover:bg-[#2980b9] transition-colors"
            >
              {t('store.showMore')}
            </button>
          </div>
        )}
      </div>

      <StoreFooter />
      <CartDrawer />
    </div>
  );
}
