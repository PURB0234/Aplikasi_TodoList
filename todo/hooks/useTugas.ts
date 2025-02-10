// src/hooks/useTask.ts
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tugas } from '@/models/Tugas';

const db = getFirestore();

export const useTask = () => {
  const [searchText, setSearchText] = useState('');
  const [tugas, setTugas] = useState<Tugas[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Tugas | null>(null);

  const fetchTugas = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      const q = query(collection(db, 'tdl'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const userTasks: Tugas[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        judulTugas: doc.data().judulTugas || '',
        subTugas: doc.data().subTugas || [],
        createdAt: doc.data().createdAt || '',
      }));

      setTugas(userTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      fetchTugas();
      return;
    }

    try {
      const tugasRef = collection(db, 'tdl');
      const q = query(
        tugasRef,
        where('judulTugas', '>=', searchText),
        where('judulTugas', '<=', searchText + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      const results: Tugas[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        judulTugas: doc.data().judulTugas || '',
        subTugas: doc.data().subTugas || [],
        createdAt: doc.data().createdAt || '',
      }));

      setTugas(results);
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  const deleteTugas = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tdl', id));
      setTugas((prev) => prev.filter((t) => t.id !== id));
      setModalVisible(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleOpenModal = (item: Tugas) => {
    setSelectedTask(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    fetchTugas();
  }, []);

  return {
    searchText,
    setSearchText,
    tugas,
    loading,
    modalVisible,
    selectedTask,
    fetchTugas,
    handleSearch,
    deleteTugas,
    handleOpenModal,
    closeModal,
  };
};
