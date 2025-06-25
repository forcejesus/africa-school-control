
import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import SchoolsList from "@/components/SchoolsList";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { SchoolService, ApiSchool } from "@/services/schoolService";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import Swal from 'sweetalert2';

const Schools = () => {
  const [schools, setSchools] = useState<ApiSchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const fetchSchools = useCallback(async () => {
    try {
      setLoading(true);
      const response = await SchoolService.getSchools();
      
      if (response.success) {
        setSchools(response.data);
      } else {
        await Swal.fire({
          title: t('alerts.error'),
          text: response.message || "Impossible de récupérer les écoles",
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ea580c'
        });
      }
    } catch (error: any) {
      console.error('Erreur lors du chargement des écoles:', error);
      await Swal.fire({
        title: 'Erreur de connexion',
        text: "Impossible de récupérer les écoles depuis le serveur",
        icon: 'error',
        confirmButtonText: 'Réessayer',
        confirmButtonColor: '#ea580c'
      });
    } finally {
      setLoading(false);
    }
  }, [toast, t]);

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />
      
      <div className="flex-1 p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 overflow-auto">
        <motion.div 
          className="space-y-3 sm:space-y-4 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                {t('schools.title')}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                {t('schools.description')}
              </p>
            </div>
          </div>
          
          <SchoolsList schools={schools} isLoading={loading} onUpdate={fetchSchools} />
        </motion.div>
      </div>
    </div>
  );
};

export default Schools;
