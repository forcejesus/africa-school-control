
import { Users, GraduationCap, Gamepad, Calendar, School, Plus } from "lucide-react";
import Header from "@/components/Header";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ModernStatsCard } from "@/components/ModernStatsCard";
import { QuickActionCard } from "@/components/QuickActionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { cn } from "@/lib/utils";

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
  
  // Calculs des statistiques
  const totalActiveSessions = gamesData.reduce((total, game) => total + game.sessionsActive, 0);
  const totalGamesCreated = gamesData.length;
  const totalPlanifications = planificationsData.length;
  const totalSchools = 12; // Example data
  
  const statsConfig = [
    {
      title: "Jeux Créés",
      value: totalGamesCreated.toString(),
      icon: Gamepad,
      bgGradient: "orange-gradient",
      iconBg: "bg-gradient-to-r from-orange-500 to-orange-600",
      subtitle: `${totalActiveSessions} sessions actives`,
      change: "+12%"
    },
    {
      title: "Planifications",
      value: totalPlanifications.toString(),
      icon: Calendar,
      bgGradient: "purple-gradient",
      iconBg: "bg-gradient-to-r from-purple-500 to-purple-600",
      subtitle: "En cours d'exécution",
      change: "+8%"
    },
    {
      title: "Enseignants",
      value: "24",
      icon: GraduationCap,
      bgGradient: "blue-gradient",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      subtitle: "Actifs ce mois",
      change: "+5%"
    },
    {
      title: "Apprenants",
      value: "456",
      icon: Users,
      bgGradient: "green-gradient",
      iconBg: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      subtitle: "Inscrits au total",
      change: "+15%"
    }
  ];

  const quickActions = [
    {
      title: "Ajouter une École",
      description: "Créer et configurer une nouvelle école dans le système",
      icon: School,
      href: "/schools/add",
      iconColor: "bg-gradient-to-r from-orange-500 to-orange-600"
    },
    {
      title: "Nouveau Jeu",
      description: "Développer un nouveau jeu éducatif interactif",
      icon: Plus,
      href: "/games/add",
      iconColor: "bg-gradient-to-r from-purple-500 to-purple-600"
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
      <Header />
      
      <div className="flex-1 p-6 md:p-8">
        <motion.div 
          className="max-w-7xl mx-auto space-y-6 md:space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Dashboard Header */}
          <DashboardHeader />
          
          {/* Statistics Cards */}
          <div className="stats-grid">
            {statsConfig.map((stat, index) => (
              <ModernStatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                subtitle={stat.subtitle}
                bgGradient={stat.bgGradient}
                iconBg={stat.iconBg}
                change={stat.change}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          {/* Quick Actions */}
          <motion.div 
            className="actions-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={action.title}
                title={action.title}
                description={action.description}
                icon={action.icon}
                href={action.href}
                iconColor={action.iconColor}
                delay={0.7 + index * 0.1}
              />
            ))}
          </motion.div>
          
          {/* Tables Section */}
          <motion.div 
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {/* Games Created by School */}
            <Card className="modern-card overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-orange-200/50">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                  <Gamepad className="h-5 w-5 mr-3 text-orange-600" />
                  {t('dashboard.gamesCreatedBySchool')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-orange-200/30">
                        <TableHead className="font-semibold text-slate-800 py-4 px-6">
                          {t('dashboard.school')}
                        </TableHead>
                        <TableHead className="font-semibold text-slate-800 py-4 px-6">
                          {t('dashboard.game')}
                        </TableHead>
                        <TableHead className="font-semibold text-slate-800 py-4 px-6 text-center">
                          {t('dashboard.activeSessions')}
                        </TableHead>
                        <TableHead className="font-semibold text-slate-800 py-4 px-6 text-center">
                          {t('dashboard.totalSessions')}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gamesData.map((game, index) => (
                        <TableRow 
                          key={game.id} 
                          className="hover:bg-orange-50/50 transition-colors duration-200 border-b border-orange-100/30"
                        >
                          <TableCell className="font-medium text-slate-900 py-4 px-6">
                            {game.schoolName}
                          </TableCell>
                          <TableCell className="text-slate-700 py-4 px-6">
                            {game.gameName}
                          </TableCell>
                          <TableCell className="text-center py-4 px-6">
                            <Badge className="badge-primary font-medium px-3 py-1">
                              {game.sessionsActive}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-700 text-center py-4 px-6 font-medium">
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
            <Card className="modern-card overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200/50">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-purple-600" />
                  {t('dashboard.planificationsCreated')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-purple-200/30">
                        <TableHead className="font-semibold text-slate-800 py-4 px-6">
                          {t('dashboard.school')}
                        </TableHead>
                        <TableHead className="font-semibold text-slate-800 py-4 px-6">
                          {t('dashboard.game')}
                        </TableHead>
                        <TableHead className="font-semibold text-slate-800 py-4 px-6">
                          {t('dashboard.planification')}
                        </TableHead>
                        <TableHead className="font-semibold text-slate-800 py-4 px-6 text-center">
                          {t('dashboard.status')}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {planificationsData.map((planification, index) => (
                        <TableRow 
                          key={planification.id} 
                          className="hover:bg-purple-50/50 transition-colors duration-200 border-b border-purple-100/30"
                        >
                          <TableCell className="font-medium text-slate-900 py-4 px-6">
                            {planification.schoolName}
                          </TableCell>
                          <TableCell className="text-slate-700 py-4 px-6">
                            {planification.gameName}
                          </TableCell>
                          <TableCell className="text-slate-700 py-4 px-6">
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
