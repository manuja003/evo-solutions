/* ============================================================
   EVOINN — Hotel & Reservation Management Product Website
   JavaScript v1.0 | EvoSolution / TagTeam Engineering
   ============================================================ */

/* Apply theme from URL param before any paint — covered by preloader */
(function () {
  var t = new URLSearchParams(location.search).get('theme');
  if (t === 'light') document.documentElement.classList.add('light');
})();

'use strict';

/* ── PRELOADER ─────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 700);
    }
    initReveal();
  }, 1800);
});

/* ── NAVIGATION ────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNavLink();
  updateBackToTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top && window.scrollY < top + section.offsetHeight) current = section.id;
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ── BACK TO TOP ───────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');
function updateBackToTop() { backToTop.classList.toggle('visible', window.scrollY > 400); }
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.counter').forEach(el => startCounter(el));
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  const statsSection = document.getElementById('stats');
  if (statsSection) counterObserver.observe(statsSection);

  const mockupSection = document.querySelector('.hero-mockup');
  if (mockupSection) {
    const kpiObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.kpi-val[data-count]').forEach(el => startKpiCounter(el));
          kpiObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    kpiObserver.observe(mockupSection);
  }
}

/* ── COUNTER ANIMATION ─────────────────────────────────────── */
function startCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const step = target / (2000 / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

function startKpiCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const prefix = el.getAttribute('data-prefix') || '';
  const step = target / (1800 / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    const val = Math.floor(current);
    el.textContent = prefix === 'Rs.' ? 'Rs. ' + val.toLocaleString() : val.toLocaleString();
  }, 16);
}

/* ── PARTICLE CANVAS ───────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  const particles = [];
  const count = window.innerWidth < 600 ? 30 : 55;
  function rnd(a, b) { return Math.random() * (b - a) + a; }
  for (let i = 0; i < count; i++) {
    particles.push({ x: rnd(0, canvas.width), y: rnd(0, canvas.height), r: rnd(1, 2.5), vx: rnd(-0.2, 0.2), vy: rnd(-0.3, -0.05), alpha: rnd(0.1, 0.4), color: Math.random() > 0.5 ? '124,58,237' : '37,99,235' });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -5) { p.y = canvas.height + 5; p.x = rnd(0, canvas.width); }
      if (p.x < -5) p.x = canvas.width + 5;
      if (p.x > canvas.width + 5) p.x = -5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── ROOM STATUS CYCLING ───────────────────────────────────── */
(function initRoomCycle() {
  const tiles = document.querySelectorAll('.rgm-tile[data-cycle]');
  if (!tiles.length) return;
  const states = ['occupied', 'available', 'reserved'];
  setInterval(() => {
    tiles.forEach(tile => {
      const cur = states.indexOf(tile.className.replace('rgm-tile ', ''));
      const next = (cur + 1) % states.length;
      tile.className = 'rgm-tile ' + states[next];
    });
  }, 2500);
})();

/* ── PIPELINE STAGE ANIMATION ──────────────────────────────── */
(function initPipelineAnimation() {
  const stages = document.querySelectorAll('.ps-stage');
  if (!stages.length) return;
  const progressBar = document.getElementById('pipelineProgress');
  let activeIdx = 0;
  function advance() {
    stages.forEach(s => s.classList.remove('active'));
    stages[activeIdx].classList.add('active');
    if (progressBar) progressBar.style.width = ((activeIdx / (stages.length - 1)) * 100) + '%';
    activeIdx = (activeIdx + 1) % stages.length;
  }
  advance();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { setInterval(advance, 1800); observer.disconnect(); } });
  }, { threshold: 0.4 });
  const pipeline = document.querySelector('.workflow-pipeline');
  if (pipeline) observer.observe(pipeline);
})();

/* ── SMOOTH SCROLL ─────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── CARD HOVER GLOW ────────────────────────────────────────── */
(function initCardGlow() {
  const cards = document.querySelectorAll('.feature-card, .uf-card, .benefit-item');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
      card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
    });
  });
})();

/* ── ABOUT CARD STAGGER ─────────────────────────────────────── */
(function initAboutCards() {
  const cards = document.querySelectorAll('.about-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach((card, i) => setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateX(0)'; }, i * 120));
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(card => { card.style.opacity = '0'; card.style.transform = 'translateX(-20px)'; card.style.transition = 'opacity .5s ease, transform .5s ease'; });
  const stack = document.querySelector('.about-card-stack');
  if (stack) observer.observe(stack);
})();

/* ── DASHBOARD SIDEBAR HOVER ────────────────────────────────── */
(function() {
  document.querySelectorAll('.ds-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.ds-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
})();

/* ── FORM VALIDATION ────────────────────────────────────────── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const submitBtn  = document.getElementById('submitBtn');
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const successDiv = document.getElementById('formSuccess');
  const errorDiv   = document.getElementById('formError');

  const fields = {
    fullName: { el: document.getElementById('fullName'), err: document.getElementById('err-fullName'), validate: v => v.trim().length >= 2 ? '' : 'Please enter your full name.' },
    company:  { el: document.getElementById('company'),  err: document.getElementById('err-company'),  validate: v => v.trim().length >= 2 ? '' : 'Please enter your hotel or company name.' },
    email:    { el: document.getElementById('email'),    err: document.getElementById('err-email'),    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.' },
    phone:    { el: document.getElementById('phone'),    err: document.getElementById('err-phone'),    validate: v => /^[\+\d\s\-\(\)]{7,20}$/.test(v.trim()) ? '' : 'Please enter a valid phone number.' },
    location: { el: document.getElementById('location'), err: document.getElementById('err-location'), validate: v => v.trim().length >= 2 ? '' : 'Please enter your country or city.' },
  };

  Object.values(fields).forEach(({ el, err, validate }) => {
    el.addEventListener('blur', () => { const msg = validate(el.value); err.textContent = msg; el.classList.toggle('error', !!msg); });
    el.addEventListener('input', () => { if (el.classList.contains('error')) { const msg = validate(el.value); err.textContent = msg; el.classList.toggle('error', !!msg); } });
  });

  function validateAll() {
    let valid = true;
    Object.values(fields).forEach(({ el, err, validate }) => { const msg = validate(el.value); err.textContent = msg; el.classList.toggle('error', !!msg); if (msg) valid = false; });
    return valid;
  }

  function setLoading(state) { submitBtn.disabled = state; btnText.style.display = state ? 'none' : 'flex'; btnLoading.style.display = state ? 'flex' : 'none'; }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    successDiv.style.display = 'none'; errorDiv.style.display = 'none';
    if (!validateAll()) { const firstErr = form.querySelector('.error'); if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    setLoading(true);
    const payload = new FormData();
    payload.append('_subject', 'EvoInn Demo Request — ' + fields.company.el.value.trim());
    payload.append('_template', 'table'); payload.append('_captcha', 'false');
    payload.append('Full Name', fields.fullName.el.value.trim());
    payload.append('Hotel / Company', fields.company.el.value.trim());
    payload.append('Email Address', fields.email.el.value.trim());
    payload.append('Phone Number', fields.phone.el.value.trim());
    payload.append('Country / City', fields.location.el.value.trim());
    const demoDate = document.getElementById('demoDate').value;
    const message = document.getElementById('message').value;
    if (demoDate) payload.append('Preferred Demo Date', demoDate);
    if (message.trim()) payload.append('Additional Message', message.trim());
    try {
      const res = await fetch('https://formsubmit.co/ajax/infotagteamengineering@gmail.com', { method: 'POST', headers: { 'Accept': 'application/json' }, body: payload });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        form.reset();
        Object.values(fields).forEach(({ el, err }) => { el.classList.remove('error'); err.textContent = ''; });
        successDiv.style.display = 'flex'; successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else { throw new Error('Failed'); }
    } catch { errorDiv.style.display = 'flex'; errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    finally { setLoading(false); }
  });
})();

/* ── DATE INPUT MIN ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('demoDate');
  if (dateInput) dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
});
