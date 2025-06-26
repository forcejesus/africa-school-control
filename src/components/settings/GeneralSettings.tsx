
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

export function GeneralSettings() {
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.generalInfo')}</CardTitle>
        <CardDescription className="text-base">
          {t('settings.personalInfo')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-base">{t('settings.firstName')}</Label>
            <Input id="firstName" defaultValue="Admin" className="text-base" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-base">{t('settings.lastName')}</Label>
            <Input id="lastName" defaultValue="User" className="text-base" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">{t('settings.email')}</Label>
            <Input id="email" defaultValue="admin@example.com" type="email" className="text-base" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base">{t('settings.phone')}</Label>
            <Input id="phone" defaultValue="+33 6 12 34 56 78" className="text-base" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button size="lg" className="text-base">{t('common.save')}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
