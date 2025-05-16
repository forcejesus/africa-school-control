
import { schools } from "@/utils/dummyData";
import Header from "@/components/Header";
import SchoolsList from "@/components/SchoolsList";

const Schools = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Schools Management</h1>
          <p className="text-muted-foreground">
            View and manage all registered schools on the platform.
          </p>
          
          <SchoolsList schools={schools} />
        </div>
      </div>
    </div>
  );
};

export default Schools;
