import { View } from "react-native";
import FormLogin from '@/app/(tabs)/login_form'
import Home from '@/app/(tabs)/Home'

export default function App() {
  return(
    <View style={{
      height: '100%'
    }}>
      <FormLogin/>
    </View>
  )
}