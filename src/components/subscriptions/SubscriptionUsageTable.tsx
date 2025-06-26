
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { EcoleUtilisation } from "@/services/subscriptionStatsService";
import { School, Users, GraduationCap, Gamepad2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SubscriptionUsageTableProps {
  ecoles: EcoleUtilisation[];
}

export function SubscriptionUsageTable({ ecoles }: SubscriptionUsageTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  // Filter schools based on search term and status
  const filteredEcoles = ecoles.filter(ecole => {
    const matchesSearch = ecole.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ecole.statutGeneral === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'Bon (<50%)':
        return <Badge className="bg-green-100 text-green-700 border-green-200 text-sm">Bon</Badge>;
      case 'Modéré (>50%)':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-sm">Modéré</Badge>;
      case 'Attention (>80%)':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-sm">Attention</Badge>;
      case 'Critique (>90%)':
        return <Badge className="bg-red-100 text-red-700 border-red-200 text-sm">Critique</Badge>;
      case 'Limite atteinte':
        return <Badge variant="destructive" className="text-sm">Limite atteinte</Badge>;
      case 'Aucun abonnement':
        return <Badge variant="outline" className="text-sm">Aucun abonnement</Badge>;
      default:
        return <Badge className="text-sm">{statut}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const handleEcoleClick = (ecoleId: string) => {
    navigate(`/ecoles/${ecoleId}`);
  };

  // Get unique statuses for filter
  const uniqueStatuses = [...new Set(ecoles.map(ecole => ecole.statutGeneral))];

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <motion.div 
        className="modern-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
              <Input
                type="search"
                placeholder="Rechercher une école..."
                className="pl-10 py-3 text-base border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px] text-base border-orange-200 focus:border-orange-400">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-base">Tous les statuts</SelectItem>
                {uniqueStatuses.map(status => (
                  <SelectItem key={status} value={status} className="text-base">{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-slate-600 font-medium">
            {filteredEcoles.length} école(s) trouvée(s)
          </div>
        </div>
      </motion.div>

      {/* Enhanced Table */}
      <motion.div 
        className="modern-card overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
              <TableHead className="text-base font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  École
                </div>
              </TableHead>
              <TableHead className="text-base font-semibold text-slate-700">Abonnement</TableHead>
              <TableHead className="text-base font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Enseignants
                </div>
              </TableHead>
              <TableHead className="text-base font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Apprenants
                </div>
              </TableHead>
              <TableHead className="text-base font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4" />
                  Jeux
                </div>
              </TableHead>
              <TableHead className="text-base font-semibold text-slate-700">Statut</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {filteredEcoles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <Search className="h-12 w-12 mb-4 text-orange-300" />
                    <p className="text-lg font-medium">Aucune école trouvée</p>
                    <p className="text-sm">Essayez de modifier vos critères de recherche</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredEcoles.map((ecole, index) => (
                <motion.tr 
                  key={ecole._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-orange-50/50 transition-colors duration-200 border-b border-orange-100 cursor-pointer"
                  onClick={() => handleEcoleClick(ecole._id)}
                >
                  <TableCell className="text-base">
                    <div>
                      <div className="font-medium text-slate-900 hover:text-orange-600 transition-colors">
                        {ecole.libelle}
                      </div>
                      <div className="text-sm text-slate-500">{ecole.ville}</div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-base">
                    {ecole.abonnement ? (
                      <div>
                        <div className="font-medium text-slate-900">{ecole.abonnement.nom}</div>
                        <div className="text-sm text-slate-500">{formatPrice(ecole.abonnement.prix)}</div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Aucun</span>
                    )}
                  </TableCell>
                  
                  <TableCell className="text-base">
                    {ecole.utilisation.enseignants ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{ecole.utilisation.enseignants.utilise}/{ecole.utilisation.enseignants.limite}</span>
                          <span className="text-slate-500">{ecole.utilisation.enseignants.pourcentage}%</span>
                        </div>
                        <Progress value={ecole.utilisation.enseignants.pourcentage} className="h-2" />
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  
                  <TableCell className="text-base">
                    {ecole.utilisation.apprenants ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{ecole.utilisation.apprenants.utilise}/{ecole.utilisation.apprenants.limite}</span>
                          <span className="text-slate-500">{ecole.utilisation.apprenants.pourcentage}%</span>
                        </div>
                        <Progress value={ecole.utilisation.apprenants.pourcentage} className="h-2" />
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  
                  <TableCell className="text-base">
                    {ecole.utilisation.jeux ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{ecole.utilisation.jeux.utilise}/{ecole.utilisation.jeux.limite}</span>
                          <span className="text-slate-500">{ecole.utilisation.jeux.pourcentage}%</span>
                        </div>
                        <Progress value={ecole.utilisation.jeux.pourcentage} className="h-2" />
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  
                  <TableCell>{getStatutBadge(ecole.statutGeneral)}</TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
