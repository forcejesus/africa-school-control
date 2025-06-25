
import { Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export function DashboardHeader() {
  const { t } = useI18n();

  return (
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
              {t('dashboard.welcome')}
            </motion.h1>
            <motion.p 
              className="text-orange-100 text-sm md:text-base"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Tableau de bord éducatif moderne
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
          <span className="text-sm font-medium">Interface Moderne</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
