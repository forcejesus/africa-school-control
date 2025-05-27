
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { LoadingProgress } from "@/components/LoadingProgress";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const { toast } = useToast();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation de connexion
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (formData.email && formData.password) {
      toast({
        title: t('auth.loginSuccess'),
        description: t('auth.welcomeMessage'),
      });
      
      // Call the login handler after a brief delay
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1000);
    } else {
      toast({
        title: t('auth.loginError'),
        description: t('auth.checkCredentials'),
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <LoadingProgress isLoading={isLoading} message={t('auth.connectionInProgress')} />
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-4">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center"
              >
                <Gamepad2 className="w-8 h-8 text-white" />
              </motion.div>
              
              <div>
                <CardTitle className="text-2xl font-bold">{t('auth.title')}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {t('auth.subtitle')}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('auth.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@akili.com"
                        className="pl-10 h-12"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t('auth.password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => 
                        handleInputChange("rememberMe", checked as boolean)
                      }
                    />
                    <Label htmlFor="remember" className="text-sm">
                      {t('auth.rememberMe')}
                    </Label>
                  </div>
                  
                  <Button variant="link" className="px-0 text-sm">
                    {t('auth.forgotPassword')}
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? t('auth.signingIn') : t('auth.signIn')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
