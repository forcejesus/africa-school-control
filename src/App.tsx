
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Index";
import Schools from "./pages/Schools";
import Subscriptions from "./pages/Subscriptions";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import SchoolDetail from "./pages/SchoolDetail";
import NotFound from "./pages/NotFound";
import SchoolForm from "./components/SchoolForm";
import Sidebar from "./components/Sidebar";
import { schools } from "./utils/data";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex h-screen w-full">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schools" element={<Schools />} />
              <Route path="/schools/:id" element={<SchoolDetail />} />
              <Route path="/schools/add" element={
                <div className="flex flex-col h-screen">
                  <div className="p-6 bg-gray-50 flex-1 overflow-auto">
                    <h1 className="text-2xl font-bold mb-6">Ajouter une nouvelle école</h1>
                    <SchoolForm />
                  </div>
                </div>
              } />
              <Route path="/schools/edit/:id" element={
                <div className="flex flex-col h-screen">
                  <div className="p-6 bg-gray-50 flex-1 overflow-auto">
                    <h1 className="text-2xl font-bold mb-6">Modifier l'école</h1>
                    <SchoolForm 
                      school={schools.find(s => s.id === window.location.pathname.split('/').pop())} 
                      isEditing 
                    />
                  </div>
                </div>
              } />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
