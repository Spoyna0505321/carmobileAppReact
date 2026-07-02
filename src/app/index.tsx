import { router } from 'expo-router';
import * as SecureStore from "expo-secure-store";
export default async function HomeScreen() {
  const token = await SecureStore.getItemAsync("access");
  if (token){
    router.replace("/(tabs)/Home");
  }
  else{
    router.replace("/(auth)/login");
  }
}

