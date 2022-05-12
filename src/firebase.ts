import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCerpYixSIlekRmbbNUnKkLz6hjiIdeuys",
  authDomain: "supermarketlist-67b4c.firebaseapp.com",
  databaseURL: "https://supermarketlist-67b4c-default-rtdb.firebaseio.com",
  projectId: "supermarketlist-67b4c",
  storageBucket: "supermarketlist-67b4c.appspot.com",
  messagingSenderId: "191940554885",
  appId: "1:191940554885:web:c50c8a97f58f3dce25f9ec",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getDatabase(app);
