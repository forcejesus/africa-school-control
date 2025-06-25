
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SubscriptionService, ApiCountry, CountryStatistics } from "@/services/subscriptionService";
import { AuthService } from "@/services/authService";
import { buildApiUrl } from "@/config/hosts";
import { useToast } from "@/hooks/use-toast";
import { CountryHeader } from "./country/CountryHeader";
import { CountryTable } from "./country/CountryTable";
import { CountryStats } from "./country/CountryStats";
import { EditCountryDialog } from "./country/EditCountryDialog";

export function CountryManagement() {
  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [statistics, setStatistics] = useState<CountryStatistics>({
    totalPays: 0,
    totalEcoles: 0,
    paysAvecEcoles: 0,
    paysSansEcoles: 0,
    moyenneEcolesParPays: 0
  });
  const [loading, setLoading] = useState(true);
  const [editingCountry, setEditingCountry] = useState<ApiCountry | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await SubscriptionService.getCountries();
      
      if (response.success) {
        setCountries(response.data);
        setStatistics(response.statistiques);
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

  const openEditDialog = (country: ApiCountry) => {
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
    <div className="space-y-6">
      <CountryStats statistics={statistics} loading={loading} />
      
      <Card className="border-violet-200 shadow-sm">
        <CountryHeader onAdd={createCountry} />
        <CardContent className="p-6">
          <CountryTable 
            countries={countries} 
            loading={loading}
            onEdit={openEditDialog}
            onDelete={deleteCountry}
          />

          <EditCountryDialog
            country={editingCountry}
            isOpen={isEditDialogOpen}
            onClose={closeEditDialog}
            onEdit={updateCountry}
          />
        </CardContent>
      </Card>
    </div>
  );
}
