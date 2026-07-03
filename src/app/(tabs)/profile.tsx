import { ThemedText } from '@/components/themed-text';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from "../LanguageContext";
import { useTheme } from '../ThemeContext';

export default  function Profile() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();


  const logout = async  () =>  {
    await SecureStore.deleteItemAsync("access");
    await SecureStore.deleteItemAsync("refresh");
    router.replace("/(auth)/login")
  }
 

const handleLanguagePress = () => {
  Alert.alert(
    "Language / Dil",
    "Bir dil seçin",
    [
      {
        text: "🇹🇷 Türkçe",
        onPress: () => changeLanguage("tr"),
      },
      {
        text: "🇺🇸 English",
        onPress: () => changeLanguage("en"),
      },
      {
        text: "İptal",
        style: "cancel",
      },
    ]
  );
};

  const controller = new AbortController();
  const [userError,setuserError] = useState("");
  const [user, setUser] = useState<any>(null);
  const { isDarkMode, setIsDarkMode, theme } = useTheme();
  const timeout = setTimeout(() => {
      controller.abort();
    }, 10000);

  
  const loadProfile = async () => {
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
            setuserError("User session expired");
            router.replace("/(auth)/login");
            break;

          case 500:
            setuserError("Server error. Please try again later.");
            break;

          default:
            setuserError("Something went wrong.");
        }

        return;
      } 
    

        const data = await response.json();
        console.log(response.status);
        console.log(data);
        setUser(data);

    }catch (error: any) {
          clearTimeout(timeout);
          if (error.name === "AbortError") {
            Alert.alert("Request Timeout", "The server did not respond. Please try again.");
          } else {
            Alert.alert("Connection Error", "An unexpected error occurred.");
          }
        }

    
  };
  //component ekrana geldikten sonra çalıştır
  useEffect(() => {
    loadProfile();
    }, []);
  

  if (!user) {
    return (
        <ThemedText>{t("loading")}</ThemedText>
    );
  }
  else{


  const handlePress = (settingName: string) => {
    Alert.alert('Navigation', `Link to ${settingName} screen clicked.`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      
        
    
        <View style={styles.header}>
          <ThemedText style={[styles.headerTitle, { color: theme.text }]}>{t("profile")}</ThemedText>
        </View>


        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://unsplash.com' }}
              style={styles.avatar}
            />
          </View>
          <ThemedText style={[styles.userName, { color: theme.text }]}>{user.name}</ThemedText>
          <ThemedText style={[styles.userEmail, { color: theme.subText }]}>{user.email}</ThemedText>
        </View>


        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          
      
          <View style={[styles.row, { borderBottomColor: theme.borderColor }]}>
            <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#3A3A3C' : '#F3E8FF' }]}>
              <Feather name={isDarkMode ? "moon" : "sun"} size={18} color={isDarkMode ? "#A855F7" : "#9333EA"} />
            </View>
            <ThemedText style={[styles.rowLabel, { color: theme.text }]}>
              {isDarkMode ? t("darkMode") : t("lightMode")}
            </ThemedText>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
              thumbColor="#FFF"
            />
          </View>

          {/* Dil Seçimi (Language) Satırı */}
          <TouchableOpacity style={styles.row} onPress={handleLanguagePress}>
            <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#2C3E35' : '#E8F8F5' }]}>
              <Feather name="globe" size={18} color="#118D7E" />
            </View>
            <ThemedText style={[styles.rowLabel, { color: theme.text }]}>{t("language")}</ThemedText>
            <View style={styles.rowValueContainer}>
              <ThemedText style={[styles.rowValueText, { color: theme.subText }]}>{language === "tr" ? "Türkçe" : "English"}</ThemedText>
              <Feather name="chevron-right" size={18} color={theme.subText} />
            </View>
          </TouchableOpacity>

        </View>

        {/* Çıkış Yap Butonu */}
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: theme.cardBackground, borderColor: isDarkMode ? '#48484A' : '#FAD2E1' }]} 
          onPress={logout}
        >
          <Feather name="log-out" size={18} color="#D93025" />
          <ThemedText style={styles.logoutButtonText}>{t("logout")}</ThemedText>
        </TouchableOpacity>

      
    </SafeAreaView>
  );
    

  }

  
}

const lightTheme = {
  background: '#F8F9FA',
  cardBackground: '#FFF',
  text: '#1A1A1A',
  subText: '#70757A',
  borderColor: '#F1F3F4',
};

const darkTheme = {
  background: '#121212',
  cardBackground: '#1C1C1E',
  text: '#FFFFFF',
  subText: '#8E8E93',
  borderColor: '#2C2C2E',
};

// Ortak Stil Tanımlamaları
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  userEmail: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  rowValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowValueText: {
    fontSize: 15,
    marginRight: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D93025',
    marginLeft: 8,
  },
});
