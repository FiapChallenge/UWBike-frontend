import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/header";
import { Notification } from "../../components/notification";

export default function Index() {
  return (
    <SafeAreaView 
      className="flex-1 bg-zinc-900">
      <View className="w-full mt-4 px-4">
        <Header />
        {/* <Notification 
          type="settings"
          plate="ABC1234"
          advice="A moto entrou na oficina"
          date="Hoje - 20:19"
        />
        <Notification 
          type="info"
          plate="ABC4321"
          advice="A moto está fora de uma alguma zona"
          date="Hoje - 20:02"
        /> */}
      </View>
    </SafeAreaView>
  );
}