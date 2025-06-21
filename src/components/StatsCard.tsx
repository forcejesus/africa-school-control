
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconColor?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  subtitle, 
  trend, 
  className,
  iconColor = "from-blue-500 to-indigo-600"
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className={cn("professional-card border-0 overflow-hidden", className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between h-full">
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {title}
                </p>
                <div className="flex items-baseline space-x-2">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {value}
                  </h3>
                </div>
              </div>
              
              <div className="space-y-2">
                {subtitle && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {subtitle}
                  </p>
                )}
                
                {trend && (
                  <div className={cn(
                    "text-xs font-semibold flex items-center space-x-1",
                    trend.isPositive ? "text-emerald-600" : "text-red-500"
                  )}>
                    <span className="text-lg">
                      {trend.isPositive ? "↗" : "↘"}
                    </span>
                    <span>{Math.abs(trend.value)}%</span>
                    <span className="text-slate-500 dark:text-slate-400">vs mois dernier</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className={cn(
              "stats-card-icon bg-gradient-to-br",
              iconColor,
              "flex-shrink-0 ml-4"
            )}>
              <div className="text-white">
                {icon}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default StatsCard;
