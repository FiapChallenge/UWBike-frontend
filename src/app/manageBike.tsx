import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeProvider";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import SearchBar from "../components/searchBar";
import { useEffect, useState } from "react";
import { usePatio } from "../context/PatioContext";
import { useMoto } from "../context/MotoContext";
import { useMotoActions } from "../hooks/useMoto";
import { useTranslation } from "react-i18next";

export default function ManageBike() {
    const{t} = useTranslation();
    const { theme } = useTheme();
    const iconColor = theme === "dark" ? "#fff" : "#000";

    const [searchTerm, setSearchTerm] = useState("");

    const { patioAtual } = usePatio();
    const { motos, carregarMotos } = useMoto();

    const { deleteMoto } = useMotoActions();


   useEffect(() => {
        if (patioAtual) {
        carregarMotos(patioAtual.id); 
        }
    }, [ patioAtual, carregarMotos]);
    
    const motosExibidas =
    searchTerm.trim().length > 0
      ? motos.filter(
          (m) =>
            m.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.chassi.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : motos;

    return (
        <SafeAreaView className='flex-1 bg-background'>
            <View className="w-full mt-4 px-4">
                <View className="flex-row items-center justify-center mb-8">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute left-0"
                    >
                        <Feather name="arrow-left" size={24} color={iconColor} />
                    </TouchableOpacity>
                
                    <Text className='text-text font-bold text-xl'>{t('manageBike.title')}</Text>
                    
                    <TouchableOpacity
                        onPress={() => router.push("/addBike")}
                        className="absolute right-0"
                    >
                        <Feather name="plus" size={24} color={iconColor} />
                    </TouchableOpacity>
                </View>
                <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm}/>
                <View className="mt-4">
                    <FlatList
                        data={motosExibidas}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <View className="p-4 mb-2 bg-card rounded-lg border border-border">
                                <Text className="text-text font-semibold">{item.modelo}</Text>
                                <Text className="text-text">{t('manageBike.plate')}: {item.placa}</Text>
                                <Text className="text-text">{t('manageBike.chassi')}: {item.chassi}</Text>
                                <Text className="text-text">{t('manageBike.year')}: {item.anoFabricacao}</Text>

                                <View className="flex-row justify-end mt-2 gap-4">
                                    <TouchableOpacity
                                    onPress={() => router.push(`/editBike?id=${item.id}`)}
                                    className="bg-blue-600 px-3 py-1 rounded"
                                    >
                                        <Feather name="edit" size={18} color="#fff"></Feather>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    onPress={() => deleteMoto(item.id)}
                                    className="bg-red-600 px-3 py-1 rounded"
                                    >
                                        <Feather name="trash" size={18} color="#fff"></Feather>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={() => (
                        <Text className="text-text text-center mt-8">
                            {t('manageBike.noBikes')}
                        </Text>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}