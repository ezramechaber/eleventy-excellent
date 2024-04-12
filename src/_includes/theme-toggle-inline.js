(() => {
  var r = 'theme-preference',
    n = '{{ meta.themeSwitch.light }}',
    d = '{{ meta.themeSwitch.dark }}',
    t = {value: s()};
  window.onload = () => {
    let e = document.querySelector('#light-theme-toggle'),
      l = document.querySelector('#dark-theme-toggle'),
      o = document.querySelector('[data-theme-switcher]');
    o &&
      (o.removeAttribute('hidden'),
      a(),
      e.addEventListener('click', () => c('light')),
      l.addEventListener('click', () => c('dark')),
      e.setAttribute('aria-pressed', t.value === 'light'),
      l.setAttribute('aria-pressed', t.value === 'dark'));
  };
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches: e}) => {
    (t.value = e ? 'dark' : 'light'), i();
  });
  function c(e) {
    (t.value = e),
      document.querySelector('#light-theme-toggle').setAttribute('aria-pressed', e === 'light'),
      document.querySelector('#dark-theme-toggle').setAttribute('aria-pressed', e === 'dark'),
      i();
  }
  function s() {
    return localStorage.getItem(r)
      ? localStorage.getItem(r)
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  }
  function i() {
    localStorage.setItem(r, t.value), a();
  }
  function a() {
    document.firstElementChild.setAttribute('data-theme', t.value),
      document.querySelector('#light-theme-toggle')?.setAttribute('aria-label', n),
      document.querySelector('#dark-theme-toggle')?.setAttribute('aria-label', d);
  }
  a();
})();
