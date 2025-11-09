import { useAuth } from "@/src/context/AuthContext";
import { pedirPermissaoNotificacoes } from "@/src/service/notificationService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View, Text, Image, TextInput, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const{t}=useTranslation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMsg(null);
    if (!email || !senha) {
      setErrorMsg(t('login.errorEmpty'));
      return;
    }

    try {
      setLoading(true);
      await login(email, senha);
      router.push('../(tabs)');
    } catch (err: any) {
      setErrorMsg(err.message || t('login.errorLogin'));
    } finally {
      setLoading(false);
    }
  };  

  
  useEffect(() => {
    const setupNotifications = async () => {
      console.log("🔔 Iniciando configuração de notificações...");
      const granted = await pedirPermissaoNotificacoes();
      
      if (granted) {
        console.log("✅ Permissão de notificação concedida!");
        Alert.alert("Sucesso", "Notificações configuradas com sucesso!");
      } else {
        console.log("❌ Permissão de notificação negada!");
        Alert.alert("Aviso", "Notificações não foram autorizadas. Você não receberá alertas.");
      }
    };

    setupNotifications();
  }, []);
  
  return (
    <SafeAreaView className="flex-1 bg-background">
        <View className="w-full mt-40 px-4 flex-1 gap-8">
            <Image source={require("../../../assets/images/logo-uwbike.png")} className="self-center w-40 h-40"/>
            <Text className="text-text font-bold text-3xl text-center">{t('login.title')}</Text>

            <View className="flex gap-6">
                <TextInput 
                    className="bg-card rounded-lg px-2 py-4 border-border border text-text" 
                    placeholder={t('login.email')} 
                    placeholderTextColor={"#8e8e8e"} 
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput 
                    className="bg-card rounded-lg px-2 py-4 border-border border text-text" 
                    placeholder={t('login.password')} 
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
                    <Text className="text-white font-bold text-lg text-center py-2">
                      {t('login.enter')}
                    </Text>
                  )}
                </Pressable>

                <View className="flex-row gap-2">
                    <Text className="text-text items-center">{t('login.noAccount')}</Text>
                    <Pressable><Text className="text-[#00b030] underline" onPress={() => router.push("/register")}>{t('login.createAccount')}</Text></Pressable>
                </View>
            </View>
        </View>

    </SafeAreaView>
  );
}
