import { useAuth } from "@/src/context/AuthContext";
import { registerRequest } from "@/src/service/auth";
import { router } from "expo-router";
import { useState } from "react";
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
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      await register(nome, email, senha);
      router.push("../(tabs)");
    } catch (error: any) {
      setErrorMessage(error.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full mt-4 px-4 flex-1 justify-center gap-8">
        <Image
          source={require("../../../assets/images/logo-uwbike.png")}
          className="self-center w-40 h-40"
        />
        <Text className="text-text font-bold text-2xl text-center">
          Registro
        </Text>
        <View className="flex gap-6">
          <TextInput
            className="bg-card rounded-lg px-2 py-4 border-border border text-text"
            placeholder="Nome completo"
            placeholderTextColor={"#8e8e8e"}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            className="bg-card rounded-lg px-2 py-4 border-border border text-text"
            placeholder="Email"
            placeholderTextColor={"#8e8e8e"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="bg-card rounded-lg px-2 py-4 border-border border text-text"
            placeholder="Senha"
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
                CRIAR CONTA
              </Text>
            )}
          </Pressable>

          <View className="flex-row gap-2">
            <Text className="text-text items-center">Já possui conta?</Text>
            <Pressable>
              <Text
                className="text-[#00b030] underline"
                onPress={() => router.back()}
              >
                Entrar na conta
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
