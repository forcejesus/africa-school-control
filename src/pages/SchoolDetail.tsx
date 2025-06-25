import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, BookOpen, Calendar, Crown, Mail, Phone, MapPin, User, GraduationCap, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";
import Header from "@/components/Header";
import { buildApiUrl } from "@/config/hosts";
import { AuthService } from "@/services/authService";
import Swal from 'sweetalert2';

interface Apprenant {
  _id: string;
  nom: string;
  prenom: string;
  avatar: string;
  matricule: string;
  phone: string;
  email: string;
  date: string;
}

interface Professeur {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  matricule: string;
  role: string;
}

interface Jeu {
  _id: string;
  titre: string;
  image: string | null;
  date: string;
  nombreQuestions: number;
  professeur: Professeur;
}

interface Planification {
  _id: string;
  pin: string;
  statut: string;
  jeu: {
    _id: string;
    titre: string;
  };
  enseignant: any;
}

interface Abonnement {
  _id: string;
  nom: string;
  description: string;
  prix: number;
  nombreJeuxMax: number;
  nombreApprenantsMax: number;
  nombreEnseignantsMax: number;
  dureeEnJours: number;
  dateCreation: string;
}

interface Administrateur {
  _id: string;
  nom: string;
  prenom: string;
  matricule: string;
  genre: string;
  statut: string;
  phone: string;
  email: string;
  adresse: string;
  date: string;
  pays: {
    _id: string;
    libelle: string;
  };
  role: string;
}

interface Ecole {
  _id: string;
  libelle: string;
  adresse: string;
  ville: string;
  telephone: string;
  email: string;
  fichier: string;
  pays: {
    _id: string;
    libelle: string;
  };
  apprenants: Apprenant[];
}

interface SchoolDetailData {
  ecole: Ecole;
  abonnement: Abonnement;
  administrateur: Administrateur;
  jeux: Jeu[];
  planifications: {
    total: number;
    liste: Planification[];
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: SchoolDetailData;
  timestamp: string;
}

const SchoolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState<SchoolDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchGames, setSearchGames] = useState("");
  const [searchStudents, setSearchStudents] = useState("");
  const [searchPlans, setSearchPlans] = useState("");
  const { t } = useI18n();

  useEffect(() => {
    const fetchSchoolDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const headers = {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        };

        const response = await fetch(buildApiUrl(`/api/ecoles/${id}/statistiques-detaillees`), {
          method: 'GET',
          headers,
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        
        if (data.success) {
          setSchoolData(data.data);
        } else {
          await Swal.fire({
            title: t('alerts.error'),
            text: data.message || "Impossible de récupérer les détails de l'école",
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ea580c'
          });
        }
      } catch (error: any) {
        console.error('Erreur lors du chargement des détails:', error);
        await Swal.fire({
          title: 'Erreur de connexion',
          text: "Impossible de récupérer les détails de l'école depuis le serveur",
          icon: 'error',
          confirmButtonText: 'Réessayer',
          confirmButtonColor: '#ea580c'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolDetail();
  }, [id, t]);

  const handleBack = () => {
    navigate('/ecoles');
  };

  // Fonctions de filtrage
  const filteredGames = schoolData?.jeux.filter(jeu =>
    jeu.titre.toLowerCase().includes(searchGames.toLowerCase()) ||
    `${jeu.professeur.prenom} ${jeu.professeur.nom}`.toLowerCase().includes(searchGames.toLowerCase())
  ) || [];

  const filteredStudents = schoolData?.ecole.apprenants.filter(apprenant =>
    `${apprenant.prenom} ${apprenant.nom}`.toLowerCase().includes(searchStudents.toLowerCase()) ||
    apprenant.matricule.toLowerCase().includes(searchStudents.toLowerCase())
  ) || [];

  const filteredPlans = schoolData?.planifications.liste.filter(plan =>
    plan.jeu.titre.toLowerCase().includes(searchPlans.toLowerCase()) ||
    plan.pin.toLowerCase().includes(searchPlans.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 p-6 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  // Créer des données par défaut si schoolData est null
  const displayData = schoolData || {
    ecole: {
      _id: id || '',
      libelle: 'École non trouvée',
      adresse: 'Aucune adresse',
      ville: 'Aucune ville',
      telephone: 'Aucun téléphone',
      email: 'Aucun email',
      fichier: '',
      pays: { _id: '', libelle: 'Aucun pays' },
      apprenants: []
    },
    abonnement: {
      _id: '',
      nom: 'Aucun abonnement',
      description: 'Aucune description',
      prix: 0,
      nombreJeuxMax: 0,
      nombreApprenantsMax: 0,
      nombreEnseignantsMax: 0,
      dureeEnJours: 0,
      dateCreation: ''
    },
    administrateur: {
      _id: '',
      nom: 'Aucun nom',
      prenom: 'Aucun prénom',
      matricule: 'Aucun matricule',
      genre: 'Non spécifié',
      statut: 'inactif',
      phone: 'Aucun téléphone',
      email: 'Aucun email',
      adresse: 'Aucune adresse',
      date: '',
      pays: { _id: '', libelle: 'Aucun pays' },
      role: 'admin'
    },
    jeux: [],
    planifications: { total: 0, liste: [] }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 overflow-auto">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* En-tête avec bouton retour */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleBack}
                variant="outline"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 border-orange-300 hover:bg-orange-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux écoles
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  {displayData.ecole.libelle}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {displayData.ecole.ville}, {displayData.ecole.pays.libelle}
                </p>
              </div>
            </div>
          </div>

          {/* Message d'alerte si pas de données */}
          {!schoolData && (
            <Card className="border-amber-200 bg-amber-50 shadow-soft">
              <CardContent className="p-6">
                <div className="text-center text-amber-700">
                  <p className="text-lg font-medium">Aucune donnée disponible pour cette école</p>
                  <p className="text-sm">Les informations ci-dessous sont des valeurs par défaut.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informations générales de l'école */}
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
                      <p className="font-medium text-base">{displayData.ecole.adresse}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <p className="font-medium text-base">{displayData.ecole.telephone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-base">{displayData.ecole.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pays</p>
                      <p className="font-medium text-base">{displayData.ecole.pays.libelle}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Abonnement */}
            <Card className="border-orange-200 shadow-soft">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
                <CardTitle className="flex items-center text-orange-700 text-xl">
                  <Crown className="mr-3 h-6 w-6" />
                  Abonnement
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Badge variant="default" className="bg-orange-600 hover:bg-orange-700 text-sm px-3 py-1">
                      {displayData.abonnement.nom}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {displayData.abonnement.description}
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Prix:</span>
                      <span className="font-medium">{displayData.abonnement.prix.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jeux max:</span>
                      <span className="font-medium">{displayData.abonnement.nombreJeuxMax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Apprenants max:</span>
                      <span className="font-medium">{displayData.abonnement.nombreApprenantsMax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Durée:</span>
                      <span className="font-medium">{displayData.abonnement.dureeEnJours} jours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Administrateur */}
          <Card className="border-orange-200 shadow-soft">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <CardTitle className="flex items-center text-orange-700 text-xl">
                <User className="mr-3 h-6 w-6" />
                Administrateur
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Nom complet</p>
                  <p className="font-medium text-base">{displayData.administrateur.prenom} {displayData.administrateur.nom}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-base">{displayData.administrateur.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <p className="font-medium text-base">{displayData.administrateur.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Matricule</p>
                  <p className="font-medium text-base">{displayData.administrateur.matricule}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Statut</p>
                  <Badge variant={displayData.administrateur.statut === 'actif' ? 'default' : 'secondary'} 
                         className={displayData.administrateur.statut === 'actif' ? 'bg-green-600 hover:bg-green-700' : ''}>
                    {displayData.administrateur.statut}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Genre</p>
                  <p className="font-medium text-base">{displayData.administrateur.genre}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques - Mise en valeur améliorée */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-orange-50">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl shadow-lg">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-orange-700">{displayData.ecole.apprenants.length}</p>
                    <p className="text-base text-muted-foreground font-medium">Apprenants</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-blue-700">{displayData.jeux.length}</p>
                    <p className="text-base text-muted-foreground font-medium">Jeux créés</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg">
                    <Calendar className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-green-700">{displayData.planifications.total}</p>
                    <p className="text-base text-muted-foreground font-medium">Planifications</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-purple-50">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg">
                    <GraduationCap className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-purple-700">
                      {displayData.jeux.reduce((acc, jeu) => acc + jeu.nombreQuestions, 0)}
                    </p>
                    <p className="text-base text-muted-foreground font-medium">Questions totales</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jeux avec recherche */}
          <Card className="border-orange-200 shadow-soft">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-orange-700 text-xl">
                  <BookOpen className="mr-3 h-6 w-6" />
                  Jeux créés ({filteredGames.length})
                </CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
                  <Input
                    type="search"
                    placeholder="Rechercher un jeu..."
                    value={searchGames}
                    onChange={(e) => setSearchGames(e.target.value)}
                    className="pl-9 bg-white border-orange-200 focus:border-orange-300"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredGames.map((jeu) => (
                    <Card key={jeu._id} className="border border-orange-100 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-orange-700 text-base">{jeu.titre}</h4>
                          <p className="text-sm text-muted-foreground">
                            Par: {jeu.professeur.prenom} {jeu.professeur.nom}
                          </p>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{jeu.nombreQuestions} questions</span>
                            <span>{new Date(jeu.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8 text-base">
                  {displayData.jeux.length === 0 ? "Aucun jeu créé pour le moment" : "Aucun jeu trouvé avec ces critères"}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Apprenants avec recherche */}
          <Card className="border-orange-200 shadow-soft">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-orange-700 text-xl">
                  <Users className="mr-3 h-6 w-6" />
                  Apprenants ({filteredStudents.length})
                </CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
                  <Input
                    type="search"
                    placeholder="Rechercher un apprenant..."
                    value={searchStudents}
                    onChange={(e) => setSearchStudents(e.target.value)}
                    className="pl-9 bg-white border-orange-200 focus:border-orange-300"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {filteredStudents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredStudents.map((apprenant) => (
                    <Card key={apprenant._id} className="border border-orange-100">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-orange-700 text-base">
                            {apprenant.prenom} {apprenant.nom}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Matricule: {apprenant.matricule}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Inscrit le: {new Date(apprenant.date).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8 text-base">
                  {displayData.ecole.apprenants.length === 0 ? "Aucun apprenant inscrit pour le moment" : "Aucun apprenant trouvé avec ces critères"}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Planifications avec recherche */}
          <Card className="border-orange-200 shadow-soft">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-orange-700 text-xl">
                  <Calendar className="mr-3 h-6 w-6" />
                  Planifications ({filteredPlans.length})
                </CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
                  <Input
                    type="search"
                    placeholder="Rechercher une planification..."
                    value={searchPlans}
                    onChange={(e) => setSearchPlans(e.target.value)}
                    className="pl-9 bg-white border-orange-200 focus:border-orange-300"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {filteredPlans.length > 0 ? (
                <div className="space-y-4">
                  {filteredPlans.map((planification) => (
                    <Card key={planification._id} className="border border-orange-100">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h4 className="font-semibold text-orange-700 text-base">
                              {planification.jeu.titre}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              PIN: {planification.pin}
                            </p>
                          </div>
                          <Badge 
                            variant={planification.statut === 'en attente' ? 'secondary' : 'default'}
                            className={planification.statut === 'actif' ? 'bg-green-600 hover:bg-green-700' : ''}
                          >
                            {planification.statut}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8 text-base">
                  {displayData.planifications.liste.length === 0 ? "Aucune planification pour le moment" : "Aucune planification trouvée avec ces critères"}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolDetail;
