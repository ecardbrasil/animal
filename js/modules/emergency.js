import { trapFocus } from '../utils/helpers.js';

let releaseFocus = null;

// ──────────────────────────────────────────────
// Chatbot flow definition
// contacts: { label, href, type: 'whatsapp'|'tel'|'app' }
// ──────────────────────────────────────────────

const FLOW = {
  start: {
    message: `Olá! 🐾 Este é um canal de orientação rápida para emergências com animais em Porto Alegre.\n\nQual é a situação?`,
    options: [
      { label: '🐒 Animal Silvestre',            next: 'silvestre' },
      { label: '🐶 Animal Doméstico',            next: 'domestico' },
      { label: '🚨 Maus-Tratos ou Tráfico',      next: 'maus_tratos' },
      { label: '🪦 Animal Morto em Via Pública', next: 'animal_morto' },
    ],
  },

  // ── Fluxo 1: Silvestre ──
  silvestre: {
    message: 'Entendi. O que está acontecendo com o animal silvestre?',
    options: [
      { label: '🩹 Precisa de resgate / Está ferido', next: 'silvestre_resgate' },
      { label: '🐣 Filhote órfão encontrado',         next: 'silvestre_filhote' },
      { label: '↩ Voltar ao menu',                    next: 'start' },
    ],
  },

  silvestre_resgate: {
    message: `Entre em contato com a <strong>SMAMS (Prefeitura)</strong> — Seg‑Sex, horário comercial.\n\nPara resgates fora desse horário, acione a <strong>PATRAM (Brigada Militar)</strong>.`,
    contacts: [
      { label: 'WhatsApp SMAMS · (51) 3289-7517', href: 'https://wa.me/555132897517', type: 'whatsapp' },
      { label: 'Ligar PATRAM · (51) 3320-6300',   href: 'tel:+555132006300',          type: 'tel' },
    ],
    options: [
      { label: '↩ Voltar ao menu', next: 'start' },
    ],
  },

  silvestre_filhote: {
    message: `Ligue ou chame no WhatsApp da <strong>SEMA (Estado)</strong> — Horário comercial.`,
    contacts: [
      { label: 'WhatsApp SEMA · (51) 98593-1288', href: 'https://wa.me/555198593188', type: 'whatsapp' },
    ],
    options: [
      { label: '↩ Voltar ao menu', next: 'start' },
    ],
  },

  // ── Fluxo 2: Doméstico ──
  domestico: {
    message: 'O animal está em <strong>risco de morte imediata</strong> (ex: preso em bueiro, árvore alta, buraco)?',
    options: [
      { label: '✅ Sim — risco imediato',        next: 'domestico_resgate' },
      { label: '🐾 Não — está perdido na rua',  next: 'domestico_rua' },
      { label: '↩ Voltar ao menu',               next: 'start' },
    ],
  },

  domestico_resgate: {
    message: `Ligue imediatamente para o <strong>Corpo de Bombeiros</strong>. Eles são equipados para resgates em locais de difícil acesso.`,
    contacts: [
      { label: 'Ligar Bombeiros · 193', href: 'tel:193', type: 'tel' },
    ],
    options: [
      { label: '↩ Voltar ao menu', next: 'start' },
    ],
  },

  domestico_rua: {
    message: `Para animais de rua sem ferimentos graves, contate a prefeitura pelo <strong>156 — Fala Porto Alegre</strong> e solicite orientações da unidade de saúde animal.`,
    contacts: [
      { label: 'Ligar 156 · Fala Porto Alegre', href: 'tel:156', type: 'tel' },
    ],
    options: [
      { label: '↩ Voltar ao menu', next: 'start' },
    ],
  },

  // ── Fluxo 3: Maus-Tratos / Tráfico ──
  maus_tratos: {
    message: 'É algo acontecendo <strong>AGORA</strong> (flagrante) ou uma denúncia para investigação?',
    options: [
      { label: '🚨 Flagrante — acontecendo agora',      next: 'maus_tratos_flagrante' },
      { label: '📋 Denúncia / Tráfico de Silvestres',   next: 'maus_tratos_denuncia' },
      { label: '↩ Voltar ao menu',                      next: 'start' },
    ],
  },

  maus_tratos_flagrante: {
    message: `Ligue agora para a <strong>Brigada Militar</strong> e aguarde no local.`,
    contacts: [
      { label: 'Ligar Brigada · 190', href: 'tel:190', type: 'tel' },
    ],
    options: [
      { label: '↩ Voltar ao menu', next: 'start' },
    ],
  },

  maus_tratos_denuncia: {
    message: `Para <strong>maus-tratos</strong>, registre pelo 156 ou pelo Disque Denúncia.\n\nPara <strong>tráfico ou caça de silvestres</strong>, acione o IBAMA.`,
    contacts: [
      { label: 'Ligar 156 · Fala Porto Alegre', href: 'tel:156',         type: 'tel' },
      { label: 'Disque Denúncia · 181',          href: 'tel:181',         type: 'tel' },
      { label: 'IBAMA · 0800-61-8080',           href: 'tel:08006184080', type: 'tel' },
    ],
    options: [
      { label: '↩ Voltar ao menu', next: 'start' },
    ],
  },

  // ── Fluxo 4: Animal Morto ──
  animal_morto: {
    message: `Para recolhimento de <strong>animais mortos em vias públicas</strong>, ligue para o <strong>156 — Fala Porto Alegre</strong> ou use o app <strong>156+POA</strong> e solicite o serviço do DMLU.`,
    contacts: [
      { label: 'Ligar 156 · Fala Porto Alegre', href: 'tel:156', type: 'tel' },
    ],
    options: [
      { label: '↩ Voltar ao menu', next: 'start' },
    ],
  },
};

// ──────────────────────────────────────────────
// Module
// ──────────────────────────────────────────────

export function initEmergency() {
  const btn      = document.getElementById('emergency-btn');
  const modal    = document.getElementById('emergency-modal');
  const closeBtn = document.getElementById('emergency-close');

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
    resetChat();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    releaseFocus?.();
    btn?.focus();
  }
}

function resetChat() {
  const messages = document.getElementById('chatbot-messages');
  const options  = document.getElementById('chatbot-options');
  if (!messages || !options) return;
  messages.innerHTML = '';
  options.innerHTML  = '';
  goToStep('start');
}

const CONTACT_ICONS = {
  whatsapp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  tel:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .88h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.08a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
};

function goToStep(key) {
  const step = FLOW[key];
  if (!step) return;

  const messages = document.getElementById('chatbot-messages');
  const options  = document.getElementById('chatbot-options');
  if (!messages || !options) return;

  // Bot message bubble
  const bubble = document.createElement('div');
  bubble.className = 'chatbot-bubble chatbot-bubble--bot';

  const text = document.createElement('div');
  text.innerHTML = step.message.replace(/\n/g, '<br>');
  bubble.appendChild(text);

  // Contact action buttons inside the bubble
  if (step.contacts?.length) {
    const contactGroup = document.createElement('div');
    contactGroup.className = 'chatbot-contact-group';

    step.contacts.forEach(c => {
      const isWhatsApp = c.type === 'whatsapp';
      const a = document.createElement('a');
      a.href = c.href;
      a.className = `chatbot-contact-btn chatbot-contact-btn--${c.type}`;
      a.setAttribute('target', isWhatsApp ? '_blank' : '_self');
      a.setAttribute('rel', isWhatsApp ? 'noopener noreferrer' : '');
      a.innerHTML = `${CONTACT_ICONS[c.type] || ''}<span>${c.label}</span>`;
      contactGroup.appendChild(a);
    });

    bubble.appendChild(contactGroup);
  }

  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;

  // Option buttons
  options.innerHTML = '';
  step.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'chatbot-option-btn';
    btn.textContent = opt.label;
    btn.addEventListener('click', () => {
      const userBubble = document.createElement('div');
      userBubble.className = 'chatbot-bubble chatbot-bubble--user';
      userBubble.textContent = opt.label;
      messages.appendChild(userBubble);
      messages.scrollTop = messages.scrollHeight;
      options.innerHTML = '';
      setTimeout(() => goToStep(opt.next), 300);
    });
    options.appendChild(btn);
  });
}
