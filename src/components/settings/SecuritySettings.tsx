
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

export function SecuritySettings() {
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.securitySettings')}</CardTitle>
        <CardDescription className="text-base">
          {t('settings.updateSecurity')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-base">{t('settings.currentPassword')}</Label>
            <Input id="current-password" type="password" className="text-base" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-base">{t('settings.newPassword')}</Label>
            <Input id="new-password" type="password" className="text-base" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-base">{t('settings.confirmPassword')}</Label>
            <Input id="confirm-password" type="password" className="text-base" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button size="lg" className="text-base">{t('settings.changePassword')}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
