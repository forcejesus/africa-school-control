
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SchoolService, CreateSchoolData, CreateAdminData } from "@/services/schoolService";
import { SubscriptionService, ApiSubscription, ApiCountry } from "@/services/subscriptionService";
import { School } from "@/utils/data/types";

interface SchoolFormData {
  libelle: string;
  adresse: string;
  abonnementActuel: string;
  ville: string;
  telephone: string;
  email: string;
  fichier: string;
  pays: string;
}

interface AdminFormData {
  nom: string;
  prenom: string;
  genre: string;
  phone: string;
  email: string;
  adresse: string;
  password: string;
  confirmPassword: string;
}

export function useSchoolForm(school?: School) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<ApiSubscription[]>([]);
  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [createdSchoolId, setCreatedSchoolId] = useState<string | null>(null);
  
  const [schoolData, setSchoolData] = useState<SchoolFormData>({
    libelle: school?.name || "",
    adresse: "",
    abonnementActuel: "",
    ville: "",
    telephone: school?.contactPhone || "",
    email: school?.contactEmail || "",
    fichier: "",
    pays: "",
  });

  const [adminData, setAdminData] = useState<AdminFormData>({
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

  const nextStep = async () => {
    if (currentStep === 1) {
      if (validateStep(currentStep)) {
        try {
          setLoading(true);
          const schoolPayload: CreateSchoolData = { ...schoolData };
          const schoolResponse = await SchoolService.createSchool(schoolPayload);
          
          if (!schoolResponse.success) {
            throw new Error(schoolResponse.message || "Erreur lors de la création de l'école");
          }
          
          setCreatedSchoolId(schoolResponse.data._id);
          
          toast({
            title: "École créée",
            description: `L'école "${schoolData.libelle}" a été créée avec succès`,
          });
          
          setCurrentStep(2);
        } catch (error: any) {
          console.error('Erreur lors de la création de l\'école:', error);
          toast({
            title: "Erreur",
            description: error.message || "Une erreur est survenue lors de la création de l'école",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      } else {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs obligatoires",
          variant: "destructive"
        });
      }
    } else if (validateStep(currentStep)) {
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
    if (!createdSchoolId) {
      toast({
        title: "Erreur",
        description: "Aucune école créée trouvée",
        variant: "destructive"
      });
      return;
    }

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
      
      const adminResponse = await SchoolService.createAdmin(adminPayload);
      
      if (!adminResponse.success) {
        console.warn("École créée mais erreur lors de la création de l'admin:", adminResponse.message);
        toast({
          title: "Attention",
          description: "École créée mais erreur lors de la création de l'administrateur",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Succès complet",
          description: "École et administrateur créés avec succès",
        });
      }
      
      navigate("/schools");
      
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'admin:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création de l'administrateur",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    currentStep,
    loading,
    loadingData,
    subscriptions,
    countries,
    schoolData,
    adminData,
    handleSchoolChange,
    handleAdminChange,
    handleSchoolSelectChange,
    handleAdminSelectChange,
    validateStep,
    nextStep,
    prevStep,
    handleSubmit,
    navigate
  };
}
