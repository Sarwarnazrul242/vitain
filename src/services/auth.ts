import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSENGERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);

export async function signup(email: string, password: string) {
  try {
    const auth = getAuth();

    let user_credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log(user_credentials.user);
  } catch (err) {
    throw err;
  }
}

export async function login(email: string, password: string) {
  try {
    const auth = getAuth();

    console.log(email);

    let user_credentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log(user_credentials.user);
  } catch (err) {
    throw err;
  }
}
