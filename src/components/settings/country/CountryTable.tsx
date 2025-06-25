
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

interface Country {
  _id: string;
  libelle: string;
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
    return <div className="text-center py-8">Chargement des pays...</div>;
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom du pays</TableHead>
            <TableHead className="w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {countries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-8 text-slate-500">
                Aucun pays trouvé
              </TableCell>
            </TableRow>
          ) : (
            countries.map((country) => (
              <TableRow key={country._id}>
                <TableCell className="font-medium">{country.libelle}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(country)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(country._id)}
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
