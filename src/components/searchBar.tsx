import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { View, TextInput } from 'react-native';

type Props = {
  searchTerm: string;
  onSearch: (text: string) => void;
};

export default function SearchBar({ searchTerm, onSearch }: Props) {
  const{t} = useTranslation();
  return (
    <View className='w-full flex-row gap-2 bg-card px-4 py-2 rounded-lg items-center border-border border'>
      <Feather name="search" size={18} color="#8e8e8e" />
      <TextInput
        placeholder={t('searchbar.title')}
        placeholderTextColor='#8e8e8e'
        className='flex-1 text-text'
        value={searchTerm}
        onChangeText={onSearch}
      />
    </View>
  );
}
