import type { VehicleStatus } from './types';
import { generateVehicleStatuses } from './demoData';
import { $, showToast } from './utils';

let vehicles: VehicleStatus[] = [];
let selectedVehicle: string | null = null;
let filterStatus: string = 'all';
let refreshInterval: ReturnType<typeof setInterval> | null = null;

function getStatusLabel(status: VehicleStatus['status']): string {
  const map: Record<string, string> = {
    active: 'Seferde',
    idle: 'Beklemede',
    maintenance: 'Bakımda',
    returning: 'Dönüşte'
  };
  return map[status] ?? status;
}

function getStatusColor(status: VehicleStatus['status']): string {
  const map: Record<string, string> = {
    active: '#4caf50',
    idle: '#ff9800',
    maintenance: '#e53935',
    returning: '#2196f3'
  };
  return map[status] ?? '#757575';
}

function getFilteredVehicles(): VehicleStatus[] {
  if (filterStatus === 'all') return vehicles;
  return vehicles.filter(v => v.status === filterStatus);
}

function timeSince(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds} sn önce`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes} dk önce`;
}

function renderVehicleCard(v: VehicleStatus): string {
  const isSelected = selectedVehicle === v.id;
  const occupancyPct = Math.round((v.studentsOnBoard / v.capacity) * 100);
  const fuelColor = v.fuelLevel > 50 ? '#4caf50' : v.fuelLevel > 25 ? '#ff9800' : '#e53935';

  return `
    <div class="vt-card ${isSelected ? 'selected' : ''}" data-vehicle="${v.id}">
      <div class="vt-card-header">
        <div class="vt-plate">
          <span class="vt-status-dot" style="background:${getStatusColor(v.status)}"></span>
          <strong>${v.plate}</strong>
        </div>
        <span class="vt-status-badge" style="background:${getStatusColor(v.status)}20;color:${getStatusColor(v.status)}">${getStatusLabel(v.status)}</span>
      </div>
      <div class="vt-card-body">
        <div class="vt-info-row"><span>Şoför:</span><strong>${v.driverName}</strong></div>
        <div class="vt-info-row"><span>Güzergah:</span><strong>${v.routeName}</strong></div>
        <div class="vt-info-row"><span>Hız:</span><strong>${v.position.speed} km/s</strong></div>
        <div class="vt-info-row"><span>Sonraki Durak:</span><strong>${v.nextStop}</strong></div>
        <div class="vt-info-row"><span>Tahmini Varış:</span><strong>${v.eta}</strong></div>
        <div class="vt-progress-row">
          <span>Yolcu (${v.studentsOnBoard}/${v.capacity})</span>
          <div class="vt-progress-bar">
            <div class="vt-progress-fill" style="width:${occupancyPct}%;background:${occupancyPct > 85 ? '#e53935' : '#4caf50'}"></div>
          </div>
        </div>
        <div class="vt-progress-row">
          <span>Yakıt (%${v.fuelLevel})</span>
          <div class="vt-progress-bar">
            <div class="vt-progress-fill" style="width:${v.fuelLevel}%;background:${fuelColor}"></div>
          </div>
        </div>
        <div class="vt-update-time">Son güncelleme: ${timeSince(v.lastUpdate)}</div>
      </div>
    </div>`;
}

function renderMapPlaceholder(): string {
  const v = selectedVehicle ? vehicles.find(x => x.id === selectedVehicle) : null;

  if (!v) {
    return `
      <div class="vt-map-placeholder">
        <div class="vt-map-icon">🗺️</div>
        <p>Harita görüntüsü için bir araç seçin</p>
        <small>Sol panelden bir araca tıklayarak konum bilgilerini görüntüleyebilirsiniz</small>
      </div>`;
  }

  const gridSize = 12;
  const normLat = Math.round(((v.position.lat - 39.9) / 0.1) * (gridSize - 1));
  const normLng = Math.round(((v.position.lng - 32.75) / 0.15) * (gridSize - 1));

  let gridHtml = '';
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const isVehicle = row === (gridSize - 1 - normLat) && col === normLng;
      gridHtml += `<div class="vt-grid-cell ${isVehicle ? 'vehicle' : ''}">${isVehicle ? '🚌' : ''}</div>`;
    }
  }

  return `
    <div class="vt-map-detail">
      <div class="vt-map-header">
        <h4>📍 ${v.plate} - ${v.driverName}</h4>
        <span class="vt-status-badge" style="background:${getStatusColor(v.status)}20;color:${getStatusColor(v.status)}">${getStatusLabel(v.status)}</span>
      </div>
      <div class="vt-mini-map">
        <div class="vt-grid">${gridHtml}</div>
      </div>
      <div class="vt-coords">
        <div class="vt-coord-item"><span>Enlem:</span><strong>${v.position.lat.toFixed(4)}°</strong></div>
        <div class="vt-coord-item"><span>Boylam:</span><strong>${v.position.lng.toFixed(4)}°</strong></div>
        <div class="vt-coord-item"><span>Yön:</span><strong>${v.position.heading}°</strong></div>
        <div class="vt-coord-item"><span>Hız:</span><strong>${v.position.speed} km/s</strong></div>
      </div>
      <div class="vt-map-actions">
        <button class="sp-btn sp-btn-sm sp-btn-primary" id="vtSendMessage" data-id="${v.id}">💬 Şoföre Mesaj</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="vtShowRoute" data-id="${v.id}">🗺️ Güzergahı Göster</button>
      </div>
    </div>`;
}

function render(): void {
  const container = $('#vehicleTrackingContent');
  if (!container) return;

  const filtered = getFilteredVehicles();
  const activeCount = vehicles.filter(v => v.status === 'active').length;
  const totalStudents = vehicles.reduce((s, v) => s + v.studentsOnBoard, 0);
  const avgSpeed = vehicles.filter(v => v.status === 'active').reduce((s, v) => s + v.position.speed, 0) / (activeCount || 1);

  container.innerHTML = `
    <div class="vt-summary">
      <div class="vt-summary-card"><span class="vt-summary-num">${vehicles.length}</span><span>Toplam Araç</span></div>
      <div class="vt-summary-card active"><span class="vt-summary-num">${activeCount}</span><span>Seferde</span></div>
      <div class="vt-summary-card"><span class="vt-summary-num">${totalStudents}</span><span>Yolcu</span></div>
      <div class="vt-summary-card"><span class="vt-summary-num">${Math.round(avgSpeed)} km/s</span><span>Ort. Hız</span></div>
    </div>

    <div class="vt-toolbar">
      <select class="sp-select sp-select-sm" id="vtStatusFilter">
        <option value="all" ${filterStatus === 'all' ? 'selected' : ''}>Tüm Araçlar</option>
        <option value="active" ${filterStatus === 'active' ? 'selected' : ''}>Seferde</option>
        <option value="idle" ${filterStatus === 'idle' ? 'selected' : ''}>Beklemede</option>
        <option value="returning" ${filterStatus === 'returning' ? 'selected' : ''}>Dönüşte</option>
        <option value="maintenance" ${filterStatus === 'maintenance' ? 'selected' : ''}>Bakımda</option>
      </select>
      <button class="sp-btn sp-btn-sm sp-btn-primary" id="vtRefresh">🔄 Yenile</button>
    </div>

    <div class="vt-layout">
      <div class="vt-vehicle-list">
        ${filtered.length === 0 ? '<div class="sp-empty-state">Bu filtre ile eşleşen araç yok.</div>' : ''}
        ${filtered.map(v => renderVehicleCard(v)).join('')}
      </div>
      <div class="vt-map-area">
        ${renderMapPlaceholder()}
      </div>
    </div>`;

  bindEvents(container);
}

function bindEvents(container: HTMLElement): void {
  container.querySelector('#vtStatusFilter')?.addEventListener('change', (e) => {
    filterStatus = (e.target as HTMLSelectElement).value;
    render();
  });

  container.querySelector('#vtRefresh')?.addEventListener('click', () => {
    simulateUpdate();
    showToast('Araç konumları güncellendi.', 'info');
  });

  container.querySelectorAll<HTMLElement>('.vt-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.vehicle!;
      selectedVehicle = selectedVehicle === id ? null : id;
      render();
    });
  });

  container.querySelector('#vtSendMessage')?.addEventListener('click', () => {
    const v = vehicles.find(x => x.id === selectedVehicle);
    if (v) showToast(`${v.driverName} şoföre mesaj gönderildi.`, 'success');
  });

  container.querySelector('#vtShowRoute')?.addEventListener('click', () => {
    const v = vehicles.find(x => x.id === selectedVehicle);
    if (v) showToast(`${v.routeName} güzergahı haritada gösteriliyor.`, 'info');
  });
}

function simulateUpdate(): void {
  vehicles = generateVehicleStatuses();
  render();
}

export function initVehicleTracking(): void {
  vehicles = generateVehicleStatuses();
  render();

  refreshInterval = setInterval(() => {
    vehicles.forEach(v => {
      if (v.status === 'active') {
        v.position.lat += (Math.random() - 0.5) * 0.002;
        v.position.lng += (Math.random() - 0.5) * 0.002;
        v.position.speed = Math.max(0, v.position.speed + Math.floor((Math.random() - 0.5) * 10));
        v.lastUpdate = new Date();
      }
    });

    const panel = $('#panel-vehicle-tracking');
    if (panel?.classList.contains('active')) {
      render();
    }
  }, 10000);
}
