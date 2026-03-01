import type { Student, Route, RouteStop, Activity, ChatChannel, ChatMessage, MaintenanceRecord, ParentNotification, Payment, StudentFull, VehicleStatus } from './types';

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

export function generateChannels(): ChatChannel[] {
  const now = Date.now();
  return [
    { id: 'ch1', name: 'Ahmet Çelik', type: 'direct', avatar: 'AÇ', participants: ['Admin', 'Ahmet Çelik'], lastMessage: 'Sabah seferi tamamlandı, 28 öğrenci taşındı.', lastMessageTime: new Date(now - 15 * 60000), unreadCount: 2 },
    { id: 'ch2', name: 'Şoförler Grubu', type: 'group', avatar: '🚌', participants: ['Admin', 'Ahmet Çelik', 'Mustafa Demir', 'Hasan Yıldız', 'Ali Kara', 'Ömer Aksoy'], lastMessage: 'Yarınki rota değişikliği hakkında bilgi verildi.', lastMessageTime: new Date(now - 2 * 3600000), unreadCount: 5 },
    { id: 'ch3', name: 'Veli Duyuruları', type: 'announcement', avatar: '📢', participants: ['Admin', 'Tüm Veliler'], lastMessage: 'Bayram tatili servis programı açıklandı.', lastMessageTime: new Date(now - 5 * 3600000), unreadCount: 0 },
    { id: 'ch4', name: 'Mehmet Kaya (Veli)', type: 'direct', avatar: 'MK', participants: ['Admin', 'Mehmet Kaya'], lastMessage: 'Yarın kızım servise binmeyecek, bilginize.', lastMessageTime: new Date(now - 8 * 3600000), unreadCount: 1 },
    { id: 'ch5', name: 'Teknik Ekip', type: 'group', avatar: '🔧', participants: ['Admin', 'Serkan Aydın', 'Burak Şen'], lastMessage: '06 GHI 789 periyodik bakıma alındı.', lastMessageTime: new Date(now - 24 * 3600000), unreadCount: 0 },
  ];
}

export function generateMessages(channelId: string): ChatMessage[] {
  const now = Date.now();
  const msgs: Record<string, ChatMessage[]> = {
    ch1: [
      { id: 'm1', channelId: 'ch1', sender: 'Ahmet Çelik', senderAvatar: 'AÇ', senderRole: 'driver', text: 'Günaydın, sabah seferine başlıyorum.', timestamp: new Date(now - 3 * 3600000), read: true },
      { id: 'm2', channelId: 'ch1', sender: 'Admin', senderAvatar: 'AD', senderRole: 'admin', text: 'Günaydın Ahmet bey, güvenli yolculuklar!', timestamp: new Date(now - 2.9 * 3600000), read: true },
      { id: 'm3', channelId: 'ch1', sender: 'Ahmet Çelik', senderAvatar: 'AÇ', senderRole: 'driver', text: 'Sabah seferi tamamlandı, 28 öğrenci taşındı.', timestamp: new Date(now - 15 * 60000), read: false },
    ],
    ch2: [
      { id: 'm4', channelId: 'ch2', sender: 'Admin', senderAvatar: 'AD', senderRole: 'admin', text: 'Yarınki rota değişikliği hakkında bilgi verildi.', timestamp: new Date(now - 2 * 3600000), read: true },
    ],
    ch4: [
      { id: 'm5', channelId: 'ch4', sender: 'Mehmet Kaya', senderAvatar: 'MK', senderRole: 'parent', text: 'Yarın kızım servise binmeyecek, bilginize.', timestamp: new Date(now - 8 * 3600000), read: false },
    ],
  };
  return msgs[channelId] ?? [
    { id: 'mdef', channelId, sender: 'Sistem', senderAvatar: '🔔', senderRole: 'staff', text: 'Bu sohbette henüz mesaj yok.', timestamp: new Date(now - 60000), read: true },
  ];
}

export const maintenanceTypeLabels: Record<string, string> = {
  periodic: 'Periyodik Bakım', repair: 'Tamir', tire: 'Lastik', brake: 'Fren',
  oil: 'Yağ Değişimi', inspection: 'Muayene', cleaning: 'Temizlik'
};

export function generateMaintenanceRecords(): MaintenanceRecord[] {
  return [
    { id: 'mt1', vehiclePlate: '06 ABC 123', type: 'periodic', status: 'completed', priority: 'medium', description: 'Periyodik 40.000 km bakımı yapıldı.', scheduledDate: daysAgo(10), completedDate: daysAgo(8), cost: 4500, vendor: 'Mercedes Yetkili Servis', odometer: 40200, nextDue: daysFromNow(180) },
    { id: 'mt2', vehiclePlate: '06 DEF 456', type: 'oil', status: 'scheduled', priority: 'low', description: 'Motor yağı ve filtre değişimi.', scheduledDate: daysFromNow(5), cost: 1800, vendor: 'Oto Bakım Merkezi', odometer: 55300 },
    { id: 'mt3', vehiclePlate: '06 GHI 789', type: 'brake', status: 'in_progress', priority: 'high', description: 'Ön fren balataları ve diskler değiştirilecek.', scheduledDate: daysAgo(1), cost: 3200, vendor: 'Fren Uzmanı', odometer: 62100 },
    { id: 'mt4', vehiclePlate: '06 JKL 012', type: 'tire', status: 'scheduled', priority: 'medium', description: '4 adet kış lastiği takılacak.', scheduledDate: daysFromNow(12), cost: 6800, vendor: 'Lastik Dünyası', odometer: 28400 },
    { id: 'mt5', vehiclePlate: '06 MNO 345', type: 'inspection', status: 'scheduled', priority: 'urgent', description: 'Araç muayenesi yapılacak (süre doluyor).', scheduledDate: daysFromNow(3), cost: 800, vendor: 'TÜVTÜRK', odometer: 71500 },
    { id: 'mt6', vehiclePlate: '06 PQR 678', type: 'repair', status: 'completed', priority: 'high', description: 'Klima kompresörü değiştirildi.', scheduledDate: daysAgo(20), completedDate: daysAgo(18), cost: 5500, vendor: 'Klima Servis', odometer: 48900, nextDue: daysFromNow(365) },
    { id: 'mt7', vehiclePlate: '06 ABC 123', type: 'cleaning', status: 'completed', priority: 'low', description: 'İç-dış detaylı temizlik yapıldı.', scheduledDate: daysAgo(3), completedDate: daysAgo(3), cost: 400, vendor: 'Araç Yıkama', odometer: 40500 },
  ];
}

export function generateNotifications(): ParentNotification[] {
  const now = Date.now();
  return [
    { id: 'n1', type: 'arrival', title: 'Servis Okula Ulaştı', message: 'Çocuğunuz okula güvenle ulaşmıştır.', studentName: 'Elif Yılmaz', parentName: 'Ayşe Yılmaz', parentPhone: '(530) 100-4000', timestamp: new Date(now - 30 * 60000), read: false, priority: 'low' },
    { id: 'n2', type: 'delay', title: 'Servis Gecikmesi', message: 'Trafik yoğunluğu nedeniyle servis yaklaşık 10 dk gecikmektedir.', studentName: 'Yusuf Kaya', parentName: 'Mehmet Kaya', parentPhone: '(531) 103-4007', timestamp: new Date(now - 60 * 60000), read: false, priority: 'high' },
    { id: 'n3', type: 'absence', title: 'Devamsızlık Bildirimi', message: 'Çocuğunuz bugün servis durağında bulunmamıştır.', studentName: 'Burak Şahin', parentName: 'Hasan Şahin', parentPhone: '(535) 115-4035', timestamp: new Date(now - 3 * 3600000), read: true, priority: 'medium' },
    { id: 'n4', type: 'departure', title: 'Servis Hareket Etti', message: 'Akşam servisi okuldan hareket etmiştir.', studentName: 'Zeynep Demir', parentName: 'Fatma Demir', parentPhone: '(532) 106-4014', timestamp: new Date(now - 5 * 3600000), read: true, priority: 'low' },
    { id: 'n5', type: 'emergency', title: 'Acil Durum Bildirimi', message: 'Araç arızası nedeniyle yedek servis gönderilmiştir.', studentName: 'Mehmet Çelik', parentName: 'Ali Çelik', parentPhone: '(533) 109-4021', timestamp: new Date(now - 8 * 3600000), read: true, priority: 'urgent' },
    { id: 'n6', type: 'general', title: 'Bayram Programı', message: 'Bayram tatili servis programı güncellendi.', studentName: '', parentName: 'Tüm Veliler', parentPhone: '', timestamp: new Date(now - 24 * 3600000), read: true, priority: 'low' },
  ];
}

export function generatePayments(): Payment[] {
  return [
    { id: 'p1', studentId: 'stu-1', studentName: 'Elif Yılmaz', parentName: 'Ayşe Yılmaz', month: '2025-03', amount: 3500, dueDate: daysFromNow(10), status: 'pending', invoiceNo: 'INV-2025-001' },
    { id: 'p2', studentId: 'stu-2', studentName: 'Yusuf Kaya', parentName: 'Mehmet Kaya', month: '2025-03', amount: 3500, dueDate: daysFromNow(10), status: 'paid', invoiceNo: 'INV-2025-002', method: 'credit_card', paidDate: daysAgo(5) },
    { id: 'p3', studentId: 'stu-3', studentName: 'Zeynep Demir', parentName: 'Fatma Demir', month: '2025-03', amount: 2500, dueDate: daysAgo(5), status: 'overdue', invoiceNo: 'INV-2025-003' },
    { id: 'p4', studentId: 'stu-4', studentName: 'Mehmet Çelik', parentName: 'Ali Çelik', month: '2025-03', amount: 5000, dueDate: daysFromNow(10), status: 'partial', invoiceNo: 'INV-2025-004', method: 'bank_transfer' },
    { id: 'p5', studentId: 'stu-5', studentName: 'Ayşe Arslan', parentName: 'Zeynep Arslan', month: '2025-03', amount: 3500, dueDate: daysFromNow(10), status: 'paid', invoiceNo: 'INV-2025-005', method: 'auto_debit', paidDate: daysAgo(2) },
    { id: 'p6', studentId: 'stu-6', studentName: 'Burak Şahin', parentName: 'Hasan Şahin', month: '2025-02', amount: 3500, dueDate: daysAgo(30), status: 'overdue', invoiceNo: 'INV-2025-006' },
    { id: 'p7', studentId: 'stu-7', studentName: 'Defne Doğan', parentName: 'Selin Doğan', month: '2025-03', amount: 2500, dueDate: daysFromNow(10), status: 'paid', invoiceNo: 'INV-2025-007', method: 'cash', paidDate: daysAgo(1) },
  ];
}

export function getPaymentSummary() {
  const payments = generatePayments();
  const collected = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const pending = payments.filter(p => p.status === 'pending' || p.status === 'partial').reduce((s, p) => s + p.amount, 0);
  const overdue = payments.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amount, 0);
  const totalRevenue = collected + pending + overdue;
  return { totalRevenue, collected, pending, overdue, collectionRate: totalRevenue > 0 ? Math.round((collected / totalRevenue) * 100) : 0 };
}

export function getReportSummary() {
  return { totalStudents: 30, activeRoutes: 5, avgAttendance: 96.2, totalTripsToday: 10, onTimePercentage: 94.5, activeVehicles: 7, totalDrivers: 5, avgDriverRating: 4.8 };
}

export function getWeeklyAttendance() {
  return [
    { day: 'Pazartesi', present: 28, absent: 2, total: 30 },
    { day: 'Salı', present: 29, absent: 1, total: 30 },
    { day: 'Çarşamba', present: 27, absent: 3, total: 30 },
    { day: 'Perşembe', present: 30, absent: 0, total: 30 },
    { day: 'Cuma', present: 26, absent: 4, total: 30 },
  ];
}

export function getRoutePerformances() {
  return routes.map(r => ({
    routeName: r.name, onTimeRate: 85 + Math.floor(Math.random() * 15),
    studentCount: 20 + Math.floor(Math.random() * 15), tripCount: 8 + Math.floor(Math.random() * 4),
    avgDelay: Math.floor(Math.random() * 8), satisfaction: +(4 + Math.random()).toFixed(1),
  }));
}

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];
const addresses = ['Şeyh Şamil Mah. No:12', 'Ahi Evran Mah. Cadde 5', 'Eryaman 1. Etap Blok C', 'Elvankent Mah. Sok 8', 'Batıkent Metro Yanı No:3'];

export function generateStudentsFull(): StudentFull[] {
  return students.map((s, i) => {
    const route = routes[i % routes.length];
    return {
      id: s.id, name: s.name, className: s.class, routeId: route.id, routeName: route.name,
      isActive: i !== 7, photoInitials: s.name.split(' ').map(n => n[0]).join(''),
      parentName: `${firstNames[(i + 5) % firstNames.length]} ${s.name.split(' ')[1]}`,
      parentPhone: s.parentPhone, parentEmail: `veli${i + 1}@email.com`,
      emergencyContact: `(555) ${200 + i}-${3000 + i}`, address: addresses[i % addresses.length],
      bloodType: bloodTypes[i % bloodTypes.length], allergies: i === 3 ? 'Fıstık alerjisi' : undefined,
      notes: i === 12 ? 'Güzergah dışı ikamet' : undefined,
      enrollmentDate: `2024-09-0${(i % 9) + 1}`, stopName: s.stopName,
    };
  });
}

export function generateVehicleStatuses(): VehicleStatus[] {
  const now = new Date();
  return [
    { id: 'vs1', plate: '06 ABC 123', status: 'active', driverName: 'Ahmet Çelik', routeName: 'Etimesgut - Merkez', nextStop: 'Şeyh Şamil Mah.', eta: '3 dk', studentsOnBoard: 22, capacity: 30, fuelLevel: 75, lastUpdate: new Date(now.getTime() - 60000), position: { lat: 39.95, lng: 32.68, speed: 35, heading: 90 } },
    { id: 'vs2', plate: '06 DEF 456', status: 'active', driverName: 'Mustafa Demir', routeName: 'Sincan - Batıkent', nextStop: 'Batıkent Metro', eta: '7 dk', studentsOnBoard: 18, capacity: 25, fuelLevel: 60, lastUpdate: new Date(now.getTime() - 120000), position: { lat: 39.97, lng: 32.72, speed: 40, heading: 180 } },
    { id: 'vs3', plate: '06 GHI 789', status: 'maintenance', driverName: 'Hasan Yıldız', routeName: 'Eryaman - Elvankent', nextStop: '-', eta: '-', studentsOnBoard: 0, capacity: 28, fuelLevel: 45, lastUpdate: new Date(now.getTime() - 3600000), position: { lat: 39.92, lng: 32.65, speed: 0, heading: 0 } },
    { id: 'vs4', plate: '06 JKL 012', status: 'returning', driverName: 'Ali Kara', routeName: 'Çayyolu - Ümitköy', nextStop: 'Garaj', eta: '12 dk', studentsOnBoard: 0, capacity: 30, fuelLevel: 50, lastUpdate: new Date(now.getTime() - 300000), position: { lat: 39.88, lng: 32.75, speed: 55, heading: 270 } },
    { id: 'vs5', plate: '06 MNO 345', status: 'idle', driverName: 'Ömer Aksoy', routeName: 'Bağlıca - Yapracık', nextStop: '-', eta: '-', studentsOnBoard: 0, capacity: 22, fuelLevel: 90, lastUpdate: new Date(now.getTime() - 7200000), position: { lat: 39.94, lng: 32.70, speed: 0, heading: 0 } },
  ];
}
