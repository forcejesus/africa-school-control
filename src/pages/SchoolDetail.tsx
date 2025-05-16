
import { useParams, Link, useNavigate } from "react-router-dom";
import { Edit, ArrowLeft, Users, BookOpen, Mail, Phone } from "lucide-react";
import { schools, subscriptions, activities } from "@/utils/dummyData";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubscriptionCard from "@/components/SubscriptionCard";
import ActivityChart from "@/components/ActivityChart";

const SchoolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find school by ID
  const school = schools.find(s => s.id === id);
  
  // Find school's subscription
  const subscription = subscriptions.find(s => s.schoolId === id);
  
  // Find school's activities
  const schoolActivities = activities.filter(a => a.schoolId === id);
  
  // Activity chart data
  const activityChartData = schoolActivities.map(activity => ({
    date: activity.date,
    gamesCreated: activity.gamesCreated,
    gamesPlayed: activity.gamesPlayed,
    activeUsers: activity.activeUsers,
  }));
  
  // If school not found
  if (!school) {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">School Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The school you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/schools">Back to Schools</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" asChild>
                <Link to="/schools">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">{school.name}</h1>
              <Badge variant={
                school.status === 'active' ? 'success' :
                school.status === 'inactive' ? 'default' : 'warning'
              }>
                {school.status.charAt(0).toUpperCase() + school.status.slice(1)}
              </Badge>
            </div>
            
            <Button asChild>
              <Link to={`/schools/edit/${school.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit School
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">School Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={school.logo} alt={school.name} />
                    <AvatarFallback className="text-xl">{school.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{school.name}</h2>
                  <p className="text-muted-foreground">{school.country}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Users</p>
                      <p className="text-sm text-muted-foreground">
                        {school.teachersCount} Teachers, {school.studentsCount} Students
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Admin</p>
                      <p className="text-sm text-muted-foreground">
                        {school.adminName}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {school.contactEmail}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {school.contactPhone}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="col-span-1 lg:col-span-2">
              <Tabs defaultValue="subscription">
                <TabsList className="mb-4">
                  <TabsTrigger value="subscription">Subscription</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
                
                <TabsContent value="subscription" className="space-y-4">
                  {subscription ? (
                    <SubscriptionCard subscription={subscription} />
                  ) : (
                    <Card>
                      <CardContent className="flex items-center justify-center p-6">
                        <p className="text-muted-foreground">No subscription found for this school.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="activities" className="space-y-4">
                  {schoolActivities.length > 0 ? (
                    <>
                      <ActivityChart 
                        data={activityChartData} 
                        title="School Activity Overview"
                      />
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Activity History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Games Created</TableHead>
                                <TableHead>Games Played</TableHead>
                                <TableHead>Active Users</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {schoolActivities.map((activity) => (
                                <TableRow key={activity.id}>
                                  <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                                  <TableCell>{activity.gamesCreated}</TableCell>
                                  <TableCell>{activity.gamesPlayed}</TableCell>
                                  <TableCell>{activity.activeUsers}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <Card>
                      <CardContent className="flex items-center justify-center p-6">
                        <p className="text-muted-foreground">No activities recorded for this school yet.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="users" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">User Management</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-6">
                      <p className="text-muted-foreground">User management will be implemented in a future update.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetail;
