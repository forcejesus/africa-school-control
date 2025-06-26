
import { Users, Calendar, School, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { QuickActionCard } from "@/components/QuickActionCard";

export function DashboardMenu() {
  const menuCards = [
    {
      title: "Gestion des Écoles",
      description: "Consulter, ajouter et gérer toutes les écoles du système",
      icon: School,
      href: "/ecoles",
      iconColor: "bg-gradient-to-r from-orange-500 to-orange-600"
    },
    {
      title: "Gestion des Abonnements",
      description: "Suivre et gérer les abonnements des écoles",
      icon: Calendar,
      href: "/abonnements",
      iconColor: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      title: "Ajouter une École",
      description: "Créer une nouvelle école dans le système",
      icon: Plus,
      href: "/ecoles/ajouter",
      iconColor: "bg-gradient-to-r from-emerald-500 to-emerald-600"
    }
  ];

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Menu Principal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}
