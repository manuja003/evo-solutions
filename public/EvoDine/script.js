/* ============================================================
   EVODINE — Premium Restaurant Management Product Website
   JavaScript v1.0 | EvoSolution / TagTeam Engineering
   ============================================================ */

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
  }, 1900);
});

/* ── NAVIGATION ────────────────────────────────────────────── */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
  updateBackToTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
});

/* Close mobile nav on link click */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

/* Active nav link on scroll */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const top    = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.getAttribute('id');
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* ── BACK TO TOP ───────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');

function updateBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        if (entry.target.dataset.counter !== undefined) {
          startCounter(entry.target);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

  /* Counter observer */
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
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

function startKpiCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const val = Math.floor(current);
    if (prefix === 'Rs.') {
      el.textContent = 'Rs. ' + val.toLocaleString();
    } else {
      el.textContent = val.toLocaleString();
    }
  }, 16);
}

/* ── PARTICLE CANVAS ───────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const count = window.innerWidth < 600 ? 30 : 60;

  function rnd(a, b) { return Math.random() * (b - a) + a; }

  for (let i = 0; i < count; i++) {
    particles.push({
      x: rnd(0, canvas.width),
      y: rnd(0, canvas.height),
      r: rnd(1, 2.5),
      vx: rnd(-0.2, 0.2),
      vy: rnd(-0.3, -0.05),
      alpha: rnd(0.1, 0.45),
      color: Math.random() > 0.5 ? '255,107,43' : '37,99,235',
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -5) { p.y = canvas.height + 5; p.x = rnd(0, canvas.width); }
      if (p.x < -5) p.x = canvas.width + 5;
      if (p.x > canvas.width + 5) p.x = -5;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── HERO ORDER STATUS CYCLING ─────────────────────────────── */
(function initOrderStatusCycle() {
  const statuses = [
    { text: 'Checking',  cls: 'checking' },
    { text: 'Queued',    cls: 'queued' },
    { text: 'Preparing', cls: 'preparing' },
    { text: 'Ready',     cls: 'ready' },
    { text: 'Served',    cls: 'served' },
  ];
  const badge = document.querySelector('#orderRow1 .status-chip');
  if (!badge) return;

  let idx = 2; /* Start at 'Preparing' */

  setInterval(() => {
    idx = (idx + 1) % statuses.length;
    const s = statuses[idx];
    badge.className = `status-chip ${s.cls}`;
    badge.textContent = s.text;
  }, 2200);
})();

/* ── PIPELINE STAGE ANIMATION ──────────────────────────────── */
(function initPipelineAnimation() {
  const stages = document.querySelectorAll('.ps-stage');
  if (!stages.length) return;

  let activeIdx = 0;

  function advance() {
    stages.forEach(s => s.classList.remove('active'));
    stages[activeIdx].classList.add('active');
    activeIdx = (activeIdx + 1) % stages.length;
  }

  advance();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setInterval(advance, 1800);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const pipeline = document.querySelector('.workflow-pipeline');
  if (pipeline) observer.observe(pipeline);
})();

/* ── VIDEO SHOWCASE ────────────────────────────────────────── */
(function initVideoShowcase() {
  const facade = document.getElementById('vsFacade');
  if (!facade) return;

  const videoId = facade.dataset.video;
  const ytWatch = `https://www.youtube.com/watch?v=${videoId}`;

  function loadPlayer() {
    const playerWrap = facade.parentElement; /* .vs-player-wrap */

    /* ── Build iframe ── */
    const iframeWrap = document.createElement('div');
    iframeWrap.className = 'vs-iframe-wrap';

    const iframe = document.createElement('iframe');
    /* youtube-nocookie + enablejsapi so we can receive postMessage events */
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}`
      + `?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3`
      + `&color=white&playsinline=1&enablejsapi=1`;
    iframe.title          = 'EvoDine Platform Demo';
    iframe.allow          = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.frameBorder    = '0';

    iframeWrap.appendChild(iframe);
    facade.replaceWith(iframeWrap);

    /* ── Listen for YouTube IFrame API postMessage events ──
       YouTube sends JSON strings for onError / onStateChange.
       Error codes that signal embedding is disabled: 101, 150, 153.      */
    function onYTMessage(e) {
      if (!e.data) return;
      try {
        const d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        const evt  = d.event  || '';
        const code = d.info   !== undefined ? d.info
                   : d.value  !== undefined ? d.value : null;

        /* Video playing — all good, remove listener */
        if (evt === 'onStateChange' && code === 1) { cleanup(); return; }

        /* Any error → show recovery UI */
        if (evt === 'onError') { cleanup(); showEmbedError(iframeWrap); }

        /* Newer info-delivery envelope that carries an error sub-field */
        if (evt === 'infoDelivery' && d.info && d.info.error) {
          cleanup(); showEmbedError(iframeWrap);
        }
      } catch { /* ignore non-JSON messages */ }
    }

    window.addEventListener('message', onYTMessage);

    /* Safety net: if no state change after 12 s, stop listening */
    const safetyTimer = setTimeout(() => cleanup(), 12000);

    function cleanup() {
      clearTimeout(safetyTimer);
      window.removeEventListener('message', onYTMessage);
    }
  }

  /* ── Embedding-blocked error state ──
     Shows inside the player area with fix instructions + YouTube fallback. */
  function showEmbedError(container) {
    container.innerHTML = `
      <div class="vs-error-state">
        <div class="vs-err-icon"><i class="fa-solid fa-circle-exclamation"></i></div>
        <h4>Embedding Disabled on This Video</h4>
        <p>
          The video owner needs to allow embedding in
          <strong>YouTube Studio</strong>.
        </p>
        <ol class="vs-err-steps">
          <li>Open <strong>YouTube Studio</strong> → <strong>Content</strong></li>
          <li>Click the video → <strong>Edit</strong></li>
          <li>Select <strong>More options</strong></li>
          <li>Under <em>Distribution</em>, tick <strong>Allow embedding</strong></li>
          <li>Save — the video will play here instantly</li>
        </ol>
        <a href="${ytWatch}" target="_blank" rel="noopener noreferrer" class="btn-primary vs-err-btn">
          <i class="fa-brands fa-youtube"></i> Watch on YouTube for now
        </a>
      </div>`;
  }

  facade.addEventListener('click', loadPlayer);
  facade.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadPlayer(); }
  });
})();

/* ── SCREEN TABS ───────────────────────────────────────────── */
(function initScreenTabs() {
  const tabs     = document.querySelectorAll('.st-tab');
  const panels   = document.querySelectorAll('.screen-panel');
  let currentIdx = 0;
  let isAnimating = false;

  const ANIM_CLASSES = ['is-entering', 'from-right', 'from-left'];

  function clearAnim(el) {
    el.classList.remove(...ANIM_CLASSES);
  }

  tabs.forEach((tab, tabIdx) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active') || isAnimating) return;

      const prevIdx    = currentIdx;
      const dir        = tabIdx > prevIdx ? 'right' : 'left';
      const prevPanel  = document.querySelector('.screen-panel.active');
      const nextPanel  = document.getElementById('screen-' + tab.dataset.screen);

      if (!nextPanel || nextPanel === prevPanel) return;

      isAnimating = true;
      currentIdx  = tabIdx;

      /* ① Update tab buttons */
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      /* ② Fade out the leaving panel */
      if (prevPanel) {
        prevPanel.classList.remove('active');
        /* prevPanel fades via CSS transition (opacity .35s) */
      }

      /* ③ Prep entering panel with direction class but keep hidden */
      clearAnim(nextPanel);
      nextPanel.classList.add(dir === 'right' ? 'from-right' : 'from-left');

      /* ④ One rAF so the browser registers the start state before animating */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          nextPanel.classList.add('active', 'is-entering');

          /* ⑤ Clean up animation classes after they finish */
          nextPanel.addEventListener('animationend', () => {
            clearAnim(nextPanel);
            isAnimating = false;
          }, { once: true });

          /* Fallback unlock if animationend never fires */
          setTimeout(() => { isAnimating = false; }, 600);
        });
      });
    });
  });
})();

/* ── TESTIMONIAL SLIDER ────────────────────────────────────── */
(function initTestimonials() {
  const viewport = document.querySelector('.ts-viewport');
  const track    = document.getElementById('tsTrack');
  const prevBtn  = document.getElementById('tsPrev');
  const nextBtn  = document.getElementById('tsNext');
  const dotsWrap = document.getElementById('tsDots');

  if (!track || !viewport) return;

  const cards = Array.from(track.querySelectorAll('.testimonial-card'));
  const GAP   = 24;
  let current  = 0;
  let perView  = window.innerWidth <= 600 ? 1 : 2;
  let total    = Math.ceil(cards.length / perView);
  let cardPx   = 0;
  let autoTimer;

  /* Set explicit pixel widths on every card so calc() % isn't ambiguous */
  function setCardWidths() {
    const vw = viewport.offsetWidth;
    cardPx = perView === 1 ? vw : Math.floor((vw - GAP) / 2);
    cards.forEach(c => { c.style.width = cardPx + 'px'; });
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'ts-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); resetAuto(); });
      dotsWrap.appendChild(dot);
    }
  }

  function goTo(idx) {
    current = ((idx % total) + total) % total; /* wrap-around */
    /* Each page moves perView cards: translate = current * perView * (cardPx + GAP) */
    const offset = current * perView * (cardPx + GAP);
    track.style.transform = `translateX(-${offset}px)`;
    dotsWrap.querySelectorAll('.ts-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  function autoPlay() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoPlay();
  }

  function onResize() {
    perView  = window.innerWidth <= 600 ? 1 : 2;
    total    = Math.ceil(cards.length / perView);
    current  = 0;
    /* Disable transition during resize so it snaps instantly */
    track.style.transition = 'none';
    setCardWidths();
    buildDots();
    goTo(0);
    requestAnimationFrame(() => {
      track.style.transition = '';
    });
  }

  setCardWidths();
  buildDots();
  goTo(0);
  autoPlay();
  window.addEventListener('resize', onResize);
})();

/* ── FORM VALIDATION & SUBMISSION ─────────────────────────--─── */
(function initForm() {
  const form       = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn  = document.getElementById('submitBtn');
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const successDiv = document.getElementById('formSuccess');
  const errorDiv   = document.getElementById('formError');

  const fields = {
    fullName: {
      el: document.getElementById('fullName'),
      err: document.getElementById('err-fullName'),
      validate: v => v.trim().length >= 2 ? '' : 'Please enter your full name (minimum 2 characters).',
    },
    company: {
      el: document.getElementById('company'),
      err: document.getElementById('err-company'),
      validate: v => v.trim().length >= 2 ? '' : 'Please enter your restaurant or company name.',
    },
    email: {
      el: document.getElementById('email'),
      err: document.getElementById('err-email'),
      validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    },
    phone: {
      el: document.getElementById('phone'),
      err: document.getElementById('err-phone'),
      validate: v => /^[\+\d\s\-\(\)]{7,20}$/.test(v.trim()) ? '' : 'Please enter a valid phone number.',
    },
    location: {
      el: document.getElementById('location'),
      err: document.getElementById('err-location'),
      validate: v => v.trim().length >= 2 ? '' : 'Please enter your country or city.',
    },
  };

  /* Real-time validation on blur */
  Object.values(fields).forEach(({ el, err, validate }) => {
    el.addEventListener('blur', () => {
      const msg = validate(el.value);
      err.textContent = msg;
      el.classList.toggle('error', !!msg);
    });
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        const msg = validate(el.value);
        err.textContent = msg;
        el.classList.toggle('error', !!msg);
      }
    });
  });

  function validateAll() {
    let valid = true;
    Object.values(fields).forEach(({ el, err, validate }) => {
      const msg = validate(el.value);
      err.textContent = msg;
      el.classList.toggle('error', !!msg);
      if (msg) valid = false;
    });
    return valid;
  }

  function setLoading(state) {
    submitBtn.disabled = state;
    btnText.style.display   = state ? 'none' : 'flex';
    btnLoading.style.display = state ? 'flex' : 'none';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    successDiv.style.display = 'none';
    errorDiv.style.display   = 'none';

    if (!validateAll()) {
      /* Scroll to first error */
      const firstErr = form.querySelector('.error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);

    const demoDate = document.getElementById('demoDate').value;
    const message  = document.getElementById('message').value;

    const payload = new FormData();
    payload.append('_subject', 'EvoDine Demo Request — ' + fields.company.el.value.trim());
    payload.append('_template', 'table');
    payload.append('_captcha',  'false');
    payload.append('Full Name',           fields.fullName.el.value.trim());
    payload.append('Restaurant / Company', fields.company.el.value.trim());
    payload.append('Email Address',       fields.email.el.value.trim());
    payload.append('Phone Number',        fields.phone.el.value.trim());
    payload.append('Country / City',      fields.location.el.value.trim());
    if (demoDate) payload.append('Preferred Demo Date', demoDate);
    if (message.trim()) payload.append('Additional Message', message.trim());

    try {
      const res = await fetch('https://formsubmit.co/ajax/infotagteamengineering@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: payload,
      });

      const data = await res.json();

      if (data.success === 'true' || data.success === true) {
        form.reset();
        Object.values(fields).forEach(({ el, err }) => {
          el.classList.remove('error');
          err.textContent = '';
        });
        successDiv.style.display = 'flex';
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      errorDiv.style.display = 'flex';
      errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      setLoading(false);
    }
  });
})();

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = navbar.offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── FEATURE CARD HOVER GLOW ────────────────────────────────── */
(function initCardGlow() {
  const cards = document.querySelectorAll('.feature-card, .uf-card, .benefit-item');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
})();

/* ── DASHBOARD SIDEBAR HOVER ────────────────────────────────── */
(function initDashSidebar() {
  const items = document.querySelectorAll('.ds-nav-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
})();

/* ── ABOUT CARD STAGGER REVEAL ──────────────────────────────── */
(function initAboutCards() {
  const cards = document.querySelectorAll('.about-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
          }, i * 120);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px)';
    card.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const stack = document.querySelector('.about-card-stack');
  if (stack) observer.observe(stack);
})();

/* ── NUMBER INPUT: Prevent letters in phone ─────────────────── */
(function() {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;
  phoneInput.addEventListener('keypress', e => {
    if (!/[\d\s\+\-\(\)]/.test(e.key) && !['Backspace','Tab','ArrowLeft','ArrowRight','Delete'].includes(e.key)) {
      e.preventDefault();
    }
  });
})();

/* ── DATE INPUT: Prevent past dates for demo ─────────────────── */
(function() {
  const dateInput = document.getElementById('demoDate');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
})();

/* ── SECTION ENTRY GLOWS ────────────────────────────────────── */
(function initSectionGlow() {
  const sections = document.querySelectorAll('#features, #workflow, #why-choose, #testimonials');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.style.transition = 'opacity .5s ease';
      entry.target.style.opacity = entry.isIntersecting ? '1' : '0.7';
    });
  }, { threshold: 0.1 });

  sections.forEach(s => observer.observe(s));
})();

/* ── INIT ON DOM READY ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /* Set min date for demo date input */
  const dateInput = document.getElementById('demoDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
});
