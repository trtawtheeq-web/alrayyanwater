import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';
import { useStore } from './StoreContext';

export default function StoreHeader() {
  const { lang, toggleLang } = useLang();
  const { getCartCount, setCartDrawerOpen } = useStore();
  const [location, navigate] = useLocation();
  const cartCount = getCartCount();
  const isAr = lang === 'ar';

  // Load the same CSS and JS files used by the homepage
  useEffect(() => {
    const cssFiles = [
      '/rayyan-site/assets/vendor/bootstrap/css/bootstrap.min.css',
      '/rayyan-site/assets/vendor/bootstrap-icons/bootstrap-icons.css',
      '/rayyan-site/assets/vendor/boxicons/css/boxicons.min.css',
      '/rayyan-site/assets/css/style-ar.css',
      '/rayyan-site/assets/vendor/menu/css/slimmenu.css',
    ];

    cssFiles.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });

    // Load jQuery and slimmenu for mobile menu
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const initMenu = async () => {
      await loadScript('/rayyan-site/assets/vendor/jquery.2.2.3.min.js');
      await loadScript('/rayyan-site/assets/vendor/menu/src/js/jquery.slimmenu.js');
      // Initialize slimmenu
      const $ = (window as any).jQuery;
      if ($ && $('#mega-menu-holder').length) {
        $('#mega-menu-holder').slimmenu({
          resizeWidth: '991',
          animSpeed: 'medium',
          indentChildren: true,
        });
      }
      // Scroll handler for sticky nav
      if ($) {
        $(window).on('scroll.storeHeader', function() {
          var sticky = $('.theme-menu-wrapper');
          var scroll = $(window).scrollTop();
          if (scroll >= 190) sticky.addClass('fixed');
          else sticky.removeClass('fixed');
        });
      }
    };

    initMenu();

    return () => {
      const $ = (window as any).jQuery;
      if ($) {
        $(window).off('scroll.storeHeader');
      }
    };
  }, []);

  return (
    <header className="header-one">
      {/* .top-header - EXACT copy from about-us.html */}
      <div className="top-header">
        <div className="container clearfix">
          <div className="logo float-right">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              <img src="/rayyan-site/assets/img/logo-ar-new.svg" alt="مياه أبراج" />
            </a>
          </div>

          {/* Desktop address wrapper */}
          <div className="address-wrapper d-none d-sm-block float-left ipad" dir="rtl">
            <ul>
              <li className="address">
                <a href="/store" onClick={(e) => { e.preventDefault(); navigate('/store'); }} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <i className="icon bx bxs-cart"></i>
                  <span>تسوق الآن</span>
                  <h6>🛒</h6>
                </a>
              </li>
              <li className="address">
                <i className="icon bx bxs-truck"></i>
                <span className="DELIVERYspan">توصيل مجاني</span>
                <h6 className="DELIVERY">للمــــــنزل</h6>
              </li>
              <li>
                <a href="https://qrco.de/abraaj_app" className="download-app" target="_blank" rel="noopener noreferrer">
                  <img src="/rayyan-site/assets/img/apple.svg" alt="Download App" />
                </a>
                <a href="https://qrco.de/abraaj_app" className="download-app" target="_blank" rel="noopener noreferrer">
                  <img src="/rayyan-site/assets/img/play.svg" alt="Download App" />
                </a>
              </li>
              {/* Cart button for store */}
              <li className="address" style={{ cursor: 'pointer' }} onClick={() => setCartDrawerOpen(true)}>
                <i className="icon bx bxs-basket"></i>
                <span>السلة</span>
                {cartCount > 0 && <h6 style={{ color: '#e74c3c', fontWeight: 'bold' }}>{cartCount}</h6>}
              </li>
            </ul>
          </div>

          {/* Mobile address wrapper */}
          <div className="address-wrapper d-block d-sm-none float-right ipad">
            <ul>
              <li>
                <a href="https://qrco.de/abraaj_app" className="download-app" target="_blank" rel="noopener noreferrer">
                  <img src="/rayyan-site/assets/img/apple.svg" alt="Download App" />
                </a>
                <a href="https://qrco.de/abraaj_app" className="download-app" target="_blank" rel="noopener noreferrer">
                  <img src="/rayyan-site/assets/img/play.svg" alt="Download App" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* /.top-header */}

      {/* Navigation - EXACT copy from about-us.html */}
      <div className="theme-menu-wrapper fixed">
        <div className="container">
          <div className="bg-wrapper clearfix">
            {/* Menu Wrapper */}
            <div className="menu-wrapper float-right" dir="rtl">
              <nav id="mega-menu-holder" className="clearfix">
                <ul className="clearfix">
                  <li className="active"><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>الصفحة الرئيسية</a></li>
                  <li><a href="/store" onClick={(e) => { e.preventDefault(); navigate('/store'); }}>من نحن</a></li>
                  <li><a href="/store" onClick={(e) => { e.preventDefault(); navigate('/store'); }}>المنتجات</a></li>
                  <li><a href="/store" onClick={(e) => { e.preventDefault(); navigate('/store'); }}>اطلب اون لاين</a></li>
                  <li><a href="/store" onClick={(e) => { e.preventDefault(); navigate('/store'); }}>جولة في المصنع</a></li>
                  <li><a href="/store" onClick={(e) => { e.preventDefault(); navigate('/store'); }}>الفعاليات</a></li>
                  <li><a href="/store" onClick={(e) => { e.preventDefault(); navigate('/store'); }}>اتصل بنا</a></li>
                </ul>
              </nav>
            </div>
            {/* end Menu Wrapper */}

            <div className="right-widget float-left">
              <ul>
                <li className="language-icon">
                  <a href="#" onClick={(e) => { e.preventDefault(); toggleLang(); }}>
                    {isAr ? 'English' : 'العربية'}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
