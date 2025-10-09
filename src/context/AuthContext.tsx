import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginRequest, registerRequest } from "../service/auth";
import { Usuario } from "@/types/types";

type AuthContextType = {
  usuario: Usuario | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const STORAGE_KEY = "@usuario";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const user: Usuario = JSON.parse(json);
          setUsuario(user);
        }
      } catch (err) {
        console.error("Erro ao carregar usuário do storage:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (email: string, senha: string) => {
    console.log("[AUTH] Tentando login com:", email);
    const resp = await loginRequest({ email, senha });

    console.log("[AUTH] Resposta do loginRequest:", resp);

    if (resp.success && resp.data) {
      const user = resp.data;
      console.log("[AUTH] Usuário logado:", user);

      setUsuario(user);

      console.time("[AUTH] Salvando no AsyncStorage");
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      console.timeEnd("[AUTH] Salvando no AsyncStorage");
    } else {
      console.error("[AUTH] Falha no login:", resp.message);
      throw new Error(resp.message || "Falha no login");
    }
  };

  const register = async (nome: string, email: string, senha: string) => {
    const resp = await registerRequest({ nome, email, senha });
    if (!resp.success) {
      throw new Error(resp.message || "Falha no registro");
    }
    await login(email, senha);
  };

  const logout = async () => {
    setUsuario(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ usuario, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
