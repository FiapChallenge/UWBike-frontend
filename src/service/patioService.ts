import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const BASE_URL = "http://10.3.33.13:5241/api";

export type Patio = {
  capacidade: any;
  motos: any;
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
};

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