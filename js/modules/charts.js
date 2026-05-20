import { ICMBIO_CATEGORIES, ICMBIO_GROUPS, ICMBIO_BIOMES } from '../data/stats.js';

let chartSpecies  = null;
let chartDonut    = null;
let chartMonthly  = null;
let initialized   = false;

function isDark() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function getGridColor() {
  return isDark() ? 'rgba(62,223,37,0.06)' : 'rgba(0,0,0,0.06)';
}

function getTextColor() {
  return isDark() ? 'rgba(87,140,76,0.9)' : '#3D6435';
}

function getTickColor() {
  return isDark() ? 'rgba(87,140,76,0.7)' : '#4A6B44';
}

export function initCharts() {
  if (initialized || typeof Chart === 'undefined') return;
  initialized = true;

  Chart.defaults.font.family = "'DM Sans', 'Helvetica Neue', sans-serif";
  Chart.defaults.font.size   = 12;
  Chart.defaults.color       = getTextColor();

  buildGroupsChart();
  buildCategoriesDonut();
  buildBiomesChart();
  bindFilters();
}

// Bar chart: threatened species per taxonomic group
function buildGroupsChart() {
  const ctx = document.getElementById('chart-species')?.getContext('2d');
  if (!ctx) return;

  chartSpecies = new Chart(ctx, {
    type: 'bar',
    data: groupChartData('ALL'),
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.7,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark() ? '#0A1509' : '#fff',
          borderColor: isDark() ? 'rgba(62,223,37,0.3)' : 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          titleColor: isDark() ? '#C8E8BB' : '#0C1A0B',
          bodyColor: isDark() ? 'rgba(200,232,187,0.7)' : '#3D6435',
          padding: 12,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} espécies`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: getGridColor() },
          border: { color: getGridColor() },
          ticks: { precision: 0, color: getTickColor(), font: { size: 11 } }
        },
        x: {
          grid: { display: false },
          border: { color: getGridColor() },
          ticks: {
            color: getTickColor(),
            font: { size: 10 },
            maxRotation: 35,
            minRotation: 20,
          }
        }
      }
    }
  });
}

// Donut chart: IUCN threat categories
function buildCategoriesDonut() {
  const ctx = document.getElementById('chart-donut')?.getContext('2d');
  if (!ctx) return;

  chartDonut = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ICMBIO_CATEGORIES.labels,
      datasets: [{
        data: ICMBIO_CATEGORIES.values,
        backgroundColor: ICMBIO_CATEGORIES.colors,
        borderWidth: isDark() ? 3 : 2,
        borderColor: isDark() ? '#080F07' : '#fff',
        hoverBorderWidth: isDark() ? 3 : 2,
        hoverBorderColor: isDark() ? '#080F07' : '#fff',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 14,
            usePointStyle: true,
            pointStyleWidth: 10,
            color: isDark() ? 'rgba(200,232,187,0.8)' : '#3D6435',
            font: { size: 11 }
          }
        },
        tooltip: {
          backgroundColor: isDark() ? '#0A1509' : '#fff',
          borderColor: isDark() ? 'rgba(62,223,37,0.3)' : 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          titleColor: isDark() ? '#C8E8BB' : '#0C1A0B',
          bodyColor: isDark() ? 'rgba(200,232,187,0.7)' : '#3D6435',
          padding: 12,
          callbacks: {
            label: (ctx) => {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct = ((ctx.parsed / total) * 100).toFixed(1);
              return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

// Bar chart: threatened species per biome
function buildBiomesChart() {
  const ctx = document.getElementById('chart-monthly')?.getContext('2d');
  if (!ctx) return;

  chartMonthly = new Chart(ctx, {
    type: 'bar',
    data: biomesChartData('ALL'),
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.4,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark() ? '#0A1509' : '#fff',
          borderColor: isDark() ? 'rgba(62,223,37,0.3)' : 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          titleColor: isDark() ? '#C8E8BB' : '#0C1A0B',
          bodyColor: isDark() ? 'rgba(200,232,187,0.7)' : '#3D6435',
          padding: 12,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} espécies ameaçadas`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: getGridColor() },
          border: { color: getGridColor() },
          ticks: { precision: 0, color: getTickColor(), font: { size: 11 } }
        },
        x: {
          grid: { display: false },
          border: { color: getGridColor() },
          ticks: { color: getTickColor(), font: { size: 11 } }
        }
      }
    }
  });
}

function bindFilters() {
  const groupSelect = document.getElementById('chart-filter');
  groupSelect?.addEventListener('change', () => {
    const cat = groupSelect.value || 'ALL';
    updateGroupsChart(cat);
    updateBiomesChart(cat);
  });
}

function updateGroupsChart(cat) {
  if (!chartSpecies) return;
  chartSpecies.data = groupChartData(cat);
  chartSpecies.update('active');
}

function updateBiomesChart(cat) {
  if (!chartMonthly) return;
  chartMonthly.data = biomesChartData(cat);
  chartMonthly.update('active');
}

function groupChartData(cat) {
  const values = ICMBIO_GROUPS[cat] || ICMBIO_GROUPS['ALL'];
  const maxVal  = Math.max(...values);

  const backgroundColors = values.map((v) => {
    if (v === 0) return 'rgba(62,223,37,0.08)';
    const ratio = v / maxVal;
    if (ratio >= 0.85) return '#FF4500';
    if (ratio >= 0.65) return '#FF9500';
    if (ratio >= 0.45) return '#FFB800';
    return '#3EDF25';
  });

  return {
    labels: ICMBIO_GROUPS.labels,
    datasets: [{
      label: 'Espécies',
      data: values,
      backgroundColor: backgroundColors,
      borderRadius: 6,
      borderSkipped: false,
      borderWidth: 0,
    }]
  };
}

function biomesChartData(cat) {
  const values = ICMBIO_BIOMES[cat] || ICMBIO_BIOMES['ALL'];
  const maxVal  = Math.max(...values);

  const backgroundColors = ICMBIO_BIOMES.colors.map((color, i) => {
    const ratio = values[i] / maxVal;
    return ratio >= 0.8 ? color : color + 'CC';
  });

  return {
    labels: ICMBIO_BIOMES.labels,
    datasets: [{
      label: 'Espécies ameaçadas',
      data: values,
      backgroundColor: backgroundColors,
      borderRadius: 6,
      borderSkipped: false,
      borderWidth: 0,
    }]
  };
}
