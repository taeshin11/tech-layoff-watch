// Ads - Adsterra ad injection and Google AdSense fallback
const Ads = (() => {
  function initAdsterra() {
    // Adsterra ad slots are pre-placed in HTML
    // This script activates them when Adsterra script loads
    const adSlots = document.querySelectorAll('.ad-slot[data-ad-key]');
    adSlots.forEach(slot => {
      const key = slot.dataset.adKey;
      if (key && key !== 'ADSTERRA_KEY_HERE') {
        const ins = document.createElement('ins');
        ins.className = 'adsterra-ad';
        ins.setAttribute('data-key', key);
        slot.appendChild(ins);
        try {
          (window.adsterra = window.adsterra || []).push({});
        } catch (e) { /* silent */ }
      }
    });
  }

  function initAdSense() {
    // Google AdSense fallback - only activate if Adsterra doesn't load
    const adsenseSlots = document.querySelectorAll('.adsense-slot');
    adsenseSlots.forEach(slot => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { /* silent */ }
    });
  }

  function init() {
    initAdsterra();
    // Delay AdSense as fallback
    setTimeout(initAdSense, 3000);
  }

  return { init };
})();
