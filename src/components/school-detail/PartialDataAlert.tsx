
import { Card, CardContent } from "@/components/ui/card";

interface PartialDataAlertProps {
  show: boolean;
}

export function PartialDataAlert({ show }: PartialDataAlertProps) {
  if (!show) return null;

  return (
    <Card className="border-amber-200 bg-amber-50 shadow-soft">
      <CardContent className="p-6">
        <div className="text-center text-amber-700">
          <p className="text-lg font-medium">Données partielles disponibles</p>
          <p className="text-sm">Certaines informations peuvent être manquantes pour cette école.</p>
        </div>
      </CardContent>
    </Card>
  );
}
