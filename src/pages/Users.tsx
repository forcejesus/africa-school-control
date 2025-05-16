
import Header from "@/components/Header";
import UsersList from "@/components/UsersList";

const Users = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">
            Consultez et gérez tous les utilisateurs administrateurs du système.
          </p>
          
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default Users;
