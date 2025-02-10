import { Tugas } from "@/models/Tugas";
import { db } from "@/service/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const handlePrioritas = async (item: Tugas) => {
    const tugas: Tugas[] = []; // Define tugas as an array of Tugas objects

    const updatedTugas = [...tugas];
    const index = updatedTugas.findIndex((t) => t.id === item.id);
    if (index !== -1) {
      updatedTugas[index].prioritas = !updatedTugas[index].prioritas;
      setSelectedTugas(updatedTugas[index]);
    }
    setTugas(updatedTugas);

    try {
      const tugasDocRef = doc(db, 'tdl', item.id);
      await updateDoc(tugasDocRef, { prioritas: updatedTugas[index].prioritas });
    } catch (error) {
      console.error('Error mengubah prioritas:', error);
    }
};

function setSelectedTugas(arg0: any) {
    throw new Error("Function not implemented.");
}


function setTugas(updatedTugas: any[]) {
    throw new Error("Function not implemented.");
}
