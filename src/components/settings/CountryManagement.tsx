
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Globe } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { buildApiUrl } from "@/config/hosts";
import { AuthService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

interface Country {
  _id: string;
  libelle: string;
  __v?: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Country[];
}

export function CountryManagement() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCountryName, setNewCountryName] = useState("");
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [editCountryName, setEditCountryName] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { t } = useI18n();
  const { toast } = useToast();

  // Charger la liste des pays
  const fetchCountries = async () => {
    try {
      setLoading(true);
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/pays'), {
        method: 'GET',
        headers,
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (data.success) {
          setCountries(data.data);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des pays:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des pays",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Créer un nouveau pays
  const createCountry = async () => {
    if (!newCountryName.trim()) return;

    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/pays'), {
        method: 'POST',
        headers,
        body: JSON.stringify({ libelle: newCountryName.trim() }),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Pays ajouté avec succès",
        });
        setNewCountryName("");
        setIsAddDialogOpen(false);
        fetchCountries();
      } else {
        throw new Error('Erreur lors de la création');
      }
    } catch (error) {
      console.error('Erreur lors de la création du pays:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le pays",
        variant: "destructive",
      });
    }
  };

  // Mettre à jour un pays
  const updateCountry = async () => {
    if (!editingCountry || !editCountryName.trim()) return;

    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/pays/update/'), {
        method: 'POST',
        headers,
        body: JSON.stringify({ libelle: editCountryName.trim() }),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Pays mis à jour avec succès",
        });
        setEditingCountry(null);
        setEditCountryName("");
        setIsEditDialogOpen(false);
        fetchCountries();
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du pays:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le pays",
        variant: "destructive",
      });
    }
  };

  // Supprimer un pays
  const deleteCountry = async (countryId: string) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl(`/api/pays/delete/${countryId}`), {
        method: 'POST',
        headers,
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Pays supprimé avec succès",
        });
        fetchCountries();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du pays:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le pays",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (country: Country) => {
    setEditingCountry(country);
    setEditCountryName(country.libelle);
    setIsEditDialogOpen(true);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <Card className="border-blue-200">
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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="text-base">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un pays
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau pays</DialogTitle>
                <DialogDescription>
                  Entrez le nom du pays à ajouter à la liste des pays autorisés.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="country-name">Nom du pays</Label>
                  <Input
                    id="country-name"
                    value={newCountryName}
                    onChange={(e) => setNewCountryName(e.target.value)}
                    placeholder="Ex: France"
                    className="text-base"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button onClick={createCountry}>
                    Ajouter
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="text-center py-8">Chargement des pays...</div>
        ) : (
          <div className="space-y-4">
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
                              onClick={() => openEditDialog(country)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteCountry(country._id)}
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
          </div>
        )}

        {/* Dialog de modification */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le pays</DialogTitle>
              <DialogDescription>
                Modifiez le nom du pays sélectionné.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-country-name">Nom du pays</Label>
                <Input
                  id="edit-country-name"
                  value={editCountryName}
                  onChange={(e) => setEditCountryName(e.target.value)}
                  className="text-base"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button onClick={updateCountry}>
                  Mettre à jour
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
