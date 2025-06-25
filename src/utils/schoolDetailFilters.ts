
import { Jeu, Apprenant, Planification } from "@/types/schoolDetail";

export function filterGames(games: Jeu[], searchTerm: string): Jeu[] {
  return games.filter(jeu =>
    jeu.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${jeu.professeur.prenom} ${jeu.professeur.nom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function filterStudents(students: Apprenant[], searchTerm: string): Apprenant[] {
  return students.filter(apprenant =>
    `${apprenant.prenom} ${apprenant.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apprenant.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function filterPlans(plans: Planification[], searchTerm: string): Planification[] {
  return plans.filter(plan =>
    plan.jeu.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.pin.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
