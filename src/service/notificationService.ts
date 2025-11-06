import * as Notifications from 'expo-notifications';
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function pedirPermissaoNotificacoes() {
  if (!Device.isDevice) return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

export async function notificarMotoAdicionada(modelo: string, placa: string, patio: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "✅ Nova moto adicionada",
      body: `${modelo} - ${placa} foi adicionada ao pátio ${patio}`,
      sound: true,
    },
    trigger: null,
  });
}
export async function notificarMotoEditada(modelo: string, placa: string, patio: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "✅ Moto editada",
      body: `${modelo} - ${placa} foi editada no pátio ${patio}`,
      sound: true,
    },
    trigger: null,
  });
}