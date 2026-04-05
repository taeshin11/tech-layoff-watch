// i18n - Internationalization module
const i18n = (() => {
  let translations = {};
  let currentLang = 'en';
  const supportedLangs = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  const langNames = {
    en: 'English',
    ko: '\ud55c\uad6d\uc5b4',
    ja: '\u65e5\u672c\u8a9e',
    zh: '\u4e2d\u6587',
    es: 'Espa\u00f1ol',
    fr: 'Fran\u00e7ais',
    de: 'Deutsch',
    pt: 'Portugu\u00eas'
  };

  async function init() {
    try {
      const resp = await fetch('data/translations.json');
      translations = await resp.json();
    } catch (e) {
      console.error('Failed to load translations:', e);
    }

    // Detect language: URL param > saved preference > browser auto-detect
    try {
      const urlParam = new URLSearchParams(window.location.search).get('lang');
      if (urlParam && supportedLangs.includes(urlParam)) {
        currentLang = urlParam;
        localStorage.setItem('preferred_lang', urlParam);
      } else {
        const saved = localStorage.getItem('preferred_lang');
        if (saved && supportedLangs.includes(saved)) {
          currentLang = saved;
        } else {
          const userLang = navigator.language || navigator.languages?.[0] || 'en';
          currentLang = supportedLangs.find(l => userLang.startsWith(l)) || 'en';
        }
      }
    } catch (e) {
      const saved = localStorage.getItem('preferred_lang');
      if (saved && supportedLangs.includes(saved)) {
        currentLang = saved;
      } else {
        const userLang = navigator.language || navigator.languages?.[0] || 'en';
        currentLang = supportedLangs.find(l => userLang.startsWith(l)) || 'en';
      }
    }

    populateLangSelector();
    applyTranslations();
  }

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key])
      || (translations['en'] && translations['en'][key])
      || key;
  }

  function setLang(lang) {
    if (supportedLangs.includes(lang)) {
      currentLang = lang;
      localStorage.setItem('preferred_lang', lang);
      applyTranslations();
      document.documentElement.lang = lang;
      // Trigger re-render
      if (typeof App !== 'undefined' && App.refresh) App.refresh();
    }
  }

  function getLang() {
    return currentLang;
  }

  function populateLangSelector() {
    const selectors = document.querySelectorAll('.lang-selector');
    selectors.forEach(select => {
      select.innerHTML = '';
      supportedLangs.forEach(lang => {
        const opt = document.createElement('option');
        opt.value = lang;
        opt.textContent = langNames[lang];
        if (lang === currentLang) opt.selected = true;
        select.appendChild(opt);
      });
      select.addEventListener('change', (e) => setLang(e.target.value));
    });
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translated = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translated;
      } else {
        el.textContent = translated;
      }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.dataset.i18nTitle);
    });
  }

  return { init, t, setLang, getLang, applyTranslations };
})();
