import SearchBar from "@/src/components/searchBar";
import { useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const motosMock = [
  { placa: "ABC1234", chassi: "9C2KC0810DR123456", tipo: 'sport' },
  { placa: "XYZ5678", chassi: "9C2KC0810DR654321", tipo: 'e'},
  { placa: "DEF9999", chassi: "9C2KC0810DR000999", tipo: 'pop' },
];

const motoImages: Record<string, any> = {
  sport: require("../../../assets/images/mottusport.png"),
  e: require("../../../assets/images/mottue.png"),
  pop: require("../../../assets/images/mottupop.png"),
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMotos = motosMock.filter(
    (moto) =>
      moto.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moto.chassi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showResults = searchTerm.trim().length > 0 && filteredMotos.length > 0;

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className="w-full mt- px-4 mt-4">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      </View>

      {showResults && (
        <View className="px-4 mt-6">
          <FlatList
            data={filteredMotos}
            keyExtractor={(item) => item.chassi}
            renderItem={({ item }) => (
              <View className='bg-card p-4 rounded-md mb-2 flex-row items-center'>
                <Image
                  source={motoImages[item.tipo]}
                  style={{ width: 60, height: 60, marginRight: 12, borderRadius: 8 }}
                  resizeMode="contain"
                />
                <View>
                  <Text className='text-text'>Placa: {item.placa}</Text>
                  <Text className="text-secondary">Chassi: {item.chassi}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
