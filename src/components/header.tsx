import { View, Text, TouchableOpacity } from "react-native";
import { Feather} from  '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";

import { router } from 'expo-router';
import { useTheme } from "../context/ThemeProvider";
import { usePatio } from "../context/PatioContext";
import { useState } from "react";

export default function Header(){
    const { theme } = useTheme();
    const iconColor = theme === "dark" ? "#fff" : "#000";

    const { patios, patioAtual, selecionarPatio, loading } = usePatio();
    const [isSelecting, setIsSelecting] = useState(false);

    return(
        <View className="w-full flex-row items-center justify-between">        
            <View >
                <Text className="text-secondary text-sm">Pátio atual</Text>
                {isSelecting ? (
                <Picker
                    selectedValue={patioAtual?.id}
                    onValueChange={(itemValue) => {
                        selecionarPatio(itemValue);
                        setIsSelecting(false);
                    }}
                    style={{ width: 200, color: theme === "dark" ? "#fff" : "#000" }}
                >
                    {patios.map((p) => (
                        <Picker.Item key={p.id} label={p.nome} value={p.id} />
                    ))}
                </Picker>
                ) : (
                <TouchableOpacity
                    className="flex-row items-center gap-2"
                    onPress={() => setIsSelecting(true)}
                    disabled={loading}
                >
                    <View className="w-2 h-2 bg-[#00B030] rounded-full" />
                    <Text className="text-text font-bold text-lg">
                        {patioAtual?.nome || "Nenhum pátio"}
                    </Text>
                    <Feather name="chevron-down" size={18} color={iconColor} />
                </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity onPress={() => router.push("/notifications")}>
                <Feather name="bell" size={24} color={iconColor} />
            </TouchableOpacity>
        </View>
    );
}