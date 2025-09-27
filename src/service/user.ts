import { ApiResponse, Usuario } from "../../types/types";
import { BASE_URL } from "../config/config";

export async function getUserById(id: string): Promise<ApiResponse<Usuario>> {
  try {
    const response = await fetch(`${BASE_URL}/Usuarios/${id}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return { success: false, message: "Erro ao buscar usuário: " + error.message };
  }
}

export async function updateUser(
  id: string,
  userData: Partial<Usuario>
): Promise<ApiResponse<Usuario>> {
  try {
    const response = await fetch(`${BASE_URL}/Usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return { success: false, message: "Erro ao atualizar usuário" + error.message };
  }
}
