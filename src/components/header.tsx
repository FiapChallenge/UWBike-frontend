import { View, Text, TouchableOpacity } from "react-native";
import { Feather} from  '@expo/vector-icons';

import { router } from 'expo-router';
import { useTheme } from "@/src/context/ThemeProvider";

export default function Header(){
    const {colors} = useTheme();

    return(
        <View className="w-full flex-row items-center justify-between">
            {/* <Pressable>
                <Ionicons name="menu" size={32} color="white" />
            </Pressable> */}
        
            <View >
                <Text className="text-zinc-500 text-sm">Pátio atual</Text>
                <View className="flex-row items-center gap-2">  
                    <View className="w-2 h-2 bg-[#00B030] rounded-full"/>
                    <Text className={`${colors.text} font-bold text-lg`}>Base Butantã</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => router.push("/notifications")}>
                <Feather name="bell" size={24} color={colors.icons} />
            </TouchableOpacity>
        </View>
    );
}