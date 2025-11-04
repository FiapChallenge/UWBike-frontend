import { useMoto } from "../context/MotoContext";
import { usePatio } from "../context/PatioContext";
import { BASE_URL } from "../config/config";
import { Alert } from "react-native";

export function useMotoActions() {
  const { carregarMotos } = useMoto();
  const { patioAtual } = usePatio();

  const deleteMoto = async (id: number, routerRef?: any) => {
    try {
      const res = await fetch(`${BASE_URL}/motos/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Erro ao deletar moto");

      if (patioAtual) {
        await carregarMotos(patioAtual.id);
      }
      Alert.alert("Sucesso", "Moto deletada com sucesso!");
      if (routerRef) routerRef.back();
    } catch (error) {
      console.error("Erro ao deletar moto:", error);
      Alert.alert("Erro", "Não foi possível deletar a moto.");
    }
  };

  return { deleteMoto };
}
