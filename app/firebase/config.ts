import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDh1QoBEmvclUz2STwOTHJTKGQDoxQcq_Q",
  authDomain: "artswrk-native.firebaseapp.com",
  projectId: "artswrk-native",
  storageBucket: "artswrk-native.firebasestorage.app",
  messagingSenderId: "541494268522",
  appId: "1:541494268522:web:8ad35e4052fcf3f4fab013",
  measurementId: "G-4XEP9NNK6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics with client-side check
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firestore
const db = getFirestore(app);

export { db, analytics }; 