
import { LucideIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  iconColor: string;
  delay?: number;
}

export function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  href,
  iconColor,
  delay = 0
}: QuickActionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={href} className="group">
        <div className="modern-card p-6 hover:shadow-intense">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <motion.div 
                  className={cn(
                    "p-2 rounded-lg icon-scale",
                    iconColor
                  )}
                  whileHover={{ rotate: 5 }}
                >
                  <Icon className="h-5 w-5 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {title}
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {description}
              </p>
            </div>
            
            <motion.div 
              className="text-orange-500 arrow-slide"
              whileHover={{ x: 4 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
