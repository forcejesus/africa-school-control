
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
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
import { Loader2, School as SchoolIcon, User, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SchoolFormProps {
  school?: School;
  isEditing?: boolean;
}

export function SchoolForm({ school, isEditing = false }: SchoolFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<ApiSubscription[]>([]);
  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  
  const [schoolData, setSchoolData] = useState({
    libelle: school?.name || "",
    adresse: "",
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

  const steps = [
    {
      id: 1,
      title: "Informations de l'école",
      description: "Détails de l'établissement",
      icon: SchoolIcon
    },
    {
      id: 2,
      title: "Administrateur",
      description: "Compte administrateur",
      icon: User
    },
    {
      id: 3,
      title: "Confirmation",
      description: "Vérification des données",
      icon: CheckCircle
    }
  ];
  
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

  const validateStep = (step: number) => {
    if (step === 1) {
      return schoolData.libelle && schoolData.ville && schoolData.adresse && 
             schoolData.telephone && schoolData.email && schoolData.pays && 
             schoolData.abonnementActuel;
    }
    if (step === 2) {
      return adminData.nom && adminData.prenom && adminData.genre && 
             adminData.phone && adminData.email && adminData.adresse && 
             adminData.password && adminData.confirmPassword &&
             adminData.password === adminData.confirmPassword &&
             adminData.password.length >= 4;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = async () => {
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
      
      const schoolPayload: CreateSchoolData = { ...schoolData };
      const schoolResponse = await SchoolService.createSchool(schoolPayload);
      
      if (!schoolResponse.success) {
        throw new Error(schoolResponse.message || "Erreur lors de la création de l'école");
      }
      
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-lg font-medium">Chargement des données...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Créer une nouvelle école</h1>
          <p className="text-gray-600">Suivez les étapes pour ajouter une école à la plateforme</p>
        </motion.div>

        {/* Stepper */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`font-medium ${currentStep >= step.id ? 'text-primary' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
              <CardTitle className="text-xl text-gray-900">
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {steps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="libelle" className="text-sm font-medium text-gray-700">Nom de l'école *</Label>
                    <Input
                      id="libelle"
                      name="libelle"
                      value={schoolData.libelle}
                      onChange={handleSchoolChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Entrez le nom de l'école"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ville" className="text-sm font-medium text-gray-700">Ville *</Label>
                    <Input
                      id="ville"
                      name="ville"
                      value={schoolData.ville}
                      onChange={handleSchoolChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Entrez la ville"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="adresse" className="text-sm font-medium text-gray-700">Adresse *</Label>
                    <Input
                      id="adresse"
                      name="adresse"
                      value={schoolData.adresse}
                      onChange={handleSchoolChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Entrez l'adresse complète"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telephone" className="text-sm font-medium text-gray-700">Téléphone *</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      value={schoolData.telephone}
                      onChange={handleSchoolChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Entrez le numéro de téléphone"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={schoolData.email}
                      onChange={handleSchoolChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Entrez l'adresse email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pays" className="text-sm font-medium text-gray-700">Pays *</Label>
                    <Select 
                      value={schoolData.pays} 
                      onValueChange={(value) => handleSchoolSelectChange("pays", value)}
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20">
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
                    <Label htmlFor="abonnementActuel" className="text-sm font-medium text-gray-700">Abonnement *</Label>
                    <Select 
                      value={schoolData.abonnementActuel} 
                      onValueChange={(value) => handleSchoolSelectChange("abonnementActuel", value)}
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20">
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
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fichier" className="text-sm font-medium text-gray-700">Logo de l'école</Label>
                    <Input
                      id="fichier"
                      name="fichier"
                      value={schoolData.fichier}
                      onChange={handleSchoolChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="URL du logo (optionnel)"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="prenom" className="text-sm font-medium text-gray-700">Prénom *</Label>
                    <Input
                      id="prenom"
                      name="prenom"
                      value={adminData.prenom}
                      onChange={handleAdminChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Entrez le prénom"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nom" className="text-sm font-medium text-gray-700">Nom *</Label>
                    <Input
                      id="nom"
                      name="nom"
                      value={adminData.nom}
                      onChange={handleAdminChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Entrez le nom"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="genre" className="text-sm font-medium text-gray-700">Genre *</Label>
                    <Select 
                      value={adminData.genre} 
                      onValueChange={(value) => handleAdminSelectChange("genre", value)}
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20">
                        <SelectValue placeholder="Sélectionner le genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masculin">Masculin</SelectItem>
                        <SelectItem value="Féminin">Féminin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminPhone" className="text-sm font-medium text-gray-700">Téléphone *</Label>
                    <Input
                      id="adminPhone"
                      name="phone"
                      value={adminData.phone}
                      onChange={handleAdminChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Entrez le numéro de téléphone"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="adminEmail" className="text-sm font-medium text-gray-700">Email *</Label>
                    <Input
                      id="adminEmail"
                      name="email"
                      type="email"
                      value={adminData.email}
                      onChange={handleAdminChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Entrez l'adresse email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="adminAdresse" className="text-sm font-medium text-gray-700">Adresse *</Label>
                    <Input
                      id="adminAdresse"
                      name="adresse"
                      value={adminData.adresse}
                      onChange={handleAdminChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Entrez l'adresse"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">Mot de passe *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={adminData.password}
                      onChange={handleAdminChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Entrez le mot de passe (min 4 caractères)"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmer le mot de passe *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={adminData.confirmPassword}
                      onChange={handleAdminChange}
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                      placeholder="Confirmez le mot de passe"
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4 text-gray-900">Récapitulatif de l'école</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div><span className="font-medium">Nom:</span> {schoolData.libelle}</div>
                      <div><span className="font-medium">Ville:</span> {schoolData.ville}</div>
                      <div className="md:col-span-2"><span className="font-medium">Adresse:</span> {schoolData.adresse}</div>
                      <div><span className="font-medium">Téléphone:</span> {schoolData.telephone}</div>
                      <div><span className="font-medium">Email:</span> {schoolData.email}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4 text-gray-900">Récapitulatif de l'administrateur</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div><span className="font-medium">Nom complet:</span> {adminData.prenom} {adminData.nom}</div>
                      <div><span className="font-medium">Genre:</span> {adminData.genre}</div>
                      <div><span className="font-medium">Téléphone:</span> {adminData.phone}</div>
                      <div><span className="font-medium">Email:</span> {adminData.email}</div>
                      <div className="md:col-span-2"><span className="font-medium">Adresse:</span> {adminData.adresse}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={currentStep === 1 ? () => navigate("/schools") : prevStep}
                  className="px-6"
                >
                  {currentStep === 1 ? "Annuler" : "Précédent"}
                </Button>
                
                {currentStep < 3 ? (
                  <Button 
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className="px-6"
                  >
                    Suivant
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création en cours...
                      </>
                    ) : (
                      "Créer l'école"
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default SchoolForm;
