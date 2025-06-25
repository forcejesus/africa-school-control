
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiSubscription, ApiCountry } from "@/services/subscriptionService";

interface SchoolData {
  libelle: string;
  adresse: string;
  abonnementActuel: string;
  ville: string;
  telephone: string;
  email: string;
  fichier: string;
  pays: string;
}

interface SchoolInfoStepProps {
  schoolData: SchoolData;
  subscriptions: ApiSubscription[];
  countries: ApiCountry[];
  onSchoolChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSchoolSelectChange: (field: string, value: string) => void;
}

export function SchoolInfoStep({ 
  schoolData, 
  subscriptions, 
  countries, 
  onSchoolChange, 
  onSchoolSelectChange 
}: SchoolInfoStepProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="libelle" className="text-sm font-medium text-gray-700">Nom de l'école *</Label>
        <Input
          id="libelle"
          name="libelle"
          value={schoolData.libelle}
          onChange={onSchoolChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Entrez le nom de l'école"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ville" className="text-sm font-medium text-gray-700">Ville *</Label>
        <Input
          id="ville"
          name="ville"
          value={schoolData.ville}
          onChange={onSchoolChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Entrez la ville"
          required
        />
      </div>
      
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="adresse" className="text-sm font-medium text-gray-700">Adresse *</Label>
        <Input
          id="adresse"
          name="adresse"
          value={schoolData.adresse}
          onChange={onSchoolChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Entrez l'adresse complète"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="telephone" className="text-sm font-medium text-gray-700">Téléphone *</Label>
        <Input
          id="telephone"
          name="telephone"
          value={schoolData.telephone}
          onChange={onSchoolChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Entrez le numéro de téléphone"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={schoolData.email}
          onChange={onSchoolChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Entrez l'adresse email"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="pays" className="text-sm font-medium text-gray-700">Pays *</Label>
        <Select 
          value={schoolData.pays} 
          onValueChange={(value) => onSchoolSelectChange("pays", value)}
        >
          <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20">
            <SelectValue placeholder="Sélectionner un pays" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country._id} value={country._id}>
                {country.libelle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="abonnementActuel" className="text-sm font-medium text-gray-700">Abonnement *</Label>
        <Select 
          value={schoolData.abonnementActuel} 
          onValueChange={(value) => onSchoolSelectChange("abonnementActuel", value)}
        >
          <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20">
            <SelectValue placeholder="Sélectionner un abonnement" />
          </SelectTrigger>
          <SelectContent>
            {subscriptions.map((subscription) => (
              <SelectItem key={subscription._id} value={subscription._id}>
                {subscription.nom} - {subscription.prix} FCFA
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="fichier" className="text-sm font-medium text-gray-700">Logo de l'école</Label>
        <Input
          id="fichier"
          name="fichier"
          value={schoolData.fichier}
          onChange={onSchoolChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="URL du logo (optionnel)"
        />
      </div>
    </div>
  );
}
