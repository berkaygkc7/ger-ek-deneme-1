import type { StudentFull } from './types';
import { generateStudentsFull, routes } from './demoData';
import { $, showToast } from './utils';

let studentsList: StudentFull[] = [];
let filterClass = 'all';
let filterRoute = 'all';
let filterActive = 'all';
let searchQuery = '';
let selectedId: string | null = null;
let viewMode: 'grid' | 'table' = 'grid';

function getClasses(): string[] {
  return [...new Set(studentsList.map(s => s.className))].sort();
}

function getFiltered(): StudentFull[] {
  return studentsList.filter(s => {
    const mc = filterClass === 'all' || s.className === filterClass;
    const mr = filterRoute === 'all' || s.routeId === filterRoute;
    const ma = filterActive === 'all' || (filterActive === 'active' ? s.isActive : !s.isActive);
    const mq = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    return mc && mr && ma && mq;
  });
}

function render(): void {
  const container = $('#studentMgmtContent');
  if (!container) return;

  if (selectedId) {
    renderProfile(container);
    return;
  }

  const filtered = getFiltered();
  const classes = getClasses();
  const activeCount = studentsList.filter(s => s.isActive).length;

  container.innerHTML = `
    <div class="sm-summary">
      <div class="sm-sum-card"><span class="sm-sum-num">${studentsList.length}</span><span>Toplam</span></div>
      <div class="sm-sum-card green"><span class="sm-sum-num">${activeCount}</span><span>Aktif</span></div>
      <div class="sm-sum-card red"><span class="sm-sum-num">${studentsList.length - activeCount}</span><span>Pasif</span></div>
      <div class="sm-sum-card blue"><span class="sm-sum-num">${classes.length}</span><span>Sınıf</span></div>
    </div>

    <div class="sm-toolbar">
      <div class="sm-filters">
        <select class="sp-select sp-select-sm" id="smClassFilter"><option value="all">Tüm Sınıflar</option>${classes.map(c => `<option value="${c}" ${filterClass === c ? 'selected' : ''}>${c}</option>`).join('')}</select>
        <select class="sp-select sp-select-sm" id="smRouteFilter"><option value="all">Tüm Güzergahlar</option>${routes.map(r => `<option value="${r.id}" ${filterRoute === r.id ? 'selected' : ''}>${r.name}</option>`).join('')}</select>
        <select class="sp-select sp-select-sm" id="smActiveFilter"><option value="all">Tümü</option><option value="active" ${filterActive === 'active' ? 'selected' : ''}>Aktif</option><option value="passive" ${filterActive === 'passive' ? 'selected' : ''}>Pasif</option></select>
        <input type="text" class="sp-input sp-input-sm" id="smSearch" placeholder="Öğrenci veya veli ara..." value="${searchQuery}">
      </div>
      <div class="sm-actions">
        <button class="sp-btn sp-btn-sm ${viewMode === 'grid' ? 'sp-btn-primary' : 'sp-btn-outline'}" id="smViewGrid">▦</button>
        <button class="sp-btn sp-btn-sm ${viewMode === 'table' ? 'sp-btn-primary' : 'sp-btn-outline'}" id="smViewTable">☰</button>
        <button class="sp-btn sp-btn-sm sp-btn-primary" id="smAddStudent">+ Öğrenci Ekle</button>
      </div>
    </div>

    ${viewMode === 'grid' ? renderGrid(filtered) : renderTable(filtered)}
    <div style="text-align:center;color:var(--gray);font-size:0.85rem;margin-top:1rem;">${filtered.length} öğrenci listeleniyor</div>`;

  bindEvents(container);
}

function renderGrid(list: StudentFull[]): string {
  return `<div class="sm-grid">${list.map(s => `
    <div class="sm-student-card ${!s.isActive ? 'passive' : ''}" data-id="${s.id}">
      <div class="sm-card-avatar">${s.photoInitials}</div>
      <strong>${s.name}</strong>
      <small>${s.className} · ${s.routeName.split(' - ')[0]}</small>
      <div class="sm-card-tags">
        ${!s.isActive ? '<span class="sm-tag red">Pasif</span>' : ''}
        ${s.allergies ? '<span class="sm-tag orange">Alerji</span>' : ''}
        ${s.notes ? '<span class="sm-tag blue">Not</span>' : ''}
      </div>
      <div class="sm-card-parent">👤 ${s.parentName}</div>
    </div>
  `).join('')}</div>`;
}

function renderTable(list: StudentFull[]): string {
  return `<div class="pm-table-wrap"><table class="rp-table">
    <thead><tr><th></th><th>Öğrenci</th><th>Sınıf</th><th>Güzergah</th><th>Veli</th><th>Telefon</th><th>Kan</th><th>Durum</th><th>İşlem</th></tr></thead>
    <tbody>${list.map(s => `
      <tr class="${!s.isActive ? 'sm-passive-row' : ''}">
        <td><div class="sm-mini-avatar">${s.photoInitials}</div></td>
        <td><strong>${s.name}</strong></td>
        <td>${s.className}</td>
        <td>${s.routeName.split(' ').slice(0, 2).join(' ')}</td>
        <td>${s.parentName}</td>
        <td>${s.parentPhone}</td>
        <td><span class="sm-blood">${s.bloodType}</span></td>
        <td><span class="rp-rate-badge" style="background:${s.isActive ? '#4caf50' : '#e53935'}20;color:${s.isActive ? '#4caf50' : '#e53935'}">${s.isActive ? 'Aktif' : 'Pasif'}</span></td>
        <td><button class="sp-btn sp-btn-sm sp-btn-outline sm-view-btn" data-id="${s.id}">Görüntüle</button></td>
      </tr>
    `).join('')}</tbody></table></div>`;
}

function renderProfile(container: HTMLElement): void {
  const s = studentsList.find(x => x.id === selectedId);
  if (!s) return;

  container.innerHTML = `
    <div class="sm-profile">
      <div class="sm-profile-header">
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="smProfileBack">← Listeye Dön</button>
        <div class="sm-profile-actions">
          <button class="sp-btn sp-btn-sm sp-btn-primary" id="smEditStudent">✏️ Düzenle</button>
          <button class="sp-btn sp-btn-sm ${s.isActive ? 'sp-btn-danger' : 'sp-btn-success'}" id="smToggleActive">${s.isActive ? '⏸ Pasife Al' : '▶ Aktif Et'}</button>
        </div>
      </div>
      <div class="sm-profile-body">
        <div class="sm-profile-main">
          <div class="sm-profile-avatar-lg">${s.photoInitials}</div>
          <h3>${s.name}</h3>
          <span class="rp-rate-badge" style="background:${s.isActive ? '#4caf50' : '#e53935'}20;color:${s.isActive ? '#4caf50' : '#e53935'}">${s.isActive ? 'Aktif Öğrenci' : 'Pasif Öğrenci'}</span>
        </div>
        <div class="sm-profile-grid">
          <div class="sm-profile-section">
            <h5>🎒 Öğrenci Bilgileri</h5>
            <div class="sm-detail"><span>Sınıf:</span><strong>${s.className}</strong></div>
            <div class="sm-detail"><span>Kan Grubu:</span><strong>${s.bloodType}</strong></div>
            <div class="sm-detail"><span>Alerji:</span><strong>${s.allergies || 'Yok'}</strong></div>
            <div class="sm-detail"><span>Kayıt Tarihi:</span><strong>${s.enrollmentDate}</strong></div>
            ${s.notes ? `<div class="sm-detail"><span>Not:</span><strong>${s.notes}</strong></div>` : ''}
          </div>
          <div class="sm-profile-section">
            <h5>👨‍👩‍👧 Veli Bilgileri</h5>
            <div class="sm-detail"><span>Veli:</span><strong>${s.parentName}</strong></div>
            <div class="sm-detail"><span>Telefon:</span><strong>${s.parentPhone}</strong></div>
            <div class="sm-detail"><span>E-posta:</span><strong>${s.parentEmail}</strong></div>
            <div class="sm-detail"><span>Acil İletişim:</span><strong>${s.emergencyContact}</strong></div>
            <div class="sm-detail"><span>Adres:</span><strong>${s.address}</strong></div>
          </div>
          <div class="sm-profile-section">
            <h5>🚌 Servis Bilgileri</h5>
            <div class="sm-detail"><span>Güzergah:</span><strong>${s.routeName}</strong></div>
            <div class="sm-detail"><span>Durak:</span><strong>${s.stopName}</strong></div>
          </div>
        </div>
      </div>
    </div>`;

  container.querySelector('#smProfileBack')?.addEventListener('click', () => { selectedId = null; render(); });
  container.querySelector('#smEditStudent')?.addEventListener('click', () => showToast('Düzenleme formu açılıyor...', 'info'));
  container.querySelector('#smToggleActive')?.addEventListener('click', () => {
    if (s) { s.isActive = !s.isActive; showToast(`${s.name} ${s.isActive ? 'aktif' : 'pasif'} duruma alındı.`, s.isActive ? 'success' : 'warning'); render(); }
  });
}

function bindEvents(c: HTMLElement): void {
  c.querySelector('#smClassFilter')?.addEventListener('change', e => { filterClass = (e.target as HTMLSelectElement).value; render(); });
  c.querySelector('#smRouteFilter')?.addEventListener('change', e => { filterRoute = (e.target as HTMLSelectElement).value; render(); });
  c.querySelector('#smActiveFilter')?.addEventListener('change', e => { filterActive = (e.target as HTMLSelectElement).value; render(); });
  c.querySelector('#smSearch')?.addEventListener('input', e => { searchQuery = (e.target as HTMLInputElement).value; render(); });
  c.querySelector('#smViewGrid')?.addEventListener('click', () => { viewMode = 'grid'; render(); });
  c.querySelector('#smViewTable')?.addEventListener('click', () => { viewMode = 'table'; render(); });
  c.querySelector('#smAddStudent')?.addEventListener('click', () => showToast('Yeni öğrenci kayıt formu açılıyor...', 'info'));

  c.querySelectorAll<HTMLElement>('.sm-student-card').forEach(card => {
    card.addEventListener('click', () => { selectedId = card.dataset.id!; render(); });
  });

  c.querySelectorAll<HTMLButtonElement>('.sm-view-btn').forEach(btn => {
    btn.addEventListener('click', () => { selectedId = btn.dataset.id!; render(); });
  });
}

export function initStudentManagement(): void {
  studentsList = generateStudentsFull();
  render();
}
