import { SPECIES_DATA, MONTHLY_DATA, GROUP_DATA } from '../data/stats.js';

const ALARM_COLORS = [
  '#FF4500', '#FF9500', '#FFB800', '#3EDF25',
  '#00D9FF', '#FF3131', '#7FFF00', '#FF6B00'
];

const GROUP_COLORS = {
  mamifero: '#FF9500',
  ave:      '#3EDF25',
  reptil:   '#00D9FF',
  anfibio:  '#FF4500'
};

const GROUP_GLOW = {
  mamifero: 'rgba(255,149,0,0.3)',
  ave:      'rgba(62,223,37,0.3)',
  reptil:   'rgba(0,217,255,0.3)',
  anfibio:  'rgba(255,69,0,0.3)'
};

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
            label: (ctx) => ` ${ctx.parsed.y} resgates`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: getGridColor() },
          border: { color: getGridColor() },
          ticks: {
            precision: 0,
            color: getTickColor(),
            font: { size: 11 }
          }
        },
        x: {
          grid: { display: false },
          border: { color: getGridColor() },
          ticks: {
            color: getTickColor(),
            font: { size: 11 }
          }
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
            padding: 18,
            usePointStyle: true,
            pointStyleWidth: 10,
            color: isDark() ? 'rgba(200,232,187,0.8)' : '#3D6435',
            font: { size: 12 }
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
              const pct = Math.round(ctx.parsed / total * 100);
              return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`;
            }
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

  const gradientFill = ctx.createLinearGradient(0, 0, ctx.canvas.offsetWidth, 0);
  gradientFill.addColorStop(0,   'rgba(62,223,37,0.18)');
  gradientFill.addColorStop(0.5, 'rgba(255,149,0,0.12)');
  gradientFill.addColorStop(1,   'rgba(255,69,0,0.18)');

  const gradientStroke = ctx.createLinearGradient(0, 0, ctx.canvas.offsetWidth, 0);
  gradientStroke.addColorStop(0,   '#3EDF25');
  gradientStroke.addColorStop(0.6, '#FF9500');
  gradientStroke.addColorStop(1,   '#FF4500');

  chartMonthly = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Resgates',
        data: data.values,
        borderColor: gradientStroke,
        backgroundColor: gradientFill,
        tension: 0.42,
        fill: true,
        pointBackgroundColor: (ctx) => {
          const v = ctx.parsed?.y ?? 0;
          const max = Math.max(...data.values);
          if (v >= max * 0.9) return '#FF4500';
          if (v >= max * 0.7) return '#FF9500';
          return '#3EDF25';
        },
        pointBorderColor: isDark() ? '#080F07' : '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#FFB800',
      }]
    },
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
            label: (ctx) => ` ${ctx.parsed.y} resgates registrados`
          }
        },
        annotation: {
          annotations: {
            alarmLine: {
              type: 'line',
              yMin: 120,
              yMax: 120,
              borderColor: 'rgba(255,49,49,0.4)',
              borderWidth: 1,
              borderDash: [6, 4],
              label: {
                display: true,
                content: '⚠ nível de alerta',
                color: 'rgba(255,49,49,0.7)',
                font: { size: 10 },
                position: 'end'
              }
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: { color: getGridColor() },
          border: { color: getGridColor() },
          ticks: {
            precision: 0,
            color: getTickColor(),
            font: { size: 11 }
          }
        },
        x: {
          grid: { display: false },
          border: { color: getGridColor() },
          ticks: {
            color: getTickColor(),
            font: { size: 11 }
          }
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
  chartSpecies.data = speciesChartData(group, year);
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
  const maxVal   = Math.max(...values);

  const backgroundColors = values.map(v => {
    if (v === 0) return 'rgba(62,223,37,0.08)';
    const ratio = v / maxVal;
    if (ratio >= 0.85) return '#FF4500';
    if (ratio >= 0.65) return '#FF9500';
    if (ratio >= 0.45) return '#FFB800';
    return '#3EDF25';
  });

  return {
    labels: SPECIES_DATA.labels,
    datasets: [{
      label: 'Resgates',
      data: values,
      backgroundColor: backgroundColors,
      borderRadius: 6,
      borderSkipped: false,
      borderWidth: 0,
    }]
  };
}
