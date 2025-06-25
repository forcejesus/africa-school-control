
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
}

export interface SubscriptionsResponse {
  success: boolean;
  data: ApiSubscription[];
  message: string;
}

export interface ApiCountry {
  _id: string;
  libelle: string;
  __v: number;
}

export interface CountriesResponse {
  success: boolean;
  message: string;
  data: ApiCountry[];
}

export class SubscriptionService {
  static async getSubscriptions(): Promise<SubscriptionsResponse> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/abonnements'), {
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
