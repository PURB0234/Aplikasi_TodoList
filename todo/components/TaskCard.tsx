import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tugas } from '@/models/Tugas';
import styles from '@/style/home_style';

interface TaskCardProps {
  item: Tugas;
  handleOpenModal: (item: Tugas) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ item, handleOpenModal }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => handleOpenModal(item)}>
      <View style={{ flexDirection: 'row' }}>
        {item.prioritas && <Ionicons name="star" size={20} color={'gold'} />}
      </View>
      <Text style={{ fontSize: 17, fontWeight: '500', marginBottom: 10 }}>{item.judulTugas}</Text>
      <FlatList
        data={item.subTugas}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={[styles.subTugasText, item.completed && { textDecorationLine: 'line-through', color: 'gray' }]}>
            {item.text}
          </Text>
        )}
      />
    </TouchableOpacity>
  );
};

export default TaskCard;