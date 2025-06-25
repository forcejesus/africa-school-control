
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Country {
  _id: string;
  libelle: string;
  __v?: number;
}

interface EditCountryDialogProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (countryName: string) => Promise<void>;
}

export function EditCountryDialog({ country, isOpen, onClose, onEdit }: EditCountryDialogProps) {
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    if (country) {
      setCountryName(country.libelle);
    }
  }, [country]);

  const handleEdit = async () => {
    if (!countryName.trim()) return;
    
    await onEdit(countryName.trim());
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le pays</DialogTitle>
          <DialogDescription>
            Modifiez le nom du pays sélectionné.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-country-name">Nom du pays</Label>
            <Input
              id="edit-country-name"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              className="text-base"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button onClick={handleEdit}>
              Mettre à jour
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
