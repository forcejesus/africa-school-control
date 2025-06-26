
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Shield, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingProgress } from "@/components/LoadingProgress";
import { ErrorDialog } from "@/components/auth/ErrorDialog";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errorDialog, setErrorDialog] = useState({ open: false, message: "" });
  const { t } = useI18n();
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const success = await login(formData);
      if (!success) {
        setErrorDialog({
          open: true,
          message: "Identifiants incorrects. Veuillez vérifier votre email et mot de passe."
        });
      }
    } catch (error: any) {
      setErrorDialog({
        open: true,
        message: error.message || "Impossible de se connecter au serveur. Veuillez réessayer plus tard."
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const closeErrorDialog = () => {
    setErrorDialog({ open: false, message: "" });
  };

  return (
    <>
      <LoadingProgress isLoading={loading} message={t('auth.connectionInProgress')} />
      <ErrorDialog 
        open={errorDialog.open}
        onClose={closeErrorDialog}
        description={errorDialog.message}
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-50/30 to-orange-100/20 p-4">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm modern-card border-red-200">
            <CardHeader className="text-center space-y-6 pb-8 bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <ShieldCheck className="w-10 h-10 text-white" />
              </motion.div>
              
              <div className="space-y-3">
                <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                  <Shield className="w-8 h-8 text-red-500" />
                  Administration | AKILI
                </CardTitle>
                <CardDescription className="text-lg text-slate-600 leading-relaxed">
                  Interface protégée réservée aux administrateurs
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="pb-8 px-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-slate-700 font-medium">
                      {t('auth.email')}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 h-5 w-5 text-orange-400" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Votre adresse email" 
                        className="pl-12 h-14 border-orange-200 focus:border-orange-400 focus:ring-orange-200 rounded-xl text-base" 
                        value={formData.email} 
                        onChange={e => handleInputChange("email", e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-slate-700 font-medium">
                      {t('auth.password')}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 h-5 w-5 text-orange-400" />
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Votre mot de passe" 
                        className="pl-12 pr-12 h-14 border-orange-200 focus:border-orange-400 focus:ring-orange-200 rounded-xl text-base" 
                        value={formData.password} 
                        onChange={e => handleInputChange("password", e.target.value)} 
                        required 
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-3 top-3 h-8 w-8 hover:bg-orange-100 rounded-lg" 
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5 text-orange-500" /> : <Eye className="h-5 w-5 text-orange-500" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('auth.signingIn')}
                    </div>
                  ) : (
                    t('auth.signIn')
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
