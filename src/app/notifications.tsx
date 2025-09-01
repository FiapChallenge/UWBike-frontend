import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Notificationlist } from "../components/notificationlist";
import { useTheme } from "../context/ThemeProvider";

export default function Notifications() {
  const {colors} = useTheme();
  return (
    <SafeAreaView className={`flex-1 ${colors.bg}`}>
        <View className="w-full mt-4 px-4">
            <View className="flex-row items-center justify-center">
                <TouchableOpacity onPress={() => router.back()} className="absolute left-0">
                    <Feather name="arrow-left" size={24} color={colors.icons} />
                </TouchableOpacity>

                <Text className={`${colors.text} font-bold text-xl`}>Notificações</Text>
            </View>

            <Notificationlist />
        </View>

    </SafeAreaView>
  );
}
