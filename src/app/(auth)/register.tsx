import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomInput } from "../../components/CustomInput";

export default function RegisterScreen() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');

  const register = async () => {
        if (!email.includes('@')){
          setEmailError('Please enter a valid email address');
          return;
        }
        setEmailError('');
        Alert.alert('Logged In!', `Email: ${email}`)
          

        const response = await fetch("http://172.20.10.8:8080/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                name,
            }),
        });

        const data = await response.json();

        console.log(data);
    };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.formContainer}>
        <CustomInput
          label="name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          secureTextEntry={false}
        />
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
          <Button title="Submit" onPress={register} color="#4F46E5" />
        </View>
        <ThemedView style={styles.titleContainer}>
          <Link href="/(auth)/login">
                <ThemedText>Have an account? Login now!</ThemedText>
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
