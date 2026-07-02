import { ThemedText } from '@/components/themed-text';
import { useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Explore() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);
  return (
    <SafeAreaView style={styleSheet.container}>
      <StatusBar style="auto" />

      <ThemedText style={styleSheet.mainText}>Expo QR Code Scanner</ThemedText>

      <Pressable style={[styleSheet.mainBtn, styleSheet.btnGreen]} onPress={requestPermission}>
        <ThemedText>Request Permission</ThemedText>
      </Pressable>

      <Pressable onPress={
        () => {
          router.replace("../qrscan");
        }
      } style={[styleSheet.mainBtn, styleSheet.btnYellow, { opacity: isPermissionGranted ? 1 : 0.5 }]} disabled={!isPermissionGranted} >
        <ThemedText>Scan Code</ThemedText>
      </Pressable>

    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20
  },
  mainBtn: {
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnGreen: {
    backgroundColor: "#0BCD4C",
  },
  btnYellow: {
    backgroundColor: "yellow",
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
