import { db } from "@/service/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

export const saveExpoPushToken = async (userId: string, token: string) => {
  try {
    const userRef = doc(collection(db, "users"), userId);
    await setDoc(userRef, { expoPushToken: token }, { merge: true });
    console.log("Token disimpan ke Firestore!");
  } catch (error) {
    console.error("Gagal menyimpan token:", error);
  }
};
