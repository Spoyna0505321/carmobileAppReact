import { ThemedText } from '@/components/themed-text';
import { Asset } from 'expo-asset';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, SplashScreen, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeContext';
SplashScreen.preventAutoHideAsync();
export default function ResetPasswordScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');

  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
    useEffect(() => {
      async function prepare() {
        try {
          await Asset.loadAsync([
            require("../../assets/images/loginBg.png"),
            require("../../assets/images/Car2.png"),
          ]);
        } catch (e) {
          console.warn(e);
        } finally {
          setIsReady(true);
        }
      }
  
      prepare();
    }, []);
      useEffect(() => {
      if (isReady) {
        SplashScreen.hide();
      }
    }, [isReady]);
  
    if (!isReady) {
      return null;
    }

  const reset_password = async () => {
    const controller = new AbortController();
    let valid = true;

    setEmailError('');

    if (email.trim() == "") {
      setEmailError(t("emailRequired"));
      valid = false;
    } else if (!email.includes('@')) {
      setEmailError(t("invalidEmail"));
      return;
    }

    if (!valid) return;

    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000);

    try {
      const response = await fetch("http://192.168.1.138:8080/api/reset_password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        switch (response.status) {
          case 404:
            setEmailError(t("userNotFound"));
            break;
          case 500:
            setEmailError(t("serverError"));
            break;
          default:
            setEmailError(t("somethingWrong"));
        }
        return;
      }

      Alert.alert(
        t("success"),
        t("resetEmailSent"),
        [
          { text: "OK", onPress: () => router.replace("/(auth)/login") }
        ]
      );

    } catch (error: any) {
      clearTimeout(timeout);

      if (error.name === "AbortError") {
        Alert.alert(t("timeoutTitle"), t("timeoutMessage"));
      } else {
        Alert.alert(t("errorTitle"), t("connectionError"));
      }
    }
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.MainContainer}>

          <Image
            style={styles.backgroundImage}
            source={require('../../assets/images/loginBg.png')}
          />

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/Car2.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <ThemedText style={[styles.title, { color: theme.text }]}>
            {t("resetPasswordTitle")}
          </ThemedText>

          <TextInput
            style={[styles.input, { color: theme.text, backgroundColor: theme.cardBackground, borderColor: theme.borderColor }]}
            onChangeText={setEmail}
            placeholder={t("email")}
            placeholderTextColor={theme.subText}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {emailError ? <ThemedText style={styles.error}>{emailError}</ThemedText> : null}

          <TouchableOpacity activeOpacity={0.8} onPress={reset_password} style={styles.buttonWrapper}>
            <LinearGradient
              style={styles.gradientButton}
              colors={['#3C80F7', '#1058D1']}
            >
              <ThemedText style={styles.buttonText}>
                {t("sendEmail")}
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.linkContainer}>
            <ThemedText style={{ color: theme.subText, textAlign: 'center' }}>
              {t("backTo")}{" "}
              <Link style={styles.linkHighlight} href="/(auth)/login">
                {t("login")}
              </Link>
            </ThemedText>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  logoContainer: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  logo: {
    width: '100%',     
    height: '100%', 
    alignSelf: 'flex-start',
  
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: 40,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: 293,
    height: 301,
    top: 0,
    right: 0,
    opacity: 0.7,
  },
  
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 40,
    lineHeight: 40,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 10,
    marginBottom: 24,
  },
  gradientButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkContainer: {
    marginVertical: 8,
    justifyContent: 'center',
  },
  linkHighlight: {
    color: '#3C80F7',
    fontWeight: '600',
  },
  error: {
    color: "#FF3B30",
    fontSize: 13,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});
