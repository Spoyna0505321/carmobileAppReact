import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '../ThemeContext';
const { width } = Dimensions.get('window');

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [isLightsOn, setIsLightsOn] = useState(false);
  const [isClimateOn, setIsClimateOn] = useState(false);
  const { theme, isDarkMode } = useTheme();
  const [carname,setcarname]= useState("");
  const { t } = useTranslation();
  const slideAnim = useRef(new Animated.Value(width)).current; 
    const loadProfile = async () => {
      const controller = new AbortController();
        const timeout = setTimeout(() => {
          controller.abort();
        }, 10000);
      const token = await SecureStore.getItemAsync("access");
      try{
        const response = await fetch(
          "http://192.168.1.138:8080/api/profile/",
          {
              method: "POST",
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );
      if (!response.ok) {
          switch (response.status) {
            case 401:
              Alert.alert("User session expired");
              router.replace("/(auth)/login");
              break;
  
            case 500:
              Alert.alert("Server error. Please try again later.");
              break;
  
            default:
              Alert.alert("Something went wrong.");
          }
  
          return;
        } 
          const data = await response.json();
          console.log(response.status);
          console.log(data);
          setcarname(data.car_model)
  
      }catch (error: any) {
            clearTimeout(timeout);
            if (error.name === "AbortError") {
              Alert.alert("Request Timeout", "The server did not respond. Please try again.");
            } else {
              Alert.alert("Connection Error", "An unexpected error occurred.");
            }
          }
  
      
    };
  const onRefresh = async () => {
    setRefreshing(true);

    await loadProfile();

    setRefreshing(false);
  };
   
  
  useEffect(() => {
    loadProfile();
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.scrollContent}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#3C80F7"
    />
  }>
        
       
        <View style={styles.header}>
          <View>
            <Text style={[styles.brandText, { color: theme.subText }]}>{carname}</Text>
            <Text style={[styles.statusText, { color: '#34C759' }]}>
             {isLocked ? t("locked") : t("unlocked")}
            </Text>
          </View>
        
        </View>

       
        <View style={styles.carSection}>
          <Animated.View style={{ transform: [{ translateX: slideAnim }], width: '100%', alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/Car.png')}
              style={styles.carImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

      
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <View style={styles.statRow}>
              <Feather name="battery" size={24} color="#34C759" style={{ marginRight: 6 }} />
              <Text style={[styles.statValue, { color: theme.text }]}>%84</Text>
            </View>
            <Text style={[styles.statLabel, { color: theme.subText }]}>{t("battery")}</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.borderColor }]} />

          <View style={styles.statBox}>
            <View style={styles.statRow}>
              <Feather name="zap" size={22} color="#FBBC04" style={{ marginRight: 6 }} />
              <Text style={[styles.statValue, { color: theme.text }]}>385 km</Text>
            </View>
            <Text style={[styles.statLabel, { color: theme.subText }]}>{t("range")}</Text>
          </View>
        </View>

        
        <Text style={[styles.sectionTitle, { color: theme.subText }]}>{t("quickControls")}</Text>
        
        <View style={styles.controlsGrid}>
          
         
          <TouchableOpacity 
            style={[styles.controlCard, { backgroundColor: theme.cardBackground }]}
            onPress={() => setIsLocked(!isLocked)}
          >
            <View style={[styles.iconWrapper, { backgroundColor: isLocked ? '#2C2C2E' : '#1A73E8' }]}>
              <Feather name={isLocked ? "lock" : "unlock"} size={22} color="#FFF" />
            </View>
            <Text style={[styles.controlLabel, { color: theme.text }]}>
               {isLocked ? t("openDoors") : t("closeDoors")}
            </Text>
          </TouchableOpacity>

          
          <TouchableOpacity 
            style={[styles.controlCard, { backgroundColor: theme.cardBackground }]}
            onPress={() => setIsLightsOn(!isLightsOn)}
          >
            <View style={[styles.iconWrapper, { backgroundColor: isLightsOn ? '#FBBC04' : '#2C2C2E' }]}>
              <Feather name="sun" size={22} color="#FFF" />
            </View>
            <Text style={[styles.controlLabel, { color: theme.text }]}>
              {isLightsOn ? t("turnLightsOff") : t("turnLightsOn")}
            </Text>
          </TouchableOpacity>

        
          <TouchableOpacity 
            style={[styles.controlCard, { backgroundColor: theme.cardBackground }]}
            onPress={() => setIsClimateOn(!isClimateOn)}
          >
            <View style={[styles.iconWrapper, { backgroundColor: isClimateOn ? '#00C7BE' : '#2C2C2E' }]}>
              <Feather name="wind" size={22} color="#FFF" />
            </View>
            <Text style={[styles.controlLabel, { color: theme.text }]}>
              {isClimateOn ? t("turnClimateOff") : t("turnClimateOn")}
            </Text>
          </TouchableOpacity>

         
          <TouchableOpacity style={[styles.controlCard, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.iconWrapper, { backgroundColor: '#2C2C2E' }]}>
              <Feather name="map-pin" size={22} color="#FFF" />
            </View>
            <Text style={[styles.controlLabel, { color: theme.text }]}>{t("findCar")}</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


const lightTheme = {
  background: '#F8F9FA',
  cardBackground: '#FFF',
  text: '#1A1A1A',
  subText: '#70757A',
  borderColor: '#E5E5EA',
};

const darkTheme = {
  background: '#0A0A0C',
  cardBackground: '#16161A',
  text: '#FFFFFF',
  subText: '#8E8E93',
  borderColor: '#242429',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  brandText: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  carSection: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  carImage: {
    width: width * 0.85,
    height: 160,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 10,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 26,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 40,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginLeft: 24,
    marginTop: 30,
    marginBottom: 16,
  },
  controlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  controlCard: {
    width: '46%',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: '2%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
