
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SchoolFormNavigationProps {
  currentStep: number;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  isStepValid: (step: number) => boolean;
}

export function SchoolFormNavigation({
  currentStep,
  loading,
  onPrevious,
  onNext,
  onSubmit,
  onCancel,
  isStepValid
}: SchoolFormNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
      <Button 
        variant="outline" 
        onClick={currentStep === 1 ? onCancel : onPrevious}
        className="px-6 border-indigo-200 hover:bg-indigo-50"
        disabled={loading}
      >
        {currentStep === 1 ? "Annuler" : "Précédent"}
      </Button>
      
      {currentStep < 3 ? (
        <Button 
          onClick={onNext}
          disabled={loading || (currentStep === 1 && !isStepValid(1))}
          className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {currentStep === 1 ? "Création de l'école..." : "Chargement..."}
            </>
          ) : (
            "Suivant"
          )}
        </Button>
      ) : (
        <Button 
          onClick={onSubmit}
          disabled={loading}
          className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Création de l'admin...
            </>
          ) : (
            "Créer l'administrateur"
          )}
        </Button>
      )}
    </div>
  );
}
