import { students, routes, generatePayments } from './demoData';
import { $, showToast } from './utils';

let selectedStudentId: string | null = null;

function render(): void {
  const container = $('#parentPortalContent');
  if (!container) return;

  if (!selectedStudentId) {
    renderStudentSelect(container);
  } else {
    renderPortal(container);
  }
}

function renderStudentSelect(container: HTMLElement): void {
  container.innerHTML = `
    <div class="pp-welcome">
      <div class="pp-welcome-icon">👨‍👩‍👧‍👦</div>
      <h4>Veli Portalına Hoş Geldiniz</h4>
      <p>Çocuğunuzun servis bilgilerini, yoklama durumunu ve ödeme detaylarını buradan takip edebilirsiniz.</p>
      <div class="pp-student-grid">
        ${students.slice(0, 12).map(s => {
          const route = routes.find(r => r.name === s.route);
          return `
            <div class="pp-student-card" data-id="${s.id}">
              <div class="pp-student-avatar">${s.name.split(' ').map(n => n[0]).join('')}</div>
              <strong>${s.name}</strong>
              <small>${s.class} · ${route?.name.split(' - ')[0] ?? ''}</small>
            </div>`;
        }).join('')}
      </div>
      <p style="color:var(--gray);font-size:0.8rem;margin-top:1rem;">Demo amaçlı bir öğrenci seçerek veli portalını deneyimleyin.</p>
    </div>`;

  container.querySelectorAll<HTMLElement>('.pp-student-card').forEach(card => {
    card.addEventListener('click', () => { selectedStudentId = card.dataset.id!; render(); });
  });
}

function renderPortal(container: HTMLElement): void {
  const student = students.find(s => s.id === selectedStudentId);
  if (!student) return;

  const route = routes.find(r => r.name === student.route);
  const payments = generatePayments().filter(p => p.studentId === student.id);
  const paidCount = payments.filter(p => p.status === 'paid').length;
  const pendingPayment = payments.find(p => p.status === 'pending' || p.status === 'overdue');

  const attendanceDays = [
    { day: 'Pazartesi', status: 'present' }, { day: 'Salı', status: 'present' },
    { day: 'Çarşamba', status: 'present' }, { day: 'Perşembe', status: 'absent' },
    { day: 'Cuma', status: 'present' },
  ];
  const weekAttRate = Math.round((attendanceDays.filter(d => d.status === 'present').length / attendanceDays.length) * 100);

  container.innerHTML = `
    <div class="pp-header">
      <button class="sp-btn sp-btn-sm sp-btn-outline" id="ppBack">← Geri</button>
      <div class="pp-student-info">
        <div class="pp-lg-avatar">${student.name.split(' ').map(n => n[0]).join('')}</div>
        <div>
          <h4>${student.name}</h4>
          <span>${student.class} · ${student.route}</span>
        </div>
      </div>
    </div>

    <div class="pp-grid">
      <div class="pp-card">
        <h5>🚌 Servis Durumu</h5>
        <div class="pp-live-status">
          <div class="pp-status-dot active"></div>
          <span>Servis Seferde</span>
        </div>
        <div class="pp-detail-rows">
          <div><span>Güzergah:</span><strong>${route?.name ?? '-'}</strong></div>
          <div><span>Şoför:</span><strong>${route?.driverName ?? '-'}</strong></div>
          <div><span>Plaka:</span><strong>${route?.vehiclePlate ?? '-'}</strong></div>
          <div><span>Durak:</span><strong>${student.stopName}</strong></div>
          <div><span>Tahmini Varış:</span><strong class="pp-eta">~${5 + Math.floor(Math.random() * 10)} dakika</strong></div>
        </div>
        <button class="sp-btn sp-btn-sm sp-btn-primary pp-full-width" id="ppTrackBus">📍 Servisi Canlı Takip Et</button>
      </div>

      <div class="pp-card">
        <h5>📋 Bu Hafta Yoklama</h5>
        <div class="pp-attendance-week">
          ${attendanceDays.map(d => `
            <div class="pp-att-day ${d.status}">
              <span class="pp-att-icon">${d.status === 'present' ? '✓' : '✕'}</span>
              <span>${d.day.substring(0, 3)}</span>
            </div>
          `).join('')}
        </div>
        <div class="pp-att-summary">
          <span>Haftalık Devam: <strong>%${weekAttRate}</strong></span>
          <span>Aylık Devam: <strong>%94</strong></span>
        </div>
      </div>

      <div class="pp-card">
        <h5>💳 Ödeme Durumu</h5>
        ${pendingPayment ? `
          <div class="pp-payment-alert ${pendingPayment.status}">
            <span>${pendingPayment.status === 'overdue' ? '⚠️ Gecikmiş' : '⏳ Bekleyen'} Ödeme</span>
            <strong>₺${pendingPayment.amount.toLocaleString('tr-TR')}</strong>
            <small>${pendingPayment.month} · Son tarih: ${pendingPayment.dueDate}</small>
          </div>
        ` : '<div class="pp-payment-ok">✅ Tüm ödemeler güncel!</div>'}
        <div class="pp-payment-history">
          <small>Ödeme Geçmişi (${paidCount}/${payments.length} ödendi)</small>
          <div class="pp-payment-bar"><div class="pp-payment-fill" style="width:${Math.round((paidCount / Math.max(payments.length, 1)) * 100)}%"></div></div>
        </div>
        <button class="sp-btn sp-btn-sm sp-btn-success pp-full-width" id="ppMakePayment">💳 Ödeme Yap</button>
      </div>

      <div class="pp-card">
        <h5>📱 Hızlı İşlemler</h5>
        <div class="pp-quick-actions">
          <button class="pp-action-btn" id="ppNotifyAbsence"><span>🏠</span>Devamsızlık Bildir</button>
          <button class="pp-action-btn" id="ppContactDriver"><span>📞</span>Şoförü Ara</button>
          <button class="pp-action-btn" id="ppSendMessage"><span>💬</span>Mesaj Gönder</button>
          <button class="pp-action-btn" id="ppViewSchedule"><span>📅</span>Sefer Takvimi</button>
          <button class="pp-action-btn" id="ppRateDriver"><span>⭐</span>Şoför Değerlendir</button>
          <button class="pp-action-btn" id="ppEmergency"><span>🚨</span>Acil Durum</button>
        </div>
      </div>
    </div>

    <div class="pp-card pp-timeline-card">
      <h5>📜 Son Bildirimler</h5>
      <div class="pp-timeline">
        <div class="pp-tl-item"><div class="pp-tl-dot green"></div><div class="pp-tl-content"><strong>Okula güvenle ulaştı</strong><small>Bugün 08:15</small></div></div>
        <div class="pp-tl-item"><div class="pp-tl-dot blue"></div><div class="pp-tl-content"><strong>Servis durağından alındı</strong><small>Bugün 07:42</small></div></div>
        <div class="pp-tl-item"><div class="pp-tl-dot blue"></div><div class="pp-tl-content"><strong>Servis yola çıktı</strong><small>Bugün 07:15</small></div></div>
        <div class="pp-tl-item"><div class="pp-tl-dot orange"></div><div class="pp-tl-content"><strong>Dün akşam seferi 3 dk gecikmeli</strong><small>Dün 16:33</small></div></div>
        <div class="pp-tl-item"><div class="pp-tl-dot green"></div><div class="pp-tl-content"><strong>Mart ayı ödeme hatırlatması</strong><small>2 gün önce</small></div></div>
      </div>
    </div>`;

  container.querySelector('#ppBack')?.addEventListener('click', () => { selectedStudentId = null; render(); });
  container.querySelector('#ppTrackBus')?.addEventListener('click', () => showToast('Canlı takip haritası açılıyor...', 'info'));
  container.querySelector('#ppMakePayment')?.addEventListener('click', () => showToast('Ödeme sayfasına yönlendiriliyorsunuz...', 'info'));
  container.querySelector('#ppNotifyAbsence')?.addEventListener('click', () => showToast('Devamsızlık bildirimi gönderildi.', 'success'));
  container.querySelector('#ppContactDriver')?.addEventListener('click', () => showToast(`${route?.driverName} şoför aranıyor...`, 'info'));
  container.querySelector('#ppSendMessage')?.addEventListener('click', () => showToast('Mesaj penceresi açılıyor...', 'info'));
  container.querySelector('#ppViewSchedule')?.addEventListener('click', () => showToast('Sefer takvimi görüntüleniyor...', 'info'));
  container.querySelector('#ppRateDriver')?.addEventListener('click', () => showToast('Değerlendirme formu açılıyor...', 'info'));
  container.querySelector('#ppEmergency')?.addEventListener('click', () => showToast('Acil durum hattı: (555) 911-0000', 'warning'));
}

export function initParentPortal(): void {
  render();
}
