import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/src/context/ThemeProvider";
import { Feather } from "@expo/vector-icons";

const notificationsData = [
  {
    id: "1",
    icon: "alert-triangle",
    title: "Superlotação",
    type: "alert",
    advice: "A zona B está cheia.",
    date: "Hoje - 14:40",
  },
  {
    id: "2",
    icon: "info",
    type: "info",
    title: "ABC4321",
    advice: "A moto saiu do pátio.",
    date: "Hoje - 10:24",
  },
  {
    id: "3",
    icon: "info",
    type: "info",
    title: "ABC1234",
    advice: "A moto entrou no pátio.",
    date: "Ontem - 20:02",
  },
];

const FILTER_KEY = "@notifications_filter";

export function Notificationlist() {
  const [filter, setFilter] = useState<"all" | "alert" | "info">("all");

  // Carregar filtro salvo
  useEffect(() => {
    const loadFilter = async () => {
      const savedFilter = await AsyncStorage.getItem(FILTER_KEY);
      if (
        savedFilter === "info" ||
        savedFilter === "alert" ||
        savedFilter === "all"
      ) {
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
    filter === "all"
      ? notificationsData
      : notificationsData.filter((item) => item.type === filter);

  return (
    <View className="mt-8 w-full">
      <View className="flex-row justify-between mb-8 px-2">
        <TouchableOpacity
          onPress={() => setFilter("all")}
          className={`px-4 py-2 rounded-full ${
            filter === "all" ? "bg-[#00B030]" : 'bg-card border-border border'
          }`}
        >
          <Text
            className={`${filter === "all" ? "text-white" : 'text-text'}`}
          >
            Todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("info")}
          className={`px-4 py-2 rounded-full ${
            filter === "info" ? "bg-[#00B030]" : 'bg-card border-border border'
          }`}
        >
          <Text
            className={`${filter === "info" ? "text-white" : 'text-text'}`}
          >
            Informações
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("alert")}
          className={`px-4 py-2 rounded-full ${
            filter === "alert" ? "bg-[#00B030]" : 'bg-card border-border border'
          }`}
        >
          <Text
            className={`${
              filter === "alert" ? "text-white" : 'text-text'
            }`}
          >
            Alertas
          </Text>
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
          <Text className="text-center text-secondary mt-8">
            Nenhuma notificação encontrada.
          </Text>
        }
      />
    </View>
  );
}

export  function NotificationItem(props: any) {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "#fff" : "#000";


 return (
   <View className='w-ful flex-row gap-4 mb-4 border-b border-border pb-4'>
        <View className='w-12 h-12 items-center justify-center bg-card rounded-full'>
            <Feather name={props.icon} size={18} color={iconColor}/>
        </View>
        <View className='flex-1 gap-2'>
            <Text className='text-text font-bold text-lg'>{props.title}</Text>
            <Text className='text-secondary'>{props.advice}</Text>
            <Text className='text-secondary'>{props.date}</Text>
        </View>
   </View>
  );
}