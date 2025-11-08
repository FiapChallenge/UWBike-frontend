import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export default function About(){
    return(
        <SafeAreaView className='flex-1 bg-background items-center justify-center'>
            <Text className="font-bold text-text text-2xl">Commit Referencia: </Text>
        </SafeAreaView>
    )
}