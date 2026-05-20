export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function animateCounter(el, target, duration = 1800, suffix = '') {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current.toLocaleString('pt-BR') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

export function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return () => {};
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  const handler = (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };
  element.addEventListener('keydown', handler);
  return () => element.removeEventListener('keydown', handler);
}

export function getShareUrl(network, text, url) {
  const encoded = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  switch (network) {
    case 'whatsapp': return `https://wa.me/?text=${encoded}%20${encodedUrl}`;
    case 'facebook': return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'twitter':  return `https://twitter.com/intent/tweet?text=${encoded}&url=${encodedUrl}`;
    default:         return url;
  }
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
