import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, Text, Image, View } from "react-native";

type BikeCardProps = {
  id: number;
  modelo: string
  placa: string,
  chassi: string,
  anoFabricacao: number
};

export default function BikeCard({...item}: BikeCardProps) {
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

    return(
        <TouchableOpacity
            className="p-4 mb-2 rounded-lg border border-border flex-row justify-between bg-[#00B030]"
            onPress={() => router.push(`/editBike?id=${item.id}`)}
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