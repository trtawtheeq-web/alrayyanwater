import React from 'react';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';

export default function StoreFooter() {
  const { lang, dir } = useLang();
  const [, navigate] = useLocation();
  const isAr = lang === 'ar';

  const footerLinks = isAr
    ? [
        { label: 'الصفحة الرئيسية', href: '/' },
        { label: 'قصتنا', href: '#' },
        { label: 'المنتجات', href: '/store' },
        { label: 'الأسئلة المتكررة', href: '#' },
        { label: 'أين يمكن الحصول على منتجاتنا', href: '#where-to-buy' },
        { label: 'فريقنا', href: '#' },
        { label: 'المدونة', href: '#' },
        { label: 'اتصل بنا', href: '#' },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Our Story', href: '#' },
        { label: 'Products', href: '/store' },
        { label: 'FAQ', href: '#' },
        { label: 'Where to Find Us', href: '#where-to-buy' },
        { label: 'Our Team', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Contact Us', href: '#' },
      ];

  const socialLinks = [
    { name: 'Facebook', icon: '/alkalive-assets/social-facebook.png', url: 'https://www.facebook.com/alkaliveqa', w: 13, h: 23 },
    { name: 'Twitter', icon: '/alkalive-assets/social-twitter.png', url: 'https://twitter.com/alkalive_qa', w: 22, h: 18 },
    { name: 'Instagram', icon: '/alkalive-assets/social-instagram.png', url: 'https://www.instagram.com/alkaliveqa/', w: 19, h: 19 },
    { name: 'YouTube', icon: '/alkalive-assets/social-youtube.png', url: 'https://youtube.com/', w: 22, h: 17 },
    { name: 'LinkedIn', icon: '/alkalive-assets/social-linkedin.png', url: 'https://www.linkedin.com/company/alkalive-qatar/', w: 22, h: 22 },
  ];

  return (
    <footer
      dir={dir}
      className="font-sans"
      style={{
        backgroundImage: 'url(/alkalive-assets/water-footer-bg.png)',
        backgroundSize: '100%',
        backgroundPosition: '50% 0%',
        backgroundRepeat: 'no-repeat',
        paddingTop: '150px',
        fontFamily: 'ProximaNovaRegular, sans-serif',
      }}
    >
      {/* Main footer content - responsive grid */}
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">

          {/* Column 1: Logo */}
          <div className="flex items-center justify-center sm:justify-start mb-4 md:mb-0">
            <img
              src="/alkalive-assets/footer-logo.png"
              alt="Alkalive & Sparka"
              className="w-[140px] md:w-[190px] h-auto"
            />
          </div>

          {/* Column 2: Email */}
          <div className="text-center sm:text-right mb-4 md:mb-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <img src="/alkalive-assets/email-icon.png" alt="Email" className="w-5 h-auto" />
              <h3 className="text-sm md:text-base font-normal text-black m-0">
                {isAr ? 'راسلنا' : 'Email Us'}
              </h3>
            </div>
            <a
              href="mailto:info@lusailwater.com"
              className="text-black text-sm md:text-base no-underline"
            >
              {isAr ? 'راسلنا الآن عبر البريد الإلكتروني' : 'Email us now'}
            </a>
          </div>

          {/* Column 3: Phone */}
          <div className="text-center sm:text-right mb-4 md:mb-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <img src="/alkalive-assets/phone-icon.png" alt="Phone" className="w-5 h-auto" />
              <h3 className="text-sm md:text-base font-normal text-black m-0">
                {isAr ? 'اتصل بنا' : 'Call Us'}
              </h3>
            </div>
            <a
              href="tel:0097433538254"
              className="text-black text-sm md:text-base no-underline"
              style={{ direction: 'ltr', display: 'inline-block' }}
            >
              0097433538254
            </a>
          </div>

          {/* Column 4: Social */}
          <div className="text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <img src="/alkalive-assets/share-icon.png" alt="Share" className="w-5 h-auto" />
              <h3 className="text-sm md:text-base font-normal text-black m-0">
                {isAr ? 'تواصل معنا' : 'Connect with Us'}
              </h3>
            </div>
            <ul className="flex gap-4 justify-center sm:justify-start list-none m-0 p-0 items-center">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={social.icon}
                      alt={social.name}
                      style={{ width: `${social.w}px`, height: `${social.h}px`, opacity: 0.7, transition: 'opacity 0.3s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Copyrights / Footer Navigation */}
      <div className="border-t border-gray-200 mt-8 py-4">
        <div className="max-w-[1170px] mx-auto px-4">
          <nav className="text-center">
            <ul className="flex flex-wrap justify-center list-none m-0 p-0 gap-y-2">
              {footerLinks.map((link, i) => (
                <li
                  key={link.label}
                  className="px-2 md:px-3"
                  style={{
                    borderLeft: i < footerLinks.length - 1 ? '1px solid rgb(234, 238, 243)' : 'none',
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!link.href.startsWith('#')) navigate(link.href);
                    }}
                    className="text-gray-400 text-xs md:text-sm no-underline hover:text-gray-600 transition-colors"
                    style={{ fontFamily: 'ProximaNovaRegular, sans-serif' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
