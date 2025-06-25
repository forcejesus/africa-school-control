
import { motion } from "framer-motion";
import { School as SchoolIcon, User, CheckCircle } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FormStepperProps {
  currentStep: number;
}

export function FormStepper({ currentStep }: FormStepperProps) {
  const steps: Step[] = [
    {
      id: 1,
      title: "Informations de l'école",
      description: "Détails de l'établissement",
      icon: SchoolIcon
    },
    {
      id: 2,
      title: "Administrateur",
      description: "Compte administrateur",
      icon: User
    },
    {
      id: 3,
      title: "Confirmation",
      description: "Vérification des données",
      icon: CheckCircle
    }
  ];

  return (
    <motion.div 
      className="flex justify-center mb-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
              currentStep >= step.id 
                ? 'bg-primary border-primary text-white' 
                : 'bg-white border-gray-300 text-gray-400'
            }`}>
              <step.icon className="w-5 h-5" />
            </div>
            <div className="ml-3 hidden sm:block">
              <p className={`font-medium ${currentStep >= step.id ? 'text-primary' : 'text-gray-400'}`}>
                {step.title}
              </p>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-4 ${
                currentStep > step.id ? 'bg-primary' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
