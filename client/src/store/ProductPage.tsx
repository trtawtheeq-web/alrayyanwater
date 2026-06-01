import React, { useState, useMemo } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useLang } from './LanguageContext';
import { useStore, Variant } from './StoreContext';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import ProductCard from './ProductCard';
import CartDrawer from './CartDrawer';

export default function ProductPage() {
  const [, params] = useRoute('/store/product/:handle');
  const handle = params?.handle || '';
  const { t, lang, dir } = useLang();
  const { getProductByHandle, addToCart, products } = useStore();
  const [, navigate] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const product = getProductByHandle(handle);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.id !== product.id && p.productType === product.productType)
      .slice(0, 5);
  }, [product, products]);

  if (!product) {
    return (
      <div dir={dir}>
        <StoreHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">{lang === 'ar' ? 'المنتج غير موجود' : 'Product not found'}</p>
            <button
              onClick={() => navigate('/store')}
              className="px-6 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7]"
            >
              {t('product.backToStore')}
            </button>
          </div>
        </div>
        <CartDrawer />
      </div>
    );
  }

  const variant = product.variants[selectedVariant] || product.variants[0];
  const originalPrice = parseFloat(variant.price);
  const hasCompareAt = variant.compareAtPrice && parseFloat(variant.compareAtPrice) > 0;
  const compareAtPrice = hasCompareAt ? parseFloat(variant.compareAtPrice!) : 0;
  const discountPercent = hasCompareAt ? Math.round((1 - originalPrice / compareAtPrice) * 100) : 0;
  const title = lang === 'ar' && product.titleAr ? product.titleAr : product.title;
  const image = product.image || (product.images && product.images[0]) || '';

  const handleAddToCart = () => {
    addToCart(product, variant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div dir={dir} className="min-h-screen bg-gray-50">
      <StoreHeader />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-[11px] sm:text-sm text-gray-500 mb-2 sm:mb-6">
          <button onClick={() => navigate('/store')} className="hover:text-[#0ea5e9] flex-shrink-0">
            {t('header.home')}
          </button>
          <span>/</span>
          <button onClick={() => navigate(`/store/collection/${product.productType}`)} className="hover:text-[#0ea5e9] flex-shrink-0">
            {product.productType}
          </button>
          <span>/</span>
          <span className="text-gray-800 truncate">{title}</span>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="bg-gray-50 p-4 sm:p-8 flex items-center justify-center" style={{ minHeight: 'clamp(200px, 50vw, 450px)' }}>
              {!imgError && image ? (
                <img
                  src={image}
                  alt={title}
                  className="max-w-full max-h-[200px] sm:max-h-[400px] object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="text-gray-300">
                  <svg className="w-20 h-20 sm:w-24 sm:h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-3 sm:p-6 md:p-8 flex flex-col">
              <p className="text-[11px] sm:text-sm text-gray-400 mb-0.5">{product.vendor}</p>
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">{title}</h1>

              {/* Price */}
              <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
                {hasCompareAt ? (
                  <>
                    <span className="text-xs sm:text-lg text-gray-400 line-through">
                      {compareAtPrice.toFixed(3)} <span className="text-[8px] sm:text-xs">ر.ع</span>
                    </span>
                    <span className="text-lg sm:text-2xl font-bold text-[#0ea5e9]">
                      {originalPrice.toFixed(3)} <span className="text-[10px] sm:text-sm font-normal">ر.ع</span>
                    </span>
                  </>
                ) : (
                  <span className="text-lg sm:text-2xl font-bold text-[#0ea5e9]">
                    {originalPrice.toFixed(3)} <span className="text-[10px] sm:text-sm font-normal">ر.ع</span>
                  </span>
                )}
              </div>
              {hasCompareAt && discountPercent > 0 && (
                <div className="mb-4 sm:mb-6">
                  <span className="inline-block bg-red-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                    {`خصم ${discountPercent}%`}
                  </span>
                </div>
              )}

              {/* Variants */}
              {product.variants.length > 1 && (
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5">{lang === 'ar' ? 'الخيارات' : 'Options'}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {product.variants.map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(i)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm border transition-colors ${
                          selectedVariant === i
                            ? 'border-[#0ea5e9] bg-[#0ea5e9] text-white'
                            : 'border-gray-300 text-gray-700 hover:border-[#0ea5e9]'
                        }`}
                      >
                        {v.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5">{t('product.quantity')}</p>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium min-w-[32px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                  added
                    ? 'bg-sky-500 text-white'
                    : 'bg-[#0ea5e9] text-white hover:bg-[#0284c7] active:scale-[0.98]'
                }`}
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('product.added')}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                    {t('product.addToCart')} - {(originalPrice * quantity).toFixed(3)} ر.ع
                  </span>
                )}
              </button>

              {/* Description */}
              {(product.bodyHtml || product.descriptionAr) && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5">{t('product.description')}</h3>
                  <div
                    className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: lang === 'ar' && product.descriptionAr ? product.descriptionAr : (product.bodyHtml || ''),
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-6 sm:mt-12">
            <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-3 sm:mb-6">{t('product.relatedProducts')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-3 md:gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <StoreFooter />
      <CartDrawer />
    </div>
  );
}
