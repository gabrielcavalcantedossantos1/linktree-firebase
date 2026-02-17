import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCqgRnPxRemnr52EZzNgUDun_480coEAjw',
  authDomain: 'reactlinkd.firebaseapp.com',
  projectId: 'reactlinkd',
  storageBucket: 'reactlinkd.firebasestorage.app',
  messagingSenderId: '33105273656',
  appId: '1:33105273656:web:a503ae50b2ac6c0ea557cd',
  measurementId: 'G-P6RCCFY58Y',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };