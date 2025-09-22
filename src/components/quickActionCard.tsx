import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type Routes = "/localize" | "/manageBike";
type Icons = 'location-arrow' | 'tools';

interface QuickActionCardProps {
    route: Routes,
    title: string,
    icon: Icons
    color: 'bg-sky-500' | 'bg-orange-500'
}

export default function QuickActionCard({route, title, icon, color}: QuickActionCardProps) {
    return(
        <TouchableOpacity className="bg-card border-border border p-4 rounded-xl flex-1" onPress={() => router.push(route as unknown as any)}>
            <View className={`${color} w-12 h-12 rounded-md items-center justify-center mb-4`}>
                <FontAwesome5 name={icon} size={24} color="white" />
            </View>
            <Text className="text-text text-lg font-medium">{title}</Text>
        </TouchableOpacity>
    )
}