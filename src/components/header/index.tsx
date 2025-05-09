import { View, Pressable, Text } from "react-native";
import { Feather} from  '@expo/vector-icons';

export function Header(){
    return(
        <View className="w-full flex-row items-center justify-between">
            {/* <Pressable>
                <Ionicons name="menu" size={32} color="white" />
            </Pressable> */}
        
            <View >
                <Text className="text-zinc-500 text-sm">Pátio atual</Text>
                <View className="flex-row items-center gap-2">  
                    <View className="w-2 h-2 bg-[#00B030] rounded-full"/>
                    <Text className="text-white font-bold text-lg">Base Butantã</Text>
                </View>
            </View>

            <Pressable>
                <Feather name="bell" size={24} color="white" />
            </Pressable>
        </View>
    );
}