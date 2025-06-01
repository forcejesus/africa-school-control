
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
    <Card className={cn("border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-h-[120px] flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">{title}</p>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{value}</h3>
            </div>
            
            <div className="mt-auto">
              {subtitle && (
                <p className="text-sm text-gray-500 mb-2 font-medium">
                  {subtitle}
                </p>
              )}
              
              {trend && (
                <p className={cn(
                  "text-xs font-semibold flex items-center",
                  trend.isPositive ? "text-emerald-600" : "text-red-600"
                )}>
                  {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
                  <span className="text-gray-500 ml-1">vs mois dernier</span>
                </p>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex-shrink-0 shadow-md">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
