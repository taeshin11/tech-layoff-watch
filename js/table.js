// Table - rendering, sorting, pagination
const Table = (() => {
  const ITEMS_PER_PAGE = 20;
  let currentPage = 1;
  let currentSort = { field: 'date', direction: 'desc' };
  let filteredData = [];
  let onSortChange = null;

  function setData(data) {
    filteredData = data;
    currentPage = 1;
  }

  function getPageData() {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }

  function getTotalPages() {
    return Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  }

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const pageData = getPageData();
    const totalPages = getTotalPages();
    const t = (typeof i18n !== 'undefined') ? i18n.t.bind(i18n) : (k) => k;

    let html = `
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th data-sort="company" class="${currentSort.field === 'company' ? 'sorted' : ''}">${t('company')} <span class="sort-icon">${getSortIcon('company')}</span></th>
              <th data-sort="date" class="${currentSort.field === 'date' ? 'sorted' : ''}">${t('date')} <span class="sort-icon">${getSortIcon('date')}</span></th>
              <th data-sort="headcount" class="${currentSort.field === 'headcount' ? 'sorted' : ''}">${t('headcount')} <span class="sort-icon">${getSortIcon('headcount')}</span></th>
              <th class="hide-mobile">${t('percentage')}</th>
              <th class="hide-mobile">${t('industry')}</th>
              <th class="hide-mobile">${t('location')}</th>
              <th>${t('source')}</th>
            </tr>
          </thead>
          <tbody>`;

    if (pageData.length === 0) {
      html += `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-secondary);">${t('no_results')}</td></tr>`;
    }

    pageData.forEach((d, idx) => {
      const globalIdx = (currentPage - 1) * ITEMS_PER_PAGE + idx;
      html += `
            <tr>
              <td><span class="company-name">${escapeHtml(d.company)}</span>${d.parent_company && d.parent_company !== d.company ? `<br><small style="color:var(--text-secondary)">${escapeHtml(d.parent_company)}</small>` : ''}</td>
              <td>${formatDate(d.date)}</td>
              <td class="headcount-cell">${d.headcount ? d.headcount.toLocaleString() : '-'}</td>
              <td class="hide-mobile">${d.percentage ? d.percentage + '%' : '-'}</td>
              <td class="hide-mobile"><span class="industry-badge">${escapeHtml(d.industry || '-')}</span></td>
              <td class="hide-mobile">${escapeHtml(d.location || '-')}</td>
              <td><a href="${d.source_url}" target="_blank" rel="noopener noreferrer" class="source-link">${t('source')}</a></td>
            </tr>`;

      // Ad slot after every 10th row
      if ((globalIdx + 1) % 10 === 0 && globalIdx < filteredData.length - 1) {
        html += `<tr><td colspan="7"><div class="ad-slot" id="ad-in-table-${globalIdx}" data-ad-key="ADSTERRA_KEY_HERE">Ad</div></td></tr>`;
      }
    });

    html += `</tbody></table></div>`;

    // Pagination
    if (totalPages > 1) {
      html += `<div class="pagination">`;
      html += `<button class="page-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>&laquo; ${t('prev')}</button>`;

      const maxVisible = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let endPage = Math.min(totalPages, startPage + maxVisible - 1);
      if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      if (startPage > 1) {
        html += `<button class="page-btn" data-page="1">1</button>`;
        if (startPage > 2) html += `<span class="page-info">...</span>`;
      }

      for (let i = startPage; i <= endPage; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += `<span class="page-info">...</span>`;
        html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
      }

      html += `<button class="page-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>${t('next')} &raquo;</button>`;
      html += `<span class="page-info">${t('showing')} ${((currentPage-1)*ITEMS_PER_PAGE)+1}-${Math.min(currentPage*ITEMS_PER_PAGE, filteredData.length)} ${t('of')} ${filteredData.length}</span>`;
      html += `</div>`;
    }

    container.innerHTML = html;

    // Bind sort handlers
    container.querySelectorAll('th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const field = th.dataset.sort;
        if (currentSort.field === field) {
          currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
          currentSort.field = field;
          currentSort.direction = field === 'headcount' ? 'desc' : 'asc';
        }
        if (onSortChange) onSortChange(currentSort);
      });
    });

    // Bind pagination handlers
    container.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (page === 'prev' && currentPage > 1) currentPage--;
        else if (page === 'next' && currentPage < totalPages) currentPage++;
        else if (page !== 'prev' && page !== 'next') currentPage = parseInt(page);
        render(containerId);
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function getSortIcon(field) {
    if (currentSort.field !== field) return '\u2195';
    return currentSort.direction === 'asc' ? '\u2191' : '\u2193';
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function onSort(callback) {
    onSortChange = callback;
  }

  function getCurrentSort() {
    return currentSort;
  }

  function exportCSV(data) {
    const headers = ['Company', 'Parent Company', 'Date', 'Headcount', 'Percentage', 'Department', 'Location', 'Industry', 'Stage', 'Source URL'];
    const rows = data.map(d => [
      d.company, d.parent_company || '', d.date, d.headcount || '', d.percentage || '',
      d.department || '', d.location || '', d.industry || '', d.stage || '', d.source_url || ''
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tech-layoffs-${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return { setData, render, onSort, getCurrentSort, exportCSV };
})();
