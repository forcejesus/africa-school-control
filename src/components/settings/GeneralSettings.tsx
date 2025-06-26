
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";
import { AuthService, UserProfile, UpdateProfileData } from "@/services/authService";
import { SubscriptionService, ApiCountry } from "@/services/subscriptionService";

export function GeneralSettings() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<UpdateProfileData>({
    nom: "",
    prenom: "",
    genre: "",
    phone: "",
    email: "",
    adresse: "",
    pays: ""
  });

  const fetchProfile = async () => {
    try {
      const response = await AuthService.getProfile();
      if (response.success) {
        setProfile(response.data);
        setFormData({
          nom: response.data.nom,
          prenom: response.data.prenom,
          genre: response.data.genre,
          phone: response.data.phone,
          email: response.data.email,
          adresse: response.data.adresse,
          pays: response.data.pays._id
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le profil",
        variant: "destructive",
      });
    }
  };

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

  const handleInputChange = (field: keyof UpdateProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await AuthService.updateProfile(formData);
      if (response.success) {
        toast({
          title: "Succès",
          description: "Profil mis à jour avec succès",
        });
        fetchProfile(); // Recharger le profil
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProfile(), fetchCountries()]);
      setLoading(false);
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.generalInfo')}</CardTitle>
          <CardDescription className="text-base">
            {t('settings.personalInfo')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Chargement du profil...</p>
            </div>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom" className="text-base">Nom</Label>
              <Input 
                id="nom" 
                value={formData.nom}
                onChange={(e) => handleInputChange('nom', e.target.value)}
                className="text-base h-11" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prenom" className="text-base">Prénom</Label>
              <Input 
                id="prenom" 
                value={formData.prenom}
                onChange={(e) => handleInputChange('prenom', e.target.value)}
                className="text-base h-11" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-base">Genre</Label>
              <Select value={formData.genre} onValueChange={(value) => handleInputChange('genre', value)}>
                <SelectTrigger className="text-base h-11">
                  <SelectValue placeholder="Sélectionnez le genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculin">Masculin</SelectItem>
                  <SelectItem value="Feminin">Féminin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pays" className="text-base">Pays</Label>
              <Select value={formData.pays} onValueChange={(value) => handleInputChange('pays', value)}>
                <SelectTrigger className="text-base h-11">
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
              <Label htmlFor="phone" className="text-base">Téléphone</Label>
              <Input 
                id="phone" 
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="text-base h-11" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="text-base h-11" 
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="adresse" className="text-base">Adresse</Label>
            <Input 
              id="adresse" 
              value={formData.adresse}
              onChange={(e) => handleInputChange('adresse', e.target.value)}
              className="text-base h-11" 
              required
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              size="lg" 
              className="text-base min-h-[44px]"
              disabled={saving}
            >
              {saving ? "Sauvegarde..." : t('common.save')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
