// App - Main application logic
const App = (() => {
  let allData = [];
  let currentYear = 'all';
  let currentSearch = '';

  async function init() {
    // Initialize i18n first
    await i18n.init();

    // Load data
    allData = await DataLoader.loadData();

    // Set up year buttons
    setupYearSelector();

    // Set up search
    Search.init('search-input', (query) => {
      currentSearch = query;
      renderAll();
    });

    // Set up table sort handler
    Table.onSort((sort) => {
      renderAll();
    });

    // Set up CSV export
    const exportBtn = document.getElementById('export-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const filtered = getFilteredData();
        Table.exportCSV(filtered);
      });
    }

    // Initialize visitor counter
    Visitor.init();

    // Initialize sheets webhook
    SheetsWebhook.init();

    // Initialize ads
    Ads.init();

    // Scroll to top button
    setupScrollTop();

    // Render everything
    renderAll();

    // Animate counters
    setTimeout(animateCounters, 100);
  }

  function getFilteredData() {
    let data = DataLoader.filterByYear(allData, currentYear);
    data = DataLoader.filterBySearch(data, currentSearch);
    return data;
  }

  function renderAll() {
    const data = getFilteredData();
    const sort = Table.getCurrentSort();
    const sorted = DataLoader.sortData(data, sort.field, sort.direction);

    // Stats
    renderStats(data);

    // Charts
    const monthlyData = Stats.getMonthlyData(data);
    Charts.renderMonthlyChart('monthly-chart', monthlyData);

    const breakdown = Stats.getIndustryBreakdown(data);
    Charts.renderPieChart('pie-chart', breakdown);

    // Table
    Table.setData(sorted);
    Table.render('table-container');

    // Timeline
    renderTimeline(sorted.slice(0, 10));

    // Update i18n
    i18n.applyTranslations();
  }

  function renderStats(data) {
    const stats = Stats.compute(data);
    const t = i18n.t.bind(i18n);

    // Hero counter
    const totalEl = document.getElementById('total-number');
    if (totalEl) totalEl.textContent = stats.totalAffected.toLocaleString();

    const subtitleEl = document.getElementById('hero-subtitle');
    if (subtitleEl) subtitleEl.textContent = `${stats.totalEvents} ${t('total_events').toLowerCase()} ${t('of').toLowerCase()} ${stats.totalCompanies} ${t('total_companies').toLowerCase()}`;

    // Stat cards
    setStatValue('stat-this-year', stats.totalThisYear);
    setStatValue('stat-this-month', stats.totalThisMonth);
    setStatValue('stat-companies', stats.totalCompanies);
    setStatValue('stat-events', stats.totalEvents);

    // Largest event
    const largestEl = document.getElementById('stat-largest');
    if (largestEl) {
      largestEl.innerHTML = `<span class="stat-value">${stats.largestEvent.headcount ? stats.largestEvent.headcount.toLocaleString() : '-'}</span>
        <span class="stat-label">${t('largest_event')}: ${stats.largestEvent.company || '-'}</span>`;
    }

    // Most affected
    const mostEl = document.getElementById('stat-most-affected');
    if (mostEl) {
      mostEl.innerHTML = `<span class="stat-value">${stats.mostAffectedCount.toLocaleString()}</span>
        <span class="stat-label">${t('most_affected')}: ${stats.mostAffectedCompany || '-'}</span>`;
    }
  }

  function setStatValue(id, value) {
    const el = document.getElementById(id);
    if (el) {
      const valueEl = el.querySelector('.stat-value');
      if (valueEl) valueEl.textContent = value.toLocaleString();
    }
  }

  function renderTimeline(data) {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    const t = i18n.t.bind(i18n);
    let html = '';
    data.forEach(d => {
      const dateStr = new Date(d.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      html += `
        <div class="timeline-item">
          <div class="timeline-date">${dateStr}</div>
          <div class="timeline-content">
            <h4>${escapeHtml(d.company)}</h4>
            <p><span class="timeline-headcount">${d.headcount ? d.headcount.toLocaleString() : '?'} ${t('employees')}</span> - ${escapeHtml(d.department || 'Multiple ' + t('departments'))}</p>
          </div>
        </div>`;
    });
    container.innerHTML = html || `<p style="color:var(--text-secondary)">No recent events.</p>`;
  }

  function setupYearSelector() {
    const container = document.getElementById('year-selector');
    if (!container) return;

    const years = ['all', '2026', '2025', '2024', '2023', '2022'];
    const t = i18n.t.bind(i18n);

    container.innerHTML = '';
    years.forEach(year => {
      const btn = document.createElement('button');
      btn.className = `year-btn ${year === currentYear ? 'active' : ''}`;
      btn.textContent = year === 'all' ? t('year_all') : year;
      btn.addEventListener('click', () => {
        currentYear = year;
        container.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderAll();
      });
      container.appendChild(btn);
    });
  }

  function animateCounters() {
    const totalEl = document.getElementById('total-number');
    if (!totalEl) return;
    const target = parseInt(totalEl.textContent.replace(/,/g, ''));
    if (isNaN(target) || target === 0) return;

    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    totalEl.textContent = '0';

    function update() {
      current += step;
      if (current >= target) {
        totalEl.textContent = target.toLocaleString();
        return;
      }
      totalEl.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function setupScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function refresh() {
    setupYearSelector();
    renderAll();
  }

  return { init, refresh };
})();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', App.init);
