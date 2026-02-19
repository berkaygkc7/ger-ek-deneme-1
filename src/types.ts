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
