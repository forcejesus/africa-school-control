
import Header from "@/components/Header";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardMenu } from "@/components/dashboard/DashboardMenu";
import { motion } from "framer-motion";
import { useDashboardData } from "@/hooks/useDashboardData";

const Dashboard = () => {
  const {
    statsDetails,
    loading,
    totalStudents,
    totalGamesCreated,
    totalPlanifications,
    totalSchools
  } = useDashboardData();
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
      <Header />
      
      <div className="flex-1 p-6 md:p-8">
        <motion.div 
          className="max-w-7xl mx-auto space-y-6 md:space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Dashboard Header */}
          <DashboardHeader />
          
          {/* Statistics Cards */}
          <DashboardStats
            loading={loading}
            totalSchools={totalSchools}
            totalGamesCreated={totalGamesCreated}
            totalPlanifications={totalPlanifications}
            totalStudents={totalStudents}
            statsDetails={statsDetails}
          />
          
          {/* Menu Cards */}
          <DashboardMenu />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
