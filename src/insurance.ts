import type { VehicleInsurance, InsuranceStatus } from './types';
import { vehicleInsuranceData } from './demoData';
import { $, showToast } from './utils';

let vehicles = [...vehicleInsuranceData];
let filterStatus: InsuranceStatus | 'all' = 'all';
let searchQuery = '';
let editingId: string | null = null;
let notificationsShown = false;

const CRITICAL_DAYS = 15;
const WARNING_DAYS = 30;

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / 86400000);
}

function getStatus(dateStr: string): InsuranceStatus {
  const days = daysUntil(dateStr);
  if (days < 0) return 'expired';
  if (days <= CRITICAL_DAYS) return 'critical';
  if (days <= WARNING_DAYS) return 'warning';
  return 'ok';
}

function getWorstStatus(v: VehicleInsurance): InsuranceStatus {
  const kaskoSt = getStatus(v.kaskoEnd);
  const sigortaSt = getStatus(v.sigortaEnd);
  const priority: InsuranceStatus[] = ['expired', 'critical', 'warning', 'ok'];
  return priority[Math.min(priority.indexOf(kaskoSt), priority.indexOf(sigortaSt))];
}

function statusLabel(s: InsuranceStatus): string {
  const map: Record<InsuranceStatus, string> = {
    expired: 'Süresi Dolmuş', critical: 'Acil', warning: 'Yaklaşıyor', ok: 'Geçerli'
  };
  return map[s];
}

function statusColor(s: InsuranceStatus): string {
  const map: Record<InsuranceStatus, string> = {
    expired: '#e53935', critical: '#ff5722', warning: '#ff9800', ok: '#4caf50'
  };
  return map[s];
}

function daysLabel(dateStr: string): string {
  const d = daysUntil(dateStr);
  if (d < 0) return `${Math.abs(d)} gün geçti`;
  if (d === 0) return 'Bugün doluyor!';
  return `${d} gün kaldı`;
}

function formatDateTR(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

function getStats() {
  let expired = 0, critical = 0, warning = 0, ok = 0;
  vehicles.forEach(v => {
    const ws = getWorstStatus(v);
    if (ws === 'expired') expired++;
    else if (ws === 'critical') critical++;
    else if (ws === 'warning') warning++;
    else ok++;
  });
  return { expired, critical, warning, ok, total: vehicles.length };
}

function getFiltered(): VehicleInsurance[] {
  return vehicles.filter(v => {
    const ws = getWorstStatus(v);
    const matchFilter = filterStatus === 'all' || ws === filterStatus;
    const matchSearch = !searchQuery
      || v.plate.toLowerCase().includes(searchQuery.toLowerCase())
      || v.driverName.toLowerCase().includes(searchQuery.toLowerCase())
      || v.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  }).sort((a, b) => {
    const prio: InsuranceStatus[] = ['expired', 'critical', 'warning', 'ok'];
    return prio.indexOf(getWorstStatus(a)) - prio.indexOf(getWorstStatus(b));
  });
}

function renderStatusBadge(dateStr: string): string {
  const s = getStatus(dateStr);
  return `<span class="sp-ins-badge" style="background:${statusColor(s)}">${statusLabel(s)}</span>`;
}

function renderDaysTag(dateStr: string): string {
  const s = getStatus(dateStr);
  const d = daysUntil(dateStr);
  const cls = s === 'ok' ? '' : 'urgent';
  return `<span class="sp-ins-days ${cls}" style="color:${statusColor(s)}">${d < 0 ? '⛔' : d <= CRITICAL_DAYS ? '🔴' : d <= WARNING_DAYS ? '🟡' : '🟢'} ${daysLabel(dateStr)}</span>`;
}

function renderNotificationBell(): string {
  const stats = getStats();
  const alertCount = stats.expired + stats.critical;
  const warnCount = stats.warning;
  return `
    <div class="sp-ins-bell-area">
      <button class="sp-ins-bell" id="insNotifBtn" title="Bildirimleri Göster">
        🔔${alertCount > 0 ? `<span class="sp-ins-bell-badge">${alertCount}</span>` : ''}
      </button>
      ${alertCount > 0 ? `<span class="sp-ins-bell-text">${alertCount} acil, ${warnCount} yaklaşan</span>` : ''}
    </div>`;
}

function renderNotificationPanel(): string {
  const urgent = vehicles.filter(v => {
    const ws = getWorstStatus(v);
    return ws === 'expired' || ws === 'critical' || ws === 'warning';
  }).sort((a, b) => {
    const prio: InsuranceStatus[] = ['expired', 'critical', 'warning', 'ok'];
    return prio.indexOf(getWorstStatus(a)) - prio.indexOf(getWorstStatus(b));
  });

  if (urgent.length === 0) {
    return '<div class="sp-empty-state">Tüm araçların sigorta ve kasko tarihleri geçerli.</div>';
  }

  return `<div class="sp-ins-notif-list">
    ${urgent.map(v => {
      const kaskoSt = getStatus(v.kaskoEnd);
      const sigortaSt = getStatus(v.sigortaEnd);
      const items: string[] = [];
      if (kaskoSt !== 'ok') {
        items.push(`<div class="sp-ins-notif-line"><strong>Kasko:</strong> ${formatDateTR(v.kaskoEnd)} — <span style="color:${statusColor(kaskoSt)};font-weight:700">${daysLabel(v.kaskoEnd)}</span></div>`);
      }
      if (sigortaSt !== 'ok') {
        items.push(`<div class="sp-ins-notif-line"><strong>Sigorta:</strong> ${formatDateTR(v.sigortaEnd)} — <span style="color:${statusColor(sigortaSt)};font-weight:700">${daysLabel(v.sigortaEnd)}</span></div>`);
      }
      return `
        <div class="sp-ins-notif-card" style="border-left:4px solid ${statusColor(getWorstStatus(v))}">
          <div class="sp-ins-notif-head">
            <strong>🚐 ${v.plate}</strong>
            <span>${v.brand} ${v.model} · ${v.driverName}</span>
          </div>
          ${items.join('')}
        </div>`;
    }).join('')}
  </div>`;
}

function renderEditModal(v: VehicleInsurance): string {
  return `
    <div class="sp-ins-modal-overlay" id="insModalOverlay">
      <div class="sp-ins-modal">
        <div class="sp-ins-modal-header">
          <h3>🚐 ${v.plate} — Sigorta Bilgilerini Düzenle</h3>
          <button class="sp-survey-close" id="insModalClose">&times;</button>
        </div>
        <div class="sp-ins-modal-body">
          <div class="sp-info-box">🚗 ${v.brand} ${v.model} (${v.year}) · Şoför: ${v.driverName}</div>

          <h4 style="color:var(--navy-blue);margin:1rem 0 0.5rem;">🛡️ Kasko Bilgileri</h4>
          <div class="sp-form-row">
            <div class="sp-form-group">
              <label class="sp-label">Sigorta Şirketi</label>
              <input class="sp-input" type="text" id="editKaskoCompany" value="${v.kaskoCompany}">
            </div>
            <div class="sp-form-group">
              <label class="sp-label">Poliçe No</label>
              <input class="sp-input" type="text" id="editKaskoPolicy" value="${v.kaskoPolicy}">
            </div>
          </div>
          <div class="sp-form-row">
            <div class="sp-form-group">
              <label class="sp-label">Başlangıç Tarihi</label>
              <input class="sp-input" type="date" id="editKaskoStart" value="${v.kaskoStart}">
            </div>
            <div class="sp-form-group">
              <label class="sp-label">Bitiş Tarihi</label>
              <input class="sp-input" type="date" id="editKaskoEnd" value="${v.kaskoEnd}">
            </div>
          </div>

          <h4 style="color:var(--navy-blue);margin:1rem 0 0.5rem;">📋 Trafik Sigortası Bilgileri</h4>
          <div class="sp-form-row">
            <div class="sp-form-group">
              <label class="sp-label">Sigorta Şirketi</label>
              <input class="sp-input" type="text" id="editSigortaCompany" value="${v.sigortaCompany}">
            </div>
            <div class="sp-form-group">
              <label class="sp-label">Poliçe No</label>
              <input class="sp-input" type="text" id="editSigortaPolicy" value="${v.sigortaPolicy}">
            </div>
          </div>
          <div class="sp-form-row">
            <div class="sp-form-group">
              <label class="sp-label">Başlangıç Tarihi</label>
              <input class="sp-input" type="date" id="editSigortaStart" value="${v.sigortaStart}">
            </div>
            <div class="sp-form-group">
              <label class="sp-label">Bitiş Tarihi</label>
              <input class="sp-input" type="date" id="editSigortaEnd" value="${v.sigortaEnd}">
            </div>
          </div>

          <div class="sp-form-group">
            <label class="sp-label">Notlar</label>
            <textarea class="sp-textarea" id="editNotes" rows="2" placeholder="Ek notlar...">${v.notes}</textarea>
          </div>

          <div style="display:flex;gap:0.75rem;margin-top:1rem;">
            <button class="sp-btn sp-btn-primary" id="insModalSave" style="flex:1;">💾 Kaydet</button>
            <button class="sp-btn sp-btn-outline" id="insModalCancel">İptal</button>
          </div>
        </div>
      </div>
    </div>`;
}

function render(): void {
  const container = $('#insuranceContent');
  if (!container) return;

  const stats = getStats();
  const filtered = getFiltered();
  const showNotifPanel = document.getElementById('insNotifPanel')?.classList.contains('open') ?? false;

  container.innerHTML = `
    <div class="sp-ins-top-bar">
      <div class="sp-ins-stats">
        <div class="sp-ins-stat-card" data-filter="expired" style="border-top:3px solid #e53935">
          <span class="sp-ins-stat-num" style="color:#e53935">${stats.expired}</span>
          <span class="sp-ins-stat-lbl">Süresi Dolmuş</span>
        </div>
        <div class="sp-ins-stat-card" data-filter="critical" style="border-top:3px solid #ff5722">
          <span class="sp-ins-stat-num" style="color:#ff5722">${stats.critical}</span>
          <span class="sp-ins-stat-lbl">Acil (&le;${CRITICAL_DAYS} gün)</span>
        </div>
        <div class="sp-ins-stat-card" data-filter="warning" style="border-top:3px solid #ff9800">
          <span class="sp-ins-stat-num" style="color:#ff9800">${stats.warning}</span>
          <span class="sp-ins-stat-lbl">Yaklaşan (&le;${WARNING_DAYS} gün)</span>
        </div>
        <div class="sp-ins-stat-card" data-filter="ok" style="border-top:3px solid #4caf50">
          <span class="sp-ins-stat-num" style="color:#4caf50">${stats.ok}</span>
          <span class="sp-ins-stat-lbl">Geçerli</span>
        </div>
      </div>

      <div class="sp-ins-toolbar">
        <div class="sp-ins-toolbar-left">
          <select class="sp-select sp-select-sm" id="insFilterSelect">
            <option value="all" ${filterStatus === 'all' ? 'selected' : ''}>Tüm Araçlar</option>
            <option value="expired" ${filterStatus === 'expired' ? 'selected' : ''}>Süresi Dolmuş</option>
            <option value="critical" ${filterStatus === 'critical' ? 'selected' : ''}>Acil</option>
            <option value="warning" ${filterStatus === 'warning' ? 'selected' : ''}>Yaklaşan</option>
            <option value="ok" ${filterStatus === 'ok' ? 'selected' : ''}>Geçerli</option>
          </select>
          <input class="sp-input sp-input-sm" id="insSearch" type="text" placeholder="Plaka, şoför veya marka ara..." value="${searchQuery}" style="min-width:200px;">
        </div>
        ${renderNotificationBell()}
      </div>

      <div class="sp-ins-notif-panel ${showNotifPanel ? 'open' : ''}" id="insNotifPanel">
        <div class="sp-ins-notif-header">
          <h4>🔔 Bildirimler</h4>
          <button class="sp-btn sp-btn-sm sp-btn-outline" id="insNotifClose">Kapat</button>
        </div>
        ${renderNotificationPanel()}
      </div>
    </div>

    <div class="sp-ins-table-wrap">
      <table class="sp-ins-table">
        <thead>
          <tr>
            <th>Araç</th>
            <th>Şoför</th>
            <th>Kasko Bitiş</th>
            <th>Kasko Durum</th>
            <th>Sigorta Bitiş</th>
            <th>Sigorta Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.length === 0 ? '<tr><td colspan="7" class="sp-empty-state">Araç bulunamadı.</td></tr>' : ''}
          ${filtered.map(v => {
            const ws = getWorstStatus(v);
            return `
            <tr class="sp-ins-row sp-ins-row-${ws}">
              <td>
                <div class="sp-ins-vehicle">
                  <strong>${v.plate}</strong>
                  <small>${v.brand} ${v.model} (${v.year})</small>
                </div>
              </td>
              <td>${v.driverName}</td>
              <td><span class="sp-ins-date">${formatDateTR(v.kaskoEnd)}</span></td>
              <td>${renderStatusBadge(v.kaskoEnd)}<br>${renderDaysTag(v.kaskoEnd)}</td>
              <td><span class="sp-ins-date">${formatDateTR(v.sigortaEnd)}</span></td>
              <td>${renderStatusBadge(v.sigortaEnd)}<br>${renderDaysTag(v.sigortaEnd)}</td>
              <td>
                <button class="sp-btn sp-btn-sm sp-btn-outline" data-edit="${v.vehicleId}" title="Düzenle">✏️</button>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div id="insModalContainer"></div>
  `;

  bindEvents(container);
}

function bindEvents(container: HTMLElement): void {
  container.querySelector('#insFilterSelect')?.addEventListener('change', (e) => {
    filterStatus = (e.target as HTMLSelectElement).value as InsuranceStatus | 'all';
    render();
  });

  container.querySelector('#insSearch')?.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    render();
  });

  container.querySelectorAll<HTMLElement>('.sp-ins-stat-card[data-filter]').forEach(card => {
    card.addEventListener('click', () => {
      const f = card.dataset.filter as InsuranceStatus;
      filterStatus = filterStatus === f ? 'all' : f;
      render();
    });
  });

  container.querySelector('#insNotifBtn')?.addEventListener('click', () => {
    const panel = container.querySelector('#insNotifPanel');
    panel?.classList.toggle('open');
  });

  container.querySelector('#insNotifClose')?.addEventListener('click', () => {
    container.querySelector('#insNotifPanel')?.classList.remove('open');
  });

  container.querySelectorAll<HTMLButtonElement>('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => {
      editingId = btn.dataset.edit!;
      openEditModal();
    });
  });
}

function openEditModal(): void {
  const v = vehicles.find(x => x.vehicleId === editingId);
  if (!v) return;
  const modalContainer = $('#insModalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = renderEditModal(v);

  const overlay = modalContainer.querySelector('#insModalOverlay') as HTMLElement;
  const close = () => { overlay?.remove(); editingId = null; };

  overlay?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).id === 'insModalOverlay') close();
  });
  modalContainer.querySelector('#insModalClose')?.addEventListener('click', close);
  modalContainer.querySelector('#insModalCancel')?.addEventListener('click', close);

  modalContainer.querySelector('#insModalSave')?.addEventListener('click', () => {
    const idx = vehicles.findIndex(x => x.vehicleId === editingId);
    if (idx === -1) return;

    vehicles[idx] = {
      ...vehicles[idx],
      kaskoCompany: (document.getElementById('editKaskoCompany') as HTMLInputElement).value,
      kaskoPolicy: (document.getElementById('editKaskoPolicy') as HTMLInputElement).value,
      kaskoStart: (document.getElementById('editKaskoStart') as HTMLInputElement).value,
      kaskoEnd: (document.getElementById('editKaskoEnd') as HTMLInputElement).value,
      sigortaCompany: (document.getElementById('editSigortaCompany') as HTMLInputElement).value,
      sigortaPolicy: (document.getElementById('editSigortaPolicy') as HTMLInputElement).value,
      sigortaStart: (document.getElementById('editSigortaStart') as HTMLInputElement).value,
      sigortaEnd: (document.getElementById('editSigortaEnd') as HTMLInputElement).value,
      notes: (document.getElementById('editNotes') as HTMLTextAreaElement).value,
    };

    showToast(`${vehicles[idx].plate} sigorta bilgileri güncellendi.`, 'success');
    close();
    render();
  });
}

function showStartupNotifications(): void {
  if (notificationsShown) return;
  notificationsShown = true;

  const stats = getStats();
  if (stats.expired > 0) {
    showToast(`⛔ ${stats.expired} aracın sigorta/kasko süresi dolmuş! Acil yenileme gerekiyor.`, 'error');
  }
  if (stats.critical > 0) {
    setTimeout(() => {
      showToast(`🔴 ${stats.critical} aracın sigorta/kaskosu ${CRITICAL_DAYS} gün içinde doluyor!`, 'warning');
    }, stats.expired > 0 ? 4000 : 0);
  }
}

export function initInsurance(): void {
  render();
  setTimeout(showStartupNotifications, 1500);
}
