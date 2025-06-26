
import { useI18n } from "@/contexts/I18nContext";

export function LoadingSpinner() {
  const { t } = useI18n();
  
  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
      </div>
    </div>
  );
}
