
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingProgress } from "@/components/LoadingProgress";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { t } = useI18n();
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <LoadingProgress isLoading={loading} message={t('auth.connectionInProgress')} />
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-4">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-6 pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              
              <div className="space-y-3">
                <CardTitle className="text-3xl font-bold text-slate-900">
                  {t('auth.title')}
                </CardTitle>
                <CardDescription className="text-lg text-slate-600 leading-relaxed">
                  {t('auth.subtitle')}
                </CardDescription>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                  <p className="text-amber-800 text-sm font-medium">
                    Accès réservé aux super administrateurs
                  </p>
                </div>
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
                      <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Votre adresse email"
                        className="pl-12 h-14 border-slate-200 focus:border-slate-400 rounded-xl text-base"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-slate-700 font-medium">
                      {t('auth.password')}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Votre mot de passe"
                        className="pl-12 pr-12 h-14 border-slate-200 focus:border-slate-400 rounded-xl text-base"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-3 top-3 h-8 w-8 hover:bg-slate-100 rounded-lg"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-slate-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-slate-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
