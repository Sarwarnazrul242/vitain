import { reactive } from 'vue';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";
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

const auth = getAuth();

const db = getFirestore(app);

export async function signup(firstName: string, lastName: string, email: string, password: string) {
  console.log("Sign up clicked"); // Add this for debugging
  
  try {
    let user_credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = user_credentials.user
    
    await sendEmailVerification(user);

    await setDoc(doc(db, "users", user.uid),{
      uid: user.uid,
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      createdAt: new Date().toISOString(),
    });

     console.log("User signed up and save: ", user);

  } catch (err) {
    console.error("Sign up error: ", err)  //throw the error make the user try again comment?
    throw err;
  }
}

export async function login(email: string, password: string) {
  try {
    console.log(email);

    let user_credentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = user_credentials.user;

    if (!user.emailVerified)
    {
      throw new Error("Please verify your email before logging in.");
    }


    console.log(user_credentials.user);
  } catch (err) {
    if (err.message.includes("auth/invalid-email"))
     {
      throw {type: "email", message: "Invalid email"}
    }
    else if (err.message.includes("auth/missing-password"))
    {
      throw {type: "password", message: "Password required"}
    }

    else if (err.message.includes("auth/invalid-credential"))
    {
      throw {type: "password", message: "Wrong password. Try again or "+ 
           "click Forgot password to reset it."}
    }

    else if (err.message.includes("auth/too-many-requests"))
    {
      throw {type: "login", message: "Too many login attempts. Try again later."}
    }
    
    else
    {
        throw {type: "general", message: "Login error occured. Try again."}

    }
     
  }
}

export function retrieveAuth() {
  return auth;
}
