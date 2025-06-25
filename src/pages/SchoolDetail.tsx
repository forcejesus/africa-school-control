
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, BookOpen, Calendar, Crown, Mail, Phone, MapPin, User, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  const [schoolData, setSchoolData] = useState<SchoolDetailData | null>(null);
  const [loading, setLoading] = useState(true);
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

  if (!schoolData) {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 p-6 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">École non trouvée</p>
            <Link
              to="/ecoles"
              className="mt-4 inline-flex items-center text-orange-600 hover:text-orange-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la liste
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <Link
                to="/ecoles"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux écoles
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  {schoolData.ecole.libelle}
                </h1>
                <p className="text-muted-foreground">
                  {schoolData.ecole.ville}, {schoolData.ecole.pays.libelle}
                </p>
              </div>
            </div>
          </div>

          {/* Informations générales de l'école */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-orange-200 shadow-soft">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
                <CardTitle className="flex items-center text-orange-700">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Informations de l'école
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Adresse</p>
                      <p className="font-medium">{schoolData.ecole.adresse}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <p className="font-medium">{schoolData.ecole.telephone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{schoolData.ecole.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pays</p>
                      <p className="font-medium">{schoolData.ecole.pays.libelle}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Abonnement */}
            <Card className="border-orange-200 shadow-soft">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
                <CardTitle className="flex items-center text-orange-700">
                  <Crown className="mr-2 h-5 w-5" />
                  Abonnement
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div>
                    <Badge variant="default" className="bg-orange-600 hover:bg-orange-700">
                      {schoolData.abonnement.nom}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {schoolData.abonnement.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Prix:</span>
                      <span className="font-medium">{schoolData.abonnement.prix.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jeux max:</span>
                      <span className="font-medium">{schoolData.abonnement.nombreJeuxMax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Apprenants max:</span>
                      <span className="font-medium">{schoolData.abonnement.nombreApprenantsMax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Durée:</span>
                      <span className="font-medium">{schoolData.abonnement.dureeEnJours} jours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Administrateur */}
          <Card className="border-orange-200 shadow-soft">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <CardTitle className="flex items-center text-orange-700">
                <User className="mr-2 h-5 w-5" />
                Administrateur
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nom complet</p>
                  <p className="font-medium">{schoolData.administrateur.prenom} {schoolData.administrateur.nom}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{schoolData.administrateur.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <p className="font-medium">{schoolData.administrateur.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Matricule</p>
                  <p className="font-medium">{schoolData.administrateur.matricule}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Statut</p>
                  <Badge variant={schoolData.administrateur.statut === 'actif' ? 'default' : 'secondary'} 
                         className={schoolData.administrateur.statut === 'actif' ? 'bg-green-600 hover:bg-green-700' : ''}>
                    {schoolData.administrateur.statut}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Genre</p>
                  <p className="font-medium">{schoolData.administrateur.genre}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-orange-200 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-orange-700">{schoolData.ecole.apprenants.length}</p>
                    <p className="text-sm text-muted-foreground">Apprenants</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-orange-700">{schoolData.jeux.length}</p>
                    <p className="text-sm text-muted-foreground">Jeux créés</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-orange-700">{schoolData.planifications.total}</p>
                    <p className="text-sm text-muted-foreground">Planifications</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-orange-700">
                      {schoolData.jeux.reduce((acc, jeu) => acc + jeu.nombreQuestions, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Questions totales</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jeux */}
          <Card className="border-orange-200 shadow-soft">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <CardTitle className="flex items-center text-orange-700">
                <BookOpen className="mr-2 h-5 w-5" />
                Jeux créés ({schoolData.jeux.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {schoolData.jeux.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schoolData.jeux.map((jeu) => (
                    <Card key={jeu._id} className="border border-orange-100 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-orange-700">{jeu.titre}</h4>
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
                <p className="text-center text-muted-foreground py-8">
                  Aucun jeu créé pour le moment
                </p>
              )}
            </CardContent>
          </Card>

          {/* Apprenants */}
          <Card className="border-orange-200 shadow-soft">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <CardTitle className="flex items-center text-orange-700">
                <Users className="mr-2 h-5 w-5" />
                Apprenants ({schoolData.ecole.apprenants.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {schoolData.ecole.apprenants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schoolData.ecole.apprenants.map((apprenant) => (
                    <Card key={apprenant._id} className="border border-orange-100">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-orange-700">
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
                <p className="text-center text-muted-foreground py-8">
                  Aucun apprenant inscrit pour le moment
                </p>
              )}
            </CardContent>
          </Card>

          {/* Planifications */}
          <Card className="border-orange-200 shadow-soft">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <CardTitle className="flex items-center text-orange-700">
                <Calendar className="mr-2 h-5 w-5" />
                Planifications ({schoolData.planifications.total})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {schoolData.planifications.liste.length > 0 ? (
                <div className="space-y-4">
                  {schoolData.planifications.liste.map((planification) => (
                    <Card key={planification._id} className="border border-orange-100">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h4 className="font-semibold text-orange-700">
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
                <p className="text-center text-muted-foreground py-8">
                  Aucune planification pour le moment
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
