
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreVertical, Bell, Award, TrendingUp } from "lucide-react";
import { subscriptions } from "@/utils/data";
import { motion } from "framer-motion";

export function SubscriptionsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter subscriptions based on search term and status
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.schoolName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || subscription.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Status badge color variants with orange theme
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-sm font-medium">Actif</Badge>;
      case 'expired':
        return <Badge variant="destructive" className="text-sm font-medium">Expiré</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-sm font-medium">En attente</Badge>;
      default:
        return <Badge className="text-sm font-medium">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters Section with modern design */}
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
                placeholder="Rechercher des abonnements..."
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
                <SelectItem value="active" className="text-base">Actif</SelectItem>
                <SelectItem value="expired" className="text-base">Expiré</SelectItem>
                <SelectItem value="pending" className="text-base">En attente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-slate-600 font-medium">
            {filteredSubscriptions.length} abonnement(s) trouvé(s)
          </div>
        </div>
      </motion.div>
      
      {/* Table Section with modern design */}
      <motion.div 
        className="modern-card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
              <TableHead className="text-base font-semibold text-slate-700">École</TableHead>
              <TableHead className="text-base font-semibold text-slate-700">Formule</TableHead>
              <TableHead className="text-base font-semibold text-slate-700">Date de début</TableHead>
              <TableHead className="text-base font-semibold text-slate-700">Date d'expiration</TableHead>
              <TableHead className="text-base font-semibold text-slate-700">Statut</TableHead>
              <TableHead className="text-base font-semibold text-slate-700">Prix</TableHead>
              <TableHead className="text-right text-base font-semibold text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {filteredSubscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <Search className="h-12 w-12 mb-4 text-orange-300" />
                    <p className="text-lg font-medium">Aucun abonnement trouvé</p>
                    <p className="text-sm">Essayez de modifier vos critères de recherche</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredSubscriptions.map((subscription, index) => (
                <motion.tr 
                  key={subscription.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-orange-50/50 transition-colors duration-200"
                >
                  <TableCell className="text-base font-medium text-slate-900">{subscription.schoolName}</TableCell>
                  <TableCell className="text-base">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {subscription.plan}
                    </span>
                  </TableCell>
                  <TableCell className="text-base text-slate-600">{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-base text-slate-600">{new Date(subscription.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                  <TableCell className="text-base font-semibold text-slate-900">{subscription.price} €</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-orange-100">
                          <MoreVertical className="h-5 w-5 text-slate-600" />
                          <span className="sr-only">Ouvrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem className="flex items-center cursor-pointer text-base hover:bg-orange-50">
                          <TrendingUp className="mr-3 h-5 w-5 text-orange-500" />
                          <span>Renouveler</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center cursor-pointer text-base hover:bg-orange-50">
                          <Award className="mr-3 h-5 w-5 text-blue-500" />
                          <span>Historique de paiement</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center cursor-pointer text-base hover:bg-orange-50">
                          <Bell className="mr-3 h-5 w-5 text-amber-500" />
                          <span>Notifier l'école</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}

export default SubscriptionsList;
