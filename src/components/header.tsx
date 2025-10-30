import { View, Text, TouchableOpacity, Modal, FlatList, Pressable } from "react-native";
import { Feather} from  '@expo/vector-icons';

import { router } from 'expo-router';
import { useTheme } from "../context/ThemeProvider";
import { usePatio } from "../context/PatioContext";
import { useState } from "react";

export default function Header(){
    const { theme } = useTheme();
    const iconColor = theme === "dark" ? "#fff" : "#000";

    const { patios, patioAtual, selecionarPatio, loading } = usePatio();
    const [open, setOpen] = useState(false);

    const bgDropdown = theme === "dark" ? "#1E1E1E" : "#fff";
    const textColor = theme === "dark" ? "#fff" : "#000";

    return(
        <View className="w-full flex-row items-center justify-between">        
            <TouchableOpacity
                className="flex-row items-center gap-2"
                onPress={() => setOpen(true)}
                disabled={loading}
            >
               <View className="w-2 h-2 bg-[#00B030] rounded-full" />
                <Text className="text-text font-bold text-lg">
                {patioAtual?.nome || "Nenhum pátio"}
                </Text>
                <Feather name="chevron-down" size={18} color={iconColor} />
            </TouchableOpacity>

            <Modal
                transparent
                visible={open}
                animationType="fade"
                onRequestClose={() => setOpen(false)}
            >
                <Pressable
                    className="flex-1"
                    onPress={() => setOpen(false)}
                    >
                    <View className="absolute left-4 right-4 top-[10%] bg-transparent">
                        <View
                        className="rounded-lg"
                        style={{
                            backgroundColor: bgDropdown,
                            maxHeight: 250,
                            paddingVertical: 4,
                        }}
                        >
                            <FlatList
                                data={patios}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="py-3 px-4"
                                    onPress={() => {
                                    selecionarPatio(item.id);
                                    setOpen(false);
                                    }}
                                >
                                    <Text style={{ color: textColor }} className="text-base">
                                    {item.nome}
                                    </Text>
                                </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </Pressable>
            </Modal>

            <TouchableOpacity onPress={() => router.push("/notifications")}>
                <Feather name="bell" size={24} color={iconColor} />
            </TouchableOpacity>
        </View>
    );
}