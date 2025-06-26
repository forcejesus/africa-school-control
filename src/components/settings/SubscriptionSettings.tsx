
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Settings, Bell, Loader2, Crown, Users, Calendar, Trophy, Gift } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { motion } from "framer-motion";
import { SubscriptionService, ApiSubscription, UpdateSubscriptionData } from "@/services/subscriptionService";
import { useToast } from "@/hooks/use-toast";

export function SubscriptionSettings() {
  const [subscriptions, setSubscriptions] = useState<ApiSubscription[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingFree, setUpdatingFree] = useState<string | null>(null);
  const { t } = useI18n();
  const { toast } = useToast();
  const editFormRef = useRef<HTMLDivElement>(null);
  
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
      setUpdatingFree(subscriptionId);
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
    } finally {
      setUpdatingFree(null);
    }
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
      
      await loadSubscriptions();
      
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
              <span className="text-sm text-slate-500">({subscriptions.length} abonnements)</span>
            </div>
            <div className="grid gap-4">
              {subscriptions.map((subscription, index) => (
                <motion.div 
                  key={subscription._id} 
                  className={`border-2 rounded-xl p-6 space-y-4 transition-all duration-300 ${
                    subscription.free 
                      ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md' 
                      : 'border-orange-200 hover:shadow-card bg-white'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-xl text-slate-900">{subscription.nom}</h4>
                        {subscription.free && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full border border-green-200">
                            <Gift className="h-4 w-4" />
                            <span className="text-sm font-semibold">GRATUIT</span>
                          </div>
                        )}
                      </div>
                      <p className="text-slate-600">{subscription.description}</p>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-orange-500" />
                          <div>
                            <span className="text-slate-500 text-sm block">Prix</span>
                            <span className="font-bold text-lg text-orange-600">{subscription.prix.toLocaleString()} FCFA</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <div>
                            <span className="text-slate-500 text-sm block">Durée</span>
                            <span className="font-semibold text-slate-900">{subscription.dureeEnJours} jours</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-purple-500" />
                          <div>
                            <span className="text-slate-500 text-sm block">Jeux max</span>
                            <span className="font-semibold text-slate-900">{subscription.nombreJeuxMax}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-500" />
                          <div>
                            <span className="text-slate-500 text-sm block">Apprenants max</span>
                            <span className="font-semibold text-slate-900">{subscription.nombreApprenantsMax}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                        <div className="flex items-center gap-6">
                          <Label htmlFor={`free-${subscription._id}`} className="font-medium text-slate-700 text-base">
                            Abonnement gratuit par défaut
                          </Label>
                          <div className="flex items-center gap-3">
                            <Switch
                              id={`free-${subscription._id}`}
                              checked={subscription.free}
                              onCheckedChange={() => handleFreeToggle(subscription._id)}
                              disabled={updatingFree === subscription._id}
                              className="data-[state=checked]:bg-green-500 h-7 w-12 scale-110"
                            />
                            {updatingFree === subscription._id && (
                              <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                            )}
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-orange-200 hover:bg-orange-50"
                          onClick={() => handleSubscriptionSelect(subscription._id)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                      </div>
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
                    {subscription.nom} {subscription.free && "(Gratuit)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedSubscription && (
            <motion.div 
              ref={editFormRef}
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
