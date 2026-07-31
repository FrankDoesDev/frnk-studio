// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Fade-in on scroll for sections/cards
const revealTargets = document.querySelectorAll('.project, .section-head');
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
const countUp = (el) => {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';

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

// Stats live inside a collapsed <details>, so they start at zero size and
// never intersect the viewport — trigger the count-up when it's opened instead.
document.querySelectorAll('.project-details').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (!details.open) return;
    details.querySelectorAll('.stat-number').forEach(countUp);
  });
});

// Custom playlist player (replaces native <audio controls>, which can't be
// restyled to match the site since its UI lives in browser shadow DOM)
const formatTime = (seconds) => {
  if (!isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const allTrackAudio = [];

document.querySelectorAll('.track').forEach((track) => {
  const audio = track.querySelector('audio');
  const playBtn = track.querySelector('.track-play');
  const trackName = track.querySelector('.track-name').textContent;
  const bar = track.querySelector('.track-bar');
  const barFill = track.querySelector('.track-bar-fill');
  const timeEl = track.querySelector('.track-time');

  allTrackAudio.push(audio);

  const showPlaying = (isPlaying) => {
    playBtn.classList.toggle('is-playing', isPlaying);
    playBtn.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} ${trackName}`);
  };

  audio.addEventListener('loadedmetadata', () => {
    if (audio.paused) timeEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    barFill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    timeEl.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('play', () => {
    allTrackAudio.forEach((other) => {
      if (other !== audio) other.pause();
    });
    showPlaying(true);
  });

  audio.addEventListener('pause', () => showPlaying(false));

  audio.addEventListener('ended', () => {
    barFill.style.width = '0%';
    timeEl.textContent = formatTime(audio.duration);
  });

  playBtn.addEventListener('click', () => {
    if (audio.paused) audio.play();
    else audio.pause();
  });

  bar.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  });
});
