import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import { useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomInput } from "../../components/CustomInput";

export default function logInScreen() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const router = useRouter();

  const login = async () => {
        if (!email.includes('@')){
          setEmailError('Please enter a valid email address');
          return;
        }
        setEmailError('');
        Alert.alert('Logged In!', `Email: ${email}`)
          

        const response = await fetch("http://172.20.10.8:8080/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();
        if (data != "No active account found with the given credentials")
        {
          await SecureStore.setItemAsync("access", data.access);
          await SecureStore.setItemAsync("refresh", data.refresh);
          router.replace("/(tabs)/Home");
        }
          
          
        console.log(data);
    };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.formContainer}>
        <CustomInput
          label="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          secureTextEntry={false}
        />
       

        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
        />

        <View style={styles.buttonSpacing}>
          <Button title="Submit" onPress={login} color="#4F46E5" />
        </View>
        <ThemedView style={styles.titleContainer}>
          <Link href="/(auth)/register">
                <ThemedText>No account? Register now!</ThemedText>
          </Link>
                
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <Link href="/(auth)/reset_password">
                <ThemedText>Reset Password</ThemedText>
          </Link>
                
        </ThemedView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  buttonSpacing: {
    marginTop: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
