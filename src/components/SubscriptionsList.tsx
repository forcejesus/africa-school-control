
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Search, MoreVertical, CreditCard, History, AlertCircle } from "lucide-react";
import { subscriptions } from "@/utils/data";

export function SubscriptionsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter subscriptions based on search term and status
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.schoolName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || subscription.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Status badge color variants
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="badge-success text-sm">Actif</Badge>; // Augmentation du texte du badge
      case 'expired':
        return <Badge variant="destructive" className="text-sm">Expiré</Badge>;
      case 'pending':
        return <Badge className="badge-warning text-sm">En attente</Badge>;
      default:
        return <Badge className="text-sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-3 h-5 w-5 text-muted-foreground" /> {/* Icône agrandie et repositionnée */}
            <Input
              type="search"
              placeholder="Rechercher des abonnements..."
              className="w-full pl-9 py-2.5 text-base" /* Input légèrement plus grand avec texte plus grand */
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] text-base"> {/* Augmentation de la largeur et taille du texte */}
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
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base">École</TableHead> {/* Augmentation de la taille du texte */}
              <TableHead className="text-base">Formule</TableHead>
              <TableHead className="text-base">Date de début</TableHead>
              <TableHead className="text-base">Date d'expiration</TableHead>
              <TableHead className="text-base">Statut</TableHead>
              <TableHead className="text-base">Prix</TableHead>
              <TableHead className="text-right text-base">Actions</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {filteredSubscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground text-base">
                  Aucun abonnement trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="text-base">{subscription.schoolName}</TableCell>
                  <TableCell className="text-base">{subscription.plan}</TableCell>
                  <TableCell className="text-base">{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-base">{new Date(subscription.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                  <TableCell className="text-base">{subscription.price} €</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" /> {/* Icône agrandie */}
                          <span className="sr-only">Ouvrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center cursor-pointer text-base">
                          <CreditCard className="mr-2 h-5 w-5" /> {/* Icône agrandie */}
                          <span>Renouveler</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center cursor-pointer text-base">
                          <History className="mr-2 h-5 w-5" /> {/* Icône agrandie */}
                          <span>Historique de paiement</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center cursor-pointer text-amber-500 text-base">
                          <AlertCircle className="mr-2 h-5 w-5" /> {/* Icône agrandie */}
                          <span>Notifier l'école</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SubscriptionsList;
