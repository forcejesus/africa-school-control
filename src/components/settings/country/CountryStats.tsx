
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountryStatistics } from "@/services/subscriptionService";
import { Globe, School, TrendingUp, BarChart3 } from "lucide-react";

interface CountryStatsProps {
  statistics: CountryStatistics;
  loading: boolean;
}

export function CountryStats({ statistics, loading }: CountryStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "Total des pays",
      value: statistics.totalPays,
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total des écoles",
      value: statistics.totalEcoles,
      icon: School,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pays avec écoles",
      value: statistics.paysAvecEcoles,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Moyenne écoles/pays",
      value: statistics.moyenneEcolesParPays.toFixed(1),
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
