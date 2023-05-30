import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCtz5Cj7H77Wv7BmttngyfcuwrgGSEAyRQ',
  authDomain: 'fir-backend-c8866.firebaseapp.com',
  projectId: 'fir-backend-c8866',
  storageBucket: 'fir-backend-c8866.appspot.com',
  messagingSenderId: '442263984627',
  appId: '1:442263984627:web:1f15d958c9b5955f4fda86',
  measurementId: 'G-7QG8WR3EYJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
