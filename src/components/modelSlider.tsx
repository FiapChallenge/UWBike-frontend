import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import { useState, useEffect } from "react";

const { width } = Dimensions.get("window");
const SLIDE_WIDTH = width * 0.5;
const ITEM_SPACING = 16;

const motos = [
  { id: 1, nome: "Mottu-E", imagem: require("../../assets/images/mottue.png") },
  { id: 2, nome: "Mottu Sport", imagem: require("../../assets/images/mottusport.png") },
  { id: 3, nome: "Mottu-Pop", imagem: require("../../assets/images/mottupop.png") },
];

export default function ModelSlider({ onSelect, selectedValue }: any) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedValue) {
      const found = motos.find(m => m.nome === selectedValue);
      if (found) setSelectedId(found.id);
    }
  }, [selectedValue]);

  const handleSelect = (item: any) => {
    setSelectedId(item.id);
    onSelect(item.nome);
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }} className="text-text">
        Escolha o modelo:
      </Text>
      <FlatList
        data={motos}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SLIDE_WIDTH + ITEM_SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: (width - SLIDE_WIDTH) / 2 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedId;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleSelect(item)}
              style={{
                width: SLIDE_WIDTH,
                marginHorizontal: ITEM_SPACING / 2,
                borderWidth: isSelected ? 2 : 0,
                borderColor: isSelected ? "#00B030" : "transparent",
                borderRadius: 12,
                padding: 10,
              }}
            >
              <Image
                source={item.imagem}
                style={{ width: "100%", height: 180, borderRadius: 12, resizeMode: "cover" }}
              />
              <Text
                style={{ textAlign: "center", marginTop: 6, fontWeight: isSelected ? "bold" : "normal" }}
                className="text-text"
              >
                {item.nome}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
