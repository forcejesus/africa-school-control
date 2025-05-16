
import { School } from "@/utils/data/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Mail, Phone, Edit, Eye, Trash } from "lucide-react";
import { Link } from "react-router-dom";

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className={`h-2 ${
        school.status === 'active' ? 'bg-green-500' :
        school.status === 'inactive' ? 'bg-gray-500' : 'bg-yellow-500'
      }`}></div>
      
      <CardHeader className="p-4 flex flex-row justify-between items-center">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={school.logo} alt={school.name} />
            <AvatarFallback className="text-lg">{school.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-lg">{school.name}</h3>
            <Badge className={`mt-1 ${getStatusColor(school.status)}`}>
              {school.status === 'active' ? 'Actif' :
              school.status === 'inactive' ? 'Inactif' : 'En attente'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">
              Inscrit le {new Date(school.registrationDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {school.teachersCount} enseignants, {school.studentsCount} élèves
            </span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Mail className="h-4 w-4 mr-2" />
            <span className="text-sm truncate">{school.contactEmail}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Phone className="h-4 w-4 mr-2" />
            <span className="text-sm">{school.contactPhone}</span>
          </div>
        </div>
        
        <div className="border-t pt-3 flex justify-between">
          <div>
            <span className="text-sm font-medium">
              Admin: {school.adminName}
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              ({school.country})
            </span>
          </div>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/schools/${school.id}`}>
                <Eye className="h-4 w-4 mr-1" /> Voir
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/schools/edit/${school.id}`}>
                <Edit className="h-4 w-4 mr-1" /> Modifier
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SchoolCard;
