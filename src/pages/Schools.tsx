
import { schools } from "@/utils/data";
import Header from "@/components/Header";
import SchoolsList from "@/components/SchoolsList";

const Schools = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Gestion des écoles</h1>
          <p className="text-base text-muted-foreground">
            Consultez et gérez toutes les écoles enregistrées sur la plateforme.
          </p>
          
          <SchoolsList schools={schools} />
        </div>
      </div>
    </div>
  );
};

export default Schools;
