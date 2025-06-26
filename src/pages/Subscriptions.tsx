
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useI18n } from "@/contexts/I18nContext";
import { Award, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { SubscriptionStatsService, SubscriptionStatsResponse } from "@/services/subscriptionStatsService";
import { SubscriptionStatsCards } from "@/components/subscriptions/SubscriptionStatsCards";
import { SubscriptionUsageTable } from "@/components/subscriptions/SubscriptionUsageTable";
import { useToast } from "@/hooks/use-toast";

const Subscriptions = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [subscriptionStats, setSubscriptionStats] = useState<SubscriptionStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptionStats();
  }, []);

  const loadSubscriptionStats = async () => {
    try {
      setLoading(true);
      const response = await SubscriptionStatsService.getUtilisationEcoles();
      setSubscriptionStats(response);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques d'utilisation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            <span className="text-lg text-slate-600">Chargement des statistiques...</span>
          </div>
        </div>
      </div>
    );
  }

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
                  Gestion et suivi des abonnements des écoles partenaires
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
        {subscriptionStats && (
          <SubscriptionStatsCards stats={subscriptionStats.data.resume} />
        )}

        {/* Tableau d'utilisation des abonnements avec filtres améliorés */}
        {subscriptionStats && (
          <div className="space-y-6">
            <motion.h2 
              className="text-2xl font-bold text-slate-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Utilisation des abonnements par école
            </motion.h2>
            <SubscriptionUsageTable ecoles={subscriptionStats.data.ecoles} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
