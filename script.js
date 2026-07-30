// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Fade-in on scroll for sections/cards
const revealTargets = document.querySelectorAll(
  '.stat, .sample-card, .section-head'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => io.observe(el));

// Animated count-up for stat numbers
const statEls = document.querySelectorAll('.stat-number');
const countUp = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const statIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        statIo.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
statEls.forEach((el) => statIo.observe(el));
