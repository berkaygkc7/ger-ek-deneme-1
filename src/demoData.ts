import type { Student, Route, RouteStop, Activity, VehicleStatus, ParentNotification, ReportSummary, WeeklyAttendanceData, RoutePerformance, Payment, PaymentSummary, ChatChannel, ChatMessage, MaintenanceRecord, StudentFull } from './types';

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

const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'];
const payStatuses: Payment['status'][] = ['paid', 'paid', 'paid', 'pending', 'overdue', 'paid', 'paid', 'partial', 'paid', 'pending'];
const payMethods: Payment['method'][] = ['credit_card', 'bank_transfer', 'cash', 'auto_debit', null, 'credit_card', 'bank_transfer', null, 'auto_debit', null];

export function generatePayments(): Payment[] {
  return students.slice(0, 20).flatMap((s, si) => {
    return months.map((m, mi) => {
      const status = payStatuses[(si + mi) % payStatuses.length];
      return {
        id: `pay-${si}-${mi}`,
        studentId: s.id,
        studentName: s.name,
        parentName: `${firstNames[(si + 5) % firstNames.length]} ${lastNames[si % lastNames.length]}`,
        amount: 2500 + (si % 3) * 500,
        month: `${m} 2026`,
        dueDate: `2026-${String(mi + 1).padStart(2, '0')}-05`,
        paidDate: status === 'paid' ? `2026-${String(mi + 1).padStart(2, '0')}-0${2 + (si % 3)}` : status === 'partial' ? `2026-${String(mi + 1).padStart(2, '0')}-08` : null,
        status,
        method: status === 'paid' || status === 'partial' ? payMethods[si % payMethods.length] : null,
        invoiceNo: `SRV-2026-${String(si * 5 + mi + 1).padStart(4, '0')}`
      };
    });
  });
}

export function getPaymentSummary(): PaymentSummary {
  return { totalRevenue: 390000, collected: 312000, pending: 52000, overdue: 26000, collectionRate: 80 };
}

export function generateChannels(): ChatChannel[] {
  const now = Date.now();
  return [
    { id: 'ch1', name: 'Ahmet Çelik (Şoför)', type: 'direct', participants: ['admin', 'Ahmet Çelik'], lastMessage: 'Sabah seferi sorunsuz tamamlandı.', lastMessageTime: new Date(now - 10 * 60000), unreadCount: 0, avatar: 'AÇ' },
    { id: 'ch2', name: 'Ayşe Yılmaz (Veli)', type: 'direct', participants: ['admin', 'Ayşe Yılmaz'], lastMessage: 'Elif yarın servise binmeyecek, bilginize.', lastMessageTime: new Date(now - 35 * 60000), unreadCount: 2, avatar: 'AY' },
    { id: 'ch3', name: 'Tüm Şoförler', type: 'group', participants: ['admin', 'Ahmet Çelik', 'Mustafa Demir', 'Hasan Yıldız', 'Ali Kara', 'Ömer Aksoy'], lastMessage: 'Yarınki yoğun trafik için alternatif rotalar paylaşıldı.', lastMessageTime: new Date(now - 2 * 3600000), unreadCount: 0, avatar: '🚌' },
    { id: 'ch4', name: 'Duyurular', type: 'announcement', participants: ['admin', 'all'], lastMessage: 'Mart ayı servis ücretleri 5 Mart son ödeme tarihlidir.', lastMessageTime: new Date(now - 6 * 3600000), unreadCount: 0, avatar: '📢' },
    { id: 'ch5', name: 'Mehmet Kaya (Veli)', type: 'direct', participants: ['admin', 'Mehmet Kaya'], lastMessage: 'Yusuf\'un adresini güncellememiz gerekiyor.', lastMessageTime: new Date(now - 8 * 3600000), unreadCount: 1, avatar: 'MK' },
    { id: 'ch6', name: 'Mustafa Demir (Şoför)', type: 'direct', participants: ['admin', 'Mustafa Demir'], lastMessage: 'Aracın sağ aynası çizildi, bilginize.', lastMessageTime: new Date(now - 12 * 3600000), unreadCount: 0, avatar: 'MD' },
    { id: 'ch7', name: 'Etimesgut Velileri', type: 'group', participants: ['admin', 'Ayşe Yılmaz', 'Ali Çelik', 'Hasan Şahin'], lastMessage: 'Pazartesi servis saatleri güncellendi.', lastMessageTime: new Date(now - 24 * 3600000), unreadCount: 3, avatar: '👨‍👩‍👧' },
  ];
}

export function generateMessages(channelId: string): ChatMessage[] {
  const now = Date.now();
  const allMessages: Record<string, ChatMessage[]> = {
    ch1: [
      { id: 'm1', channelId: 'ch1', sender: 'Ahmet Çelik', senderRole: 'driver', senderAvatar: 'AÇ', text: 'Günaydın, sabah seferine başlıyorum.', timestamp: new Date(now - 3 * 3600000), read: true },
      { id: 'm2', channelId: 'ch1', sender: 'Yönetici', senderRole: 'admin', senderAvatar: 'YN', text: 'Günaydın Ahmet bey, dikkatli olun. Eryaman kavşağında çalışma var.', timestamp: new Date(now - 2.5 * 3600000), read: true },
      { id: 'm3', channelId: 'ch1', sender: 'Ahmet Çelik', senderRole: 'driver', senderAvatar: 'AÇ', text: 'Teşekkürler, alternatif rotadan gideceğim.', timestamp: new Date(now - 2 * 3600000), read: true },
      { id: 'm4', channelId: 'ch1', sender: 'Ahmet Çelik', senderRole: 'driver', senderAvatar: 'AÇ', text: 'Sabah seferi sorunsuz tamamlandı.', timestamp: new Date(now - 10 * 60000), read: true },
    ],
    ch2: [
      { id: 'm5', channelId: 'ch2', sender: 'Ayşe Yılmaz', senderRole: 'parent', senderAvatar: 'AY', text: 'Merhaba, Elif yarın doktor randevusu nedeniyle servise binmeyecek.', timestamp: new Date(now - 40 * 60000), read: true },
      { id: 'm6', channelId: 'ch2', sender: 'Yönetici', senderRole: 'admin', senderAvatar: 'YN', text: 'Anlaşıldı, şoförü bilgilendireceğim. Geçmiş olsun.', timestamp: new Date(now - 38 * 60000), read: true },
      { id: 'm7', channelId: 'ch2', sender: 'Ayşe Yılmaz', senderRole: 'parent', senderAvatar: 'AY', text: 'Elif yarın servise binmeyecek, bilginize.', timestamp: new Date(now - 35 * 60000), read: false },
      { id: 'm8', channelId: 'ch2', sender: 'Ayşe Yılmaz', senderRole: 'parent', senderAvatar: 'AY', text: 'Bir de Mart ayı ücretini hangi hesaba yatıracağız?', timestamp: new Date(now - 34 * 60000), read: false },
    ],
    ch5: [
      { id: 'm9', channelId: 'ch5', sender: 'Mehmet Kaya', senderRole: 'parent', senderAvatar: 'MK', text: 'Merhaba, Yusuf\'un adresini güncelledik. Yeni adres: Batıkent 3. Cadde No:42', timestamp: new Date(now - 8 * 3600000), read: false },
    ],
  };
  return allMessages[channelId] ?? [
    { id: `mg-${channelId}`, channelId, sender: 'Sistem', senderRole: 'admin', senderAvatar: '🤖', text: 'Bu kanalda henüz mesaj bulunmuyor.', timestamp: new Date(now - 24 * 3600000), read: true }
  ];
}

const maintenanceTypes: MaintenanceRecord['type'][] = ['periodic', 'repair', 'tire', 'brake', 'oil', 'inspection', 'cleaning'];
const typeLabelsMap: Record<string, string> = { periodic: 'Periyodik Bakım', repair: 'Onarım', tire: 'Lastik', brake: 'Fren', oil: 'Yağ Değişimi', inspection: 'Muayene', cleaning: 'Temizlik' };
const vendors = ['Ankara Oto Servis', 'Güvenli Fren Ltd.', 'MasterTire', 'FleetCare Pro', 'Hızlı Bakım'];

export function generateMaintenanceRecords(): MaintenanceRecord[] {
  const plates = routes.map(r => r.vehiclePlate);
  return [
    { id: 'mt1', vehicleId: 'v-1', vehiclePlate: plates[0], type: 'periodic', description: '50.000 km periyodik bakım - filtre, yağ, kayış kontrolü', status: 'completed', scheduledDate: '2026-02-10', completedDate: '2026-02-10', cost: 4500, vendor: vendors[0], priority: 'medium', nextDue: '2026-05-10', odometer: 50120 },
    { id: 'mt2', vehicleId: 'v-2', vehiclePlate: plates[1], type: 'tire', description: '4 adet kış lastiği değişimi', status: 'completed', scheduledDate: '2026-01-15', completedDate: '2026-01-15', cost: 8200, vendor: vendors[2], priority: 'high', nextDue: '2026-11-01', odometer: 42300 },
    { id: 'mt3', vehicleId: 'v-3', vehiclePlate: plates[2], type: 'brake', description: 'Ön fren balataları ve diskler değişimi', status: 'in_progress', scheduledDate: '2026-02-23', completedDate: null, cost: 3200, vendor: vendors[1], priority: 'urgent', nextDue: null, odometer: 67800 },
    { id: 'mt4', vehicleId: 'v-4', vehiclePlate: plates[3], type: 'inspection', description: 'Yıllık araç muayenesi', status: 'scheduled', scheduledDate: '2026-03-05', completedDate: null, cost: 1200, vendor: vendors[3], priority: 'high', nextDue: null, odometer: 38500 },
    { id: 'mt5', vehicleId: 'v-5', vehiclePlate: plates[4], type: 'oil', description: 'Motor yağı ve filtre değişimi', status: 'completed', scheduledDate: '2026-02-01', completedDate: '2026-02-01', cost: 1800, vendor: vendors[0], priority: 'medium', nextDue: '2026-05-01', odometer: 55200 },
    { id: 'mt6', vehicleId: 'v-1', vehiclePlate: plates[0], type: 'cleaning', description: 'İç-dış detaylı temizlik ve dezenfeksiyon', status: 'completed', scheduledDate: '2026-02-17', completedDate: '2026-02-17', cost: 650, vendor: vendors[4], priority: 'low', nextDue: '2026-03-03', odometer: 50280 },
    { id: 'mt7', vehicleId: 'v-2', vehiclePlate: plates[1], type: 'repair', description: 'Sağ yan ayna değişimi - hasar onarımı', status: 'scheduled', scheduledDate: '2026-02-25', completedDate: null, cost: 950, vendor: vendors[0], priority: 'medium', nextDue: null, odometer: 42580 },
    { id: 'mt8', vehicleId: 'v-3', vehiclePlate: plates[2], type: 'periodic', description: '60.000 km kapsamlı bakım', status: 'scheduled', scheduledDate: '2026-03-15', completedDate: null, cost: 6200, vendor: vendors[3], priority: 'medium', nextDue: null, odometer: 67800 },
    { id: 'mt9', vehicleId: 'v-4', vehiclePlate: plates[3], type: 'cleaning', description: 'Haftalık iç temizlik', status: 'completed', scheduledDate: '2026-02-20', completedDate: '2026-02-20', cost: 350, vendor: vendors[4], priority: 'low', nextDue: '2026-02-27', odometer: 38600 },
    { id: 'mt10', vehicleId: 'v-5', vehiclePlate: plates[4], type: 'repair', description: 'Klima kompresör tamiri', status: 'completed', scheduledDate: '2026-01-28', completedDate: '2026-01-30', cost: 5400, vendor: vendors[0], priority: 'high', nextDue: null, odometer: 54800 },
  ];
}

export { typeLabelsMap as maintenanceTypeLabels };

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];
const addresses = ['Şeyh Şamil Mah. 5. Cad. No:12', 'Ahi Evran Mah. Bulvar Sk. No:8/3', 'Eryaman 1. Etap 4. Cad. No:22', 'Elvankent Mah. Yıldız Sk. No:15', 'Batıkent 3. Cad. No:42/A', 'Mesa Koru Sitesi B Blok D:8', 'Ümitköy Mah. 2. Cad. No:31', 'Çayyolu 8. Cad. No:19/2', 'Yaşamkent Mah. Park Sk. No:7', 'İncek Lale Sitesi No:3'];
const allergies = ['', '', 'Fıstık alerjisi', '', '', 'Laktoz intoleransı', '', 'Arı sokması alerjisi', '', '', '', 'Gluten hassasiyeti', '', '', ''];

export function generateStudentsFull(): StudentFull[] {
  return students.map((s, i) => {
    const route = routes[i % routes.length];
    return {
      id: s.id,
      name: s.name,
      className: s.class,
      routeId: route.id,
      routeName: route.name,
      stopName: s.stopName,
      parentName: `${firstNames[(i + 5) % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      parentPhone: s.parentPhone,
      parentEmail: `${s.name.split(' ')[0].toLowerCase().replace(/[İıÖöÜüŞşÇçĞğ]/g, c => ({İ:'i',ı:'i',Ö:'o',ö:'o',Ü:'u',ü:'u',Ş:'s',ş:'s',Ç:'c',ç:'c',Ğ:'g',ğ:'g'}[c] ?? c))}@email.com`,
      address: addresses[i % addresses.length],
      bloodType: bloodTypes[i % bloodTypes.length],
      allergies: allergies[i % allergies.length],
      emergencyContact: `(5${50 + i}) ${200 + i}-${5000 + i * 3}`,
      enrollmentDate: `2025-09-${String(1 + (i % 15)).padStart(2, '0')}`,
      isActive: i !== 7 && i !== 19,
      photoInitials: s.name.split(' ').map(n => n[0]).join(''),
      notes: i === 3 ? 'Öğleden sonra servise binmiyor' : i === 11 ? 'Cuma günleri yarım gün' : ''
    };
  });
}
