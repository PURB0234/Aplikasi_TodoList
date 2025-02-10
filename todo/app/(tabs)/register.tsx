import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { db } from '@/service/firebaseConfig'
import styles from '@/style/signUp_style';

// const db = getFirestore();

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Input Error', 'Harap isi semua kolom.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Harap masukkan alamat email yang valid.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password tidak cocok', 'Password dan konfirmasi password tidak sama.');
      return;
    }

    try {
      const userQuery = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        Alert.alert('Error', 'Email sudah terdaftar.');
        return;
      }

      await addDoc(collection(db, 'users'), { email, password, role: 'user', timestamp: new Date() });
      Alert.alert('Success', 'Registrasi berhasil! Silakan login.');
      router.push('/(tabs)/login_form');
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Failed to register.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.vInput}>
          <TextInput style={{ flex: 1 }} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Ionicons name="person" size={17} color="black" style={{ padding: 10 }} />
        </View>
        <View style={styles.vInput}>
          <TextInput style={{ flex: 1 }} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 10 }}>
            <Ionicons name={showPassword? 'eye' : 'eye-off'} size={17} color={'#00000'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.vInput}>
          <TextInput style={{ flex: 1 }} placeholder="Konfirmasi Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showPassword} />
          {/* <TouchableOpacity style={{ padding: 10 }}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={17} color={'#00000'}/>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.switchContainer}>
          <Text style={{ fontSize: 14 }}>Sudah punya akun?</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/login_form')}>
            <Text style={styles.switchText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
