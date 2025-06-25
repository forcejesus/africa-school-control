
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { FormStepper } from "../FormStepper";
import { SchoolFormContent } from "./SchoolFormContent";
import { SchoolFormNavigation } from "./SchoolFormNavigation";
import { useSchoolForm } from "@/hooks/useSchoolForm";
import { School } from "@/utils/data/types";

interface SchoolFormContainerProps {
  school?: School;
}

const stepTitles = [
  { title: "Informations de l'école", description: "Détails de l'établissement" },
  { title: "Administrateur", description: "Compte administrateur" },
  { title: "Confirmation", description: "Vérification des données" }
];

export function SchoolFormContainer({ school }: SchoolFormContainerProps) {
  const {
    currentStep,
    loading,
    loadingData,
    subscriptions,
    countries,
    schoolData,
    adminData,
    handleSchoolChange,
    handleAdminChange,
    handleSchoolSelectChange,
    handleAdminSelectChange,
    validateStep,
    nextStep,
    prevStep,
    handleSubmit,
    navigate
  } = useSchoolForm(school);

  if (loadingData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-lg font-medium">Chargement des données...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Créer une nouvelle école</h1>
          <p className="text-gray-600">Suivez les étapes pour ajouter une école à la plateforme</p>
        </motion.div>

        {/* Stepper */}
        <FormStepper currentStep={currentStep} />

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
              <CardTitle className="text-xl text-gray-900">
                {stepTitles[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {stepTitles[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <SchoolFormContent
                currentStep={currentStep}
                schoolData={schoolData}
                adminData={adminData}
                subscriptions={subscriptions}
                countries={countries}
                onSchoolChange={handleSchoolChange}
                onAdminChange={handleAdminChange}
                onSchoolSelectChange={handleSchoolSelectChange}
                onAdminSelectChange={handleAdminSelectChange}
              />

              <SchoolFormNavigation
                currentStep={currentStep}
                loading={loading}
                validateStep={validateStep}
                onNext={nextStep}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/schools")}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
