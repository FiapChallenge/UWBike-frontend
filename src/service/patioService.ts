import { fetchWithTimeout } from "../utils/fetchWithTimeout";
import { BASE_URL } from "../config/config";
import { ApiResponse } from "@/types/types";

export type Moto = {
  id: number;
  modelo: string;
  placa: string;
  chassi: string;
  anoFabricacao: number;
  cor: string;
  ativo: boolean;
  patioId: number;
};

export type Patio = {
  capacidade: any;
  motos: any;
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
};

export async function getMotosByPatio(patioId: number): Promise<ApiResponse<Moto[]>> {
  try {
    const res = await fetch(
      `${BASE_URL}/Patios/${patioId}/motos`
    );
    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data?.mensagem || "Erro ao buscar motos" };
    }

    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, message: "Erro de conexão ao buscar motos" + error };
  }
}

export async function getPatios(): Promise<Patio[]> {
  try {
    const resp = await fetchWithTimeout(`${BASE_URL}/Patios`);
    if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
    const json = await resp.json();
    return json.data || [];
  } catch (err) {
    console.error("Erro ao buscar pátios:", err);
    return [];
  }
}