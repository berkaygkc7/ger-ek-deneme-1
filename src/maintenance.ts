import type { MaintenanceRecord } from './types';
import { generateMaintenanceRecords, maintenanceTypeLabels, routes } from './demoData';
import { $, showToast } from './utils';

let records: MaintenanceRecord[] = [];
let filterStatus = 'all';
let filterVehicle = 'all';

function statusLabel(s: MaintenanceRecord['status']): string {
  return { scheduled: 'Planlandı', in_progress: 'Devam Ediyor', completed: 'Tamamlandı', cancelled: 'İptal' }[s];
}

function statusColor(s: MaintenanceRecord['status']): string {
  return { scheduled: '#2196f3', in_progress: '#ff9800', completed: '#4caf50', cancelled: '#757575' }[s];
}

function priorityColor(p: MaintenanceRecord['priority']): string {
  return { low: '#4caf50', medium: '#2196f3', high: '#ff9800', urgent: '#e53935' }[p];
}

function priorityLabel(p: MaintenanceRecord['priority']): string {
  return { low: 'Düşük', medium: 'Orta', high: 'Yüksek', urgent: 'Acil' }[p];
}

function typeIcon(t: MaintenanceRecord['type']): string {
  return { periodic: '🔧', repair: '🛠️', tire: '🛞', brake: '🛑', oil: '🛢️', inspection: '📋', cleaning: '🧹' }[t];
}

function fmt(n: number): string { return n.toLocaleString('tr-TR'); }

function getFiltered(): MaintenanceRecord[] {
  return records.filter(r => {
    const ms = filterStatus === 'all' || r.status === filterStatus;
    const mv = filterVehicle === 'all' || r.vehiclePlate === filterVehicle;
    return ms && mv;
  });
}

function render(): void {
  const container = $('#maintenanceContent');
  if (!container) return;

  const filtered = getFiltered();
  const totalCost = records.filter(r => r.status === 'completed').reduce((s, r) => s + r.cost, 0);
  const scheduledCount = records.filter(r => r.status === 'scheduled').length;
  const inProgressCount = records.filter(r => r.status === 'in_progress').length;
  const urgentCount = records.filter(r => r.priority === 'urgent' && r.status !== 'completed').length;
  const plates = [...new Set(records.map(r => r.vehiclePlate))];

  container.innerHTML = `
    <div class="mt-summary">
      <div class="mt-sum-card"><div class="mt-sum-icon">🔧</div><div class="mt-sum-val">${records.length}</div><div class="mt-sum-lbl">Toplam Kayıt</div></div>
      <div class="mt-sum-card blue"><div class="mt-sum-icon">📅</div><div class="mt-sum-val">${scheduledCount}</div><div class="mt-sum-lbl">Planlanmış</div></div>
      <div class="mt-sum-card orange"><div class="mt-sum-icon">⚙️</div><div class="mt-sum-val">${inProgressCount}</div><div class="mt-sum-lbl">Devam Eden</div></div>
      <div class="mt-sum-card red"><div class="mt-sum-icon">🚨</div><div class="mt-sum-val">${urgentCount}</div><div class="mt-sum-lbl">Acil</div></div>
      <div class="mt-sum-card green"><div class="mt-sum-icon">💰</div><div class="mt-sum-val">₺${fmt(totalCost)}</div><div class="mt-sum-lbl">Toplam Maliyet</div></div>
    </div>

    <div class="mt-toolbar">
      <div class="mt-filters">
        <select class="sp-select sp-select-sm" id="mtStatusFilter">
          <option value="all">Tüm Durumlar</option>
          <option value="scheduled" ${filterStatus === 'scheduled' ? 'selected' : ''}>Planlanmış</option>
          <option value="in_progress" ${filterStatus === 'in_progress' ? 'selected' : ''}>Devam Eden</option>
          <option value="completed" ${filterStatus === 'completed' ? 'selected' : ''}>Tamamlanmış</option>
        </select>
        <select class="sp-select sp-select-sm" id="mtVehicleFilter">
          <option value="all">Tüm Araçlar</option>
          ${plates.map(p => `<option value="${p}" ${filterVehicle === p ? 'selected' : ''}>${p}</option>`).join('')}
        </select>
      </div>
      <button class="sp-btn sp-btn-sm sp-btn-primary" id="mtNewRecord">+ Bakım Kaydı Ekle</button>
    </div>

    <div class="mt-cards">
      ${filtered.map(r => `
        <div class="mt-card status-${r.status}">
          <div class="mt-card-header">
            <div class="mt-card-type">${typeIcon(r.type)} ${maintenanceTypeLabels[r.type] ?? r.type}</div>
            <span class="rp-rate-badge" style="background:${statusColor(r.status)}20;color:${statusColor(r.status)}">${statusLabel(r.status)}</span>
          </div>
          <div class="mt-card-plate">${r.vehiclePlate}</div>
          <p class="mt-card-desc">${r.description}</p>
          <div class="mt-card-details">
            <div><span>Tarih:</span><strong>${r.scheduledDate}</strong></div>
            <div><span>Maliyet:</span><strong>₺${fmt(r.cost)}</strong></div>
            <div><span>Firma:</span><strong>${r.vendor}</strong></div>
            <div><span>KM:</span><strong>${fmt(r.odometer)}</strong></div>
            <div><span>Öncelik:</span><span class="rp-rate-badge" style="background:${priorityColor(r.priority)}20;color:${priorityColor(r.priority)}">${priorityLabel(r.priority)}</span></div>
            ${r.nextDue ? `<div><span>Sonraki:</span><strong>${r.nextDue}</strong></div>` : ''}
          </div>
          <div class="mt-card-actions">
            ${r.status === 'scheduled' ? `<button class="sp-btn sp-btn-sm sp-btn-primary mt-start-btn" data-id="${r.id}">▶ Başlat</button>` : ''}
            ${r.status === 'in_progress' ? `<button class="sp-btn sp-btn-sm sp-btn-success mt-complete-btn" data-id="${r.id}">✓ Tamamla</button>` : ''}
            <button class="sp-btn sp-btn-sm sp-btn-outline mt-detail-btn" data-id="${r.id}">Detay</button>
          </div>
        </div>
      `).join('')}
    </div>`;

  bindEvents(container);
}

function bindEvents(c: HTMLElement): void {
  c.querySelector('#mtStatusFilter')?.addEventListener('change', e => { filterStatus = (e.target as HTMLSelectElement).value; render(); });
  c.querySelector('#mtVehicleFilter')?.addEventListener('change', e => { filterVehicle = (e.target as HTMLSelectElement).value; render(); });
  c.querySelector('#mtNewRecord')?.addEventListener('click', () => showToast('Yeni bakım kaydı formu açılıyor...', 'info'));

  c.querySelectorAll<HTMLButtonElement>('.mt-start-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const r = records.find(x => x.id === btn.dataset.id);
      if (r) { r.status = 'in_progress'; showToast(`${r.vehiclePlate} bakım işlemi başlatıldı.`, 'info'); render(); }
    });
  });

  c.querySelectorAll<HTMLButtonElement>('.mt-complete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const r = records.find(x => x.id === btn.dataset.id);
      if (r) { r.status = 'completed'; r.completedDate = new Date().toISOString().split('T')[0]; showToast(`${r.vehiclePlate} bakımı tamamlandı.`, 'success'); render(); }
    });
  });

  c.querySelectorAll<HTMLButtonElement>('.mt-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => showToast('Detay sayfası açılıyor...', 'info'));
  });
}

export function initMaintenance(): void {
  records = generateMaintenanceRecords();
  render();
}
