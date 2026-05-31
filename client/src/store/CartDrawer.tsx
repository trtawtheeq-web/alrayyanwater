import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';
import { useStore } from './StoreContext';

export default function CartDrawer() {
  const { t, lang, dir, isRTL } = useLang();
  const { cart, cartDrawerOpen, setCartDrawerOpen, removeFromCart, updateCartQuantity, getCartTotal, getCartCount } = useStore();
  const [, navigate] = useLocation();

  const total = getCartTotal();
  const count = getCartCount();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (cartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [cartDrawerOpen]);

  const getTitle = (item: any) => {
    return lang === 'ar' && item.product.titleAr ? item.product.titleAr : item.product.title;
  };

  if (!cartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[200]" dir={dir}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={() => setCartDrawerOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col ${
          isRTL ? 'left-0' : 'right-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {t('cart.myCart')} ({count})
          </h2>
          <button
            onClick={() => setCartDrawerOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <p className="text-gray-500 text-sm">{t('cart.empty')}</p>
            </div>
          ) : (
            cart.map(item => {
              const itemPrice = parseFloat(item.variant.price);
              const hasCompare = item.variant.compareAtPrice && parseFloat(item.variant.compareAtPrice) > 0;
              const comparePrice = hasCompare ? parseFloat(item.variant.compareAtPrice!) : 0;
              const image = item.product.image || (item.product.images && item.product.images[0]) || '';
              return (
                <div key={`${item.product.id}-${item.variant.id}`} className="flex gap-3">
                  {/* Image */}
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden">
                    {image ? (
                      <img src={image} alt={getTitle(item)} className="w-full h-full object-contain p-1" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{getTitle(item)}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      {hasCompare && (
                        <span className="text-xs text-gray-400 line-through">{comparePrice.toFixed(1)} ر.ق</span>
                      )}
                      <span className="text-sm font-bold text-[#0ea5e9]">{itemPrice.toFixed(1)} ر.ق</span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-gray-500 hover:bg-gray-50 text-sm"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-gray-500 hover:bg-gray-50 text-sm"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.variant.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <div className="text-sm font-bold text-gray-900 flex-shrink-0">
                    {(itemPrice * item.quantity).toFixed(1)} ر.ق
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">{t('cart.subtotal')}</span>
              <span className="font-bold text-[#0ea5e9] text-lg">{total.toFixed(2)} QAR</span>
            </div>
            <button
              onClick={() => {
                setCartDrawerOpen(false);
                navigate('/summary-payment');
              }}
              className="w-full py-3 bg-[#0ea5e9] text-white rounded-lg font-medium hover:bg-[#0284c7] transition-colors"
            >
              {t('cart.checkout')}
            </button>
            <button
              onClick={() => {
                setCartDrawerOpen(false);
                navigate('/store/cart');
              }}
              className="w-full py-2 text-sm text-[#0ea5e9] hover:underline"
            >
              {lang === 'ar' ? 'عرض السلة' : 'View Cart'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
