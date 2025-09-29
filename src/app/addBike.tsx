// src/pages/AddBike.tsx
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeProvider";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { usePatio } from "../context/PatioContext";
import { BASE_URL } from "../config/config";

export default function AddBike() {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "#fff" : "#000";
  const { patioAtual } = usePatio();

  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [chassi, setChassi] = useState("");
  const [anoFabricacao, setAnoFabricacao] = useState("");
  const [cor, setCor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddBike = async () => {
    if (!patioAtual) return;

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/Motos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelo,
          placa,
          chassi,
          anoFabricacao: Number(anoFabricacao),
          cor,
          patioId: patioAtual.id,
        }),
      });

      if (!res.ok) throw new Error("Erro ao adicionar moto");

      router.back();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <View className="flex-row items-center justify-center mb-8 mt-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-0"
        >
          <Feather name="arrow-left" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text className="text-text font-bold text-xl">Adicionar Moto</Text>
      </View>

      <View className="gap-4">
        <TextInput
          placeholder="Modelo"
          placeholderTextColor={"#8e8e8e"} 
          value={modelo}
          onChangeText={setModelo}
          className="bg-card p-4 rounded-xl border border-border text-text"
        />
        <TextInput
          placeholder="Placa"
          placeholderTextColor={"#8e8e8e"} 
          value={placa}
          onChangeText={setPlaca}
          className="bg-card p-4 rounded-xl border border-border text-text"
        />
        <TextInput
          placeholder="Chassi"
          placeholderTextColor={"#8e8e8e"} 
          value={chassi}
          onChangeText={setChassi}
          className="bg-card p-4 rounded-xl border border-border text-text"
        />
        <TextInput
          placeholder="Ano de Fabricação"
          placeholderTextColor={"#8e8e8e"} 
          value={anoFabricacao}
          onChangeText={setAnoFabricacao}
          keyboardType="numeric"
          className="bg-card p-4 rounded-xl border border-border text-text"
        />
        <TextInput
          placeholder="Cor"
          placeholderTextColor={"#8e8e8e"} 
          value={cor}
          onChangeText={setCor}
          className="bg-card p-4 rounded-xl border border-border text-text"
        />

        <TouchableOpacity
          onPress={handleAddBike}
          className="bg-[#00B030] p-4 rounded-xl items-center"
          disabled={loading}
        >
          <Text className="text-white font-bold">
            {loading ? "Adicionando..." : "Adicionar"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
