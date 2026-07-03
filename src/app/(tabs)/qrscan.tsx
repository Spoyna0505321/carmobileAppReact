import { Feather } from '@expo/vector-icons';
import { BarcodeType, CameraView } from "expo-camera";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from 'react';
import { Alert, Dimensions, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');

const SCANNER_SETTINGS = {
  barcodeTypes: ["qr"] as BarcodeType[],
};



export default function QrScan() {
    const [userError,setuserError] = useState("");
    const [scanned, setScanned] = useState(false);
    const carupdate = async (carModel: string) => {
        
    const token = await SecureStore.getItemAsync("access");
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000);
    try{
        const response = await fetch(
        "http://192.168.1.138:8080/api/car/",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                token:token,
                car_model: carModel,
            }),
            signal: controller.signal 
        }
    );
    clearTimeout(timeout);
     if (!response.ok) {
        switch (response.status) {
          case 401:
            setuserError("User session expired");
            router.replace("/(auth)/login");
            break;

          case 500:
            setuserError("Server error. Please try again later.");
            router.replace("/(tabs)/Home");
            break;

          default:
            setuserError("Something went wrong.");
            router.replace("/(tabs)/Home");
            break;
        }
        
        return;
      } 
      const data = await response.json();
      router.replace('/(tabs)/Home');
        
    }catch (error: any) {
          setScanned(false);
          clearTimeout(timeout);
          if (error.name === "AbortError") {
            Alert.alert("Request Timeout", "The server did not respond. Please try again.");
          } else {
            Alert.alert("Connection Error", "An unexpected error occurred.");
          }
        } 
  };
  return (
    <View style={styles.container}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}


      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={SCANNER_SETTINGS}
        onBarcodeScanned={scanned
        ? undefined
        : ({ data }) => {
            setScanned(true);
            carupdate(data);
        }}
      />

 
      <View style={styles.overlayContainer}>
       
        <SafeAreaView style={styles.topBar}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => router.back()}
          >
            <Feather name="x" size={24} color="#FFF" />
          </TouchableOpacity>
        </SafeAreaView>

  
        <View style={styles.middleRow}>
          <View style={styles.scannerBox}>
          
            <View style={[styles.corner, styles.topLeft]} />
       
            <View style={[styles.corner, styles.topRight]} />
           
            <View style={[styles.corner, styles.bottomLeft]} />
           
            <View style={[styles.corner, styles.bottomRight]} />
            
    
            <View style={styles.scanLine} />
          </View>
        </View>

     
        <View style={styles.bottomSection}>
          <Text style={styles.infoText}>Araca Bağlanmak İçin</Text>
          <Text style={styles.subInfoText}>Konsoldaki QR kodu karenin içine hizalayın.</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.4)', 
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerBox: {
    width: width * 0.65, 
    height: width * 0.65,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#34C759', 
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  scanLine: {
    width: '90%',
    height: 2,
    backgroundColor: 'rgba(52, 199, 89, 0.4)',
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 60,
    paddingHorizontal: 40,
  },
  infoText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subInfoText: {
    color: '#CCCCCC',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
