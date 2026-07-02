import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View
} from 'react-native';

// Extend the native properties so this template supports all default TextInput configurations
interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  icon,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={styles.container}>
      {/* Input Label */}
      <Text style={[styles.label, isFocused && styles.labelFocused]}>
        {label}
      </Text>

      {/* Input Wrapper for Field + Optional Icons */}
      <View 
        style={[
          styles.inputContainer, 
          isFocused && styles.inputContainerFocused,
          error ? styles.inputContainerError : null
        ]}
      >
        {/* Leading Icon (if provided) */}
        {icon && <View style={styles.iconLeft}>{icon}</View>}

        {/* Core Text Input */}
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
         
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Trailing Password Visibility Toggle */}
        {secureTextEntry && (
          <TouchableOpacity 
            style={styles.iconRight} 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Text style={styles.toggleText}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message Footer */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 6,
  },
  labelFocused: {
    color: '#4F46E5', // Indigo color on focus
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    height: 48,
  },
  inputContainerFocused: {
    borderColor: '#4F46E5',
    backgroundColor: '#FFFFFF',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, // Shadow for Android devices
  },
  inputContainerError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  input: {
    flex: 1,
    color: '#1E293B',
    fontSize: 16,
    height: '100%',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  toggleText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
});
