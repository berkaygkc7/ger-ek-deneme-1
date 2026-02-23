import type { Student, Route, RouteStop, Activity, VehicleStatus, ParentNotification, ReportSummary, WeeklyAttendanceData, RoutePerformance } from './types';

const stopNames = [
  'Şeyh Şamil Mahallesi', 'Ahi Evran Mahallesi', 'Eryaman 1. Etap',
  'Eryaman 3. Etap', 'Elvankent Meydanı', 'Etimesgut Sanayi',
  'Sincan Otogar', 'Batıkent Metro', 'Mesa Koru', 'Ümitköy Migros',
  'Çayyolu Caddesi', 'Yaşamkent', 'İncek Kavşağı', 'Türkkonut',
  'Alacaatlı', 'Yapracık', 'Bağlıca', 'Temelli', 'Yenikent', 'Fatih Mahallesi'
];

function makeStops(count: number): RouteStop[] {
  const used = new Set<number>();
  const stops: RouteStop[] = [];
  for (let i = 0; i < count; i++) {
    let idx: number;
    do { idx = Math.floor(Math.random() * stopNames.length); } while (used.has(idx));
    used.add(idx);
    const hour = 7 + Math.floor(i * 0.6);
    const min = (i * 12) % 60;
    stops.push({
      id: `stop-${idx}`,
      name: stopNames[idx],
      lat: 39.9 + Math.random() * 0.1,
      lng: 32.7 + Math.random() * 0.2,
      estimatedTime: `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`
    });
  }
  return stops;
}

export const routes: Route[] = [
  { id: 'r1', name: 'Etimesgut - Merkez Güzergah', stops: makeStops(6), driverName: 'Ahmet Çelik', vehiclePlate: '06 ABC 123' },
  { id: 'r2', name: 'Sincan - Batıkent Güzergah', stops: makeStops(5), driverName: 'Mustafa Demir', vehiclePlate: '06 DEF 456' },
  { id: 'r3', name: 'Eryaman - Elvankent Güzergah', stops: makeStops(7), driverName: 'Hasan Yıldız', vehiclePlate: '06 GHI 789' },
  { id: 'r4', name: 'Çayyolu - Ümitköy Güzergah', stops: makeStops(5), driverName: 'Ali Kara', vehiclePlate: '06 JKL 012' },
  { id: 'r5', name: 'Bağlıca - Yapracık Güzergah', stops: makeStops(4), driverName: 'Ömer Aksoy', vehiclePlate: '06 MNO 345' },
];

const firstNames = ['Elif', 'Yusuf', 'Zeynep', 'Mehmet', 'Ayşe', 'Burak', 'Defne', 'Emre', 'Selin', 'Kaan',
  'Merve', 'Arda', 'Fatma', 'Can', 'Sude', 'Berk', 'İrem', 'Ege', 'Ecrin', 'Doruk'];
const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Aydın',
  'Özdemir', 'Korkmaz', 'Erdoğan', 'Güneş', 'Aktaş'];
const classes = ['1-A', '1-B', '2-A', '2-B', '3-A', '3-B', '4-A', '4-B', '5-A', '5-B'];

export const students: Student[] = Array.from({ length: 30 }, (_, i) => {
  const route = routes[i % routes.length];
  const isOutside = i === 5 || i === 12 || i === 23;
  return {
    id: `stu-${i + 1}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    class: classes[i % classes.length],
    route: route.name,
    stopName: route.stops[i % route.stops.length]?.name ?? stopNames[0],
    isOutsideRoute: isOutside,
    parentPhone: `(5${30 + i}) ${100 + i * 3}-${4000 + i * 7}`
  };
});

export function generateActivities(): Activity[] {
  const now = Date.now();
  const items: Activity[] = [
    { id: 'a1', type: 'route_complete', title: 'Sabah Seferi Tamamlandı', description: 'Etimesgut - Merkez güzergahı sabah seferi başarıyla tamamlandı. 28 öğrenci taşındı.', timestamp: new Date(now - 25 * 60000), icon: '✅' },
    { id: 'a2', type: 'attendance', title: 'Yoklama Alındı', description: '3-A sınıfı yoklaması tamamlandı. 24/26 öğrenci mevcut.', timestamp: new Date(now - 45 * 60000), icon: '📋' },
    { id: 'a3', type: 'driver_rating', title: 'Şoför Değerlendirmesi', description: 'Ahmet Çelik için yeni bir değerlendirme yapıldı. Ortalama puan: 4.8/5', timestamp: new Date(now - 2 * 3600000), icon: '⭐' },
    { id: 'a4', type: 'alert', title: 'Güzergah Dışı Uyarısı', description: 'Burak Şahin güzergah dışında ikamet etmektedir. Veli bilgilendirildi.', timestamp: new Date(now - 3 * 3600000), icon: '⚠️' },
    { id: 'a5', type: 'new_student', title: 'Yeni Öğrenci Kaydı', description: 'Ecrin Aktaş, Sincan - Batıkent güzergahına kayıt edildi.', timestamp: new Date(now - 5 * 3600000), icon: '🆕' },
    { id: 'a6', type: 'route_change', title: 'Rota Güncellendi', description: 'Eryaman - Elvankent güzergahına Yapracık durağı eklendi.', timestamp: new Date(now - 8 * 3600000), icon: '🔄' },
    { id: 'a7', type: 'maintenance', title: 'Araç Bakımı', description: '06 GHI 789 plakalı aracın periyodik bakımı tamamlandı.', timestamp: new Date(now - 12 * 3600000), icon: '🔧' },
    { id: 'a8', type: 'route_complete', title: 'Akşam Seferi Tamamlandı', description: 'Çayyolu - Ümitköy güzergahı akşam seferi sorunsuz tamamlandı.', timestamp: new Date(now - 24 * 3600000), icon: '✅' },
    { id: 'a9', type: 'attendance', title: 'Haftalık Yoklama Raporu', description: 'Bu haftanın genel yoklama oranı: %96.2 — Geçen haftaya göre %1.4 artış.', timestamp: new Date(now - 28 * 3600000), icon: '📊' },
    { id: 'a10', type: 'driver_rating', title: 'Aylık En İyi Şoför', description: 'Mustafa Demir, 4.9/5 ortalama puan ile ayın şoförü seçildi.', timestamp: new Date(now - 48 * 3600000), icon: '🏆' },
    { id: 'a11', type: 'alert', title: 'Trafik Uyarısı', description: 'Batıkent Metro kavşağında yoğunluk nedeniyle Sincan güzergahında 8 dk gecikme.', timestamp: new Date(now - 52 * 3600000), icon: '🚦' },
    { id: 'a12', type: 'new_student', title: 'Toplu Kayıt', description: 'Fatih İlkokulu ile anlaşma yapıldı. 15 yeni öğrenci sisteme eklendi.', timestamp: new Date(now - 72 * 3600000), icon: '🏫' },
  ];
  return items;
}

export const driverList = [
  { id: 'd1', name: 'Ahmet Çelik', plate: '06 ABC 123', route: 'Etimesgut - Merkez', avatar: 'AÇ' },
  { id: 'd2', name: 'Mustafa Demir', plate: '06 DEF 456', route: 'Sincan - Batıkent', avatar: 'MD' },
  { id: 'd3', name: 'Hasan Yıldız', plate: '06 GHI 789', route: 'Eryaman - Elvankent', avatar: 'HY' },
  { id: 'd4', name: 'Ali Kara', plate: '06 JKL 012', route: 'Çayyolu - Ümitköy', avatar: 'AK' },
  { id: 'd5', name: 'Ömer Aksoy', plate: '06 MNO 345', route: 'Bağlıca - Yapracık', avatar: 'ÖA' },
];

export function generateVehicleStatuses(): VehicleStatus[] {
  const now = new Date();
  const statuses: ('active' | 'idle' | 'maintenance' | 'returning')[] = ['active', 'active', 'active', 'idle', 'returning'];
  return routes.map((r, i) => ({
    id: `v-${i + 1}`,
    plate: r.vehiclePlate,
    driverName: r.driverName,
    routeName: r.name,
    status: statuses[i],
    position: {
      lat: 39.92 + Math.random() * 0.08,
      lng: 32.75 + Math.random() * 0.15,
      speed: statuses[i] === 'active' ? 25 + Math.floor(Math.random() * 35) : 0,
      heading: Math.floor(Math.random() * 360)
    },
    lastUpdate: new Date(now.getTime() - Math.floor(Math.random() * 300000)),
    studentsOnBoard: statuses[i] === 'active' ? 12 + Math.floor(Math.random() * 16) : 0,
    capacity: 28 + Math.floor(Math.random() * 8),
    nextStop: r.stops[Math.floor(Math.random() * r.stops.length)]?.name ?? 'Bilinmiyor',
    eta: statuses[i] === 'active' ? `${3 + Math.floor(Math.random() * 12)} dk` : '-',
    fuelLevel: 40 + Math.floor(Math.random() * 55)
  }));
}

export function generateNotifications(): ParentNotification[] {
  const now = Date.now();
  return [
    { id: 'n1', type: 'arrival', title: 'Servis Yaklaşıyor', message: 'Elif\'in servisi 3 dakika içinde durağa ulaşacaktır.', studentName: 'Elif Yılmaz', parentName: 'Ayşe Yılmaz', parentPhone: '(532) 100-4000', timestamp: new Date(now - 5 * 60000), read: false, priority: 'medium' },
    { id: 'n2', type: 'departure', title: 'Okula Vardı', message: 'Yusuf okula güvenle ulaşmıştır. İyi dersler!', studentName: 'Yusuf Kaya', parentName: 'Mehmet Kaya', parentPhone: '(533) 103-4007', timestamp: new Date(now - 25 * 60000), read: true, priority: 'low' },
    { id: 'n3', type: 'delay', title: 'Servis Gecikmesi', message: 'Trafik yoğunluğu nedeniyle Zeynep\'in servisi yaklaşık 10 dakika gecikecektir.', studentName: 'Zeynep Demir', parentName: 'Fatma Demir', parentPhone: '(534) 106-4014', timestamp: new Date(now - 45 * 60000), read: false, priority: 'high' },
    { id: 'n4', type: 'absence', title: 'Devamsızlık Bildirimi', message: 'Mehmet bugünkü yoklamada devamsız olarak işaretlenmiştir.', studentName: 'Mehmet Çelik', parentName: 'Ali Çelik', parentPhone: '(535) 109-4021', timestamp: new Date(now - 2 * 3600000), read: true, priority: 'medium' },
    { id: 'n5', type: 'route_change', title: 'Güzergah Değişikliği', message: 'Ayşe\'nin güzergahına Yapracık durağı eklenmiştir. Yeni tahmini varış: 07:45', studentName: 'Ayşe Şahin', parentName: 'Hasan Şahin', parentPhone: '(536) 112-4028', timestamp: new Date(now - 4 * 3600000), read: false, priority: 'medium' },
    { id: 'n6', type: 'emergency', title: 'Acil Durum Bildirimi', message: 'Burak\'ın servisinde küçük bir arıza tespit edildi. Yedek araç gönderildi, 15 dk gecikme bekleniyor.', studentName: 'Burak Arslan', parentName: 'Kemal Arslan', parentPhone: '(537) 115-4035', timestamp: new Date(now - 5 * 3600000), read: false, priority: 'urgent' },
    { id: 'n7', type: 'general', title: 'Haftalık Rapor', message: 'Defne bu hafta %100 devam oranı ile tüm seferlere katıldı. Tebrikler!', studentName: 'Defne Doğan', parentName: 'Sema Doğan', parentPhone: '(538) 118-4042', timestamp: new Date(now - 24 * 3600000), read: true, priority: 'low' },
    { id: 'n8', type: 'arrival', title: 'Eve Yaklaşıyor', message: 'Emre\'nin servisi durağa 5 dakika içinde varacaktır.', studentName: 'Emre Kılıç', parentName: 'Veli Kılıç', parentPhone: '(539) 121-4049', timestamp: new Date(now - 26 * 3600000), read: true, priority: 'medium' },
    { id: 'n9', type: 'delay', title: 'Sabah Seferi Gecikmesi', message: 'Selin\'in sabah seferi yol çalışması nedeniyle 7 dakika gecikecektir.', studentName: 'Selin Aslan', parentName: 'Deniz Aslan', parentPhone: '(540) 124-4056', timestamp: new Date(now - 30 * 3600000), read: true, priority: 'high' },
    { id: 'n10', type: 'general', title: 'Servis Ücreti Hatırlatma', message: 'Kaan\'ın Mart ayı servis ücreti son ödeme tarihi 5 Mart\'tır.', studentName: 'Kaan Aydın', parentName: 'Selim Aydın', parentPhone: '(541) 127-4063', timestamp: new Date(now - 48 * 3600000), read: false, priority: 'low' },
  ];
}

export function getReportSummary(): ReportSummary {
  return {
    totalStudents: 156,
    activeRoutes: 5,
    avgAttendance: 94.7,
    totalTripsToday: 10,
    onTimePercentage: 91.3,
    activeVehicles: 4,
    totalDrivers: 5,
    avgDriverRating: 4.6
  };
}

export function getWeeklyAttendance(): WeeklyAttendanceData[] {
  return [
    { day: 'Pazartesi', present: 142, absent: 14, total: 156 },
    { day: 'Salı', present: 148, absent: 8, total: 156 },
    { day: 'Çarşamba', present: 145, absent: 11, total: 156 },
    { day: 'Perşembe', present: 150, absent: 6, total: 156 },
    { day: 'Cuma', present: 138, absent: 18, total: 156 },
  ];
}

export function getRoutePerformances(): RoutePerformance[] {
  return [
    { routeName: 'Etimesgut - Merkez', onTimeRate: 94.2, avgDelay: 2.3, studentCount: 28, tripCount: 42, satisfaction: 4.8 },
    { routeName: 'Sincan - Batıkent', onTimeRate: 88.5, avgDelay: 4.1, studentCount: 32, tripCount: 40, satisfaction: 4.5 },
    { routeName: 'Eryaman - Elvankent', onTimeRate: 96.1, avgDelay: 1.2, studentCount: 35, tripCount: 44, satisfaction: 4.9 },
    { routeName: 'Çayyolu - Ümitköy', onTimeRate: 91.7, avgDelay: 3.0, studentCount: 30, tripCount: 38, satisfaction: 4.6 },
    { routeName: 'Bağlıca - Yapracık', onTimeRate: 93.4, avgDelay: 2.7, studentCount: 31, tripCount: 41, satisfaction: 4.7 },
  ];
}
