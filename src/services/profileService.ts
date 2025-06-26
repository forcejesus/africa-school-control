
import { buildApiUrl, API_ENDPOINTS } from '@/config/hosts';
import { AuthService } from './authService';

export interface UserProfile {
  _id: string;
  nom: string;
  prenom: string;
  matricule: string;
  genre: string;
  statut: string;
  phone: string;
  email: string;
  adresse: string;
  pays?: {
    _id: string;
    libelle: string;
  };
  role: string;
  date: string;
  __v: number;
  ecole: any;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface UpdateProfileData {
  nom: string;
  prenom: string;
  genre: string;
  phone: string;
  email: string;
  adresse: string;
  pays: string;
}

export interface Country {
  _id: string;
  libelle: string;
}

export class ProfileService {
  static async getProfile(): Promise<UserProfile> {
    try {
      const response = await fetch(buildApiUrl('/api/profile'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du profil');
      }

      const data: ProfileResponse = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Erreur lors de la récupération du profil');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw error;
    }
  }

  static async updateProfile(profileData: UpdateProfileData): Promise<void> {
    try {
      const response = await fetch(buildApiUrl('/api/profile/update'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du profil');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la mise à jour du profil');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error;
    }
  }

  static async getCountries(): Promise<Country[]> {
    try {
      const response = await fetch(buildApiUrl('/api/pays'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des pays');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des pays:', error);
      return [];
    }
  }
}
