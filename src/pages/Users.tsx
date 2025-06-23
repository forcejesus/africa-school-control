
import Header from "@/components/Header";
import UsersList from "@/components/UsersList";
import { useI18n } from "@/contexts/I18nContext";

const Users = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50/20 overflow-auto">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t('users.title')}</h1>
          <p className="text-muted-foreground">
            {t('users.description')}
          </p>
          
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default Users;
