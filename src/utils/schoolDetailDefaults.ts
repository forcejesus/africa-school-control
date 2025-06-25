
import { SchoolDetailData } from "@/types/schoolDetail";

export function createDefaultSchoolData(id: string): SchoolDetailData {
  return {
    ecole: {
      _id: id,
      libelle: 'École non trouvée',
      adresse: 'Aucune adresse',
      ville: 'Aucune ville',
      telephone: 'Aucun téléphone',
      email: 'Aucun email',
      fichier: '',
      pays: { _id: '', libelle: 'Aucun pays' },
      apprenants: []
    },
    abonnement: {
      _id: '',
      nom: 'Aucun abonnement',
      description: 'Aucune description',
      prix: 0,
      nombreJeuxMax: 0,
      nombreApprenantsMax: 0,
      nombreEnseignantsMax: 0,
      dureeEnJours: 0,
      dateCreation: ''
    },
    administrateur: {
      _id: '',
      nom: 'Aucun nom',
      prenom: 'Aucun prénom',
      matricule: 'Aucun matricule',
      genre: 'Non spécifié',
      statut: 'inactif',
      phone: 'Aucun téléphone',
      email: 'Aucun email',
      adresse: 'Aucune adresse',
      date: '',
      pays: { _id: '', libelle: 'Aucun pays' },
      role: 'admin'
    },
    jeux: [],
    planifications: { total: 0, liste: [] }
  };
}
