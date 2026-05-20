import { ICMBIO_CATEGORIES, ICMBIO_GROUPS, ICMBIO_BIOMES } from '../data/stats.js';

let chartCategory = null;
let chartGroups   = null;
let chartBiomes   = null;
let initialized   = false;

export function initCharts() {
  if (initialized || typeof Chart === 'undefined') return;
  initialized = true;

  Chart.defaults.font.family = "system-ui, -apple-system, sans-serif";
  Chart.defaults.color = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-text-muted').trim() || '#5A7A5A';

  buildCategoryChart();
  buildGroupsChart();
  buildBiomesChart();
  bindFilter();
}

function buildCategoryChart() {
  const ctx = document.getElementById('chart-species')?.getContext('2d');
  if (!ctx) return;

  chartCategory = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ICMBIO_CATEGORIES.labels,
      datasets: [{
        label: 'Espécies',
        data: ICMBIO_CATEGORIES.values,
        backgroundColor: ICMBIO_CATEGORIES.colors,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => ICMBIO_CATEGORIES.fullLabels[items[0].dataIndex],
            label: (item) => ` ${item.parsed.y} espécies`,
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { precision: 0 },
        },
        x: { grid: { display: false } }
      }
    }
  });
}

function buildGroupsChart() {
  const ctx = document.getElementById('chart-donut')?.getContext('2d');
  if (!ctx) return;

  chartGroups = new Chart(ctx, {
    type: 'doughnut',
    data: groupsChartData('ALL'),
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.6,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 12, usePointStyle: true, font: { size: 11 } }
        },
        tooltip: {
          callbacks: {
            label: (item) => {
              const total = item.dataset.data.reduce((a, b) => a + b, 0);
              return ` ${item.label}: ${item.parsed} (${Math.round(item.parsed / total * 100)}%)`;
            }
          }
        }
      }
    }
  });
}

function buildBiomesChart() {
  const ctx = document.getElementById('chart-monthly')?.getContext('2d');
  if (!ctx) return;

  chartBiomes = new Chart(ctx, {
    type: 'bar',
    data: biomesChartData('ALL'),
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.5,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (item) => ` ${item.parsed.x} espécies`,
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { precision: 0 },
        },
        y: { grid: { display: false } }
      }
    }
  });
}

function bindFilter() {
  const select = document.getElementById('chart-filter');
  select?.addEventListener('change', () => {
    const key = select.value;
    updateGroupsChart(key);
    updateBiomesChart(key);
  });
}

function groupsChartData(key) {
  const values = ICMBIO_GROUPS[key] || ICMBIO_GROUPS.ALL;
  return {
    labels: ICMBIO_GROUPS.labels,
    datasets: [{
      data: values,
      backgroundColor: ICMBIO_GROUPS.colors,
      borderWidth: 2,
      borderColor: '#fff',
    }]
  };
}

function biomesChartData(key) {
  const values = ICMBIO_BIOMES[key] || ICMBIO_BIOMES.ALL;
  return {
    labels: ICMBIO_BIOMES.labels,
    datasets: [{
      label: 'Espécies',
      data: values,
      backgroundColor: ICMBIO_BIOMES.colors,
      borderRadius: 4,
      borderSkipped: false,
    }]
  };
}

function updateGroupsChart(key) {
  if (!chartGroups) return;
  chartGroups.data = groupsChartData(key);
  chartGroups.update('active');
}

function updateBiomesChart(key) {
  if (!chartBiomes) return;
  chartBiomes.data = biomesChartData(key);
  chartBiomes.update('active');
}
