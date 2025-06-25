
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { School } from "@/utils/data/types";
import { useSchoolForm } from "@/hooks/useSchoolForm";
import { FormStepper } from "./FormStepper";
import { SchoolInfoStep } from "./SchoolInfoStep";
import { AdminInfoStep } from "./AdminInfoStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { SchoolFormHeader } from "./school/SchoolFormHeader";
import { SchoolFormNavigation } from "./school/SchoolFormNavigation";

interface SchoolFormProps {
  school?: School;
  isEditing?: boolean;
}

export function SchoolForm({ school, isEditing = false }: SchoolFormProps) {
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

  const stepTitles = [
    { title: "Informations de l'école", description: "Détails de l'établissement" },
    { title: "Administrateur", description: "Compte administrateur" },
    { title: "Confirmation", description: "Vérification des données" }
  ];
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SchoolInfoStep
            schoolData={schoolData}
            subscriptions={subscriptions}
            countries={countries}
            onSchoolChange={handleSchoolChange}
            onSchoolSelectChange={handleSchoolSelectChange}
          />
        );
      case 2:
        return (
          <AdminInfoStep
            adminData={adminData}
            onAdminChange={handleAdminChange}
            onAdminSelectChange={handleAdminSelectChange}
          />
        );
      case 3:
        return (
          <ConfirmationStep
            schoolData={schoolData}
            adminData={adminData}
          />
        );
      default:
        return null;
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/20 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <span className="text-lg font-medium text-gray-700">Chargement des données...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SchoolFormHeader currentStep={currentStep} />
        <FormStepper currentStep={currentStep} />

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-indigo-100">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <div className="h-2 w-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                {stepTitles[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {stepTitles[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              {renderCurrentStep()}
              
              <SchoolFormNavigation
                currentStep={currentStep}
                loading={loading}
                onPrevious={prevStep}
                onNext={nextStep}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/schools")}
                isStepValid={validateStep}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default SchoolForm;
