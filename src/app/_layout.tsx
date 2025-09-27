import { AuthProvider } from '../context/AuthContext';
import { PatioProvider } from '../context/PatioContext';
import { ThemeProvider } from '../context/ThemeProvider';
import '../styles/global.css';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PatioProvider>
          <Stack >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="notifications" options={{ headerShown: false}} />
            <Stack.Screen name="manageBike" options={{ headerShown: false}} />
            <Stack.Screen name="changePassword" options={{ headerShown: false}} />
          </Stack>
        </PatioProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
