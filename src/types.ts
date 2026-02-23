export interface Student {
  id: string;
  name: string;
  class: string;
  route: string;
  stopName: string;
  isOutsideRoute: boolean;
  parentPhone: string;
}

export interface RouteStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  estimatedTime: string;
}

export interface Route {
  id: string;
  name: string;
  stops: RouteStop[];
  driverName: string;
  vehiclePlate: string;
}

export interface Activity {
  id: string;
  type: 'route_complete' | 'attendance' | 'new_student' | 'driver_rating' | 'route_change' | 'alert' | 'maintenance';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
}

export interface AttendanceRecord {
  studentId: string;
  date: string;
  present: boolean;
  note?: string;
}

export interface DriverSurvey {
  driverId: string;
  driverName: string;
  ratings: {
    safety: number;
    punctuality: number;
    friendliness: number;
    driving: number;
    cleanliness: number;
  };
  comment: string;
  date: string;
}

export interface DemoRequest {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  studentCount: string;
  serviceType: string;
  message: string;
}

export type RoutePlannerStep = 'select-start' | 'select-end' | 'select-time' | 'confirm';

export interface VehiclePosition {
  lat: number;
  lng: number;
  speed: number;
  heading: number;
}

export interface VehicleStatus {
  id: string;
  plate: string;
  driverName: string;
  routeName: string;
  status: 'active' | 'idle' | 'maintenance' | 'returning';
  position: VehiclePosition;
  lastUpdate: Date;
  studentsOnBoard: number;
  capacity: number;
  nextStop: string;
  eta: string;
  fuelLevel: number;
}

export interface ParentNotification {
  id: string;
  type: 'arrival' | 'departure' | 'delay' | 'absence' | 'route_change' | 'emergency' | 'general';
  title: string;
  message: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface ReportSummary {
  totalStudents: number;
  activeRoutes: number;
  avgAttendance: number;
  totalTripsToday: number;
  onTimePercentage: number;
  activeVehicles: number;
  totalDrivers: number;
  avgDriverRating: number;
}

export interface WeeklyAttendanceData {
  day: string;
  present: number;
  absent: number;
  total: number;
}

export interface RoutePerformance {
  routeName: string;
  onTimeRate: number;
  avgDelay: number;
  studentCount: number;
  tripCount: number;
  satisfaction: number;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  amount: number;
  month: string;
  dueDate: string;
  paidDate: string | null;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  method: 'credit_card' | 'bank_transfer' | 'cash' | 'auto_debit' | null;
  invoiceNo: string;
}

export interface PaymentSummary {
  totalRevenue: number;
  collected: number;
  pending: number;
  overdue: number;
  collectionRate: number;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  sender: string;
  senderRole: 'admin' | 'driver' | 'parent';
  senderAvatar: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'announcement';
  participants: string[];
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  avatar: string;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  type: 'periodic' | 'repair' | 'tire' | 'brake' | 'oil' | 'inspection' | 'cleaning';
  description: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  completedDate: string | null;
  cost: number;
  vendor: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  nextDue: string | null;
  odometer: number;
}

export interface StudentFull {
  id: string;
  name: string;
  className: string;
  routeId: string;
  routeName: string;
  stopName: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  bloodType: string;
  allergies: string;
  emergencyContact: string;
  enrollmentDate: string;
  isActive: boolean;
  photoInitials: string;
  notes: string;
}
