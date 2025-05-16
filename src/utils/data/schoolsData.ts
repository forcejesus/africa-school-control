
import { School } from "./types";

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

// School-related utility functions
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
