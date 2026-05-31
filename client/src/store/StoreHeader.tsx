import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';
import { useStore } from './StoreContext';

export default function StoreHeader() {
  const { t, lang, toggleLang, isRTL, dir } = useLang();
  const { getCartCount, setCartDrawerOpen } = useStore();
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = getCartCount();
  const isAr = lang === 'ar';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const leftMenuLinks = isAr
    ? [
        { href: '/', label: 'الصفحة الرئيسية' },
        { href: '/store', label: 'قصتنا' },
        { href: '/store', label: 'المنتجات' },
        { href: '#where-to-buy', label: 'أين يمكن الحصول على منتجاتنا' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/store', label: 'Our Story' },
        { href: '/store', label: 'Products' },
        { href: '#where-to-buy', label: 'Where to Find Us' },
      ];

  const rightMenuLinks = isAr
    ? [
        { href: '/store', label: 'مياهنا' },
        { href: '/store', label: 'المدونة' },
        { href: '/store', label: 'فريقنا' },
        { href: '/store', label: 'اتصل بنا' },
      ]
    : [
        { href: '/store', label: 'Our Water' },
        { href: '/store', label: 'Blog' },
        { href: '/store', label: 'Our Team' },
        { href: '/store', label: 'Contact Us' },
      ];

  const headerHeight = scrolled ? 91 : 159;
  const logoWidth = scrolled ? 80 : 187;
  const navFontSize = scrolled ? 13 : 16;
  const hotlineFontSize = scrolled ? 16 : 24;
  const hotlineBarHeight = scrolled ? 22 : 27;

  return (
    <>
      {/* ===== HEADER ===== */}
      <div
        id="header"
        dir={dir}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 101,
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{ padding: '0 15px' }}>
          {/* Desktop header row - hidden on mobile */}
          <div
            className="hidden md:flex"
            style={{
              alignItems: 'center',
              height: `${headerHeight}px`,
              transition: 'height 0.4s ease',
            }}
          >
            {/* LEFT COLUMN - nav links */}
            <div
              style={{
                flex: '0 0 41.666%',
                maxWidth: '41.666%',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <nav style={{ width: '100%' }}>
                <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
                  {leftMenuLinks.map((link) => (
                    <li key={link.label} style={{ padding: '0 7px' }}>
                      <a
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); if (!link.href.startsWith('#')) navigate(link.href); }}
                        style={{
                          color: '#1a1a1a', fontSize: `${navFontSize}px`,
                          fontFamily: 'ProximaNovaRegular, sans-serif',
                          textTransform: 'uppercase', letterSpacing: '1px',
                          textDecoration: 'none', fontWeight: 400, whiteSpace: 'nowrap',
                          transition: 'font-size 0.4s ease',
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* CENTER COLUMN - Logo */}
            <div style={{ flex: '0 0 16.666%', maxWidth: '16.666%', textAlign: 'center', padding: '20px 0' }}>
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ display: 'inline-block' }}>
                <img
                  src="/alkalive-assets/logo.png"
                  alt="Alkalive"
                  style={{ width: `${logoWidth}px`, height: 'auto', transition: 'width 0.4s ease' }}
                />
              </a>
            </div>

            {/* RIGHT COLUMN - nav + hotline + cart */}
            <div
              style={{
                flex: '0 0 41.666%',
                maxWidth: '41.666%',
                position: 'relative',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Hotline bar */}
              <div
                style={{
                  backgroundImage: 'url(/alkalive-assets/bg-gradient.png)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center bottom',
                  backgroundSize: '100% 100%',
                  padding: '0 30px',
                  position: 'absolute',
                  top: 0,
                  ...(isRTL ? { left: 0, right: 'auto' } : { right: 0, left: 'auto' }),
                  height: `${hotlineBarHeight}px`,
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'height 0.4s ease',
                }}
              >
                <span style={{ color: '#ffffff', fontSize: '16px', fontFamily: 'ProximaNovaRegular, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '5px', width: '100%' }}>
                  {isAr ? 'الخط الساخن' : 'Hotline'}
                  <a
                    href="tel:0097433538254"
                    style={{
                      color: '#ffffff', fontSize: `${hotlineFontSize}px`, fontWeight: 'bold',
                      textDecoration: 'none', direction: 'ltr', transition: 'font-size 0.4s ease',
                      ...(isRTL ? { marginRight: '5px' } : { marginLeft: '5px' }),
                    }}
                  >
                    0097433538254
                  </a>
                </span>
              </div>

              {/* Right nav menu */}
              <nav style={{ width: '100%', display: 'flex', alignItems: 'center', height: '100%' }}>
                <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyle: 'none', margin: 0, padding: 0, width: '100%' }}>
                  {rightMenuLinks.map((link) => (
                    <li key={link.label} style={{ padding: '0 7px' }}>
                      <a
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); if (!link.href.startsWith('#')) navigate(link.href); }}
                        style={{
                          color: '#1a1a1a', fontSize: `${navFontSize}px`,
                          fontFamily: 'ProximaNovaRegular, sans-serif',
                          textTransform: 'uppercase', letterSpacing: '1px',
                          textDecoration: 'none', fontWeight: 400, whiteSpace: 'nowrap',
                          transition: 'font-size 0.4s ease',
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                  {/* Language Toggle */}
                  <li style={{ padding: '0 7px' }}>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); toggleLang(); }}
                      style={{
                        color: '#1a1a1a', fontSize: `${navFontSize}px`,
                        fontFamily: 'ProximaNovaRegular, sans-serif',
                        textTransform: 'uppercase', letterSpacing: '1px',
                        textDecoration: 'none', fontWeight: 400, whiteSpace: 'nowrap',
                        cursor: 'pointer', transition: 'font-size 0.4s ease',
                      }}
                    >
                      {isAr ? 'ENGLISH' : 'العربية'}
                    </a>
                  </li>
                  {/* Cart Icon */}
                  <li style={{ padding: '0 7px', display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => setCartDrawerOpen(true)}
                      style={{
                        position: 'relative', background: 'none', border: 'none',
                        cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center',
                      }}
                      title={isAr ? 'السلة' : 'Cart'}
                    >
                      <svg className="w-6 h-6" style={{ color: '#1a1a1a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      {cartCount > 0 && (
                        <span style={{
                          position: 'absolute', top: '-2px', right: '-4px',
                          backgroundColor: '#e74c3c', color: '#fff', borderRadius: '50%',
                          width: '18px', height: '18px', fontSize: '11px', fontWeight: 'bold',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {cartCount}
                        </span>
                      )}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* ===== MOBILE HEADER - visible only on mobile ===== */}
          <div
            className="flex md:hidden"
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '60px',
              width: '100%',
            }}
          >
            {/* Left side: hamburger + language */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <svg style={{ width: '24px', height: '24px', color: '#1a1a1a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => toggleLang()}
                style={{
                  padding: '4px 8px',
                  background: 'none',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontFamily: 'ProximaNovaRegular, sans-serif',
                }}
              >
                {isAr ? 'EN' : 'AR'}
              </button>
            </div>
            {/* Center: logo */}
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              <img src="/alkalive-assets/logo.png" alt="Alkalive" style={{ height: '45px' }} />
            </a>
            {/* Right side: cart */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              style={{ position: 'relative', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg style={{ width: '24px', height: '24px', color: '#1a1a1a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
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
      </div>

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
              <img src="/alkalive-assets/logo.png" alt="Alkalive" style={{ height: '48px', objectFit: 'contain' }} />
              <button onClick={() => setMobileMenuOpen(false)} style={{ padding: '4px', color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Hotline in mobile menu */}
            <div
              style={{
                backgroundImage: 'url(/alkalive-assets/bg-gradient.png)',
                backgroundSize: '100% 100%',
                padding: '8px 16px',
              }}
            >
              <span style={{ color: '#fff', fontSize: '14px' }}>
                {isAr ? 'الخط الساخن' : 'Hotline'}{' '}
                <a href="tel:0097433538254" style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
                  0097433538254
                </a>
              </span>
            </div>
            <nav style={{ padding: '16px' }}>
              {[...leftMenuLinks, ...rightMenuLinks].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!link.href.startsWith('#')) navigate(link.href);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    display: 'block',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#1a1a1a',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
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
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #f0f0f0',
                  borderRadius: '4px',
                }}
              >
                {isAr ? 'ENGLISH' : 'العربية'}
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
