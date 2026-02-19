import { students } from './demoData';
import { $, showToast } from './utils';

export function initRouteCheck(): void {
  const container = $('#routeCheckContent');
  if (!container) return;

  const outsideStudents = students.filter(s => s.isOutsideRoute);

  if (outsideStudents.length === 0) {
    container.innerHTML = '<div class="sp-empty-state">Tüm öğrenciler güzergah dahilinde.</div>';
    return;
  }

  container.innerHTML = `
    <div class="sp-route-check-alert">
      <div class="sp-alert-banner warning">
        ⚠️ <strong>${outsideStudents.length} öğrenci</strong> kayıtlı güzergah dışında ikamet etmektedir.
      </div>
      <div class="sp-outside-list">
        ${outsideStudents.map(s => `
          <div class="sp-outside-card">
            <div class="sp-outside-info">
              <div class="sp-att-avatar">${s.name.split(' ').map(n => n[0]).join('')}</div>
              <div>
                <strong>${s.name}</strong>
                <small>${s.class} · ${s.route}</small>
                <small>Durak: ${s.stopName}</small>
              </div>
            </div>
            <div class="sp-outside-actions">
              <button class="sp-btn sp-btn-sm sp-btn-outline" data-notify="${s.id}">📱 Veli Bilgilendir</button>
              <button class="sp-btn sp-btn-sm sp-btn-primary" data-reassign="${s.id}">🔄 Güzergah Ata</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;

  container.querySelectorAll<HTMLButtonElement>('[data-notify]').forEach(btn => {
    btn.addEventListener('click', () => {
      const student = students.find(s => s.id === btn.dataset.notify);
      if (student) {
        showToast(`${student.name}'in velisine (${student.parentPhone}) bilgilendirme mesajı gönderildi.`, 'success');
        btn.textContent = '✓ Bilgilendirildi';
        btn.disabled = true;
      }
    });
  });

  container.querySelectorAll<HTMLButtonElement>('[data-reassign]').forEach(btn => {
    btn.addEventListener('click', () => {
      const student = students.find(s => s.id === btn.dataset.reassign);
      if (student) {
        showToast(`${student.name} için yeni güzergah atama işlemi başlatıldı.`, 'info');
      }
    });
  });
}
