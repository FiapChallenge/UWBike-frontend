import { useAuth } from "../context/AuthContext";

export function useAuthActions() {
  const { login, register } = useAuth();

  async function loginAction(
    email: string,
    senha: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ) {
    try {
      await login(email, senha);  
      onSuccess();
    } catch (err: any) {
      onError(err.message || "Erro ao fazer login.");
    }
  }

  async function registerAction(
    nome: string,
    email: string,
    senha: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ) {
    try {
      await register(nome, email, senha); 
      onSuccess();
    } catch (err: any) {
      onError(err.message || "Erro ao criar conta.");
    }
  }

  return { loginAction, registerAction };
}
