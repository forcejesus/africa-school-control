
import { School, Users, BookOpen, Calendar, Plus, List } from "lucide-react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { 
  getExpiringSubscriptions,
  getRecentActivities,
  getTotalActiveSchools,
  getTotalGamesPlayed,
  getTotalSchools,
  getTotalStudents,
  getTotalTeachers,
  schools,
  subscriptions
} from "@/utils/data";
import { useI18n } from "@/contexts/I18nContext";

// Mock data for games and planifications
const gamesData = [
  { id: 1, schoolName: "Lycée Français de Dakar", gameName: "Mathématiques Quiz", sessionsActive: 5, sessionsExpired: 2, totalSessions: 7 },
  { id: 2, schoolName: "École Internationale d'Abidjan", gameName: "Histoire Interactive", sessionsActive: 3, sessionsExpired: 1, totalSessions: 4 },
  { id: 3, schoolName: "Collège Saint-Exupéry", gameName: "Sciences Naturelles", sessionsActive: 8, sessionsExpired: 3, totalSessions: 11 },
  { id: 4, schoolName: "Institut Supérieur de Tunis", gameName: "Géographie Moderne", sessionsActive: 2, sessionsExpired: 5, totalSessions: 7 },
  { id: 5, schoolName: "École Primaire Nelson Mandela", gameName: "Français Interactif", sessionsActive: 6, sessionsExpired: 1, totalSessions: 7 }
];

const planificationsData = [
  { id: 1, schoolName: "Lycée Français de Dakar", gameName: "Mathématiques Quiz", planificationName: "Révision Trimestre 1", dateCreation: "2024-01-15", status: "active" },
  { id: 2, schoolName: "École Internationale d'Abidjan", gameName: "Histoire Interactive", planificationName: "Moyen Âge", dateCreation: "2024-01-20", status: "completed" },
  { id: 3, schoolName: "Collège Saint-Exupéry", gameName: "Sciences Naturelles", planificationName: "Biologie Cellulaire", dateCreation: "2024-02-01", status: "active" },
  { id: 4, schoolName: "Institut Supérieur de Tunis", gameName: "Géographie Moderne", planificationName: "Climats du Monde", dateCreation: "2024-02-10", status: "pending" },
  { id: 5, schoolName: "École Primaire Nelson Mandela", gameName: "Français Interactif", planificationName: "Conjugaison CE2", dateCreation: "2024-02-15", status: "active" }
];

const Dashboard = () => {
  const { t } = useI18n();
  const expiringSubscriptions = getExpiringSubscriptions();
  const totalActiveSessions = gamesData.reduce((total, game) => total + game.sessionsActive, 0);
  const totalGamesCreated = gamesData.length;
  const totalPlanifications = planificationsData.length;
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatsCard 
              title={t('nav.schools')}
              value={getTotalSchools()}
              icon={<School className="h-5 w-5 text-blue-600" />}
              subtitle={`${getTotalActiveSchools()} ${t('dashboard.activeSubscriptions')}`}
            />
            <StatsCard 
              title="Sessions de jeux"
              value={totalActiveSessions}
              icon={<Users className="h-5 w-5 text-green-600" />}
              subtitle="Sessions non expirées"
            />
            <StatsCard 
              title="Jeux créés"
              value={totalGamesCreated}
              icon={<BookOpen className="h-5 w-5 text-purple-600" />}
              subtitle={`${totalPlanifications} planifications`}
            />
            <Card className="col-span-1 lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
                    <p className="text-sm text-gray-600">Gérer les écoles</p>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link to="/schools/add">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une école
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/schools">
                        <List className="h-4 w-4 mr-2" />
                        Liste des écoles
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Jeux créés par école</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>École</TableHead>
                      <TableHead>Jeu</TableHead>
                      <TableHead>Sessions actives</TableHead>
                      <TableHead>Total sessions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gamesData.map((game) => (
                      <TableRow key={game.id}>
                        <TableCell className="font-medium">{game.schoolName}</TableCell>
                        <TableCell>{game.gameName}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {game.sessionsActive}
                          </Badge>
                        </TableCell>
                        <TableCell>{game.totalSessions}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Planifications créées</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>École</TableHead>
                      <TableHead>Jeu</TableHead>
                      <TableHead>Planification</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {planificationsData.map((planification) => (
                      <TableRow key={planification.id}>
                        <TableCell className="font-medium">{planification.schoolName}</TableCell>
                        <TableCell>{planification.gameName}</TableCell>
                        <TableCell>{planification.planificationName}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              planification.status === 'active' ? 'default' :
                              planification.status === 'completed' ? 'secondary' : 'outline'
                            }
                            className={
                              planification.status === 'active' ? 'bg-green-100 text-green-800' :
                              planification.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {planification.status === 'active' ? 'Actif' :
                             planification.status === 'completed' ? 'Terminé' : 'En attente'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">{t('dashboard.activeSubscriptions')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subscriptions
                  .filter(sub => sub.status === 'active')
                  .slice(0, 3)
                  .map(subscription => (
                    <SubscriptionCard key={subscription.id} subscription={subscription} />
                  ))
                }
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Abonnements expirant bientôt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expiringSubscriptions.length > 0 ? (
                  expiringSubscriptions.map((sub) => {
                    const school = schools.find(s => s.id === sub.schoolId);
                    return (
                      <div 
                        key={sub.id} 
                        className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={school?.logo} alt={school?.name} />
                            <AvatarFallback>{school?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-base">{school?.name}</p>
                            <p className="text-sm text-gray-600">
                              Expire : {new Date(sub.endDate || sub.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                          {sub.plan}
                        </Badge>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-base text-gray-500 py-4">
                    Aucun abonnement n'expire bientôt
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Statistiques des abonnements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-base text-gray-600">Total des abonnements</span>
                  <span className="font-medium text-base">{subscriptions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-gray-600">Abonnements actifs</span>
                  <span className="font-medium text-base text-green-600">
                    {subscriptions.filter(sub => sub.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-gray-600">Abonnements expirés</span>
                  <span className="font-medium text-base text-red-600">
                    {subscriptions.filter(sub => sub.status === 'expired').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-gray-600">En attente</span>
                  <span className="font-medium text-base text-orange-600">
                    {subscriptions.filter(sub => sub.status === 'pending').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
