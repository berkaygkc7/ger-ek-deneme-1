import type { AttendanceRecord } from './types';
import { students } from './demoData';
import { $, showToast, formatFullDate } from './utils';

const records: Map<string, boolean> = new Map();
let selectedClass = 'all';
let searchQuery = '';

function getFilteredStudents() {
  return students.filter(s => {
    const matchClass = selectedClass === 'all' || s.class === selectedClass;
    const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClass && matchSearch;
  });
}

function getClasses(): string[] {
  return [...new Set(students.map(s => s.class))].sort();
}

function getStats() {
  const filtered = getFilteredStudents();
  const present = filtered.filter(s => records.get(s.id) === true).length;
  const absent = filtered.filter(s => records.get(s.id) === false).length;
  const unmarked = filtered.length - present - absent;
  return { total: filtered.length, present, absent, unmarked };
}

function render(): void {
  const container = $('#attendanceContent');
  if (!container) return;

  const classes = getClasses();
  const stats = getStats();
  const filtered = getFilteredStudents();
  const today = formatFullDate(new Date());
  const pct = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;

  container.innerHTML = `
    <div class="sp-attendance-header">
      <div class="sp-attendance-date">📅 ${today}</div>
      <div class="sp-attendance-stats-bar">
        <div class="sp-att-stat sp-att-present"><span>${stats.present}</span> Mevcut</div>
        <div class="sp-att-stat sp-att-absent"><span>${stats.absent}</span> Yok</div>
        <div class="sp-att-stat sp-att-unmarked"><span>${stats.unmarked}</span> Bekliyor</div>
        <div class="sp-att-stat sp-att-pct"><span>%${pct}</span> Katılım</div>
      </div>
    </div>

    <div class="sp-attendance-toolbar">
      <div class="sp-att-filters">
        <select class="sp-select sp-select-sm" id="attClassFilter">
          <option value="all">Tüm Sınıflar</option>
          ${classes.map(c => `<option value="${c}" ${c === selectedClass ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
        <input type="text" class="sp-input sp-input-sm" id="attSearch" placeholder="Öğrenci ara..." value="${searchQuery}">
      </div>
      <div class="sp-att-bulk">
        <button class="sp-btn sp-btn-sm sp-btn-success" id="attMarkAllPresent">Tümü Mevcut</button>
        <button class="sp-btn sp-btn-sm sp-btn-danger" id="attMarkAllAbsent">Tümü Yok</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="attReset">Sıfırla</button>
      </div>
    </div>

    <div class="sp-attendance-list">
      ${filtered.length === 0 ? '<div class="sp-empty-state">Öğrenci bulunamadı.</div>' : ''}
      ${filtered.map(s => {
        const status = records.get(s.id);
        const isPresent = status === true;
        const isAbsent = status === false;
        return `
          <div class="sp-att-row ${isPresent ? 'present' : ''} ${isAbsent ? 'absent' : ''} ${s.isOutsideRoute ? 'outside-route' : ''}">
            <div class="sp-att-student">
              <div class="sp-att-avatar">${s.name.split(' ').map(n => n[0]).join('')}</div>
              <div class="sp-att-info">
                <strong>${s.name}</strong>
                <small>${s.class} · ${s.stopName}</small>
                ${s.isOutsideRoute ? '<span class="sp-att-warning">⚠️ Güzergah dışı</span>' : ''}
              </div>
            </div>
            <div class="sp-att-actions">
              <button class="sp-att-btn present ${isPresent ? 'active' : ''}" data-id="${s.id}" data-action="present" title="Mevcut">✓</button>
              <button class="sp-att-btn absent ${isAbsent ? 'active' : ''}" data-id="${s.id}" data-action="absent" title="Yok">✕</button>
            </div>
          </div>`;
      }).join('')}
    </div>

    <div class="sp-attendance-footer">
      <button class="sp-btn sp-btn-primary sp-btn-lg" id="attSave">📋 Yoklamayı Kaydet</button>
    </div>`;

  bindAttendanceEvents(container);
}

function bindAttendanceEvents(container: HTMLElement): void {
  container.querySelector('#attClassFilter')?.addEventListener('change', (e) => {
    selectedClass = (e.target as HTMLSelectElement).value;
    render();
  });

  container.querySelector('#attSearch')?.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    render();
  });

  container.querySelectorAll<HTMLButtonElement>('.sp-att-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id!;
      const action = btn.dataset.action as 'present' | 'absent';
      const current = records.get(id);

      if ((action === 'present' && current === true) || (action === 'absent' && current === false)) {
        records.delete(id);
      } else {
        records.set(id, action === 'present');
        const student = students.find(s => s.id === id);
        if (student?.isOutsideRoute && action === 'present') {
          showToast(`⚠️ ${student.name} güzergah dışında ikamet etmektedir. Veli ile iletişime geçilmesi önerilir.`, 'warning');
        }
      }
      render();
    });
  });

  container.querySelector('#attMarkAllPresent')?.addEventListener('click', () => {
    getFilteredStudents().forEach(s => records.set(s.id, true));
    const outsiders = getFilteredStudents().filter(s => s.isOutsideRoute);
    if (outsiders.length > 0) {
      showToast(`⚠️ ${outsiders.length} öğrenci güzergah dışında ikamet ediyor. Listede işaretlendi.`, 'warning');
    }
    render();
  });

  container.querySelector('#attMarkAllAbsent')?.addEventListener('click', () => {
    getFilteredStudents().forEach(s => records.set(s.id, false));
    render();
  });

  container.querySelector('#attReset')?.addEventListener('click', () => {
    getFilteredStudents().forEach(s => records.delete(s.id));
    render();
  });

  container.querySelector('#attSave')?.addEventListener('click', () => {
    const stats = getStats();
    if (stats.unmarked > 0) {
      showToast(`${stats.unmarked} öğrencinin yoklaması henüz işaretlenmedi.`, 'warning');
      return;
    }
    const saved: AttendanceRecord[] = getFilteredStudents().map(s => ({
      studentId: s.id,
      date: new Date().toISOString().split('T')[0],
      present: records.get(s.id) ?? false,
    }));
    console.log('Yoklama kaydedildi:', saved);
    showToast(`Yoklama başarıyla kaydedildi! ${stats.present} mevcut, ${stats.absent} devamsız.`, 'success');
  });
}

export function initAttendance(): void {
  render();
}
