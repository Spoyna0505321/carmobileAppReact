import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeContext';

export default function LogInScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const router = useRouter();

  const login = async () => {
    const controller = new AbortController();
    let valid = true;
    setEmailError("");
    setpasswordError("");

    if (email.trim() == "") {
      setEmailError(t("emailRequired"));
      valid = false;
    } else if (!email.includes('@')) {
      setEmailError(t("invalidEmail"));
      return;
    }

    if (!valid) return;

    if (password.trim() == "") {
      setpasswordError(t("passwordRequired"));
      valid = false;
    }

    if (!valid) return;

    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000);

    try {
      const response = await fetch("http://192.168.1.138:8080/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      const data = await response.json();

      if (!response.ok) {
        switch (response.status) {
          case 401:
            setpasswordError(t("wrongCredentials"));
            break;
          case 400:
            setpasswordError(t("invalidRequest"));
            break;
          case 500:
            setpasswordError(t("serverError"));
            break;
          default:
            setpasswordError(t("somethingWrong"));
        }
        return;
      }

      await SecureStore.setItemAsync("access", data.access);
      await SecureStore.setItemAsync("refresh", data.refresh);
      router.replace("/(tabs)/Home");

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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.mainContainer}>

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
          {t("loginTitle")}
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

        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.cardBackground, borderColor: theme.borderColor }]}
          onChangeText={setPassword}
          placeholder={t("password")}
          placeholderTextColor={theme.subText}
          secureTextEntry
          autoCapitalize="none"
        />
        {passwordError ? <ThemedText style={styles.error}>{passwordError}</ThemedText> : null}

        <TouchableOpacity activeOpacity={0.8} onPress={login} style={styles.buttonWrapper}>
          <LinearGradient
            style={styles.gradientButton}
            colors={['#3C80F7', '#1058D1']}
          >
            <ThemedText style={styles.buttonText}>
              {t("login")}
            </ThemedText>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <ThemedText style={{ color: theme.subText, textAlign: 'center' }}>
            {t("noAccount")}{" "}
            <Link style={styles.linkHighlight} href="/(auth)/register">
              {t("signup")}
            </Link>
          </ThemedText>
        </View>

        <View style={styles.linkContainer}>
          <ThemedText style={{ color: theme.subText, textAlign: 'center' }}>
            {t("forgotPassword")}{" "}
            <Link style={styles.linkHighlight} href="/(auth)/reset_password">
              {t("resetNow")}
            </Link>
          </ThemedText>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: 40,
    justifyContent: 'center',
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
    maxWidth: 250,
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
