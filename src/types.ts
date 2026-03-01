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

export type InsuranceStatus = 'expired' | 'critical' | 'warning' | 'ok';

export interface ChatChannel {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'announcement';
  avatar: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  sender: string;
  senderAvatar: string;
  senderRole: 'admin' | 'driver' | 'parent' | 'staff';
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface MaintenanceRecord {
  id: string;
  vehiclePlate: string;
  type: 'periodic' | 'repair' | 'tire' | 'brake' | 'oil' | 'inspection' | 'cleaning';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  scheduledDate: string;
  completedDate?: string;
  cost: number;
  vendor: string;
  odometer: number;
  nextDue?: string;
}

export interface VehicleInsurance {
  vehicleId: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  driverName: string;
  kaskoStart: string;
  kaskoEnd: string;
  sigortaStart: string;
  sigortaEnd: string;
  kaskoCompany: string;
  sigortaCompany: string;
  kaskoPolicy: string;
  sigortaPolicy: string;
  notes: string;
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

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  month: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  invoiceNo: string;
  method?: 'credit_card' | 'bank_transfer' | 'cash' | 'auto_debit';
  paidDate?: string;
}

export interface StudentFull {
  id: string;
  name: string;
  className: string;
  routeId: string;
  routeName: string;
  isActive: boolean;
  photoInitials: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  emergencyContact: string;
  address: string;
  bloodType: string;
  allergies?: string;
  notes?: string;
  enrollmentDate: string;
  stopName: string;
}

export interface VehicleStatus {
  id: string;
  plate: string;
  status: 'active' | 'idle' | 'maintenance' | 'returning';
  driverName: string;
  routeName: string;
  nextStop: string;
  eta: string;
  studentsOnBoard: number;
  capacity: number;
  fuelLevel: number;
  lastUpdate: Date;
  position: { lat: number; lng: number; speed: number; heading: number };
}
