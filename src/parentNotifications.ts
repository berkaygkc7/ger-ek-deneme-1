import type { ParentNotification } from './types';
import { generateNotifications } from './demoData';
import { $, showToast, formatDate } from './utils';

let notifications: ParentNotification[] = [];
let filterType: string = 'all';
let filterPriority: string = 'all';
let searchQuery: string = '';

function getTypeLabel(type: ParentNotification['type']): string {
  const map: Record<string, string> = {
    arrival: 'Varış',
    departure: 'Kalkış',
    delay: 'Gecikme',
    absence: 'Devamsızlık',
    route_change: 'Güzergah',
    emergency: 'Acil',
    general: 'Genel'
  };
  return map[type] ?? type;
}

function getTypeIcon(type: ParentNotification['type']): string {
  const map: Record<string, string> = {
    arrival: '🚌',
    departure: '🏫',
    delay: '⏰',
    absence: '❌',
    route_change: '🔄',
    emergency: '🚨',
    general: '📢'
  };
  return map[type] ?? '📋';
}

function getPriorityLabel(p: ParentNotification['priority']): string {
  const map: Record<string, string> = { low: 'Düşük', medium: 'Orta', high: 'Yüksek', urgent: 'Acil' };
  return map[p] ?? p;
}

function getPriorityColor(p: ParentNotification['priority']): string {
  const map: Record<string, string> = { low: '#4caf50', medium: '#2196f3', high: '#ff9800', urgent: '#e53935' };
  return map[p] ?? '#757575';
}

function getFiltered(): ParentNotification[] {
  return notifications.filter(n => {
    const matchType = filterType === 'all' || n.type === filterType;
    const matchPriority = filterPriority === 'all' || n.priority === filterPriority;
    const matchSearch = !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchPriority && matchSearch;
  });
}

function render(): void {
  const container = $('#notificationsContent');
  if (!container) return;

  const filtered = getFiltered();
  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.read).length;

  container.innerHTML = `
    <div class="pn-summary">
      <div class="pn-summary-card"><span class="pn-summary-num">${notifications.length}</span><span>Toplam Bildirim</span></div>
      <div class="pn-summary-card unread"><span class="pn-summary-num">${unreadCount}</span><span>Okunmamış</span></div>
      <div class="pn-summary-card urgent"><span class="pn-summary-num">${urgentCount}</span><span>Acil</span></div>
    </div>

    <div class="pn-toolbar">
      <div class="pn-filters">
        <select class="sp-select sp-select-sm" id="pnTypeFilter">
          <option value="all">Tüm Türler</option>
          <option value="arrival" ${filterType === 'arrival' ? 'selected' : ''}>Varış</option>
          <option value="departure" ${filterType === 'departure' ? 'selected' : ''}>Kalkış</option>
          <option value="delay" ${filterType === 'delay' ? 'selected' : ''}>Gecikme</option>
          <option value="absence" ${filterType === 'absence' ? 'selected' : ''}>Devamsızlık</option>
          <option value="route_change" ${filterType === 'route_change' ? 'selected' : ''}>Güzergah</option>
          <option value="emergency" ${filterType === 'emergency' ? 'selected' : ''}>Acil</option>
          <option value="general" ${filterType === 'general' ? 'selected' : ''}>Genel</option>
        </select>
        <select class="sp-select sp-select-sm" id="pnPriorityFilter">
          <option value="all">Tüm Öncelikler</option>
          <option value="urgent" ${filterPriority === 'urgent' ? 'selected' : ''}>Acil</option>
          <option value="high" ${filterPriority === 'high' ? 'selected' : ''}>Yüksek</option>
          <option value="medium" ${filterPriority === 'medium' ? 'selected' : ''}>Orta</option>
          <option value="low" ${filterPriority === 'low' ? 'selected' : ''}>Düşük</option>
        </select>
        <input type="text" class="sp-input sp-input-sm" id="pnSearch" placeholder="Bildirim ara..." value="${searchQuery}">
      </div>
      <div class="pn-actions">
        <button class="sp-btn sp-btn-sm sp-btn-primary" id="pnMarkAllRead">✓ Tümünü Oku</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="pnNewNotification">+ Yeni Bildirim</button>
      </div>
    </div>

    <div class="pn-list">
      ${filtered.length === 0 ? '<div class="sp-empty-state">Bu filtre ile eşleşen bildirim yok.</div>' : ''}
      ${filtered.map(n => `
        <div class="pn-item ${n.read ? 'read' : 'unread'} priority-${n.priority}" data-id="${n.id}">
          <div class="pn-item-icon">${getTypeIcon(n.type)}</div>
          <div class="pn-item-content">
            <div class="pn-item-header">
              <strong>${n.title}</strong>
              <div class="pn-item-meta">
                <span class="pn-type-badge" style="background:${getPriorityColor(n.priority)}20;color:${getPriorityColor(n.priority)}">${getPriorityLabel(n.priority)}</span>
                <span class="pn-type-badge outline">${getTypeLabel(n.type)}</span>
              </div>
            </div>
            <p class="pn-item-message">${n.message}</p>
            <div class="pn-item-footer">
              <span>👤 ${n.studentName}</span>
              <span>👨‍👩‍👧 ${n.parentName}</span>
              <span>📞 ${n.parentPhone}</span>
              <span>🕐 ${formatDate(n.timestamp)}</span>
            </div>
          </div>
          <div class="pn-item-actions">
            <button class="pn-action-btn" data-action="toggle-read" data-id="${n.id}" title="${n.read ? 'Okunmadı İşaretle' : 'Okundu İşaretle'}">
              ${n.read ? '📭' : '📬'}
            </button>
            <button class="pn-action-btn" data-action="resend" data-id="${n.id}" title="Tekrar Gönder">📤</button>
            <button class="pn-action-btn delete" data-action="delete" data-id="${n.id}" title="Sil">🗑️</button>
          </div>
        </div>
      `).join('')}
    </div>`;

  bindEvents(container);
}

function bindEvents(container: HTMLElement): void {
  container.querySelector('#pnTypeFilter')?.addEventListener('change', (e) => {
    filterType = (e.target as HTMLSelectElement).value;
    render();
  });

  container.querySelector('#pnPriorityFilter')?.addEventListener('change', (e) => {
    filterPriority = (e.target as HTMLSelectElement).value;
    render();
  });

  container.querySelector('#pnSearch')?.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    render();
  });

  container.querySelector('#pnMarkAllRead')?.addEventListener('click', () => {
    notifications.forEach(n => n.read = true);
    showToast('Tüm bildirimler okundu olarak işaretlendi.', 'success');
    render();
  });

  container.querySelector('#pnNewNotification')?.addEventListener('click', () => {
    showNewNotificationModal();
  });

  container.querySelectorAll<HTMLButtonElement>('.pn-action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const id = btn.dataset.id!;
      const notif = notifications.find(n => n.id === id);
      if (!notif) return;

      if (action === 'toggle-read') {
        notif.read = !notif.read;
        showToast(notif.read ? 'Bildirim okundu olarak işaretlendi.' : 'Bildirim okunmadı olarak işaretlendi.', 'info');
      } else if (action === 'resend') {
        showToast(`"${notif.title}" bildirimi ${notif.parentName} velisine tekrar gönderildi.`, 'success');
      } else if (action === 'delete') {
        notifications = notifications.filter(n => n.id !== id);
        showToast('Bildirim silindi.', 'warning');
      }
      render();
    });
  });
}

function showNewNotificationModal(): void {
  const overlay = document.createElement('div');
  overlay.className = 'pn-modal-overlay';
  overlay.innerHTML = `
    <div class="pn-modal">
      <div class="pn-modal-header">
        <h3>Yeni Bildirim Gönder</h3>
        <button class="pn-modal-close" id="pnModalClose">✕</button>
      </div>
      <form id="pnNewForm" class="pn-modal-body">
        <div class="sp-form-row">
          <div class="sp-form-group">
            <label class="sp-label">Bildirim Türü *</label>
            <select class="sp-select" name="type" required>
              <option value="general">Genel</option>
              <option value="arrival">Varış</option>
              <option value="departure">Kalkış</option>
              <option value="delay">Gecikme</option>
              <option value="absence">Devamsızlık</option>
              <option value="route_change">Güzergah Değişikliği</option>
              <option value="emergency">Acil Durum</option>
            </select>
          </div>
          <div class="sp-form-group">
            <label class="sp-label">Öncelik *</label>
            <select class="sp-select" name="priority" required>
              <option value="low">Düşük</option>
              <option value="medium" selected>Orta</option>
              <option value="high">Yüksek</option>
              <option value="urgent">Acil</option>
            </select>
          </div>
        </div>
        <div class="sp-form-group">
          <label class="sp-label">Başlık *</label>
          <input class="sp-input" type="text" name="title" required placeholder="Bildirim başlığı">
        </div>
        <div class="sp-form-group">
          <label class="sp-label">Mesaj *</label>
          <textarea class="sp-input" name="message" rows="3" required placeholder="Bildirim mesajı"></textarea>
        </div>
        <div class="sp-form-row">
          <div class="sp-form-group">
            <label class="sp-label">Öğrenci Adı *</label>
            <input class="sp-input" type="text" name="studentName" required>
          </div>
          <div class="sp-form-group">
            <label class="sp-label">Veli Adı *</label>
            <input class="sp-input" type="text" name="parentName" required>
          </div>
        </div>
        <div class="pn-modal-footer">
          <button type="button" class="sp-btn sp-btn-outline" id="pnModalCancel">İptal</button>
          <button type="submit" class="sp-btn sp-btn-primary">📤 Gönder</button>
        </div>
      </form>
    </div>`;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));

  const close = () => {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  };

  overlay.querySelector('#pnModalClose')?.addEventListener('click', close);
  overlay.querySelector('#pnModalCancel')?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  overlay.querySelector('#pnNewForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const newNotif: ParentNotification = {
      id: `n-${Date.now()}`,
      type: data.get('type') as ParentNotification['type'],
      title: data.get('title') as string,
      message: data.get('message') as string,
      studentName: data.get('studentName') as string,
      parentName: data.get('parentName') as string,
      parentPhone: '-',
      timestamp: new Date(),
      read: false,
      priority: data.get('priority') as ParentNotification['priority']
    };

    notifications.unshift(newNotif);
    showToast('Bildirim başarıyla gönderildi!', 'success');
    close();
    render();
  });
}

export function initParentNotifications(): void {
  notifications = generateNotifications();
  render();
}
