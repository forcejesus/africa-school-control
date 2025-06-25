
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { buildApiUrl } from "@/config/hosts";
import { AuthService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { CountryHeader } from "./country/CountryHeader";
import { CountryTable } from "./country/CountryTable";
import { EditCountryDialog } from "./country/EditCountryDialog";

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
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

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

  const createCountry = async (countryName: string) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/pays'), {
        method: 'POST',
        headers,
        body: JSON.stringify({ libelle: countryName }),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Pays ajouté avec succès",
        });
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

  const updateCountry = async (countryName: string) => {
    if (!editingCountry) return;

    try {
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      const response = await fetch(buildApiUrl('/api/pays/update/'), {
        method: 'POST',
        headers,
        body: JSON.stringify({ libelle: countryName }),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Pays mis à jour avec succès",
        });
        setEditingCountry(null);
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
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditingCountry(null);
    setIsEditDialogOpen(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <Card className="border-blue-200">
      <CountryHeader onAdd={createCountry} />
      <CardContent className="p-6">
        <div className="space-y-4">
          <CountryTable 
            countries={countries} 
            loading={loading}
            onEdit={openEditDialog}
            onDelete={deleteCountry}
          />
        </div>

        <EditCountryDialog
          country={editingCountry}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          onEdit={updateCountry}
        />
      </CardContent>
    </Card>
  );
}
