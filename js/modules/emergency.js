import { trapFocus } from '../utils/helpers.js';

const CONTACTS = [
  { icon: '🚒', name: 'Corpo de Bombeiros',     number: '193',           href: 'tel:193',           desc: 'Resgate de animais silvestres' },
  { icon: '🚔', name: 'Polícia Ambiental',      number: '190',           href: 'tel:190',           desc: 'Crimes e emergências ambientais' },
  { icon: '🏥', name: 'CRAS POA — SMAMS',       number: '(51) 3289-7500', href: 'tel:5132897500',   desc: 'Centro de Reabilitação de Animais Silvestres' },
  { icon: '🌿', name: 'IBAMA — Linha Verde',    number: '0800 618 4080', href: 'tel:08006184080',   desc: 'Denúncias ambientais 24h' },
  { icon: '🦎', name: 'ONG Toca dos Bichos',    number: 'Ver contatos',  href: '#contatos',         desc: 'Coordenação: Dra. Gleide' }
];

let releaseFocus = null;

export function initEmergency() {
  const btn     = document.getElementById('emergency-btn');
  const modal   = document.getElementById('emergency-modal');
  const closeBtn = document.getElementById('emergency-close');

  renderContacts();

  btn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });

  function openModal() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    releaseFocus = trapFocus(modal);
    closeBtn?.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    releaseFocus?.();
    btn?.focus();
  }
}

function renderContacts() {
  const list = document.getElementById('emergency-contact-list');
  if (!list) return;

  list.innerHTML = CONTACTS.map(c => `
    <a class="emergency-contact-item" href="${c.href}" ${c.href.startsWith('tel') ? '' : ''}>
      <span class="icon" aria-hidden="true">${c.icon}</span>
      <div class="info">
        <strong>${c.name}</strong>
        <span>${c.number}</span>
        <div style="font-size:0.75rem; color:var(--color-text-muted); margin-top:2px;">${c.desc}</div>
      </div>
    </a>
  `).join('');
}
