
const API_BASE_URL = 'http://kahoot.nos-apps.com';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
  statut: number;
  email: string;
  role: string;
}

export interface UserPayload {
  id: string;
  email: string;
  role: string;
  ecole: string;
  prenom: string;
  nom: string;
  iat: number;
  exp: number;
}

export class AuthService {
  private static readonly TOKEN_KEY = 'admin_token';
  private static readonly USER_KEY = 'admin_user';

  static async loginAdmin(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Erreur de connexion');
      }

      const data: LoginResponse = await response.json();
      
      if (data.statut === 200 && data.token) {
        // Vérifier le rôle avant de stocker
        const userPayload = this.decodeToken(data.token);
        if (userPayload && userPayload.role !== 'super_admin') {
          throw new Error('Accès refusé : seuls les super administrateurs peuvent accéder à cette interface');
        }
        
        // Stocker le token
        localStorage.setItem(this.TOKEN_KEY, data.token);
        
        // Stocker les informations utilisateur
        if (userPayload) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(userPayload));
        }
      }

      return data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  static decodeToken(token: string): UserPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return JSON.parse(jsonPayload) as UserPayload;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static getUser(): UserPayload | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr) as UserPayload;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        return null;
      }
    }
    return null;
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    
    if (!token || !user) {
      return false;
    }

    // Vérifier le rôle super_admin
    if (user.role !== 'super_admin') {
      this.logout(); // Nettoyer les données invalides
      return false;
    }

    // Vérifier si le token n'est pas expiré
    const currentTime = Math.floor(Date.now() / 1000);
    return user.exp > currentTime;
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
