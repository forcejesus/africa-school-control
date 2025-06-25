
interface SchoolData {
  libelle: string;
  adresse: string;
  ville: string;
  telephone: string;
  email: string;
}

interface AdminData {
  nom: string;
  prenom: string;
  genre: string;
  phone: string;
  email: string;
  adresse: string;
}

interface ConfirmationStepProps {
  schoolData: SchoolData;
  adminData: AdminData;
}

export function ConfirmationStep({ schoolData, adminData }: ConfirmationStepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lg mb-4 text-gray-900">Récapitulatif de l'école</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">Nom:</span> {schoolData.libelle}</div>
          <div><span className="font-medium">Ville:</span> {schoolData.ville}</div>
          <div className="md:col-span-2"><span className="font-medium">Adresse:</span> {schoolData.adresse}</div>
          <div><span className="font-medium">Téléphone:</span> {schoolData.telephone}</div>
          <div><span className="font-medium">Email:</span> {schoolData.email}</div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lg mb-4 text-gray-900">Récapitulatif de l'administrateur</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">Nom complet:</span> {adminData.prenom} {adminData.nom}</div>
          <div><span className="font-medium">Genre:</span> {adminData.genre}</div>
          <div><span className="font-medium">Téléphone:</span> {adminData.phone}</div>
          <div><span className="font-medium">Email:</span> {adminData.email}</div>
          <div className="md:col-span-2"><span className="font-medium">Adresse:</span> {adminData.adresse}</div>
        </div>
      </div>
    </div>
  );
}
