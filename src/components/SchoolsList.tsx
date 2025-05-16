
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
import SkeletonCard from "./SkeletonCard";

interface SchoolsListProps {
  schools: School[];
  isLoading?: boolean;
}

export function SchoolsList({ schools, isLoading = false }: SchoolsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter schools based on search term and status
  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           school.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || school.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 w-full md:w-auto">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-2.5 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher des écoles..."
              className="w-full pl-9 py-2.5 text-base transition-all border-purple-200 focus-visible:ring-purple-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] text-base border-purple-200">
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
          <Button className="text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-300/30">
            <PlusCircle className="mr-2 h-5 w-5" />
            Ajouter une école
          </Button>
        </Link>
      </div>
      
      {isLoading ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div key={index} variants={item}>
              <SkeletonCard />
            </motion.div>
          ))}
        </motion.div>
      ) : filteredSchools.length === 0 ? (
        <motion.div 
          className="text-center py-12 border-2 border-dashed border-purple-200 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-muted-foreground">Aucune école trouvée</p>
          <Button 
            variant="link" 
            className="mt-4 text-indigo-600 hover:text-indigo-800"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
          >
            Réinitialiser les filtres
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredSchools.map((school) => (
            <motion.div key={school.id} variants={item}>
              <SchoolCard school={school} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default SchoolsList;
