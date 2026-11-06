(function () {
  const KEY = 'xzh-new-site-lang';
  const supported = ['en', 'zh'];
  function current() {
    const q = new URLSearchParams(location.search).get('lang');
    if (supported.includes(q)) return q;
    const saved = localStorage.getItem(KEY);
    if (supported.includes(saved)) return saved;
    return 'en';
  }
  function apply(lang) {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n-en]').forEach((el) => {
      const v = el.getAttribute(lang === 'zh' ? 'data-i18n-zh' : 'data-i18n-en');
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html-en]').forEach((el) => {
      const v = el.getAttribute(lang === 'zh' ? 'data-i18n-html-zh' : 'data-i18n-html-en');
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('.lang button').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
    localStorage.setItem(KEY, lang);
    const url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
  }
  document.addEventListener('DOMContentLoaded', () => {
    apply(current());
    document.querySelectorAll('.lang button').forEach((btn) => {
      btn.addEventListener('click', () => apply(btn.dataset.lang));
    });
    const form = document.getElementById('inquiry-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const required = ['name', 'contact', 'need'];
        for (const k of required) {
          if (!String(fd.get(k) || '').trim()) {
            alert(document.documentElement.lang.startsWith('zh') ? '请填写必填项。' : 'Please complete required fields.');
            return;
          }
        }
        const payload = Object.fromEntries(fd.entries());
        payload.created_at = new Date().toISOString();
        payload.id = 'XZH-' + Date.now().toString(36).toUpperCase();
        try {
          const key = 'xzh-new-site-inquiries';
          const prev = JSON.parse(localStorage.getItem(key) || '[]');
          prev.push(payload);
          localStorage.setItem(key, JSON.stringify(prev));
        } catch (_) {}
        const box = document.getElementById('form-result');
        if (box) {
          const zh = document.documentElement.lang.startsWith('zh');
          box.textContent = zh
            ? `感谢提交。询盘已记录，参考编号 ${payload.id}。销售将通过您留下的联系方式审阅并回复。`
            : `Thank you. Your inquiry was recorded (ref ${payload.id}). Our sales team will review and reply via the contact details you provided.`;
          box.classList.add('show');
        }
        form.reset();
      });
    }
  });
})();
