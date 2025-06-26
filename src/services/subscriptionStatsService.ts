
import { AuthService } from './authService';
import { buildApiUrl } from '@/config/hosts';

export interface UtilisationRessource {
  utilise: number;
  limite: number;
  restant: number;
  pourcentage: number;
  statut: string;
  typeRessource: string;
}

export interface Utilisation {
  enseignants: UtilisationRessource | null;
  apprenants: UtilisationRessource | null;
  jeux: UtilisationRessource | null;
}

export interface Abonnement {
  _id: string;
  nom: string;
  prix: number;
  joursRestants: number;
}

export interface EcoleUtilisation {
  _id: string;
  libelle: string;
  ville: string;
  email: string;
  telephone: string;
  abonnement: Abonnement | null;
  utilisation: Utilisation;
  statutGeneral: string;
  resume: string;
  derniereAnalyse: string;
}

export interface ResumeStats {
  totalEcoles: number;
  ecolesAvecAbonnement: number;
  ecolesSansAbonnement: number;
  ecolesExpires: number;
  revenuMensuelTotal: number;
  repartitionStatuts: {
    "Bon (<50%)": number;
    "Modéré (>50%)": number;
    "Attention (>80%)": number;
    "Critique (>90%)": number;
    "Limite atteinte": number;
  };
}

export interface SubscriptionStatsResponse {
  success: boolean;
  data: {
    resume: ResumeStats;
    ecoles: EcoleUtilisation[];
    totalEcoles: number;
    executionTime: string;
    generatedAt: string;
  };
  message: string;
  timestamp: string;
}

export class SubscriptionStatsService {
  static async getUtilisationEcoles(): Promise<SubscriptionStatsResponse> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/subscription-stats/utilisation-ecoles'), {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: SubscriptionStatsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques d\'utilisation:', error);
      throw error;
    }
  }
}
