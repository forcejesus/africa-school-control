
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  LayoutDashboard, 
  School, 
  FileText, 
  BarChart, 
  Settings, 
  Users,
  Monitor,
  LogOut
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();

  const navItems = [
    {
      title: t('nav.dashboard'),
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: t('nav.schools'),
      href: "/schools",
      icon: School,
    },
    {
      title: t('nav.subscriptions'),
      href: "/subscriptions",
      icon: FileText,
    },
    {
      title: t('nav.analytics'),
      href: "/analytics",
      icon: BarChart,
    },
    {
      title: t('nav.users'),
      href: "/users",
      icon: Users,
    },
    {
      title: t('nav.settings'),
      href: "/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    // Here you would implement your logout logic
    console.log("Logout clicked");
    navigate("/login");
  };

  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "4rem" }
  };

  const chevronVariants = {
    expanded: { rotate: 0 },
    collapsed: { rotate: 180 }
  };

  const textVariants = {
    expanded: { opacity: 1, display: "block" },
    collapsed: { opacity: 0, display: "none" }
  };

  return (
    <motion.div
      className="bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 left-0 shadow-lg"
      initial="expanded"
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <motion.div
          variants={textVariants}
          className="text-lg font-bold text-gray-800 flex items-center"
        >
          <Monitor className="h-6 w-6 mr-2 text-blue-600" />
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {t('auth.title')}
          </span>
        </motion.div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <motion.div
            variants={chevronVariants}
            className="h-5 w-5 text-gray-600"
          >
            <ChevronLeft />
          </motion.div>
        </button>
      </div>

      <div className="flex-1 py-6 overflow-auto">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-base transition-all duration-200 relative group",
                  isActive
                    ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 font-semibold border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                )}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className={cn(collapsed ? "mx-auto" : "")}
                >
                  <item.icon className="h-5 w-5" />
                </motion.div>

                <motion.span 
                  variants={textVariants}
                  className="text-base"
                >
                  {item.title}
                </motion.span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className="h-5 w-5" />
          <motion.span 
            variants={textVariants}
            className="text-base font-medium"
          >
            {t('auth.logout')}
          </motion.span>
        </Button>
        
        <motion.div 
          variants={textVariants}
          className="text-xs text-gray-500 mt-3 text-center"
        >
          {t('auth.title')} v1.0
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
