
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Subscription } from "@/utils/data/types";
import { Calendar, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

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
      case 'active': return 'default';
      case 'expired': return 'destructive';
      default: return 'secondary';
    }
  };

  // Determine plan badge colors with orange theme
  const getPlanColor = () => {
    switch (plan.toLowerCase()) {
      case 'basic': 
      case 'démarrage': 
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'premium': 
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'enterprise': 
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'standard': 
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: 
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'expired': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <Card className="modern-card h-full">
        <CardHeader className="pb-3 border-b border-orange-100">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">
              <span className={`px-3 py-2 rounded-lg text-sm font-semibold border ${getPlanColor()}`}>
                <Award className="inline h-4 w-4 mr-2" />
                {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </span>
            </CardTitle>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor()}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base text-slate-600 font-medium">Prix mensuel</span>
              <span className="font-bold text-xl text-orange-600">{price} {currency}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-base text-slate-600 font-medium">Période</span>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Calendar className="h-5 w-5 text-orange-500" />
                    </TooltipTrigger>
                    <TooltipContent className="text-base">
                      <p>Début: {new Date(startDate).toLocaleDateString()}</p>
                      <p>Fin: {new Date(expiryDate).toLocaleDateString()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-base font-medium">
                  {status === 'expired' ? (
                    <span className="text-red-600">Expiré</span>
                  ) : status === 'pending' ? (
                    <span className="text-amber-600">En attente</span>
                  ) : (
                    <span className="text-emerald-600">{daysRemaining} jours restants</span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-base text-slate-600 font-medium">Renouvellement auto</span>
              <div className="flex items-center gap-2">
                <TrendingUp className={`h-4 w-4 ${autoRenew ? 'text-emerald-500' : 'text-slate-400'}`} />
                <span className={`text-base font-medium ${autoRenew ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {autoRenew ? 'Activé' : 'Désactivé'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SubscriptionCard;
