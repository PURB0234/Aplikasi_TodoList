import { db } from "@/service/firebaseConfig";
import { Alert } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const loginControl = async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
        Alert.alert('Input Error', 'Harap isi email dan password.');
        return;
    }

    if (!validateEmail(email)) {
        Alert.alert('Invalid Email', 'Harap masukkan alamat email yang valid.');
        return;
    }

    try {
        const userQuery = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            Alert.alert('Error', 'Email tidak terdaftar.');
            return;
        }

        querySnapshot.forEach(async (doc) => {
            const userData = doc.data();
            if (userData.password === password) {
                await AsyncStorage.setItem('userId', doc.id);
                const storedUserId = await AsyncStorage.getItem('userId')
                console.log('User ID setelah login:', storedUserId)
                router.replace('/(tabs)/Home');
                Alert.alert('Success', 'Login berhasil!');
            } else {
                Alert.alert('Error', 'Password salah.');
            }
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to sign in.');
    }
};