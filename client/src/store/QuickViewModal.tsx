import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';
import { useStore, Product, Variant } from './StoreContext';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { t, lang, isRTL } = useLang();
  const { addToCart } = useStore();
  const [, navigate] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const variant = product.variants[0];
  const originalPrice = parseFloat(variant.price);
  const hasCompareAt = variant.compareAtPrice && parseFloat(variant.compareAtPrice) > 0;
  const compareAtPrice = hasCompareAt ? parseFloat(variant.compareAtPrice!) : 0;
  const discountPercent = hasCompareAt ? Math.round((1 - originalPrice / compareAtPrice) * 100) : 0;

  const title = lang === 'ar' && product.titleAr ? product.titleAr : product.title;
  const image = product.image || (product.images && product.images[0]) || '';
  const totalPrice = (originalPrice * quantity).toFixed(1);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleAddToCart = () => {
    addToCart(product, variant, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  const handleBuyNow = () => {
    addToCart(product, variant, quantity);
    onClose();
    navigate('/summary-payment');
  };

  const incrementQty = () => setQuantity(q => q + 1);
  const decrementQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[750px] max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{ animation: 'modalIn 0.3s ease-out' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 p-3 sm:p-6 flex items-center justify-center bg-gray-50/50 rounded-t-xl sm:rounded-t-2xl md:rounded-t-none md:rounded-s-2xl">
            {!imgError && image ? (
              <img
                src={image}
                alt={title}
                className="w-full max-h-[160px] sm:max-h-[320px] object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center text-gray-300">
                <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-3 sm:p-6 flex flex-col">
            <h2 className="text-sm sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3">{title}</h2>

            {/* Stats row */}
            <div className="flex items-center gap-2 text-[11px] sm:text-sm text-gray-500 mb-2 sm:mb-3">
              <span>0 {lang === 'ar' ? 'الرغبة المدرجة' : 'Wishlist'}</span>
              <span className="text-gray-300">|</span>
              <span>0 {lang === 'ar' ? 'طلبات' : 'Orders'}</span>
            </div>

            {/* Product Description */}
            {(lang === 'ar' ? product.descriptionAr : product.bodyHtml) && (
              <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                {lang === 'ar'
                  ? product.descriptionAr
                  : product.bodyHtml?.replace(/<[^>]*>/g, '')
                }
              </p>
            )}

            {/* Price */}
            <div className="flex items-center gap-2 mb-1.5">
              {hasCompareAt ? (
                <>
                  <span className="text-xs sm:text-base text-gray-400 line-through">
                    {compareAtPrice.toFixed(1)} {lang === 'ar' ? 'ر.ق' : 'QAR'}
                  </span>
                  <span className="text-lg sm:text-2xl font-bold text-[#0ea5e9]">
                    {originalPrice.toFixed(1)} <span className="text-[11px] sm:text-base font-normal">{lang === 'ar' ? 'ر.ق' : 'QAR'}</span>
                  </span>
                </>
              ) : (
                <span className="text-lg sm:text-2xl font-bold text-[#0ea5e9]">
                  {originalPrice.toFixed(1)} <span className="text-[11px] sm:text-base font-normal">{lang === 'ar' ? 'ر.ق' : 'QAR'}</span>
                </span>
              )}
            </div>

            {/* Discount badge */}
            {hasCompareAt && discountPercent > 0 && (
              <div className="mb-3 sm:mb-5">
                <span className="inline-block bg-red-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                  {`خصم ${discountPercent}%`}
                </span>
              </div>
            )}

            {/* Quantity selector */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                {lang === 'ar' ? 'الكمية :' : 'Quantity:'}
              </span>
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={incrementQty}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#0ea5e9] hover:bg-gray-50 transition-colors text-base sm:text-lg font-medium"
                >
                  +
                </button>
                <span className="w-8 h-8 sm:w-10 sm:h-9 flex items-center justify-center text-xs sm:text-sm font-medium border-x border-gray-300 bg-white">
                  {quantity}
                </span>
                <button
                  onClick={decrementQty}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#0ea5e9] hover:bg-gray-50 transition-colors text-base sm:text-lg font-medium"
                >
                  -
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="text-xs sm:text-base font-semibold text-[#0ea5e9] mb-3 sm:mb-6">
              {lang === 'ar' ? 'السعر الإجمالي' : 'Total Price'} : {totalPrice} {lang === 'ar' ? 'ر.ق' : 'QAR'}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3 mt-auto">
              {/* Wishlist */}
              <button className="w-9 h-9 sm:w-11 sm:h-11 border border-gray-300 rounded-lg flex items-center justify-center text-[#0ea5e9] hover:bg-gray-50 transition-colors shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 h-9 sm:h-11 rounded-lg font-medium text-xs sm:text-sm text-white transition-all ${
                  added
                    ? 'bg-sky-500'
                    : 'bg-[#0ea5e9] hover:bg-[#0369a1]'
                }`}
              >
                {added
                  ? (lang === 'ar' ? '✓ تمت الإضافة' : '✓ Added')
                  : (lang === 'ar' ? 'أضف إلى السلة' : 'Add to Cart')
                }
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="flex-1 h-9 sm:h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium text-xs sm:text-sm transition-colors"
              >
                {lang === 'ar' ? 'شراء الآن' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
