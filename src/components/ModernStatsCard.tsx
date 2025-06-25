
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModernStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  bgGradient: string;
  iconBg: string;
  change?: string;
  isPositive?: boolean;
  delay?: number;
}

export function ModernStatsCard({ 
  title, 
  value, 
  icon: Icon, 
  subtitle,
  bgGradient,
  iconBg,
  change,
  isPositive = true,
  delay = 0
}: ModernStatsCardProps) {
  return (
    <motion.div
      className="modern-card group p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wider mb-2">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-slate-900">
              {value}
            </h3>
            {change && (
              <span className={cn(
                "text-sm font-semibold",
                isPositive ? "text-emerald-600" : "text-red-500"
              )}>
                {isPositive ? "+" : ""}{change}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-slate-600 mt-1 font-medium">
              {subtitle}
            </p>
          )}
        </div>
        
        <motion.div 
          className={cn(
            "p-3 rounded-xl shadow-sm icon-scale",
            bgGradient
          )}
          whileHover={{ rotate: 5 }}
        >
          <Icon className="h-6 w-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}
