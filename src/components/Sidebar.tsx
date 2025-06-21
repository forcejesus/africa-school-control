
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    console.log("Logout clicked");
    navigate("/login");
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm border-r border-slate-200/60 flex flex-col h-screen sticky top-0 left-0 shadow-lg"
      initial={{ width: "16rem" }}
      animate={{ width: collapsed ? "4rem" : "16rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-200/60">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-lg font-bold text-slate-800 flex items-center"
            >
              <Monitor className="h-6 w-6 mr-2 text-blue-600" />
              <span className="professional-text-gradient font-bold">
                {t('auth.title')}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          onClick={() => setCollapsed(!collapsed)}
          variant="ghost"
          size="icon"
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="h-5 w-5 text-slate-600"
          >
            <ChevronLeft />
          </motion.div>
        </Button>
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
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-base transition-all duration-200 relative group",
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold shadow-sm border-l-4 border-blue-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className={cn(collapsed ? "mx-auto" : "")}
                >
                  <item.icon className="h-5 w-5" />
                </motion.div>

                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-base font-medium"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200/60">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-xl",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className="h-5 w-5" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-base font-medium"
              >
                {t('auth.logout')}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-slate-500 mt-3 text-center"
            >
              {t('auth.title')} v1.0
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Sidebar;
