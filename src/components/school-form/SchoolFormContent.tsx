
import { SchoolInfoStep } from "../SchoolInfoStep";
import { AdminInfoStep } from "../AdminInfoStep";
import { ConfirmationStep } from "../ConfirmationStep";
import { ApiSubscription, ApiCountry } from "@/services/subscriptionService";

interface SchoolData {
  libelle: string;
  adresse: string;
  abonnementActuel: string;
  ville: string;
  telephone: string;
  email: string;
  fichier: string;
  pays: string;
}

interface AdminData {
  nom: string;
  prenom: string;
  genre: string;
  phone: string;
  email: string;
  adresse: string;
  password: string;
  confirmPassword: string;
}

interface SchoolFormContentProps {
  currentStep: number;
  schoolData: SchoolData;
  adminData: AdminData;
  subscriptions: ApiSubscription[];
  countries: ApiCountry[];
  onSchoolChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdminChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSchoolSelectChange: (field: string, value: string) => void;
  onAdminSelectChange: (field: string, value: string) => void;
}

export function SchoolFormContent({
  currentStep,
  schoolData,
  adminData,
  subscriptions,
  countries,
  onSchoolChange,
  onAdminChange,
  onSchoolSelectChange,
  onAdminSelectChange
}: SchoolFormContentProps) {
  switch (currentStep) {
    case 1:
      return (
        <SchoolInfoStep
          schoolData={schoolData}
          subscriptions={subscriptions}
          countries={countries}
          onSchoolChange={onSchoolChange}
          onSchoolSelectChange={onSchoolSelectChange}
        />
      );
    case 2:
      return (
        <AdminInfoStep
          adminData={adminData}
          onAdminChange={onAdminChange}
          onAdminSelectChange={onAdminSelectChange}
        />
      );
    case 3:
      return (
        <ConfirmationStep
          schoolData={schoolData}
          adminData={adminData}
        />
      );
    default:
      return null;
  }
}
