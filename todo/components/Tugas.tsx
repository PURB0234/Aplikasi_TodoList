import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '@/style/home_style';

type TugasProps = {
  tugas: Tugas[];
  searchText: string;
  filterTugas: Tugas[];
  loading: boolean;
  handleOpenModal: (item: Tugas) => void;
};

type Tugas = {
  id: string;
  judulTugas: string;
  subTugas: SubTugas[];
  prioritas: boolean;
  createdAt: string;
  deadline?: string;
};

type SubTugas = {
  text: string;
  completed?: boolean;
};

const TugasComponent: React.FC<TugasProps> = ({
  tugas,
  searchText,
  filterTugas,
  loading,
  handleOpenModal,
}) => {
  const renderTugasItem = ({ item }: { item: Tugas }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleOpenModal(item)}
    >
      <View style={{ flexDirection: 'row' }}>
        {item.prioritas && (
          <Ionicons name="star" size={20} color={'gold'} />
        )}
      </View>
      <Text style={{
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 10
      }}>
        {item.judulTugas}
      </Text>

      <FlatList
        data={item.subTugas}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: subTugas }) => (
          <Text style={[
            styles.subTugasText,
            subTugas.completed && {
              textDecorationLine: 'line-through',
              color: 'gray'
            }
          ]}>
            {subTugas.text}
          </Text>
        )}
      />
      {item.deadline && new Date(item.deadline).getTime() <= new Date().getTime() &&
        !item.subTugas.every((sub) => sub.completed) && (
          <Text style={{ color: 'red' }}>Terlambat diselesaikan!!!</Text>
        )}

      {item.subTugas.every((sub) => sub.completed) && (
        <Text style={{ color: 'green' }}>Tugas Telah Selesai</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ height: '100%' }}>
      <View style={{
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        maxHeight: '39%',
      }}>
        {tugas.filter((item) => item.prioritas).length > 0 && (
          <View style={{
            marginBottom: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            maxHeight: '100%',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Tugas Prioritas</Text>
            <FlatList
              data={tugas.filter((item) => item.prioritas)}
              numColumns={2}
              renderItem={renderTugasItem}
            />
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 25
            }}>Tugas Lainya</Text>
          </View>
        )}
      </View>

      <FlatList
        data={searchText ? filterTugas : tugas}
        numColumns={2}
        renderItem={renderTugasItem}
        ListEmptyComponent={
          loading ? (
            <View style={{
              height: 700,
              justifyContent: 'center'
            }}>
              <Text style={styles.loadingText}>Memuat data...</Text>
            </View>
          ) : (
            <View style={{
              height: 700,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('@/assets/images/no_task.png')} />
            </View>
          )
        }
      />
      
    </View>
  );
};

export default TugasComponent;