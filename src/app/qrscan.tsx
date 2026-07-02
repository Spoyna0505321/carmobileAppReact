import { BarcodeType, CameraView } from "expo-camera";
import { router } from "expo-router";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const SCANNER_SETTINGS = {
  barcodeTypes: ["qr"] as BarcodeType[],
};
export default function qrScan() {

    return (
        <SafeAreaView style={styleSheet.container}>

            {Platform.OS === "android" ? <StatusBar hidden /> : null}

            <CameraView
                style={styleSheet.camStyle}
                facing="back"
                barcodeScannerSettings={SCANNER_SETTINGS}

                onBarcodeScanned={
                    ({ data }) => {
                        console.log(data); 
                        router.replace("/(tabs)/Home")
                    }
                }
            />

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
    camStyle: {
        position: 'absolute',
        width: 300,
        height: 300
    }
});