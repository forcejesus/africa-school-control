
import { Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export function DashboardHeader() {
  const { t } = useI18n();

  return (
    <motion.div 
      className="dashboard-header mb-4 sm:mb-6 lg:mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
          <motion.div 
            className="p-2 sm:p-3 bg-white/20 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </motion.div>
          <div>
            <motion.h1 
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t('dashboard.welcome')}
            </motion.h1>
            <motion.p 
              className="text-orange-100 text-sm sm:text-base"
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
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-xs sm:text-sm font-medium">Interface Moderne</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
