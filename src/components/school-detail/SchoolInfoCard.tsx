
import { GraduationCap, MapPin, Phone, Mail, AlertCircle, CreditCard, RotateCcw, TrendingUp, Users, BookOpen, GraduationCapIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SchoolInfoCardProps {
  school: {
    libelle: string;
    adresse: string;
    telephone: string;
    email: string;
    pays: {
      libelle: string;
    };
    apprenants: any[];
  };
  subscription: {
    nom: string;
    description: string;
    prix: number;
    nombreJeuxMax: number;
    nombreApprenantsMax: number;
    nombreEnseignantsMax: number;
    dureeEnJours: number;
  };
  gamesCount: number;
  teachersCount: number;
  hasPartialData?: boolean;
}

export function SchoolInfoCard({ 
  school, 
  subscription, 
  gamesCount, 
  teachersCount, 
  hasPartialData = false 
}: SchoolInfoCardProps) {
  const isDefaultSubscription = subscription.nom === 'Aucun abonnement';
  
  const handleRenew = () => {
    console.log('Renouveler l\'abonnement');
    // TODO: Implémenter la logique de renouvellement
  };

  const handleUpgrade = () => {
    console.log('Mettre à jour l\'abonnement');
    // TODO: Implémenter la logique de mise à jour
  };

  // Calcul des pourcentages d'utilisation
  const gamesUsagePercent = isDefaultSubscription ? 0 : Math.min((gamesCount / subscription.nombreJeuxMax) * 100, 100);
  const studentsUsagePercent = isDefaultSubscription ? 0 : Math.min((school.apprenants.length / subscription.nombreApprenantsMax) * 100, 100);
  const teachersUsagePercent = isDefaultSubscription ? 0 : Math.min((teachersCount / subscription.nombreEnseignantsMax) * 100, 100);

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
                
                {/* Statut de l'abonnement */}
                <div className="mb-4">
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-sm px-3 py-1">
                    ● Actif
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {subscription.description}
                </p>
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {subscription.prix.toLocaleString()} FCFA
                </div>
                <p className="text-sm text-muted-foreground">par mois</p>
              </div>

              {/* Statistiques d'utilisation */}
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-semibold text-gray-700 mb-3">Utilisation de l'abonnement</h4>
                
                {/* Jeux */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Jeux</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">
                      {gamesCount}/{subscription.nombreJeuxMax}
                    </span>
                  </div>
                  <Progress value={gamesUsagePercent} className="h-2" />
                </div>

                {/* Apprenants */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Apprenants</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      {school.apprenants.length}/{subscription.nombreApprenantsMax}
                    </span>
                  </div>
                  <Progress value={studentsUsagePercent} className="h-2" />
                </div>

                {/* Enseignants */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <GraduationCapIcon className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Enseignants</span>
                    </div>
                    <span className="text-sm font-bold text-purple-600">
                      {teachersCount}/{subscription.nombreEnseignantsMax}
                    </span>
                  </div>
                  <Progress value={teachersUsagePercent} className="h-2" />
                </div>

                <div className="text-xs text-muted-foreground mt-2">
                  Durée: {subscription.dureeEnJours} jours
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button 
                  onClick={handleRenew}
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Renouveler
                </Button>
                <Button 
                  onClick={handleUpgrade}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Mettre à jour
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
