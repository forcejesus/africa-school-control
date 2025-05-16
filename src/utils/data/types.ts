
// Common data types used across the application

export interface School {
  id: string;
  name: string;
  logo?: string;
  country: string;
  status: string;
  registrationDate: string;
  contactEmail: string;
  contactPhone: string;
  adminName: string;
  teachersCount: number;
  studentsCount: number;
}

export interface Subscription {
  id: string;
  schoolId: string;
  schoolName: string;
  plan: string;
  status: string;
  startDate: string;
  expiryDate: string;
  price: number;
  autoRenew: boolean;
  currency?: string;
  endDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  createdAt: string;
  lastLogin: string;
}

export interface Activity {
  id: string;
  schoolId: string;
  date: string;
  gamesPlayed: number;
  activeUsers: number;
  gamesCreated: number;
}

export interface ActivityDataPoint {
  date: string;
  gamesCreated: number;
  gamesPlayed: number;
  activeUsers: number;
}
