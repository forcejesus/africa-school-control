
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SchoolFormNavigationProps {
  currentStep: number;
  loading: boolean;
  validateStep: (step: number) => boolean;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function SchoolFormNavigation({
  currentStep,
  loading,
  validateStep,
  onNext,
  onPrev,
  onSubmit,
  onCancel
}: SchoolFormNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t">
      <Button 
        variant="outline" 
        onClick={currentStep === 1 ? onCancel : onPrev}
        className="px-6"
        disabled={loading}
      >
        {currentStep === 1 ? "Annuler" : "Précédent"}
      </Button>
      
      {currentStep < 3 ? (
        <Button 
          onClick={onNext}
          disabled={!validateStep(currentStep) || loading}
          className="px-6"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {currentStep === 1 ? "Création de l'école..." : "Suivant"}
            </>
          ) : (
            "Suivant"
          )}
        </Button>
      ) : (
        <Button 
          onClick={onSubmit}
          disabled={loading}
          className="px-6"
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
