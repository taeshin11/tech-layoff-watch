// Charts - Chart.js configurations for layoff visualizations
const Charts = (() => {
  let monthlyChart = null;
  let pieChart = null;

  function renderMonthlyChart(canvasId, monthlyData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (monthlyChart) monthlyChart.destroy();

    monthlyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: monthlyData.labels,
        datasets: [
          {
            label: 'Layoffs',
            data: monthlyData.values,
            backgroundColor: 'rgba(251, 113, 133, 0.7)',
            borderColor: '#FB7185',
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false,
            order: 2
          },
          {
            label: 'Trend',
            data: monthlyData.values,
            type: 'line',
            borderColor: '#60A5FA',
            backgroundColor: 'rgba(96, 165, 250, 0.1)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#60A5FA',
            tension: 0.4,
            fill: true,
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: { family: 'Inter', size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#0F172A',
            titleFont: { family: 'Inter', size: 13 },
            bodyFont: { family: 'JetBrains Mono', size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                return ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()} employees`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { family: 'Inter', size: 11 },
              maxRotation: 45,
              minRotation: 0,
              autoSkip: true,
              maxTicksLimit: 12
            }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
              font: { family: 'JetBrains Mono', size: 11 },
              callback: function(value) {
                if (value >= 1000) return (value / 1000).toFixed(0) + 'k';
                return value;
              }
            }
          }
        }
      }
    });
  }

  function renderPieChart(canvasId, breakdownData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (pieChart) pieChart.destroy();

    const labels = Object.keys(breakdownData);
    const values = Object.values(breakdownData);
    const colors = ['#FB7185', '#60A5FA', '#FBBF24', '#2DD4BF', '#A78BFA'];

    pieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 2,
          borderColor: '#fff',
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: { family: 'Inter', size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#0F172A',
            titleFont: { family: 'Inter', size: 13 },
            bodyFont: { family: 'JetBrains Mono', size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const pct = ((context.parsed / total) * 100).toFixed(1);
                return ` ${context.label}: ${context.parsed.toLocaleString()} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  }

  return { renderMonthlyChart, renderPieChart };
})();
