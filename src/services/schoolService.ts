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
    pays: {
      _id: string;
      libelle: string;
    };
    role: string;
    date: string;
    ecole: string;
  } | null;
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

export interface CreateSchoolResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    libelle: string;
    adresse: string;
    ville: string;
    telephone: string;
    email: string;
    fichier: string;
    pays: string;
    apprenants: any[];
    abonnementActuel: string;
    abonnementHistorique: any[];
  };
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

export interface UpdateSchoolData {
  libelle: string;
  ville: string;
  adresse: string;
  telephone: string;
  email: string;
  pays: string;
}

export class SchoolService {
  static async getSchools(): Promise<SchoolsResponse> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      console.log('Fetching schools from:', buildApiUrl('/api/ecoles/'));
      
      const response = await fetch(buildApiUrl('/api/ecoles/'), {
        method: 'GET',
        headers,
      });

      console.log('Schools API response status:', response.status);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: SchoolsResponse = await response.json();
      console.log('Schools API response data:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des écoles:', error);
      throw error;
    }
  }

  static async createSchool(schoolData: CreateSchoolData): Promise<CreateSchoolResponse> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      console.log('Creating school with data:', schoolData);
      console.log('Sending request to:', buildApiUrl('/api/ecoles'));

      const response = await fetch(buildApiUrl('/api/ecoles'), {
        method: 'POST',
        headers,
        body: JSON.stringify(schoolData),
      });

      console.log('Create school response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create school error response:', errorText);
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }

      const data: CreateSchoolResponse = await response.json();
      console.log('Create school response data:', data);
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

      console.log('Creating admin with data:', adminData);

      const response = await fetch(buildApiUrl('/api/admin'), {
        method: 'POST',
        headers,
        body: JSON.stringify(adminData),
      });

      console.log('Create admin response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create admin error response:', errorText);
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Create admin response data:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'admin:', error);
      throw error;
    }
  }

  static async updateSchool(schoolId: string, schoolData: UpdateSchoolData): Promise<any> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      console.log('Updating school with ID:', schoolId, 'Data:', schoolData);

      const response = await fetch(buildApiUrl(`/api/ecoles/update/${schoolId}`), {
        method: 'POST',
        headers,
        body: JSON.stringify(schoolData),
      });

      console.log('Update school response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update school error response:', errorText);
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Update school response data:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'école:', error);
      throw error;
    }
  }

  static async deleteSchool(schoolId: string): Promise<any> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      console.log('Deleting school with ID:', schoolId);

      const response = await fetch(buildApiUrl(`/api/ecoles/delete/${schoolId}`), {
        method: 'POST',
        headers,
      });

      console.log('Delete school response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete school error response:', errorText);
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Delete school response data:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'école:', error);
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
      adminName: apiSchool.admin ? `${apiSchool.admin.prenom} ${apiSchool.admin.nom}` : 'Aucun admin',
      teachersCount: 1,
      studentsCount: apiSchool.apprenants.length,
      registrationDate: apiSchool.admin?.date || '',
      logo: apiSchool.fichier || '/placeholder.svg',
      address: `${apiSchool.adresse}, ${apiSchool.ville}`,
    };
  }
}
