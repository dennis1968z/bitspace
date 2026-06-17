// Mobile nav toggle
document.addEventListener('click', e => {
  const b = e.target.closest('.burger');
  if (b) {
    document.querySelector('.nav-links')?.classList.toggle('open');
  }
});

// Animated count-up for stat numbers
const els = document.querySelectorAll('[data-count]');
if (els.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const dec = (target % 1 !== 0) ? 1 : 0;
      let cur = 0;
      const steps = 45;
      const inc = target / steps;
      const tick = () => {
        cur += inc;
        if (cur >= target) cur = target;
        el.textContent = prefix + cur.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
      io.unobserve(el);
    });
  }, { threshold: .5 });
  els.forEach(el => io.observe(el));
}
