import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';
import { useStore, Product, Variant } from './StoreContext';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t, lang } = useLang();
  const { addToCart } = useStore();
  const [, navigate] = useLocation();
  const [imgError, setImgError] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showQty, setShowQty] = useState(false);
  const [showViewCart, setShowViewCart] = useState(false);
  const [qty, setQty] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const variant = product.variants[0];
  const originalPrice = parseFloat(variant.price);
  const hasCompareAt = variant.compareAtPrice && parseFloat(variant.compareAtPrice) > 0;

  const title = lang === 'ar' && product.titleAr ? product.titleAr : product.title;
  const image = product.image || (product.images && product.images[0]) || '';

  const handleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/store/product/${product.handle}`);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (showViewCart) {
      // If showing "اطلع على سلتك", navigate to cart
      navigate('/store/cart');
      return;
    }

    if (!showQty) {
      // First click: show quantity selector
      setShowQty(true);
      setQty(1);
    } else {
      // Second click (تأكيد): add to cart, show "اطلع على سلتك"
      addToCart(product, variant, qty);
      setShowQty(false);
      setQty(1);
      setShowViewCart(true);

      // Reset after 3 seconds
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowViewCart(false);
      }, 3000);
    }
  };

  const handleQtyChange = (delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setQty(prev => Math.max(1, prev + delta));
  };

  // Determine button text and style
  let btnText = 'أضف للسلة';
  let btnClass = 'bg-[#0ea5e9] text-white hover:bg-[#0284c7]';
  if (showQty) {
    btnText = 'تأكيد';
    btnClass = 'bg-[#0ea5e9] text-white hover:bg-[#0284c7]';
  } else if (showViewCart) {
    btnText = 'اطلع على سلتك';
    btnClass = 'bg-green-500 text-white hover:bg-green-600';
  }

  return (
    <>
      <div
        ref={cardRef}
        className="group bg-white rounded-lg sm:rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col relative overflow-hidden"
      >
        {/* Image */}
        <div className="relative bg-gray-50 overflow-hidden cursor-pointer" style={{ aspectRatio: '3/4' }} onClick={handleDetails}>
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

          {/* Discount badge */}
          {hasCompareAt && (
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-600 text-white text-[9px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded sm:rounded-md z-10">
              {`خصم ${Math.round((1 - originalPrice / parseFloat(variant.compareAtPrice!)) * 100)}%`}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-1.5 sm:p-3 flex flex-col flex-1">
          <p className="text-[9px] sm:text-xs text-gray-400 mb-0.5">{product.vendor}</p>
          <h3 className="text-[11px] sm:text-sm font-medium text-gray-800 line-clamp-2 mb-1 sm:mb-2 flex-1 leading-tight sm:leading-snug">
            {title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap mb-2">
            {hasCompareAt ? (
              <>
                <span className="text-[9px] sm:text-sm text-gray-400 line-through">
                  {parseFloat(variant.compareAtPrice!).toFixed(3)} <span className="text-[8px] sm:text-xs">د.ك</span>
                </span>
                <span className="text-[12px] sm:text-base font-bold text-[#0ea5e9]">
                  {originalPrice.toFixed(3)} <span className="text-[9px] sm:text-xs font-normal">د.ك</span>
                </span>
              </>
            ) : (
              <span className="text-[12px] sm:text-base font-bold text-[#0ea5e9]">
                {originalPrice.toFixed(3)} <span className="text-[9px] sm:text-xs font-normal">د.ك</span>
              </span>
            )}
          </div>

          {/* Quantity selector - appears above buttons when active */}
          {showQty && (
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 py-1">
              <button
                onClick={(e) => handleQtyChange(-1, e)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm sm:text-base font-bold"
              >
                -
              </button>
              <span className="text-sm sm:text-base font-bold text-gray-800 min-w-[20px] text-center">{qty}</span>
              <button
                onClick={(e) => handleQtyChange(1, e)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm sm:text-base font-bold"
              >
                +
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-1.5 sm:gap-2 mt-auto">
            <button
              onClick={handleDetails}
              className="flex-1 py-1.5 sm:py-2 px-1 sm:px-3 text-[10px] sm:text-sm font-medium rounded sm:rounded-md border border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white transition-colors duration-200"
            >
              التفاصيل
            </button>
            <button
              onClick={handleAddToCartClick}
              className={`flex-1 py-1.5 sm:py-2 px-1 sm:px-3 text-[10px] sm:text-sm font-medium rounded sm:rounded-md transition-colors duration-200 ${btnClass}`}
            >
              {btnText}
            </button>
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
