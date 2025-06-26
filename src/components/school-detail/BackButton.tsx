
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  onBack: () => void;
}

export function BackButton({ onBack }: BackButtonProps) {
  return (
    <div className="flex justify-start">
      <Button
        onClick={onBack}
        variant="outline"
        className="inline-flex items-center text-orange-600 hover:text-orange-700 border-orange-300 hover:bg-orange-50"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux écoles
      </Button>
    </div>
  );
}
