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
  // Adding these to fix the SubscriptionCard component errors
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

export const schools: School[] = [
  {
    id: "sch001",
    name: "Lycée Français de Dakar",
    logo: "/placeholder.svg",
    country: "Sénégal",
    status: "active",
    registrationDate: "2023-01-15",
    contactEmail: "contact@lyceefrdakar.edu",
    contactPhone: "+221 33 123 4567",
    adminName: "Sophie Martin",
    teachersCount: 45,
    studentsCount: 650
  },
  {
    id: "sch002",
    name: "École Internationale d'Abidjan",
    logo: "/placeholder.svg",
    country: "Côte d'Ivoire",
    status: "active",
    registrationDate: "2023-02-10",
    contactEmail: "info@ecoleintabidjan.edu",
    contactPhone: "+225 27 22 123456",
    adminName: "Pascal Kouassi",
    teachersCount: 38,
    studentsCount: 520
  },
  {
    id: "sch003",
    name: "Collège Saint-Exupéry",
    logo: "/placeholder.svg",
    country: "Maroc",
    status: "pending",
    registrationDate: "2023-03-05",
    contactEmail: "admin@collegesaintex.edu",
    contactPhone: "+212 522 123456",
    adminName: "Ahmed Benani",
    teachersCount: 22,
    studentsCount: 340
  },
  {
    id: "sch004",
    name: "Institut Supérieur de Tunis",
    logo: "/placeholder.svg",
    country: "Tunisie",
    status: "inactive",
    registrationDate: "2022-11-20",
    contactEmail: "contact@isttunis.edu",
    contactPhone: "+216 71 123456",
    adminName: "Leila Mansour",
    teachersCount: 35,
    studentsCount: 480
  },
  {
    id: "sch005",
    name: "École Primaire Nelson Mandela",
    logo: "/placeholder.svg",
    country: "Afrique du Sud",
    status: "active",
    registrationDate: "2023-01-30",
    contactEmail: "info@mandela-primary.edu",
    contactPhone: "+27 21 123 4567",
    adminName: "Thabo Mbeki",
    teachersCount: 28,
    studentsCount: 420
  },
];

export const subscriptions: Subscription[] = [
  {
    id: "sub001",
    schoolId: "sch001",
    schoolName: "Lycée Français de Dakar",
    plan: "Premium",
    status: "active",
    startDate: "2023-01-15",
    expiryDate: "2024-01-15",
    endDate: "2024-01-15", // Adding for compatibility
    price: 2499,
    currency: "EUR", // Adding for compatibility
    autoRenew: true
  },
  {
    id: "sub002",
    schoolId: "sch002",
    schoolName: "École Internationale d'Abidjan",
    plan: "Standard",
    status: "active",
    startDate: "2023-02-10",
    expiryDate: "2024-02-10",
    endDate: "2024-02-10",
    price: 1499,
    currency: "EUR",
    autoRenew: true
  },
  {
    id: "sub003",
    schoolId: "sch003",
    schoolName: "Collège Saint-Exupéry",
    plan: "Démarrage",
    status: "pending",
    startDate: "2023-03-05",
    expiryDate: "2024-03-05",
    endDate: "2024-03-05",
    price: 999,
    currency: "EUR",
    autoRenew: false
  },
  {
    id: "sub004",
    schoolId: "sch004",
    schoolName: "Institut Supérieur de Tunis",
    plan: "Premium",
    status: "expired",
    startDate: "2022-11-20",
    expiryDate: "2023-11-20",
    endDate: "2023-11-20",
    price: 2499,
    currency: "EUR",
    autoRenew: false
  },
  {
    id: "sub005",
    schoolId: "sch005",
    schoolName: "École Primaire Nelson Mandela",
    plan: "Standard",
    status: "active",
    startDate: "2023-01-30",
    expiryDate: "2024-01-30",
    endDate: "2024-01-30",
    price: 1499,
    currency: "EUR",
    autoRenew: true
  }
];

export const users: User[] = [
  {
    id: "usr001",
    name: "Alexandra Dubois",
    email: "a.dubois@admin.com",
    avatar: "/placeholder.svg",
    role: "admin",
    createdAt: "2022-10-15",
    lastLogin: "2023-05-15"
  },
  {
    id: "usr002",
    name: "Thomas Nkosi",
    email: "t.nkosi@admin.com",
    avatar: "/placeholder.svg",
    role: "manager",
    createdAt: "2022-11-02",
    lastLogin: "2023-05-14"
  },
  {
    id: "usr003",
    name: "Mariama Diallo",
    email: "m.diallo@admin.com",
    avatar: "/placeholder.svg",
    role: "support",
    createdAt: "2023-01-20",
    lastLogin: "2023-05-12"
  },
  {
    id: "usr004",
    name: "Karim Hassan",
    email: "k.hassan@admin.com",
    avatar: "/placeholder.svg",
    role: "admin",
    createdAt: "2022-09-05",
    lastLogin: "2023-05-10"
  },
  {
    id: "usr005",
    name: "Fatima El Mansouri",
    email: "f.elmansouri@admin.com",
    avatar: "/placeholder.svg",
    role: "manager",
    createdAt: "2023-02-10",
    lastLogin: "2023-05-15"
  }
];

// Adding activities data
export const activities: Activity[] = [
  {
    id: "act001",
    schoolId: "sch001",
    date: "2023-05-12",
    gamesPlayed: 45,
    activeUsers: 120,
    gamesCreated: 8
  },
  {
    id: "act002",
    schoolId: "sch002",
    date: "2023-05-11",
    gamesPlayed: 32,
    activeUsers: 95,
    gamesCreated: 5
  },
  {
    id: "act003",
    schoolId: "sch003",
    date: "2023-05-10",
    gamesPlayed: 18,
    activeUsers: 60,
    gamesCreated: 3
  },
  {
    id: "act004",
    schoolId: "sch004",
    date: "2023-05-09",
    gamesPlayed: 0,
    activeUsers: 0,
    gamesCreated: 0
  },
  {
    id: "act005",
    schoolId: "sch005",
    date: "2023-05-08",
    gamesPlayed: 28,
    activeUsers: 78,
    gamesCreated: 4
  }
];

// Adding the required utility functions
export const getTotalSchools = (): number => {
  return schools.length;
};

export const getTotalActiveSchools = (): number => {
  return schools.filter(school => school.status === 'active').length;
};

export const getTotalStudents = (): number => {
  return schools.reduce((total, school) => total + school.studentsCount, 0);
};

export const getTotalTeachers = (): number => {
  return schools.reduce((total, school) => total + school.teachersCount, 0);
};

export const getTotalGamesPlayed = (): number => {
  return activities.reduce((total, activity) => total + activity.gamesPlayed, 0);
};

export const getActivityChartData = (): ActivityDataPoint[] => {
  const today = new Date();
  const data: ActivityDataPoint[] = [];
  
  // Generate activity data for the past 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Random data for demonstration
    data.push({
      date: dateString,
      gamesCreated: Math.floor(Math.random() * 10) + 1,
      gamesPlayed: Math.floor(Math.random() * 50) + 10,
      activeUsers: Math.floor(Math.random() * 100) + 30
    });
  }
  
  return data;
};

export const getExpiringSubscriptions = () => {
  const today = new Date();
  const thirtyDaysFromNow = new Date(today);
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  return subscriptions
    .filter(sub => {
      const expiryDate = new Date(sub.expiryDate);
      return expiryDate > today && expiryDate <= thirtyDaysFromNow && sub.status === 'active';
    })
    .slice(0, 3); // Return only the first 3
};

export const getRecentActivities = () => {
  return activities.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 5); // Return only the 5 most recent activities
};
