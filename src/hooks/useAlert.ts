
import { useState, useCallback } from "react";
import { Alert } from "@/components/alerts/AlertSystem";

export function useAlert() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = useCallback((alert: Omit<Alert, "id">) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newAlert: Alert = { ...alert, id };
    
    setAlerts(prev => [...prev, newAlert]);
    
    return id;
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const showSuccess = useCallback((title: string, message: string, options?: Partial<Alert>) => {
    return addAlert({ type: "success", title, message, ...options });
  }, [addAlert]);

  const showError = useCallback((title: string, message: string, options?: Partial<Alert>) => {
    return addAlert({ type: "error", title, message, ...options });
  }, [addAlert]);

  const showWarning = useCallback((title: string, message: string, options?: Partial<Alert>) => {
    return addAlert({ type: "warning", title, message, ...options });
  }, [addAlert]);

  const showInfo = useCallback((title: string, message: string, options?: Partial<Alert>) => {
    return addAlert({ type: "info", title, message, ...options });
  }, [addAlert]);

  return {
    alerts,
    addAlert,
    dismissAlert,
    clearAllAlerts,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}
