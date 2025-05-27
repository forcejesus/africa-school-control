
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
import { Edit, Trash2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export function SubscriptionSettings() {
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("Standard");
  const [autoRenew, setAutoRenew] = useState(true);
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('subscriptions.management')}</CardTitle>
        <CardDescription className="text-base">
          Consultez et mettez à jour les abonnements des écoles.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Liste des abonnements existants</h3>
          <div className="grid gap-4">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{subscription.schoolName}</h4>
                    <p className="text-sm text-muted-foreground">{t('subscriptions.plan')}: {subscription.plan}</p>
                    <p className="text-sm text-muted-foreground">{t('subscriptions.status')}: {subscription.status}</p>
                    <p className="text-sm text-muted-foreground">{t('subscriptions.price')}: {subscription.price}€</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label htmlFor="selected-subscription" className="text-base">Modifier un abonnement</Label>
          
          <Select 
            value={selectedSubscription} 
            onValueChange={setSelectedSubscription}
          >
            <SelectTrigger className="w-full text-base">
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
          <div className="space-y-4 border p-4 rounded-md">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
