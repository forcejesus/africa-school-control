
import { Users, BookOpen, Calendar, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsSectionProps {
  studentsCount: number;
  gamesCount: number;
  planificationsCount: number;
  totalQuestions: number;
}

export function StatsCardsSection({ 
  studentsCount, 
  gamesCount, 
  planificationsCount, 
  totalQuestions 
}: StatsCardsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-orange-50">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-700">{studentsCount}</p>
              <p className="text-base text-muted-foreground font-medium">Apprenants</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-700">{gamesCount}</p>
              <p className="text-base text-muted-foreground font-medium">Jeux créés</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-green-50">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <div>
              <p className="text-4xl font-bold text-green-700">{planificationsCount}</p>
              <p className="text-base text-muted-foreground font-medium">Planifications</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-purple-50">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-700">{totalQuestions}</p>
              <p className="text-base text-muted-foreground font-medium">Questions totales</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
