import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDh1QoBEmvclUz2STwOTHJTKGQcq_Q",
  authDomain: "artswrk-native.firebaseapp.com",
  projectId: "artswrk-native",
  storageBucket: "artswrk-native.firebasestorage.app",
  messagingSenderId: "541494268522",
  appId: "1:541494268522:web:8ad35e4052fcf3f4fab013",
  measurementId: "G-4XEP9NNK6Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app);

export const db = getFirestore(app); 