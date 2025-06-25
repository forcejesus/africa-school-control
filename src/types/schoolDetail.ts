
export interface Apprenant {
  _id: string;
  nom: string;
  prenom: string;
  avatar: string;
  matricule: string;
  phone: string;
  email: string;
  date: string;
}

export interface Professeur {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  matricule: string;
  role: string;
}

export interface Jeu {
  _id: string;
  titre: string;
  image: string | null;
  date: string;
  nombreQuestions: number;
  professeur: Professeur;
}

export interface Planification {
  _id: string;
  pin: string;
  statut: string;
  jeu: {
    _id: string;
    titre: string;
  };
  enseignant: any;
}

export interface Abonnement {
  _id: string;
  nom: string;
  description: string;
  prix: number;
  nombreJeuxMax: number;
  nombreApprenantsMax: number;
  nombreEnseignantsMax: number;
  dureeEnJours: number;
  dateCreation: string;
}

export interface Administrateur {
  _id: string;
  nom: string;
  prenom: string;
  matricule: string;
  genre: string;
  statut: string;
  phone: string;
  email: string;
  adresse: string;
  date: string;
  pays: {
    _id: string;
    libelle: string;
  };
  role: string;
}

export interface Ecole {
  _id: string;
  libelle: string;
  adresse: string;
  ville: string;
  telephone: string;
  email: string;
  fichier: string;
  pays: {
    _id: string;
    libelle: string;
  };
  apprenants: Apprenant[];
}

export interface SchoolDetailData {
  ecole: Ecole;
  abonnement: Abonnement;
  administrateur: Administrateur;
  jeux: Jeu[];
  planifications: {
    total: number;
    liste: Planification[];
  };
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: SchoolDetailData;
  timestamp: string;
}
