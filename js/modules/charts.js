import { SPECIES_DATA, MONTHLY_DATA, GROUP_DATA } from '../data/stats.js';

const BRAND_COLORS = [
  '#2E7D32','#0277BD','#F9A825','#558B2F','#01579B',
  '#E65100','#4527A0','#37474F'
];

const GROUP_COLORS = {
  mamifero: '#2E7D32',
  ave:      '#0277BD',
  reptil:   '#F9A825',
  anfibio:  '#558B2F'
};

let chartSpecies  = null;
let chartDonut    = null;
let chartMonthly  = null;
let initialized   = false;

export function initCharts() {
  if (initialized || typeof Chart === 'undefined') return;
  initialized = true;

  Chart.defaults.font.family = "system-ui, -apple-system, sans-serif";
  Chart.defaults.color = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-text-muted').trim() || '#5A7A5A';

  buildSpeciesChart();
  buildDonutChart();
  buildMonthlyChart();
  bindFilters();
}

function buildSpeciesChart() {
  const ctx = document.getElementById('chart-species')?.getContext('2d');
  if (!ctx) return;

  chartSpecies = new Chart(ctx, {
    type: 'bar',
    data: speciesChartData('todos', '2024'),
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} ocorrências`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { precision: 0 }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

function buildDonutChart() {
  const ctx = document.getElementById('chart-donut')?.getContext('2d');
  if (!ctx) return;

  const data = GROUP_DATA['2024'];
  chartDonut = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: Object.values(GROUP_COLORS),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.6,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 16, usePointStyle: true }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.parsed} (${Math.round(ctx.parsed / ctx.dataset.data.reduce((a,b) => a+b,0) * 100)}%)`
          }
        }
      }
    }
  });
}

function buildMonthlyChart() {
  const ctx = document.getElementById('chart-monthly')?.getContext('2d');
  if (!ctx) return;

  const data = MONTHLY_DATA['2024'];
  chartMonthly = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Ocorrências',
        data: data.values,
        borderColor: '#2E7D32',
        backgroundColor: 'rgba(46,125,50,0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#2E7D32',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.5,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} ocorrências`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { precision: 0 }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

function bindFilters() {
  const groupSelect = document.getElementById('chart-filter');
  const yearSelect  = document.getElementById('year-filter');

  const update = () => {
    const group = groupSelect?.value || 'todos';
    const year  = yearSelect?.value  || '2024';
    updateSpeciesChart(group, year);
    updateDonutChart(year);
    updateMonthlyChart(year);
  };

  groupSelect?.addEventListener('change', update);
  yearSelect?.addEventListener('change', update);
}

function updateSpeciesChart(group, year) {
  if (!chartSpecies) return;
  const newData = speciesChartData(group, year);
  chartSpecies.data = newData;
  chartSpecies.update('active');
}

function updateDonutChart(year) {
  if (!chartDonut) return;
  const data = GROUP_DATA[year] || GROUP_DATA['2024'];
  chartDonut.data.datasets[0].data = data.values;
  chartDonut.update('active');
}

function updateMonthlyChart(year) {
  if (!chartMonthly) return;
  const data = MONTHLY_DATA[year] || MONTHLY_DATA['2024'];
  chartMonthly.data.labels = data.labels;
  chartMonthly.data.datasets[0].data = data.values;
  chartMonthly.update('active');
}

function speciesChartData(group, year) {
  const yearData = SPECIES_DATA.datasets[year] || SPECIES_DATA.datasets['2024'];
  const values   = yearData[group] || yearData['todos'];

  return {
    labels: SPECIES_DATA.labels,
    datasets: [{
      label: 'Ocorrências',
      data: values,
      backgroundColor: BRAND_COLORS,
      borderRadius: 6,
      borderSkipped: false
    }]
  };
}
