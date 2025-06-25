
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Award,
  LogOut
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useI18n();
  const { logout } = useAuth();

  const navItems = [
    {
      title: t('nav.dashboard'),
      href: "/tableau-de-bord",
      icon: LayoutDashboard,
    },
    {
      title: t('nav.schools'),
      href: "/ecoles",
      icon: School,
    },
    {
      title: t('nav.subscriptions'),
      href: "/abonnements",
      icon: FileText,
    },
    {
      title: t('nav.analytics'),
      href: "/analytique",
      icon: BarChart,
    },
    {
      title: t('nav.users'),
      href: "/utilisateurs",
      icon: Users,
    },
    {
      title: t('nav.settings'),
      href: "/parametres",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div
      className="bg-white/95 backdrop-blur-sm border-r border-orange-200/60 flex flex-col h-screen sticky top-0 left-0 shadow-xl"
      initial={{ width: "16rem" }}
      animate={{ width: collapsed ? "4rem" : "16rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="p-4 flex items-center justify-between border-b border-orange-200/60 bg-gradient-to-r from-orange-500 to-orange-600">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-lg font-bold text-white flex items-center"
            >
              <Award className="h-6 w-6 mr-2 text-white" />
              <span className="font-bold">
                {t('auth.title')}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          onClick={() => setCollapsed(!collapsed)}
          variant="ghost"
          size="icon"
          className="p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="h-5 w-5 text-white"
          >
            <ChevronLeft />
          </motion.div>
        </Button>
      </div>

      <div className="flex-1 py-6 overflow-auto">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || 
                            (item.href === "/tableau-de-bord" && location.pathname === "/") ||
                            (item.href === "/ecoles" && location.pathname === "/schools");
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-base transition-all duration-200 relative group",
                  isActive
                    ? "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 font-semibold shadow-sm border-l-4 border-orange-600"
                    : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className={cn(collapsed ? "mx-auto" : "")}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-orange-700" : "")} />
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

      <div className="p-4 border-t border-orange-200/60">
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
