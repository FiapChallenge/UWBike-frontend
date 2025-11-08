import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";

export default function Location() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "#fff" : "#000";

  const { id } = useLocalSearchParams<{ id: string }>();

  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [carregandoMoto, setCarregandoMoto] = useState(true);
  const [posicao, setPosicao] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchMoto = async () => {
      if (!id) return;
      setCarregandoMoto(true);
      try {
        const res = await fetch(`${BASE_URL}/Motos/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const json = await res.json();
        const moto = json.data;
        if (res.ok && moto) {
          setModelo(moto.modelo);
          setPlaca(moto.placa);
        }
      } catch (err) {
        console.error("Erro ao buscar moto:", err);
      } finally {
        setCarregandoMoto(false);
      }
    };

    const gerarLocalizacaoAleatoria = () => {
      const x = Math.floor(Math.random() * 90) + 5;
      const y = Math.floor(Math.random() * 90) + 5;
      setPosicao({ x, y });
    };
    fetchMoto();
    gerarLocalizacaoAleatoria();
  }, [id]);

  const getBikeImage = () => {
    switch (modelo) {
      case "Mottu-E":
        return require("../../assets/images/mottue.png");
      case "Mottu Sport":
        return require("../../assets/images/mottusport.png");
      case "Mottu-Pop":
        return require("../../assets/images/mottupop.png");
    }
  };

  const bikeImage = getBikeImage();

  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <View className="flex-row items-center justify-center mb-8 mt-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-0"
        >
          <Feather name="arrow-left" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text className="text-text font-bold text-2xl">
          {t("location.title")}
        </Text>
      </View>
      {carregandoMoto ? (
        <Text className="text-text">{t("editBike.loading")}</Text>
      ) : (
        <View className="gap-4">
          <View className="bg-card border-border border p-4 rounded-xl">
            <Text className="text-xl text-secondary">{modelo}</Text>
            <Text className="text-3xl font-bold text-text">{placa}</Text>
            <Image source={bikeImage} className="w-60 h-60 mb-2 self-center" />
          </View>
          <View className="bg-card border-border border p-4 rounded-xl">
            <View className="gap-2 flex-row items-center mb-4">
              <Text className="text-2xl font-semibold text-text">
                {t("location.location")}
              </Text>
            </View>
            <View
              className="w-9/12 bg-background rounded-lg border border-border"
              style={{
                aspectRatio: 1,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: "#62E085",
                  borderColor: "#00B030",
                  borderWidth: 3,
                  left: `${posicao.x}%`,
                  top: `${posicao.y}%`,
                  transform: [{ translateX: -8 }, { translateY: -8 }],
                }}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
