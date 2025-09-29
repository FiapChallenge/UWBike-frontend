// src/hooks/useMotoActions.ts
import { useMoto } from "../context/MotoContext";
import { usePatio } from "../context/PatioContext";
import { BASE_URL } from "../config/config";

export function useMotoActions() {
  const { carregarMotos } = useMoto();
  const { patioAtual } = usePatio();

  const deleteMoto = async (id: number) => {
    try {
        const res = await fetch(`${BASE_URL}/motos/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Erro ao deletar moto");

        if (patioAtual) {
            await carregarMotos(patioAtual.id);
        }
    } catch (error) {
        console.error("Erro ao deletar moto:", error);
    }
  };

  return { deleteMoto };
}
