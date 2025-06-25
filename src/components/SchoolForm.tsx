
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { School } from "@/utils/data/types";
import { useToast } from "@/hooks/use-toast";
import { SchoolService, CreateSchoolData, CreateAdminData } from "@/services/schoolService";
import { SubscriptionService, ApiSubscription, ApiCountry } from "@/services/subscriptionService";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { FormStepper } from "./FormStepper";
import { SchoolInfoStep } from "./SchoolInfoStep";
import { AdminInfoStep } from "./AdminInfoStep";
import { ConfirmationStep } from "./ConfirmationStep";

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

  const stepTitles = [
    { title: "Informations de l'école", description: "Détails de l'établissement" },
    { title: "Administrateur", description: "Compte administrateur" },
    { title: "Confirmation", description: "Vérification des données" }
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SchoolInfoStep
            schoolData={schoolData}
            subscriptions={subscriptions}
            countries={countries}
            onSchoolChange={handleSchoolChange}
            onSchoolSelectChange={handleSchoolSelectChange}
          />
        );
      case 2:
        return (
          <AdminInfoStep
            adminData={adminData}
            onAdminChange={handleAdminChange}
            onAdminSelectChange={handleAdminSelectChange}
          />
        );
      case 3:
        return (
          <ConfirmationStep
            schoolData={schoolData}
            adminData={adminData}
          />
        );
      default:
        return null;
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
        <FormStepper currentStep={currentStep} />

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
                {stepTitles[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {stepTitles[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              {renderCurrentStep()}

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
