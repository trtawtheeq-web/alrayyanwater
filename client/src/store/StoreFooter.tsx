import React from 'react';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';

export default function StoreFooter() {
  const { lang, dir } = useLang();
  const [, navigate] = useLocation();
  const isAr = lang === 'ar';

  const footerColumns = isAr
    ? [
        {
          title: 'الصفحة الرئيسية',
          titleHref: '/',
          links: [
            { label: 'مصدرنا الطبيعي', href: '#' },
            { label: 'مهمتنا ورؤيتنا', href: '#' },
            { label: 'قيمنا', href: '#' },
            { label: 'لمحة عن شركة مياه ريّان', href: '#' },
            { label: 'الطبيعة أولاً', href: '#' },
          ],
        },
        {
          title: 'أسلوب حياتك',
          titleHref: '#',
          links: [
            { label: 'مياه ريّان وصحّتك', href: '#' },
            { label: 'قوة المياه', href: '#' },
            { label: 'نصائح', href: '#' },
            { label: 'العادات الصحية', href: '#' },
          ],
        },
        {
          title: 'منتجاتنا',
          titleHref: '/store',
          links: [
            { label: 'المياه الطبيعية', href: '/store' },
            { label: 'المناديل الورقية', href: '/store' },
          ],
        },
        {
          title: 'تواصل معنا',
          titleHref: '#',
          links: [],
        },
      ]
    : [
        {
          title: 'Home',
          titleHref: '/',
          links: [
            { label: 'Our Natural Source', href: '#' },
            { label: 'Our Mission & Vision', href: '#' },
            { label: 'Our Values', href: '#' },
            { label: 'About Rayyan Water', href: '#' },
            { label: 'Nature First', href: '#' },
          ],
        },
        {
          title: 'Your Lifestyle',
          titleHref: '#',
          links: [
            { label: 'Rayyan & Your Health', href: '#' },
            { label: 'Power of Water', href: '#' },
            { label: 'Tips', href: '#' },
            { label: 'Healthy Habits', href: '#' },
          ],
        },
        {
          title: 'Our Products',
          titleHref: '/store',
          links: [
            { label: 'Natural Water', href: '/store' },
            { label: 'Tissue', href: '/store' },
          ],
        },
        {
          title: 'Connect With Us',
          titleHref: '#',
          links: [],
        },
      ];

  return (
    <footer
      dir={dir}
      style={{
        backgroundColor: '#f8f9fa',
        paddingTop: '40px',
        paddingBottom: '20px',
        borderTop: '1px solid #eee',
      }}
    >
      {/* Footer Columns */}
      <div style={{ maxWidth: '1170px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {footerColumns.map((col, i) => (
            <div key={i} style={{ flex: '1 1 200px', minWidth: '180px' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '16px' }}>
                <a
                  href={col.titleHref}
                  onClick={(e) => {
                    e.preventDefault();
                    if (col.titleHref !== '#') navigate(col.titleHref);
                  }}
                  style={{ color: '#a3a7ac', fontWeight: 600, textDecoration: 'none' }}
                >
                  {col.title}
                </a>
              </h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {col.links.map((link, j) => (
                  <li key={j} style={{ display: 'block', width: '100%' }}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        if (link.href !== '#') navigate(link.href);
                      }}
                      style={{
                        display: 'block',
                        color: '#a3a7ac',
                        fontWeight: 100,
                        fontSize: '15px',
                        padding: '5px 0',
                        textDecoration: 'none',
                        transition: '300ms',
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Icons + Copyright */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', flexWrap: 'wrap', gap: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a href="https://www.instagram.com/rayyanwater/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', width: '36px', height: '36px', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#e4405f', color: '#fff', textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/rayyanwater/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', width: '36px', height: '36px', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#1877f2', color: '#fff', textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
          <p style={{ color: '#7a7979', fontWeight: 100, fontSize: '14px', margin: 0 }}>
            {isAr ? '©2024 كافة حقوق الطبع والنشر محفوظة rayyanwater.com' : '©2024 All rights reserved rayyanwater.com'}
          </p>
        </div>
      </div>
    </footer>
  );
}
