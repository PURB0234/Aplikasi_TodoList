import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskController = {
  async fetchTugas() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        return [];
      }
      const taskQuery = query(collection(db, 'tdl'), where('userId', '==', userId));
      const querySnapshot = await getDocs(taskQuery);
      const userTasks: { id: string; judulTugas: any; subTugas: any; prioritas: any; createdAt: any; deadline: any; }[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userTasks.push({
          id: doc.id,
          judulTugas: data.judulTugas || '',
          subTugas: data.subTugas || [],
          prioritas: data.prioritas,
          createdAt: data.createdAt || '',
          deadline: data.deadline || '',
        });
      });
      return userTasks;
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil tugas.', error);
      return [];
    }
  },

  async deleteTugas(id: string) {
    try {
      const tugasDocRef = doc(db, 'tdl', id);
      await deleteDoc(tugasDocRef);
      return true; // Return success
    } catch (error) {
      console.error('Error deleting tugas:', error);
      throw error; // Throw error to be handled by component
    }
  },
};

export default TaskController;
