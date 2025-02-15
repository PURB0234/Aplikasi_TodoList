import { View } from "react-native";
import FormLogin from '@/app/(tabs)/login_form'
import Home from '@/app/(tabs)/Home'
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,  // Tampilkan notifikasi saat muncul
    shouldPlaySound: true,  // Bunyi notifikasi
    shouldSetBadge: false,  // Tidak perlu menampilkan badge aplikasi
  }),
});

export default function App() {
  return(
    <View style={{
      height: '100%'
    }}>
      <FormLogin/>
    </View>
  )
}