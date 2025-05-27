
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingProgressProps {
  isLoading: boolean;
  message?: string;
  className?: string;
}

export function LoadingProgress({ isLoading, message = "Chargement en cours...", className }: LoadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [isLoading]);

  useEffect(() => {
    if (progress >= 95 && !isLoading) {
      setProgress(100);
    }
  }, [isLoading, progress]);

  if (!isLoading && progress === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm ${className}`}
    >
      <div className="w-full max-w-md space-y-6 p-6">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-12 h-12 text-primary"
          >
            <Loader2 className="w-full h-full" />
          </motion.div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{message}</h3>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {Math.round(progress)}% terminé
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
