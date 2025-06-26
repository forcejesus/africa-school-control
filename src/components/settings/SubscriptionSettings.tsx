
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Settings, Bell, Loader2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { motion } from "framer-motion";
import { SubscriptionService, ApiSubscription, UpdateSubscriptionData } from "@/services/subscriptionService";
import { useToast } from "@/hooks/use-toast";

export function SubscriptionSettings() {
  const [subscriptions, setSubscriptions] = useState<ApiSubscription[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { t } = useI18n();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nom: "",
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
        prix: subscription.prix,
        dureeEnJours: subscription.dureeEnJours,
        nombreJeuxMax: subscription.nombreJeuxMax
      });
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSubscription) return;

    try {
      setSaving(true);
      
      const updateData: UpdateSubscriptionData = {
        nom: formData.nom,
        prix: formData.prix,
        dureeEnJours: formData.dureeEnJours,
        nombreJeuxMax: formData.nombreJeuxMax
      };

      await SubscriptionService.updateSubscription(selectedSubscription, updateData);
      
      toast({
        title: "Succès",
        description: "Abonnement mis à jour avec succès",
      });
      
      // Recharger la liste des abonnements
      await loadSubscriptions();
      
      // Réinitialiser la sélection
      setSelectedSubscription("");
      setFormData({
        nom: "",
        prix: 0,
        dureeEnJours: 0,
        nombreJeuxMax: 0
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'abonnement",
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
            </div>
            <div className="grid gap-4">
              {subscriptions.map((subscription, index) => (
                <motion.div 
                  key={subscription._id} 
                  className="border border-orange-200 rounded-xl p-4 space-y-3 hover:shadow-card transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg text-slate-900">{subscription.nom}</h4>
                      <p className="text-sm text-slate-600">{subscription.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Prix: </span>
                          <span className="font-semibold text-lg text-orange-600">{subscription.prix.toLocaleString()} FCFA</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Durée: </span>
                          <span className="font-medium text-slate-900">{subscription.dureeEnJours} jours</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Jeux max: </span>
                          <span className="font-medium text-slate-900">{subscription.nombreJeuxMax}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Apprenants max: </span>
                          <span className="font-medium text-slate-900">{subscription.nombreApprenantsMax}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-orange-200 hover:bg-orange-50"
                        onClick={() => handleSubscriptionSelect(subscription._id)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <Separator className="bg-orange-200" />
          
          <div className="space-y-3">
            <Label htmlFor="selected-subscription" className="text-base font-medium text-slate-900">
              Modifier un abonnement
            </Label>
            
            <Select 
              value={selectedSubscription} 
              onValueChange={handleSubscriptionSelect}
            >
              <SelectTrigger className="w-full text-base border-orange-200 focus:border-orange-400">
                <SelectValue placeholder="Sélectionner un abonnement" />
              </SelectTrigger>
              <SelectContent>
                {subscriptions.map(subscription => (
                  <SelectItem 
                    key={subscription._id} 
                    value={subscription._id}
                    className="text-base"
                  >
                    {subscription.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedSubscription && (
            <motion.div 
              className="space-y-4 border border-orange-200 p-6 rounded-xl bg-gradient-to-br from-orange-50/50 to-amber-50/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-medium">Détails de l'abonnement</h3>
            
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
                    <Label htmlFor="prix" className="text-base">Prix (FCFA)</Label>
                    <Input 
                      id="prix" 
                      type="number"
                      value={formData.prix}
                      onChange={(e) => handleInputChange("prix", parseInt(e.target.value) || 0)}
                      className="text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dureeEnJours" className="text-base">Durée (jours)</Label>
                    <Input 
                      id="dureeEnJours" 
                      type="number"
                      value={formData.dureeEnJours}
                      onChange={(e) => handleInputChange("dureeEnJours", parseInt(e.target.value) || 0)}
                      className="text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nombreJeuxMax" className="text-base">Nombre de jeux max</Label>
                    <Input 
                      id="nombreJeuxMax" 
                      type="number"
                      value={formData.nombreJeuxMax}
                      onChange={(e) => handleInputChange("nombreJeuxMax", parseInt(e.target.value) || 0)}
                      className="text-base"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="text-base"
                    onClick={() => {
                      setSelectedSubscription("");
                      setFormData({ nom: "", prix: 0, dureeEnJours: 0, nombreJeuxMax: 0 });
                    }}
                  >
                    {t('common.cancel')}
                  </Button>
                  <Button 
                    type="submit"
                    className="text-base"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Sauvegarde...
                      </>
                    ) : (
                      t('subscriptions.update')
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
