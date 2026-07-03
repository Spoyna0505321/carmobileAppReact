import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../ThemeContext';

SplashScreen.preventAutoHideAsync();
export default function TabLayout() {
  const [loaded, setLoaded] = useState(false);
  const { theme, isDarkMode } = useTheme();
  useEffect(() => {
    async function prepare() {
    
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoaded(true);
    }

    prepare();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#FFFFFF' : '#3C80F7',
        tabBarInactiveTintColor: isDarkMode ? '#8E8E93' : '#70757A',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: theme.cardBackground,
          borderTopColor: theme.borderColor,
          height: 60,
          paddingBottom: 8,
        },
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Keşfet',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="paperplane.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="qrscan"
        options={{
          title: "",
          tabBarIcon: () => (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: isDarkMode ? '#34C759' : '#3C80F7',
                justifyContent: "center",
                alignItems: "center",
                marginTop: -24,
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
              }}
            >
              <Ionicons
                name="qr-code"
                size={28}
                color="white"
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="person.fill" color={color} />,
        }}
      />
      
      <Tabs.Screen 
        name='about'
        options={{
          title: 'Hakkında',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="info.bubble.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
