import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '@/service/firebaseConfig'

// const firebaseConfig = {
//   apiKey: 'AIzaSyBKGfv19cLXQSzCpRCMBdWMjIObZ1E8udA',
//   authDomain: 'myperpus-551c1.firebaseapp.com',
//   projectId: 'myperpus-551c1',
//   storageBucket: 'myperpus-551c1.firebasestorage.app',
//   messagingSenderId: '908218387114',
//   appId: '1:908218387114:web:270ae422cdb55f6add9ed3',
//   measurementId: 'G-PF1489P5YP',
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

interface SubTugas {
  text: string;
  completed: boolean;
}

const Tambah: React.FC = () => {
  const [judulTugas, setJudulTugas] = useState<string>('');
  const [subTugas, setSubTugas] = useState<string>('');
  const [subTugasList, setSubTugasList] = useState<SubTugas[]>([]);
  const router = useRouter();
   const handleTambahSubTugas = (): void => {
     if (!subTugas.trim()) {
       Alert.alert('Error', 'Sub-tugas tidak boleh kosong!');
       return;
     }
     setSubTugasList([...subTugasList, { text: subTugas, completed: false }]);
     setSubTugas('');
   };

  interface TugasData {
    judulTugas: string;
    subTugas: SubTugas[];
    userId: string;
    createdAt: Date;
  }

  const handleTambahData = async (): Promise<void> => {
    if (!judulTugas.trim() || subTugasList.length === 0) {
      Alert.alert('Error', 'Harap isi semua kolom dan tambahkan sub-tugas!');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'User tidak ditemukan!');
        return;
      }
      const newTugas: TugasData = {
        judulTugas,
        subTugas: subTugasList,
        userId,
        createdAt: new Date(),
      };
      await addDoc(collection(db, 'tdl'), newTugas);
      router.push('/(tabs)/Home');
      Alert.alert('Sukses', 'Data tugas berhasil ditambahkan!');
      setJudulTugas('');
      setSubTugasList([]);
    } catch (e) {
      console.error('Error adding document: ', e);
      Alert.alert('Error', 'Gagal menambahkan data tugas!');
    }
  };

  const handleHapusSubTugas = (index: number) => {
    const updatedList = [...subTugasList];
    updatedList.splice(index, 1);
    setSubTugasList(updatedList);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tambah Tugas</Text> */}
      <View style={{
        width: '100%',
        marginBottom: 30,
        marginTop: 35
      }}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/Home')}>
          <Ionicons name='arrow-back' size={23} color={'#00000'}/>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Judul Tugas"
        value={judulTugas}
        onChangeText={setJudulTugas}
      />

      <View style={styles.subTugasContainer}>
        <TextInput
          style={styles.inputSubTugas}
          placeholder="Sub-Tugas"
          value={subTugas}
          onChangeText={setSubTugas}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleTambahSubTugas} >
          <Ionicons name="add" color="#00000" size={23}/>
        </TouchableOpacity>
      </View>

      <FlatList
        data={subTugasList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.subTugasItem}>
            {/* <TouchableOpacity onPress={() => toggleComplete(index)}>
              <Ionicons
                name={item.completed ? 'checkbox' : 'square-outline'}
                size={24}
                color={item.completed ? 'green' : 'gray'}
                style={{
                  marginStart: 5
                }}
              />
            </TouchableOpacity> */}
            <Text
              style={styles.subTugasText}
            >
              {item.text}
            </Text>
            <TouchableOpacity 
              style={{
                marginEnd: 10
              }}
              onPress={() => handleHapusSubTugas(index)}
            >
              <Ionicons name='close-outline' size={24} color={'black'}/>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleTambahData}>
        <Text style={styles.buttonText}>Tambah</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tambah;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    fontSize: 25
  },
  subTugasContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputSubTugas: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    marginLeft: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subTugasItem: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    marginTop: 15
  },
  subTugasText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1
  },
});
