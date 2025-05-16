
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  LayoutDashboard, 
  School, 
  FileText, 
  BarChart, 
  Settings, 
  Users
} from "lucide-react";

const navItems = [
  {
    title: "Tableau de bord",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Écoles",
    href: "/schools",
    icon: School,
  },
  {
    title: "Abonnements",
    href: "/subscriptions",
    icon: FileText,
  },
  {
    title: "Analytique",
    href: "/analytics",
    icon: BarChart,
  },
  {
    title: "Utilisateurs",
    href: "/users",
    icon: Users,
  },
  {
    title: "Paramètres",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-border flex flex-col h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <div className="text-lg font-semibold text-primary">
            Portail Admin
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-sidebar-accent"
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform",
              collapsed && "rotate-180"
            )}
          />
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
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            Portail Admin v1.0
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
