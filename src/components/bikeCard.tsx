import { router } from "expo-router";
import { Text, Image, Dimensions, StyleSheet, Pressable } from "react-native";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width;

type BikeCardProps = {
  id: number;
  modelo: string;
  placa: string;
  chassi: string;
  anoFabricacao: number;
  mode?: "edit" | "view";
};

export default function BikeCard({ mode = "edit", ...item }: BikeCardProps) {
  const getBikeImage = () => {
    switch (item.modelo) {
      case "Mottu-E":
        return require("../../assets/images/mottue.png");
      case "Mottu Sport":
        return require("../../assets/images/mottusport.png");
      case "Mottu-Pop":
        return require("../../assets/images/mottupop.png");
    }
  };

  const bikeImage = getBikeImage();

  const handlePress = () => {
    if (mode === "view") {
      router.push({
        pathname: "/location",
        params: { id: item.id.toString() },
      });
    } else {
      router.push({
        pathname: "/editBike",
        params: { id: item.id.toString() },
      });
    }
  };

  return (
    <Pressable
      className="p-4 mb-2 rounded-lg border border-border bg-card active:bg-[#00B030] active:text-white"
      style={styles.cardWidth}
      onPress={handlePress}
    >
      {({ pressed }) => (
        <>
          <Image source={bikeImage} className="w-40 h-40 mb-2" />
          <Text
            className={`font-bold text-xl ${
              pressed ? "text-white" : "text-text"
            }`}
          >
            {item.placa}
          </Text>
          <Text className={`${pressed ? "text-white/80" : "text-[#8e8e8e]"}`}>
            {item.chassi}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWidth: {
    width: IMAGE_WIDTH / 2.18,
  },
});
