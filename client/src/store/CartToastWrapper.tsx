import React from 'react';
import { useStore } from './StoreContext';
import CartToast from './CartToast';

export default function CartToastWrapper() {
  const { showCartToast, hideCartToast } = useStore();
  return <CartToast show={showCartToast} onHide={hideCartToast} />;
}
