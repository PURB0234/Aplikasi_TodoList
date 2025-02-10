import { doc, updateDoc, deleteField } from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "@/service/firebaseConfig"; 

interface Tugas {
  id: string;
  deadline?: string | null;
}

export const handleHapusDeadline = async (
  selectedTugas: Tugas | null,
  setSelectedTugas: (tugas: Tugas | null) => void,
  setIsVisible: (visible: boolean) => void
) => {
  if (!selectedTugas?.id) return; 
  
  try {
    const tugasDocRef = doc(db, "tdl", selectedTugas.id);
    
    await updateDoc(tugasDocRef, {
      deadline: deleteField(),
    });

    setSelectedTugas(null); 

    setIsVisible(false); 
    Alert.alert("Sukses", "Deadline berhasil dihapus!");
  } catch (error) {
    console.error("Error menghapus deadline:", error);
    Alert.alert("Error", "Gagal menghapus deadline!");
  }
};

export const handleSimpanDeadline = async (
  selectedTugas: Tugas | null,
  tanggal: Date,
  waktu: Date,
  setSelectedTugas: (tugas: Tugas | null) => void,
  setIsVisible: (visible: boolean) => void
) => {
    if (!selectedTugas) return;
    const combinedDateTime = new Date(
      tanggal.getFullYear(),
      tanggal.getMonth(),
      tanggal.getDate(),
      waktu.getHours(),
      waktu.getMinutes()
    );
    try {
      const tugasDocRef = doc(db, 'tdl', selectedTugas.id);
      await updateDoc(tugasDocRef, { deadline: combinedDateTime.toISOString() });
      setSelectedTugas(null)
      setIsVisible(false); 
      Alert.alert('Sukses', 'Deadline berhasil disimpan');
    } catch (error) {
      console.error('Error menyimpan deadline:', error);
      Alert.alert('Error', 'Gagal menyimpan deadline');
    }
  };
