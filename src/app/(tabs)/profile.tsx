import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import ThemeToggle from "@/src/components/themeToggle";
import { useTheme } from "@/src/context/ThemeProvider";


export default function Profile() {
    const { theme } = useTheme();
    const iconColor = theme === "dark" ? "#fff" : "#000";
    
    return (
        <SafeAreaView className='flex-1 bg-background'>
            <View className="w-full mt-4 px-4 gap-4 flex-1">
                <View className="flex-1">
                    <View className="mx-auto items-center">
                        <View className='bg-card w-20 h-20 rounded-full items-center justify-center border-border border'>
                            <Feather name="tool" size={32} color={iconColor} />
                        </View>
                        <Text className='text-text font-bold text-xl mt-4'>Rogério N. S. Moraes</Text>
                        <Text className="text-secondary mt-2">ID/Email Operador</Text>
                    </View>

                    <View className='bg-card p-4 rounded-xl mt-6 gap-4 border-border border'>
                        <Text className="text-secondary uppercase font-medium">Preferências</Text>
                        <View className=" gap-6">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-2">
                                    <Feather
                                        name="moon"
                                        color={iconColor}
                                        size={24}
                                    />
                                    <Text className='text-text'>Dark Mode</Text>
                                </View>
                                <ThemeToggle/>
                            </View>
                            <TouchableOpacity className="flex-row items-center gap-2">
                                <Feather name="log-out" size={24} color="red" />
                                <Text className="text-red-600">Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                
            </View>
        </SafeAreaView>
    );
}
