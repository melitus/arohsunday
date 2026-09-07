(function () {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll(
    '.expertise-card, .project-card, .timeline-item, .stack-category, .education-card, .scholar-card, .magazine-card, .award-card, .arch-diagram, .terminal-block'
  ).forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

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

  const archFlow = document.getElementById('archFlow');
  if (archFlow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const archNodes = archFlow.querySelectorAll('.arch-node');
    const archArrows = archFlow.querySelectorAll('.arch-arrow');
    let archStep = 0;
    const archTotal = archNodes.length;
    const archInterval = 850;

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
    setInterval(runArchStep, archInterval);
  } else if (archFlow) {
    archFlow.querySelector('.arch-node')?.classList.add('active');
  }
})();
