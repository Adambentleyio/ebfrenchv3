/* ==============================
   EB French Tutoring — main.js
   Shared JS for all pages.
   ============================== */

gsap.registerPlugin(ScrollTrigger);

/* ── Smart Nav: hide on scroll down, show on scroll up ── */
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  const threshold = 80; // px scrolled before hiding starts

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
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();

/* ── Hero Choreographed Entrance ── */
(function initHero() {
  const heroRule = document.querySelector('[data-hero-rule]');
  const heroEyebrow = document.querySelector('[data-hero-eyebrow]');
  const heroWords = document.querySelectorAll('[data-hero-word]');
  const heroSubtitle = document.querySelector('[data-hero-subtitle]');
  const heroCta = document.querySelector('[data-hero-cta]');
  const heroImage = document.querySelector('[data-hero-image]');
  const heroFloating = document.querySelectorAll('[data-hero-floating]');

  if (!heroWords.length) return;

  gsap.set(heroRule, { width: 0 });
  gsap.set(heroEyebrow, { opacity: 0, x: -24 });
  gsap.set(heroWords, { opacity: 0, y: 32 });
  gsap.set(heroSubtitle, { opacity: 0, y: 18 });
  gsap.set(heroCta.children, { opacity: 0, y: 16 });
  gsap.set(heroImage, { clipPath: 'inset(0 0 100% 0)' });
  gsap.set(heroFloating, { opacity: 0, scale: 0.75, rotation: 0.01 });

  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTL
    .to(heroRule, { width: '4rem', duration: 0.55 }, 0)
    .to(heroEyebrow, { opacity: 1, x: 0, duration: 0.45 }, 0.12)
    .to(heroWords, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out'
    }, 0.28)
    .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.6 }, 0.82)
    .to(heroCta.children, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out'
    }, 0.98)
    .to(heroImage, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.2,
      ease: 'power3.inOut'
    }, 0.55)
    .to(heroFloating, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'back.out(1.4)'
    }, 1.3);
})();

/* ── Video Dialog ── */
(function initVideoDialog() {
  const dialog = document.getElementById('video-dialog');
  const playBtn = document.querySelector('[data-play-btn]');
  const closeBtn = document.querySelector('[data-dialog-close]');
  const iframe = document.getElementById('vimeo-iframe');
  if (!dialog || !playBtn || !iframe) return;

  playBtn.addEventListener('click', () => {
    iframe.src = 'https://player.vimeo.com/video/846210210?autoplay=1';
    dialog.showModal();
  });

  closeBtn.addEventListener('click', () => {
    dialog.close();
    iframe.src = '';
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
      iframe.src = '';
    }
  });
})();

/* ── Community Pinned Split (>= 1024px only) ── */
(function initCommunityPin() {
  const pinnedLeft = document.getElementById('pinned-left');
  const pinnedContainer = document.getElementById('pinned-split-container');
  let communityPinST = null;

  function handleCommunityPin() {
    const shouldPin = window.innerWidth >= 1024;

    if (shouldPin && !communityPinST && pinnedLeft && pinnedContainer) {
      communityPinST = ScrollTrigger.create({
        trigger: pinnedContainer,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedLeft,
        pinSpacing: false,
      });
    } else if (!shouldPin && communityPinST) {
      communityPinST.kill();
      communityPinST = null;
      ScrollTrigger.refresh();
      if (pinnedLeft) pinnedLeft.removeAttribute('style');
    }
  }

  handleCommunityPin();
  window.addEventListener('resize', handleCommunityPin);
})();

/* ── Scrub Text Reveals ── */
(function initScrubText() {
  document.querySelectorAll('[data-scrub-text]').forEach(el => {
    const words = el.textContent.split(' ');
    el.innerHTML = words.map(w =>
      `<span class="scrub-word" style="opacity:0.1;display:inline-block;">${w}&nbsp;</span>`
    ).join('');
    gsap.to(el.querySelectorAll('.scrub-word'), {
      opacity: 1,
      duration: 0.15,
      stagger: 0.04,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 0.8,
      }
    });
  });
})();

/* ── Bento Grid Cards — Staggered Entrance ── */
(function initBentoCards() {
  gsap.utils.toArray('[data-gsap-card]').forEach((card, i) => {
    gsap.fromTo(card, {
      opacity: 0,
      y: 52,
      scale: 0.94
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.06
    });
  });
})();

/* ── Horizontal Accordion ── */
(function initAccordion() {
  const accordionPanels = document.querySelectorAll('[data-accordion]');

  function activateAccordionPanel(panel) {
    if (panel.classList.contains('active')) return;
    accordionPanels.forEach(p => {
      p.classList.remove('active');
      p.style.flex = '0.6';
    });
    panel.classList.add('active');
    panel.style.flex = '3';
  }

  accordionPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => activateAccordionPanel(panel));
    panel.addEventListener('click', () => activateAccordionPanel(panel));
  });
})();

/* ── Testimonial Carousel ── */
(function initTestimonialCarousel() {
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  if (!track || !prevBtn || !nextBtn) return;

  let testimonialIndex = 0;
  const totalSlides = 9;

  function slidesPerView() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  function updateCarousel() {
    const perView = slidesPerView();
    const slideWidth = 100 / perView;
    const maxIndex = totalSlides - perView;
    testimonialIndex = Math.max(0, Math.min(testimonialIndex, maxIndex));
    const offset = -(testimonialIndex * slideWidth);
    gsap.to(track, {
      x: offset + '%',
      duration: 0.55,
      ease: 'power3.out',
      overwrite: true
    });

    prevBtn.style.opacity = testimonialIndex === 0 ? '0.3' : '1';
    prevBtn.style.pointerEvents = testimonialIndex === 0 ? 'none' : 'auto';
    nextBtn.style.opacity = testimonialIndex >= maxIndex ? '0.3' : '1';
    nextBtn.style.pointerEvents = testimonialIndex >= maxIndex ? 'none' : 'auto';
  }

  nextBtn.addEventListener('click', () => { testimonialIndex++; updateCarousel(); });
  prevBtn.addEventListener('click', () => { testimonialIndex--; updateCarousel(); });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
})();

/* ── Mobile Menu Close on Link Click ── */
(function initMobileMenu() {
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.add('hidden');
    });
  });
})();

/* ── Smooth Scroll for Anchor Links ── */
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

/* ── Section Heading Reveals ── */
(function initSectionHeadings() {
  document.querySelectorAll('section[id]').forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 82%',
      onEnter: () => {
        const headings = section.querySelectorAll(':scope > div > div > h2, :scope > div > h2');
        if (headings.length) {
          gsap.fromTo(headings, {
            opacity: 0,
            y: 30,
            letterSpacing: '0.05em'
          }, {
            opacity: 1,
            y: 0,
            letterSpacing: '-0.02em',
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out'
          });
        }
      },
      once: true
    });
  });
})();

/* ── Marquee Duplication for Seamless Loop ── */
(function initMarquee() {
  const marquee = document.getElementById('marquee-track');
  if (marquee) {
    marquee.innerHTML = marquee.innerHTML + marquee.innerHTML;
  }
})();

/* ── Logo Strip Entrance ── */
(function initLogoStrip() {
  const strip = document.querySelector('[data-gsap-logo-strip]');
  if (!strip) return;
  gsap.fromTo(strip, {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: strip,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    once: true
  });
})();

console.log('EB French Tutoring — Ready.');
