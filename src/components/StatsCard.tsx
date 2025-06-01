
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

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
}

export function StatsCard({ title, value, icon, subtitle, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-h-[80px] flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
            </div>
            
            <div className="mt-auto">
              {subtitle && (
                <p className="text-sm text-slate-500 mb-1">
                  {subtitle}
                </p>
              )}
              
              {trend && (
                <p className={cn(
                  "text-xs font-medium flex items-center",
                  trend.isPositive ? "text-emerald-600" : "text-red-600"
                )}>
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                  <span className="text-slate-500 ml-1">vs last month</span>
                </p>
              )}
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 rounded-lg flex-shrink-0">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
