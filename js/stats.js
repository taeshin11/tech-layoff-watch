// Stats - computes summary statistics
const Stats = (() => {
  function compute(data) {
    const totalAffected = data.reduce((sum, d) => sum + (d.headcount || 0), 0);
    const companiesSet = new Set(data.map(d => d.company));
    const totalCompanies = companiesSet.size;

    // Largest single layoff event
    let largestEvent = data.reduce((max, d) =>
      (d.headcount || 0) > (max.headcount || 0) ? d : max, { headcount: 0 });

    // Most affected company
    const companyTotals = {};
    data.forEach(d => {
      companyTotals[d.company] = (companyTotals[d.company] || 0) + (d.headcount || 0);
    });
    let mostAffectedCompany = '';
    let mostAffectedCount = 0;
    for (const [company, count] of Object.entries(companyTotals)) {
      if (count > mostAffectedCount) {
        mostAffectedCompany = company;
        mostAffectedCount = count;
      }
    }

    // This year
    const currentYear = new Date().getFullYear().toString();
    const thisYearData = data.filter(d => d.date.startsWith(currentYear));
    const totalThisYear = thisYearData.reduce((sum, d) => sum + (d.headcount || 0), 0);

    // This month
    const currentMonth = new Date().toISOString().slice(0, 7);
    const thisMonthData = data.filter(d => d.date.startsWith(currentMonth));
    const totalThisMonth = thisMonthData.reduce((sum, d) => sum + (d.headcount || 0), 0);

    return {
      totalAffected,
      totalCompanies,
      largestEvent,
      mostAffectedCompany,
      mostAffectedCount,
      totalThisYear,
      totalThisMonth,
      totalEvents: data.length
    };
  }

  function getMonthlyData(data) {
    const monthly = {};
    data.forEach(d => {
      const month = d.date.slice(0, 7); // YYYY-MM
      if (!monthly[month]) monthly[month] = 0;
      monthly[month] += (d.headcount || 0);
    });
    const sorted = Object.entries(monthly).sort(([a], [b]) => a.localeCompare(b));
    return {
      labels: sorted.map(([m]) => {
        const [y, mo] = m.split('-');
        const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return `${monthNames[parseInt(mo)-1]} ${y}`;
      }),
      values: sorted.map(([, v]) => v),
      keys: sorted.map(([m]) => m)
    };
  }

  function getIndustryBreakdown(data) {
    const breakdown = {};
    data.forEach(d => {
      const stage = d.stage || 'Unknown';
      let category;
      if (['Big Tech'].includes(d.industry)) category = 'Big Tech';
      else if (['Startup'].includes(d.stage) || d.stage === 'Private') category = 'Startup / Private';
      else category = 'Mid-size / Public';
      breakdown[category] = (breakdown[category] || 0) + (d.headcount || 0);
    });
    return breakdown;
  }

  return { compute, getMonthlyData, getIndustryBreakdown };
})();
