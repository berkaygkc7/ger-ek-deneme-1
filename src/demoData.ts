import type { Student, Route, RouteStop, Activity } from './types';

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

import type { VehicleInsurance } from './types';

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function daysAgo(days: number): string {
  return daysFromNow(-days);
}

export const vehicleInsuranceData: VehicleInsurance[] = [
  {
    vehicleId: 'v1', plate: '06 ABC 123', brand: 'Mercedes', model: 'Sprinter', year: 2021,
    driverName: 'Ahmet Çelik',
    kaskoStart: daysAgo(340), kaskoEnd: daysFromNow(25),
    sigortaStart: daysAgo(350), sigortaEnd: daysFromNow(15),
    kaskoCompany: 'Allianz Sigorta', sigortaCompany: 'Axa Sigorta',
    kaskoPolicy: 'KSK-2024-001', sigortaPolicy: 'ZMS-2024-001', notes: ''
  },
  {
    vehicleId: 'v2', plate: '06 DEF 456', brand: 'Ford', model: 'Transit', year: 2022,
    driverName: 'Mustafa Demir',
    kaskoStart: daysAgo(200), kaskoEnd: daysFromNow(165),
    sigortaStart: daysAgo(200), sigortaEnd: daysFromNow(165),
    kaskoCompany: 'Anadolu Sigorta', sigortaCompany: 'Anadolu Sigorta',
    kaskoPolicy: 'KSK-2024-002', sigortaPolicy: 'ZMS-2024-002', notes: ''
  },
  {
    vehicleId: 'v3', plate: '06 GHI 789', brand: 'Mercedes', model: 'Vito', year: 2020,
    driverName: 'Hasan Yıldız',
    kaskoStart: daysAgo(370), kaskoEnd: daysAgo(5),
    sigortaStart: daysAgo(360), sigortaEnd: daysFromNow(5),
    kaskoCompany: 'Mapfre Sigorta', sigortaCompany: 'Sompo Sigorta',
    kaskoPolicy: 'KSK-2024-003', sigortaPolicy: 'ZMS-2024-003', notes: 'Kasko yenilenmesi gerekiyor'
  },
  {
    vehicleId: 'v4', plate: '06 JKL 012', brand: 'Volkswagen', model: 'Crafter', year: 2023,
    driverName: 'Ali Kara',
    kaskoStart: daysAgo(100), kaskoEnd: daysFromNow(265),
    sigortaStart: daysAgo(100), sigortaEnd: daysFromNow(265),
    kaskoCompany: 'HDI Sigorta', sigortaCompany: 'HDI Sigorta',
    kaskoPolicy: 'KSK-2024-004', sigortaPolicy: 'ZMS-2024-004', notes: ''
  },
  {
    vehicleId: 'v5', plate: '06 MNO 345', brand: 'Iveco', model: 'Daily', year: 2021,
    driverName: 'Ömer Aksoy',
    kaskoStart: daysAgo(330), kaskoEnd: daysFromNow(35),
    sigortaStart: daysAgo(355), sigortaEnd: daysFromNow(10),
    kaskoCompany: 'Zurich Sigorta', sigortaCompany: 'Groupama Sigorta',
    kaskoPolicy: 'KSK-2024-005', sigortaPolicy: 'ZMS-2024-005', notes: 'Sigorta yenilenecek'
  },
  {
    vehicleId: 'v6', plate: '06 PQR 678', brand: 'Mercedes', model: 'Sprinter', year: 2022,
    driverName: 'Kemal Öztürk',
    kaskoStart: daysAgo(380), kaskoEnd: daysAgo(15),
    sigortaStart: daysAgo(380), sigortaEnd: daysAgo(15),
    kaskoCompany: 'Allianz Sigorta', sigortaCompany: 'Allianz Sigorta',
    kaskoPolicy: 'KSK-2024-006', sigortaPolicy: 'ZMS-2024-006', notes: 'Her iki poliçe de süresi dolmuş!'
  },
  {
    vehicleId: 'v7', plate: '06 STU 901', brand: 'Ford', model: 'Transit Custom', year: 2023,
    driverName: 'Serkan Aydın',
    kaskoStart: daysAgo(50), kaskoEnd: daysFromNow(315),
    sigortaStart: daysAgo(50), sigortaEnd: daysFromNow(315),
    kaskoCompany: 'Axa Sigorta', sigortaCompany: 'Axa Sigorta',
    kaskoPolicy: 'KSK-2024-007', sigortaPolicy: 'ZMS-2024-007', notes: ''
  },
  {
    vehicleId: 'v8', plate: '06 VWX 234', brand: 'Hyundai', model: 'H350', year: 2021,
    driverName: 'Burak Şen',
    kaskoStart: daysAgo(300), kaskoEnd: daysFromNow(65),
    sigortaStart: daysAgo(340), sigortaEnd: daysFromNow(25),
    kaskoCompany: 'Sompo Sigorta', sigortaCompany: 'Mapfre Sigorta',
    kaskoPolicy: 'KSK-2024-008', sigortaPolicy: 'ZMS-2024-008', notes: ''
  },
];

export const driverList = [
  { id: 'd1', name: 'Ahmet Çelik', plate: '06 ABC 123', route: 'Etimesgut - Merkez', avatar: 'AÇ' },
  { id: 'd2', name: 'Mustafa Demir', plate: '06 DEF 456', route: 'Sincan - Batıkent', avatar: 'MD' },
  { id: 'd3', name: 'Hasan Yıldız', plate: '06 GHI 789', route: 'Eryaman - Elvankent', avatar: 'HY' },
  { id: 'd4', name: 'Ali Kara', plate: '06 JKL 012', route: 'Çayyolu - Ümitköy', avatar: 'AK' },
  { id: 'd5', name: 'Ömer Aksoy', plate: '06 MNO 345', route: 'Bağlıca - Yapracık', avatar: 'ÖA' },
];
