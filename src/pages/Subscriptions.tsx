
import Header from "@/components/Header";
import SubscriptionsList from "@/components/SubscriptionsList";

const Subscriptions = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Gestion des abonnements</h1>
          <p className="text-muted-foreground">
            Suivez et gérez tous les abonnements des écoles sur la plateforme.
          </p>
          
          <SubscriptionsList />
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
