
import '@/components/ui/badge';

declare module '@/components/ui/badge' {
  export interface BadgeProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "success" | "warning" | "info";
  }
}
