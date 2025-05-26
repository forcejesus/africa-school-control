
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Plus, Edit, Trash2, Eye } from "lucide-react";
import { schools } from "@/utils/data";

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Mise à jour de sécurité",
      message: "Une nouvelle mise à jour de sécurité est disponible.",
      recipient: "all",
      status: "sent",
      sentAt: "2024-01-15 10:30",
      readCount: 45
    },
    {
      id: 2,
      title: "Maintenance programmée",
      message: "Une maintenance est prévue dimanche de 2h à 4h.",
      recipient: "École Primaire Saint-Michel",
      status: "scheduled",
      scheduledAt: "2024-01-20 08:00",
      readCount: 0
    }
  ]);

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    recipient: "",
    scheduleType: "immediate"
  });

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gradient-to-b from-background to-accent/20 overflow-auto">
        <div className="space-y-4 max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Notifications
              </h1>
              <p className="text-base text-muted-foreground">
                Gérez les notifications envoyées aux écoles.
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="send" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="send" className="text-base">Envoyer</TabsTrigger>
              <TabsTrigger value="history" className="text-base">Historique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="send" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Nouvelle notification</CardTitle>
                  <CardDescription className="text-base">
                    Créez et envoyez une notification aux écoles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-base">Titre</Label>
                      <Input 
                        id="title" 
                        placeholder="Titre de la notification..."
                        value={newNotification.title}
                        onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                        className="text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipient" className="text-base">Destinataire</Label>
                      <Select 
                        value={newNotification.recipient} 
                        onValueChange={(value) => setNewNotification({...newNotification, recipient: value})}
                      >
                        <SelectTrigger className="w-full text-base">
                          <SelectValue placeholder="Sélectionner les destinataires" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" className="text-base">Toutes les écoles</SelectItem>
                          {schools.map(school => (
                            <SelectItem key={school.id} value={school.name} className="text-base">
                              {school.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Contenu de la notification..."
                      value={newNotification.message}
                      onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                      className="text-base min-h-[120px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-base">Type d'envoi</Label>
                    <Select 
                      value={newNotification.scheduleType} 
                      onValueChange={(value) => setNewNotification({...newNotification, scheduleType: value})}
                    >
                      <SelectTrigger className="w-full text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate" className="text-base">Envoi immédiat</SelectItem>
                        <SelectItem value="scheduled" className="text-base">Programmer l'envoi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {newNotification.scheduleType === "scheduled" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-base">Date</Label>
                        <Input id="date" type="date" className="text-base" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-base">Heure</Label>
                        <Input id="time" type="time" className="text-base" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" className="text-base">Aperçu</Button>
                    <Button className="text-base">
                      <Send className="h-4 w-4 mr-2" />
                      {newNotification.scheduleType === "immediate" ? "Envoyer" : "Programmer"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des notifications</CardTitle>
                  <CardDescription className="text-base">
                    Consultez toutes les notifications envoyées.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{notification.title}</h4>
                              <Badge variant={notification.status === "sent" ? "success" : "warning"}>
                                {notification.status === "sent" ? "Envoyé" : "Programmé"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>Destinataire: {notification.recipient}</span>
                              {notification.status === "sent" && (
                                <>
                                  <span>Envoyé le: {notification.sentAt}</span>
                                  <span>Lu par: {notification.readCount} écoles</span>
                                </>
                              )}
                              {notification.status === "scheduled" && (
                                <span>Programmé pour: {notification.scheduledAt}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
