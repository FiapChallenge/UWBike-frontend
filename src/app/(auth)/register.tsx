import { router } from "expo-router";
import { Pressable, View, Text, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  return (
    <SafeAreaView className="flex-1 bg-background">
    <View className="w-full mt-4 px-4 flex-1 justify-center gap-8">
        <Image source={require("../../../assets/images/logo-uwbike.png")} className="self-center w-40 h-40"/>
        <View className="flex gap-6">
            <TextInput className="bg-card rounded-lg px-2 py-4 border-border border" placeholder="Nome completo" placeholderTextColor={"#8e8e8e"}/>
            <TextInput className="bg-card rounded-lg px-2 py-4 border-border border" placeholder="Email" placeholderTextColor={"#8e8e8e"}/>
            <TextInput className="bg-card rounded-lg px-2 py-4 border-border border" placeholder="Senha" placeholderTextColor={"#8e8e8e"}/>

            <Pressable className="bg-[#00B030] rounded-lg" onPress={() => router.push("../(tabs)")}>
                <Text className="text-text font-bold text-lg text-center py-2">CRIAR CONTA</Text>
            </Pressable>

            <View className="flex-row gap-2">
                <Text className="text-text items-center">Já possui conta?</Text>
                <Pressable><Text className="text-[#00b030] underline" onPress={() => router.back()}>Entrar na conta</Text></Pressable>
            </View>
        </View>
    </View>

</SafeAreaView>
  );
}
