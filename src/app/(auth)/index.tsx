import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View, Text, Image, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMsg(null);
    if (!email || !senha) {
      setErrorMsg('Por favor, informe email e senha.');
      return;
    }

    try {
      setLoading(true);
      await login(email, senha);
      router.push('../(tabs)');
    } catch (err: any) {
      console.error('Falha no login:', err);
      setErrorMsg(err.message || 'Falha ao tentar fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
        <View className="w-full mt-40 px-4 flex-1 gap-8">
            <Image source={require("../../../assets/images/logo-uwbike.png")} className="self-center w-40 h-40"/>
            <Text className="text-text font-bold text-2xl text-center">Login</Text>

            <View className="flex gap-6">
                <TextInput 
                    className="bg-card rounded-lg px-2 py-4 border-border border text-text" 
                    placeholder="Email" 
                    placeholderTextColor={"#8e8e8e"} 
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput 
                    className="bg-card rounded-lg px-2 py-4 border-border border text-text" 
                    placeholder="Senha" 
                    placeholderTextColor={"#8e8e8e"}
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />

                {errorMsg && (
                    <Text className="text-red-500 text-center">{errorMsg}</Text>
                )}

                <Pressable 
                    className="bg-[#00B030] rounded-lg" 
                    onPress={handleLogin}
                    disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" className="py-2" />
                    ) : (
                    <Text className="text-text font-bold text-lg text-center py-2">
                      ENTRAR
                    </Text>
                  )}
                </Pressable>

                <View className="flex-row gap-2">
                    <Text className="text-text items-center">Não possui conta?</Text>
                    <Pressable><Text className="text-[#00b030] underline" onPress={() => router.push("/register")}>Criar conta</Text></Pressable>
                </View>
            </View>
        </View>

    </SafeAreaView>
  );
}
