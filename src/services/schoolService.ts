
import { AuthService } from './authService';

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

export class SchoolService {
  private static readonly API_BASE_URL = 'http://kahoot.nos-apps.com';

  static async getSchools(): Promise<SchoolsResponse> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(`${this.API_BASE_URL}/api/ecoles/`, {
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

  // Convertir les données de l'API au format utilisé par l'interface
  static transformApiSchoolToLocal(apiSchool: ApiSchool) {
    return {
      id: apiSchool._id,
      name: apiSchool.libelle,
      country: apiSchool.pays.libelle,
      status: 'active' as const, // Par défaut, on considère les écoles comme actives
      contactEmail: apiSchool.email,
      contactPhone: apiSchool.telephone,
      adminName: `${apiSchool.admin.prenom} ${apiSchool.admin.nom}`,
      teachersCount: 1, // Admin compte comme enseignant
      studentsCount: apiSchool.apprenants.length,
      registrationDate: apiSchool.admin.date,
      logo: apiSchool.fichier || '/placeholder.svg',
      address: `${apiSchool.adresse}, ${apiSchool.ville}`,
    };
  }
}
