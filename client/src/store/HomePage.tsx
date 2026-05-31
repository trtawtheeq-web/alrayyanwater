import React from 'react';
import { useLocation } from 'wouter';
import { useLang } from './LanguageContext';
import DiscountPopup from './DiscountPopup';

export default function HomePage() {
  const { lang, dir } = useLang();
  const [, navigate] = useLocation();

  return (
    <div dir="rtl" style={{ fontFamily: "'Tajawal', 'Arial', sans-serif", margin: 0, padding: 0 }}>
      {/* HEADER */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(255,255,255,0.97)', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/rayyan-images/logo.png" alt="ريّان" style={{ height: 65 }} />
          <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <a href="#home" style={{ color: '#213f99', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>الصفحة الرئيسية</a>
            <a href="#lifestyle" style={{ color: '#555', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>أسلوب حياتك</a>
            <a href="#products" style={{ color: '#555', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>منتجاتنا</a>
            <a href="#contact" style={{ color: '#555', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>تواصل معنا</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #e6f2fa 0%, #f0f8ff 40%, #ffffff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 90,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating water drops */}
        <img src="/rayyan-images/drop.png" style={{ position: 'absolute', top: '15%', left: '8%', width: 35, opacity: 0.4, animation: 'float 4s ease-in-out infinite' }} alt="" />
        <img src="/rayyan-images/drop.png" style={{ position: 'absolute', top: '35%', left: '3%', width: 22, opacity: 0.3, animation: 'float 5s ease-in-out infinite 1s' }} alt="" />
        <img src="/rayyan-images/drop.png" style={{ position: 'absolute', top: '55%', right: '6%', width: 28, opacity: 0.35, animation: 'float 6s ease-in-out infinite 2s' }} alt="" />
        <img src="/rayyan-images/drop.png" style={{ position: 'absolute', top: '70%', left: '15%', width: 18, opacity: 0.25, animation: 'float 4.5s ease-in-out infinite 0.5s' }} alt="" />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 20px', display: 'flex', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px', textAlign: 'right', paddingLeft: 40 }}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: '#213f99', lineHeight: 1.3, margin: 0 }}>
              المياه الطبيعية
              <br />الوحيدة من قطر
            </h1>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 300, color: '#23a1da', margin: '10px 0 0 0' }}>
              منذ ١٩٨٤
            </h2>
          </div>
          <div style={{ flex: '1 1 400px', textAlign: 'center', marginTop: 30 }}>
            <img src="/rayyan-images/banner-1.jpg" alt="رجل يشرب مياه ريّان" style={{ maxWidth: '100%', maxHeight: 450, objectFit: 'contain', borderRadius: 12 }} />
          </div>
        </div>
      </section>

      {/* INTRO TEXT SECTION */}
      <section style={{ padding: '80px 20px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 18, color: '#213f99', lineHeight: 2.2, marginBottom: 25 }}>
          مياه ريّان هي مياه طبيعية معبأة بكل فخر مباشرةً من مصدر المياه الجوفية في منطقة صحراوية بعيدة عن التلوّث تقع على بعد 60 كلم شمالي الدوحة.
        </p>
        <p style={{ fontSize: 18, color: '#213f99', lineHeight: 2.2 }}>
          بعد أن يتم استخراج المياه من هذا المصدر الجوفي الصحي الطبيعي والنقيّ، فهي تخضع لعملية تكرير دقيقة للحفاظ على مذاق ريّان الطبيعي والمنعش. إن نظامنا الخالي من الكلورين والمياه النقيّة الطبيعية المستخرجة من الآبار العميقة يجتمعان معاً لإعطاءكم أفضل صحة.
        </p>
      </section>

      {/* VISION & MISSION SECTION */}
      <section style={{
        width: '100%',
        minHeight: 650,
        backgroundImage: 'url(/rayyan-images/vision-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px'
      }}>
        <div style={{ display: 'flex', gap: 50, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900 }}>
          {/* Vision */}
          <div style={{
            width: 310,
            height: 310,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 35,
            textAlign: 'center',
            position: 'relative'
          }}>
            <img src="/rayyan-images/vision-leaves.png" alt="" style={{ position: 'absolute', top: -10, right: 25, width: 55 }} />
            <h2 style={{ color: '#1dab56', fontSize: 38, fontWeight: 100, margin: '0 0 10px 0', fontStyle: 'italic' }}>رؤيتنا</h2>
            <p style={{ color: '#42464a', fontSize: 13, lineHeight: 1.9 }}>
              نطمح دائماً إلى الرقي بمختلف صناعاتنا من خلال التزامنا بتطوير المنتجات والابتكار التقني مع الحفاظ على الموارد الطبيعية التي إئتُمنّا عليها وتعزيز المجتمع.
            </p>
          </div>
          {/* Mission */}
          <div style={{
            width: 310,
            height: 310,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 35,
            textAlign: 'center',
            position: 'relative'
          }}>
            <img src="/rayyan-images/mission-leaves.png" alt="" style={{ position: 'absolute', top: -10, left: 25, width: 55 }} />
            <h2 style={{ color: '#1dab56', fontSize: 38, fontWeight: 100, margin: '0 0 10px 0', fontStyle: 'italic' }}>مهمّتنا</h2>
            <p style={{ color: '#42464a', fontSize: 13, lineHeight: 1.9 }}>
              كوننا شركة رائدة في هذه المنطقة، فنحن نسعى دائماً لتقديم أفضل المياه الطبيعية والمنتجات المنعشة لزبائننا.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTLES SECTION */}
      <section id="products" style={{
        width: '100%',
        minHeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 20px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f5fbff 100%)'
      }}>
        <img src="/rayyan-images/bottol.png" alt="عبوات مياه ريّان" style={{ maxWidth: '85%', maxHeight: 550, objectFit: 'contain' }} />
      </section>

      {/* TASTE OF LIFE SECTION */}
      <section id="lifestyle" style={{ padding: '80px 20px', maxWidth: 950, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#23a1da', fontSize: 44, fontWeight: 100, margin: '0 0 0 0', fontStyle: 'italic' }}>تذوَّق</h2>
        <h2 style={{ color: '#529e3b', fontSize: 56, fontWeight: 700, margin: '0 0 30px 0' }}>طعم الحياة</h2>
        <p style={{ color: '#42464a', fontSize: 17, lineHeight: 2.2, maxWidth: 800, margin: '0 auto' }}>
          بعد أن يتم استخراج المياه من هذا المصدر الجوفي الصحي الطبيعي والنقيّ، فهي تخضع لعملية تكرير دقيقة للحفاظ على مذاق ريّان الطبيعي والمنعش. إن نظامنا الخالي من الكلورين والمياه النقيّة الطبيعية المستخرجة من الآبار العميقة تجتمع معاً لإعطاء مياه ريّان المذاق الخفيف والمنعش قبل ان تتم تعبئتها في عبوات ذات أحجام متنوّعة لإرضاء مختلف الأذواق.
        </p>
      </section>

      {/* CITY SKYLINE */}
      <section style={{ width: '100%', overflow: 'hidden', marginTop: -10 }}>
        <img src="/rayyan-images/building-bg.png" alt="أفق الدوحة" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </section>

      {/* VALUES SECTION */}
      <section style={{
        width: '100%',
        background: '#213f99',
        padding: '80px 20px'
      }}>
        <h2 style={{ color: '#fff', fontSize: 56, fontWeight: 100, textAlign: 'center', margin: '0 0 60px 0', fontStyle: 'italic' }}>قيمنا</h2>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Value 1 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 45 }}>
            <img src="/rayyan-images/value-img1.png" alt="" style={{ width: 65, marginLeft: 25, flexShrink: 0 }} />
            <div>
              <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 8px 0' }}>الجودة أولاً</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.9 }}>
                التزامنا بالجودة يتجسد في كل جانب من جوانب عملنا لضمان أعلى المعايير اللازمة.
              </p>
            </div>
          </div>
          {/* Value 2 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 45 }}>
            <img src="/rayyan-images/value-img2.png" alt="" style={{ width: 65, marginLeft: 25, flexShrink: 0 }} />
            <div>
              <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 8px 0' }}>الابتكار هو الأساس</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.9 }}>
                نحن نستثمر في أحدث المعدات والآلات ذات التقنية العالية ورأس المال البشري وهذا يساعدنا على معرفة الوسائل التي يجب أن نتّبعها لنكون دائماً في الطليعة في هذا القطاع.
              </p>
            </div>
          </div>
          {/* Value 3 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 45 }}>
            <img src="/rayyan-images/value-img3.png" alt="" style={{ width: 65, marginLeft: 25, flexShrink: 0 }} />
            <div>
              <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 8px 0' }}>التركيز على كل ما هو طبيعي</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.9 }}>
                أنت تستحق الحصول على أفضل ما يمكن للطبيعة أن تقدمه ونحن نفخر بقدرتنا على توفير المنتجات الطبيعية التي تستحقها.
              </p>
            </div>
          </div>
          {/* Value 4 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 45 }}>
            <img src="/rayyan-images/value-img4.png" alt="" style={{ width: 65, marginLeft: 25, flexShrink: 0 }} />
            <div>
              <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 8px 0' }}>الإلتزام نحو المجتمع</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.9 }}>
                نحن نتعامل مع الشركاء والمنظمات التي تتيح لنا التأثير بشكل إيجابي على المستهلكين والمجتمع المحلي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY OVERVIEW SECTION */}
      <section style={{ padding: '80px 20px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#529e3b', fontSize: 44, fontWeight: 100, margin: '0 0 0 0', fontStyle: 'italic' }}>لمحة عن</h2>
        <h2 style={{ color: '#213f99', fontSize: 44, fontWeight: 700, margin: '0 0 30px 0' }}>شركة ريّان</h2>
        <p style={{ color: '#42464a', fontSize: 17, lineHeight: 2.2 }}>
          أنشئت شركة الريّان للمياه الطبيعية النقيّة في العام 1984 من قبل السيّد خالد بن محمد الربان. ومنذ اللحظة الأولى كانت الجودة هدف ريّان للارتقاء بعملية الإنتاج إلى مستوى عالمي بمساعدة شركة إفيان الفرنسية من الناحية التقنية. وتعتبر ريّان جزءاً من شركة الربان القابضة، وهي الآن علامة تجارية قائمة بذاتها وحائزة على جوائز عالمية وتتمتع بمعايير عالية، وهي منشأة حديثة متكاملة مع مختبرات متقدمة وخط إنتاج صحيّ بالكامل وحائزة على شهادات الجودة العالمية وتلتزم فعلاً بالبيئة والفعاليات والمبادرات التي تنخرط ضمن المجتمع.
        </p>
      </section>

      {/* DESERT IMAGE SECTION */}
      <section style={{ width: '100%', overflow: 'hidden' }}>
        <img src="/rayyan-images/desert-img.jpg" alt="صحراء قطر" style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }} />
      </section>

      {/* NATURE FIRST / THINK GREEN SECTION */}
      <section style={{
        width: '100%',
        minHeight: 600,
        backgroundImage: 'url(/rayyan-images/thinkgreen-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '80px 20px'
      }}>
        <div style={{ maxWidth: 500, textAlign: 'right', paddingRight: '5%' }}>
          <h2 style={{ color: '#fff', fontSize: 38, fontWeight: 100, margin: '0 0 5px 0', fontStyle: 'italic' }}>تعبئة بمستوى من الطراز العالمي</h2>
          <h2 style={{ color: '#fff', fontSize: 52, fontWeight: 700, margin: '0 0 25px 0' }}>الطبيعة أولاً</h2>
          <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: 15, lineHeight: 2.1 }}>
            في مياه ريّان، نحن مواطنون ملتزمون تجاه مجتمعنا وحريصون فعلاً على استخدام أحدث تقنيات التعبئة والتغليف وسياسة التصنيع الصديقة للبيئة. نحن نتخذ كل التدابير اللازمة والفاعلة للحدّ من تأثيرنا على البيئة عن طريق اختيار المواد التي نستخدمها بعناية والعمل على التقليل من النفايات.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: 15, lineHeight: 2.1, marginTop: 18 }}>
            باعتمادنا أحدث التقنيات، نحن نستعمل العبوات الأخف وزناً فنحدد بالتالي من بصمتها الكربونية. وحتى أنظمة إنتاجنا ذات الكفاءة العالية تساهم في الحدّ من استهلاك الطاقة.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: 15, lineHeight: 2.1, marginTop: 18 }}>
            كل شيء نقوم به وكل السياسات التي نعتمدها تركّز على حماية الطبيعة والحفاظ عليها بكل السبل الممكنة.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{ background: '#1a2a4a', padding: '60px 20px', color: '#fff' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ color: '#7fbcce', fontSize: 15, fontWeight: 700, marginBottom: 15 }}>الصفحة الرئيسية</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>مصدرنا الطبيعي</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>مهمتنا ورؤيتنا</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>قيمنا</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>لمحة عن شركة مياه ريّان</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>الطبيعة أولاً</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#7fbcce', fontSize: 15, fontWeight: 700, marginBottom: 15 }}>أسلوب حياتك</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>مياه ريّان وصحّتك</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>قوة المياه</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>نصائح</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>العادات الصحية</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#7fbcce', fontSize: 15, fontWeight: 700, marginBottom: 15 }}>منتجاتنا</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>المياه الطبيعية</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>المناديل الورقية</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#7fbcce', fontSize: 15, fontWeight: 700, marginBottom: 15 }}>تواصل معنا</h4>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.8 }}>
              ص.ب: 22188 الدوحة - قطر
              <br />هاتف: 4460 2288 974+
              <br />فاكس: 4460 2277 974+
            </p>
          </div>
        </div>
        <div style={{ maxWidth: 1024, margin: '40px auto 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>©2018 كافة حقوق الطبع والنشر محفوظة rayyanwater.com</p>
        </div>
      </footer>

      {/* Discount Popup */}
      <DiscountPopup />

      {/* CSS Animation for floating drops */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @media (max-width: 768px) {
          header nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
