
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Subscription } from "@/utils/data/types";
import { Calendar } from "lucide-react";

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const { plan, startDate, expiryDate, status, price, currency = "EUR", autoRenew } = subscription;

  // Calculate days remaining
  const today = new Date();
  const end = new Date(expiryDate);
  const daysRemaining = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Determine badge styles based on status
  const getBadgeVariant = () => {
    switch (status) {
      case 'active': return 'success';
      case 'expired': return 'destructive';
      default: return 'default';
    }
  };

  // Determine plan badge colors
  const getPlanColor = () => {
    switch (plan.toLowerCase()) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-violet-100 text-violet-800';
      case 'enterprise': return 'bg-amber-100 text-amber-800';
      case 'standard': return 'bg-green-100 text-green-800';
      case 'démarrage': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-lg">
          <span className={`px-2 py-1 rounded-md text-sm font-medium ${getPlanColor()}`}>
            {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </span>
        </CardTitle>
        <Badge variant={getBadgeVariant() as any} className="text-sm">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-base text-muted-foreground">Prix</span>
            <span className="font-medium text-base">{price} {currency}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-base text-muted-foreground">Période</span>
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Calendar className="h-5 w-5 text-muted-foreground" /> {/* Icône agrandie */}
                  </TooltipTrigger>
                  <TooltipContent className="text-base">
                    <p>Début: {new Date(startDate).toLocaleDateString()}</p>
                    <p>Fin: {new Date(expiryDate).toLocaleDateString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-base">
                {status === 'expired' ? 'Expiré' : 
                  status === 'pending' ? 'En attente d\'activation' : 
                  `${daysRemaining} jours restants`}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-base text-muted-foreground">Renouvellement auto</span>
            <span className={`text-base ${autoRenew ? 'text-green-500' : 'text-muted-foreground'}`}>
              {autoRenew ? 'Activé' : 'Désactivé'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SubscriptionCard;
