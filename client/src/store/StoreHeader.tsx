import React, { useState, useEffect, useRef } from 'react';
import { useStore } from './StoreContext';
import { useLang } from './LanguageContext';

export default function StoreHeader() {
  const [headerHeight, setHeaderHeight] = useState(140);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { getCartCount } = useStore();
  const { toggleLang, lang } = useLang();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'header-height') {
        setHeaderHeight(event.data.height);
      }
      if (event.data && event.data.type === 'toggle-lang') {
        toggleLang();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [toggleLang]);

  // Send lang to iframe whenever it changes
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'lang-update', lang: lang }, '*');
    }
  }, [lang]);

  // Send cart count to iframe whenever it changes
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'cart-count', count: cartCount }, '*');
    }
  }, [cartCount]);

  // Also send cart count when iframe loads
  const handleIframeLoad = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'cart-count', count: cartCount }, '*');
      iframeRef.current.contentWindow.postMessage({ type: 'lang-update', lang: lang }, '*');
    }
  };

  return (
    <div style={{ width: '100%', height: `${headerHeight}px`, overflow: 'hidden' }}>
      <iframe
        ref={iframeRef}
        src="/rayyan-site/store-header.html"
        style={{
          width: '100%',
          height: `${headerHeight}px`,
          border: 'none',
          display: 'block',
        }}
        title="Store Header"
        onLoad={handleIframeLoad}
      />
    </div>
  );
}
