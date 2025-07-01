import { reactive } from 'vue';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, query, where, collection, serverTimestamp } from "firebase/firestore";
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

export type ErrorType  = "general" | "fill" | "email" |  "password" | "login" | "quiz" | "data" | "product";

export interface AppError {
  type: ErrorType;
  message: string;
}

 //Error types
  export const errors = reactive<{
    general: string;
    fill: string;
    password: string;
    login: string;

  }>(
    {
      general: "",
      fill:"",
      password:"",
      login:""
    }
  )

  type SubmissionType = "quiz" | "supplement";
  
  interface SubmissionPayload{
    type: SubmissionType;
    data: any;
  }

  export function isAppError(err: any): err is AppError{
    return err && typeof err.type === "string" && typeof err.message === "string";
  }
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

export async function submitUserData (payload: SubmissionPayload) {

  try{
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user)
    {
      throw {type: "login", message: "No user is logged in"}
    }

    const userDocRef = doc(db, "users", user.uid);

    await setDoc(userDocRef,{
      [payload.type]: payload.data,
    }, { merge: true});

    console.log("Data saved successfully");
  } catch (error) {
    console.error("Failed to store data", error);
    throw {type: "data", message: "Failed to store data. Try again."}
  }

}

async function getSupplementIdByName (name: string)
{

   try{
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user)
    {
      throw {type: "login", message: "No user is logged in"}
    }
    
  const supplementsRef = collection(db, "users", user.uid, "supplements");

  const q = query(supplementsRef, where("name", "==", name));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty)
  {
    const doc = querySnapshot.docs[0];
    return doc.id;
  }
  else {
    console.log("No id found")
  }
    return ""; //id not found
} catch (err){
  console.log("Supplement id finding error: ", err)
  throw {type: "search", message: "Error in finding supplementId"}
}


}

export async function storeSupplements (supplement) {

  try{
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user)
    {
      throw {type: "login", message: "No user is logged in"}
    }
    
    //Create collection for supplement
    const supplementRef = doc(collection(db, "users", user.uid, "supplements"));
    
    //Checks if supplement has been stored before by name if no it stores it
    const checkSupplementRef = collection(db, "users", user.uid,  "supplements");
    const q = query(checkSupplementRef, where("name", "==", supplement));
    
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty)
    {
     await setDoc(supplementRef,{
      name: supplement,
      addedOn: serverTimestamp(),
    });
    console.log("Product saved successfully");
    }


  } catch (error) {
    console.error("Failed to store supplements", error);
    throw {type: "data", message: "Failed to store supplements. Try again."}
  }

}

export async function storeProducts(supplement, products)
{
  try{
       const auth = getAuth();
       const user = auth.currentUser;
  if (!user)
    {
      throw {type: "login", message: "No user is logged in"}
    }
    
    const supplementId = await getSupplementIdByName(supplement);

    if (!supplementId)
    {
      throw {type: "data", message: "Supplement not found in catalog"};
    }
    const productRef = doc(collection(db, "users", user.uid, "supplements", supplementId, "products"));
    
    const checkProducttRef = collection(db, "users", user.uid, "supplements", supplementId, "products");
    const q = query(checkProducttRef, where("name", "==", products.fullName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty)
   {
    
      await setDoc(productRef,{
      name: products.fullName,
      content: products
    });
    console.log("Product saved successfully");
  }


  } catch (error) {
    console.error("Failed to store Products", error);
    throw {type: "product", message: error.message}
  }
}
