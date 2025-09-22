import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Notificationlist } from "../components/notificationList";
import { useTheme } from "../context/ThemeProvider";

export default function Notifications() {    
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "#fff" : "#000";

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className="w-full mt-4 px-4">
        <View className="flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0"
          >
            <Feather name="arrow-left" size={24} color={iconColor} />
          </TouchableOpacity>

          <Text className='text-text font-bold text-xl'>
            Notificações
          </Text>
        </View>

        <Notificationlist />
      </View>
    </SafeAreaView>
  );
}
