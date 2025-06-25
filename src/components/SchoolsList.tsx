
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ApiSchool, SchoolService } from "@/services/schoolService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, PlusCircle, Filter, Building2, Users } from "lucide-react";
import SchoolCard from "./SchoolCard";
import SkeletonCard from "./SkeletonCard";

interface SchoolsListProps {
  schools: ApiSchool[];
  isLoading?: boolean;
}

export function SchoolsList({ schools, isLoading = false }: SchoolsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  
  // Get unique countries for filter
  const uniqueCountries = Array.from(new Set(schools.map(school => school.pays.libelle)));
  
  // Filter schools based on search term, status, and country
  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.libelle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           school.pays.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           school.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           school.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Pour le moment, on considère toutes les écoles comme actives
    const matchesStatus = statusFilter === "all" || statusFilter === "active";
    
    const matchesCountry = countryFilter === "all" || school.pays.libelle === countryFilter;
    
    return matchesSearch && matchesStatus && matchesCountry;
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
      {/* Enhanced Header Section */}
      <motion.div 
        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-indigo-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1 w-full">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 text-indigo-400 -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Rechercher par nom, ville, pays ou email..."
                className="w-full pl-10 py-3 text-base transition-all border-indigo-200 focus-visible:ring-indigo-400 bg-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700">Filtres:</span>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] text-base border-indigo-200">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-base">Tous</SelectItem>
                  <SelectItem value="active" className="text-base">Actif</SelectItem>
                  <SelectItem value="inactive" className="text-base">Inactif</SelectItem>
                  <SelectItem value="pending" className="text-base">En attente</SelectItem>
                </SelectContent>
              </Select>

              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-[140px] text-base border-indigo-200">
                  <SelectValue placeholder="Pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-base">Tous pays</SelectItem>
                  {uniqueCountries.map((country) => (
                    <SelectItem key={country} value={country} className="text-base">
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Add School Button */}
          <Link to="/schools/add">
            <Button className="text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-300/30 px-6 py-3">
              <PlusCircle className="mr-2 h-5 w-5" />
              Ajouter une école
            </Button>
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-indigo-100">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-indigo-500" />
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-indigo-600">{filteredSchools.length}</span> école(s) trouvée(s)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-purple-600">
                {filteredSchools.reduce((total, school) => total + school.apprenants.length, 0)}
              </span> apprenant(s) au total
            </span>
          </div>
        </div>
      </motion.div>
      
      {/* Schools Grid */}
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
          className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xl border-2 border-dashed border-indigo-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-lg opacity-20"></div>
              <div className="relative bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-full">
                <Building2 className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">Aucune école trouvée</p>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCountryFilter("all");
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredSchools.map((school) => (
            <motion.div key={school._id} variants={item}>
              <SchoolCard school={SchoolService.transformApiSchoolToLocal(school)} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default SchoolsList;
