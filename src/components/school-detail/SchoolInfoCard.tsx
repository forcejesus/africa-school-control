
import { GraduationCap, MapPin, Phone, Mail, AlertCircle, CreditCard, RotateCcw, TrendingUp, Users, BookOpen, GraduationCapIcon, User } from "lucide-react";
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
  administrator: {
    prenom: string;
    nom: string;
    email: string;
    phone: string;
    matricule: string;
    statut: string;
    genre: string;
  };
  gamesCount: number;
  teachersCount: number;
  hasPartialData?: boolean;
}

export function SchoolInfoCard({ 
  school, 
  subscription, 
  administrator,
  gamesCount, 
  teachersCount, 
  hasPartialData = false 
}: SchoolInfoCardProps) {
  const isDefaultSubscription = subscription.nom === 'Aucun abonnement';
  const isDefaultAdmin = administrator.nom === 'Aucun nom' || administrator.email === 'Aucun email';
  
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card className="lg:col-span-2 border-orange-200 shadow-soft">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200 p-4 sm:p-6">
          <CardTitle className="flex items-center text-orange-700 text-lg sm:text-xl">
            <GraduationCap className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
            Informations de l'école
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-6">
            {/* Informations de l'école */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-4 text-sm sm:text-base flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                École
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">Adresse</p>
                    <p className="font-medium text-sm sm:text-base break-words">{school.adresse}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium text-sm sm:text-base break-words">{school.telephone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-sm sm:text-base break-words">{school.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">Pays</p>
                    <p className="font-medium text-sm sm:text-base">{school.pays.libelle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations de l'administrateur */}
            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-700 mb-4 text-sm sm:text-base flex items-center">
                <User className="mr-2 h-4 w-4" />
                Administrateur
              </h4>
              {isDefaultAdmin ? (
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-700">
                    Aucun administrateur configuré pour cette école
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-muted-foreground">Nom complet</p>
                      <p className="font-medium text-sm sm:text-base">{administrator.prenom} {administrator.nom}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-sm sm:text-base break-words">{administrator.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <p className="font-medium text-sm sm:text-base">{administrator.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant={administrator.statut === 'actif' ? 'default' : 'secondary'} 
                           className={administrator.statut === 'actif' ? 'bg-green-600 hover:bg-green-700 mt-1' : 'mt-1'}>
                      {administrator.statut}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 shadow-soft">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200 p-4 sm:p-6">
          <CardTitle className="flex items-center text-orange-700 text-lg sm:text-xl">
            <CreditCard className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
            Abonnement
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {isDefaultSubscription ? (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700 text-sm">
                Aucun abonnement configuré pour cette école
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-orange-600 to-orange-700 text-white text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 mb-3">
                  {subscription.nom}
                </Badge>
                
                {/* Statut de l'abonnement */}
                <div className="mb-4">
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs sm:text-sm px-2 sm:px-3 py-1">
                    ● Actif
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground mb-4 px-2">
                  {subscription.description}
                </p>
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">
                  {subscription.prix.toLocaleString()} FCFA
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">par mois</p>
              </div>

              {/* Statistiques d'utilisation */}
              <div className="space-y-3 sm:space-y-4 border-t pt-4">
                <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">Utilisation de l'abonnement</h4>
                
                {/* Jeux */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                      <span className="text-xs sm:text-sm font-medium">Jeux</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-blue-600">
                      {gamesCount}/{subscription.nombreJeuxMax}
                    </span>
                  </div>
                  <Progress value={gamesUsagePercent} className="h-2" />
                </div>

                {/* Apprenants */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                      <span className="text-xs sm:text-sm font-medium">Apprenants</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-green-600">
                      {school.apprenants.length}/{subscription.nombreApprenantsMax}
                    </span>
                  </div>
                  <Progress value={studentsUsagePercent} className="h-2" />
                </div>

                {/* Enseignants */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <GraduationCapIcon className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                      <span className="text-xs sm:text-sm font-medium">Enseignants</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-purple-600">
                      {teachersCount}/{subscription.nombreEnseignantsMax}
                    </span>
                  </div>
                  <Progress value={teachersUsagePercent} className="h-2" />
                </div>

                <div className="text-xs text-muted-foreground mt-2">
                  Durée: {subscription.dureeEnJours} jours
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-4">
                <Button 
                  onClick={handleRenew}
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs sm:text-sm h-8 sm:h-10"
                >
                  <RotateCcw className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Renouveler
                </Button>
                <Button 
                  onClick={handleUpgrade}
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs sm:text-sm h-8 sm:h-10"
                >
                  <TrendingUp className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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
