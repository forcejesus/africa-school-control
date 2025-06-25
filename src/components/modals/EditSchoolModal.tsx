
import { useState, useEffect } from "react";
import { ApiSchool, SchoolService, UpdateSchoolData } from "@/services/schoolService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { buildApiUrl } from "@/config/hosts";
import { AuthService } from "@/services/authService";

interface Country {
  _id: string;
  libelle: string;
}

interface Admin {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
}

interface EditSchoolModalProps {
  school: ApiSchool | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditSchoolModal({ school, isOpen, onClose, onSuccess }: EditSchoolModalProps) {
  const [formData, setFormData] = useState<UpdateSchoolData>({
    libelle: "",
    adresse: "",
    ville: "",
    telephone: "",
    email: "",
    fichier: "",
    admin: "",
    pays: "",
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (school && isOpen) {
      setFormData({
        libelle: school.libelle,
        adresse: school.adresse,
        ville: school.ville,
        telephone: school.telephone,
        email: school.email,
        fichier: school.fichier,
        admin: school.admin?._id || "",
        pays: school.pays._id,
      });
      fetchInitialData();
    }
  }, [school, isOpen]);

  const fetchInitialData = async () => {
    try {
      setLoadingData(true);
      const headers = {
        'Content-Type': 'application/json',
        ...AuthService.getAuthHeaders(),
      };

      // Fetch countries
      const countriesResponse = await fetch(buildApiUrl('/api/pays'), {
        method: 'GET',
        headers,
      });

      if (countriesResponse.ok) {
        const countriesData = await countriesResponse.json();
        if (countriesData.success) {
          setCountries(countriesData.data);
        }
      }

      // Fetch admins (assuming there's an endpoint for this)
      const adminsResponse = await fetch(buildApiUrl('/api/admin'), {
        method: 'GET',
        headers,
      });

      if (adminsResponse.ok) {
        const adminsData = await adminsResponse.json();
        if (adminsData.success) {
          setAdmins(adminsData.data || []);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!school) return;

    try {
      setLoading(true);
      await SchoolService.updateSchool(school._id, formData);
      
      toast({
        title: "Succès",
        description: "École mise à jour avec succès",
      });
      
      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour l'école",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UpdateSchoolData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-700">
            Modifier l'école
          </DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'école "{school?.libelle}"
          </DialogDescription>
        </DialogHeader>

        {loadingData ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p>Chargement des données...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="libelle">Nom de l'école *</Label>
                <Input
                  id="libelle"
                  value={formData.libelle}
                  onChange={(e) => handleInputChange('libelle', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ville">Ville *</Label>
                <Input
                  id="ville"
                  value={formData.ville}
                  onChange={(e) => handleInputChange('ville', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="adresse">Adresse *</Label>
                <Input
                  id="adresse"
                  value={formData.adresse}
                  onChange={(e) => handleInputChange('adresse', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone *</Label>
                <Input
                  id="telephone"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pays">Pays *</Label>
                <Select value={formData.pays} onValueChange={(value) => handleInputChange('pays', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un pays" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country._id} value={country._id}>
                        {country.libelle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin">Administrateur</Label>
                <Select value={formData.admin} onValueChange={(value) => handleInputChange('admin', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un administrateur" />
                  </SelectTrigger>
                  <SelectContent>
                    {admins.map((admin) => (
                      <SelectItem key={admin._id} value={admin._id}>
                        {admin.prenom} {admin.nom} ({admin.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="fichier">Chemin vers l'image</Label>
                <Input
                  id="fichier"
                  value={formData.fichier}
                  onChange={(e) => handleInputChange('fichier', e.target.value)}
                  placeholder="Chemin vers l'image"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {loading ? "Mise à jour..." : "Mettre à jour"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
