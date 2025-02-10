import { db } from "@/service/firebaseConfig";
import { doc, updateDoc, FieldValue } from "firebase/firestore";
import { Alert } from "react-native";

interface Tugas {
    id: string;
    deadline: string | null;
  }
  
  // **Simpan Deadline**
  export const handleSimpanDeadline = async (
    selectedEdit: Tugas | null,
    newDeadline: string,
    setSelectedEdit: (tugas: Tugas | null) => void
  ) => {
    if (!selectedEdit) return;
  
    if (!newDeadline.trim()) {
      Alert.alert("Error", "Tanggal deadline tidak boleh kosong!");
      return;
    }
  
    try {
      const tugasDocRef = doc(db, "tdl", selectedEdit.id);
      await updateDoc(tugasDocRef, { deadline: newDeadline });
  
      setSelectedEdit({ ...selectedEdit, deadline: newDeadline });
      Alert.alert("Sukses", "Deadline berhasil disimpan.");
    } catch (error) {
      console.error("Error menyimpan deadline:", error);
      Alert.alert("Error", "Gagal menyimpan deadline.");
    }
  };
  
  // **Batal Deadline**
  export const handleBatalDeadline = (
    selectedEdit: Tugas | null,
    previousDeadline: string | null,
    setSelectedEdit: (tugas: Tugas | null) => void
  ) => {
    if (!selectedEdit) return;
  
    setSelectedEdit({ ...selectedEdit, deadline: previousDeadline });
    Alert.alert("Info", "Perubahan deadline dibatalkan.");
  };
  
  // **Hapus Deadline**
  export const handleHapusDeadline = async (
    selectedEdit: Tugas | null,
    setSelectedEdit: (tugas: Tugas | null) => void
  ) => {
    if (!selectedEdit) return;
  
    try {
      const tugasDocRef = doc(db, "tdl", selectedEdit.id);
      await updateDoc(tugasDocRef, { deadline: null });
  
      setSelectedEdit({ ...selectedEdit, deadline: null });
      Alert.alert("Sukses", "Deadline berhasil dihapus.");
    } catch (error) {
      console.error("Error menghapus deadline:", error);
      Alert.alert("Error", "Gagal menghapus deadline.");
    }
  };