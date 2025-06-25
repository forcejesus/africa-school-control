
import { SchoolFormContainer } from "./school-form/SchoolFormContainer";
import { School } from "@/utils/data/types";

interface SchoolFormProps {
  school?: School;
  isEditing?: boolean;
}

export function SchoolForm({ school, isEditing = false }: SchoolFormProps) {
  return <SchoolFormContainer school={school} />;
}

export default SchoolForm;
