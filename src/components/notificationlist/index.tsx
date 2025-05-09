import { FlatList } from 'react-native';
import { NotificationItem } from '../notification-item';

const notifcationsData: any[] = [
    {
        plate: 'ABC1234',
        advice: 'A moto entrou na oficina',
        date: 'Hoje - 20:19',
        type: 'tool'
    },
    {
        plate: 'ABC4321',
        advice: 'A moto estava fora de uma alguma zona',
        date: 'Hoje - 20:02',
        type: 'alert-octagon'
    }
    
];

export function Notificationlist() {
 return (
    <FlatList 
        className='mt-8'
        data={notifcationsData}
        renderItem={({ item }) => <NotificationItem plate={item.plate} advice={item.advice} date={item.date} type={item.type} />}
    >

    </FlatList>
  );
}