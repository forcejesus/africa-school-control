
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit, Trash2, School } from "lucide-react";

interface Country {
  _id: string;
  libelle: string;
  totalEcoles: number;
  __v?: number;
}

interface CountryTableProps {
  countries: Country[];
  loading: boolean;
  onEdit: (country: Country) => void;
  onDelete: (countryId: string) => void;
}

export function CountryTable({ countries, loading, onEdit, onDelete }: CountryTableProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Chargement des pays...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/80">
            <TableHead className="font-semibold">Nom du pays</TableHead>
            <TableHead className="font-semibold text-center">Nombre d'écoles</TableHead>
            <TableHead className="w-32 font-semibold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {countries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <Globe className="h-12 w-12 text-gray-300" />
                  <p className="text-slate-500 text-lg">Aucun pays trouvé</p>
                  <p className="text-slate-400 text-sm">Commencez par ajouter un nouveau pays</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            countries.map((country) => (
              <TableRow key={country._id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-medium text-base">{country.libelle}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Badge 
                      variant={country.totalEcoles > 0 ? "default" : "secondary"}
                      className={`flex items-center gap-1 ${
                        country.totalEcoles > 0 
                          ? "bg-green-100 text-green-800 hover:bg-green-200" 
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <School className="h-3 w-3" />
                      {country.totalEcoles}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(country)}
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(country._id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
