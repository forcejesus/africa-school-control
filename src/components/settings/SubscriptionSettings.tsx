import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { subscriptions } from "@/utils/data";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Settings, Bell } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { motion } from "framer-motion";

export function SubscriptionSettings() {
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("Standard");
  const [autoRenew, setAutoRenew] = useState(true);
  const { t } = useI18n();

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
                Consultez et mettez à jour les abonnements des écoles.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-slate-900">Liste des abonnements existants</h3>
            </div>
            <div className="grid gap-4">
              {subscriptions.map((subscription, index) => (
                <motion.div 
                  key={subscription.id} 
                  className="border border-orange-200 rounded-xl p-4 space-y-3 hover:shadow-card transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg text-slate-900">{subscription.schoolName}</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">{t('subscriptions.plan')}: </span>
                          <span className="font-medium text-slate-900">{subscription.plan}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">{t('subscriptions.status')}: </span>
                          <span className={`font-medium ${
                            subscription.status === 'active' ? 'text-emerald-600' : 
                            subscription.status === 'expired' ? 'text-red-600' : 'text-amber-600'
                          }`}>
                            {subscription.status}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-500">{t('subscriptions.price')}: </span>
                          <span className="font-semibold text-lg text-orange-600">{subscription.price}€</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Bell className="h-4 w-4" />
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
              onValueChange={setSelectedSubscription}
            >
              <SelectTrigger className="w-full text-base border-orange-200 focus:border-orange-400">
                <SelectValue placeholder="Sélectionner un abonnement" />
              </SelectTrigger>
              <SelectContent>
                {subscriptions.map(subscription => (
                  <SelectItem 
                    key={subscription.id} 
                    value={subscription.id}
                    className="text-base"
                  >
                    {subscription.schoolName} - {subscription.plan}
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
            
              <div className="space-y-2">
                <Label htmlFor="subscription-plan" className="text-base">Formule</Label>
                <Select 
                  value={subscriptionPlan} 
                  onValueChange={setSubscriptionPlan}
                >
                  <SelectTrigger id="subscription-plan" className="w-full text-base">
                    <SelectValue placeholder="Sélectionner une formule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Démarrage" className="text-base">Démarrage</SelectItem>
                    <SelectItem value="Standard" className="text-base">Standard</SelectItem>
                    <SelectItem value="Premium" className="text-base">Premium</SelectItem>
                    <SelectItem value="Enterprise" className="text-base">Entreprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date" className="text-base">{t('subscriptions.startDate')}</Label>
                  <Input 
                    id="start-date" 
                    type="date" 
                    className="text-base"
                    defaultValue={subscriptions.find(s => s.id === selectedSubscription)?.startDate}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date" className="text-base">{t('subscriptions.expiryDate')}</Label>
                  <Input 
                    id="end-date" 
                    type="date" 
                    className="text-base"
                    defaultValue={subscriptions.find(s => s.id === selectedSubscription)?.expiryDate}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-base">{t('subscriptions.price')} (€)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    className="text-base"
                    defaultValue={subscriptions.find(s => s.id === selectedSubscription)?.price}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-base">{t('subscriptions.status')}</Label>
                  <Select defaultValue={subscriptions.find(s => s.id === selectedSubscription)?.status || "active"}>
                    <SelectTrigger id="status" className="w-full text-base">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active" className="text-base">{t('subscriptions.active')}</SelectItem>
                      <SelectItem value="pending" className="text-base">{t('subscriptions.pending')}</SelectItem>
                      <SelectItem value="expired" className="text-base">{t('subscriptions.expired')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Switch 
                  id="auto-renew" 
                  checked={autoRenew} 
                  onCheckedChange={setAutoRenew}
                />
                <Label htmlFor="auto-renew" className="text-base">{t('subscriptions.autoRenew')}</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="text-base">{t('common.cancel')}</Button>
                <Button className="text-base">{t('subscriptions.update')}</Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
