
import Header from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { 
  BarChart, 
  LineChart, 
  Users, 
  School, 
  PlayCircle,
  BookOpen
} from "lucide-react";
import ActivityChart from "@/components/ActivityChart";

const Analytics = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Analytique</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble des statistiques et activités sur la plateforme.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="Écoles actives" 
              value="42" 
              icon={<School className="h-5 w-5 text-primary" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard 
              title="Enseignants" 
              value="231" 
              icon={<Users className="h-5 w-5 text-primary" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard 
              title="Apprenants" 
              value="1,543" 
              icon={<BookOpen className="h-5 w-5 text-primary" />}
              trend={{ value: 24, isPositive: true }}
            />
            <StatsCard 
              title="Jeux joués" 
              value="2,856" 
              icon={<PlayCircle className="h-5 w-5 text-primary" />}
              trend={{ value: 18, isPositive: true }}
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Activité récente</h2>
            <div className="border rounded-md p-6 bg-white">
              <ActivityChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
