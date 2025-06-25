
import { Globe } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AddCountryDialog } from "./AddCountryDialog";

interface CountryHeaderProps {
  onAdd: (countryName: string) => Promise<void>;
}

export function CountryHeader({ onAdd }: CountryHeaderProps) {
  return (
    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-slate-900">Gestion des Pays</CardTitle>
            <CardDescription className="text-base text-slate-600">
              Gérez les pays où l'application est autorisée et où les écoles peuvent s'inscrire
            </CardDescription>
          </div>
        </div>
        <AddCountryDialog onAdd={onAdd} />
      </div>
    </CardHeader>
  );
}
