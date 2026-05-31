import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';
import { useStore, Product, Variant } from './StoreContext';
import QuickViewModal from './QuickViewModal';
import AddToCartPopup from './AddToCartPopup';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t, lang } = useLang();
  const { addToCart } = useStore();
  const [, navigate] = useLocation();
  const [imgError, setImgError] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [mobileOverlay, setMobileOverlay] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const variant = product.variants[0];
  const originalPrice = parseFloat(variant.price);
  const hasPrice = originalPrice > 0;
  const hasCompareAt = variant.compareAtPrice && parseFloat(variant.compareAtPrice) > 0;


  const title = lang === 'ar' && product.titleAr ? product.titleAr : product.title;
  const image = product.image || (product.images && product.images[0]) || '';

  // Close mobile overlay when tapping outside
  useEffect(() => {
    if (!mobileOverlay) return;
    const handleOutside = (e: TouchEvent | MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setMobileOverlay(false);
      }
    };
    document.addEventListener('touchstart', handleOutside);
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('touchstart', handleOutside);
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [mobileOverlay]);

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setMobileOverlay(false);
    setShowQuickView(true);
  };

  const handleCartPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setMobileOverlay(false);
    setShowCartPopup(prev => !prev);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (showCartPopup || showQuickView) {
      e.preventDefault();
      return;
    }

    // On mobile (< 640px), first tap shows overlay, second tap navigates
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      if (!mobileOverlay) {
        e.preventDefault();
        setMobileOverlay(true);
        return;
      }
      // If overlay is showing, navigate to product page
      setMobileOverlay(false);
    }

    navigate(`/store/product/${product.handle}`);
  };

  return (
    <>
      <div
        ref={cardRef}
        className="group bg-white rounded-lg sm:rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col relative"
        onClick={handleClick}
        style={{ overflow: showCartPopup ? 'visible' : 'hidden' }}
      >
        {/* Image */}
        <div className="relative bg-gray-50 overflow-hidden" style={{ aspectRatio: '3/4' }}>
          {!imgError && image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain p-4 sm:p-5 group-hover:scale-105 transition-transform duration-300"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-10 h-10 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Desktop hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto z-20 hidden sm:flex">
            <button
              onClick={handleQuickView}
              className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
              style={{ transitionDelay: '50ms' }}
              title={t('product.quickView')}
            >
              <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button
              onClick={handleCartPopup}
              className="w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-white hover:bg-gray-100"
              style={{ transitionDelay: '100ms' }}
              title={t('product.addToCart')}
            >
              <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </button>
          </div>

          {/* Mobile tap overlay - same style as desktop hover */}
          {mobileOverlay && (
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center gap-4 z-20 sm:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleQuickView}
                className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center active:bg-gray-100"
              >
                <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button
                onClick={handleCartPopup}
                className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center active:bg-gray-100"
              >
                <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </button>
            </div>
          )}

          {/* Discount badge - only show for products with compareAtPrice */}
          {hasCompareAt && (
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-600 text-white text-[9px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded sm:rounded-md z-10">
              {`خصم ${Math.round((1 - originalPrice / parseFloat(variant.compareAtPrice!)) * 100)}%`}
            </div>
          )}

          {/* Add to Cart Popup */}
          {showCartPopup && (
            <div className="absolute inset-0 flex items-start justify-center z-30" onClick={(e) => e.stopPropagation()}>
              <AddToCartPopup
                product={product}
                variant={variant}
                onClose={() => setShowCartPopup(false)}
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-1.5 sm:p-3 flex flex-col flex-1">
          <p className="text-[9px] sm:text-xs text-gray-400 mb-0.5">{product.vendor}</p>
          <h3 className="text-[11px] sm:text-sm font-medium text-gray-800 line-clamp-2 mb-1 sm:mb-2 flex-1 leading-tight sm:leading-snug">
            {title}
          </h3>

          {/* Available sizes */}
          {product.availableIn && product.availableIn.length > 0 && (
            <div className="flex flex-wrap gap-0.5 sm:gap-1 mb-1">
              {product.availableIn.map((size, i) => (
                <span key={i} className="text-[8px] sm:text-[10px] bg-gray-100 text-gray-500 px-1 sm:px-1.5 py-0.5 rounded">
                  {size}
                </span>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {hasCompareAt ? (
              <>
                <span className="text-[9px] sm:text-sm text-gray-400 line-through">
                  {parseFloat(variant.compareAtPrice!).toFixed(1)} <span className="text-[8px] sm:text-xs">ر.ق</span>
                </span>
                <span className="text-[12px] sm:text-base font-bold text-[#0ea5e9]">
                  {originalPrice.toFixed(1)} <span className="text-[9px] sm:text-xs font-normal">ر.ق</span>
                </span>
              </>
            ) : (
              <span className="text-[12px] sm:text-base font-bold text-[#0ea5e9]">
                {originalPrice.toFixed(1)} <span className="text-[9px] sm:text-xs font-normal">ر.ق</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && ReactDOM.createPortal(
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />,
        document.body
      )}
    </>
  );
}
