
import { LoginForm } from "@/components/auth/LoginForm";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return <LoginForm onLogin={onLogin} />;
}
