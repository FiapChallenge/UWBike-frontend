import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import SearchBar from "../components/searchBar";
import BikeCard from "../components/bikeCard";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeProvider";
import { useEffect, useState } from "react";
import { usePatio } from "../context/PatioContext";
import { useMoto } from "../context/MotoContext";

export default function LocalizeBike() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "#fff" : "#000";

  const [searchTerm, setSearchTerm] = useState("");

  const { patioAtual } = usePatio();
  const { motos, carregarMotos } = useMoto();

  useEffect(() => {
    if (patioAtual) {
      carregarMotos(patioAtual.id);
    }
  }, [patioAtual, carregarMotos]);

  const motosExibidas =
    searchTerm.trim().length > 0
      ? motos.filter(
          (m) =>
            m.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.chassi.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : motos;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full mt-4 px-4">
        <View className="flex-row items-center justify-center mb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0"
          >
            <Feather name="arrow-left" size={24} color={iconColor} />
          </TouchableOpacity>

          <Text className="text-text font-bold text-2xl">
            {t("localize.title")}
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/addBike")}
            className="absolute right-0"
          >
            <Feather name="plus" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <View className="mt-4">
          <FlatList
            className="w-full h-full"
            data={motosExibidas}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <BikeCard {...item} mode="view"/>}
            ListEmptyComponent={() => (
              <Text className="text-text text-center mt-8">
                {t("localize.noBikes")}
              </Text>
            )}
            numColumns={2} 
            columnWrapperStyle={{ justifyContent: "space-between"}} 
            contentContainerStyle={{ paddingBottom: 16 }} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
