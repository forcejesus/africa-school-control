
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
    <Card className={cn("overflow-hidden border border-gray-200 bg-white shadow-sm", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
            
            {subtitle && (
              <p className="text-sm text-gray-500 mb-2">
                {subtitle}
              </p>
            )}
            
            {trend && (
              <p className={cn(
                "text-xs font-medium flex items-center",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                <span className="text-gray-500 ml-1">vs last month</span>
              </p>
            )}
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
