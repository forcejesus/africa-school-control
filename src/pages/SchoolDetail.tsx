
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { StatsCardsSection } from "@/components/school-detail/StatsCardsSection";
import { SchoolInfoCard } from "@/components/school-detail/SchoolInfoCard";
import { SearchableListCard } from "@/components/school-detail/SearchableListCard";
import { BackButton } from "@/components/school-detail/BackButton";
import { PartialDataAlert } from "@/components/school-detail/PartialDataAlert";
import { SchoolHeader } from "@/components/school-detail/SchoolHeader";
import { LoadingSpinner } from "@/components/school-detail/LoadingSpinner";
import { useSchoolDetail } from "@/hooks/useSchoolDetail";
import { filterGames, filterStudents, filterPlans } from "@/utils/schoolDetailFilters";
import { createDefaultSchoolData } from "@/utils/schoolDetailDefaults";

const SchoolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchGames, setSearchGames] = useState("");
  const [searchStudents, setSearchStudents] = useState("");
  const [searchPlans, setSearchPlans] = useState("");
  
  const { schoolData, loading, hasPartialData } = useSchoolDetail(id);

  const handleBack = () => {
    navigate('/ecoles');
  };

  const displayData = schoolData || createDefaultSchoolData(id || '');
  
  const filteredGames = filterGames(displayData.jeux, searchGames);
  const filteredStudents = filterStudents(displayData.ecole.apprenants, searchStudents);
  const filteredPlans = filterPlans(displayData.planifications.liste, searchPlans);

  // Calculer le nombre d'enseignants uniques
  const uniqueTeachers = new Set(displayData.jeux.map(jeu => jeu.professeur.nom + jeu.professeur.prenom));
  const teachersCount = uniqueTeachers.size;

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 p-6 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 overflow-auto">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton onBack={handleBack} />

          <PartialDataAlert show={hasPartialData} />

          <SchoolInfoCard 
            school={displayData.ecole} 
            subscription={displayData.abonnement}
            administrator={displayData.administrateur}
            gamesCount={displayData.jeux.length}
            teachersCount={teachersCount}
            hasPartialData={hasPartialData}
          />

          <StatsCardsSection
            studentsCount={displayData.ecole.apprenants.length}
            gamesCount={displayData.jeux.length}
            planificationsCount={displayData.planifications.total}
            totalQuestions={displayData.jeux.reduce((acc, jeu) => acc + jeu.nombreQuestions, 0)}
          />

          <SearchableListCard
            title="Jeux créés"
            icon={<BookOpen className="mr-3 h-6 w-6" />}
            searchValue={searchGames}
            onSearchChange={setSearchGames}
            searchPlaceholder="Rechercher un jeu..."
            itemCount={filteredGames.length}
            emptyMessage="Aucun jeu créé pour le moment"
            noResultsMessage="Aucun jeu trouvé avec ces critères"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGames.map((jeu) => (
                <Card key={jeu._id} className="border border-orange-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-orange-700 text-base">{jeu.titre}</h4>
                      <p className="text-sm text-muted-foreground">
                        Par: {jeu.professeur.prenom} {jeu.professeur.nom}
                      </p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{jeu.nombreQuestions} questions</span>
                        <span>{new Date(jeu.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SearchableListCard>

          <SearchableListCard
            title="Apprenants"
            icon={<Users className="mr-3 h-6 w-6" />}
            searchValue={searchStudents}
            onSearchChange={setSearchStudents}
            searchPlaceholder="Rechercher un apprenant..."
            itemCount={filteredStudents.length}
            emptyMessage="Aucun apprenant inscrit pour le moment"
            noResultsMessage="Aucun apprenant trouvé avec ces critères"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStudents.map((apprenant) => (
                <Card key={apprenant._id} className="border border-orange-100">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-orange-700 text-base">
                        {apprenant.prenom} {apprenant.nom}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Matricule: {apprenant.matricule}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Inscrit le: {new Date(apprenant.date).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SearchableListCard>

          <SearchableListCard
            title="Planifications"
            icon={<Calendar className="mr-3 h-6 w-6" />}
            searchValue={searchPlans}
            onSearchChange={setSearchPlans}
            searchPlaceholder="Rechercher une planification..."
            itemCount={filteredPlans.length}
            emptyMessage="Aucune planification pour le moment"
            noResultsMessage="Aucune planification trouvée avec ces critères"
          >
            <div className="space-y-4">
              {filteredPlans.map((planification) => (
                <Card key={planification._id} className="border border-orange-100">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-orange-700 text-base">
                          {planification.jeu.titre}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          PIN: {planification.pin}
                        </p>
                      </div>
                      <Badge 
                        variant={planification.statut === 'en attente' ? 'secondary' : 'default'}
                        className={planification.statut === 'actif' ? 'bg-green-600 hover:bg-green-700' : ''}
                      >
                        {planification.statut}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SearchableListCard>

          <SchoolHeader 
            schoolName={displayData.ecole.libelle}
            city={displayData.ecole.ville}
            country={displayData.ecole.pays.libelle}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolDetail;
