
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolInfoCardProps {
  school: {
    libelle: string;
    adresse: string;
    telephone: string;
    email: string;
    pays: {
      libelle: string;
    };
  };
  subscription: {
    nom: string;
    description: string;
    prix: number;
    nombreJeuxMax: number;
    nombreApprenantsMax: number;
    dureeEnJours: number;
  };
}

export function SchoolInfoCard({ school, subscription }: SchoolInfoCardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 border-orange-200 shadow-soft">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
          <CardTitle className="flex items-center text-orange-700 text-xl">
            <GraduationCap className="mr-3 h-6 w-6" />
            Informations de l'école
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Adresse</p>
                <p className="font-medium text-base">{school.adresse}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="font-medium text-base">{school.telephone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-base">{school.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pays</p>
                <p className="font-medium text-base">{school.pays.libelle}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 shadow-soft">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
          <CardTitle className="flex items-center text-orange-700 text-xl">
            <GraduationCap className="mr-3 h-6 w-6" />
            Abonnement
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <div className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-3 py-1 rounded inline-block">
                {subscription.nom}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {subscription.description}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Prix:</span>
                <span className="font-medium">{subscription.prix.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Jeux max:</span>
                <span className="font-medium">{subscription.nombreJeuxMax}</span>
              </div>
              <div className="flex justify-between">
                <span>Apprenants max:</span>
                <span className="font-medium">{subscription.nombreApprenantsMax}</span>
              </div>
              <div className="flex justify-between">
                <span>Durée:</span>
                <span className="font-medium">{subscription.dureeEnJours} jours</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
