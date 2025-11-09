import * as Notifications from 'expo-notifications';
import * as Device from "expo-device";
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function pedirPermissaoNotificacoes(): Promise<boolean> {
  try{
    console.log("Device.isDevice:", Device.isDevice);
    if (!Device.isDevice) {
			console.warn("Notificações só funcionam em dispositivos físicos");
			return false;
		}
  
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
  
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
  
    if (finalStatus !== "granted") {
			console.warn("Permissão de notificação negada");
			return false;
		}
    if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("tasks", {
				name: "Lembretes de Tarefas",
				importance: Notifications.AndroidImportance.HIGH,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#00B030",
				sound: "default",
			});
		}

    return true;
  }catch(e){
    console.error("Erro ao configurar notificação:", e);
    return false;
  }
}

export async function notificarMotoAdicionada(modelo: string, placa: string, patio: string): Promise<void> {
  try{
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "✅ Nova moto adicionada",
        body: `${modelo} - ${placa} foi adicionada ao pátio ${patio}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        ...(Platform.OS === "android" && {
          channelId: "default",
        }),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1,
        repeats: false,
      },
    });
  }catch(e){
    console.error("Erro ao notificar moto adicionada:", e);
  }
}
export async function notificarMotoEditada(modelo: string, placa: string, patio: string) : Promise<void> {
  try{
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "✏️ Moto editada",
        body: `${modelo} - ${placa} foi editada no pátio ${patio}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        ...(Platform.OS === "android" && {
          channelId: "default",
        }),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1,
        repeats: false,
      },
    });
  }catch(e){
    console.error("Erro ao notificar moto editada:", e);
  }
}