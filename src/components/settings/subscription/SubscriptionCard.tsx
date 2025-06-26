
import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Crown, Users, Calendar, Trophy, Gift, Settings, Loader2 } from "lucide-react";
import { ApiSubscription } from "@/services/subscriptionService";

interface SubscriptionCardProps {
  subscription: ApiSubscription;
  index: number;
  onEdit: (subscriptionId: string) => void;
  onFreeToggle: (subscriptionId: string) => Promise<void>;
}

export function SubscriptionCard({ subscription, index, onEdit, onFreeToggle }: SubscriptionCardProps) {
  const [updatingFree, setUpdatingFree] = useState(false);

  const handleFreeToggle = async () => {
    setUpdatingFree(true);
    try {
      await onFreeToggle(subscription._id);
    } finally {
      setUpdatingFree(false);
    }
  };

  return (
    <motion.div 
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
              <Label htmlFor={`free-${subscription._id}`} className="font-semibold text-slate-700 text-lg">
                Abonnement gratuit
              </Label>
              <div className="flex items-center gap-3">
                <Switch
                  id={`free-${subscription._id}`}
                  checked={subscription.free}
                  onCheckedChange={handleFreeToggle}
                  disabled={updatingFree}
                  className="data-[state=checked]:bg-green-500 h-8 w-16 scale-125 shadow-lg border-2 border-green-200"
                />
                {updatingFree && (
                  <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                )}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-orange-200 hover:bg-orange-50"
              onClick={() => onEdit(subscription._id)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
