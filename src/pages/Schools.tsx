
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SchoolsList from "@/components/SchoolsList";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { SchoolService, ApiSchool } from "@/services/schoolService";
import { useToast } from "@/hooks/use-toast";

const Schools = () => {
  const [schools, setSchools] = useState<ApiSchool[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const response = await SchoolService.getSchools();
        
        if (response.success) {
          setSchools(response.data);
        } else {
          toast({
            title: "Erreur",
            description: response.message || "Impossible de récupérer les écoles",
            variant: "destructive"
          });
        }
      } catch (error: any) {
        console.error('Erreur lors du chargement des écoles:', error);
        toast({
          title: "Erreur de connexion",
          description: "Impossible de récupérer les écoles depuis le serveur",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [toast]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/20 overflow-auto">
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t('schools.title')}
              </h1>
              <p className="text-base text-muted-foreground">
                {t('schools.description')}
              </p>
            </div>
          </div>
          
          <SchoolsList schools={schools} isLoading={loading} />
        </motion.div>
      </div>
    </div>
  );
};

export default Schools;
