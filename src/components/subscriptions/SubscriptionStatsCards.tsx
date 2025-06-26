
import { motion } from "framer-motion";
import { ModernStatsCard } from "@/components/ModernStatsCard";
import { School, Award, AlertTriangle, DollarSign } from "lucide-react";
import { ResumeStats } from "@/services/subscriptionStatsService";

interface SubscriptionStatsCardsProps {
  stats: ResumeStats;
}

export function SubscriptionStatsCards({ stats }: SubscriptionStatsCardsProps) {
  const statsCards = [
    {
      title: "Total Écoles",
      value: stats.totalEcoles.toString(),
      icon: School,
      bgGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      change: `${stats.ecolesAvecAbonnement} avec abonnement`
    },
    {
      title: "Écoles Abonnées",
      value: stats.ecolesAvecAbonnement.toString(),
      icon: Award,
      bgGradient: "bg-gradient-to-br from-green-500 to-green-600",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600",
      change: `${stats.ecolesSansAbonnement} sans abonnement`
    },
    {
      title: "Revenus Mensuels",
      value: `${(stats.revenuMensuelTotal / 1000).toFixed(0)}K`,
      icon: DollarSign,
      bgGradient: "bg-gradient-to-br from-orange-500 to-orange-600",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      change: "FCFA"
    },
    {
      title: "Statut Critique",
      value: (stats.repartitionStatuts["Critique (>90%)"] + stats.repartitionStatuts["Limite atteinte"]).toString(),
      icon: AlertTriangle,
      bgGradient: "bg-gradient-to-br from-red-500 to-red-600",
      iconBg: "bg-gradient-to-br from-red-500 to-red-600",
      change: "écoles à surveiller"
    }
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {statsCards.map((stat, index) => (
        <ModernStatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          bgGradient={stat.bgGradient}
          iconBg={stat.iconBg}
          change={stat.change}
          delay={index * 0.1}
        />
      ))}
    </motion.div>
  );
}
