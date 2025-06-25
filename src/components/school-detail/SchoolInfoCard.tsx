
import { GraduationCap, MapPin, Phone, Mail, AlertCircle, CreditCard, TrendingUp, Pause, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  hasPartialData?: boolean;
}

export function SchoolInfoCard({ school, subscription, hasPartialData = false }: SchoolInfoCardProps) {
  const isDefaultSubscription = subscription.nom === 'Aucun abonnement';
  
  const handleUpgrade = () => {
    console.log('Mettre à niveau l\'abonnement');
    // TODO: Implémenter la logique de mise à niveau
  };

  const handleRenew = () => {
    console.log('Renouveler l\'abonnement');
    // TODO: Implémenter la logique de renouvellement
  };

  const handleSuspend = () => {
    console.log('Suspendre l\'abonnement');
    // TODO: Implémenter la logique de suspension
  };

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
            <CreditCard className="mr-3 h-6 w-6" />
            Abonnement
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isDefaultSubscription ? (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700">
                Aucun abonnement configuré pour cette école
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-orange-600 to-orange-700 text-white text-lg px-4 py-2 mb-3">
                  {subscription.nom}
                </Badge>
                <p className="text-sm text-muted-foreground mb-4">
                  {subscription.description}
                </p>
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {subscription.prix.toLocaleString()} FCFA
                </div>
                <p className="text-sm text-muted-foreground">par mois</p>
              </div>

              <div className="space-y-3 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Jeux max:</span>
                  <span className="font-medium">{subscription.nombreJeuxMax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Apprenants max:</span>
                  <span className="font-medium">{subscription.nombreApprenantsMax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Durée:</span>
                  <span className="font-medium">{subscription.dureeEnJours} jours</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handleUpgrade}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Mettre à niveau
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={handleRenew}
                    variant="outline"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Renouveler
                  </Button>
                  <Button 
                    onClick={handleSuspend}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Pause className="mr-2 h-4 w-4" />
                    Suspendre
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
