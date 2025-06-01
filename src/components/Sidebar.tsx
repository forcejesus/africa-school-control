
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Monitor
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
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
      className="bg-sidebar border-r border-border flex flex-col h-screen sticky top-0 left-0"
      initial="expanded"
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <motion.div
          variants={textVariants}
          className="text-lg font-semibold text-primary bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center"
        >
          <Monitor className="h-6 w-6 mr-2 text-blue-600" />
          {t('auth.title')}
        </motion.div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-sidebar-accent transition-colors"
        >
          <motion.div
            variants={chevronVariants}
            className="h-6 w-6 text-muted-foreground"
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-base transition-all duration-300 relative",
                  isActive
                    ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/30"
                )}
              >
                {isActive && (
                  <motion.span
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-md"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
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

      <div className="p-4 border-t border-sidebar-border">
        <motion.div 
          variants={textVariants}
          className="text-sm text-muted-foreground bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"
        >
          {t('auth.title')} v1.0
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
