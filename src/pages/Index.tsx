
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
import { motion } from "framer-motion";
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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 p-8">
        <motion.div 
          className="max-w-7xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Statistics Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={itemVariants}
          >
            <StatsCard 
              title={t('dashboard.totalSchools')}
              value={getTotalSchools()}
              icon={<School className="h-7 w-7" />}
              subtitle={`${getTotalActiveSchools()} ${t('dashboard.activeSubscriptions')}`}
              iconColor="from-blue-500 to-blue-600"
            />
            <StatsCard 
              title={t('dashboard.totalGameSessions')}
              value={totalActiveSessions}
              icon={<Users className="h-7 w-7" />}
              subtitle={t('dashboard.nonExpiredSessions')}
              iconColor="from-emerald-500 to-emerald-600"
            />
            <StatsCard 
              title={t('dashboard.totalGamesCreated')}
              value={totalGamesCreated}
              icon={<BookOpen className="h-7 w-7" />}
              subtitle={`${totalPlanifications} ${t('dashboard.totalPlanifications')}`}
              iconColor="from-purple-500 to-purple-600"
            />
            <Card className="professional-card overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      {t('dashboard.quickActions')}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {t('dashboard.manageSchools')}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button asChild size="sm" className="professional-button">
                      <Link to="/schools/add">
                        <Plus className="h-4 w-4 mr-2" />
                        {t('dashboard.addSchool')}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                      <Link to="/schools">
                        <List className="h-4 w-4 mr-2" />
                        {t('dashboard.schoolsList')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Tables Section */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Games Created by School */}
            <Card className="table-professional">
              <CardHeader className="table-header-professional">
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                  {t('dashboard.gamesCreatedBySchool')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-slate-200/80">
                        <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 px-6">
                          {t('dashboard.school')}
                        </TableHead>
                        <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 px-6">
                          {t('dashboard.game')}
                        </TableHead>
                        <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 px-6 text-center">
                          {t('dashboard.activeSessions')}
                        </TableHead>
                        <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 px-6 text-center">
                          {t('dashboard.totalSessions')}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gamesData.map((game, index) => (
                        <TableRow 
                          key={game.id} 
                          className="hover:bg-blue-50/50 transition-colors duration-200 border-b border-slate-100/50"
                        >
                          <TableCell className="font-semibold text-slate-900 dark:text-slate-100 py-4 px-6">
                            {game.schoolName}
                          </TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300 py-4 px-6">
                            {game.gameName}
                          </TableCell>
                          <TableCell className="text-center py-4 px-6">
                            <Badge className="badge-success font-medium px-3 py-1">
                              {game.sessionsActive}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300 text-center py-4 px-6 font-medium">
                            {game.totalSessions}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Planifications Created */}
            <Card className="table-professional">
              <CardHeader className="table-header-professional">
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  <Users className="h-6 w-6 mr-3 text-purple-600" />
                  {t('dashboard.planificationsCreated')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-slate-200/80">
                        <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 px-6">
                          {t('dashboard.school')}
                        </TableHead>
                        <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 px-6">
                          {t('dashboard.game')}
                        </TableHead>
                        <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 px-6">
                          {t('dashboard.planification')}
                        </TableHead>
                        <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 px-6 text-center">
                          {t('dashboard.status')}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {planificationsData.map((planification, index) => (
                        <TableRow 
                          key={planification.id} 
                          className="hover:bg-purple-50/50 transition-colors duration-200 border-b border-slate-100/50"
                        >
                          <TableCell className="font-semibold text-slate-900 dark:text-slate-100 py-4 px-6">
                            {planification.schoolName}
                          </TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300 py-4 px-6">
                            {planification.gameName}
                          </TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300 py-4 px-6">
                            {planification.planificationName}
                          </TableCell>
                          <TableCell className="text-center py-4 px-6">
                            <Badge 
                              className={cn(
                                "font-medium px-3 py-1",
                                planification.status === 'active' ? 'badge-success' :
                                planification.status === 'completed' ? 'badge-info' :
                                'badge-warning'
                              )}
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
