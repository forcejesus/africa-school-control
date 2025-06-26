
import { AuthService } from './authService';
import { buildApiUrl, API_ENDPOINTS } from '@/config/hosts';

export interface ApiSubscription {
  _id: string;
  nom: string;
  description: string;
  prix: number;
  dureeEnJours: number;
  nombreJeuxMax: number;
  nombreApprenantsMax: number;
  nombreEnseignantsMax: number;
  dateCreation: string;
  actif: boolean;
  free: boolean;
  accesStatistiques: boolean;
}

export interface SubscriptionsResponse {
  success: boolean;
  data: ApiSubscription[];
  message: string;
  total?: number;
  type?: string;
}

export interface UpdateSubscriptionData {
  nom: string;
  description: string;
  prix: number;
  dureeEnJours: number;
  nombreJeuxMax: number;
}

export interface ApiCountry {
  _id: string;
  libelle: string;
  totalEcoles: number;
  __v?: number;
}

export interface CountryStatistics {
  totalPays: number;
  totalEcoles: number;
  paysAvecEcoles: number;
  paysSansEcoles: number;
  moyenneEcolesParPays: number;
}

export interface CountriesResponse {
  success: boolean;
  message: string;
  data: ApiCountry[];
  statistiques: CountryStatistics;
}

export class SubscriptionService {
  static async getSubscriptions(): Promise<SubscriptionsResponse> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/abonnements/admin/all'), {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: SubscriptionsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des abonnements:', error);
      throw error;
    }
  }

  static async updateSubscription(id: string, subscriptionData: UpdateSubscriptionData): Promise<void> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl(`/api/abonnements/${id}/update/`), {
        method: 'POST',
        headers,
        body: JSON.stringify(subscriptionData),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la mise à jour de l\'abonnement');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'abonnement:', error);
      throw error;
    }
  }

  static async setFreeSubscription(id: string): Promise<void> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl(`/api/abonnements/admin/set-free/${id}`), {
        method: 'POST',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la modification du statut gratuit');
      }
    } catch (error) {
      console.error('Erreur lors de la modification du statut gratuit:', error);
      throw error;
    }
  }

  static async getCountries(): Promise<CountriesResponse> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/pays'), {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: CountriesResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des pays:', error);
      throw error;
    }
  }
}
