import React from 'react';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';
import { useStore } from './StoreContext';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import CartDrawer from './CartDrawer';

export default function CartPage() {
  const { t, lang, dir } = useLang();
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useStore();
  const [, navigate] = useLocation();

  const total = getCartTotal();

  const getTitle = (item: any) => {
    return lang === 'ar' && item.product.titleAr ? item.product.titleAr : item.product.title;
  };

  return (
    <div dir={dir} className="min-h-screen bg-gray-50">
      <StoreHeader />

      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-6">{t('cart.title')}</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <p className="text-gray-500 text-sm sm:text-base mb-4">{t('cart.empty')}</p>
            <button
              onClick={() => navigate('/store')}
              className="px-5 sm:px-6 py-2 bg-[#0ea5e9] text-white rounded-lg text-sm hover:bg-[#0284c7] transition-colors"
            >
              {t('cart.continueShopping')}
            </button>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {cart.map((item, index) => {
                const itemPrice = parseFloat(item.variant.price);
                const hasCompare = item.variant.compareAtPrice && parseFloat(item.variant.compareAtPrice) > 0;
                const comparePrice = hasCompare ? parseFloat(item.variant.compareAtPrice!) : 0;
                const image = item.product.image || (item.product.images && item.product.images[0]) || '';
                return (
                  <div
                    key={`${item.product.id}-${item.variant.id}`}
                    className={`p-3 sm:p-4 ${index > 0 ? 'border-t border-gray-100' : ''}`}
                  >
                    <div className="flex gap-2 sm:gap-4">
                      {/* Image */}
                      <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden">
                        {image ? (
                          <img src={image} alt={getTitle(item)} className="w-full h-full object-contain p-1" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Info + controls */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">{getTitle(item)}</h3>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.variant.id)}
                            className="p-0.5 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        {item.variant.title !== 'Default' && (
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{item.variant.title}</p>
                        )}

                        <div className="flex items-center gap-1.5 mt-0.5">
                          {hasCompare && (
                            <span className="text-[10px] sm:text-xs text-gray-400 line-through">{comparePrice.toFixed(3)} د.ك</span>
                          )}
                          <span className="text-xs sm:text-sm font-bold text-[#0ea5e9]">{itemPrice.toFixed(3)} د.ك</span>
                        </div>

                        {/* Quantity + subtotal row */}
                        <div className="flex items-center justify-between mt-1.5 sm:mt-2">
                          <div className="flex items-center border border-gray-200 rounded">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                              className="px-2 sm:px-3 py-0.5 sm:py-1 text-gray-500 hover:bg-gray-50 text-xs sm:text-sm"
                            >
                              -
                            </button>
                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                              className="px-2 sm:px-3 py-0.5 sm:py-1 text-gray-500 hover:bg-gray-50 text-xs sm:text-sm"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            {hasCompare && (
                              <p className="text-[10px] text-gray-400 line-through">{(comparePrice * item.quantity).toFixed(3)} د.ك</p>
                            )}
                            <p className="text-xs sm:text-sm font-bold text-[#0ea5e9]">{(itemPrice * item.quantity).toFixed(3)} د.ك</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-base sm:text-lg font-bold text-gray-900">{t('cart.total')}</span>
                <span className="text-lg sm:text-xl font-bold text-[#0ea5e9]">{total.toFixed(3)} KWD</span>
              </div>
              <button
                onClick={() => navigate('/summary-payment')}
                className="w-full py-2.5 sm:py-3 bg-[#0ea5e9] text-white rounded-lg font-medium text-sm sm:text-base hover:bg-[#0284c7] transition-colors"
              >
                {t('cart.checkout')}
              </button>
              <div className="flex items-center justify-between mt-2 sm:mt-3">
                <button
                  onClick={() => navigate('/store')}
                  className="text-xs sm:text-sm text-[#0ea5e9] hover:underline"
                >
                  {t('cart.continueShopping')}
                </button>
                <button
                  onClick={clearCart}
                  className="text-xs sm:text-sm text-red-500 hover:underline"
                >
                  {lang === 'ar' ? 'تفريغ السلة' : 'Clear Cart'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <StoreFooter />
      <CartDrawer />
    </div>
  );
}
