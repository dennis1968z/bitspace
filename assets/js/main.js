// Cookie consent banner (bilingual, auto-detects page language)
(function () {
  if (localStorage.getItem('bs_cookie_consent')) return;
  var en = document.documentElement.lang && document.documentElement.lang.indexOf('en') === 0;
  var prefix = en ? '' : '../'; // links resolve from root; en pages live one level down
  var inEn = location.pathname.indexOf('/en/') !== -1;
  var cookiesHref = inEn ? 'cookies.html' : 'cookies.html';
  var txt = en
    ? 'We use essential cookies to run this site and, with your consent, analytics cookies to improve it. See our <a href="' + cookiesHref + '">Cookie Policy</a>.'
    : '我们使用必要 Cookie 来运行本站，并在您同意后使用分析类 Cookie 以改进体验。详见<a href="' + cookiesHref + '">Cookie 政策</a>。';
  var accept = en ? 'Accept' : '接受';
  var reject = en ? 'Essential only' : '仅必要';
  var bar = document.createElement('div');
  bar.id = 'cookie-banner';
  bar.innerHTML = '<div class="cb-inner"><p>' + txt + '</p><div class="cb-btns">' +
    '<button class="reject">' + reject + '</button>' +
    '<button class="accept">' + accept + '</button></div></div>';
  document.body.appendChild(bar);
  requestAnimationFrame(function () { bar.classList.add('show'); });
  function close(v) { localStorage.setItem('bs_cookie_consent', v); bar.classList.remove('show'); }
  bar.querySelector('.accept').addEventListener('click', function () { close('all'); });
  bar.querySelector('.reject').addEventListener('click', function () { close('essential'); });
})();

// Latest insights on the homepage — fetches insights.json and renders cards
(function () {
  var box = document.getElementById('latest-insights');
  if (!box) return;
  var lang = box.getAttribute('data-lang') || 'zh';
  var feed = box.getAttribute('data-feed') || 'insights.json';
  fetch(feed).then(function (r) { return r.json(); }).then(function (items) {
    var rows = items.filter(function (it) { return it.lang === lang; }).slice(0, 3);
    if (!rows.length) return;
    var more = lang === 'en' ? 'Read more' : '阅读全文';
    box.innerHTML = rows.map(function (it) {
      var tag = it.tag ? ' · <span style="color:var(--red);font-weight:700">' + it.tag + '</span>' : '';
      return '<a class="card" href="' + it.url + '" style="display:block">' +
        '<div class="muted" style="font-size:.8rem;margin-bottom:8px">' + it.date + tag + '</div>' +
        '<h3 style="margin-bottom:10px">' + it.title + '</h3>' +
        '<p class="muted" style="font-size:.92rem">' + (it.excerpt || '') + '</p>' +
        '<span class="link-arrow" style="margin-top:8px">' + more + '</span></a>';
    }).join('');
  }).catch(function () { /* leave the "view all" link as fallback */ });
})();

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
