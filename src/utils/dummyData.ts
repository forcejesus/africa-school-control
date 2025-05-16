
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
    price: 2499,
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
    price: 1499,
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
    price: 999,
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
    price: 2499,
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
    price: 1499,
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
