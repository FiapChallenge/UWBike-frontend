import { useState, useEffect } from "react";
import { getUserById, updateUser } from "../service/user";
import { Usuario } from "../../types/types";
import { useAuth } from "../context/AuthContext";

export function useUser() {
  const { usuario } = useAuth();
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    if (usuario?.id) {
      getUserById(usuario.id).then((res) => {
        if (res.success && res.data) {
          setUser(res.data);
        }
      });
    }
  }, [usuario]);

  async function updatePassword(newPassword: string) {
    if (!user) return;
    const updatedUser = { ...user, senha: newPassword };
    const res = await updateUser(user.id, updatedUser);
    if (res.success && res.data) {
      setUser(res.data);
    }
    return res;
  }

  return { user, updatePassword };
}
