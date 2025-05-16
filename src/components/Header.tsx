
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="border-b px-6 py-3 sticky top-0 bg-background z-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Plateforme d'Administration Scolaire</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-3 h-5 w-5 text-muted-foreground" /> {/* Icône agrandie et repositionnée */}
            <Input
              type="search"
              placeholder="Rechercher..."
              className="w-full pl-9 py-2.5 text-base" /* Input légèrement plus grand avec texte plus grand */
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-6 w-6" /> {/* Icône agrandie */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full"> {/* Avatar agrandi */}
                <Avatar className="h-10 w-10"> {/* Avatar agrandi */}
                  <AvatarImage src="" alt="Utilisateur Admin" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="text-base">Mon compte</DropdownMenuLabel> {/* Texte agrandi */}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-base">
                <User className="mr-2 h-5 w-5" /> {/* Icône agrandie */}
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-base">Paramètres</DropdownMenuItem> {/* Texte agrandi */}
              <DropdownMenuItem className="text-base">Déconnexion</DropdownMenuItem> {/* Texte agrandi */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
