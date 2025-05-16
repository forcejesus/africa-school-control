
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Subscription } from "@/utils/dummyData";
import { Calendar } from "lucide-react";

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const { plan, startDate, endDate, status, price, currency, autoRenew } = subscription;

  // Calculate days remaining
  const today = new Date();
  const end = new Date(endDate);
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
    switch (plan) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-violet-100 text-violet-800';
      case 'enterprise': return 'bg-amber-100 text-amber-800';
      default: return '';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-lg">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPlanColor()}`}>
            {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </span>
        </CardTitle>
        <Badge variant={getBadgeVariant() as any}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="font-medium">{price} {currency}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Period</span>
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Start: {new Date(startDate).toLocaleDateString()}</p>
                    <p>End: {new Date(endDate).toLocaleDateString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-sm">
                {status === 'expired' ? 'Expired' : 
                  status === 'pending' ? 'Pending activation' : 
                  `${daysRemaining} days left`}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Auto-renewal</span>
            <span className={autoRenew ? 'text-green-500' : 'text-muted-foreground'}>
              {autoRenew ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SubscriptionCard;
