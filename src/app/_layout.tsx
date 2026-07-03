import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../locales/i18n";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from './ThemeContext';
export const unstable_settings = {
  anchor: '(tabs)',
};
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <LanguageProvider>
    <ThemeProvider >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name = "+not-found" options={{headerShown:false}}/>

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </LanguageProvider>
  );
}
