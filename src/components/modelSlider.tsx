import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { useState, useEffect } from "react";

const { width } = Dimensions.get("window");
const ITEM_SPACING = 12;
const CARD_WIDTH = (width - ITEM_SPACING * 4) / 3; 

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
    <View className="mt-5 mb-5 flex-row gap-2">
      {motos.map((item) => {
        const isSelected = item.id === selectedId;
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => handleSelect(item)}
            style={{
              width: CARD_WIDTH,
              backgroundColor: isSelected ? "#00B030" : "transparent",
              borderRadius: 12,
              padding: 8,
            }}
          >
            <Image
              source={item.imagem}
              style={{
                width: "100%",
                height: 110,
                borderRadius: 12,
                resizeMode: "cover",
              }}
            />
            <Text
              className={`text-center mt-2 ${
                isSelected ? "font-bold text-white" : "text-text"
              }`}
            >
              {item.nome}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
