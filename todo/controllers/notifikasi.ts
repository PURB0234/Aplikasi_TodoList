import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert } from "react-native";

// ✅ Minta izin notifikasi saat aplikasi pertama kali dibuka
export const requestNotificationPermission = async () => {
  if (!Device.isDevice) {
    Alert.alert("Perhatian", "Notifikasi hanya bisa digunakan di perangkat fisik.");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Izin Notifikasi Ditolak", "Harap aktifkan notifikasi di pengaturan.");
  } else {
    console.log("Izin notifikasi diberikan!");
  }
};

export const setupNotificationListener = () => {
  Notifications.addNotificationReceivedListener((notification) => {
    console.log('Notifikasi diterima:', notification);
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('User menekan notifikasi:', response);
  });
}