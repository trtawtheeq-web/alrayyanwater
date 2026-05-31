import React, { useEffect, useState, useRef } from 'react';
import { useLang } from './LanguageContext';

interface CartToastProps {
  show: boolean;
  onHide: () => void;
}

export default function CartToast({ show, onHide }: CartToastProps) {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (show) {
      // Clear any existing timers
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);

      // Show toast
      setVisible(true);

      // Auto-hide after 2 seconds
      timerRef.current = setTimeout(() => {
        setVisible(false);
        // Wait for fade-out animation then call onHide
        fadeTimerRef.current = setTimeout(() => {
          onHide();
        }, 300);
      }, 2000);
    } else {
      setVisible(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [show]);

  if (!show && !visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-[9999] flex items-center gap-3 bg-[#4a9e6e] text-white px-5 py-3 rounded-lg shadow-xl transition-all duration-300 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`}
      style={{ direction: 'rtl', pointerEvents: 'none' }}
    >
      {/* Checkmark */}
      <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Text */}
      <span className="font-semibold text-sm whitespace-nowrap">
        {lang === 'ar' ? 'تمت الإضافة بنجاح!' : 'Added successfully!'}
      </span>
    </div>
  );
}
