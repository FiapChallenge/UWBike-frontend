import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const BASE_URL = "https://mariann-exculpable-zetta.ngrok-free.dev/api";

export type Patio = {
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