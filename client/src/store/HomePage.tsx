import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import CartDrawer from './CartDrawer';
import DiscountPopup from './DiscountPopup';

const mineralData = {
  ar: [
    { label: 'الرقم الهيدروجيني', value: '8-8.5' },
    { label: 'الأملاح الصلبة الكلية', value: '100-120' },
    { label: 'الصوديوم (Na+)', value: '0.5-1' },
    { label: 'المغنسيوم (Mg+2)', value: '2-10' },
    { label: 'الكالسيوم (Ca+2)', value: '25-50' },
    { label: 'البوتاسيوم (K+)', value: '10-40' },
  ],
  en: [
    { label: 'pH Level', value: '8-8.5' },
    { label: 'TDS', value: '100-120' },
    { label: 'Sodium (Na+)', value: '0.5-1' },
    { label: 'Magnesium (Mg+2)', value: '2-10' },
    { label: 'Calcium (Ca+2)', value: '25-50' },
    { label: 'Potassium (K+)', value: '10-40' },
  ],
};

/* All 11 products from the original alkalive.com slider */
const allProducts = [
  {
    sizeNum: '200',
    sizeUnit: { ar: 'ملليتر', en: 'mL' },
    img: '/alkalive-assets/bottle-200ml.png',
    title: { ar: 'مياه ألكالايف\nالنقية من\nقطر', en: 'Alkalive Water\nPure from\nQatar' },
    desc: { ar: 'تعتبر هذه الزجاجة الصغيرة وسهلة الاستخدام مثالية لمنحكم الترطيب السريع الذي تحتاجونه خلال أنشطتكم اليومية.', en: 'This small, easy-to-use bottle is perfect for giving you the quick hydration you need during your daily activities.' },
    imgHeight: 116,
  },
  {
    sizeNum: '500',
    sizeUnit: { ar: 'mL', en: 'mL' },
    img: '/alkalive-assets/glass-500ml.png',
    title: { ar: 'مياه ألكالايف\nالنقية من\nقطر', en: 'Alkalive Water\nPure from\nQatar' },
    desc: { ar: 'أكثر المنتجات شهرة، زجاجة 500 مل، هي الحجم المثالي للتنقل، وتعد خيارًا رائعًا لاجتماعات العمل أو حفلات العشاء.', en: 'The most popular product, the 500ml bottle is the perfect size for on-the-go and a great choice for business meetings or dinner parties.' },
    imgHeight: 145,
  },
  {
    sizeNum: '330',
    sizeUnit: { ar: 'ملليتر', en: 'mL' },
    img: '/alkalive-assets/bottle-330ml.png',
    title: { ar: 'مياه ألكالايف\nالنقية من\nقطر', en: 'Alkalive Water\nPure from\nQatar' },
    desc: { ar: 'هذه الزجاجة ذات الحجم المميز هي خياركم الأفضل عندما تكونون في عجلة من أمركم، فهي قادرة على إرواء عطشكم بسرعة.', en: 'This distinctively sized bottle is your best choice when you are in a hurry, as it can quench your thirst quickly.' },
    imgHeight: 149,
  },
  {
    sizeNum: '500',
    sizeUnit: { ar: 'ملليتر', en: 'mL' },
    img: '/alkalive-assets/bottle-500ml.png',
    title: { ar: 'مياه ألكالايف\nالنقية من\nقطر', en: 'Alkalive Water\nPure from\nQatar' },
    desc: { ar: 'هذا الحجم يعد مثاليًا لإبقائه دائمًا في حقائب الظهر أو حقائب الكتف الخاصة بكم، لإبقائكم مرتوين خلال تنقلاتكم.', en: 'This size is ideal to always keep in your backpacks or shoulder bags, to keep you hydrated during your commute.' },
    imgHeight: 155,
  },
  {
    sizeNum: '1500',
    sizeUnit: { ar: 'ملليتر', en: 'mL' },
    img: '/alkalive-assets/bottle-1500ml.png',
    title: { ar: 'مياه ألكالايف\nالنقية من\nقطر', en: 'Alkalive Water\nPure from\nQatar' },
    desc: { ar: 'سواء كنتم ذاهبين في رحلة، أو في طريق سفر طويل، أو ببساطة تشعرون بالعطش الشديد، احرصوا دائمًا على وجود زجاجة كبيرة الحجم من ألكالايف في متناول أيديكم.', en: 'Whether you are going on a trip, on a long journey, or simply feeling very thirsty, always make sure to have a large Alkalive bottle within reach.' },
    imgHeight: 154,
  },
  {
    sizeNum: '500',
    sizeUnit: { ar: 'ملليتر', en: 'mL' },
    img: '/alkalive-assets/baby-water.png',
    title: { ar: 'مياه Alkalive النقية\nمن قطر', en: 'Alkalive Pure Water\nfrom Qatar' },
    desc: { ar: 'عبوة مياه ألكالايف للأطفال هي الطريقة المثلى لإنعاش أطفالك وإضافة بعض الترطيب إلى أنشطتهم اليومية.', en: 'Alkalive baby water bottle is the perfect way to refresh your kids and add some hydration to their daily activities.' },
    imgHeight: 145,
  },
  {
    sizeNum: '200',
    sizeUnit: { ar: 'ملليتر', en: 'mL' },
    img: '/alkalive-assets/bottle-200ml.png',
    title: { ar: 'مياه Alkalive النقية\nمن قطر', en: 'Alkalive Pure Water\nfrom Qatar' },
    desc: { ar: 'هذه الزجاجة الصغيرة وسهلة الحمل مثالية لتمنحك ترطيبًا سريعًا طوال أنشطتك اليومية.', en: 'This small, portable bottle is perfect for quick hydration throughout your daily activities.' },
    imgHeight: 116,
  },
  {
    sizeNum: '330',
    sizeUnit: { ar: 'ملليتر', en: 'mL' },
    img: '/alkalive-assets/bottle-330ml.png',
    title: { ar: 'مياه Alkalive النقية\nمن قطر', en: 'Alkalive Pure Water\nfrom Qatar' },
    desc: { ar: 'الحجم المثالي لتبقى رفيقك الدائم أينما ذهبت.', en: 'The perfect size to be your constant companion wherever you go.' },
    imgHeight: 149,
  },
  {
    sizeNum: '500',
    sizeUnit: { ar: 'ملليتر', en: 'mL' },
    img: '/alkalive-assets/bottle-500ml.png',
    title: { ar: 'مياه Alkalive النقية\nمن قطر', en: 'Alkalive Pure Water\nfrom Qatar' },
    desc: { ar: 'الحجم الأكثر شعبية، مثالي للتنقل والأنشطة اليومية.', en: 'The most popular size, perfect for commuting and daily activities.' },
    imgHeight: 155,
  },
  {
    sizeNum: '1500',
    sizeUnit: { ar: 'ملليتر', en: 'mL' },
    img: '/alkalive-assets/bottle-1500ml.png',
    title: { ar: 'مياه Alkalive النقية\nمن قطر', en: 'Alkalive Pure Water\nfrom Qatar' },
    desc: { ar: 'الحجم العائلي المثالي لضمان ترطيب كافٍ طوال اليوم.', en: 'The ideal family size to ensure sufficient hydration throughout the day.' },
    imgHeight: 154,
  },
  {
    sizeNum: '330',
    sizeUnit: { ar: 'ملليتر', en: 'mL' },
    img: '/alkalive-assets/baby-water.png',
    title: { ar: 'مياه Alkalive النقية\nمن قطر', en: 'Alkalive Pure Water\nfrom Qatar' },
    desc: { ar: 'مياه ألكالايف للأطفال بحجم مناسب للصغار.', en: 'Alkalive baby water in a size suitable for little ones.' },
    imgHeight: 145,
  },
];

/* Tooltip data for the water-analysis all-bottles image - exact positions from original */
const tooltipBottles = [
  { size: { ar: '1500 ملليتر', en: '1500 mL' }, top: '28%', right: '35%', tipSide: 'right' as const },
  { size: { ar: '500 ملليتر', en: '500 mL' }, top: '50%', left: '75%', tipSide: 'left' as const },
  { size: { ar: '300 ملليتر', en: '300 mL' }, bottom: '36%', left: '30%', tipSide: 'right' as const },
  { size: { ar: '200 ملليتر', en: '200 mL' }, bottom: '19%', left: '50%', tipSide: 'right' as const },
];

const retailPartners = {
  retail: [
    { name: 'Carrefour', img: '/alkalive-assets/carrefour-mall.jpg' },
    { name: 'LuLu', img: '/alkalive-assets/lulu-hypermarket.jpg' },
    { name: 'Monoprix', img: '/alkalive-assets/monoprix-mall.jpg' },
    { name: 'Al Meera', img: '/alkalive-assets/almeera-store.jpg' },
    { name: 'SPAR', img: '/alkalive-assets/spar-mall.jpg' },
  ],
  corporate: [
    { name: 'QNB', img: '/alkalive-assets/qnb.jpg' },
    { name: 'QIB', img: '/alkalive-assets/QIB-Logo.jpg' },
    { name: 'Qatar Duty Free', img: '/alkalive-assets/qatar-dutyfree-logo.jpg' },
    { name: 'Ooredoo', img: '/alkalive-assets/ooredoo-logo.jpg' },
    { name: 'HIA', img: '/alkalive-assets/hia-logo.jpg' },
  ],
  govt: [
    { name: 'Amiri', img: '/alkalive-assets/amiri.jpg' },
    { name: 'QIA', img: '/alkalive-assets/qia-logo.jpg' },
    { name: 'MOI', img: '/alkalive-assets/moi-logo.jpg' },
    { name: 'Qatar Olympic', img: '/alkalive-assets/Qatar_Olympic_Committee_logo.jpg' },
    { name: 'Qatar Football', img: '/alkalive-assets/Qatar_Football_Association_logo.jpg' },
  ],
  hospitality: [
    { name: 'Wyndham', img: '/alkalive-assets/wyndham-logo.jpg' },
    { name: 'Movenpick', img: '/alkalive-assets/movenpick-logo.jpg' },
    { name: 'Crowne Plaza', img: '/alkalive-assets/crowne-plaza-layboard.jpg' },
    { name: 'Diplomatic Club', img: '/alkalive-assets/diplomatic-club.jpg' },
    { name: 'Oryx Hotel', img: '/alkalive-assets/oryxhotel-logo.jpg' },
  ],
};

type PartnerTab = 'retail' | 'corporate' | 'govt' | 'hospitality';

/* Rain Animation Component */
function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || 785;
    };
    resize();
    window.addEventListener('resize', resize);

    const drops: { x: number; y: number; l: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 100; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        l: Math.random() * 15 + 5,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.l);
        ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.l;
          drop.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
}

export default function HomePage() {
  const { lang, dir } = useLang();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<PartnerTab>('retail');
  const [selectedBottle, setSelectedBottle] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const isAr = lang === 'ar';

  const tabs: { key: PartnerTab; label: Record<string, string> }[] = [
    { key: 'retail', label: { ar: 'قطاع التجزئة', en: 'Retail' } },
    { key: 'corporate', label: { ar: 'قطاع المؤسسات', en: 'Corporate' } },
    { key: 'govt', label: { ar: 'القطاع الحكومي', en: 'Government' } },
    { key: 'hospitality', label: { ar: 'قطاع الضيافة', en: 'Hospitality' } },
  ];

  // Auto-rotate the product slider like the original (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedBottle((prev) => (prev + 1) % allProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate which bottles to show (4 on desktop, 3 on mobile)
  const getVisibleBottles = () => {
    const count = 4;
    const indices: number[] = [];
    for (let i = 0; i < count; i++) {
      const idx = (selectedBottle + i) % allProducts.length;
      indices.push(idx);
    }
    return indices;
  };

  return (
    <div dir={dir} className="min-h-screen" style={{ backgroundImage: 'url(/alkalive-assets/crystal-pattern.png)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <StoreHeader />
      <DiscountPopup />

      {/* ===== HERO SECTION - Banner ===== */}
      <section
        className="relative overflow-visible"
        style={{
          backgroundImage: 'url(/alkalive-assets/banner-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <RainCanvas />

        <div className="relative z-[2] max-w-7xl mx-auto px-4 pt-[70px] sm:pt-[100px] md:pt-[190px] pb-8 md:pb-12">
          <div className="flex flex-row items-center justify-between min-h-[320px] sm:min-h-[500px] md:min-h-[547px]">
            {/* Right side text (مياه النقية) */}
            <div className="text-center md:text-right w-1/4 md:pr-24">
              <h1 className="leading-tight">
                <span className="text-xl sm:text-3xl md:text-5xl font-bold text-black block">{isAr ? 'مياه' : 'Pure'}</span>
                <span className="text-sm sm:text-xl md:text-3xl font-bold text-black block mt-1 md:mt-4">{isAr ? 'النقية' : 'Water'}</span>
              </h1>
            </div>
            {/* Center bottle */}
            <div className="w-2/4 flex justify-center mt-8 md:mt-24">
              <img
                src="/alkalive-assets/bottle-1500ml.png"
                alt="Alkalive Water 1500ml"
                className="h-[220px] sm:h-[350px] md:h-[600px] object-contain drop-shadow-2xl"
              />
            </div>
            {/* Left side text (ألكالايف للشرب) */}
            <div className="text-center md:text-left w-1/4">
              <h2 className="leading-tight">
                <span className="text-xl sm:text-3xl md:text-5xl font-bold text-black block">{isAr ? 'ألكالايف' : 'ALKALIVE'}</span>
                <span className="text-sm sm:text-xl md:text-3xl font-bold text-black block mt-1 md:mt-4">{isAr ? 'للشرب' : 'Drinking'}</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Certification Badges - right side desktop */}
        <div
          className="absolute z-[3] hidden md:block"
          style={{ right: 0, bottom: '-110px', width: '160px', textAlign: 'center', padding: '0 5% 0 0' }}
        >
          <img src="/alkalive-assets/qatar-product.png" alt="Qatari Product" style={{ marginBottom: '20px', width: '88px', margin: '0 auto 20px' }} />
          <img src="/alkalive-assets/iso-logo.png" alt="ISO 9001" style={{ marginBottom: '20px', width: '54px', margin: '0 auto 20px' }} />
          <img src="/alkalive-assets/quality-logo.png" alt="Quality" style={{ marginBottom: '20px', width: '73px', margin: '0 auto 20px' }} />
          <img src="/alkalive-assets/haccp-logo.png" alt="HACCP" style={{ marginBottom: '20px', width: '97px', margin: '0 auto 20px' }} />
          <img src="/alkalive-assets/certificate-logo.png" alt="Superior Taste Award" style={{ width: '97px', margin: '0 auto' }} />
        </div>

        {/* Certification Badges - mobile: horizontal row at bottom */}
        <div className="relative z-[3] flex items-center justify-center gap-3 py-4 px-4 md:hidden flex-wrap">
          <img src="/alkalive-assets/qatar-product.png" alt="Qatari Product" className="w-10 h-10 object-contain" />
          <img src="/alkalive-assets/iso-logo.png" alt="ISO 9001" className="w-10 h-10 object-contain" />
          <img src="/alkalive-assets/quality-logo.png" alt="Quality" className="w-10 h-10 object-contain" />
          <img src="/alkalive-assets/haccp-logo.png" alt="HACCP" className="w-10 h-10 object-contain" />
          <img src="/alkalive-assets/certificate-logo.png" alt="Superior Taste Award" className="w-10 h-10 object-contain" />
          <img src="/alkalive-assets/qsl-logo.png" alt="QSL" className="w-10 h-10 object-contain" />
        </div>

        <div className="absolute left-4 md:left-8 bottom-8 z-[3] hidden md:block">
          <img src="/alkalive-assets/qsl-logo.png" alt="QSL" className="w-14 md:w-20 object-contain" />
        </div>

        {/* Buy Now Button */}
        <div className="relative z-[3] text-center pb-6 md:pb-8">
          <button
            onClick={() => navigate('/store')}
            className="bg-[#1a5276] text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-full font-bold text-base sm:text-lg hover:bg-[#154360] transition-colors shadow-lg"
          >
            {isAr ? 'اشترِ الآن' : 'Buy Now'}
          </button>
        </div>
      </section>

      {/* ===== PATTERN AREA - wraps bottles + water analysis ===== */}
      <div className="relative" style={{ backgroundImage: 'url(/alkalive-assets/crystal-pattern.png)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }}>
        {/* White overlay */}
        <div className="absolute inset-0 z-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>

        {/* ===== BOTTLES SECTION ===== */}
        <section className="relative z-[1] py-12 sm:py-16 md:py-[100px]">
          <div className="max-w-[1140px] mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 md:gap-0">

              {/* Bottles slider */}
              <div className="w-full md:w-[66.666%] flex items-end order-2 md:order-1 min-h-[200px] sm:min-h-[300px] md:min-h-[429px]">
                <div className="flex items-end justify-center w-full gap-2 sm:gap-0">
                  {getVisibleBottles().map((idx, pos) => {
                    const product = allProducts[idx];
                    // Hide 4th bottle on very small screens
                    const hideOnMobile = pos === 3 ? 'hidden sm:flex' : 'flex';
                    return (
                      <div
                        key={`${selectedBottle}-${pos}`}
                        className={`flex-1 ${hideOnMobile} flex-col items-center justify-end cursor-pointer transition-all duration-500`}
                        style={{
                          backgroundImage: 'url(/alkalive-assets/shadow.png)',
                          backgroundPosition: '50% 100%',
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                          padding: window.innerWidth < 640 ? '40px 10px 10px' : '100px 40px 20px',
                          height: window.innerWidth < 640 ? '180px' : '269px',
                        }}
                        onClick={() => setSelectedBottle(idx)}
                      >
                        <img
                          src={product.img}
                          alt={`${product.sizeNum}${product.sizeUnit[lang]}`}
                          className="w-[50px] sm:w-[70px] md:w-[92px] object-contain"
                          style={{
                            height: `${Math.round(product.imgHeight * 0.6)}px`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Purple gradient card */}
              <div className="w-full md:w-[33.333%] flex-shrink-0 order-1 md:order-2">
                <div
                  className="text-white relative overflow-hidden h-full rounded-xl md:rounded-none"
                  style={{
                    background: 'linear-gradient(rgb(85, 111, 151) 0%, rgb(136, 12, 68) 100%)',
                    padding: '20px',
                    minHeight: '250px',
                  }}
                >
                  <div className="p-4 sm:p-6 md:px-[15px] md:py-[40px]">
                    <h3
                      className="text-base sm:text-lg font-semibold leading-relaxed mb-3 sm:mb-4"
                      style={{ whiteSpace: 'pre-line', fontFamily: 'ProximaNova, sans-serif' }}
                    >
                      {allProducts[selectedBottle].title[lang]}
                    </h3>
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none" style={{ fontFamily: 'ProximaNova, sans-serif' }}>
                      {allProducts[selectedBottle].sizeNum}
                      <small className="text-xl sm:text-2xl font-normal block mt-1">
                        {allProducts[selectedBottle].sizeUnit[lang]}
                      </small>
                    </h2>
                    <div className="mt-4 sm:mt-6">
                      <p className="text-xs sm:text-sm opacity-90 leading-relaxed" style={{ fontFamily: 'ProximaNova, sans-serif' }}>
                        {allProducts[selectedBottle].desc[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Buy Now Button */}
            <div className="text-center mt-8 sm:mt-10">
              <button
                onClick={() => navigate('/store')}
                className="bg-[#1a5276] text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-full font-bold text-base sm:text-lg hover:bg-[#154360] transition-colors shadow-lg"
              >
                {isAr ? 'اشترِ الآن' : 'Buy Now'}
              </button>
            </div>
          </div>
        </section>

        {/* ===== WATER ANALYSIS SECTION ===== */}
        <section className="relative z-[1] py-12 sm:py-16 md:py-[100px]">
          <div className="max-w-[1140px] mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 md:gap-0">

              {/* All bottles image with tooltips */}
              <div className="w-full md:w-[41.666%] order-2 md:order-1">
                <div className="relative inline-block w-full">
                  <img
                    src="/alkalive-assets/all-bottles.png"
                    alt="All Alkalive Products"
                    className="w-full max-h-[400px] sm:max-h-[550px] md:max-h-[713px] object-contain mx-auto"
                  />
                  {/* Tooltip + buttons - hidden on mobile for cleaner look */}
                  <div className="absolute inset-0 hidden md:block">
                    {tooltipBottles.map((tb, i) => (
                      <div
                        key={i}
                        className="absolute group cursor-pointer"
                        style={{
                          top: tb.top,
                          left: tb.left,
                          right: tb.right,
                          bottom: tb.bottom,
                        }}
                        onClick={() => setActiveTooltip(activeTooltip === i ? null : i)}
                      >
                        <img
                          src="/alkalive-assets/plus-icon-original.png"
                          alt="+"
                          className="transition-transform duration-300 hover:rotate-[360deg]"
                          style={{
                            backgroundColor: 'rgb(136, 13, 69)',
                            padding: '13px',
                            borderRadius: '50px',
                            width: '42px',
                            height: '42px',
                          }}
                        />
                        <div
                          className={`absolute z-50 transition-all duration-300 ${
                            activeTooltip === i ? 'opacity-100 visible' : 'opacity-0 invisible'
                          }`}
                          style={{
                            backgroundColor: 'rgb(136, 13, 69)',
                            padding: '15px',
                            width: '150px',
                            borderRadius: '20px',
                            color: 'white',
                            lineHeight: '1.3',
                            fontSize: '12px',
                            fontFamily: 'ProximaNova, sans-serif',
                            top: '-50px',
                            ...(tb.tipSide === 'left'
                              ? { left: '-173px' }
                              : { right: '-173px' }),
                          }}
                        >
                          <h3 className="font-bold mb-2 text-sm text-white">{tb.size[lang]}</h3>
                          {mineralData[lang].map((item, j) => (
                            <div key={j} className="flex justify-between text-xs py-0.5">
                              <span className="text-white/80">{item.label}</span>
                              <span className="text-white font-bold">{item.value}</span>
                            </div>
                          ))}
                          <div
                            className="absolute"
                            style={{
                              top: '52px',
                              ...(tb.tipSide === 'left'
                                ? { right: '-20px', borderStyle: 'solid', borderColor: 'transparent', borderLeftColor: 'rgb(136, 13, 69)', borderWidth: '20px 0 20px 20px' }
                                : { left: '-20px', borderStyle: 'solid', borderColor: 'transparent', borderRightColor: 'rgb(136, 13, 69)', borderWidth: '20px 20px 20px 0' }),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text + Speedometer */}
              <div className="w-full md:w-[58.333%] order-1 md:order-2">
                <div className={`${isAr ? 'text-right' : 'text-left'} px-2 sm:px-0`}>
                  <h2
                    className="font-bold text-[#1a5276] leading-tight text-3xl sm:text-4xl md:text-[60px]"
                    style={{ fontFamily: 'ProximaNova, sans-serif' }}
                  >
                    {isAr ? 'أنقى' : 'Purest'}
                    <br />
                    {isAr ? 'مياه شرب قلوية' : 'Alkaline Drinking Water'}
                  </h2>
                  <h3
                    className="text-[#2980b9] font-semibold mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl"
                    style={{ fontFamily: 'ProximaNova, sans-serif' }}
                  >
                    {isAr ? 'ليست كل المياه سواء' : 'Not all water is the same'}
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mt-3 sm:mt-4 text-sm sm:text-base"
                    style={{ fontFamily: 'ProximaNova, sans-serif' }}
                  >
                    {isAr
                      ? 'تعد ألكالايف من أفضل أنواع مياه الشرب المعبأة، على الصعيدين المحلي والعالمي'
                      : 'Alkalive is one of the best types of bottled drinking water, both locally and internationally'}
                  </p>
                  <div className="mt-6 sm:mt-8">
                    <img
                      src="/alkalive-assets/speedometer.gif"
                      alt="pH Meter"
                      className="w-full max-w-[400px] md:max-w-full h-auto mx-auto md:mx-0"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Mineral data table for mobile (since tooltips are hidden) */}
            <div className="md:hidden mt-6 bg-white/80 rounded-xl p-4 shadow-sm">
              <h4 className="text-center text-[#1a5276] font-bold text-base mb-3">
                {isAr ? 'تحليل المياه' : 'Water Analysis'}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {mineralData[lang].map((item, j) => (
                  <div key={j} className="flex justify-between text-xs bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="text-[#1a5276] font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="text-center mt-8 sm:mt-10">
              <button
                onClick={() => navigate('/store')}
                className="bg-[#1a5276] text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-full font-bold text-base sm:text-lg hover:bg-[#154360] transition-colors shadow-lg"
              >
                {isAr ? 'اشترِ الآن' : 'Buy Now'}
              </button>
            </div>

          </div>
        </section>

      </div>
      {/* End pattern area */}

      {/* ===== WHERE TO BUY SECTION ===== */}
      <section id="where-to-buy" className="relative py-16 sm:py-20 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/alkalive-assets/where-to-buy.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative text-center text-white z-10 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
            {isAr ? 'أين يمكن الحصول على منتجاتنا' : 'Where to find our products'}
          </h2>
          <p className="text-sm sm:text-lg opacity-90 mb-6 sm:mb-8 max-w-xl mx-auto">
            {isAr
              ? 'اعثر على ألكالايف في المتاجر الإلكترونية أو في أقرب متجر لك'
              : 'Find Alkalive in online stores or at your nearest store'}
          </p>
          <button
            onClick={() => navigate('/store')}
            className="bg-white text-[#1a5276] px-8 sm:px-10 py-2.5 sm:py-3 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            {isAr ? 'اشترِ الآن' : 'Buy Now'}
          </button>
        </div>
      </section>

      {/* ===== LATEST TECHNOLOGIES SECTION ===== */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            {/* Text */}
            <div className="w-full md:w-[41.666%]">
              <div className={`${isAr ? 'text-right' : 'text-left'}`}>
                <h2
                  className="font-bold text-[#1a5276] leading-tight text-3xl sm:text-4xl md:text-[60px]"
                  style={{ fontFamily: 'ProximaNova, sans-serif' }}
                >
                  {isAr ? 'أحدث' : 'Latest'}
                  <br />
                  {isAr ? 'التقنيات' : 'Technologies'}
                </h2>
                <h3
                  className="text-[#2980b9] font-semibold mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl"
                  style={{ fontFamily: 'ProximaNova, sans-serif' }}
                >
                  {isAr ? 'ليست كل المياه سواء' : 'Not all water is the same'}
                </h3>
                <p
                  className="text-gray-600 leading-relaxed mt-3 sm:mt-4 text-sm sm:text-base"
                  style={{ fontFamily: 'ProximaNova, sans-serif' }}
                >
                  {isAr
                    ? 'تعد ألكالايف من أفضل أنواع مياه الشرب المعبأة على الصعيدين المحلي والعالمي'
                    : 'Alkalive is one of the best types of bottled drinking water both locally and internationally'}
                </p>
              </div>
            </div>
            {/* Video */}
            <div className="w-full md:w-[58.333%]">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="block relative group w-full cursor-pointer border-0 p-0 bg-transparent"
                >
                  <img
                    src="/alkalive-assets/video-overlay-img.jpg"
                    alt="Alkalive Technology"
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <img
                      src="/alkalive-assets/play-icon.png"
                      alt="Play"
                      className="w-12 h-12 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-white font-bold text-sm sm:text-lg mt-2 uppercase">PLAY</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Buy Now Button */}
          <div className="text-center mt-8 sm:mt-10">
            <button
              onClick={() => navigate('/store')}
              className="bg-[#1a5276] text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-full font-bold text-base sm:text-lg hover:bg-[#154360] transition-colors shadow-lg"
            >
              {isAr ? 'اشترِ الآن' : 'Buy Now'}
            </button>
          </div>
        </div>
      </section>

      {/* ===== VIDEO MODAL ===== */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          onClick={() => setShowVideoModal(false)}
        >
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-4 right-4 text-white text-4xl font-bold bg-transparent border-0 cursor-pointer z-10 hover:text-gray-300"
            style={{ fontSize: '40px', lineHeight: '1' }}
          >
            &times;
          </button>
          <div
            className="relative w-[95vw] sm:w-[90vw] max-w-[900px]"
            style={{ aspectRatio: '16/9' }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.youtube.com/embed/9p4fUVGuwsI?autoplay=1&rel=0"
              title="Alkalive Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-lg"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      )}

      {/* ===== RETAIL PARTNERS SECTION ===== */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-[100px]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1a5276] mb-6 sm:mb-8">
            {isAr ? 'شركاء التجزئة' : 'Retail Partners'}
          </h2>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#1a5276] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                {tab.label[lang]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {retailPartners[activeTab].map((partner) => (
              <div key={partner.name} className="bg-white rounded-xl shadow-md p-3 sm:p-5 h-24 sm:h-32 flex items-center justify-center hover:shadow-lg transition-shadow">
                <img src={partner.img} alt={partner.name} className="max-h-12 sm:max-h-16 max-w-full object-contain" />
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <button className="text-[#2980b9] font-semibold hover:underline text-sm sm:text-base">
              {isAr ? 'عرض الكل' : 'View All'}
            </button>
          </div>

          {/* Buy Now Button */}
          <div className="text-center mt-8 sm:mt-10">
            <button
              onClick={() => navigate('/store')}
              className="bg-[#1a5276] text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-full font-bold text-base sm:text-lg hover:bg-[#154360] transition-colors shadow-lg"
            >
              {isAr ? 'اشترِ الآن' : 'Buy Now'}
            </button>
          </div>
        </div>
      </section>

      <StoreFooter />
      <CartDrawer />
    </div>
  );
}
