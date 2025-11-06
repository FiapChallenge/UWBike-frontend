import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeProvider";
import { TouchableOpacity, View, Text, TextInput, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { usePatio } from "../context/PatioContext";
import { BASE_URL } from "../config/config";
import ModelSlider from "../components/modelSlider";
import { notificarMotoAdicionada } from "../service/notificationService";

export default function AddBike() {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "#fff" : "#000";
  const { patioAtual } = usePatio();

  const [modeloSelecionado, setModeloSelecionado] = useState<string>("");
  const [placa, setPlaca] = useState("");
  const [chassi, setChassi] = useState("");
  const [anoFabricacao, setAnoFabricacao] = useState("");
  const cor = "verde";
  const [loading, setLoading] = useState(false);

  const handleAddBike = async () => {
    if (!patioAtual) return;

    if (!modeloSelecionado.trim()) {
      Alert.alert("Validação", "Selecione o modelo da moto.");
      return;
    }

    if (!placa.trim()) {
      Alert.alert("Validação", "Informe a placa da moto.");
      return;
    }

    if (!chassi.trim()) {
      Alert.alert("Validação", "Informe o número do chassi.");
      return;
    }

    if (!anoFabricacao.trim()) {
      Alert.alert("Validação", "Informe o ano de fabricação.");
      return;
    }

    if (isNaN(Number(anoFabricacao)) || anoFabricacao.length < 4) {
      Alert.alert(
        "Validação",
        "Digite um ano de fabricação válido (ex: 2022)."
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/Motos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelo: modeloSelecionado,
          placa,
          chassi,
          anoFabricacao: Number(anoFabricacao),
          cor,
          patioId: patioAtual.id,
        }),
      });

      if (!res.ok) throw new Error("Erro ao adicionar moto");
      Alert.alert("Sucesso", "Moto adicionada com sucesso!");

      await notificarMotoAdicionada(modeloSelecionado, placa, patioAtual.nome);

      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível adicionar a moto.");
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
        <Text className="text-text font-bold text-2xl">Adicionar Moto</Text>
      </View>

      <View className="gap-4">
        <ModelSlider onSelect={(nome: string) => setModeloSelecionado(nome)} />
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
