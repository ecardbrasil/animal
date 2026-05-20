import { MAP_OCCURRENCES } from '../data/stats.js';

const GROUP_COLORS = {
  mamifero: '#2E7D32',
  ave:      '#0277BD',
  reptil:   '#F9A825',
  anfibio:  '#558B2F'
};

const GROUP_LABELS = {
  mamifero: 'Mamífero',
  ave:      'Ave',
  reptil:   'Réptil',
  anfibio:  'Anfíbio'
};

let mapInitialized = false;

export function initMap() {
  if (mapInitialized || typeof L === 'undefined') return;
  mapInitialized = true;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const map = L.map('occurrence-map', { zoomControl: true }).setView([-30.034, -51.217], 10);

  L.tileLayer(tileUrl, {
    attribution: isDark
      ? '&copy; <a href="https://carto.com">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);

  MAP_OCCURRENCES.forEach(point => {
    const radius = Math.max(8, Math.sqrt(point.count) * 1.6);
    L.circleMarker([point.lat, point.lng], {
      radius,
      fillColor: GROUP_COLORS[point.group] ?? '#666',
      color:     '#fff',
      weight:    2,
      fillOpacity: 0.75
    })
    .bindPopup(`
      <strong>${point.label}</strong><br>
      <span style="color:${GROUP_COLORS[point.group]}">${GROUP_LABELS[point.group]}</span><br>
      ${point.count} ocorrências registradas
    `, { maxWidth: 200 })
    .addTo(map);
  });

  addLegend(map);
}

function addLegend(map) {
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'leaflet-legend');
    div.style.cssText = 'background:white;padding:8px 12px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.2);font-size:12px;line-height:1.8;';
    div.innerHTML = `
      <strong style="display:block;margin-bottom:4px;">Grupos</strong>
      ${Object.entries(GROUP_COLORS).map(([key, color]) =>
        `<div style="display:flex;align-items:center;gap:6px;">
           <span style="width:12px;height:12px;border-radius:50%;background:${color};display:inline-block;"></span>
           ${GROUP_LABELS[key]}
         </div>`
      ).join('')}
    `;
    return div;
  };

  legend.addTo(map);
}
