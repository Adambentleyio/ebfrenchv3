gsap.registerPlugin(ScrollTrigger);

/* ── Nav scroll hide ── */
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  let lastScrollY = window.scrollY;
  let ticking = false;
  const threshold = 80;
  function update() {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= 0) {
      nav.classList.remove('nav-hidden');
    } else if (currentScrollY > lastScrollY && currentScrollY > threshold) {
      nav.classList.add('nav-hidden');
    } else if (currentScrollY < lastScrollY) {
      nav.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();

/* ── Smooth scroll ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ── Mobile menu close ── */
(function initMobileMenu() {
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.add('hidden');
    });
  });
})();

/* ─────────────────────────────────────
   HERO A — Artistic Asymmetry (current)
   ───────────────────────────────────── */
(function initHeroA() {
  const rule = document.querySelector('[data-hero-a-rule]');
  const eyebrow = document.querySelector('[data-hero-a-eyebrow]');
  const words = document.querySelectorAll('[data-hero-a-word]');
  const subtitle = document.querySelector('[data-hero-a-subtitle]');
  const cta = document.querySelector('[data-hero-a-cta]');
  const image = document.querySelector('[data-hero-a-image]');
  const floating = document.querySelectorAll('[data-hero-a-floating]');

  if (!words.length) return;

  gsap.set(rule, { width: 0 });
  gsap.set(eyebrow, { opacity: 0, x: -24 });
  gsap.set(words, { opacity: 0, y: 32 });
  gsap.set(subtitle, { opacity: 0, y: 18 });
  gsap.set(cta.children, { opacity: 0, y: 16 });
  gsap.set(image, { clipPath: 'inset(0 0 100% 0)' });
  gsap.set(floating, { opacity: 0, scale: 0.75, rotation: 0.01 });

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: '#hero-a',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl
    .to(rule, { width: '4rem', duration: 0.55 }, 0)
    .to(eyebrow, { opacity: 1, x: 0, duration: 0.45 }, 0.12)
    .to(words, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out'
    }, 0.28)
    .to(subtitle, { opacity: 1, y: 0, duration: 0.6 }, 0.82)
    .to(cta.children, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out'
    }, 0.98)
    .to(image, {
      clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.inOut'
    }, 0.55)
    .to(floating, {
      opacity: 1, scale: 1, rotation: 0, duration: 0.7, stagger: 0.15, ease: 'back.out(1.4)'
    }, 1.3);
})();

/* ─────────────────────────────────────
   HERO B — Centered Editorial
   ───────────────────────────────────── */
(function initHeroB() {
  const rule = document.querySelector('[data-hero-b-rule]');
  const eyebrow = document.querySelector('[data-hero-b-eyebrow]');
  const words = document.querySelectorAll('[data-hero-b-word]');
  const subtitle = document.querySelector('[data-hero-b-subtitle]');
  const cta = document.querySelector('[data-hero-b-cta]');

  if (!words.length) return;

  gsap.set(eyebrow, { opacity: 0, y: 16 });
  gsap.set(words, { opacity: 0, y: 40 });
  gsap.set(subtitle, { opacity: 0, y: 24 });
  gsap.set(cta.children, { opacity: 0, y: 20, scale: 0.95 });
  gsap.set(rule, { width: 0 });

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: '#hero-b',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl
    .to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0)
    .to(words, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
    }, 0.15)
    .to(subtitle, { opacity: 1, y: 0, duration: 0.6 }, 0.65)
    .to(cta.children, {
      opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out'
    }, 0.8)
    .to(rule, { width: '6rem', duration: 0.6 }, 1.1);
})();

/* ─────────────────────────────────────
   HERO C — Clean Split
   ───────────────────────────────────── */
(function initHeroC() {
  const eyebrow = document.querySelector('[data-hero-c-eyebrow]');
  const words = document.querySelectorAll('[data-hero-c-word]');
  const subtitle = document.querySelector('[data-hero-c-subtitle]');
  const cta = document.querySelector('[data-hero-c-cta]');
  const image = document.querySelector('[data-hero-c-image]');
  const imageBlock = document.querySelector('[data-hero-c-image-block]');

  if (!words.length) return;

  gsap.set(eyebrow, { opacity: 0, x: -20 });
  gsap.set(words, { opacity: 0, y: 28 });
  gsap.set(subtitle, { opacity: 0, y: 18 });
  gsap.set(cta.children, { opacity: 0, y: 16 });
  gsap.set(image, { clipPath: 'inset(0 100% 0 0)' });
  gsap.set(imageBlock, { opacity: 0, x: 40 });

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: '#hero-c',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl
    .to(eyebrow, { opacity: 1, x: 0, duration: 0.4 }, 0)
    .to(words, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: 'power3.out'
    }, 0.1)
    .to(subtitle, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
    .to(cta.children, {
      opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: 'power3.out'
    }, 0.7)
    .to(imageBlock, { opacity: 1, x: 0, duration: 0.7 }, 0.25)
    .to(image, {
      clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut'
    }, 0.35);
})();

/* ─────────────────────────────────────
   HERO D — Image Background
   ───────────────────────────────────── */
(function initHeroD() {
  const bg = document.querySelector('[data-hero-d-bg]');
  const eyebrow = document.querySelector('[data-hero-d-eyebrow]');
  const words = document.querySelectorAll('[data-hero-d-word]');
  const subtitle = document.querySelector('[data-hero-d-subtitle]');
  const cta = document.querySelector('[data-hero-d-cta]');

  if (!words.length) return;

  gsap.set(bg, { scale: 1.08 });
  gsap.set(eyebrow, { opacity: 0, y: 20 });
  gsap.set(words, { opacity: 0, y: 40 });
  gsap.set(subtitle, { opacity: 0, y: 24 });
  gsap.set(cta.children, { opacity: 0, y: 16 });

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: '#hero-d',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl
    .to(bg, { scale: 1, duration: 1.8, ease: 'power2.out' }, 0)
    .to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
    .to(words, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out'
    }, 0.35)
    .to(subtitle, { opacity: 1, y: 0, duration: 0.6 }, 0.85)
    .to(cta.children, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power3.out'
    }, 1.0);
})();
