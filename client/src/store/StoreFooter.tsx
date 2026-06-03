import React, { useState, useEffect } from 'react';

export default function StoreFooter() {
  const [footerHeight, setFooterHeight] = useState(200);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'footer-height') {
        setFooterHeight(event.data.height);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ width: '100%', height: `${footerHeight}px`, overflow: 'hidden' }}>
      <iframe
        src="/rayyan-site/store-footer.html"
        style={{
          width: '100%',
          height: `${footerHeight}px`,
          border: 'none',
          display: 'block',
        }}
        title="Store Footer"
      />
    </div>
  );
}
