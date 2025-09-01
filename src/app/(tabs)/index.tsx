import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/header";
import { useTheme } from "@/src/context/ThemeProvider";

export default function Index() {
  const { colors } = useTheme();

  return (
    <SafeAreaView 
      className={`flex-1 ${colors.bg}`}>
      <View className="w-full mt-4 px-4">
        <Header />
      </View>
    </SafeAreaView>
  );
}