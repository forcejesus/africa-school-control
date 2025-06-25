
import { useState, useEffect } from "react";
import { buildApiUrl } from "@/config/hosts";
import { AuthService } from "@/services/authService";
import { useI18n } from "@/contexts/I18nContext";
import Swal from 'sweetalert2';
import { SchoolDetailData, ApiResponse } from "@/types/schoolDetail";

export function useSchoolDetail(id: string | undefined) {
  const [schoolData, setSchoolData] = useState<SchoolDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const fetchSchoolDetail = async () => {
      if (!id) return;
      
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
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        
        if (data.success) {
          setSchoolData(data.data);
        } else {
          await Swal.fire({
            title: t('alerts.error'),
            text: data.message || "Impossible de récupérer les détails de l'école",
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ea580c'
          });
        }
      } catch (error: any) {
        console.error('Erreur lors du chargement des détails:', error);
        await Swal.fire({
          title: 'Erreur de connexion',
          text: "Impossible de récupérer les détails de l'école depuis le serveur",
          icon: 'error',
          confirmButtonText: 'Réessayer',
          confirmButtonColor: '#ea580c'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolDetail();
  }, [id, t]);

  return { schoolData, loading };
}
