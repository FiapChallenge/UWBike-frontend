import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import ThemeToggle from "@/src/components/themeToggle";
import { useTheme } from "@/src/context/ThemeProvider";


export default function Profile() {
  const {colors} = useTheme();

  return (
    <SafeAreaView className={`flex-1 ${colors.bg}`}>
        <View className="w-full mt-4 px-4 gap-4 flex-1">
            <View className="flex-1">
                <View className="mx-auto items-center">
                    <View className={`${colors.card} w-20 h-20 rounded-full items-center justify-center`}>
                        <Feather name="tool" size={32} color={colors.icons} />
                    </View>
                    <Text className={`${colors.text} font-bold text-xl mt-4`}>Rogério N. S. Moraes</Text>
                    <Text className="text-zinc-500 mt-2">ID/Email Operador</Text>
                </View>

                <View className={`${colors.card} p-4 rounded-xl mt-6 gap-4`}>
                    <Text className="text-zinc-500 uppercase font-medium">Preferências</Text>
                    <View className=" gap-6">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <Feather
                                    name="moon"
                                    color={colors.icons}
                                    size={24}
                                />
                                <Text className={`${colors.text}`}>Dark Mode</Text>
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
