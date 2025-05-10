import { FlatList } from 'react-native';
import { NotificationItem } from '../notification-item';

const notifcationsData: any[] = [
    {
        id: '1',
        icon: 'alert-triangle',
        title: 'Superlotação',
        type: 'alert',
        advice: 'A zona B esta cheia.',
        date: 'Hoje - 14:40'
    },
    {
        id: '2',
        icon: 'info',
        type: 'info',
        title: 'ABC4321',
        advice: 'A moto saiu do pátio.',
        date: 'Hoje - 10:24'
    },
    {
        id: '3',
        icon: 'info',
        type: 'info',
        title: 'ABC1234',
        advice: 'A moto entrou no pátio.',
        date: 'Ontem - 20:02'
    },
];

export function Notificationlist() {
 return (
    <FlatList 
        className='mt-8 max-w-full'
        data={notifcationsData}
        renderItem={({ item }) => <NotificationItem title={item.title} advice={item.advice} date={item.date} icon={item.icon} />}
    >

    </FlatList>
  );
}