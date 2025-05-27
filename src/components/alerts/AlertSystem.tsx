
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface Alert {
  id: string;
  type: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
}

interface AlertSystemProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

const alertIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const alertStyles = {
  success: "border-green-500 bg-green-50 dark:bg-green-950/30",
  warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
  error: "border-red-500 bg-red-50 dark:bg-red-950/30",
  info: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
};

const iconStyles = {
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  error: "text-red-600 dark:text-red-400",
  info: "text-blue-600 dark:text-blue-400",
};

function AlertItem({ alert, onDismiss }: { alert: Alert; onDismiss: (id: string) => void }) {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);
  
  const Icon = alertIcons[alert.type];
  const duration = alert.duration || 5000;

  useEffect(() => {
    if (alert.persistent) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100));
        if (newProgress <= 0) {
          setIsVisible(false);
          setTimeout(() => onDismiss(alert.id), 300);
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [alert.id, duration, alert.persistent, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(alert.id), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 300, 
        scale: isVisible ? 1 : 0.9 
      }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Card className={`relative overflow-hidden border-l-4 ${alertStyles[alert.type]} shadow-lg`}>
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <Icon className={`h-6 w-6 mt-0.5 ${iconStyles[alert.type]}`} />
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold">{alert.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 -mt-1 -mr-1"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {!alert.persistent && (
            <div className="mt-3">
              <Progress value={progress} className="h-1" />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export function AlertSystem({ alerts, onDismiss }: AlertSystemProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {alerts.map((alert) => (
          <AlertItem
            key={alert.id}
            alert={alert}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
