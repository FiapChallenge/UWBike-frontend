import { SearchBar } from "@/src/components/searchbar";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notification() {
  return (
    <SafeAreaView 
        className="flex-1 bg-zinc-900">
        <View className="w-full mt- px-4 mt-4">
          <SearchBar />
        </View>
      </SafeAreaView>
  );
}
