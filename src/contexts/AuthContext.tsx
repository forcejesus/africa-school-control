
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService, LoginCredentials, UserPayload } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserPayload | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const checkAuth = () => {
      const authenticated = AuthService.isAuthenticated();
      const userData = AuthService.getUser();
      
      setIsAuthenticated(authenticated);
      setUser(userData);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await AuthService.loginAdmin(credentials);
      
      if (response.statut === 200 && response.token) {
        const userData = AuthService.getUser();
        setIsAuthenticated(true);
        setUser(userData);
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${userData?.prenom} ${userData?.nom}`,
        });
        
        return true;
      } else {
        toast({
          title: "Erreur de connexion",
          description: response.message || "Identifiants incorrects",
          variant: "destructive"
        });
        return false;
      }
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Impossible de se connecter au serveur",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
