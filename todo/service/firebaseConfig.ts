import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBKGfv19cLXQSzCpRCMBdWMjIObZ1E8udA',
  authDomain: 'myperpus-551c1.firebaseapp.com',
  projectId: 'myperpus-551c1',
  storageBucket: 'myperpus-551c1.firebasestorage.app',
  messagingSenderId: '908218387114',
  appId: '1:908218387114:web:270ae422cdb55f6add9ed3',
  measurementId: 'G-PF1489P5YP',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);