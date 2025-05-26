import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { subscriptions } from "@/utils/data";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [subscriptionAlerts, setSubscriptionAlerts] = useState(true);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("Standard");
  const [autoRenew, setAutoRenew] = useState(true);
  
  // FAQ state
  const [faqs, setFaqs] = useState([
    { id: 1, question: "Comment réinitialiser mon mot de passe ?", answer: "Allez dans les paramètres de sécurité..." },
    { id: 2, question: "Comment ajouter une nouvelle école ?", answer: "Cliquez sur le bouton Ajouter dans la section Écoles..." },
  ]);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground text-base">
            Gérez les paramètres de votre compte, de l'application et des abonnements.
          </p>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="general" className="text-base">Général</TabsTrigger>
              <TabsTrigger value="notifications" className="text-base">Notifications</TabsTrigger>
              <TabsTrigger value="subscriptions" className="text-base">Abonnements</TabsTrigger>
              <TabsTrigger value="appearance" className="text-base">Apparence</TabsTrigger>
              <TabsTrigger value="security" className="text-base">Sécurité</TabsTrigger>
              <TabsTrigger value="faq" className="text-base">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                  <CardDescription className="text-base">
                    Mettez à jour vos informations personnelles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-base">Prénom</Label>
                      <Input id="firstName" defaultValue="Admin" className="text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-base">Nom</Label>
                      <Input id="lastName" defaultValue="User" className="text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">Email</Label>
                      <Input id="email" defaultValue="admin@example.com" type="email" className="text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base">Téléphone</Label>
                      <Input id="phone" defaultValue="+33 6 12 34 56 78" className="text-base" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button size="lg" className="text-base">Enregistrer</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notification</CardTitle>
                  <CardDescription className="text-base">
                    Configurez les notifications que vous souhaitez recevoir.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-base">Notifications par email</h3>
                        <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                      </div>
                      <Switch 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-base">Alertes système</h3>
                        <p className="text-sm text-muted-foreground">Recevoir des alertes sur les problèmes système</p>
                      </div>
                      <Switch 
                        checked={systemAlerts} 
                        onCheckedChange={setSystemAlerts} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-base">Alertes d'abonnement</h3>
                        <p className="text-sm text-muted-foreground">
                          Recevoir des alertes quand les abonnements arrivent à expiration
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
            </TabsContent>
            
            <TabsContent value="subscriptions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des abonnements</CardTitle>
                  <CardDescription className="text-base">
                    Consultez et mettez à jour les abonnements des écoles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Liste des abonnements existants</h3>
                    <div className="grid gap-4">
                      {subscriptions.map((subscription) => (
                        <div key={subscription.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{subscription.schoolName}</h4>
                              <p className="text-sm text-muted-foreground">Plan: {subscription.plan}</p>
                              <p className="text-sm text-muted-foreground">Statut: {subscription.status}</p>
                              <p className="text-sm text-muted-foreground">Prix: {subscription.price}€</p>
                            </div>
                            <div className="flex space-x-2">
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="selected-subscription" className="text-base">Modifier un abonnement</Label>
                    
                    <Select 
                      value={selectedSubscription} 
                      onValueChange={setSelectedSubscription}
                    >
                      <SelectTrigger className="w-full text-base">
                        <SelectValue placeholder="Sélectionner un abonnement" />
                      </SelectTrigger>
                      <SelectContent>
                        {subscriptions.map(subscription => (
                          <SelectItem 
                            key={subscription.id} 
                            value={subscription.id}
                            className="text-base"
                          >
                            {subscription.schoolName} - {subscription.plan}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedSubscription && (
                    <div className="space-y-4 border p-4 rounded-md">
                      
                      <h3 className="text-lg font-medium">Détails de l'abonnement</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subscription-plan" className="text-base">Formule</Label>
                        <Select 
                          value={subscriptionPlan} 
                          onValueChange={setSubscriptionPlan}
                        >
                          <SelectTrigger id="subscription-plan" className="w-full text-base">
                            <SelectValue placeholder="Sélectionner une formule" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Démarrage" className="text-base">Démarrage</SelectItem>
                            <SelectItem value="Standard" className="text-base">Standard</SelectItem>
                            <SelectItem value="Premium" className="text-base">Premium</SelectItem>
                            <SelectItem value="Enterprise" className="text-base">Entreprise</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-date" className="text-base">Date de début</Label>
                          <Input 
                            id="start-date" 
                            type="date" 
                            className="text-base"
                            defaultValue={subscriptions.find(s => s.id === selectedSubscription)?.startDate}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date" className="text-base">Date d'expiration</Label>
                          <Input 
                            id="end-date" 
                            type="date" 
                            className="text-base"
                            defaultValue={subscriptions.find(s => s.id === selectedSubscription)?.expiryDate}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price" className="text-base">Prix (€)</Label>
                          <Input 
                            id="price" 
                            type="number" 
                            className="text-base"
                            defaultValue={subscriptions.find(s => s.id === selectedSubscription)?.price}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status" className="text-base">Statut</Label>
                          <Select defaultValue={subscriptions.find(s => s.id === selectedSubscription)?.status || "active"}>
                            <SelectTrigger id="status" className="w-full text-base">
                              <SelectValue placeholder="Sélectionner un statut" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active" className="text-base">Actif</SelectItem>
                              <SelectItem value="pending" className="text-base">En attente</SelectItem>
                              <SelectItem value="expired" className="text-base">Expiré</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4">
                        <Switch 
                          id="auto-renew" 
                          checked={autoRenew} 
                          onCheckedChange={setAutoRenew}
                        />
                        <Label htmlFor="auto-renew" className="text-base">Renouvellement automatique</Label>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" className="text-base">Annuler</Button>
                        <Button className="text-base">Mettre à jour l'abonnement</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Apparence</CardTitle>
                  <CardDescription className="text-base">
                    Personnalisez l'apparence de l'application.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-base mb-2">Thème</h3>
                      <ThemeSwitcher />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité</CardTitle>
                  <CardDescription className="text-base">
                    Modifiez vos informations de sécurité.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-base">Mot de passe actuel</Label>
                      <Input id="current-password" type="password" className="text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-base">Nouveau mot de passe</Label>
                      <Input id="new-password" type="password" className="text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-base">Confirmer le mot de passe</Label>
                      <Input id="confirm-password" type="password" className="text-base" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button size="lg" className="text-base">Changer le mot de passe</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des FAQ</CardTitle>
                  <CardDescription className="text-base">
                    Gérez les questions fréquemment posées pour les écoles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">FAQ existantes</h3>
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
                    <h3 className="text-lg font-semibold">Ajouter une nouvelle FAQ</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-question" className="text-base">Question</Label>
                        <Input 
                          id="new-question" 
                          placeholder="Entrez la question..."
                          value={newFaq.question}
                          onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-answer" className="text-base">Réponse</Label>
                        <Textarea 
                          id="new-answer" 
                          placeholder="Entrez la réponse..."
                          value={newFaq.answer}
                          onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                          className="text-base min-h-[100px]"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button className="text-base">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter la FAQ
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
