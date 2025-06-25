
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiSchool } from "@/services/schoolService";
import { SubscriptionService, ApiCountry } from "@/services/subscriptionService";

interface EditSchoolModalProps {
  school: ApiSchool | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (schoolData: any) => Promise<void>;
}

export function EditSchoolModal({ school, isOpen, onClose, onEdit }: EditSchoolModalProps) {
  const [formData, setFormData] = useState({
    libelle: "",
    ville: "",
    adresse: "",
    telephone: "",
    email: "",
    pays: ""
  });
  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (school) {
      setFormData({
        libelle: school.libelle,
        ville: school.ville,
        adresse: school.adresse,
        telephone: school.telephone,
        email: school.email,
        pays: school.pays._id
      });
    }
  }, [school]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await SubscriptionService.getCountries();
        if (response.success) {
          setCountries(response.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des pays:', error);
      }
    };

    if (isOpen) {
      fetchCountries();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.libelle.trim() || !formData.ville.trim() || !formData.adresse.trim() || 
        !formData.telephone.trim() || !formData.email.trim() || !formData.pays) {
      return;
    }

    setLoading(true);
    try {
      await onEdit(formData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-orange-700">Modifier l'école</DialogTitle>
          <DialogDescription>
            Modifiez les informations de base de l'école.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-school-name">Nom de l'école</Label>
            <Input
              id="edit-school-name"
              value={formData.libelle}
              onChange={(e) => handleInputChange('libelle', e.target.value)}
              className="text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-school-ville">Ville</Label>
            <Input
              id="edit-school-ville"
              value={formData.ville}
              onChange={(e) => handleInputChange('ville', e.target.value)}
              className="text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-school-address">Adresse</Label>
            <Input
              id="edit-school-address"
              value={formData.adresse}
              onChange={(e) => handleInputChange('adresse', e.target.value)}
              className="text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-school-phone">Téléphone</Label>
            <Input
              id="edit-school-phone"
              type="tel"
              value={formData.telephone}
              onChange={(e) => handleInputChange('telephone', e.target.value)}
              className="text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-school-email">E-mail</Label>
            <Input
              id="edit-school-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-school-country">Pays</Label>
            <Select value={formData.pays} onValueChange={(value) => handleInputChange('pays', value)}>
              <SelectTrigger className="text-base">
                <SelectValue placeholder="Sélectionner un pays" />
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

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              type="button"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {loading ? 'Modification...' : 'Modifier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
