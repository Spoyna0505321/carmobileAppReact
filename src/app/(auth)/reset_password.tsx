import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomInput } from "../../components/CustomInput";

export default function ResetPasswordScreen() {
 
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const router = useRouter();

  const reset_password = async () => {
        if (!email.includes('@')){
          setEmailError('Please enter a valid email address');
          return;
        }
        setEmailError('');
       
          

        const response = await fetch("http://172.20.10.8:8080/api/reset_password/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
               
            }),
        });

        const data = await response.json();

        router.replace("/(auth)/login");  
          
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
       
        <View style={styles.buttonSpacing}>
          <Button title="Send Email" onPress={reset_password} color="#4F46E5" />
        </View>
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
