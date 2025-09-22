import { ThemeProvider } from '../context/ThemeProvider';
import '../styles/global.css';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false}} />
        <Stack.Screen name="manageBike" options={{ headerShown: false}} />
      </Stack>
    </ThemeProvider>
  );
}
