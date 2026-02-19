import type { DriverSurvey } from './types';
import { driverList } from './demoData';
import { $, showToast } from './utils';

const criteria = [
  { key: 'safety', label: 'Güvenli Sürüş', icon: '🛡️' },
  { key: 'punctuality', label: 'Dakiklik', icon: '⏰' },
  { key: 'friendliness', label: 'İletişim & Samimiyet', icon: '😊' },
  { key: 'driving', label: 'Sürüş Kalitesi', icon: '🚌' },
  { key: 'cleanliness', label: 'Araç Temizliği', icon: '✨' },
];

let selectedDriver = '';
const ratings: Record<string, number> = {};
let comment = '';
let isOpen = false;

function renderStars(criterionKey: string, current: number): string {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="sp-star ${i < current ? 'filled' : ''}" data-criterion="${criterionKey}" data-value="${i + 1}">★</span>`
  ).join('');
}

function render(): void {
  const overlay = $('#surveyOverlay');
  if (!overlay) return;

  if (!isOpen) {
    overlay.style.display = 'none';
    return;
  }
  overlay.style.display = 'flex';

  const content = overlay.querySelector('.sp-survey-content');
  if (!content) return;

  const driverOptions = driverList.map(d =>
    `<option value="${d.id}" ${d.id === selectedDriver ? 'selected' : ''}>${d.name} — ${d.route} (${d.plate})</option>`
  ).join('');

  const allRated = selectedDriver && criteria.every(c => (ratings[c.key] ?? 0) > 0);
  const avg = criteria.length > 0
    ? (criteria.reduce((sum, c) => sum + (ratings[c.key] ?? 0), 0) / criteria.length).toFixed(1)
    : '0.0';

  content.innerHTML = `
    <div class="sp-survey-header">
      <h3>Şoför Değerlendirme Anketi</h3>
      <button class="sp-survey-close" id="surveyClose">&times;</button>
    </div>
    <div class="sp-survey-body">
      <p class="sp-survey-desc">Bu anket isteğe bağlıdır. Şoförlerimizi değerlendirerek hizmet kalitemizi artırmamıza yardımcı olabilirsiniz.</p>
      <div class="sp-form-group">
        <label class="sp-label">Şoför Seçin</label>
        <select class="sp-select" id="surveyDriverSelect">
          <option value="">Şoför seçin...</option>
          ${driverOptions}
        </select>
      </div>
      ${selectedDriver ? `
        <div class="sp-survey-criteria">
          ${criteria.map(c => `
            <div class="sp-criterion">
              <div class="sp-criterion-label">${c.icon} ${c.label}</div>
              <div class="sp-stars">${renderStars(c.key, ratings[c.key] ?? 0)}</div>
              <div class="sp-criterion-value">${ratings[c.key] ? ratings[c.key] + '/5' : '-'}</div>
            </div>
          `).join('')}
        </div>
        <div class="sp-survey-avg">Ortalama Puan: <strong>${avg}</strong>/5</div>
        <div class="sp-form-group">
          <label class="sp-label">Yorumunuz (İsteğe bağlı)</label>
          <textarea class="sp-textarea" id="surveyComment" placeholder="Şoför hakkındaki görüşlerinizi yazabilirsiniz..." rows="3">${comment}</textarea>
        </div>
        <button class="sp-btn sp-btn-primary sp-btn-lg" id="surveySubmit" ${!allRated ? 'disabled' : ''}>
          Değerlendirmeyi Gönder
        </button>
      ` : '<div class="sp-empty-state">Değerlendirmek istediğiniz şoförü seçin.</div>'}
    </div>`;

  bindSurveyEvents(overlay);
}

function bindSurveyEvents(overlay: HTMLElement): void {
  overlay.querySelector('#surveyClose')?.addEventListener('click', closeSurvey);
  overlay.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).classList.contains('sp-survey-overlay')) closeSurvey();
  });

  overlay.querySelector('#surveyDriverSelect')?.addEventListener('change', (e) => {
    selectedDriver = (e.target as HTMLSelectElement).value;
    criteria.forEach(c => delete ratings[c.key]);
    comment = '';
    render();
  });

  overlay.querySelectorAll<HTMLSpanElement>('.sp-star').forEach(star => {
    star.addEventListener('click', () => {
      const key = star.dataset.criterion!;
      const val = parseInt(star.dataset.value!, 10);
      ratings[key] = val;
      render();
    });
  });

  overlay.querySelector('#surveyComment')?.addEventListener('input', (e) => {
    comment = (e.target as HTMLTextAreaElement).value;
  });

  overlay.querySelector('#surveySubmit')?.addEventListener('click', () => {
    const driver = driverList.find(d => d.id === selectedDriver);
    if (!driver) return;

    const survey: DriverSurvey = {
      driverId: driver.id,
      driverName: driver.name,
      ratings: {
        safety: ratings['safety'] ?? 0,
        punctuality: ratings['punctuality'] ?? 0,
        friendliness: ratings['friendliness'] ?? 0,
        driving: ratings['driving'] ?? 0,
        cleanliness: ratings['cleanliness'] ?? 0,
      },
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    console.log('Anket gönderildi:', survey);
    showToast(`${driver.name} için değerlendirmeniz kaydedildi. Teşekkürler!`, 'success');
    closeSurvey();
    selectedDriver = '';
    criteria.forEach(c => delete ratings[c.key]);
    comment = '';
  });
}

function closeSurvey(): void {
  isOpen = false;
  render();
}

export function openSurvey(): void {
  isOpen = true;
  render();
}

export function initDriverSurvey(): void {
  document.querySelectorAll('[data-action="open-survey"]').forEach(btn => {
    btn.addEventListener('click', openSurvey);
  });
  render();
}
