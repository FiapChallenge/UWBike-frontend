import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";
import { useTheme } from "@/src/context/ThemeProvider";
import SummaryInfo from "@/src/components/summaryInfo";

export default function Index() {
  const { colors } = useTheme();

  return (
    <SafeAreaView 
      className={`flex-1 ${colors.bg}`}>
      <View className="w-full mt-4 px-4">
        <Header />
        <View className={`${colors.card} p-4 rounded-xl mt-16`}>
          <Text className={`${colors.text} font-bold text-2xl mb-4`}>Visão Geral</Text>
          <View className="flex-row gap-4 w-full">
            <SummaryInfo icon="motorcycle" info="120" description="Motos no pátio" />
            <SummaryInfo icon="warehouse" info="80%" description="Ocupação" />
          </View>
        </View>
        <View className={`${colors.card} p-4 rounded-xl mt-8`}>
          <Text className={`${colors.text} font-bold text-2xl mb-4`}>Ações Rápidas</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}