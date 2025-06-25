
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddCountryDialogProps {
  onAdd: (countryName: string) => Promise<void>;
}

export function AddCountryDialog({ onAdd }: AddCountryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [countryName, setCountryName] = useState("");

  const handleAdd = async () => {
    if (!countryName.trim()) return;
    
    await onAdd(countryName.trim());
    setCountryName("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-base">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un pays
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau pays</DialogTitle>
          <DialogDescription>
            Entrez le nom du pays à ajouter à la liste des pays autorisés.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country-name">Nom du pays</Label>
            <Input
              id="country-name"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              placeholder="Ex: France"
              className="text-base"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Annuler
            </Button>
            <Button onClick={handleAdd}>
              Ajouter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
