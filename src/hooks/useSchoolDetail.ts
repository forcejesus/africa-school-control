
import { useState, useEffect } from "react";
import { buildApiUrl } from "@/config/hosts";
import { AuthService } from "@/services/authService";
import { useI18n } from "@/contexts/I18nContext";
import Swal from 'sweetalert2';
import { SchoolDetailData, ApiResponse } from "@/types/schoolDetail";
import { createDefaultSchoolData } from "@/utils/schoolDetailDefaults";

export function useSchoolDetail(id: string | undefined) {
  const [schoolData, setSchoolData] = useState<SchoolDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPartialData, setHasPartialData] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const fetchSchoolDetail = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const headers = {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        };

        const response = await fetch(buildApiUrl(`/api/ecoles/${id}/statistiques-detaillees`), {
          method: 'GET',
          headers,
        });

        if (!response.ok) {
          console.log('Réponse HTTP non-OK, utilisation des données par défaut');
          setSchoolData(createDefaultSchoolData(id));
          setHasPartialData(true);
          return;
        }

        const data: ApiResponse = await response.json();
        
        if (data.success && data.data) {
          // Fusionner les données reçues avec les valeurs par défaut pour gérer les null/undefined
          const mergedData = mergeWithDefaults(data.data, id);
          setSchoolData(mergedData);
          
          // Vérifier si certaines données sont manquantes
          const hasMissingData = !data.data.abonnement || !data.data.administrateur || 
                                data.data.jeux.length === 0 || data.data.planifications.total === 0;
          setHasPartialData(hasMissingData);
        } else {
          console.log('Réponse API non-successful, utilisation des données par défaut');
          setSchoolData(createDefaultSchoolData(id));
          setHasPartialData(true);
        }
      } catch (error: any) {
        console.error('Erreur lors du chargement des détails:', error);
        // En cas d'erreur, utiliser les données par défaut plutôt que d'afficher une erreur
        setSchoolData(createDefaultSchoolData(id));
        setHasPartialData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolDetail();
  }, [id, t]);

  return { schoolData, loading, hasPartialData };
}

function mergeWithDefaults(apiData: any, id: string): SchoolDetailData {
  const defaults = createDefaultSchoolData(id);
  
  return {
    ecole: apiData.ecole || defaults.ecole,
    abonnement: apiData.abonnement || defaults.abonnement,
    administrateur: apiData.administrateur || defaults.administrateur,
    jeux: apiData.jeux || defaults.jeux,
    planifications: apiData.planifications || defaults.planifications
  };
}
