
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AdminInfoCardProps {
  administrator: {
    prenom: string;
    nom: string;
    email: string;
    phone: string;
    matricule: string;
    statut: string;
    genre: string;
  };
}

export function AdminInfoCard({ administrator }: AdminInfoCardProps) {
  return (
    <Card className="border-orange-200 shadow-soft">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
        <CardTitle className="flex items-center text-orange-700 text-xl">
          <User className="mr-3 h-6 w-6" />
          Administrateur
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Nom complet</p>
            <p className="font-medium text-base">{administrator.prenom} {administrator.nom}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium text-base">{administrator.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Téléphone</p>
            <p className="font-medium text-base">{administrator.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Matricule</p>
            <p className="font-medium text-base">{administrator.matricule}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Statut</p>
            <Badge variant={administrator.statut === 'actif' ? 'default' : 'secondary'} 
                   className={administrator.statut === 'actif' ? 'bg-green-600 hover:bg-green-700' : ''}>
              {administrator.statut}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Genre</p>
            <p className="font-medium text-base">{administrator.genre}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
