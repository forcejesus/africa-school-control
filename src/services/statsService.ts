
import { AuthService } from './authService';
import { buildApiUrl } from '@/config/hosts';

export interface GlobalStats {
  total_ecoles: number;
  total_jeux: number;
  total_planifications: number;
}

export interface StatsDetails {
  ecoles: {
    total: number;
    actives: number;
    inactives: number;
  };
  jeux: {
    total: number;
    avec_questions: number;
    sans_questions: number;
  };
  planifications: {
    total: number;
    actives: number;
    en_cours: number;
    inactives: number;
  };
}

export interface StatsResponse {
  success: boolean;
  message: string;
  data: {
    global: GlobalStats;
    details: StatsDetails;
    metadata: {
      timestamp: string;
      demandeur: {
        id: string;
        email: string;
        role: string;
      };
    };
  };
}

export class StatsService {
  static async getGlobalStats(): Promise<StatsResponse> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/stats/global'), {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: StatsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
}
