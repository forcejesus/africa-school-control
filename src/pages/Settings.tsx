
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SubscriptionSettings } from "@/components/settings/SubscriptionSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { FAQSettings } from "@/components/settings/FAQSettings";
import { useI18n } from "@/contexts/I18nContext";

const Settings = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
          <p className="text-muted-foreground text-base">
            {t('settings.description')}
          </p>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="general" className="text-base">{t('settings.general')}</TabsTrigger>
              <TabsTrigger value="notifications" className="text-base">{t('settings.notifications')}</TabsTrigger>
              <TabsTrigger value="subscriptions" className="text-base">{t('settings.subscriptions')}</TabsTrigger>
              <TabsTrigger value="appearance" className="text-base">{t('settings.appearance')}</TabsTrigger>
              <TabsTrigger value="security" className="text-base">{t('settings.security')}</TabsTrigger>
              <TabsTrigger value="faq" className="text-base">{t('settings.faq')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <GeneralSettings />
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <NotificationSettings />
            </TabsContent>
            
            <TabsContent value="subscriptions" className="space-y-4">
              <SubscriptionSettings />
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-4">
              <AppearanceSettings />
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="faq" className="space-y-4">
              <FAQSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
