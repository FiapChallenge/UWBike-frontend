import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";
import SummaryInfo from "@/src/components/summaryInfo";
import QuickActionCard from "@/src/components/quickActionCard";
import { usePatio } from "@/src/context/PatioContext";

export default function Index() {
  const { patioAtual } = usePatio();

  if (!patioAtual) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text className="text-text">Carregando dados do pátio...</Text>
      </SafeAreaView>
    );
  }

  const totalMotos = patioAtual.motos?.length ?? 0;
  const ocupacao = patioAtual.capacidade
    ? Math.round((totalMotos / patioAtual.capacidade) * 100)
    : 0;

  return (
    <SafeAreaView 
      className='flex-1 bg-background'>
      <View className="w-full mt-4 px-4">
        <Header />
        <View className='bg-card border-border border p-4 rounded-xl mt-16'>
          <Text className='text-text font-bold text-2xl mb-4'>Visão Geral</Text>
          <View className="flex-row gap-4 w-full">
            <SummaryInfo icon="motorcycle" info={totalMotos.toString()} description="Motos no pátio" />
            <SummaryInfo icon="warehouse"  info={`${ocupacao}%`} description="Ocupação" />
          </View>
        </View>
        <View className='mt-8'>
          <Text className='text-text font-bold text-2xl mb-4'>Ações Rápidas</Text>
          <View className="flex-row gap-4">
            <QuickActionCard
              route="/localize"
              title="Localizar moto"
              icon="location-arrow"
              color="bg-sky-500"
            />
            <QuickActionCard
              route="/manageBike"
              title="Gerenciar motos"
              icon="tools"
              color="bg-orange-500"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}