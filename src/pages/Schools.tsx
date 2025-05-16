
import { useState, useEffect } from "react";
import { schools } from "@/utils/data";
import Header from "@/components/Header";
import SchoolsList from "@/components/SchoolsList";
import { motion } from "framer-motion";

const Schools = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gradient-to-b from-background to-accent/20 overflow-auto">
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Gestion des écoles
              </h1>
              <p className="text-base text-muted-foreground">
                Consultez et gérez toutes les écoles enregistrées sur la plateforme.
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
