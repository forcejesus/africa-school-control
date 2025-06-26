
import { Users, GraduationCap, Gamepad, Calendar, School } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ModernStatsCard } from "@/components/ModernStatsCard";
import { QuickActionCard } from "@/components/QuickActionCard";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { StatsService, GlobalStats, StatsDetails } from "@/services/statsService";
import { SchoolService, ApiSchool } from "@/services/schoolService";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { t } = useI18n();
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
  
  const statsConfig = [
    {
      title: "Écoles",
      value: totalSchools.toString(),
      icon: School,
      bgGradient: "orange-gradient",
      iconBg: "bg-gradient-to-r from-orange-500 to-orange-600",
      subtitle: `${statsDetails?.ecoles.actives || 0} actives`,
      change: "+12%"
    },
    {
      title: "Jeux Créés",
      value: totalGamesCreated.toString(),
      icon: Gamepad,
      bgGradient: "purple-gradient",
      iconBg: "bg-gradient-to-r from-purple-500 to-purple-600",
      subtitle: `${statsDetails?.jeux.avec_questions || 0} avec questions`,
      change: "+8%"
    },
    {
      title: "Planifications",
      value: totalPlanifications.toString(),
      icon: Calendar,
      bgGradient: "blue-gradient",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      subtitle: `${statsDetails?.planifications.actives || 0} actives`,
      change: "+5%"
    },
    {
      title: "Apprenants",
      value: totalStudents.toString(),
      icon: Users,
      bgGradient: "green-gradient",
      iconBg: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      subtitle: "Total inscrits",
      change: "+15%"
    }
  ];

  const menuCards = [
    {
      title: "Gestion des Écoles",
      description: "Consulter, ajouter et gérer toutes les écoles du système",
      icon: School,
      href: "/ecoles",
      iconColor: "bg-gradient-to-r from-orange-500 to-orange-600"
    },
    {
      title: "Gestion des Utilisateurs",
      description: "Administrer les comptes utilisateurs et leurs permissions",
      icon: Users,
      href: "/utilisateurs",
      iconColor: "bg-gradient-to-r from-emerald-500 to-emerald-600"
    },
    {
      title: "Analyses et Rapports",
      description: "Visualiser les statistiques et performances du système",
      icon: GraduationCap,
      href: "/analytique",
      iconColor: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Gestion des Abonnements",
      description: "Suivre et gérer les abonnements des écoles",
      icon: Calendar,
      href: "/abonnements",
      iconColor: "bg-gradient-to-r from-purple-500 to-purple-600"
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
      <Header />
      
      <div className="flex-1 p-6 md:p-8">
        <motion.div 
          className="max-w-7xl mx-auto space-y-6 md:space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Dashboard Header */}
          <DashboardHeader />
          
          {/* Statistics Cards */}
          <div className="stats-grid">
            {statsConfig.map((stat, index) => (
              <ModernStatsCard
                key={stat.title}
                title={stat.title}
                value={loading ? "..." : stat.value}
                icon={stat.icon}
                subtitle={stat.subtitle}
                bgGradient={stat.bgGradient}
                iconBg={stat.iconBg}
                change={stat.change}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          {/* Menu Cards */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Menu Principal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuCards.map((card, index) => (
                <QuickActionCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  href={card.href}
                  iconColor={card.iconColor}
                  delay={0.7 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
