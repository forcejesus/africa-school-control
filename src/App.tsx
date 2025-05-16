
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { schools } from "./utils/data";
import Sidebar from "./components/Sidebar";

// Lazy load components for better performance
const Dashboard = lazy(() => import("./pages/Index"));
const Schools = lazy(() => import("./pages/Schools"));
const Subscriptions = lazy(() => import("./pages/Subscriptions"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const SchoolDetail = lazy(() => import("./pages/SchoolDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SchoolForm = lazy(() => import("./components/SchoolForm"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center h-screen">
    <div className="space-y-4 w-full max-w-md">
      <Skeleton className="h-12 w-3/4 mx-auto rounded-lg" />
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-lg" />
        <Skeleton className="h-4 w-4/6 rounded-lg" />
      </div>
    </div>
  </div>
);

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
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/schools" element={<Schools />} />
                <Route path="/schools/:id" element={<SchoolDetail />} />
                <Route path="/schools/add" element={
                  <div className="flex flex-col h-screen">
                    <div className="p-6 bg-gradient-to-b from-background to-accent/20 flex-1 overflow-auto">
                      <h1 className="text-2xl font-bold mb-6 gaming-gradient-text">Ajouter une nouvelle école</h1>
                      <SchoolForm />
                    </div>
                  </div>
                } />
                <Route path="/schools/edit/:id" element={
                  <div className="flex flex-col h-screen">
                    <div className="p-6 bg-gradient-to-b from-background to-accent/20 flex-1 overflow-auto">
                      <h1 className="text-2xl font-bold mb-6 gaming-gradient-text">Modifier l'école</h1>
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
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
