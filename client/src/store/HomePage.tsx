import React from 'react';
import DiscountPopup from './DiscountPopup';

export default function HomePage() {
  return (
    <div style={{ margin: 0, padding: 0, width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <iframe
        src="/rayyan-site/about-us.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        title="Rayyan Water"
      />
      <DiscountPopup />
    </div>
  );
}
