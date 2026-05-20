import { ANIMALS, RISK_LABELS, GROUP_LABELS } from '../data/animals.js';
import { debounce, trapFocus, getShareUrl, copyToClipboard } from '../utils/helpers.js';

let currentFilter = 'todos';
let currentSearch = '';
let releaseFocus  = null;
let lastFocused   = null;

export function initLibrary() {
  renderCards(filteredAnimals());
  initSearch();
  initChips();
  initModal();
  initCardObserver();
}

function filteredAnimals() {
  return ANIMALS.filter(a => {
    const matchGroup  = currentFilter === 'todos' || a.group === currentFilter;
    const q = currentSearch.toLowerCase();
    const matchSearch = !q
      || a.name.toLowerCase().includes(q)
      || a.scientificName.toLowerCase().includes(q)
      || (a.tags || []).some(t => t.toLowerCase().includes(q));
    return matchGroup && matchSearch;
  });
}

function renderCards(animals) {
  const grid = document.getElementById('animal-grid');
  const noResults = document.getElementById('no-results');
  const noResultsTerm = document.getElementById('no-results-term');
  if (!grid) return;

  if (!animals.length) {
    grid.innerHTML = '';
    noResults?.classList.remove('hidden');
    if (noResultsTerm) noResultsTerm.textContent = currentSearch;
    return;
  }

  noResults?.classList.add('hidden');

  grid.innerHTML = animals.map((a, i) => {
    const hasImage = a.image;
    const imageHtml = `<div class="animal-card__image-wrapper">${hasImage
      ? `<img class="animal-card__image" src="${a.image}" alt="${a.name} — ${a.scientificName}" loading="lazy"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
         <div class="animal-card__image-placeholder" style="display:none;">${a.emoji}</div>`
      : `<div class="animal-card__image-placeholder">${a.emoji}</div>`
    }</div>`;

    return `
      <article class="animal-card"
               role="listitem"
               data-id="${a.id}"
               data-group="${a.group}"
               style="--delay: ${i * 0.06}s"
               tabindex="0"
               aria-label="${a.name}: ${a.summary}">
        ${imageHtml}
        <div class="animal-card__body">
          <h3 class="animal-card__name">${a.name}</h3>
          <p class="animal-card__scientific">${a.scientificName}</p>
          <div class="animal-card__badges">
            <span class="badge badge--${a.riskLevel}">${RISK_LABELS[a.riskLevel]}</span>
            <span class="badge badge--group">${GROUP_LABELS[a.group]}</span>
          </div>
          <p class="animal-card__summary">${a.summary}</p>
          <div class="animal-card__footer">
            <button class="btn btn--primary btn--sm animal-card__cta" data-animal-id="${a.id}">
              Ver orientações
            </button>
            <button class="btn-share" data-share-id="${a.id}" aria-label="Compartilhar informações sobre ${a.name} no WhatsApp" title="Compartilhar">
              📤
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Bind click/keydown on cards and buttons
  grid.querySelectorAll('.animal-card__cta, .animal-card').forEach(el => {
    el.addEventListener('click', (e) => {
      const id = el.dataset.animalId || el.closest('.animal-card')?.dataset.id;
      if (id && !e.target.classList.contains('btn-share')) openModal(id, el);
    });
    if (el.classList.contains('animal-card')) {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(el.dataset.id, el);
        }
      });
    }
  });

  grid.querySelectorAll('.btn-share').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const animal = ANIMALS.find(a => a.id === btn.dataset.shareId);
      if (animal) shareAnimal(animal, btn);
    });
  });
}

function initCardObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.getElementById('animal-grid')?.querySelectorAll('.animal-card').forEach(card => {
    observer.observe(card);
  });

  // Re-observe after render via mutation
  const mutationObserver = new MutationObserver(() => {
    document.getElementById('animal-grid')?.querySelectorAll('.animal-card:not(.visible)').forEach(card => {
      observer.observe(card);
    });
  });
  const grid = document.getElementById('animal-grid');
  if (grid) mutationObserver.observe(grid, { childList: true });
}

function initSearch() {
  const input = document.getElementById('animal-search');
  if (!input) return;
  input.addEventListener('input', debounce(() => {
    currentSearch = input.value.trim();
    renderCards(filteredAnimals());
    initCardObserver();
  }, 250));
}

function initChips() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      currentFilter = chip.dataset.filter;
      document.querySelectorAll('.chip').forEach(c => {
        c.classList.remove('chip--active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('chip--active');
      chip.setAttribute('aria-pressed', 'true');
      renderCards(filteredAnimals());
      initCardObserver();
    });
  });
}

function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.classList.contains('is-open')) closeModal();
  });
}

function openModal(id, trigger) {
  const animal = ANIMALS.find(a => a.id === id);
  if (!animal) return;

  lastFocused = trigger;
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  // Image container
  const imgContainer = document.getElementById('modal-image-container');
  if (imgContainer) {
    imgContainer.innerHTML = animal.image
      ? `<img class="modal-image" src="${animal.image}" alt="${animal.name} — ${animal.scientificName}"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
         <div class="modal-image-placeholder" style="display:none;">${animal.emoji}</div>`
      : `<div class="modal-image-placeholder">${animal.emoji}</div>`;
  }

  setEl('modal-title', animal.name);
  setEl('modal-scientific', `${animal.scientificName}`);

  const badgesEl = document.getElementById('modal-badges');
  if (badgesEl) {
    badgesEl.innerHTML = `
      <span class="badge badge--${animal.riskLevel}">${RISK_LABELS[animal.riskLevel]}</span>
      <span class="badge badge--group">${GROUP_LABELS[animal.group]}</span>
    `;
  }

  const funFactEl = document.getElementById('modal-fun-fact');
  if (funFactEl) {
    funFactEl.innerHTML = `<strong>💡 Você sabia?</strong>${animal.funFact}`;
  }

  const dosEl = document.getElementById('modal-dos');
  if (dosEl) {
    dosEl.innerHTML = `
      <h3>✅ O que FAZER</h3>
      <ul>${animal.dos.map(d => `<li>${d}</li>`).join('')}</ul>
    `;
  }

  const dontsEl = document.getElementById('modal-donts');
  if (dontsEl) {
    dontsEl.innerHTML = `
      <h3>❌ O que NÃO FAZER</h3>
      <ul>${animal.donts.map(d => `<li>${d}</li>`).join('')}</ul>
    `;
  }

  const contactsEl = document.getElementById('modal-contacts');
  if (contactsEl) {
    contactsEl.innerHTML = `
      <h3>📞 Em caso de emergência, ligue:</h3>
      <div class="modal-contact-list">
        ${animal.contacts.map(c => `
          <div class="modal-contact-item">
            ${c.name}: <a href="tel:${c.number.replace(/\D/g,'')}">${c.number}</a>
          </div>
        `).join('')}
      </div>
    `;
  }

  const shareRow = document.getElementById('modal-share-row');
  if (shareRow) {
    const shareText = `${animal.name}: ${animal.summary} — Saiba mais no site Amigos da Vida Animal`;
    const shareUrl  = window.location.href.split('#')[0] + `#biblioteca`;
    shareRow.innerHTML = `
      <a href="${getShareUrl('whatsapp', shareText, shareUrl)}" target="_blank" rel="noopener noreferrer"
         class="btn btn--outline btn--sm">📱 Compartilhar no WhatsApp</a>
      <button class="btn btn--outline btn--sm" id="copy-link-btn">🔗 Copiar link</button>
    `;
    document.getElementById('copy-link-btn')?.addEventListener('click', async () => {
      const ok = await copyToClipboard(window.location.href.split('#')[0] + `#${animal.id}`);
      const btn = document.getElementById('copy-link-btn');
      if (btn) btn.textContent = ok ? '✓ Copiado!' : '⚠ Erro ao copiar';
    });
  }

  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  releaseFocus = trapFocus(overlay);
  document.getElementById('modal-close')?.focus();
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay?.classList.remove('is-open');
  document.body.style.overflow = '';
  releaseFocus?.();
  lastFocused?.focus();
}

async function shareAnimal(animal, btn) {
  const text = `${animal.name}: ${animal.summary}`;
  const url  = window.location.href.split('#')[0];

  if (navigator.share) {
    try {
      await navigator.share({ title: `${animal.name} — Amigos da Vida Animal`, text, url });
    } catch {
      openWhatsApp(text, url);
    }
  } else {
    openWhatsApp(text, url);
  }
}

function openWhatsApp(text, url) {
  window.open(getShareUrl('whatsapp', text, url), '_blank', 'noopener,noreferrer');
}

function setEl(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
