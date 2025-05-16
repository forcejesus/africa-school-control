
import { BarChart, School, Users, BookOpen, Activity } from "lucide-react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import ActivityChart from "@/components/ActivityChart";
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
  getActivityChartData, 
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
  const activityData = getActivityChartData();
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ActivityChart data={activityData} />
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Expiring Subscriptions</CardTitle>
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
                            <p className="font-medium">{school?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Expires: {new Date(sub.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100">
                          {sub.plan.toUpperCase()}
                        </Badge>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    No subscriptions expiring soon
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Games Played</TableHead>
                      <TableHead>Active Users</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getRecentActivities().map((activity) => {
                      const school = schools.find(s => s.id === activity.schoolId);
                      return (
                        <TableRow key={activity.id}>
                          <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{school?.name}</TableCell>
                          <TableCell>{activity.gamesPlayed}</TableCell>
                          <TableCell>{activity.activeUsers}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Games Played</span>
                  <span className="font-medium">{getTotalGamesPlayed()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Average Students per School</span>
                  <span className="font-medium">
                    {Math.round(getTotalStudents() / getTotalSchools())}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Average Teachers per School</span>
                  <span className="font-medium">
                    {Math.round(getTotalTeachers() / getTotalSchools())}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Student-Teacher Ratio</span>
                  <span className="font-medium">
                    {Math.round(getTotalStudents() / getTotalTeachers())}:1
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">School Activation Rate</span>
                  <span className="font-medium">
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
