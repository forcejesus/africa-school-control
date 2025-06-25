
import { motion } from "framer-motion";
import { Building2, GraduationCap } from "lucide-react";

interface SchoolFormHeaderProps {
  currentStep: number;
}

export function SchoolFormHeader({ currentStep }: SchoolFormHeaderProps) {
  return (
    <motion.div 
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full">
            <Building2 className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
        Créer une nouvelle école
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Suivez les étapes pour ajouter une école à la plateforme
      </p>
      <div className="flex items-center justify-center gap-2 mt-4">
        <GraduationCap className="h-5 w-5 text-indigo-500" />
        <span className="text-sm text-gray-500">Étape {currentStep} sur 3</span>
      </div>
    </motion.div>
  );
}
