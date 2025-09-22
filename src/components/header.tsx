import { View, Text, TouchableOpacity } from "react-native";
import { Feather} from  '@expo/vector-icons';

import { router } from 'expo-router';
import { useTheme } from "../context/ThemeProvider";

export default function Header(){
    const { theme } = useTheme();
    const iconColor = theme === "dark" ? "#fff" : "#000";

    return(
        <View className="w-full flex-row items-center justify-between">
            {/* <Pressable>
                <Ionicons name="menu" size={32} color="white" />
            </Pressable> */}
        
            <View >
                <Text className="text-secondary text-sm">Pátio atual</Text>
                <View className="flex-row items-center gap-2">  
                    <View className="w-2 h-2 bg-[#00B030] rounded-full"/>
                    <Text className='text-text font-bold text-lg'>Base Butantã</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => router.push("/notifications")}>
                <Feather name="bell" size={24} color={iconColor} />
            </TouchableOpacity>
        </View>
    );
}