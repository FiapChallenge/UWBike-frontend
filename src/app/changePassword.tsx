import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View, Text, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { getUserById, updateUser } from "../service/user";
import { useTranslation } from "react-i18next";

export default function ChangePassword() {
    const{t} = useTranslation();
    const { theme } = useTheme();
    const iconColor = theme === "dark" ? "#fff" : "#000";

    const { usuario } = useAuth();
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!usuario?.id) {
            Alert.alert("Erro", t('changePassword.error.userNotFound'));
            return;
        }

        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            Alert.alert("Erro", t('changePassword.error.emptyFields'));
            return;
        }

        if (novaSenha !== confirmarSenha) {
            Alert.alert("Erro", t('changePassword.error.emptyFields'));
            return;
        }

        try {
            setLoading(true);

            const res = await getUserById(usuario.id);
            if (!res.success || !res.data) {
                Alert.alert("Erro", t('changePassword.error.fetchUser'));
                setLoading(false);
                return;
            }

            const userData = res.data;

            if (userData.senha !== senhaAtual) {
                Alert.alert("Erro", t('changePassword.error.wrongPassword'));
                setLoading(false);
                return;
            }

            const updatedUser = { ...userData, senha: novaSenha };

            const updateRes = await updateUser(usuario.id, updatedUser);

            if (updateRes.success) {
                Alert.alert("Sucesso", t('changePassword.success'));
                router.back();
            } else {
                Alert.alert("Erro", updateRes.message || t('changePassword.error.notPossible'));
            }
        } catch (error:any) {
            Alert.alert("Erro", t('changePassword.error.change') + error.message);
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
                    <Text className="text-text font-bold text-xl">{t('changePassword.title')}</Text>
                </View>

                <View className="mt-8">
                    <TextInput
                        placeholder={t('changePassword.currentPassword')}
                        placeholderTextColor={"#8e8e8e"} 
                        secureTextEntry
                        value={senhaAtual}
                        onChangeText={setSenhaAtual}
                        className="bg-card rounded-lg px-2 py-4 border-border border text-text mb-4"
                    />
                    <TextInput
                        placeholder={t('changePassword.newPassword')}
                        placeholderTextColor={"#8e8e8e"} 
                        secureTextEntry
                        value={novaSenha}
                        onChangeText={setNovaSenha}
                        className="bg-card rounded-lg px-2 py-4 border-border border text-text mb-4"
                    />

                    <TextInput
                        placeholder={t('changePassword.confirmPassword')}
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
                        {loading ? t('changePassword.changing') : t('changePassword.confirmChange')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}