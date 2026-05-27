(function () {
  'use strict';

  var qrPattern = [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];

  function buildQrPattern(container) {
    qrPattern.forEach(function (on) {
      var cell = document.createElement('div');
      cell.className = 'qr-cell ' + (on ? 'on' : 'off');
      container.appendChild(cell);
    });
  }

  function animateChartBars() {
    document.querySelectorAll('.chart-bar').forEach(function (bar, index) {
      setTimeout(function () {
        bar.classList.add('visible');
      }, 400 + index * 30);
    });
  }

  function observeKpiCards() {
    var cards = document.querySelectorAll('.kpi-card');
    if (!cards.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  function toggleFaq(button) {
    var item = button.closest('.faq-item');
    if (!item) return;
    var open = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function (node) {
      node.classList.remove('open');
    });
    if (!open) item.classList.add('open');
  }

  function observeFadeUp() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.fade-up').forEach(function (element) {
      observer.observe(element);
    });
  }

  function observeSections() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) {
      if (section.id) observer.observe(section);
    });
  }

  function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('open');
    document.body.classList.add('nav-open');
  }

  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  function setCookiePreference(value) {
    try {
      localStorage.setItem('pqi_cookies', value);
    } catch (error) {
      /* Ignore storage failures in restricted browser modes. */
    }
    document.getElementById('cookieBanner').classList.remove('visible');
  }

  function initCookieBanner() {
    var banner = document.getElementById('cookieBanner');
    if (!banner) return;

    var stored;
    try {
      stored = localStorage.getItem('pqi_cookies');
    } catch (error) {
      stored = null;
    }

    if (!stored) {
      setTimeout(function () {
        banner.classList.add('visible');
      }, 600);
    }
  }

  function bindEvents() {
    var overlay = document.getElementById('sidebarOverlay');
    var menuToggle = document.querySelector('.menu-toggle');

    if (overlay) overlay.addEventListener('click', closeSidebar);
    if (menuToggle) menuToggle.addEventListener('click', openSidebar);

    document.querySelectorAll('.sidebar-nav a').forEach(function (link) {
      link.addEventListener('click', closeSidebar);
    });

    document.querySelectorAll('.faq-question').forEach(function (button) {
      button.addEventListener('click', function () {
        toggleFaq(button);
      });
    });

    document.querySelectorAll('[data-cookie-action]').forEach(function (button) {
      button.addEventListener('click', function () {
        setCookiePreference(button.getAttribute('data-cookie-action'));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var qr = document.getElementById('qrPattern');
    if (qr) buildQrPattern(qr);

    animateChartBars();
    observeKpiCards();
    observeFadeUp();
    observeSections();
    bindEvents();
    initCookieBanner();
  });
})();
