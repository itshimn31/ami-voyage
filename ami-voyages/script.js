/* ============================================================
   AMI VOYAGES — Script principal
   Vanilla JS, sans dépendance
   ============================================================ */

(() => {
  'use strict';

  // ----------------------------------------------------------
  // 1. Navigation : effet scroll + toggle mobile + lien actif
  // ----------------------------------------------------------
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-drawer');

  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('active');
      toggle.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', open);
    });
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Marque le lien actif selon la page courante
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath) a.classList.add('active');
  });

  // ----------------------------------------------------------
  // 2. Reveal animations au scroll (IntersectionObserver)
  // ----------------------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ----------------------------------------------------------
  // 3. Onglets du moteur de recherche
  // ----------------------------------------------------------
  const tabs = document.querySelectorAll('.search-tab');
  const returnField = document.querySelector('.search-field-return');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.dataset.mode;
      if (returnField) {
        returnField.style.display = mode === 'oneway' ? 'none' : '';
      }
    });
  });

  // ----------------------------------------------------------
  // 4. Soumission formulaire de recherche → contact.html
  // ----------------------------------------------------------
  const searchForm = document.querySelector('#search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const params = new URLSearchParams();
      const fd = new FormData(searchForm);
      for (const [k, v] of fd.entries()) {
        if (v) params.append(k, v);
      }
      window.location.href = `contact.html?${params.toString()}`;
    });
  }

  // ----------------------------------------------------------
  // 5. Pré-remplissage du formulaire contact via URL params
  // ----------------------------------------------------------
  const url = new URL(window.location.href);
  if (url.searchParams.size > 0) {
    const map = {
      from: 'departure',
      to: 'arrival',
      depart: 'date-depart',
      return: 'date-return',
      passengers: 'passengers'
    };
    Object.entries(map).forEach(([k, fieldId]) => {
      const v = url.searchParams.get(k);
      const field = document.getElementById(fieldId);
      if (v && field) field.value = v;
    });
  }

  // ----------------------------------------------------------
  // 6. Accordéon (page formalités)
  // ----------------------------------------------------------
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      // ferme tous les autres
      document.querySelectorAll('.accordion-item.open').forEach(i => {
        if (i !== item) i.classList.remove('open');
      });
      item.classList.toggle('open', !wasOpen);
      trigger.setAttribute('aria-expanded', !wasOpen);
    });
  });

  // ----------------------------------------------------------
  // 7. Validation formulaire de contact
  // ----------------------------------------------------------
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const successEl = contactForm.querySelector('.form-success');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      contactForm.querySelectorAll('[required]').forEach(field => {
        const isEmpty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
        field.classList.toggle('error', isEmpty);
        if (isEmpty) valid = false;
      });

      // Validation email
      const email = contactForm.querySelector('[type="email"]');
      if (email && email.value) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value);
        if (!ok) { email.classList.add('error'); valid = false; }
      }

      // Validation téléphone
      const tel = contactForm.querySelector('[type="tel"]');
      if (tel && tel.value) {
        const ok = /^[\d\s+()\-.]{8,}$/.test(tel.value);
        if (!ok) { tel.classList.add('error'); valid = false; }
      }

      if (!valid) {
        const firstErr = contactForm.querySelector('.error');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Simulation d'envoi (pas de backend)
      if (successEl) {
        successEl.classList.add('visible');
        contactForm.reset();
        setTimeout(() => {
          successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        setTimeout(() => successEl.classList.remove('visible'), 8000);
      }
    });

    // Retire l'erreur au focus
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('error'));
      field.addEventListener('change', () => field.classList.remove('error'));
    });
  }

  // ----------------------------------------------------------
  // 8. Smooth scroll pour les ancres internes
  // ----------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----------------------------------------------------------
  // 9. Date par défaut sur les champs date (aujourd'hui + 14j)
  // ----------------------------------------------------------
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.min = todayISO;
  });

})();
