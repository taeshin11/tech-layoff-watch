// Data Loader - loads layoffs data from static JSON or Google Sheets
const DataLoader = (() => {
  const LOCAL_JSON_PATH = 'data/layoffs.json';
  let cachedData = null;

  async function loadData() {
    if (cachedData) return cachedData;

    // Try localStorage cache first
    const cached = localStorage.getItem('layoffs_data');
    const cacheTime = localStorage.getItem('layoffs_data_time');
    if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < 3600000) {
      cachedData = JSON.parse(cached);
      return cachedData;
    }

    try {
      const response = await fetch(LOCAL_JSON_PATH);
      if (!response.ok) throw new Error('Failed to load data');
      const data = await response.json();
      cachedData = data;
      // Cache in localStorage
      try {
        localStorage.setItem('layoffs_data', JSON.stringify(data));
        localStorage.setItem('layoffs_data_time', Date.now().toString());
      } catch (e) { /* quota exceeded */ }
      return data;
    } catch (err) {
      console.error('Error loading data:', err);
      if (cached) {
        cachedData = JSON.parse(cached);
        return cachedData;
      }
      return [];
    }
  }

  function filterByYear(data, year) {
    if (!year || year === 'all') return data;
    return data.filter(d => d.date.startsWith(year.toString()));
  }

  function filterBySearch(data, query) {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter(d =>
      d.company.toLowerCase().includes(q) ||
      (d.parent_company && d.parent_company.toLowerCase().includes(q)) ||
      (d.industry && d.industry.toLowerCase().includes(q))
    );
  }

  function sortData(data, field, direction) {
    return [...data].sort((a, b) => {
      let valA = a[field];
      let valB = b[field];
      if (field === 'headcount') {
        valA = valA || 0;
        valB = valB || 0;
        return direction === 'asc' ? valA - valB : valB - valA;
      }
      if (field === 'date') {
        return direction === 'asc'
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      }
      valA = (valA || '').toString().toLowerCase();
      valB = (valB || '').toString().toLowerCase();
      if (direction === 'asc') return valA.localeCompare(valB);
      return valB.localeCompare(valA);
    });
  }

  return { loadData, filterByYear, filterBySearch, sortData };
})();
