import { useTheme } from '@/src/context/ThemeProvider';
import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';

export  function NotificationItem(props: any) {
  const {colors} = useTheme();

 return (
   <View className={`w-ful flex-row gap-4 mb-4 border-b ${colors.border} pb-4`}>
        <View className={`w-12 h-12 items-center justify-center ${colors.card} rounded-full`}>
            <Feather name={props.icon} size={18} color={colors.icons}/>
        </View>
        <View className='flex-1 gap-2'>
            <Text className={`${colors.text } font-bold text-lg`}>{props.title}</Text>
            <Text className='text-zinc-500'>{props.advice}</Text>
            <Text className='text-zinc-500'>{props.date}</Text>
        </View>
   </View>
  );
}