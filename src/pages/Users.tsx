
import Header from "@/components/Header";
import UsersList from "@/components/UsersList";
import { useI18n } from "@/contexts/I18nContext";

const Users = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{t('users.title')}</h1>
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
