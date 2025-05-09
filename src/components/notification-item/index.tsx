import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';

export  function NotificationItem(props: any) {
 return (
   <View className='w-ful flex-row gap-4 mb-4 border-b border-zinc-800 pb-4'>
        <View className='w-12 h-12 items-center justify-center bg-zinc-800 rounded-full'>
            <Feather name={props.type} size={18} color="white"/>
        </View>
        <View className='gap-2'>
            <Text className='text-white font-bold text-lg'>{props.plate}</Text>
            <Text className='text-zinc-400'>{props.advice}</Text>
            <Text className='text-zinc-400'>{props.date}</Text>
        </View>
   </View>
  );
}