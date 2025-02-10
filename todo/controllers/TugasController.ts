import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tugas } from '../models/Tugas';

const db = getFirestore();

export const fetchTugas = async (): Promise<Tugas[]> => {
  try {
    const userId = await AsyncStorage.getItem('userId'); 
    if (!userId) return [];

    const taskQuery = query(collection(db, 'tdl'), where('userId', '==', userId));
    const querySnapshot = await getDocs(taskQuery);

    const userTasks: Tugas[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      judulTugas: doc.data().judulTugas || '',
      subTugas: doc.data().subTugas || [],
      createdAt: doc.data().createdAt || '',
    }));

    return userTasks;
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil tugas.', error);
    return [];
  }
};

export const deleteTugas = async (id: string): Promise<void> => {
  try {
    const tugasDocRef = doc(db, 'tdl', id);
    await deleteDoc(tugasDocRef);
  } catch (error) {
    console.error('Error deleting tugas:', error);
    throw new Error('Gagal menghapus tugas!');
  }
};

export const updateSubTugas = async (tugasId: string, updatedSubTugas: any[]): Promise<void> => {
  try {
    const tugasDocRef = doc(db, 'tdl', tugasId);
    await updateDoc(tugasDocRef, { subTugas: updatedSubTugas });
  } catch (error) {
    console.error('Error updating sub-task status:', error);
    throw new Error('Gagal mengupdate sub-tugas!');
  }
};
