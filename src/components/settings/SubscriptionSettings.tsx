
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Loader2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { motion } from "framer-motion";
import { SubscriptionService, ApiSubscription } from "@/services/subscriptionService";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionCard } from "./subscription/SubscriptionCard";
import { SubscriptionSelector } from "./subscription/SubscriptionSelector";
import { SubscriptionEditForm } from "./subscription/SubscriptionEditForm";

export function SubscriptionSettings() {
  const [subscriptions, setSubscriptions] = useState<ApiSubscription[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();
  const { toast } = useToast();
  const editFormRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: 0,
    dureeEnJours: 0,
    nombreJeuxMax: 0
  });

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await SubscriptionService.getSubscriptions();
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des abonnements:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les abonnements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionSelect = (subscriptionId: string) => {
    setSelectedSubscription(subscriptionId);
    const subscription = subscriptions.find(s => s._id === subscriptionId);
    if (subscription) {
      setFormData({
        nom: subscription.nom,
        description: subscription.description || "",
        prix: subscription.prix,
        dureeEnJours: subscription.dureeEnJours,
        nombreJeuxMax: subscription.nombreJeuxMax
      });
      
      // Scroll automatique vers le formulaire de modification
      setTimeout(() => {
        editFormRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFreeToggle = async (subscriptionId: string) => {
    try {
      await SubscriptionService.setFreeSubscription(subscriptionId);
      
      toast({
        title: "Succès",
        description: "Statut gratuit mis à jour avec succès",
      });
      
      await loadSubscriptions();
    } catch (error) {
      console.error('Erreur lors de la modification du statut gratuit:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut gratuit",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleFormSuccess = async () => {
    await loadSubscriptions();
    setSelectedSubscription("");
    setFormData({
      nom: "",
      description: "",
      prix: 0,
      dureeEnJours: 0,
      nombreJeuxMax: 0
    });
  };

  const handleFormCancel = () => {
    setSelectedSubscription("");
    setFormData({
      nom: "",
      description: "",
      prix: 0,
      dureeEnJours: 0,
      nombreJeuxMax: 0
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Chargement des abonnements...
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="modern-card border-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-slate-900">{t('subscriptions.management')}</CardTitle>
              <CardDescription className="text-base text-slate-600">
                Consultez et mettez à jour les abonnements disponibles.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-slate-900">Liste des abonnements disponibles</h3>
              <span className="text-sm text-slate-500">({subscriptions.length} abonnements)</span>
            </div>
            <div className="grid gap-4">
              {subscriptions.map((subscription, index) => (
                <SubscriptionCard
                  key={subscription._id}
                  subscription={subscription}
                  index={index}
                  onEdit={handleSubscriptionSelect}
                  onFreeToggle={handleFreeToggle}
                />
              ))}
            </div>
          </div>
          
          <Separator className="bg-orange-200" />
          
          <SubscriptionSelector
            subscriptions={subscriptions}
            selectedSubscription={selectedSubscription}
            onSelect={handleSubscriptionSelect}
          />
          
          <div ref={editFormRef}>
            <SubscriptionEditForm
              selectedSubscription={selectedSubscription}
              formData={formData}
              onFormDataChange={handleInputChange}
              onCancel={handleFormCancel}
              onSuccess={handleFormSuccess}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
