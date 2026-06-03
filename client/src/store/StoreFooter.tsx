import React from 'react';
import { useLang } from './LanguageContext';

export default function StoreFooter() {
  const { lang } = useLang();

  return (
    <footer id="footer">
      <div className="container">
        <img src="/rayyan-site/assets/img/logo-white-ar.svg" className="img-fluid" alt="Abraaj Water" />
        <div className="social-links">
          <a href="https://twitter.com/abraajwater" target="_blank" rel="noopener noreferrer" className="twitter">
            <i className="bx bxl-twitter"></i>
          </a>
          <a href="https://www.facebook.com/AbraajWaterKuwait" target="_blank" rel="noopener noreferrer" className="facebook">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="https://www.instagram.com/abraajwater" target="_blank" rel="noopener noreferrer" className="instagram">
            <i className="bx bxl-instagram"></i>
          </a>
          <a href="https://www.youtube.com/user/Abraajwater" target="_blank" rel="noopener noreferrer" className="youtube">
            <i className="bx bxl-youtube"></i>
          </a>
        </div>
        <div className="copyright">
          Copyright © {new Date().getFullYear()} Abraaj Water Company, All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
