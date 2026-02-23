import type { Payment } from './types';
import { generatePayments, getPaymentSummary } from './demoData';
import { $, showToast } from './utils';

let payments: Payment[] = [];
let filterStatus = 'all';
let filterMonth = 'all';
let searchQuery = '';

function fmt(n: number): string {
  return n.toLocaleString('tr-TR');
}

function statusLabel(s: Payment['status']): string {
  return { paid: 'Ödendi', pending: 'Bekliyor', overdue: 'Gecikmiş', partial: 'Kısmi' }[s];
}

function statusColor(s: Payment['status']): string {
  return { paid: '#4caf50', pending: '#ff9800', overdue: '#e53935', partial: '#2196f3' }[s];
}

function methodLabel(m: Payment['method']): string {
  if (!m) return '-';
  return { credit_card: '💳 Kredi Kartı', bank_transfer: '🏦 Havale/EFT', cash: '💵 Nakit', auto_debit: '🔄 Otomatik' }[m];
}

function getFiltered(): Payment[] {
  return payments.filter(p => {
    const ms = filterStatus === 'all' || p.status === filterStatus;
    const mm = filterMonth === 'all' || p.month === filterMonth;
    const mq = !searchQuery || p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || p.parentName.toLowerCase().includes(searchQuery.toLowerCase()) || p.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());
    return ms && mm && mq;
  });
}

function getMonths(): string[] {
  return [...new Set(payments.map(p => p.month))];
}

function render(): void {
  const container = $('#paymentsContent');
  if (!container) return;

  const summary = getPaymentSummary();
  const filtered = getFiltered();
  const monthsList = getMonths();

  container.innerHTML = `
    <div class="pm-summary">
      <div class="pm-sum-card green"><div class="pm-sum-icon">💰</div><div class="pm-sum-val">₺${fmt(summary.totalRevenue)}</div><div class="pm-sum-lbl">Toplam Gelir</div></div>
      <div class="pm-sum-card blue"><div class="pm-sum-icon">✅</div><div class="pm-sum-val">₺${fmt(summary.collected)}</div><div class="pm-sum-lbl">Tahsil Edilen</div></div>
      <div class="pm-sum-card orange"><div class="pm-sum-icon">⏳</div><div class="pm-sum-val">₺${fmt(summary.pending)}</div><div class="pm-sum-lbl">Bekleyen</div></div>
      <div class="pm-sum-card red"><div class="pm-sum-icon">⚠️</div><div class="pm-sum-val">₺${fmt(summary.overdue)}</div><div class="pm-sum-lbl">Gecikmiş</div></div>
      <div class="pm-sum-card purple"><div class="pm-sum-icon">📊</div><div class="pm-sum-val">%${summary.collectionRate}</div><div class="pm-sum-lbl">Tahsilat Oranı</div></div>
    </div>
    <div class="pm-toolbar">
      <div class="pm-filters">
        <select class="sp-select sp-select-sm" id="pmStatusFilter">
          <option value="all">Tüm Durumlar</option>
          <option value="paid" ${filterStatus === 'paid' ? 'selected' : ''}>Ödendi</option>
          <option value="pending" ${filterStatus === 'pending' ? 'selected' : ''}>Bekliyor</option>
          <option value="overdue" ${filterStatus === 'overdue' ? 'selected' : ''}>Gecikmiş</option>
          <option value="partial" ${filterStatus === 'partial' ? 'selected' : ''}>Kısmi</option>
        </select>
        <select class="sp-select sp-select-sm" id="pmMonthFilter">
          <option value="all">Tüm Aylar</option>
          ${monthsList.map(m => `<option value="${m}" ${filterMonth === m ? 'selected' : ''}>${m}</option>`).join('')}
        </select>
        <input type="text" class="sp-input sp-input-sm" id="pmSearch" placeholder="Öğrenci, veli veya fatura ara..." value="${searchQuery}">
      </div>
      <div class="pm-actions">
        <button class="sp-btn sp-btn-sm sp-btn-primary" id="pmNewInvoice">+ Fatura Oluştur</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="pmExport">📊 Dışa Aktar</button>
      </div>
    </div>
    <div class="pm-table-wrap">
      <table class="rp-table pm-table">
        <thead><tr><th>Fatura No</th><th>Öğrenci</th><th>Veli</th><th>Ay</th><th>Tutar</th><th>Son Ödeme</th><th>Durum</th><th>Ödeme Yöntemi</th><th>İşlem</th></tr></thead>
        <tbody>
          ${filtered.length === 0 ? '<tr><td colspan="9" style="text-align:center;color:var(--gray);padding:2rem;">Kayıt bulunamadı.</td></tr>' : ''}
          ${filtered.slice(0, 30).map(p => `
            <tr class="pm-row-${p.status}">
              <td><code>${p.invoiceNo}</code></td>
              <td><strong>${p.studentName}</strong></td>
              <td>${p.parentName}</td>
              <td>${p.month}</td>
              <td><strong>₺${fmt(p.amount)}</strong></td>
              <td>${p.dueDate}</td>
              <td><span class="rp-rate-badge" style="background:${statusColor(p.status)}20;color:${statusColor(p.status)}">${statusLabel(p.status)}</span></td>
              <td>${methodLabel(p.method)}</td>
              <td>
                ${p.status !== 'paid' ? `<button class="sp-btn sp-btn-sm sp-btn-success pm-pay-btn" data-id="${p.id}">💳 Tahsil</button>` : '<span style="color:#4caf50">✓</span>'}
                <button class="sp-btn sp-btn-sm sp-btn-outline pm-remind-btn" data-id="${p.id}" title="Hatırlatma Gönder">📩</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ${filtered.length > 30 ? `<div style="text-align:center;color:var(--gray);font-size:0.85rem;margin-top:1rem;">ve ${filtered.length - 30} kayıt daha...</div>` : ''}`;

  bindEvents(container);
}

function bindEvents(c: HTMLElement): void {
  c.querySelector('#pmStatusFilter')?.addEventListener('change', e => { filterStatus = (e.target as HTMLSelectElement).value; render(); });
  c.querySelector('#pmMonthFilter')?.addEventListener('change', e => { filterMonth = (e.target as HTMLSelectElement).value; render(); });
  c.querySelector('#pmSearch')?.addEventListener('input', e => { searchQuery = (e.target as HTMLInputElement).value; render(); });
  c.querySelector('#pmNewInvoice')?.addEventListener('click', () => showToast('Yeni fatura oluşturma formu açılıyor...', 'info'));
  c.querySelector('#pmExport')?.addEventListener('click', () => showToast('Ödeme raporu hazırlanıyor...', 'info'));

  c.querySelectorAll<HTMLButtonElement>('.pm-pay-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = payments.find(x => x.id === btn.dataset.id);
      if (p) { p.status = 'paid'; p.paidDate = new Date().toISOString().split('T')[0]; p.method = 'credit_card'; showToast(`${p.invoiceNo} numaralı fatura tahsil edildi.`, 'success'); render(); }
    });
  });

  c.querySelectorAll<HTMLButtonElement>('.pm-remind-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = payments.find(x => x.id === btn.dataset.id);
      if (p) showToast(`${p.parentName} velisine ödeme hatırlatması gönderildi.`, 'info');
    });
  });
}

export function initPayments(): void {
  payments = generatePayments();
  render();
}
