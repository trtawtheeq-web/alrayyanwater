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

  const menuLinks = isAr
    ? [
        { href: '/', label: 'الصفحة الرئيسية' },
        { href: 'javascript:void(0)', label: 'أسلوب حياتك' },
        { href: '/store', label: 'منتجاتنا' },
        { href: 'javascript:void(0)', label: 'تواصل معنا' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: 'javascript:void(0)', label: 'Your Lifestyle' },
        { href: '/store', label: 'Our Products' },
        { href: 'javascript:void(0)', label: 'Connect With Us' },
      ];

  return (
    <>
      {/* ===== HEADER - Rayyan Water Style ===== */}
      <header
        dir={dir}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          minHeight: '70px',
          zIndex: 1051,
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{
          background: scrolled
            ? 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(64,152,212,0.95) 80%, rgba(255,255,255,0) 100%)'
            : 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(64,152,212,0.9) 80%, rgba(255,255,255,0) 100%)',
          position: 'relative',
          padding: '0 60px',
        }}>
          {/* Desktop Header */}
          <div className="hidden md:flex" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo - positioned absolute left */}
            <div style={{
              position: 'absolute',
              left: isRTL ? 'auto' : '20px',
              right: isRTL ? '20px' : 'auto',
              top: '0px',
              zIndex: 1,
            }}>
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                <img
                  src="/rayyan-site/images/logo.png"
                  alt="Rayyan Water"
                  style={{
                    width: scrolled ? '80px' : '140px',
                    height: 'auto',
                    transition: 'width 0.4s ease',
                    marginTop: scrolled ? '5px' : '10px',
                  }}
                />
              </a>
            </div>

            {/* Navigation Menu - floated right */}
            <nav style={{ width: '100%', display: 'flex', justifyContent: isRTL ? 'flex-start' : 'flex-end' }}>
              <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
                {menuLinks.map((link, i) => (
                  <li key={link.label} style={{
                    borderRight: i < menuLinks.length - 1 ? '0.5px solid rgba(255,255,255,0.4)' : 'none',
                  }}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href === 'javascript:void(0)') { e.preventDefault(); return; }
                        e.preventDefault();
                        navigate(link.href);
                      }}
                      style={{
                        display: 'inline-block',
                        padding: scrolled ? '15px 25px 20px' : '25px 35px 35px',
                        background: 'none',
                        color: '#fff',
                        textDecoration: 'none',
                        fontSize: '17px',
                        fontWeight: 100,
                        transition: '300ms',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                {/* Language Toggle */}
                <li style={{ borderRight: '0.5px solid rgba(255,255,255,0.4)' }}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); toggleLang(); }}
                    style={{
                      display: 'inline-block',
                      padding: scrolled ? '15px 20px 20px' : '16px 20px',
                      background: 'none',
                      color: '#213f99',
                      textDecoration: 'none',
                      fontSize: '28px',
                      fontFamily: "'Adobe Arabic', serif",
                      fontWeight: 400,
                      transition: '300ms',
                      cursor: 'pointer',
                    }}
                  >
                    {isAr ? 'En' : 'ع'}
                  </a>
                </li>
                {/* Cart Icon */}
                <li style={{ display: 'flex', alignItems: 'center', padding: '0 15px' }}>
                  <button
                    onClick={() => setCartDrawerOpen(true)}
                    style={{
                      position: 'relative', background: 'none', border: 'none',
                      cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center',
                    }}
                    title={isAr ? 'السلة' : 'Cart'}
                  >
                    <svg style={{ width: '24px', height: '24px', color: '#fff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
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

          {/* Bottom border line */}
          <div style={{
            width: '100%', height: '1px', position: 'absolute', left: 0, bottom: 0, zIndex: 0,
            background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 80%, rgba(255,255,255,0) 100%)',
          }} />
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
            background: 'linear-gradient(to right, rgba(64,152,212,0.9) 0%, rgba(64,152,212,0.95) 100%)',
          }}
        >
          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg style={{ width: '24px', height: '24px', color: '#fff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img src="/rayyan-site/images/logo.png" alt="Rayyan Water" style={{ height: '45px' }} />
          </a>
          {/* Cart */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            style={{ position: 'relative', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg style={{ width: '24px', height: '24px', color: '#fff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
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
              <img src="/rayyan-site/images/logo.png" alt="Rayyan Water" style={{ height: '48px', objectFit: 'contain' }} />
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
                    if (link.href === 'javascript:void(0)') { e.preventDefault(); return; }
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
