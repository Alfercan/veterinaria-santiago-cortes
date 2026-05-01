/* ============================================================
   Clínica Veterinaria Santiago Cortés — Animaciones
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ── LOADER ── */
function initLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0, duration: 0.5, ease: 'power2.inOut',
      onComplete() {
        loader.style.display = 'none';
        document.body.classList.remove('loading');
        animateHeroIn();
      }
    });
  }, 1800);
}

/* ── HERO ── */
function animateHeroIn() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('.hero-badge',       { opacity: 1, y: 0, duration: 0.7 })
    .to('.hero-title span',  { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, '-=0.3')
    .to('.hero-sub',         { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .to('.hero-actions',     { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-hours-quick', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-visual',      { opacity: 1, x:  0, duration: 1.0, ease: 'power4.out' }, '-=0.8');
}

/* ── NAVBAR ── */
function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('burger');
  const navMenu = document.getElementById('nav-links');
  const banner  = document.getElementById('urgencias-banner');
  const bannerH = banner ? banner.offsetHeight : 34;

  ScrollTrigger.create({
    start: 'top -40',
    onUpdate(self) {
      navbar.classList.toggle('scrolled', self.scroll() > 40);
    }
  });

  burger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── SCROLL ANIMATIONS ── */
function initScrollAnimations() {

  /* Servicios */
  document.querySelectorAll('.servicio-card').forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: { trigger: '.servicios-grid', start: 'top 82%' },
      opacity: 1, y: 0, duration: 0.7,
      delay: (i % 3) * 0.1,
      ease: 'power3.out'
    });
  });

  /* Urgencias */
  gsap.from('.urgencias-inner > *', {
    scrollTrigger: { trigger: '#urgencias', start: 'top 85%' },
    opacity: 0, y: 24, duration: 0.7, stagger: 0.15, ease: 'power3.out'
  });

  /* Reseñas */
  document.querySelectorAll('.resena-card').forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: { trigger: '.resenas-grid', start: 'top 85%' },
      opacity: 1, y: 0, duration: 0.6,
      delay: (i % 3) * 0.1,
      ease: 'power3.out'
    });
  });

  /* Veterinario */
  gsap.to('.vet-photo-wrap', {
    scrollTrigger: { trigger: '#veterinario', start: 'top 80%' },
    opacity: 1, x: 0, duration: 1, ease: 'power3.out'
  });
  gsap.to('.vet-info', {
    scrollTrigger: { trigger: '#veterinario', start: 'top 80%' },
    opacity: 1, x: 0, duration: 1, delay: 0.15, ease: 'power3.out'
  });

  /* Horario */
  gsap.to('.horario-tabla', {
    scrollTrigger: { trigger: '#horario', start: 'top 82%' },
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
  });
  gsap.to('.contacto-cards', {
    scrollTrigger: { trigger: '#horario', start: 'top 82%' },
    opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power3.out'
  });

  /* Área */
  gsap.to('.area-map-full', {
    scrollTrigger: { trigger: '#area', start: 'top 82%' },
    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out'
  });

  /* CTA cards */
  document.querySelectorAll('.cta-card').forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: { trigger: '#contacto', start: 'top 82%' },
      opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out'
    });
  });

  /* Section heads */
  document.querySelectorAll('.section-head').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0, y: 20, duration: 0.7, ease: 'power3.out'
    });
  });
}

/* ── SMOOTH ANCHORS ── */
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar').offsetHeight;
      const bannerH = document.getElementById('urgencias-banner')?.offsetHeight || 0;
      window.scrollTo({ top: target.offsetTop - navH - bannerH, behavior: 'smooth' });
    });
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initScrollAnimations();
  initSmoothLinks();
});
