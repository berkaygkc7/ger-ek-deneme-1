import type { RoutePlannerStep, RouteStop } from './types';
import { routes } from './demoData';
import { $, showToast } from './utils';

interface PlannerState {
  step: RoutePlannerStep;
  selectedRoute: string | null;
  startStop: string | null;
  endStop: string | null;
  time: string | null;
  history: RoutePlannerStep[];
}

const state: PlannerState = {
  step: 'select-start',
  selectedRoute: null,
  startStop: null,
  endStop: null,
  time: null,
  history: []
};

function getStopsForRoute(): RouteStop[] {
  const route = routes.find(r => r.id === state.selectedRoute);
  return route ? route.stops : routes.flatMap(r => r.stops);
}

function pushStep(next: RoutePlannerStep): void {
  state.history.push(state.step);
  state.step = next;
}

function goBack(): void {
  const prev = state.history.pop();
  if (!prev) return;
  if (state.step === 'confirm') state.time = null;
  if (state.step === 'select-time') state.endStop = null;
  if (state.step === 'select-end') state.startStop = null;
  state.step = prev;
  render();
}

function cancelPlanning(): void {
  state.step = 'select-start';
  state.selectedRoute = null;
  state.startStop = null;
  state.endStop = null;
  state.time = null;
  state.history = [];
  render();
  showToast('Rota planlaması iptal edildi.', 'warning');
}

function renderStepIndicator(): string {
  const steps = [
    { key: 'select-start', label: 'Başlangıç' },
    { key: 'select-end', label: 'Varış' },
    { key: 'select-time', label: 'Saat' },
    { key: 'confirm', label: 'Onay' }
  ];
  const currentIdx = steps.findIndex(s => s.key === state.step);
  return `<div class="sp-steps">
    ${steps.map((s, i) => `
      <div class="sp-step ${i < currentIdx ? 'completed' : ''} ${i === currentIdx ? 'active' : ''}">
        <div class="sp-step-num">${i < currentIdx ? '✓' : i + 1}</div>
        <div class="sp-step-label">${s.label}</div>
      </div>
      ${i < steps.length - 1 ? '<div class="sp-step-line ' + (i < currentIdx ? 'completed' : '') + '"></div>' : ''}
    `).join('')}
  </div>`;
}

function renderControls(): string {
  const canGoBack = state.history.length > 0;
  return `<div class="sp-planner-controls">
    ${canGoBack ? '<button class="sp-btn sp-btn-outline" id="rpBack">← Geri</button>' : '<div></div>'}
    <button class="sp-btn sp-btn-danger" id="rpCancel">✕ İptal Et</button>
  </div>`;
}

function renderSelectStart(): string {
  const routeOptions = routes.map(r =>
    `<label class="sp-radio-card">
      <input type="radio" name="route" value="${r.id}" ${state.selectedRoute === r.id ? 'checked' : ''}>
      <div class="sp-radio-body">
        <strong>${r.name}</strong>
        <small>${r.stops.length} durak · Şoför: ${r.driverName} · ${r.vehiclePlate}</small>
      </div>
    </label>`
  ).join('');

  return `
    <h4>Güzergah & Başlangıç Durağı Seçin</h4>
    <div class="sp-form-group">
      <label class="sp-label">Güzergah</label>
      <div class="sp-radio-group">${routeOptions}</div>
    </div>
    <div class="sp-form-group" id="rpStartStops" style="${state.selectedRoute ? '' : 'display:none'}">
      <label class="sp-label">Başlangıç Durağı</label>
      <select class="sp-select" id="rpStartSelect">
        <option value="">Durak seçin...</option>
      </select>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextStart" disabled>Devam Et →</button>
    </div>`;
}

function renderSelectEnd(): string {
  const stops = getStopsForRoute().filter(s => s.id !== state.startStop);
  const options = stops.map(s =>
    `<option value="${s.id}" ${s.id === state.endStop ? 'selected' : ''}>${s.name} (${s.estimatedTime})</option>`
  ).join('');

  const startName = getStopsForRoute().find(s => s.id === state.startStop)?.name ?? '';
  return `
    <h4>Varış Durağı Seçin</h4>
    <div class="sp-info-box">📍 Başlangıç: <strong>${startName}</strong></div>
    <div class="sp-form-group">
      <label class="sp-label">Varış Durağı</label>
      <select class="sp-select" id="rpEndSelect">
        <option value="">Durak seçin...</option>
        ${options}
      </select>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextEnd" disabled>Devam Et →</button>
    </div>`;
}

function renderSelectTime(): string {
  const timeSlots = ['06:30', '07:00', '07:30', '08:00', '08:30', '12:00', '13:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
  const cards = timeSlots.map(t =>
    `<button class="sp-time-chip ${state.time === t ? 'selected' : ''}" data-time="${t}">${t}</button>`
  ).join('');

  return `
    <h4>Sefer Saati Seçin</h4>
    <div class="sp-info-box">📍 ${getStopsForRoute().find(s => s.id === state.startStop)?.name} → ${getStopsForRoute().find(s => s.id === state.endStop)?.name}</div>
    <div class="sp-time-grid">${cards}</div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextTime" disabled>Devam Et →</button>
    </div>`;
}

function renderConfirm(): string {
  const route = routes.find(r => r.id === state.selectedRoute);
  const startName = getStopsForRoute().find(s => s.id === state.startStop)?.name ?? '';
  const endName = getStopsForRoute().find(s => s.id === state.endStop)?.name ?? '';

  return `
    <h4>Rota Onayı</h4>
    <div class="sp-confirm-card">
      <div class="sp-confirm-row"><span>Güzergah:</span><strong>${route?.name}</strong></div>
      <div class="sp-confirm-row"><span>Şoför:</span><strong>${route?.driverName}</strong></div>
      <div class="sp-confirm-row"><span>Araç:</span><strong>${route?.vehiclePlate}</strong></div>
      <div class="sp-confirm-row"><span>Başlangıç:</span><strong>${startName}</strong></div>
      <div class="sp-confirm-row"><span>Varış:</span><strong>${endName}</strong></div>
      <div class="sp-confirm-row"><span>Saat:</span><strong>${state.time}</strong></div>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-success" id="rpConfirm">✓ Rotayı Onayla</button>
    </div>`;
}

function render(): void {
  const container = $('#routePlannerContent');
  if (!container) return;

  let content = renderStepIndicator();

  switch (state.step) {
    case 'select-start': content += renderSelectStart(); break;
    case 'select-end': content += renderSelectEnd(); break;
    case 'select-time': content += renderSelectTime(); break;
    case 'confirm': content += renderConfirm(); break;
  }

  content += renderControls();
  container.innerHTML = content;
  bindEvents();
}

function bindEvents(): void {
  const backBtn = $('#rpBack') as HTMLButtonElement | null;
  const cancelBtn = $('#rpCancel') as HTMLButtonElement | null;
  backBtn?.addEventListener('click', goBack);
  cancelBtn?.addEventListener('click', cancelPlanning);

  if (state.step === 'select-start') {
    document.querySelectorAll<HTMLInputElement>('input[name="route"]').forEach(radio => {
      radio.addEventListener('change', () => {
        state.selectedRoute = radio.value;
        const stopsDiv = $('#rpStartStops');
        const select = $('#rpStartSelect') as HTMLSelectElement | null;
        if (stopsDiv) stopsDiv.style.display = '';
        if (select) {
          const stops = getStopsForRoute();
          select.innerHTML = '<option value="">Durak seçin...</option>' +
            stops.map(s => `<option value="${s.id}">${s.name} (${s.estimatedTime})</option>`).join('');
        }
      });
    });

    const startSelect = $('#rpStartSelect') as HTMLSelectElement | null;
    const nextBtn = $('#rpNextStart') as HTMLButtonElement | null;
    startSelect?.addEventListener('change', () => {
      state.startStop = startSelect.value || null;
      if (nextBtn) nextBtn.disabled = !state.startStop;
    });
    nextBtn?.addEventListener('click', () => {
      if (state.startStop) { pushStep('select-end'); render(); }
    });
  }

  if (state.step === 'select-end') {
    const endSelect = $('#rpEndSelect') as HTMLSelectElement | null;
    const nextBtn = $('#rpNextEnd') as HTMLButtonElement | null;
    endSelect?.addEventListener('change', () => {
      state.endStop = endSelect.value || null;
      if (nextBtn) nextBtn.disabled = !state.endStop;
    });
    nextBtn?.addEventListener('click', () => {
      if (state.endStop) { pushStep('select-time'); render(); }
    });
  }

  if (state.step === 'select-time') {
    document.querySelectorAll<HTMLButtonElement>('.sp-time-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.sp-time-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        state.time = chip.dataset.time ?? null;
        const nextBtn = $('#rpNextTime') as HTMLButtonElement | null;
        if (nextBtn) nextBtn.disabled = false;
      });
    });
    const nextBtn = $('#rpNextTime') as HTMLButtonElement | null;
    nextBtn?.addEventListener('click', () => {
      if (state.time) { pushStep('confirm'); render(); }
    });
  }

  if (state.step === 'confirm') {
    const confirmBtn = $('#rpConfirm') as HTMLButtonElement | null;
    confirmBtn?.addEventListener('click', () => {
      showToast('Rota başarıyla onaylandı!', 'success');
      cancelPlanning();
    });
  }
}

export function initRoutePlanner(): void {
  const container = $('#routePlannerContent');
  if (!container) return;
  render();
}
