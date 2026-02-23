// ===== Campaign Website — Script =====

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header Shadow ---
  const header = document.querySelector('.header');
  const scrollThreshold = 20;

  function handleHeaderScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('navList');

  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a nav link
    navList.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menü öffnen');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  // --- Fade-In Animation (IntersectionObserver) ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animations slightly
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // If reduced motion, show everything immediately
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
      el.classList.add('visible');
    });
  }

  // --- Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 72;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
