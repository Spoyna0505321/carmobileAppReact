import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { router } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Button, StyleSheet, View } from 'react-native';
export default  function Profile() {
  const logout = async  () =>  {
    await SecureStore.deleteItemAsync("access");
    await SecureStore.deleteItemAsync("refresh");
    router.replace("/(auth)/login")
  }
  
  const [user, setUser] = useState<any>(null);
  const loadProfile = async () => {
    const token = await SecureStore.getItemAsync("access");

    const response = await fetch(
        "http://172.20.10.8:8080/api/profile/",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

        const data = await response.json();
        console.log(response.status);
        console.log(data);
        setUser(data);
  };
  //component ekrana geldikten sonra çalıştır
  useEffect(() => {
    loadProfile();
    }, []);
  if (!user) {
    return (
        <ThemedText>Loading...</ThemedText>
    );
  }
  else{
    return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
     
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          {user.email}
    
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          {user.name}
    
        </ThemedText>
      </ThemedView>
      <View style={styles.buttonSpacing}>
                <Button title="Logout" onPress={logout} color="#4F46E5" />
      </View>
      
      
    </ParallaxScrollView>
  );

  }

  
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonSpacing: {
    marginTop: 12,
  },
});
