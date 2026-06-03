import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';
import { useStore } from './StoreContext';

export default function StoreHeader() {
  const { t, lang, toggleLang, isRTL, dir } = useLang();
  const { getCartCount, getCartTotal, setCartDrawerOpen } = useStore();
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartCount();
  const isAr = lang === 'ar';

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const menuLinks = isAr
    ? [
        { href: '/', label: 'الصفحة الرئيسية' },
        { href: '/store', label: 'من نحن' },
        { href: '/store', label: 'المنتجات' },
        { href: '/store', label: 'اطلب اون لاين' },
        { href: '/store', label: 'جولة في المصنع' },
        { href: '/store', label: 'الفعاليات' },
        { href: '/store', label: 'اتصل بنا' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/store', label: 'About Us' },
        { href: '/store', label: 'Products' },
        { href: '/store', label: 'Order Online' },
        { href: '/store', label: 'Factory Tour' },
        { href: '/store', label: 'Events' },
        { href: '/store', label: 'Contact Us' },
      ];

  return (
    <>
      {/* ===== TOP BAR - matching abraajwater homepage ===== */}
      <div
        dir={dir}
        style={{
          background: '#fff',
          padding: '10px 0',
          borderBottom: '1px solid #eee',
        }}
      >
        <div className="hidden md:flex" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ flexShrink: 0 }}>
            <img
              src="/rayyan-site/assets/img/logo-ar-new.svg"
              alt="مياه أبراج"
              style={{ height: '60px', width: 'auto' }}
            />
          </a>

          {/* Right side - Call + Delivery + App Store + Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            {/* Shop Now button */}
            <a
              href="/store"
              onClick={(e) => { e.preventDefault(); navigate('/store'); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: '#1a5276',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              <span style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: '#9e9e9e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </span>
              <span>{isAr ? 'تسوق الآن' : 'Shop Now'}</span>
            </a>

            {/* Delivery */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: '#9e9e9e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a5276' }}>
                {isAr ? 'توصيل مجاني للمنزل' : 'Free Home Delivery'}
              </span>
            </div>

            {/* App Store buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/180px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" style={{ height: '32px', borderRadius: '4px' }} />
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" style={{ height: '32px', borderRadius: '4px' }} />
            </div>

            {/* Cart */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              style={{
                position: 'relative',
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <svg style={{ width: '24px', height: '24px', color: '#1a5276' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  backgroundColor: '#e74c3c', color: '#fff', borderRadius: '50%',
                  width: '18px', height: '18px', fontSize: '11px', fontWeight: 'bold',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile top bar */}
        <div className="flex md:hidden" style={{ alignItems: 'center', justifyContent: 'space-between', padding: '0 15px' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img src="/rayyan-site/assets/img/logo-ar-new.svg" alt="أبراج" style={{ height: '45px' }} />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setCartDrawerOpen(true)}
              style={{ position: 'relative', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg style={{ width: '22px', height: '22px', color: '#1a5276' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  backgroundColor: '#e74c3c', color: '#fff', borderRadius: '50%',
                  width: '16px', height: '16px', fontSize: '10px', fontWeight: 'bold',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg style={{ width: '24px', height: '24px', color: '#1a5276' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ===== NAVIGATION BAR - Dark blue like abraajwater ===== */}
      <nav
        dir={dir}
        className="hidden md:block"
        style={{
          background: '#1a2744',
          padding: '12px 0',
          position: 'sticky',
          top: 0,
          zIndex: 1051,
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Language button */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); toggleLang(); }}
            style={{
              background: '#fff',
              color: '#333',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            {isAr ? 'English' : 'العربية'}
          </a>

          {/* Menu links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {menuLinks.map((link, i) => (
              <React.Fragment key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(link.href);
                  }}
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#fff',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {link.label}
                </a>
                {i < menuLinks.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>

      {/* ===== MOBILE STICKY NAV ===== */}
      <nav
        dir={dir}
        className="block md:hidden"
        style={{
          background: '#1a2744',
          padding: '8px 15px',
          position: 'sticky',
          top: 0,
          zIndex: 1051,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); toggleLang(); }}
          style={{
            background: '#fff',
            color: '#333',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {isAr ? 'English' : 'العربية'}
        </a>
        <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>
          {isAr ? 'مياه أبراج' : 'Abraaj Water'}
        </span>
      </nav>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[200] md:hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="fixed top-0 bottom-0 z-[201] md:hidden overflow-y-auto"
            style={{
              width: '280px',
              backgroundColor: '#fff',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              ...(isRTL ? { right: 0 } : { left: 0 }),
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #e5e5e5' }}>
              <img src="/rayyan-site/assets/img/logo-ar-new.svg" alt="أبراج" style={{ height: '48px', objectFit: 'contain' }} />
              <button onClick={() => setMobileMenuOpen(false)} style={{ padding: '4px', color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav style={{ padding: '16px' }}>
              {menuLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(link.href);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    display: 'block',
                    padding: '12px',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#1a1a1a',
                    textDecoration: 'none',
                    borderBottom: '1px solid #f0f0f0',
                    borderRadius: '4px',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); toggleLang(); setMobileMenuOpen(false); }}
                style={{
                  display: 'block',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#213f99',
                  textDecoration: 'none',
                  borderBottom: '1px solid #f0f0f0',
                  borderRadius: '4px',
                }}
              >
                {isAr ? 'English' : 'العربية'}
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
