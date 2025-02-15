import { doc, updateDoc, deleteField } from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "@/service/firebaseConfig"; 
// import { scheduleDeadlineNotification } from "./notifikasi";
import * as Notifications from "expo-notifications";

interface Tugas {
  [x: string]: any;
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
    const tugasDocRef = doc(db, "tdl", selectedTugas.id);
    await updateDoc(tugasDocRef, { deadline: combinedDateTime.toISOString() });

    setSelectedTugas({ ...selectedTugas, deadline: combinedDateTime.toISOString() });
    setIsVisible(false);

    const timeNow = new Date();
    const timeDeadline = new Date(combinedDateTime);
    const secondsUntilDeadline = Math.floor((timeDeadline.getTime() - timeNow.getTime()) / 1000);

    if (secondsUntilDeadline > 0) {
      const trigger: any = { date: timeDeadline};
      console.log(`⏳ Notifikasi akan muncul dalam ${secondsUntilDeadline} detik`);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Pengingat Deadline 📅",
          body: `Deadline tugas "${selectedTugas.judulTugas}" pada ${combinedDateTime.toLocaleString()}. Jangan Lupa mengerjakan tugasmu, Tetap semangat menjalani hari-hari yang indah ini😊`,
          sound: "default",
        },
        trigger: trigger, 
      });

      Alert.alert("Sukses", "Deadline berhasil disimpan & notifikasi dijadwalkan.");
    } else {
      console.warn("Deadline sudah lewat, tidak menjadwalkan notifikasi.");
    }
  } catch (error) {
    console.error("Error menyimpan deadline:", error);
    Alert.alert("Error", "Gagal menyimpan deadline.");
  }
};
