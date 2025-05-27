
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/contexts/I18nContext";

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [subscriptionAlerts, setSubscriptionAlerts] = useState(true);
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.notificationPrefs')}</CardTitle>
        <CardDescription className="text-base">
          Configurez les notifications que vous souhaitez recevoir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-base">{t('settings.emailNotifications')}</h3>
              <p className="text-sm text-muted-foreground">{t('settings.emailNotificationsDesc')}</p>
            </div>
            <Switch 
              checked={emailNotifications} 
              onCheckedChange={setEmailNotifications} 
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-base">{t('settings.systemAlerts')}</h3>
              <p className="text-sm text-muted-foreground">{t('settings.systemAlertsDesc')}</p>
            </div>
            <Switch 
              checked={systemAlerts} 
              onCheckedChange={setSystemAlerts} 
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-base">{t('settings.subscriptionAlerts')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('settings.subscriptionAlertsDesc')}
              </p>
            </div>
            <Switch 
              checked={subscriptionAlerts} 
              onCheckedChange={setSubscriptionAlerts} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
