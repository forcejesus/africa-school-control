
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { School } from "@/utils/data/types";
import { useToast } from "@/hooks/use-toast";
import { SchoolService, CreateSchoolData, CreateAdminData } from "@/services/schoolService";
import { SubscriptionService, ApiSubscription, ApiCountry } from "@/services/subscriptionService";
import { Loader2 } from "lucide-react";

interface SchoolFormProps {
  school?: School;
  isEditing?: boolean;
}

export function SchoolForm({ school, isEditing = false }: SchoolFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<ApiSubscription[]>([]);
  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  
  const [schoolData, setSchoolData] = useState({
    libelle: school?.name || "",
    adresse: school?.address || "",
    abonnementActuel: "",
    ville: "",
    telephone: school?.contactPhone || "",
    email: school?.contactEmail || "",
    fichier: "",
    pays: "",
  });

  const [adminData, setAdminData] = useState({
    nom: "",
    prenom: "",
    genre: "",
    phone: "",
    email: "",
    adresse: "",
    password: "",
    confirmPassword: "",
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const [subscriptionsResponse, countriesResponse] = await Promise.all([
          SubscriptionService.getSubscriptions(),
          SubscriptionService.getCountries()
        ]);
        
        if (subscriptionsResponse.success) {
          setSubscriptions(subscriptionsResponse.data);
        }
        
        if (countriesResponse.success) {
          setCountries(countriesResponse.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données nécessaires",
          variant: "destructive"
        });
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [toast]);
  
  const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchoolData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSchoolSelectChange = (field: string, value: string) => {
    setSchoolData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdminSelectChange = (field: string, value: string) => {
    setAdminData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des mots de passe
    if (adminData.password !== adminData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }

    if (adminData.password.length < 4) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 4 caractères",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Créer l'école
      const schoolPayload: CreateSchoolData = {
        ...schoolData
      };
      
      console.log("Création de l'école avec les données:", schoolPayload);
      const schoolResponse = await SchoolService.createSchool(schoolPayload);
      
      if (!schoolResponse.success) {
        throw new Error(schoolResponse.message || "Erreur lors de la création de l'école");
      }
      
      // Créer l'admin
      const adminPayload: CreateAdminData = {
        nom: adminData.nom,
        prenom: adminData.prenom,
        genre: adminData.genre,
        statut: "actif",
        phone: adminData.phone,
        email: adminData.email,
        adresse: adminData.adresse,
        role: "admin",
        password: adminData.password,
      };
      
      console.log("Création de l'admin avec les données:", adminPayload);
      const adminResponse = await SchoolService.createAdmin(adminPayload);
      
      if (!adminResponse.success) {
        console.warn("École créée mais erreur lors de la création de l'admin:", adminResponse.message);
      }
      
      toast({
        title: "Succès",
        description: `École "${schoolData.libelle}" créée avec succès`,
      });
      
      navigate("/schools");
      
    } catch (error: any) {
      console.error('Erreur lors de la création:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Chargement des données...</span>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations de l'école */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de l'école</CardTitle>
          <CardDescription>
            Remplissez les détails de l'école à créer.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="libelle">Nom de l'école</Label>
              <Input
                id="libelle"
                name="libelle"
                value={schoolData.libelle}
                onChange={handleSchoolChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ville">Ville</Label>
              <Input
                id="ville"
                name="ville"
                value={schoolData.ville}
                onChange={handleSchoolChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adresse">Adresse</Label>
              <Input
                id="adresse"
                name="adresse"
                value={schoolData.adresse}
                onChange={handleSchoolChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                name="telephone"
                value={schoolData.telephone}
                onChange={handleSchoolChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={schoolData.email}
                onChange={handleSchoolChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pays">Pays</Label>
              <Select 
                value={schoolData.pays} 
                onValueChange={(value) => handleSchoolSelectChange("pays", value)}
              >
                <SelectTrigger id="pays">
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
            
            <div className="space-y-2">
              <Label htmlFor="abonnementActuel">Abonnement</Label>
              <Select 
                value={schoolData.abonnementActuel} 
                onValueChange={(value) => handleSchoolSelectChange("abonnementActuel", value)}
              >
                <SelectTrigger id="abonnementActuel">
                  <SelectValue placeholder="Sélectionner un abonnement" />
                </SelectTrigger>
                <SelectContent>
                  {subscriptions.map((subscription) => (
                    <SelectItem key={subscription._id} value={subscription._id}>
                      {subscription.nom} - {subscription.prix} FCFA
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fichier">Logo de l'école (URL)</Label>
              <Input
                id="fichier"
                name="fichier"
                value={schoolData.fichier}
                onChange={handleSchoolChange}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations de l'administrateur */}
      <Card>
        <CardHeader>
          <CardTitle>Administrateur de l'école</CardTitle>
          <CardDescription>
            Créez le compte administrateur pour cette école.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                name="prenom"
                value={adminData.prenom}
                onChange={handleAdminChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                name="nom"
                value={adminData.nom}
                onChange={handleAdminChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select 
                value={adminData.genre} 
                onValueChange={(value) => handleAdminSelectChange("genre", value)}
              >
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Sélectionner le genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculin">Masculin</SelectItem>
                  <SelectItem value="Féminin">Féminin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminPhone">Téléphone</Label>
              <Input
                id="adminPhone"
                name="phone"
                value={adminData.phone}
                onChange={handleAdminChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email</Label>
              <Input
                id="adminEmail"
                name="email"
                type="email"
                value={adminData.email}
                onChange={handleAdminChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminAdresse">Adresse</Label>
              <Input
                id="adminAdresse"
                name="adresse"
                value={adminData.adresse}
                onChange={handleAdminChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={adminData.password}
                onChange={handleAdminChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={adminData.confirmPassword}
                onChange={handleAdminChange}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => navigate("/schools")}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création en cours...
              </>
            ) : (
              "Créer l'école"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default SchoolForm;
