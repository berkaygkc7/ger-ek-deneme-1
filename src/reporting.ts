import { getReportSummary, getWeeklyAttendance, getRoutePerformances } from './demoData';
import { $, showToast } from './utils';

let activeTab: 'overview' | 'attendance' | 'routes' = 'overview';

function renderOverview(): string {
  const summary = getReportSummary();

  return `
    <div class="rp-stats-grid">
      <div class="rp-stat-card blue">
        <div class="rp-stat-icon">🎓</div>
        <div class="rp-stat-value">${summary.totalStudents}</div>
        <div class="rp-stat-label">Toplam Öğrenci</div>
      </div>
      <div class="rp-stat-card green">
        <div class="rp-stat-icon">🛣️</div>
        <div class="rp-stat-value">${summary.activeRoutes}</div>
        <div class="rp-stat-label">Aktif Güzergah</div>
      </div>
      <div class="rp-stat-card yellow">
        <div class="rp-stat-icon">📊</div>
        <div class="rp-stat-value">%${summary.avgAttendance}</div>
        <div class="rp-stat-label">Ort. Devam</div>
      </div>
      <div class="rp-stat-card purple">
        <div class="rp-stat-icon">🚌</div>
        <div class="rp-stat-value">${summary.totalTripsToday}</div>
        <div class="rp-stat-label">Bugünkü Sefer</div>
      </div>
      <div class="rp-stat-card teal">
        <div class="rp-stat-icon">⏱️</div>
        <div class="rp-stat-value">%${summary.onTimePercentage}</div>
        <div class="rp-stat-label">Zamanında</div>
      </div>
      <div class="rp-stat-card orange">
        <div class="rp-stat-icon">🚗</div>
        <div class="rp-stat-value">${summary.activeVehicles}</div>
        <div class="rp-stat-label">Aktif Araç</div>
      </div>
      <div class="rp-stat-card navy">
        <div class="rp-stat-icon">👨‍✈️</div>
        <div class="rp-stat-value">${summary.totalDrivers}</div>
        <div class="rp-stat-label">Toplam Şoför</div>
      </div>
      <div class="rp-stat-card gold">
        <div class="rp-stat-icon">⭐</div>
        <div class="rp-stat-value">${summary.avgDriverRating}</div>
        <div class="rp-stat-label">Ort. Puan</div>
      </div>
    </div>

    <div class="rp-quick-insights">
      <h4>💡 Hızlı Bilgiler</h4>
      <div class="rp-insights-grid">
        <div class="rp-insight-card good">
          <span class="rp-insight-icon">📈</span>
          <div>
            <strong>Devam Oranı Artışta</strong>
            <p>Bu hafta devam oranı geçen haftaya göre %1.4 arttı.</p>
          </div>
        </div>
        <div class="rp-insight-card warning">
          <span class="rp-insight-icon">⚠️</span>
          <div>
            <strong>Gecikme Uyarısı</strong>
            <p>Sincan - Batıkent güzergahında ortalama 4.1 dk gecikme var.</p>
          </div>
        </div>
        <div class="rp-insight-card good">
          <span class="rp-insight-icon">🏆</span>
          <div>
            <strong>En İyi Güzergah</strong>
            <p>Eryaman - Elvankent güzergahı %96.1 zamanında varış oranı ile lider.</p>
          </div>
        </div>
        <div class="rp-insight-card info">
          <span class="rp-insight-icon">🔧</span>
          <div>
            <strong>Bakım Planı</strong>
            <p>06 GHI 789 plakalı aracın periyodik bakım tarihi yaklaşıyor.</p>
          </div>
        </div>
      </div>
    </div>`;
}

function renderAttendanceReport(): string {
  const data = getWeeklyAttendance();
  const maxTotal = Math.max(...data.map(d => d.total));

  return `
    <div class="rp-chart-section">
      <h4>📊 Haftalık Devam Grafiği</h4>
      <div class="rp-bar-chart">
        ${data.map(d => {
          const presentPct = (d.present / maxTotal) * 100;
          const absentPct = (d.absent / maxTotal) * 100;
          const rate = Math.round((d.present / d.total) * 100);
          return `
            <div class="rp-bar-group">
              <div class="rp-bar-label">${d.day.substring(0, 3)}</div>
              <div class="rp-bar-stack">
                <div class="rp-bar present" style="height:${presentPct}%" title="${d.present} mevcut"></div>
                <div class="rp-bar absent" style="height:${absentPct}%" title="${d.absent} devamsız"></div>
              </div>
              <div class="rp-bar-value">%${rate}</div>
            </div>`;
        }).join('')}
      </div>
      <div class="rp-chart-legend">
        <span class="rp-legend-item"><span class="rp-legend-color present"></span>Mevcut</span>
        <span class="rp-legend-item"><span class="rp-legend-color absent"></span>Devamsız</span>
      </div>
    </div>

    <div class="rp-table-section">
      <h4>📋 Günlük Detay</h4>
      <table class="rp-table">
        <thead>
          <tr>
            <th>Gün</th>
            <th>Mevcut</th>
            <th>Devamsız</th>
            <th>Toplam</th>
            <th>Devam Oranı</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(d => {
            const rate = Math.round((d.present / d.total) * 100);
            const rateColor = rate >= 95 ? '#4caf50' : rate >= 90 ? '#ff9800' : '#e53935';
            return `
              <tr>
                <td><strong>${d.day}</strong></td>
                <td style="color:#4caf50">${d.present}</td>
                <td style="color:#e53935">${d.absent}</td>
                <td>${d.total}</td>
                <td><span class="rp-rate-badge" style="background:${rateColor}20;color:${rateColor}">%${rate}</span></td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderRouteReport(): string {
  const routes = getRoutePerformances();

  return `
    <div class="rp-routes-section">
      <h4>🛣️ Güzergah Performansı</h4>
      <div class="rp-route-cards">
        ${routes.map(r => {
          const otColor = r.onTimeRate >= 95 ? '#4caf50' : r.onTimeRate >= 90 ? '#ff9800' : '#e53935';
          const starHtml = Array.from({ length: 5 }, (_, i) =>
            `<span style="color:${i < Math.round(r.satisfaction) ? '#ffc107' : '#ddd'}">★</span>`
          ).join('');

          return `
            <div class="rp-route-card">
              <div class="rp-route-header">
                <strong>${r.routeName}</strong>
                <span class="rp-rate-badge" style="background:${otColor}20;color:${otColor}">%${r.onTimeRate}</span>
              </div>
              <div class="rp-route-stats">
                <div class="rp-route-stat">
                  <span>Öğrenci</span>
                  <strong>${r.studentCount}</strong>
                </div>
                <div class="rp-route-stat">
                  <span>Sefer</span>
                  <strong>${r.tripCount}</strong>
                </div>
                <div class="rp-route-stat">
                  <span>Ort. Gecikme</span>
                  <strong>${r.avgDelay} dk</strong>
                </div>
                <div class="rp-route-stat">
                  <span>Memnuniyet</span>
                  <strong>${starHtml}</strong>
                </div>
              </div>
              <div class="rp-route-bar">
                <div class="rp-route-bar-fill" style="width:${r.onTimeRate}%;background:${otColor}"></div>
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>

    <div class="rp-comparison">
      <h4>📊 Güzergah Karşılaştırması</h4>
      <table class="rp-table">
        <thead>
          <tr>
            <th>Güzergah</th>
            <th>Zamanında %</th>
            <th>Ort. Gecikme</th>
            <th>Öğrenci</th>
            <th>Sefer</th>
            <th>Memnuniyet</th>
          </tr>
        </thead>
        <tbody>
          ${routes.map(r => {
            const otColor = r.onTimeRate >= 95 ? '#4caf50' : r.onTimeRate >= 90 ? '#ff9800' : '#e53935';
            return `
              <tr>
                <td><strong>${r.routeName}</strong></td>
                <td><span class="rp-rate-badge" style="background:${otColor}20;color:${otColor}">%${r.onTimeRate}</span></td>
                <td>${r.avgDelay} dk</td>
                <td>${r.studentCount}</td>
                <td>${r.tripCount}</td>
                <td>⭐ ${r.satisfaction}</td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

function render(): void {
  const container = $('#reportingContent');
  if (!container) return;

  let content = `
    <div class="rp-sub-tabs">
      <button class="rp-sub-tab ${activeTab === 'overview' ? 'active' : ''}" data-tab="overview">📊 Genel Bakış</button>
      <button class="rp-sub-tab ${activeTab === 'attendance' ? 'active' : ''}" data-tab="attendance">📋 Devam Raporu</button>
      <button class="rp-sub-tab ${activeTab === 'routes' ? 'active' : ''}" data-tab="routes">🛣️ Güzergah Raporu</button>
    </div>
    <div class="rp-sub-content">`;

  switch (activeTab) {
    case 'overview': content += renderOverview(); break;
    case 'attendance': content += renderAttendanceReport(); break;
    case 'routes': content += renderRouteReport(); break;
  }

  content += `</div>
    <div class="rp-export-bar">
      <button class="sp-btn sp-btn-sm sp-btn-outline" id="rpExportPDF">📄 PDF İndir</button>
      <button class="sp-btn sp-btn-sm sp-btn-outline" id="rpExportExcel">📊 Excel İndir</button>
      <button class="sp-btn sp-btn-sm sp-btn-primary" id="rpPrint">🖨️ Yazdır</button>
    </div>`;

  container.innerHTML = content;
  bindEvents(container);
}

function bindEvents(container: HTMLElement): void {
  container.querySelectorAll<HTMLButtonElement>('.rp-sub-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab as typeof activeTab;
      render();
    });
  });

  container.querySelector('#rpExportPDF')?.addEventListener('click', () => {
    showToast('Rapor PDF olarak hazırlanıyor...', 'info');
  });

  container.querySelector('#rpExportExcel')?.addEventListener('click', () => {
    showToast('Rapor Excel olarak hazırlanıyor...', 'info');
  });

  container.querySelector('#rpPrint')?.addEventListener('click', () => {
    showToast('Yazdırma penceresi açılıyor...', 'info');
  });
}

export function initReporting(): void {
  render();
}
