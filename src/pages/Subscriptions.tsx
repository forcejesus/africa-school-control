
import Header from "@/components/Header";
import SubscriptionsList from "@/components/SubscriptionsList";
import { useI18n } from "@/contexts/I18nContext";

const Subscriptions = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{t('subscriptions.title')}</h1>
          <p className="text-muted-foreground">
            {t('subscriptions.description')}
          </p>
          
          <SubscriptionsList />
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
