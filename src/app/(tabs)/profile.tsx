import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import ThemeToggle from "@/src/components/themeToggle";
import { useTheme } from "@/src/context/ThemeProvider";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import i18n from "@/src/service/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Profile() {
    const{t} = useTranslation();
    const { theme } = useTheme();
    const { usuario, logout } = useAuth();
    const iconColor = theme === "dark" ? "#fff" : "#000";
    
    const toggleLanguage = async () => {
        const newLang = i18n.language === "pt" ? "es" : "pt";
        await AsyncStorage.setItem("appLanguage", newLang);
        i18n.changeLanguage(newLang);
    };


    return (
        <SafeAreaView className='flex-1 bg-background'>
            <View className="w-full mt-4 px-4 gap-4 flex-1">
                <View className="flex-1">
                    <View className="mx-auto items-center">
                        <View className='bg-card w-20 h-20 rounded-full items-center justify-center border-border border'>
                            <Feather name="tool" size={32} color={iconColor} />
                        </View>
                        <Text className='text-text font-bold text-xl mt-4'>{usuario?.nome}</Text>
                        <Text className="text-secondary mt-2">{usuario?.email}</Text>
                    </View>

                    <View className='bg-card p-4 rounded-xl mt-6 gap-4 border-border border'>
                        <Text className="text-secondary uppercase font-medium">{t('profile.preferences')}</Text>
                        <View className=" gap-6">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-2">
                                    <Feather
                                        name="moon"
                                        color={iconColor}
                                        size={24}
                                    />
                                    <Text className='text-text'>{t('profile.darkMode')}</Text>
                                </View>
                                <ThemeToggle/>
                            </View>

                            <Pressable
                                className="flex-row items-center gap-2"
                                onPress={toggleLanguage}
                            >
                                <Feather
                                    name="globe"
                                    size={22}
                                    color={iconColor}
                                />
                                <Text className="text-text">
                                    {i18n.language === "pt" ? "Português 🇧🇷" : "Español 🇪🇸"}
                                </Text>
                            </Pressable>

                            <TouchableOpacity 
                                className="flex-row items-center gap-2"
                                onPress={() => router.push("/changePassword")}
                            >
                                <Feather name="key" size={24} color={iconColor} />
                                <Text className="text-text">{t("profile.changePassword")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                className="flex-row items-center gap-2"
                                onPress={logout}
                            >
                                <Feather name="log-out" size={24} color="red" />
                                <Text className="text-red-600">{t("profile.logout")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                
            </View>
        </SafeAreaView>
    );
}
