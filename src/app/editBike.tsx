import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeProvider";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { BASE_URL } from "../config/config";
import { usePatio } from "../context/PatioContext";
import { useTranslation } from "react-i18next";

export default function EditBike() {
  const{t} = useTranslation();
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "#fff" : "#000";

  const { id } = useLocalSearchParams<{ id: string }>();
  const { patioAtual } = usePatio();

  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [chassi, setChassi] = useState("");
  const [anoFabricacao, setAnoFabricacao] = useState("");
  const [cor, setCor] = useState("");
  const [loading, setLoading] = useState(false);
  const [carregandoMoto, setCarregandoMoto] = useState(true);

  useEffect(() => {
    const fetchMoto = async () => {
      if (!id) return;
      setCarregandoMoto(true);
      try {
        const res = await fetch(`${BASE_URL}/Motos/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });
        const json = await res.json();
        const moto = json.data; 
        if (res.ok && moto) {
          setModelo(moto.modelo);
          setPlaca(moto.placa);
          setChassi(moto.chassi);
          setAnoFabricacao(String(moto.anoFabricacao));
          setCor(moto.cor);
        }
      } catch (err) {
        console.error("Erro ao buscar moto:", err);
      } finally {
        setCarregandoMoto(false);
      }
    };

    fetchMoto();
  }, [id]);

  const handleEditBike = async () => {
    if (!id || !patioAtual) return;

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/Motos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelo,
          placa,
          chassi,
          anoFabricacao: Number(anoFabricacao),
          cor,
          ativo: true,
          patioId: patioAtual.id,
        }),
      });

      if (!res.ok) throw new Error("Erro ao editar moto");
      router.back();
    } catch (error) {
      console.error("Erro ao editar moto:", error);
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
        <Text className="text-text font-bold text-xl">{t('editBike.title')}</Text>
      </View>
        {carregandoMoto ? (
            <Text>{t('editBike.loading')}</Text>
        ) : (
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
                placeholder={t('editBike.chassi')}
                placeholderTextColor={"#8e8e8e"}
                value={chassi}
                onChangeText={setChassi}
                className="bg-card p-4 rounded-xl border border-border text-text"
                />
                <TextInput
                placeholder={t('editBike.year')}
                placeholderTextColor={"#8e8e8e"}
                value={anoFabricacao}
                onChangeText={setAnoFabricacao}
                keyboardType="numeric"
                className="bg-card p-4 rounded-xl border border-border text-text"
                />
                <TextInput
                placeholder={t('editBike.color')}
                placeholderTextColor={"#8e8e8e"}
                value={cor}
                onChangeText={setCor}
                className="bg-card p-4 rounded-xl border border-border text-text"
                />

                <TouchableOpacity
                onPress={handleEditBike}
                className="bg-[#00B030] p-4 rounded-xl items-center"
                disabled={loading}
                >
                <Text className="text-white font-bold">
                    {loading ? "Editando..." : t('editBike.save')}
                </Text>
                </TouchableOpacity>
            </View>
        )}
    </SafeAreaView>
  );
}
