
export interface School {
  id: string;
  name: string;
  country: string;
  status: 'active' | 'inactive' | 'pending';
  registrationDate: string;
  logo?: string;
  contactEmail: string;
  contactPhone: string;
  adminName: string;
  teachersCount: number;
  studentsCount: number;
  subscriptionId: string;
}

export interface Subscription {
  id: string;
  schoolId: string;
  plan: 'basic' | 'premium' | 'enterprise';
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  price: number;
  currency: string;
  paymentMethod: string;
  autoRenew: boolean;
}

export interface Activity {
  id: string;
  schoolId: string;
  date: string;
  gamesCreated: number;
  gamesPlayed: number;
  activeUsers: number;
  type: 'login' | 'game' | 'user';
}

// Sample schools data
export const schools: School[] = [
  {
    id: '1',
    name: 'Lycée Central de Dakar',
    country: 'Senegal',
    status: 'active',
    registrationDate: '2023-01-15',
    logo: 'https://placekitten.com/100/100',
    contactEmail: 'contact@lyceecentral.edu.sn',
    contactPhone: '+221 33 123 4567',
    adminName: 'Amadou Diop',
    teachersCount: 24,
    studentsCount: 450,
    subscriptionId: '1'
  },
  {
    id: '2',
    name: 'École Internationale d\'Abidjan',
    country: 'Côte d\'Ivoire',
    status: 'active',
    registrationDate: '2023-02-20',
    logo: 'https://placekitten.com/101/101',
    contactEmail: 'admin@ecoleintl.edu.ci',
    contactPhone: '+225 27 2022 1133',
    adminName: 'Marie Kouassi',
    teachersCount: 35,
    studentsCount: 620,
    subscriptionId: '2'
  },
  {
    id: '3',
    name: 'Collège Moderne de Nairobi',
    country: 'Kenya',
    status: 'pending',
    registrationDate: '2023-04-05',
    contactEmail: 'info@modernnairobi.edu.ke',
    contactPhone: '+254 20 2345678',
    adminName: 'James Kimani',
    teachersCount: 18,
    studentsCount: 320,
    subscriptionId: '3'
  },
  {
    id: '4',
    name: 'Académie des Sciences de Tunis',
    country: 'Tunisia',
    status: 'inactive',
    registrationDate: '2022-11-10',
    logo: 'https://placekitten.com/102/102',
    contactEmail: 'contact@academie-tunis.edu.tn',
    contactPhone: '+216 71 123 456',
    adminName: 'Leila Ben Ali',
    teachersCount: 42,
    studentsCount: 780,
    subscriptionId: '4'
  },
  {
    id: '5',
    name: 'Institut Supérieur de Lagos',
    country: 'Nigeria',
    status: 'active',
    registrationDate: '2023-03-12',
    logo: 'https://placekitten.com/103/103',
    contactEmail: 'info@lagosins.edu.ng',
    contactPhone: '+234 1 234 5678',
    adminName: 'Oluwaseun Adeyemi',
    teachersCount: 56,
    studentsCount: 1200,
    subscriptionId: '5'
  }
];

// Sample subscriptions data
export const subscriptions: Subscription[] = [
  {
    id: '1',
    schoolId: '1',
    plan: 'premium',
    startDate: '2023-01-15',
    endDate: '2024-01-15',
    status: 'active',
    price: 1200,
    currency: 'XOF',
    paymentMethod: 'Mobile Money',
    autoRenew: true
  },
  {
    id: '2',
    schoolId: '2',
    plan: 'enterprise',
    startDate: '2023-02-20',
    endDate: '2024-02-20',
    status: 'active',
    price: 2500,
    currency: 'XOF',
    paymentMethod: 'Bank Transfer',
    autoRenew: true
  },
  {
    id: '3',
    schoolId: '3',
    plan: 'basic',
    startDate: '2023-04-05',
    endDate: '2023-10-05',
    status: 'pending',
    price: 600,
    currency: 'KES',
    paymentMethod: 'Credit Card',
    autoRenew: false
  },
  {
    id: '4',
    schoolId: '4',
    plan: 'premium',
    startDate: '2022-11-10',
    endDate: '2023-05-10',
    status: 'expired',
    price: 1500,
    currency: 'TND',
    paymentMethod: 'Bank Transfer',
    autoRenew: false
  },
  {
    id: '5',
    schoolId: '5',
    plan: 'enterprise',
    startDate: '2023-03-12',
    endDate: '2024-03-12',
    status: 'active',
    price: 3000,
    currency: 'NGN',
    paymentMethod: 'Mobile Money',
    autoRenew: true
  }
];

// Sample activities data
export const activities: Activity[] = [
  { id: '1', schoolId: '1', date: '2023-05-10', gamesCreated: 5, gamesPlayed: 12, activeUsers: 120, type: 'game' },
  { id: '2', schoolId: '1', date: '2023-05-11', gamesCreated: 3, gamesPlayed: 15, activeUsers: 135, type: 'game' },
  { id: '3', schoolId: '2', date: '2023-05-10', gamesCreated: 8, gamesPlayed: 20, activeUsers: 200, type: 'game' },
  { id: '4', schoolId: '2', date: '2023-05-11', gamesCreated: 4, gamesPlayed: 18, activeUsers: 185, type: 'game' },
  { id: '5', schoolId: '3', date: '2023-05-10', gamesCreated: 2, gamesPlayed: 5, activeUsers: 80, type: 'game' },
  { id: '6', schoolId: '5', date: '2023-05-11', gamesCreated: 12, gamesPlayed: 30, activeUsers: 350, type: 'game' },
  { id: '7', schoolId: '1', date: '2023-05-12', gamesCreated: 6, gamesPlayed: 14, activeUsers: 140, type: 'game' },
  { id: '8', schoolId: '2', date: '2023-05-12', gamesCreated: 7, gamesPlayed: 22, activeUsers: 210, type: 'game' },
  { id: '9', schoolId: '5', date: '2023-05-12', gamesCreated: 10, gamesPlayed: 28, activeUsers: 330, type: 'game' },
  { id: '10', schoolId: '5', date: '2023-05-13', gamesCreated: 9, gamesPlayed: 25, activeUsers: 300, type: 'game' },
];

// Aggregate statistics
export const getTotalSchools = () => schools.length;
export const getTotalActiveSchools = () => schools.filter(school => school.status === 'active').length;
export const getTotalStudents = () => schools.reduce((sum, school) => sum + school.studentsCount, 0);
export const getTotalTeachers = () => schools.reduce((sum, school) => sum + school.teachersCount, 0);
export const getTotalGamesPlayed = () => activities.reduce((sum, activity) => sum + activity.gamesPlayed, 0);
export const getExpiringSubscriptions = () => {
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  return subscriptions.filter(subscription => {
    const endDate = new Date(subscription.endDate);
    return endDate > today && endDate < thirtyDaysFromNow && subscription.status === 'active';
  });
};

export const getRecentActivities = () => {
  // Sort by date (descending) and return the 5 most recent activities
  return [...activities].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);
};

// Activity data for charts
export const getActivityChartData = () => {
  // Get the last 7 dates
  const dates = Array.from(new Set(activities.map(a => a.date))).sort().slice(-7);
  
  return dates.map(date => {
    const dayActivities = activities.filter(a => a.date === date);
    return {
      date,
      gamesCreated: dayActivities.reduce((sum, a) => sum + a.gamesCreated, 0),
      gamesPlayed: dayActivities.reduce((sum, a) => sum + a.gamesPlayed, 0),
      activeUsers: dayActivities.reduce((sum, a) => sum + a.activeUsers, 0),
    };
  });
};

// Status counts for pie charts
export const getSchoolStatusCounts = () => {
  const counts = { active: 0, inactive: 0, pending: 0 };
  schools.forEach(school => {
    counts[school.status]++;
  });
  return counts;
};

export const getSubscriptionPlanCounts = () => {
  const counts = { basic: 0, premium: 0, enterprise: 0 };
  subscriptions.forEach(subscription => {
    counts[subscription.plan]++;
  });
  return counts;
};
