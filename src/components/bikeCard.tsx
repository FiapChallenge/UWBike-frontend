import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, Text, Image, View } from "react-native";

type BikeCardProps = {
  id: number;
  modelo: string
  placa: string,
  chassi: string,
  anoFabricacao: number,
  mode?: "edit" | "view";
};

export default function BikeCard({mode = "edit",...item}: BikeCardProps) {
    const{t} = useTranslation();

    const getBikeImage = () => {
        switch (item.modelo) {
        case 'Mottu-E':
            return require('../../assets/images/mottue.png');
        case 'Mottu Sport':
            return require('../../assets/images/mottusport.png');
        case 'Mottu-Pop':
            return require('../../assets/images/mottupop.png');
        }
    }   

    const bikeImage = getBikeImage();

    const handlePress = () => {
        if (mode === "view") {
        router.push({ pathname: "/location", params: { id: item.id.toString() } });
        } else {
        router.push({ pathname: "/editBike", params: { id: item.id.toString() } });
        }
    };

    return(
        <TouchableOpacity
            className="p-4 mb-2 rounded-lg border border-border flex-row justify-between bg-[#00B030]"
            onPress={handlePress}
        >   
            <View className="gap-2">
                <Text className="text-white">{t('manageBike.plate')}: {item.placa}</Text>
                <Text className="text-white">{item.modelo}</Text>
                <Text className="text-white">{t('manageBike.chassi')}: {item.chassi}</Text>
                <Text className="text-white">{t('manageBike.year')}: {item.anoFabricacao}</Text>
            </View>
            <Image 
                source={bikeImage} 
                className="w-24 h-24 mb-2" 
            />
        </TouchableOpacity>
    )
}