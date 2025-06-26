
import { useState, useEffect } from "react";
import { StatsService, GlobalStats, StatsDetails } from "@/services/statsService";
import { SchoolService, ApiSchool } from "@/services/schoolService";
import { useToast } from "@/hooks/use-toast";

export function useDashboardData() {
  const { toast } = useToast();
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [statsDetails, setStatsDetails] = useState<StatsDetails | null>(null);
  const [schools, setSchools] = useState<ApiSchool[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsResponse, schoolsResponse] = await Promise.all([
          StatsService.getGlobalStats(),
          SchoolService.getSchools()
        ]);
        
        if (statsResponse.success) {
          setGlobalStats(statsResponse.data.global);
          setStatsDetails(statsResponse.data.details);
        }
        
        if (schoolsResponse.success) {
          setSchools(schoolsResponse.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les statistiques",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Calculs des statistiques avec les vraies données
  const totalStudents = schools.reduce((total, school) => total + (school.apprenants?.length || 0), 0);
  const totalGamesCreated = globalStats?.total_jeux || 0;
  const totalPlanifications = globalStats?.total_planifications || 0;
  const totalSchools = globalStats?.total_ecoles || schools.length;

  return {
    globalStats,
    statsDetails,
    schools,
    loading,
    totalStudents,
    totalGamesCreated,
    totalPlanifications,
    totalSchools
  };
}
