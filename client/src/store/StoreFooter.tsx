import React from 'react';
import { useLang } from './LanguageContext';

export default function StoreFooter() {
  const { lang, dir } = useLang();
  const isAr = lang === 'ar';

  return (
    <footer
      dir={dir}
      style={{
        backgroundColor: '#fff',
        paddingTop: '60px',
        paddingBottom: '30px',
        borderTop: '1px solid #eee',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          {/* Contact Info */}
          <div style={{ textAlign: isAr ? 'right' : 'left' }}>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              Toll Free Number:<br/>
              <strong><a href="tel:80078888" style={{ color: '#0ea5e9', textDecoration: 'none' }}>80078888 (OMAN)</a></strong>
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              {isAr ? ': الهاتف' : 'Phone:'}<br/>
              <strong><a href="tel:+96824454945" style={{ color: '#0ea5e9', textDecoration: 'none' }}>968+ 24454945</a></strong>
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              {isAr ? ': العنوان الفعلي' : 'Address:'}<br/>
              <strong style={{ color: '#333' }}>Al mabelah saniyah, Seeb 102, Oman</strong>
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              {isAr ? ': عنوان البريد الإلكتروني' : 'Email:'}<br/>
              <strong style={{ color: '#333' }}>info@alrayyanwater.com</strong>
            </p>
          </div>

          {/* Logo + tagline */}
          <div style={{ textAlign: 'center' }}>
            <img
              src="/rayyan-site/images/arw-al-rayyan-logo123123.pdf-5.png"
              alt="الريان"
              style={{ height: '60px', marginBottom: '15px' }}
            />
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
              {isAr
                ? 'نؤكد لكم التزامنا الثابت بتقديم جودة ونقاء استثنائيين في كل قطرة.'
                : 'We assure you of our steadfast commitment to delivering exceptional quality and purity in every drop.'}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ textAlign: 'center', paddingTop: '20px', marginTop: '30px', borderTop: '1px solid #eee' }}>
          <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
            Copyright &copy; 2026 - Al RAYYAN by WIDEWEB
          </p>
        </div>
      </div>
    </footer>
  );
}
