import { Feather } from '@expo/vector-icons';
import { View, TextInput } from 'react-native';

export  function SearchBar() {
 return (
   <View className='w-ful flex-row gap-4 bg-zinc-800 p-4 rounded-lg items-center'>
        <Feather name="search" size={18} color="#8e8e8e"/>
        <TextInput placeholder='Pesquisar' placeholderTextColor='#8e8e8e' className='gap-2 flex-1 text-white' />
   </View>
  );
}