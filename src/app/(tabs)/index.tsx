import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/header";

export default function Index() {
  return (
    <SafeAreaView 
      className="flex-1 bg-zinc-900">
      <View className="w-full mt-4 px-4">
        <Header />
      </View>
    </SafeAreaView>
  );
}