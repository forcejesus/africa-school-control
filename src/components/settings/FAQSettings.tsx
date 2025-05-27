
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export function FAQSettings() {
  const [faqs, setFaqs] = useState([
    { id: 1, question: "Comment réinitialiser mon mot de passe ?", answer: "Allez dans les paramètres de sécurité..." },
    { id: 2, question: "Comment ajouter une nouvelle école ?", answer: "Cliquez sur le bouton Ajouter dans la section Écoles..." },
  ]);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.faqManagement')}</CardTitle>
        <CardDescription className="text-base">
          {t('settings.faqDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('settings.existingFAQs')}</h3>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('settings.addNewFAQ')}</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-question" className="text-base">{t('settings.question')}</Label>
              <Input 
                id="new-question" 
                placeholder={t('settings.enterQuestion')}
                value={newFaq.question}
                onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-answer" className="text-base">{t('settings.answer')}</Label>
              <Textarea 
                id="new-answer" 
                placeholder={t('settings.enterAnswer')}
                value={newFaq.answer}
                onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                className="text-base min-h-[100px]"
              />
            </div>
            <div className="flex justify-end">
              <Button className="text-base">
                <Plus className="h-4 w-4 mr-2" />
                {t('settings.addFAQ')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
