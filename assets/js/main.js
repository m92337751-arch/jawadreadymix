// Year in footer
// Auto image loader: tries jpg, then png, then svg
(function(){
  function resolveSrc(base, exts){
    const el = document.createElement('img');
    return new Promise((resolve)=>{
      let i = 0;
      const tryNext = () => {
        if (i >= exts.length) return resolve(null);
        const url = `${base}.${exts[i++]}`;
        el.onload = () => resolve(url);
        el.onerror = tryNext;
        el.src = url;
      };
      tryNext();
    });
  }

  async function initAutoImages(){
    const imgs = document.querySelectorAll('img.img-auto');
    for (const img of imgs){
      const base = img.getAttribute('data-base');
      const exts = (img.getAttribute('data-exts')||'jpg,png,svg').split(',');
      const found = await resolveSrc(base, exts);
      if (found) img.src = found;
    }
    // Hero background
    const hero = document.querySelector('.hero-bg');
    if (hero){
      const base = hero.getAttribute('data-base') || '../images/hero';
      const exts = (hero.getAttribute('data-exts')||'jpg,png,svg').split(',');
      const found = await resolveSrc(base, exts);
      if (found) hero.style.backgroundImage = `url('${found}')`;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoImages);
  } else {
    initAutoImages();
  }
})();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// AOS init
if (window.AOS) AOS.init({ duration: 700, easing: 'ease-out-quart', once: true });

// GSAP entry animation (hero)
function animateHero(){
  if (!window.gsap) return;
  const tl = gsap.timeline();
  tl.to(['.hero-title', '.hero-sub', '.hero-cta'], { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out', delay: 0.2 });
}
// Intro screen animation (GSAP)
(function(){
  const intro = document.getElementById('intro');
  if (!intro || !window.gsap) return;
  const logo = intro.querySelector('.intro-logo');
  const text = intro.querySelector('.intro-text');

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.fromTo(logo, { scale: 0.7, rotate: -10, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.6 })
    .fromTo(text, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
    .to(intro, { opacity: 0, duration: 0.5, delay: 0.4, onComplete: () => intro.classList.add('hidden') });
// Ensure hero anim after intro hides
window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  if (!intro) { animateHero(); return; }
  // If intro already hidden, animate hero immediately
  if (intro.classList.contains('hidden')) { animateHero(); return; }
  // Otherwise, wait a moment (fallback)
  setTimeout(animateHero, 1200);
});

})();


// Simple i18n
const translations = {
  ar: {
    brand: 'شركة جواد للخرسانة الجاهزة والمنتجات الأسمنتية',
    tagline: 'نبني الثقة… نصبّ الجودة',
    nav_about: 'عن الشركة',
    nav_equipment: 'المعدات',
    nav_products: 'المنتجات',
    nav_gallery: 'المعرض',
    nav_contact: 'تواصل',
    hero_title: 'حلول خرسانة جاهزة ومنتجات أسمنتية بمعايير عالمية',
    hero_sub: 'أسطول خلاطات ومضخات حديثة، ضبط جودة صارم، وتسليم في الموعد لتعزيز نجاح مشاريعك.',
    hero_cta: 'اطلب عرض سعر الآن',
    hero_cta2: 'تعرّف على منتجاتنا',
    about_title: 'نبذة عن شركة جواد',
    about_p1: 'نضع الجودة في صلب عملنا لنقدم خرسانة جاهزة ومنتجات أسمنتية تواكب تطلعات قطاع البناء الحديث. نؤمن بأن التفاصيل تصنع الفارق، لذا نعتمد عمليات ضبط جودة دقيقة من الاستلام وحتى الصب.',
    about_p2: 'بخبرات فريقنا وأساطيلنا المجهزة، نصنع حلولًا تناسب المشاريع السكنية والتجارية والصناعية، ونلتزم بالسلامة والاستدامة والالتزام بالمواعيد.',
    about_b1: 'جودة معتمدة ومكونات أصلية',
    about_b2: 'تسليم دقيق بفضل التخطيط الذكي',
    about_b3: 'دعم فني وموقعي على مدار المشروع',
    equip_title: 'أسطول المعدات',
    equip_mixer: 'الخلاطات',
    equip_mixer_txt: 'شاحنات خلاط بمعايرة دقيقة وسعات مختلفة (6–12 م³) لضمان تجانس الخلطة وثبات مقاومتها حتى موقع الصب.',
    equip_pumps: 'المضخات',
    equip_pumps_txt: 'مضخات ذراع وثابتة بمديات مختلفة لتغطية المواقع المعقدة والوصول للمستويات المرتفعة بأمان وكفاءة.',
    equip_qc: 'ضبط الجودة',
    equip_qc_txt: 'مختبرات ميدانية ومخبرية لاختبارات الهبوط والاسطوانات، وتتبّع للدفعات لضمان مطابقة المواصفات.',
    prod_title: 'منتجاتنا',
    prod_rmc: 'خرسانة جاهزة بجميع المقاومات',
    prod_block: 'بلوك أسمنتي صلب (أجوف ومصمت)',
    prod_interlock: 'إنترلوك وبلدورات',
    prod_special: 'خلطات خاصة (مقاومة كبريتات/سريعة التصلب)',
    gallery_title: 'معرض الصور',
    contact_title: 'تواصل معنا',
    contact_address: 'المملكة العربية السعودية – جدة – ذهبان',
    contact_call: 'اتصل الآن',
    contact_email: 'أرسل بريدًا',
    rights: 'جميع الحقوق محفوظة.'
  },
  en: {
    brand: 'Jawad Ready-Mix & Cement Products',
    tagline: 'We pour quality. We build trust.',
    nav_about: 'About',
    nav_equipment: 'Equipment',
    nav_products: 'Products',
    nav_gallery: 'Gallery',
    nav_contact: 'Contact',
    hero_title: 'World-class ready-mix and cement products',
    hero_sub: 'Modern mixers and pumps, strict QC, and on-time delivery to power your projects.',
    hero_cta: 'Get a Quote',
    hero_cta2: 'Explore Products',
    about_title: 'About Jawad',
    about_p1: 'We put quality at the core: delivering ready-mix and cement products that meet modern construction standards. Our QC spans from batching to pour.',
    about_p2: 'With experienced teams and well-equipped fleets, we serve residential, commercial and industrial projects with safety, sustainability and punctuality.',
    about_b1: 'Certified quality and genuine materials',
    about_b2: 'Precise delivery thanks to smart planning',
    about_b3: 'Technical and on-site support throughout',
    equip_title: 'Equipment Fleet',
    equip_mixer: 'Mixers',
    equip_mixer_txt: 'Calibrated mixer trucks with various capacities (6–12 m³) for consistent mixes all the way to site.',
    equip_pumps: 'Pumps',
    equip_pumps_txt: 'Boom and stationary pumps with different reaches to access complex sites safely and efficiently.',
    equip_qc: 'Quality Control',
    equip_qc_txt: 'Field and lab tests (slump, cylinders) and batch traceability ensure compliance.',
    prod_title: 'Our Products',
    prod_rmc: 'Ready-mix concrete (all strengths)',
    prod_block: 'Concrete blocks (hollow/solid)',
    prod_interlock: 'Interlock & curbstones',
    prod_special: 'Special mixes (sulfate-resistant/rapid hardening)',
    gallery_title: 'Gallery',
    contact_title: 'Contact Us',
    contact_address: 'Saudi Arabia – Jeddah – Dhahban',
    contact_call: 'Call Now',
    contact_email: 'Send Email',
    rights: 'All rights reserved.'
  }
};

// Language state
const langToggle = document.getElementById('langToggle');
const html = document.documentElement;
let currentLang = (localStorage.getItem('lang') || 'ar');
applyLanguage(currentLang);

if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
  });
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.ar;
  // dir & lang
  html.lang = lang === 'ar' ? 'ar' : 'en';
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  // toggle label
  if (langToggle) langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
  // i18n text
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  // Title and meta description
  document.title = lang === 'ar'
    ? 'شركة جواد للخرسانة الجاهزة والمنتجات الأسمنتية | خرسانة – بلوك – مضخات'
    : 'Jawad Ready-Mix & Cement Products | Concrete – Blocks – Pumps';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', lang === 'ar'
    ? 'شركة جواد للخرسانة الجاهزة والمنتجات الأسمنتية: خرسانة عالية الجودة، بلوك وإنترلوك، أسطول خلاطات ومضخات حديثة.'
    : 'Jawad Ready-Mix & Cement Products: high-quality concrete, blocks & interlock, modern mixers and pumps.');
}

// Smooth scroll for internal links
Array.from(document.querySelectorAll('a[href^="#"]')).forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

