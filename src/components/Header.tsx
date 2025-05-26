
import { Bell, Search, User, LogOut, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="border-b px-6 py-3 sticky top-0 bg-background/95 backdrop-blur-sm z-10 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Admin Akili
        </h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="w-full pl-9 py-2.5 text-base transition-all border-purple-200 focus-visible:ring-purple-400" 
            />
          </div>
          
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </Link>
          
          <Link to="/subscriptions">
            <Button variant="ghost" size="icon">
              <FileText className="h-6 w-6" />
            </Button>
          </Link>
          
          <ThemeSwitcher />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-purple-200 hover:border-purple-400 transition-all duration-300">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt="Utilisateur Admin" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">AU</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="text-base">Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-base">
                <User className="mr-2 h-5 w-5" />
                <span>Profil</span>
              </DropdownMenuItem>
              <Link to="/settings">
                <DropdownMenuItem className="text-base">Paramètres</DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="text-base text-red-500">
                <LogOut className="mr-2 h-5 w-5" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
