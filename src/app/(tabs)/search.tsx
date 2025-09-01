import { SearchBar } from "@/src/components/searchbar";
import { useTheme } from "@/src/context/ThemeProvider";
import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const motosMock = [
  { placa: "ABC1234", chassi: "9C2KC0810DR123456" },
  { placa: "XYZ5678", chassi: "9C2KC0810DR654321" },
  { placa: "DEF9999", chassi: "9C2KC0810DR000999" },
];

export default function Search() {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMotos = motosMock.filter(
    (moto) =>
      moto.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moto.chassi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showResults = searchTerm.trim().length > 0 && filteredMotos.length > 0;

  return (
    <SafeAreaView className={`flex-1 ${colors.bg}`}>
      <View className="w-full mt- px-4 mt-4">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      </View>

      {showResults && (
        <View className="px-4 mt-6">
          <FlatList
            data={filteredMotos}
            keyExtractor={(item) => item.chassi}
            renderItem={({ item }) => (
              <View className={`${colors.card} p-4 rounded-md mb-2`}>
                <Text className={`${colors.text}`}>Placa: {item.placa}</Text>
                <Text className="text-zinc-500">Chassi: {item.chassi}</Text>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
