
import Header from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { 
  BarChart, 
  LineChart, 
  Users, 
  School, 
  PlayCircle,
  BookOpen,
  Trophy,
  Medal,
  Star
} from "lucide-react";
import ActivityChart from "@/components/ActivityChart";
import { 
  getActivityChartData, 
  getTotalActiveSchools, 
  getTotalGamesPlayed, 
  getTotalStudents, 
  getTotalTeachers 
} from "@/utils/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Données factices pour les meilleurs joueurs
const topPlayers = [
  { id: 1, name: "Sophie Martin", school: "Lycée Français de Dakar", points: 8750, gamesPlayed: 45 },
  { id: 2, name: "Ahmed Benani", school: "Collège Saint-Exupéry", points: 7620, gamesPlayed: 38 },
  { id: 3, name: "Leila Mansour", school: "Institut Supérieur de Tunis", points: 7150, gamesPlayed: 42 },
  { id: 4, name: "Pascal Kouassi", school: "École Internationale d'Abidjan", points: 6980, gamesPlayed: 36 },
  { id: 5, name: "Aminata Diop", school: "Lycée Français de Dakar", points: 6540, gamesPlayed: 33 }
];

// Données factices pour les jeux les plus populaires
const popularGames = [
  { id: 1, name: "Mathé-Fun", plays: 2450, averageScore: 78, category: "Mathématiques" },
  { id: 2, name: "Géo-Quest", plays: 2100, averageScore: 82, category: "Géographie" },
  { id: 3, name: "Science-Lab", plays: 1850, averageScore: 75, category: "Sciences" },
  { id: 4, name: "Verb-Master", plays: 1720, averageScore: 80, category: "Langues" },
  { id: 5, name: "Hist-Voyage", plays: 1580, averageScore: 72, category: "Histoire" }
];

const Analytics = () => {
  const activityData = getActivityChartData();
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Analytique</h1>
          <p className="text-base text-muted-foreground">
            Vue d'ensemble des statistiques et activités sur la plateforme.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="Écoles actives" 
              value={getTotalActiveSchools().toString()} 
              icon={<School className="h-5 w-5 text-primary" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard 
              title="Enseignants" 
              value={getTotalTeachers().toString()} 
              icon={<Users className="h-5 w-5 text-primary" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard 
              title="Apprenants" 
              value={getTotalStudents().toLocaleString()} 
              icon={<BookOpen className="h-5 w-5 text-primary" />}
              trend={{ value: 24, isPositive: true }}
            />
            <StatsCard 
              title="Jeux joués" 
              value={getTotalGamesPlayed().toLocaleString()} 
              icon={<PlayCircle className="h-5 w-5 text-primary" />}
              trend={{ value: 18, isPositive: true }}
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Activité récente</h2>
            <div className="border rounded-md p-6 bg-white">
              <ActivityChart data={activityData} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-amber-500" />
                  Meilleurs joueurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-center text-base">#</TableHead>
                      <TableHead className="text-base">Apprenant</TableHead>
                      <TableHead className="text-base">École</TableHead>
                      <TableHead className="text-right text-base">Points</TableHead>
                      <TableHead className="text-right text-base">Jeux joués</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPlayers.map((player, index) => (
                      <TableRow key={player.id}>
                        <TableCell className="text-center font-medium text-base">
                          {index === 0 ? <Medal className="inline h-5 w-5 text-yellow-500" /> :
                          index === 1 ? <Medal className="inline h-5 w-5 text-gray-400" /> :
                          index === 2 ? <Medal className="inline h-5 w-5 text-amber-700" /> :
                          index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-base">{player.name}</TableCell>
                        <TableCell className="text-base">{player.school}</TableCell>
                        <TableCell className="text-right text-base">{player.points.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-base">{player.gamesPlayed}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Jeux les plus populaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base">Jeu</TableHead>
                      <TableHead className="text-base">Catégorie</TableHead>
                      <TableHead className="text-right text-base">Parties jouées</TableHead>
                      <TableHead className="text-right text-base">Score moyen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {popularGames.map((game) => (
                      <TableRow key={game.id}>
                        <TableCell className="font-medium text-base">{game.name}</TableCell>
                        <TableCell className="text-base">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {game.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-base">{game.plays.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-base">
                          <span 
                            className={`px-2 py-1 rounded-full text-sm ${
                              game.averageScore > 80 ? 'bg-green-100 text-green-700' :
                              game.averageScore > 70 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}
                          >
                            {game.averageScore}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques détaillées des jeux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h3 className="text-purple-800 font-medium text-lg mb-2">Temps de jeu moyen</h3>
                  <p className="text-3xl font-bold text-purple-900">24 min</p>
                  <p className="text-purple-700 text-base">+12% par rapport au mois dernier</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-blue-800 font-medium text-lg mb-2">Taux de complétion</h3>
                  <p className="text-3xl font-bold text-blue-900">78%</p>
                  <p className="text-blue-700 text-base">+5% par rapport au mois dernier</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="text-green-800 font-medium text-lg mb-2">Score moyen global</h3>
                  <p className="text-3xl font-bold text-green-900">76/100</p>
                  <p className="text-green-700 text-base">+3 points par rapport au mois dernier</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Répartition par niveau de difficulté</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base">Facile</span>
                      <span className="text-base font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-base">Moyen</span>
                      <span className="text-base font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-base">Difficile</span>
                      <span className="text-base font-medium">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Répartition par catégorie</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base">Mathématiques</span>
                      <span className="text-base font-medium">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-base">Sciences</span>
                      <span className="text-base font-medium">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-base">Langues</span>
                      <span className="text-base font-medium">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-base">Autres</span>
                      <span className="text-base font-medium">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
