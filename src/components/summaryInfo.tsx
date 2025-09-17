import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text } from "react-native";

type SummaryInfoProps = {
  icon: string;
  info: string;
  description: string;
};

export default function SummaryInfo({ icon, info, description }: SummaryInfoProps) {
    return (
        <View className="bg-[#00B030] p-4 rounded-xl flex-1 gap-1">
            <FontAwesome5 name={icon} size={32} color="#fff" />
            <Text className="text-white font-bold text-2xl mt-2">{info}</Text>
            <Text className="text-white">{description}</Text>
        </View>
    )
}