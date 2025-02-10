import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Tugas } from '../models/Tugas';

interface TugasListProps {
  tugasList: Tugas[];
}

const TugasList: React.FC<TugasListProps> = ({ tugasList }) => {
  return (
    <FlatList
      data={tugasList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.judulTugas}</Text>
          {/* Render subTugas if needed */}
        </View>
      )}
    />
  );
};

export default TugasList;