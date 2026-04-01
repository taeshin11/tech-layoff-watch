// Visitor Counter - simple visitor tracking
const Visitor = (() => {
  function init() {
    // Use localStorage-based counter as primary
    const today = new Date().toISOString().slice(0, 10);
    const stored = JSON.parse(localStorage.getItem('visitor_data') || '{}');

    if (!stored.total) stored.total = 0;
    if (stored.lastVisit !== today) {
      stored.todayCount = 1;
      stored.total += 1;
      stored.lastVisit = today;
    } else if (!stored.counted) {
      stored.todayCount = (stored.todayCount || 0) + 1;
      stored.total += 1;
    }
    stored.counted = true;

    localStorage.setItem('visitor_data', JSON.stringify(stored));

    // Display
    const todayEl = document.getElementById('visitors-today');
    const totalEl = document.getElementById('visitors-total');
    if (todayEl) todayEl.textContent = stored.todayCount || 1;
    if (totalEl) totalEl.textContent = stored.total || 1;
  }

  return { init };
})();
