import { useAuth } from "@/src/context/AuthContext"; 
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  View,
  Text,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const{t} = useTranslation();
  const { register } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setErrorMessage("");

    if (!nome || !email || !senha) {
      Alert.alert(t('register.alertEmpty'));
      return;
    }

    if (senha.length < 6) {
      setLoading(false);
      setErrorMessage(t('register.alertShortPassword'));
      return;
    }

    try {
      await register(nome, email, senha);
      router.push("../(tabs)");
    } catch (error: any) {
      setErrorMessage(error.message || t('register.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full mt-40 px-4 flex-1 gap-8">
        <Image
          source={require("../../../assets/images/logo-uwbike.png")}
          className="self-center w-40 h-40"
        />
        <Text className="text-text font-bold text-3xl text-center">
          {t('register.title')}
        </Text>
        <View className="flex gap-6">
          <TextInput
            className="bg-card rounded-lg px-2 py-4 border-border border text-text"
            placeholder={t('register.name')}
            placeholderTextColor={"#8e8e8e"}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            className="bg-card rounded-lg px-2 py-4 border-border border text-text"
            placeholder={t('register.email')}
            placeholderTextColor={"#8e8e8e"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="bg-card rounded-lg px-2 py-4 border-border border text-text"
            placeholder={t('register.password')}
            placeholderTextColor={"#8e8e8e"}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          {errorMessage ? (
            <Text className="text-red-500 text-center">{errorMessage}</Text>
          ) : null}

          <Pressable
            className="bg-[#00B030] rounded-lg"
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" className="py-2" />
            ) : (
              <Text className="text-white font-bold text-lg text-center py-2">
                {t('register.create')}
              </Text>
            )}
          </Pressable>

          <View className="flex-row gap-2">
            <Text className="text-text items-center">{t('register.haveAccount')}</Text>
            <Pressable>
              <Text
                className="text-[#00b030] underline"
                onPress={() => router.back()}
              >
                {t('register.enterAccount')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
