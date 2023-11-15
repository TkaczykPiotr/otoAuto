import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQVrPCowPWrC2zFuyJMcXbH42SzwBoIbQ",
  authDomain: "otoauto-bc484.firebaseapp.com",
  projectId: "otoauto-bc484",
  storageBucket: "otoauto-bc484.appspot.com",
  messagingSenderId: "430324808185",
  appId: "1:430324808185:web:60d03c0378d8e56c56a528",
  measurementId: "G-GWRWNRHY9W"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

// Initialize Firebase
const auth = firebase.auth()
export { auth };
export {firebase};
export const db = getFirestore(app);
export const storage = getStorage(app)
