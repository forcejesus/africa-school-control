
import { School, Users, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import SubscriptionCard from "@/components/SubscriptionCard";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const Dashboard = () => {
  const expiringSubscriptions = getExpiringSubscriptions();
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              title="Total Schools" 
              value={getTotalSchools()}
              icon={<School className="h-5 w-5 text-primary" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard 
              title="Active Schools" 
              value={getTotalActiveSchools()}
              icon={<School className="h-5 w-5 text-green-500" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard 
              title="Total Students" 
              value={getTotalStudents().toLocaleString()}
              icon={<Users className="h-5 w-5 text-blue-500" />}
              trend={{ value: 5, isPositive: true }}
            />
            <StatsCard 
              title="Total Teachers" 
              value={getTotalTeachers().toLocaleString()}
              icon={<BookOpen className="h-5 w-5 text-amber-500" />}
              trend={{ value: 3, isPositive: true }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Abonnements en cours</CardTitle>
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
                        className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-100 rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={school?.logo} alt={school?.name} />
                            <AvatarFallback>{school?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-base">{school?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Expire : {new Date(sub.endDate || sub.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-base">
                          {sub.plan}
                        </Badge>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-base text-muted-foreground py-4">
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
                  <span className="text-base text-muted-foreground">Total des abonnements</span>
                  <span className="font-medium text-base">{subscriptions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-muted-foreground">Abonnements actifs</span>
                  <span className="font-medium text-base">
                    {subscriptions.filter(sub => sub.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-muted-foreground">Abonnements expirés</span>
                  <span className="font-medium text-base">
                    {subscriptions.filter(sub => sub.status === 'expired').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-muted-foreground">En attente</span>
                  <span className="font-medium text-base">
                    {subscriptions.filter(sub => sub.status === 'pending').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base">Date</TableHead>
                      <TableHead className="text-base">École</TableHead>
                      <TableHead className="text-base">Jeux joués</TableHead>
                      <TableHead className="text-base">Utilisateurs actifs</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getRecentActivities().map((activity) => {
                      const school = schools.find(s => s.id === activity.schoolId);
                      return (
                        <TableRow key={activity.id}>
                          <TableCell className="text-base">{new Date(activity.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium text-base">{school?.name}</TableCell>
                          <TableCell className="text-base">{activity.gamesPlayed}</TableCell>
                          <TableCell className="text-base">{activity.activeUsers}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques de la plateforme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-base text-muted-foreground">Total des jeux joués</span>
                  <span className="font-medium text-base">{getTotalGamesPlayed()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-muted-foreground">Moyenne d'étudiants par école</span>
                  <span className="font-medium text-base">
                    {Math.round(getTotalStudents() / getTotalSchools())}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-muted-foreground">Moyenne d'enseignants par école</span>
                  <span className="font-medium text-base">
                    {Math.round(getTotalTeachers() / getTotalSchools())}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-muted-foreground">Ratio étudiant-enseignant</span>
                  <span className="font-medium text-base">
                    {Math.round(getTotalStudents() / getTotalTeachers())}:1
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-muted-foreground">Taux d'activation des écoles</span>
                  <span className="font-medium text-base">
                    {Math.round((getTotalActiveSchools() / getTotalSchools()) * 100)}%
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
