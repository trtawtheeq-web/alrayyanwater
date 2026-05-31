import React, { useState } from 'react';
import { useLang } from './LanguageContext';
import { useStore, Product, Variant } from './StoreContext';

interface AddToCartPopupProps {
  product: Product;
  variant: Variant;
  onClose: () => void;
}

export default function AddToCartPopup({ product, variant, onClose }: AddToCartPopupProps) {
  const { lang } = useLang();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const incrementQty = () => setQuantity(q => q + 1);
  const decrementQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, variant, quantity);
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-[180px] mt-3"
      style={{ animation: 'popupIn 0.2s ease-out' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
        style={{ position: 'relative', float: lang === 'ar' ? 'left' : 'left', marginTop: '-4px', marginLeft: '-4px' }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Title */}
      <p className="text-sm font-semibold text-gray-800 text-center mb-3 clear-both">
        {lang === 'ar' ? 'الكمية' : 'Quantity'}
      </p>

      {/* Quantity selector */}
      <div className="flex items-center justify-center gap-0 mb-3">
        <button
          onClick={(e) => { e.stopPropagation(); incrementQty(); }}
          className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-[#0ea5e9] text-lg font-medium transition-colors"
        >
          +
        </button>
        <span className="w-12 h-9 flex items-center justify-center text-sm font-medium border border-gray-300 rounded bg-white mx-1">
          {quantity}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); decrementQty(); }}
          className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-[#0ea5e9] text-lg font-medium transition-colors"
        >
          -
        </button>
      </div>

      {/* Add to Cart button */}
      <button
        onClick={handleAddToCart}
        disabled={added}
        className={`w-full h-10 rounded-lg font-medium text-sm text-white transition-all ${
          added
            ? 'bg-sky-500'
            : 'bg-[#0ea5e9] hover:bg-[#0369a1]'
        }`}
      >
        {added
          ? '✓'
          : (lang === 'ar' ? 'أضف إلى السلة' : 'Add to Cart')
        }
      </button>

      <style>{`
        @keyframes popupIn {
          from {
            opacity: 0;
            transform: translateY(-5px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
