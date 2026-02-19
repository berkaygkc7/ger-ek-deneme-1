import { generateActivities } from './demoData';
import { $, formatDate } from './utils';

const typeColors: Record<string, string> = {
  route_complete: '#4caf50',
  attendance: '#2196f3',
  new_student: '#9c27b0',
  driver_rating: '#ff9800',
  route_change: '#00bcd4',
  alert: '#e53935',
  maintenance: '#607d8b'
};

const typeLabels: Record<string, string> = {
  route_complete: 'Sefer',
  attendance: 'Yoklama',
  new_student: 'Kayıt',
  driver_rating: 'Değerlendirme',
  route_change: 'Güzergah',
  alert: 'Uyarı',
  maintenance: 'Bakım'
};

export function initActivities(): void {
  const container = $('#activitiesContent');
  if (!container) return;

  const activities = generateActivities();
  const filterHtml = `
    <div class="sp-activity-filters">
      <button class="sp-filter-btn active" data-filter="all">Tümü</button>
      <button class="sp-filter-btn" data-filter="route_complete">Seferler</button>
      <button class="sp-filter-btn" data-filter="attendance">Yoklama</button>
      <button class="sp-filter-btn" data-filter="alert">Uyarılar</button>
      <button class="sp-filter-btn" data-filter="driver_rating">Değerlendirme</button>
    </div>`;

  function renderList(filter: string): string {
    const filtered = filter === 'all' ? activities : activities.filter(a => a.type === filter);
    if (filtered.length === 0) {
      return '<div class="sp-empty-state">Bu kategoride aktivite bulunamadı.</div>';
    }
    return filtered.map(a => `
      <div class="sp-activity-item" data-type="${a.type}">
        <div class="sp-activity-icon" style="background:${typeColors[a.type] ?? '#757575'}">${a.icon}</div>
        <div class="sp-activity-body">
          <div class="sp-activity-header">
            <strong>${a.title}</strong>
            <span class="sp-activity-badge" style="background:${typeColors[a.type] ?? '#757575'}">${typeLabels[a.type] ?? ''}</span>
          </div>
          <p>${a.description}</p>
          <small>${formatDate(a.timestamp)}</small>
        </div>
      </div>
    `).join('');
  }

  container.innerHTML = filterHtml + `<div class="sp-activity-list" id="activityList">${renderList('all')}</div>`;

  container.querySelectorAll<HTMLButtonElement>('.sp-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.sp-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const list = container.querySelector('#activityList');
      if (list) list.innerHTML = renderList(btn.dataset.filter ?? 'all');
    });
  });
}
