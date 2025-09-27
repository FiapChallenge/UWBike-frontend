import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View, Text, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { getUserById, updateUser } from "../service/user";

export default function ChangePassword() {
    const { theme } = useTheme();
    const iconColor = theme === "dark" ? "#fff" : "#000";

    const { usuario } = useAuth();
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!usuario?.id) {
            Alert.alert("Erro", "Usuário não encontrado.");
            return;
        }

        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            Alert.alert("Erro", "A nova senha e a confirmação não coincidem.");
            return;
        }

        try {
            setLoading(true);

            const res = await getUserById(usuario.id);
            if (!res.success || !res.data) {
                Alert.alert("Erro", "Não foi possível buscar os dados do usuário.");
                setLoading(false);
                return;
            }

            const userData = res.data;

            if (userData.senha !== senhaAtual) {
                Alert.alert("Erro", "Senha atual incorreta.");
                setLoading(false);
                return;
            }

            const updatedUser = { ...userData, senha: novaSenha };

            const updateRes = await updateUser(usuario.id, updatedUser);

            if (updateRes.success) {
                Alert.alert("Sucesso", "Senha alterada com sucesso!");
                router.back();
            } else {
                Alert.alert("Erro", updateRes.message || "Não foi possível alterar a senha.");
            }
        } catch (error:any) {
            Alert.alert("Erro", "Ocorreu um erro ao alterar a senha." + error.message);
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <SafeAreaView className='flex-1 bg-background'>
            <View className="w-full mt-4 px-4">
                <View className="flex-row items-center justify-center mb-8">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute left-0"
                    >
                        <Feather name="arrow-left" size={24} color={iconColor} />
                    </TouchableOpacity>
                    <Text className="text-text font-bold text-xl">Alterar Senha</Text>
                </View>

                <View className="mt-8">
                    <TextInput
                        placeholder="Senha Atual"
                        placeholderTextColor={"#8e8e8e"} 
                        secureTextEntry
                        value={senhaAtual}
                        onChangeText={setSenhaAtual}
                        className="bg-card rounded-lg px-2 py-4 border-border border text-text mb-4"
                    />
                    <TextInput
                        placeholder="Nova Senha"
                        placeholderTextColor={"#8e8e8e"} 
                        secureTextEntry
                        value={novaSenha}
                        onChangeText={setNovaSenha}
                        className="bg-card rounded-lg px-2 py-4 border-border border text-text mb-4"
                    />

                    <TextInput
                        placeholder="Confirmar Nova Senha"
                        placeholderTextColor={"#8e8e8e"} 
                        secureTextEntry
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        className="bg-card rounded-lg px-2 py-4 border-border border text-text mb-6"
                    />

                    <TouchableOpacity
                        className="bg-[#00B030] p-4 rounded-xl items-center"
                        onPress={handleChangePassword}
                        disabled={loading}
                    >
                        <Text className="text-white font-bold">
                        {loading ? "Alterando..." : "Confirmar Alteração"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}