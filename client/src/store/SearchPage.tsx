import React, { useMemo } from 'react';
import { useLang } from './LanguageContext';
import { useStore } from './StoreContext';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import ProductCard from './ProductCard';
import CartDrawer from './CartDrawer';

export default function SearchPage() {
  const { t, lang, dir } = useLang();
  const { searchQuery, searchProducts } = useStore();

  // Get query from URL or store
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') || searchQuery;

  const results = useMemo(() => {
    return searchProducts(query);
  }, [query, searchProducts]);

  return (
    <div dir={dir} className="min-h-screen bg-gray-50">
      <StoreHeader />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          {t('search.resultsFor')} "{query}"
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {results.length} {lang === 'ar' ? 'نتيجة' : 'results'}
        </p>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-500 mb-2">{t('search.noResults')}</p>
            <p className="text-sm text-gray-400">{t('search.tryDifferent')}</p>
          </div>
        )}
      </div>

      <StoreFooter />
      <CartDrawer />
    </div>
  );
}
