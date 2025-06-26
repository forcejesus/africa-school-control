
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/contexts/I18nContext";
import { ProfileService, UserProfile, UpdateProfileData, Country } from "@/services/profileService";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function GeneralSettings() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    genre: "",
    phone: "",
    email: "",
    adresse: "",
    pays: ""
  });

  useEffect(() => {
    loadProfileAndCountries();
  }, []);

  const loadProfileAndCountries = async () => {
    try {
      setLoading(true);
      const [profileData, countriesData] = await Promise.all([
        ProfileService.getProfile(),
        ProfileService.getCountries()
      ]);
      
      setProfile(profileData);
      setCountries(countriesData);
      
      // Remplir le formulaire avec les données du profil
      setFormData({
        nom: profileData.nom || "",
        prenom: profileData.prenom || "",
        genre: profileData.genre || "",
        phone: profileData.phone || "",
        email: profileData.email || "",
        adresse: profileData.adresse || "",
        pays: profileData.pays?._id || ""
      });
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du profil",
        variant: "destructive",
      });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      const updateData: UpdateProfileData = {
        nom: formData.nom,
        prenom: formData.prenom,
        genre: formData.genre,
        phone: formData.phone,
        email: formData.email,
        adresse: formData.adresse,
        pays: formData.pays
      };

      await ProfileService.updateProfile(updateData);
      
      toast({
        title: "Succès",
        description: "Profil mis à jour avec succès",
      });
      
      // Recharger le profil pour afficher les nouvelles données
      await loadProfileAndCountries();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Chargement du profil...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.generalInfo')}</CardTitle>
        <CardDescription className="text-base">
          {t('settings.personalInfo')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom" className="text-base">Nom</Label>
              <Input 
                id="nom" 
                value={formData.nom}
                onChange={(e) => handleInputChange("nom", e.target.value)}
                className="text-base" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prenom" className="text-base">Prénom</Label>
              <Input 
                id="prenom" 
                value={formData.prenom}
                onChange={(e) => handleInputChange("prenom", e.target.value)}
                className="text-base" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-base">Genre</Label>
              <Select value={formData.genre} onValueChange={(value) => handleInputChange("genre", value)}>
                <SelectTrigger className="text-base">
                  <SelectValue placeholder="Sélectionner le genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculin">Masculin</SelectItem>
                  <SelectItem value="Feminin">Féminin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pays" className="text-base">Pays</Label>
              <Select value={formData.pays} onValueChange={(value) => handleInputChange("pays", value)}>
                <SelectTrigger className="text-base">
                  <SelectValue placeholder="Sélectionner le pays" />
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
              <Label htmlFor="phone" className="text-base">Téléphone</Label>
              <Input 
                id="phone" 
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="text-base" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="text-base" 
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="adresse" className="text-base">Adresse</Label>
            <Input 
              id="adresse" 
              value={formData.adresse}
              onChange={(e) => handleInputChange("adresse", e.target.value)}
              className="text-base" 
              required
            />
          </div>
          <div className="flex justify-end">
            <Button 
              type="submit" 
              size="lg" 
              className="text-base"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Sauvegarde...
                </>
              ) : (
                t('common.save')
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
