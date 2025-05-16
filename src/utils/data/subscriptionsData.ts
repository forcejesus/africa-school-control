
import { Subscription } from "./types";

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

// Subscription-related utility functions
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
