
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ApiSubscription } from "@/services/subscriptionService";

interface SubscriptionSelectorProps {
  subscriptions: ApiSubscription[];
  selectedSubscription: string;
  onSelect: (subscriptionId: string) => void;
}

export function SubscriptionSelector({ subscriptions, selectedSubscription, onSelect }: SubscriptionSelectorProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="selected-subscription" className="text-base font-medium text-slate-900">
        Modifier un abonnement
      </Label>
      
      <Select 
        value={selectedSubscription} 
        onValueChange={onSelect}
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
  );
}
