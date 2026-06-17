import { initEmergency } from './modules/emergency.js';
import { initLibrary }   from './modules/library.js';
import { initCharts }    from './modules/charts.js';
import { initMap }       from './modules/map.js';
import { initTheme }     from './modules/theme.js';
import { animateCounter } from './utils/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEmergency();
  initMobileNav();
  initHeaderScroll();
  initScrollSpy();
  initAccordion();
  initFadeObserver();
  initLibrary();
  initLazyDataSection();
  initKPICounters();
  initShareButtons();
});

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu de navegação');
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', isActive);
        if (isActive && link.classList.contains('nav-link--cta')) {
          link.classList.remove('is-active');
        }
      });
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}

function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.accordion-trigger').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling?.classList.remove('open');
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling?.classList.add('open');
      }
    });
  });
}

function initFadeObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

function initKPICounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      if (!isNaN(target)) animateCounter(el, target, 1800, suffix);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.kpi-value').forEach(el => observer.observe(el));

  const criseCounter = document.getElementById('crise-counter-38m');
  if (criseCounter) {
    const criseObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        animateCounter(criseCounter, 38000000, 2400, '');
        criseObserver.unobserve(criseCounter);
      });
    }, { threshold: 0.4 });
    criseObserver.observe(criseCounter);
  }
}

function initLazyDataSection() {
  const dadosSection = document.getElementById('dados');
  if (!dadosSection) return;

  let chartsLoaded = false;
  let mapLoaded    = false;

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;

    const tryInit = () => {
      if (!chartsLoaded && typeof Chart !== 'undefined') {
        initCharts();
        chartsLoaded = true;
      }
      if (!mapLoaded && typeof L !== 'undefined') {
        initMap();
        mapLoaded = true;
      }
      if (!chartsLoaded || !mapLoaded) {
        setTimeout(tryInit, 150);
      }
    };
    tryInit();
    observer.unobserve(dadosSection);
  }, { rootMargin: '300px' });

  observer.observe(dadosSection);
}

function initShareButtons() {
  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', () => {
      const network = btn.dataset.share;
      const text = 'Conheça o projeto Amigos da Vida Animal — Cultura de Paz e Preservação da Fauna Silvestre!';
      const url  = window.location.href;

      if (network === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank', 'noopener,noreferrer');
      }
    });
  });
}
