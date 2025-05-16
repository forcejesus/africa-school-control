
import { useState } from "react";
import { Link } from "react-router-dom";
import { School } from "@/utils/data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, PlusCircle } from "lucide-react";
import SchoolCard from "./SchoolCard";

interface SchoolsListProps {
  schools: School[];
}

export function SchoolsList({ schools }: SchoolsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter schools based on search term and status
  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           school.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || school.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher des écoles..."
              className="w-full pl-9 py-2.5 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] text-base">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-base">Tous les statuts</SelectItem>
              <SelectItem value="active" className="text-base">Actif</SelectItem>
              <SelectItem value="inactive" className="text-base">Inactif</SelectItem>
              <SelectItem value="pending" className="text-base">En attente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Link to="/schools/add">
          <Button className="text-base">
            <PlusCircle className="mr-2 h-5 w-5" />
            Ajouter une école
          </Button>
        </Link>
      </div>
      
      {filteredSchools.length === 0 ? (
        <div className="text-center py-12 border rounded-md">
          <p className="text-lg text-muted-foreground">Aucune école trouvée</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SchoolsList;
