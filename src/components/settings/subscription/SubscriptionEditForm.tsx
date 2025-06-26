
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { SubscriptionService, UpdateSubscriptionData } from "@/services/subscriptionService";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionEditFormProps {
  selectedSubscription: string;
  formData: {
    nom: string;
    description: string;
    prix: number;
    dureeEnJours: number;
    nombreJeuxMax: number;
  };
  onFormDataChange: (field: string, value: string | number) => void;
  onCancel: () => void;
  onSuccess: () => void;
}

export function SubscriptionEditForm({
  selectedSubscription,
  formData,
  onFormDataChange,
  onCancel,
  onSuccess
}: SubscriptionEditFormProps) {
  const [saving, setSaving] = useState(false);
  const { t } = useI18n();
  const { toast } = useToast();
  const editFormRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSubscription) return;

    try {
      setSaving(true);
      
      const updateData: UpdateSubscriptionData = {
        nom: formData.nom,
        description: formData.description,
        prix: formData.prix,
        dureeEnJours: formData.dureeEnJours,
        nombreJeuxMax: formData.nombreJeuxMax
      };

      await SubscriptionService.updateSubscription(selectedSubscription, updateData);
      
      toast({
        title: "Succès",
        description: "Abonnement mis à jour avec succès",
      });
      
      onSuccess();
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

  if (!selectedSubscription) return null;

  return (
    <motion.div 
      ref={editFormRef}
      className="space-y-4 border border-orange-200 p-6 rounded-xl bg-gradient-to-br from-orange-50/50 to-amber-50/30"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium">Détails de l'abonnement</h3>
    
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nom" className="text-base">Nom</Label>
            <Input 
              id="nom" 
              value={formData.nom}
              onChange={(e) => onFormDataChange("nom", e.target.value)}
              className="text-base"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onFormDataChange("description", e.target.value)}
              className="text-base min-h-[80px]"
              placeholder="Description de l'abonnement..."
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prix" className="text-base">Prix (FCFA)</Label>
            <Input 
              id="prix" 
              type="number"
              value={formData.prix}
              onChange={(e) => onFormDataChange("prix", parseInt(e.target.value) || 0)}
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
              onChange={(e) => onFormDataChange("dureeEnJours", parseInt(e.target.value) || 0)}
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
              onChange={(e) => onFormDataChange("nombreJeuxMax", parseInt(e.target.value) || 0)}
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
            onClick={onCancel}
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
  );
}
