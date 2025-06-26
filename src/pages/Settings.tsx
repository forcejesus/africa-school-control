
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SubscriptionSettings } from "@/components/settings/SubscriptionSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { FAQSettings } from "@/components/settings/FAQSettings";
import { CountryManagement } from "@/components/settings/CountryManagement";
import { useI18n } from "@/contexts/I18nContext";
import { Settings as SettingsIcon, Globe, CreditCard, Bell, Palette, Shield, HelpCircle } from "lucide-react";

const Settings = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gradient-to-br from-violet-50 via-purple-50/30 to-fuchsia-50/20 overflow-auto">
        <div className="space-y-6 max-w-7xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
              <SettingsIcon className="h-8 w-8 text-violet-600" />
              {t('settings.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('settings.description')}
            </p>
          </div>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-7 h-14 bg-white/80 backdrop-blur-sm border border-violet-200 rounded-xl p-1">
              <TabsTrigger 
                value="general" 
                className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm transition-all duration-200"
              >
                <SettingsIcon className="h-4 w-4" />
                {t('settings.general')}
              </TabsTrigger>
              <TabsTrigger 
                value="countries" 
                className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm transition-all duration-200"
              >
                <Globe className="h-4 w-4" />
                Pays
              </TabsTrigger>
              <TabsTrigger 
                value="subscriptions" 
                className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm transition-all duration-200"
              >
                <CreditCard className="h-4 w-4" />
                {t('settings.subscriptions')}
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm transition-all duration-200"
              >
                <Bell className="h-4 w-4" />
                {t('settings.notifications')}
              </TabsTrigger>
              <TabsTrigger 
                value="appearance" 
                className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm transition-all duration-200"
              >
                <Palette className="h-4 w-4" />
                {t('settings.appearance')}
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm transition-all duration-200"
              >
                <Shield className="h-4 w-4" />
                {t('settings.security')}
              </TabsTrigger>
              <TabsTrigger 
                value="faq" 
                className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm transition-all duration-200"
              >
                <HelpCircle className="h-4 w-4" />
                {t('settings.faq')}
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              <TabsContent value="general" className="space-y-6">
                <GeneralSettings />
              </TabsContent>
              
              <TabsContent value="countries" className="space-y-6">
                <CountryManagement />
              </TabsContent>
              
              <TabsContent value="subscriptions" className="space-y-6">
                <SubscriptionSettings />
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-6">
                <AppearanceSettings />
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <SecuritySettings />
              </TabsContent>

              <TabsContent value="faq" className="space-y-6">
                <FAQSettings />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
