
import { School, Users, BookOpen, Plus, List } from "lucide-react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
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
import { Link } from "react-router-dom";
import { 
  getTotalActiveSchools,
  getTotalSchools,
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
  const totalActiveSessions = gamesData.reduce((total, game) => total + game.sessionsActive, 0);
  const totalGamesCreated = gamesData.length;
  const totalPlanifications = planificationsData.length;
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              title={t('dashboard.totalSchools')}
              value={getTotalSchools()}
              icon={<School className="h-6 w-6 text-blue-600" />}
              subtitle={`${getTotalActiveSchools()} ${t('dashboard.activeSubscriptions')}`}
            />
            <StatsCard 
              title={t('dashboard.totalGameSessions')}
              value={totalActiveSessions}
              icon={<Users className="h-6 w-6 text-emerald-600" />}
              subtitle={t('dashboard.nonExpiredSessions')}
            />
            <StatsCard 
              title={t('dashboard.totalGamesCreated')}
              value={totalGamesCreated}
              icon={<BookOpen className="h-6 w-6 text-purple-600" />}
              subtitle={`${totalPlanifications} ${t('dashboard.totalPlanifications')}`}
            />
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="min-h-[120px] flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t('dashboard.quickActions')}</h3>
                    <p className="text-sm text-gray-600 mb-4">{t('dashboard.manageSchools')}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                      <Link to="/schools/add">
                        <Plus className="h-4 w-4 mr-2" />
                        {t('dashboard.addSchool')}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-200">
                      <Link to="/schools">
                        <List className="h-4 w-4 mr-2" />
                        {t('dashboard.schoolsList')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tables Section - Vertical Layout */}
          <div className="space-y-8">
            {/* Games Created by School */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                  {t('dashboard.gamesCreatedBySchool')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 border-b border-gray-200">
                        <TableHead className="font-bold text-gray-800 py-4 px-6">{t('dashboard.school')}</TableHead>
                        <TableHead className="font-bold text-gray-800 py-4 px-6">{t('dashboard.game')}</TableHead>
                        <TableHead className="font-bold text-gray-800 py-4 px-6 text-center">{t('dashboard.activeSessions')}</TableHead>
                        <TableHead className="font-bold text-gray-800 py-4 px-6 text-center">{t('dashboard.totalSessions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gamesData.map((game, index) => (
                        <TableRow key={game.id} className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                          <TableCell className="font-semibold text-gray-900 py-4 px-6">{game.schoolName}</TableCell>
                          <TableCell className="text-gray-700 py-4 px-6">{game.gameName}</TableCell>
                          <TableCell className="text-center py-4 px-6">
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 font-medium px-3 py-1">
                              {game.sessionsActive}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700 text-center py-4 px-6 font-medium">{game.totalSessions}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Planifications Created */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Users className="h-6 w-6 mr-3 text-purple-600" />
                  {t('dashboard.planificationsCreated')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 border-b border-gray-200">
                        <TableHead className="font-bold text-gray-800 py-4 px-6">{t('dashboard.school')}</TableHead>
                        <TableHead className="font-bold text-gray-800 py-4 px-6">{t('dashboard.game')}</TableHead>
                        <TableHead className="font-bold text-gray-800 py-4 px-6">{t('dashboard.planification')}</TableHead>
                        <TableHead className="font-bold text-gray-800 py-4 px-6 text-center">{t('dashboard.status')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {planificationsData.map((planification, index) => (
                        <TableRow key={planification.id} className={`hover:bg-purple-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                          <TableCell className="font-semibold text-gray-900 py-4 px-6">{planification.schoolName}</TableCell>
                          <TableCell className="text-gray-700 py-4 px-6">{planification.gameName}</TableCell>
                          <TableCell className="text-gray-700 py-4 px-6">{planification.planificationName}</TableCell>
                          <TableCell className="text-center py-4 px-6">
                            <Badge 
                              variant="secondary"
                              className={
                                planification.status === 'active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200 font-medium px-3 py-1' :
                                planification.status === 'completed' ? 'bg-blue-100 text-blue-800 border-blue-200 font-medium px-3 py-1' :
                                'bg-orange-100 text-orange-800 border-orange-200 font-medium px-3 py-1'
                              }
                            >
                              {planification.status === 'active' ? t('dashboard.active') :
                               planification.status === 'completed' ? t('dashboard.completed') : t('dashboard.pending')}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
