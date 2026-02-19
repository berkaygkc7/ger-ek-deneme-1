export function $(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

export function $$(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector);
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, string>,
  children?: (HTMLElement | string)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (attrs) {
    Object.entries(attrs).forEach(([key, val]) => {
      if (key === 'className') el.className = val;
      else if (key === 'innerHTML') el.innerHTML = val;
      else el.setAttribute(key, val);
    });
  }
  if (children) {
    children.forEach(child => {
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else el.appendChild(child);
    });
  }
  return el;
}

export function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Az önce';
  if (minutes < 60) return `${minutes} dakika önce`;
  if (hours < 24) return `${hours} saat önce`;
  if (days < 7) return `${days} gün önce`;
  return date.toLocaleDateString('tr-TR');
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
}

export function showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
  const icons: Record<string, string> = {
    success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️'
  };
  const colors: Record<string, string> = {
    success: '#4caf50', error: '#e53935', warning: '#ff9800', info: '#1a3a5f'
  };

  const toast = createElement('div', {
    className: 'sp-toast',
    innerHTML: `<span class="sp-toast-icon">${icons[type]}</span><span>${message}</span>`
  });
  toast.style.cssText = `
    position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);
    background:${colors[type]};color:#fff;padding:0.85rem 1.5rem;border-radius:10px;
    box-shadow:0 6px 20px rgba(0,0,0,0.25);z-index:10001;display:flex;align-items:center;
    gap:0.6rem;font-size:0.95rem;opacity:0;transition:all 0.3s;max-width:90%;
    font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
  `;

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
