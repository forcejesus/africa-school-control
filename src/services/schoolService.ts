import { AuthService } from './authService';
import { buildApiUrl, API_ENDPOINTS } from '@/config/hosts';

export interface ApiSchool {
  _id: string;
  libelle: string;
  adresse: string;
  ville: string;
  telephone: string;
  email: string;
  fichier: string;
  admin: {
    _id: string;
    nom: string;
    prenom: string;
    matricule: string;
    genre: string;
    statut: string;
    phone: string;
    email: string;
    adresse: string;
    pays: string;
    role: string;
    date: string;
    ecole: string;
  };
  pays: {
    _id: string;
    libelle: string;
  };
  apprenants: Array<{
    _id: string;
    nom: string;
    prenom: string;
    avatar: string;
    matricule: string;
    phone: string;
    email: string;
    ecole: string;
    date: string;
  }>;
  abonnementHistorique: any[];
}

export interface SchoolsResponse {
  success: boolean;
  message: string;
  data: ApiSchool[];
}

export interface CreateSchoolData {
  libelle: string;
  adresse: string;
  abonnementActuel: string;
  ville: string;
  telephone: string;
  email: string;
  fichier: string;
  pays: string;
}

export interface CreateAdminData {
  nom: string;
  prenom: string;
  genre: string;
  statut: string;
  phone: string;
  email: string;
  adresse: string;
  role: string;
  password: string;
  ecole?: string; // ID de l'école
}

export class SchoolService {
  static async getSchools(): Promise<SchoolsResponse> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl(API_ENDPOINTS.schools.list), {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: SchoolsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des écoles:', error);
      throw error;
    }
  }

  static async createSchool(schoolData: CreateSchoolData): Promise<any> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/ecoles'), {
        method: 'POST',
        headers,
        body: JSON.stringify(schoolData),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'école:', error);
      throw error;
    }
  }

  static async createAdmin(adminData: CreateAdminData): Promise<any> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/admin'), {
        method: 'POST',
        headers,
        body: JSON.stringify(adminData),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'admin:', error);
      throw error;
    }
  }

  static transformApiSchoolToLocal(apiSchool: ApiSchool) {
    return {
      id: apiSchool._id,
      name: apiSchool.libelle,
      country: apiSchool.pays.libelle,
      status: 'active' as const,
      contactEmail: apiSchool.email,
      contactPhone: apiSchool.telephone,
      adminName: `${apiSchool.admin.prenom} ${apiSchool.admin.nom}`,
      teachersCount: 1,
      studentsCount: apiSchool.apprenants.length,
      registrationDate: apiSchool.admin.date,
      logo: apiSchool.fichier || '/placeholder.svg',
      address: `${apiSchool.adresse}, ${apiSchool.ville}`,
    };
  }
}
