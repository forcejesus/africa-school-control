import { buildApiUrl, API_ENDPOINTS } from '@/config/hosts';
import { jwtDecode } from 'jwt-decode';

export interface LoginCredentials {
  email: string;
  motDePasse: string;
}

export interface AuthResponse {
  statut: number;
  message: string;
  token: string;
}

export interface UserPayload {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

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
  pays: {
    _id: string;
    libelle: string;
  };
  role: string;
  date: string;
  ecole: any | null;
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

export class AuthService {
  private static readonly TOKEN_KEY = 'authToken';

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const expiry = decodedToken.exp * 1000; // Convertir en millisecondes

      if (Date.now() >= expiry) {
        this.removeToken();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      return false;
    }
  }

  static getUser(): UserPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: UserPayload = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  static getAuthHeaders(): { [key: string]: string } {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  static async loginAdmin(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.auth.login), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();

      if (data.token) {
        this.setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  static logout(): void {
    this.removeToken();
  }

  static async getProfile(): Promise<ProfileResponse> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/profile'), {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: ProfileResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw error;
    }
  }

  static async updateProfile(profileData: UpdateProfileData): Promise<{ success: boolean; message: string }> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/profile/update'), {
        method: 'POST',
        headers,
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error;
    }
  }
}
