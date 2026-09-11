(function () {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const hero = document.querySelector('.hero');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 72;

  /* ── Hero entrance ── */
  if (hero) {
    if (reducedMotion) {
      hero.classList.add('hero-loaded');
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => hero.classList.add('hero-loaded'));
      });
    }
  }

  /* ── Navbar scroll + active section ── */
  const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');
  const spySections = ['home', 'about', 'skills', 'projects', 'publications', 'experience', 'stack', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    const scrollPos = window.scrollY + navHeight + 80;
    let activeId = 'home';

    spySections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        activeId = section.id;
      }
    });

    navAnchors.forEach((link) => {
      link.classList.toggle('active', link.dataset.nav === activeId);
    });
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  /* ── Scroll fade-in ── */
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll(
    '.expertise-card, .project-card, .timeline-item, .stack-category, .education-card, .scholar-card, .magazine-card, .award-card'
  ).forEach((el) => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  /* ── Stat counters ── */
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (Number.isNaN(target) || el.dataset.counted) return;
        el.dataset.counted = 'true';
        animateCounter(el, target);
        statObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-number[data-target]').forEach((el) => {
    statObserver.observe(el);
  });

  function animateCounter(el, target) {
    if (reducedMotion) {
      el.textContent = target;
      return;
    }
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ── Architecture diagram flow ── */
  const archFlow = document.getElementById('archFlow');
  if (archFlow && !reducedMotion) {
    const archNodes = archFlow.querySelectorAll('.arch-node');
    const archArrows = archFlow.querySelectorAll('.arch-arrow');
    let archStep = 0;
    const archTotal = archNodes.length;

    function runArchStep() {
      archNodes.forEach((node, i) => {
        node.classList.toggle('active', i === archStep);
        node.classList.toggle('passed', i < archStep);
      });
      archArrows.forEach((arrow, i) => {
        arrow.classList.toggle('active', i === archStep);
      });
      archStep = (archStep + 1) % archTotal;
    }

    runArchStep();
    setInterval(runArchStep, 850);
  } else if (archFlow) {
    archFlow.querySelector('.arch-node')?.classList.add('active');
  }

  /* ── Terminal typewriter ── */
  const terminalBlock = document.getElementById('terminalBlock');
  if (terminalBlock) {
    const typedLines = terminalBlock.querySelectorAll('.terminal-text[data-typed]');

    function fillTerminalInstant() {
      typedLines.forEach((el) => {
        el.textContent = el.dataset.typed || '';
      });
      terminalBlock.classList.add('terminal-visible', 'terminal-done');
    }

    function typeCharacter(el, text, index, done) {
      if (index < text.length) {
        el.textContent += text[index];
        const delay = text[index] === ' ' ? 30 : 18 + Math.random() * 22;
        setTimeout(() => typeCharacter(el, text, index + 1, done), delay);
      } else {
        el.classList.remove('typing');
        done();
      }
    }

    function typeLine(el, done) {
      const text = el.dataset.typed || '';
      el.textContent = '';
      el.classList.add('typing');
      typeCharacter(el, text, 0, done);
    }

    function runTypewriter() {
      if (terminalBlock.dataset.started) return;
      terminalBlock.dataset.started = 'true';
      terminalBlock.classList.add('terminal-visible');

      if (reducedMotion) {
        fillTerminalInstant();
        return;
      }

      let lineIndex = 0;
      function nextLine() {
        if (lineIndex >= typedLines.length) {
          terminalBlock.classList.add('terminal-done');
          return;
        }
        typeLine(typedLines[lineIndex], () => {
          lineIndex += 1;
          setTimeout(nextLine, 180);
        });
      }
      nextLine();
    }

    const termObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runTypewriter();
            termObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    termObserver.observe(terminalBlock);
  }

  /* ── Cert badges stagger reveal ── */
  const certGrid = document.getElementById('certGrid');
  if (certGrid) {
    const certObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          certGrid.classList.add('certs-visible');
          certObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.25 }
    );
    certObserver.observe(certGrid);

    if (reducedMotion) {
      certGrid.classList.add('certs-visible');
    }
  }

  /* ── Contact section reveal ── */
  const contactReveal = document.querySelector('.contact-reveal');
  if (contactReveal) {
    const contactObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          contactReveal.classList.add('visible');
          contactObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );
    contactObserver.observe(contactReveal);

    if (reducedMotion) {
      contactReveal.classList.add('visible');
    }
  }
})();
