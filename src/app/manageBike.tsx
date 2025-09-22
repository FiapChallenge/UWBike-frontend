import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeProvider";
import { TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import SearchBar from "../components/searchBar";
import { useState } from "react";

export default function ManageBike() {
    const { theme } = useTheme();
    const iconColor = theme === "dark" ? "#fff" : "#000";
    const [searchTerm, setSearchTerm] = useState("");
    
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
                
                    <Text className='text-text font-bold text-xl'>Gerenciar Motos</Text>
                </View>
                <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm}/>
                <View className="mt-4">
                    <Text>Motos</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}