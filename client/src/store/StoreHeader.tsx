import React, { useState, useEffect } from 'react';

export default function StoreHeader() {
  const [headerHeight, setHeaderHeight] = useState(140);

  // Load the same CSS and JS files used by the homepage
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'header-height') {
        setHeaderHeight(event.data.height);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ width: '100%', height: `${headerHeight}px`, overflow: 'hidden' }}>
      <iframe
        src="/rayyan-site/store-header.html"
        style={{
          width: '100%',
          height: `${headerHeight}px`,
          border: 'none',
          display: 'block',
        }}
        title="Store Header"
      />
    </div>
  );
}
