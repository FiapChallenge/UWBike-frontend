import { Feather } from '@expo/vector-icons';
import { View, TextInput } from 'react-native';

type Props = {
  searchTerm: string;
  onSearch: (text: string) => void;
};

export function SearchBar({ searchTerm, onSearch }: Props) {
  return (
    <View className='w-full flex-row gap-2 bg-zinc-800 px-4 rounded-lg items-center'>
      <Feather name="search" size={18} color="#8e8e8e" />
      <TextInput
        placeholder='Pesquisar por placa ou chassi'
        placeholderTextColor='#8e8e8e'
        className='flex-1 text-white'
        value={searchTerm}
        onChangeText={onSearch}
      />
    </View>
  );
}
