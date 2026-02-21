/* ═══════════════════════════════════════════════
   KHALED MOUSA PORTFOLIO — main.js
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Year ───────────────────────────────────── */
  const yrEl = document.getElementById('yr');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  /* ── Header scroll state ─────────────────────── */
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile nav toggle ───────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) navLinks.classList.remove('open');
    });
  }

  /* ── Active nav link (IntersectionObserver) ─── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length && navAnchors.length) {
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          navAnchors.forEach(a =>
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id)
          );
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => navObs.observe(s));
  }

  /* ── Scroll reveal ───────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (!en.isIntersecting) return;
        const delay = reduce ? 0 : i * 90;
        setTimeout(() => en.target.classList.add('visible'), delay);
        revealObs.unobserve(en.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObs.observe(el));
  }

  /* ── Animated bar fills ──────────────────────── */
  const barFills = document.querySelectorAll('.bar-fill');
  if (barFills.length) {
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('animated');
          barObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.6 });
    barFills.forEach(b => barObs.observe(b));
  }

  /* ── Smooth anchor scroll ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  /* ── Mouse-spotlight on cards ─────────────────── */
  if (!reduce) {
    const spotlightCards = document.querySelectorAll(
      '.project-card, .skill-cat, .timeline-content, .edu-card, .leader-card, .contact-card'
    );
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
    });
  }

  /* ── Subtle 3-D tilt on hero cards ─────────────── */
  if (!reduce) {
    document.querySelectorAll('.code-card, .hero-metrics, .info-card').forEach(el => {
      let raf = null;
      el.addEventListener('mousemove', (e) => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width  - 0.5;
          const y = (e.clientY - rect.top)  / rect.height - 0.5;
          el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(6px)`;
        });
      });
      el.addEventListener('mouseleave', () => {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = '';
      });
    });
  }

  /* ── Micro-click ripple ───────────────────────── */
  if (!reduce) {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card, .contact-card, .info-card, .pill, .btn-primary, .btn-ghost');
      if (!card) return;
      card.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(0.98)' }, { transform: 'scale(1)' }],
        { duration: 180, easing: 'cubic-bezier(.2,.9,.2,1)' }
      );
    });
  }

})();
