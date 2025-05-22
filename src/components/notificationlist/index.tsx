import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationItem } from '../notification-item';

const notificationsData = [
  {
    id: '1',
    icon: 'alert-triangle',
    title: 'Superlotação',
    type: 'alert',
    advice: 'A zona B está cheia.',
    date: 'Hoje - 14:40',
  },
  {
    id: '2',
    icon: 'info',
    type: 'info',
    title: 'ABC4321',
    advice: 'A moto saiu do pátio.',
    date: 'Hoje - 10:24',
  },
  {
    id: '3',
    icon: 'info',
    type: 'info',
    title: 'ABC1234',
    advice: 'A moto entrou no pátio.',
    date: 'Ontem - 20:02',
  },
];

const FILTER_KEY = '@notifications_filter';

export function Notificationlist() {
  const [filter, setFilter] = useState<'all' | 'alert' | 'info'>('all');

  // Carregar filtro salvo
  useEffect(() => {
    const loadFilter = async () => {
      const savedFilter = await AsyncStorage.getItem(FILTER_KEY);
      if (savedFilter === 'info' || savedFilter === 'alert' || savedFilter === 'all') {
        setFilter(savedFilter);
      }
    };
    loadFilter();
  }, []);

  // Salvar filtro sempre que mudar
  useEffect(() => {
    AsyncStorage.setItem(FILTER_KEY, filter);
  }, [filter]);

  const filteredData =
    filter === 'all'
      ? notificationsData
      : notificationsData.filter((item) => item.type === filter);

  return (
    <View className="mt-8 w-full">
      <View className="flex-row justify-between mb-8 px-2">
        <TouchableOpacity
          onPress={() => setFilter('all')}
          className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-[#00B030]' : 'bg-zinc-700'}`}
        >
          <Text className="text-white">Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter('info')}
          className={`px-4 py-2 rounded-full ${filter === 'info' ? 'bg-[#00B030]' : 'bg-zinc-700'}`}
        >
          <Text className="text-white">Informações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter('alert')}
          className={`px-4 py-2 rounded-full ${filter === 'alert' ? 'bg-[#00B030]' : 'bg-zinc-700'}`}
        >
          <Text className="text-white">Alertas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            title={item.title}
            advice={item.advice}
            date={item.date}
            icon={item.icon}
          />
        )}
        ListEmptyComponent={
          <Text className="text-center text-zinc-400 mt-8">
            Nenhuma notificação encontrada.
          </Text>
        }
      />
    </View>
  );
}
