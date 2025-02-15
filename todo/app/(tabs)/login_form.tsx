import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '@/style/signIn_style';
import { loginControl } from '@/controllers/loginControl';

// const db = getFirestore();

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  // const handleSignIn = async () => {
  //   if (!email.trim() || !password.trim()) {
  //     Alert.alert('Input Error', 'Harap isi email dan password.');
  //     return;
  //   }

  //   if (!validateEmail(email)) {
  //     Alert.alert('Invalid Email', 'Harap masukkan alamat email yang valid.');
  //     return;
  //   }

  //   try {
  //     const userQuery = query(collection(db, 'users'), where('email', '==', email));
  //     const querySnapshot = await getDocs(userQuery);

  //     if (querySnapshot.empty) {
  //       Alert.alert('Error', 'Email tidak terdaftar.');
  //       return;
  //     }

  //     querySnapshot.forEach(async (doc) => {
  //       const userData = doc.data();
  //       if (userData.password === password) {
  //         await AsyncStorage.setItem('userId', doc.id);
  //         const storedUserId = await AsyncStorage.getItem('userId')
  //         console.log('User ID setelah login:', storedUserId)
  //         router.replace('/(tabs)/Home');
  //         Alert.alert('Success', 'Login berhasil!');
  //       } else {
  //         Alert.alert('Error', 'Password salah.');
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //     Alert.alert('Error', 'Failed to sign in.');
  //   }
  // };


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.vInput}>
          <TextInput style={{ flex: 1 }} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Ionicons name="person" size={17} color="black" style={{ padding: 10 }} />
        </View>
        <View style={styles.vInput}>
          <TextInput style={{ flex: 1 }} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 10 }}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={17} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => loginControl(email, password)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.switchContainer}>
          <Text style={{ fontSize: 14 }}>Belum punya akun?</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/register')}>
            <Text style={styles.switchText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;