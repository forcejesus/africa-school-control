
import { Users, GraduationCap, Gamepad, Calendar, School } from "lucide-react";
import { motion } from "framer-motion";
import { ModernStatsCard } from "@/components/ModernStatsCard";

interface DashboardStatsProps {
  loading: boolean;
  totalSchools: number;
  totalGamesCreated: number;
  totalPlanifications: number;
  totalStudents: number;
  statsDetails: {
    ecoles: { actives: number };
    jeux: { avec_questions: number };
    planifications: { actives: number };
  } | null;
}

export function DashboardStats({
  loading,
  totalSchools,
  totalGamesCreated,
  totalPlanifications,
  totalStudents,
  statsDetails
}: DashboardStatsProps) {
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

  return (
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
  );
}
