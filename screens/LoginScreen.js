// screens/LoginScreen.js
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Placeholder login logic
    if (studentId.trim() === '' || password.trim() === '') {
      setError('Оюутны дугаар болон нууц үг оруулна уу!');
      return;
    }
    
    // For demo purposes, we'll just allow any login
    navigation.navigate('Home', { studentId: studentId });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appTitle}>Оюутны ирц бүртгэлийн систем</Text>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.loginHeader}>Нэвтрэх</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Оюутны дугаар</Text>
          <TextInput
            style={styles.input}
            placeholder="Оюутны ID"
            value={studentId}
            onChangeText={setStudentId}
            keyboardType="default"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Нууц үг</Text>
          <TextInput
            style={styles.input}
            placeholder="Нууц үг"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Нэвтрэх</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Нууц үгээ мартсан?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '40%',
    backgroundColor: '#822321',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo:{
    width: 250,
    height: 50,
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#822321',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loginHeader: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    color: '#444',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  errorText: {
    color: '#dc3545',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#822321',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    marginTop: 16,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#822321',
    fontSize: 15,
    fontWeight: '500',
  },
});