
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
import { Loader2, GraduationCap, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { FormStepper } from "./FormStepper";
import { SchoolInfoStep } from "./SchoolInfoStep";
import { AdminInfoStep } from "./AdminInfoStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { useI18n } from "@/contexts/I18nContext";
import Swal from 'sweetalert2';

interface SchoolFormProps {
  school?: School;
  isEditing?: boolean;
}

export function SchoolForm({ school, isEditing = false }: SchoolFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useI18n();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<ApiSubscription[]>([]);
  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [createdSchoolId, setCreatedSchoolId] = useState<string | null>(null);
  
  const [schoolData, setSchoolData] = useState({
    libelle: school?.name || "",
    adresse: "",
    abonnementActuel: "",
    ville: "",
    telephone: school?.contactPhone || "",
    email: school?.contactEmail || "",
    fichier: "aucune image",
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
    { title: t('schools.schoolInfo'), description: t('schools.schoolDetails') },
    { title: t('schools.adminInfo'), description: t('schools.adminAccount') },
    { title: t('schools.confirmation'), description: t('schools.dataVerification') }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        console.log('Fetching subscriptions and countries...');
        
        const [subscriptionsResponse, countriesResponse] = await Promise.all([
          SubscriptionService.getSubscriptions(),
          SubscriptionService.getCountries()
        ]);
        
        console.log('Subscriptions response:', subscriptionsResponse);
        console.log('Countries response:', countriesResponse);
        
        if (subscriptionsResponse.success) {
          setSubscriptions(subscriptionsResponse.data);
        } else {
          console.error('Erreur subscriptions:', subscriptionsResponse.message);
        }
        
        if (countriesResponse.success) {
          setCountries(countriesResponse.data);
        } else {
          console.error('Erreur countries:', countriesResponse.message);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        await Swal.fire({
          title: t('alerts.error'),
          text: "Impossible de charger les données nécessaires",
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ea580c'
        });
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [toast, t]);
  
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

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      const isValid = Boolean(
        schoolData.libelle && 
        schoolData.ville && 
        schoolData.adresse && 
        schoolData.telephone && 
        schoolData.email && 
        schoolData.pays && 
        schoolData.abonnementActuel
      );
      console.log('Step 1 validation:', isValid, schoolData);
      return isValid;
    }
    if (step === 2) {
      const isValid = Boolean(
        adminData.nom && 
        adminData.prenom && 
        adminData.genre && 
        adminData.phone && 
        adminData.email && 
        adminData.adresse && 
        adminData.password && 
        adminData.confirmPassword &&
        adminData.password === adminData.confirmPassword &&
        adminData.password.length >= 4
      );
      console.log('Step 2 validation:', isValid, adminData);
      return isValid;
    }
    return true;
  };

  const createSchool = async () => {
    if (!validateStep(1)) {
      await Swal.fire({
        title: t('alerts.error'),
        text: "Veuillez remplir tous les champs obligatoires de l'école",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ea580c'
      });
      return false;
    }

    try {
      setLoading(true);
      console.log('Creating school with data:', schoolData);
      
      const schoolPayload: CreateSchoolData = { 
        ...schoolData,
        fichier: "aucune image"
      };
      const schoolResponse = await SchoolService.createSchool(schoolPayload);
      
      console.log('School creation response:', schoolResponse);
      
      if (!schoolResponse.success) {
        throw new Error(schoolResponse.message || "Erreur lors de la création de l'école");
      }
      
      const schoolId = schoolResponse.data?._id;
      if (!schoolId) {
        throw new Error("ID de l'école non trouvé dans la réponse");
      }
      
      setCreatedSchoolId(schoolId);
      console.log('School created with ID:', schoolId);
      
      await Swal.fire({
        title: t('alerts.success'),
        text: `L'école "${schoolData.libelle}" a été créée avec succès`,
        icon: 'success',
        confirmButtonText: 'Continuer',
        confirmButtonColor: '#ea580c'
      });
      
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'école:', error);
      await Swal.fire({
        title: t('alerts.error'),
        text: error.message || "Une erreur est survenue lors de la création de l'école",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ea580c'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    console.log('Next step clicked, current step:', currentStep);
    
    if (currentStep === 1) {
      // Créer l'école avant de passer à l'étape suivante
      const success = await createSchool();
      if (success) {
        setCurrentStep(2);
      }
    } else if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      await Swal.fire({
        title: t('alerts.error'),
        text: "Veuillez remplir tous les champs obligatoires",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ea580c'
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = async () => {
    if (!createdSchoolId) {
      await Swal.fire({
        title: t('alerts.error'),
        text: "L'école doit être créée avant de créer l'administrateur",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    if (adminData.password !== adminData.confirmPassword) {
      await Swal.fire({
        title: t('alerts.error'),
        text: "Les mots de passe ne correspondent pas",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    if (adminData.password.length < 4) {
      await Swal.fire({
        title: t('alerts.error'),
        text: "Le mot de passe doit contenir au moins 4 caractères",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ea580c'
      });
      return;
    }
    
    try {
      setLoading(true);
      console.log('Creating admin for school ID:', createdSchoolId);
      
      // Créer l'administrateur avec l'ID de l'école créée
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
        ecole: createdSchoolId,
      };
      
      console.log('Admin payload:', adminPayload);
      const adminResponse = await SchoolService.createAdmin(adminPayload);
      console.log('Admin creation response:', adminResponse);
      
      if (!adminResponse.success) {
        console.warn("École créée mais erreur lors de la création de l'admin:", adminResponse.message);
        await Swal.fire({
          title: t('alerts.warning'),
          text: "École créée mais erreur lors de la création de l'administrateur",
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ea580c'
        });
      } else {
        await Swal.fire({
          title: t('alerts.success'),
          text: "École et administrateur créés avec succès",
          icon: 'success',
          confirmButtonText: 'Aller à la liste',
          confirmButtonColor: '#ea580c'
        });
      }
      
      navigate("/ecoles");
      
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'admin:', error);
      await Swal.fire({
        title: t('alerts.error'),
        text: error.message || "Une erreur est survenue lors de la création de l'administrateur",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ea580c'
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
          <span className="text-lg font-medium text-gray-700">Chargement des données...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-orange-600 to-orange-700 p-4 rounded-full">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-3">
            {t('schools.createSchool')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Suivez les étapes pour ajouter une école à la plateforme
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <GraduationCap className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-gray-500">Étape {currentStep} sur 3</span>
          </div>
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
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-100">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <div className="h-2 w-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                {stepTitles[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {stepTitles[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  onClick={currentStep === 1 ? () => navigate("/ecoles") : prevStep}
                  className="px-6 border-orange-200 hover:bg-orange-50"
                  disabled={loading}
                >
                  {currentStep === 1 ? t('common.cancel') : t('common.previous')}
                </Button>
                
                {currentStep < 3 ? (
                  <Button 
                    onClick={nextStep}
                    disabled={loading || (currentStep === 1 && !validateStep(1))}
                    className="px-6 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {currentStep === 1 ? "Création de l'école..." : "Chargement..."}
                      </>
                    ) : (
                      t('common.next')
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création de l'admin...
                      </>
                    ) : (
                      "Créer l'administrateur"
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
