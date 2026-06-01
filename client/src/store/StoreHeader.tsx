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
        { href: '#', label: 'قصتنا' },
        { href: '#', label: 'اتصل بنا' },
        { href: '/store', label: 'متجر' },
        { href: '/store', label: 'حسابي' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '#', label: 'Our Story' },
        { href: '#', label: 'Contact Us' },
        { href: '/store', label: 'Store' },
        { href: '/store', label: 'My Account' },
      ];

  return (
    <>
      {/* ===== HEADER - matching alrayyanwater.com/ar/ exactly ===== */}
      <header
        dir={dir}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1051,
          background: '#fff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          padding: '10px 0',
        }}
      >
        {/* Desktop Header */}
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
              src="/rayyan-site/images/arw-al-rayyan-logo123123.pdf-5.png"
              alt="الريان - مياه شرب نقية"
              style={{ height: '50px', width: 'auto' }}
            />
          </a>

          {/* Navigation Menu */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            {menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href === '#') { e.preventDefault(); return; }
                  e.preventDefault();
                  navigate(link.href);
                }}
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1a5276',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Language Flag */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); toggleLang(); }}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}
            >
              <img src="https://flagcdn.com/w40/us.png" alt="English" style={{ width: '20px', height: '14px' }} />
            </a>

            {/* Cart text + icon */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setCartDrawerOpen(true); }}
              style={{ fontSize: '13px', color: '#1a5276', textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              {getCartTotal().toFixed(3)} - items {cartCount}
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </a>

            {/* Search icon */}
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#1a5276' }}
              title={isAr ? 'بحث' : 'Search'}
            >
              &#128269;
            </button>
          </div>
        </div>

        {/* ===== MOBILE HEADER ===== */}
        <div
          className="flex md:hidden"
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
            width: '100%',
            padding: '0 15px',
          }}
        >
          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg style={{ width: '24px', height: '24px', color: '#1a5276' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img src="/rayyan-site/images/arw-al-rayyan-logo123123.pdf-5.png" alt="الريان" style={{ height: '40px' }} />
          </a>
          {/* Cart */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            style={{ position: 'relative', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
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
      </header>

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
              <img src="/rayyan-site/images/arw-al-rayyan-logo123123.pdf-5.png" alt="الريان" style={{ height: '48px', objectFit: 'contain' }} />
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
                    if (link.href === '#') { e.preventDefault(); return; }
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
