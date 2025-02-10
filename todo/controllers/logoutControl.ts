import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

 export const Logout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah anda yakin ingin keluar?',
      [
        {
          text: 'Batal', style: 'cancel'
        },
        {
          text: 'Ya',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userId');
              setIsLoggedIn(false);
              setSelectedSwitch(false);
              Alert.alert('Berhasil', 'Anda berhasil keluar!')
              setTimeout(() => {
                router.replace('/(tabs)/login_form')
              }, 500);
            } catch (error) {
              console.error('Error saat logout:', error);
              Alert.alert('Error', 'Gagal logout. Coba lagi.');
            };
          },
        },
      ],
    );
  };

function setIsLoggedIn(arg0: boolean) {
    throw new Error("Function not implemented.");
}


function setSelectedSwitch(arg0: boolean) {
    throw new Error("Function not implemented.");
}
