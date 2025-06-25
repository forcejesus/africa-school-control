
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiSubscription, ApiCountry } from "@/services/subscriptionService";

interface SchoolInfoStepProps {
  schoolData: {
    libelle: string;
    adresse: string;
    abonnementActuel: string;
    ville: string;
    telephone: string;
    email: string;
    fichier: string;
    pays: string;
  };
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="libelle" className="text-sm font-medium text-gray-700">
            Nom de l'école *
          </Label>
          <Input
            id="libelle"
            name="libelle"
            value={schoolData.libelle}
            onChange={onSchoolChange}
            placeholder="Entrez le nom de l'école"
            className="border-orange-200 focus:ring-orange-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ville" className="text-sm font-medium text-gray-700">
            Ville *
          </Label>
          <Input
            id="ville"
            name="ville"
            value={schoolData.ville}
            onChange={onSchoolChange}
            placeholder="Entrez la ville"
            className="border-orange-200 focus:ring-orange-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="adresse" className="text-sm font-medium text-gray-700">
            Adresse *
          </Label>
          <Input
            id="adresse"
            name="adresse"
            value={schoolData.adresse}
            onChange={onSchoolChange}
            placeholder="Entrez l'adresse complète"
            className="border-orange-200 focus:ring-orange-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telephone" className="text-sm font-medium text-gray-700">
            Téléphone *
          </Label>
          <Input
            id="telephone"
            name="telephone"
            value={schoolData.telephone}
            onChange={onSchoolChange}
            placeholder="Entrez le numéro de téléphone"
            className="border-orange-200 focus:ring-orange-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={schoolData.email}
            onChange={onSchoolChange}
            placeholder="Entrez l'adresse email"
            className="border-orange-200 focus:ring-orange-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pays" className="text-sm font-medium text-gray-700">
            Pays *
          </Label>
          <Select value={schoolData.pays} onValueChange={(value) => onSchoolSelectChange('pays', value)}>
            <SelectTrigger className="border-orange-200 focus:ring-orange-500">
              <SelectValue placeholder="Sélectionnez un pays" />
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
          <Label htmlFor="abonnementActuel" className="text-sm font-medium text-gray-700">
            Abonnement *
          </Label>
          <Select value={schoolData.abonnementActuel} onValueChange={(value) => onSchoolSelectChange('abonnementActuel', value)}>
            <SelectTrigger className="border-orange-200 focus:ring-orange-500">
              <SelectValue placeholder="Sélectionnez un abonnement" />
            </SelectTrigger>
            <SelectContent>
              {subscriptions.map((subscription) => (
                <SelectItem key={subscription._id} value={subscription._id}>
                  {subscription.nom} - {subscription.prix.toLocaleString()} FCFA
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p className="text-sm text-orange-700">
          <strong>Note:</strong> Les champs marqués d'un astérisque (*) sont obligatoires.
        </p>
      </div>
    </div>
  );
}
