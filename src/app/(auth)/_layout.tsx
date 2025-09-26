import { useAuth } from '@/src/context/AuthContext';
import '../../styles/global.css';
import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator } from 'react-native';

export default function AuthLayout() {
  const  { usuario, loading } = useAuth();

  if (usuario) {
    return <Redirect href="/(tabs)" />;
  }

  if(loading) {
    return <ActivityIndicator size='large' className='flex-1 justify-center items-center' />
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
