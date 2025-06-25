
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminData {
  nom: string;
  prenom: string;
  genre: string;
  phone: string;
  email: string;
  adresse: string;
  password: string;
  confirmPassword: string;
}

interface AdminInfoStepProps {
  adminData: AdminData;
  onAdminChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdminSelectChange: (field: string, value: string) => void;
}

export function AdminInfoStep({ 
  adminData, 
  onAdminChange, 
  onAdminSelectChange 
}: AdminInfoStepProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="prenom" className="text-sm font-medium text-gray-700">Prénom *</Label>
        <Input
          id="prenom"
          name="prenom"
          value={adminData.prenom}
          onChange={onAdminChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Entrez le prénom"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nom" className="text-sm font-medium text-gray-700">Nom *</Label>
        <Input
          id="nom"
          name="nom"
          value={adminData.nom}
          onChange={onAdminChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Entrez le nom"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="genre" className="text-sm font-medium text-gray-700">Genre *</Label>
        <Select 
          value={adminData.genre} 
          onValueChange={(value) => onAdminSelectChange("genre", value)}
        >
          <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20">
            <SelectValue placeholder="Sélectionner le genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Masculin">Masculin</SelectItem>
            <SelectItem value="Féminin">Féminin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="adminPhone" className="text-sm font-medium text-gray-700">Téléphone *</Label>
        <Input
          id="adminPhone"
          name="phone"
          value={adminData.phone}
          onChange={onAdminChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Entrez le numéro de téléphone"
          required
        />
      </div>
      
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="adminEmail" className="text-sm font-medium text-gray-700">Email *</Label>
        <Input
          id="adminEmail"
          name="email"
          type="email"
          value={adminData.email}
          onChange={onAdminChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Entrez l'adresse email"
          required
        />
      </div>
      
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="adminAdresse" className="text-sm font-medium text-gray-700">Adresse *</Label>
        <Input
          id="adminAdresse"
          name="adresse"
          value={adminData.adresse}
          onChange={onAdminChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Entrez l'adresse"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">Mot de passe *</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={adminData.password}
          onChange={onAdminChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Entrez le mot de passe (min 4 caractères)"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmer le mot de passe *</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={adminData.confirmPassword}
          onChange={onAdminChange}
          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
          placeholder="Confirmez le mot de passe"
          required
        />
      </div>
    </div>
  );
}
