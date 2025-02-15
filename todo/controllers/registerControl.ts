import { db } from "@/service/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { Alert } from "react-native";
import { router } from "expo-router";

export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const registerControl = async (email: string, password: string, confirmPassword: string) => {
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