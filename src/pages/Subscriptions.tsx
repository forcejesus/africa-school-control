
import Header from "@/components/Header";
import SubscriptionsList from "@/components/SubscriptionsList";
import { useI18n } from "@/contexts/I18nContext";
import { Award, Sparkles, Users, School, BarChart, Settings, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModernStatsCard } from "@/components/ModernStatsCard";
import { QuickActionCard } from "@/components/QuickActionCard";

const Subscriptions = () => {
  const { t } = useI18n();

  // Données statistiques mockées
  const statsData = [
    {
      title: "Total Écoles",
      value: "24",
      icon: School,
      bgGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      change: "+12%"
    },
    {
      title: "Abonnements Actifs",
      value: "18",
      icon: Award,
      bgGradient: "bg-gradient-to-br from-orange-500 to-orange-600",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      change: "+8%"
    },
    {
      title: "Enseignants",
      value: "156",
      icon: Users,
      bgGradient: "bg-gradient-to-br from-green-500 to-green-600",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600",
      change: "+15%"
    },
    {
      title: "Statistiques",
      value: "89%",
      icon: BarChart,
      bgGradient: "bg-gradient-to-br from-purple-500 to-purple-600",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      change: "+5%"
    }
  ];

  // Actions rapides avec les nouveaux menus
  const quickActions = [
    {
      title: "Voir les écoles",
      description: "Consulter la liste complète des écoles partenaires et leurs informations",
      icon: School,
      href: "/schools",
      iconColor: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "Gestion abonnement école",
      description: "Gérer les abonnements et les paramètres des écoles partenaires",
      icon: Settings,
      href: "/subscriptions",
      iconColor: "bg-gradient-to-br from-orange-500 to-orange-600"
    },
    {
      title: "Statistiques des jeux par enseignant",
      description: "Analyser les performances et l'utilisation des jeux par les enseignants",
      icon: BarChart,
      href: "/analytics",
      iconColor: "bg-gradient-to-br from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20 overflow-auto">
        {/* Header moderne avec thème orange */}
        <motion.div 
          className="dashboard-header mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <motion.div 
                className="p-3 bg-white/20 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Award className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {t('subscriptions.title')}
                </motion.h1>
                <motion.p 
                  className="text-orange-100 text-sm md:text-base"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {t('subscriptions.description')}
                </motion.p>
              </div>
            </div>
            
            <motion.div 
              className="flex items-center space-x-2 text-orange-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">Gestion Moderne</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Cartes de statistiques */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {statsData.map((stat, index) => (
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

        {/* Bouton Ajouter une école */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/schools/add">
            <Button className="text-lg px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
              <PlusCircle className="mr-3 h-6 w-6" />
              Ajouter une école
            </Button>
          </Link>
        </motion.div>

        {/* Actions rapides - Nouveaux menus */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={action.title}
              title={action.title}
              description={action.description}
              icon={action.icon}
              href={action.href}
              iconColor={action.iconColor}
              delay={index * 0.1 + 0.6}
            />
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <SubscriptionsList />
        </motion.div>
      </div>
    </div>
  );
};

export default Subscriptions;
