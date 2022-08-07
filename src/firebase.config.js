// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDyL87CIPgjsAl7tSn-pNDhUgqXsIcda0",
  authDomain: "market-place-lister.firebaseapp.com",
  projectId: "market-place-lister",
  storageBucket: "market-place-lister.appspot.com",
  messagingSenderId: "1064251500142",
  appId: "1:1064251500142:web:402e25648bb3a87138287f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore()