import { useState, useEffect, useRef } from 'react';

export default function DiscountPopup() {
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const endTimeRef = useRef<number>(0);

  useEffect(() => {
    // Check if popup was already shown in this session
    const alreadyShown = sessionStorage.getItem('discount_popup_shown');
    if (alreadyShown) return;

    // Generate random countdown time less than 12 hours (in seconds)
    const randomSeconds = Math.floor(Math.random() * (12 * 3600 - 3600)) + 3600;
    endTimeRef.current = Date.now() + randomSeconds * 1000;

    // Show popup after 2 seconds
    const showTimer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem('discount_popup_shown', 'true');
    }, 2000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!show) return;

    const updateCountdown = () => {
      const remaining = Math.max(0, endTimeRef.current - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-4"
        onClick={() => setShow(false)}
        style={{ animation: 'fadeIn 0.3s ease' }}
      >
        {/* Popup */}
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-[340px] w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: 'popIn 0.4s ease' }}
        >
          {/* Blue top bar - Rayyan branding */}
          <div style={{ background: 'linear-gradient(135deg, #00a0d2, #0077b6)', padding: '16px 20px', textAlign: 'center' }}>
            <img
              src="/rayyan-site/assets/img/logo-ar-new.svg"
              alt="أبراج"
              style={{ height: '70px', width: '70px', borderRadius: '50%', margin: '0 auto', background: 'white', padding: '4px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', objectFit: 'contain' }}
            />
          </div>

          {/* Content */}
          <div style={{ padding: '20px', textAlign: 'center' }}>
            {/* Discount badge */}
            <div style={{
              background: 'linear-gradient(135deg, #e53e3e, #c53030)',
              color: 'white',
              fontSize: '28px',
              fontWeight: '900',
              padding: '10px 20px',
              borderRadius: '12px',
              marginBottom: '10px',
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(229,62,62,0.3)',
              letterSpacing: '1px'
            }}>
              خصم 50%
            </div>

            <p style={{ fontSize: '16px', fontWeight: '700', color: '#00a0d2', marginBottom: '20px', marginTop: '8px' }}>
              على جميع المنتجات
            </p>

            {/* Countdown */}
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', fontWeight: '600' }}>
              ينتهي العرض خلال
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px', direction: 'ltr' }}>
              {/* Hours */}
              <div style={{
                background: '#f0f7fc',
                border: '2px solid #bee3f8',
                borderRadius: '10px',
                padding: '8px 12px',
                minWidth: '60px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '26px', fontWeight: '900', color: '#e53e3e', lineHeight: '1' }}>
                  {pad(timeLeft.hours)}
                </div>
                <div style={{ fontSize: '10px', color: '#999', fontWeight: '600', marginTop: '2px' }}>ساعة</div>
              </div>

              <div style={{ fontSize: '24px', fontWeight: '900', color: '#e53e3e', alignSelf: 'center', paddingBottom: '14px' }}>:</div>

              {/* Minutes */}
              <div style={{
                background: '#f0f7fc',
                border: '2px solid #bee3f8',
                borderRadius: '10px',
                padding: '8px 12px',
                minWidth: '60px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '26px', fontWeight: '900', color: '#e53e3e', lineHeight: '1' }}>
                  {pad(timeLeft.minutes)}
                </div>
                <div style={{ fontSize: '10px', color: '#999', fontWeight: '600', marginTop: '2px' }}>دقيقة</div>
              </div>

              <div style={{ fontSize: '24px', fontWeight: '900', color: '#e53e3e', alignSelf: 'center', paddingBottom: '14px' }}>:</div>

              {/* Seconds */}
              <div style={{
                background: '#f0f7fc',
                border: '2px solid #bee3f8',
                borderRadius: '10px',
                padding: '8px 12px',
                minWidth: '60px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '26px', fontWeight: '900', color: '#e53e3e', lineHeight: '1' }}>
                  {pad(timeLeft.seconds)}
                </div>
                <div style={{ fontSize: '10px', color: '#999', fontWeight: '600', marginTop: '2px' }}>ثانية</div>
              </div>
            </div>

            {/* CTA Button - closes popup, stays on current page */}
            <button
              onClick={() => setShow(false)}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #00a0d2, #0077b6)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,160,210,0.3)',
                transition: 'transform 0.2s',
                textDecoration: 'none',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              تسوق الآن 🛒
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}
