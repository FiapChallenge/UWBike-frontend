import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Notificationlist } from "../components/notificationlist";

export default function Notifications() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
        <View className="w-full mt-4 px-4">
            <View className="flex-row items-center justify-center">
                <Pressable onPress={() => router.back()} className="absolute left-0">
                    <Feather name="arrow-left" size={24} color="white" />
                </Pressable>

                <Text className="text-white font-bold text-xl">Notificações</Text>
            </View>

            <Notificationlist />
        </View>

    </SafeAreaView>
  );
}
