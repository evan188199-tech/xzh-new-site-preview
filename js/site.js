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
        payload.id = 'LOCAL-' + Date.now().toString(36).toUpperCase();
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
            ? `已在本机浏览器保存预览询盘 ${payload.id}。未发送到服务器或邮箱。后续可接隔离收件或人工渠道。`
            : `Saved preview inquiry ${payload.id} in this browser only. Nothing was emailed or posted to a server. Backend / Chatwoot can be wired later.`;
          box.classList.add('show');
        }
        form.reset();
      });
    }
  });
})();
