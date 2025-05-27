
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useI18n } from "@/contexts/I18nContext";

export function AppearanceSettings() {
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.appearanceSettings')}</CardTitle>
        <CardDescription className="text-base">
          {t('settings.customizeAppearance')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-base mb-2">{t('settings.theme')}</h3>
            <ThemeSwitcher />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
