import { ref, reactive, nextTick } from "vue";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  reload,
  updatePassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import {
  User,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { loading, updateLoading } from "../composables/featureCtrl";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSENGERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();
const credentials = ref<any>();

export type ErrorType =
  | "general"
  | "fill"
  | "email"
  | "password"
  | "login"
  | "quiz"
  | "data"
  | "product"
  | "verify"
  | "database";
export const pastError = ref<ErrorType>("general");

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
  quiz: string;
  verify: string;
  database: string;
}>({
  general: "",
  fill: "",
  password: "",
  login: "",
  quiz: "",
  verify: "",
  database: ""
});

type SubmissionType = "quiz" | "supplement" | "comprehensiveQuestionnaire";

interface SubmissionPayload {
  type: SubmissionType;
  data: any;
}

 export function clearError ()
  {  
    console.log("Past error is ", pastError.value)
     errors[pastError.value] = ""
  }
  
export function isAppError(err: any): err is AppError {
  return err && typeof err.type === "string" && typeof err.message === "string";
}
export async function signup(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  console.log("Sign up clicked"); // Add this for debugging

  try {
    let user_credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = user_credentials.user;

    await sendEmailVerification(user);

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      createdAt: new Date().toISOString(),
    });

    console.log("User signed up and save: ", user);

    sessionStorage.setItem("email", email);
  } catch (err) {
    if (err.message.includes("auth/invalid-email")) {
      throw { type: "email", message: "Invalid email" };
    } else {
      console.error("Sign up error: ", err); //throw the error make the user try again comment?
      throw err;
    }
  }
}

export async function checkEmailVerification() {
  try {
    const credential = getAuth().currentUser;
    if (credential) {
      await reload(credential);

      if (!credential.emailVerified) {
        console.log("email veirfied syatus:", credential);
        throw { type: "verify", message: "Please verify your email." };
      }
    }

    return true;
  } catch (err) {
    throw err;
  }
}

export async function resetPassword(email) {
  // Get the current user
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log("In reset password");

    // Optionally re-authenticate first (see below)

    // Update password

    await sendPasswordResetEmail(auth, email);
    console.log("✅ Password reset email sent.");
  } catch (error) {
    console.error("❌ Failed to send reset email:", error);
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

    await checkEmailVerification();
    credentials.value = user_credentials.user;
    console.log(credentials.value);

    return credentials;
  } catch (err) {
    if (err.message.includes("auth/invalid-email")) {
      throw { type: "email", message: "Invalid email" };
    } else if (err.message.includes("auth/missing-password")) {
      throw { type: "password", message: "Password required" };
    } else if (err.message.includes("auth/invalid-credential")) {
      throw {
        type: "password",
        message:
          "Wrong password. Try again or " +
          "click Forgot password to reset it.",
      };
    } else if (err.message.includes("auth/too-many-requests")) {
      throw {
        type: "login",
        message: "Too many login attempts. Try again later.",
      };
    }

    //Sends verification email and then is caught by handlelogin in login.vue which then routes it to verify.vue to check verificatrion
    else if (err.type == "verify") {
      const credential = getAuth().currentUser;

      if (credential != null) {
        await sendEmailVerification(credential);
      }
      throw err;
    } else {
      throw { type: "general", message: "Login error occured. Try again." };
    }
  }
}

export async function logout() {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw { type: "login", message: "No user is logged in" };
    }
    await signOut(auth);
    console.log("User was successfully logged out");
  } catch (err) {
    console.log("Error occured loguot function");
  }
}

export function retrieveAuth() {
  return auth;
}

export async function detectLoginState(): Promise<User> {
  try {
    const auth = getAuth();

    return new Promise((resolve, reject) => {
      //If error wont go past if and ecerything ends if not error it continues accorlding
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); //stop listenign agter first trigger
        if (user) {
          console.log("User is logged in: ", user.email);
          resolve(user);
          return user;
        } else {
          console.log("No user is logged in");
          reject({ type: "login", message: "No user is logged in" });
        }
      });
    });
  } catch (err) {
    if (err.type == "login") {
      throw err;
    } else {
      console.log("Error in detecting login state: ", err);
      throw { type: "general", message: "There was an error. Try again." };
    }
  }
}

export async function submitUserData(payload: SubmissionPayload) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw { type: "login", message: "No user is logged in" };
    }

    const userDocRef = doc(db, "users", user.uid);

    await setDoc(
      userDocRef,
      {
        [payload.type]: payload.data,
      },
      { merge: true }
    );

    console.log("Data saved successfully");
  } catch (error) {
    console.error("Failed to store data", error);
    throw { type: "data", message: "Failed to store data. Try again." };
  }
}

async function getSupplementIdByName(name: string) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw { type: "login", message: "No user is logged in" };
    }

    const supplementsRef = collection(db, "users", user.uid, "supplements");

    const q = query(supplementsRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return doc.id;
    } else {
      console.log("No id found");
    }
    return ""; //id not found
  } catch (err) {
    console.log("Supplement id finding error: ", err);
    throw { type: "search", message: "Error in finding supplementId" };
  }
}

export async function storeSupplements(supplement) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw { type: "login", message: "No user is logged in" };
    }

    //Create collection for supplement
    const supplementRef = doc(collection(db, "users", user.uid, "supplements"));

    //Checks if supplement has been stored before by name if no it stores it
    const checkSupplementRef = collection(db, "users", user.uid, "supplements");
    const q = query(checkSupplementRef, where("name", "==", supplement));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await setDoc(supplementRef, {
        name: supplement,
        addedOn: serverTimestamp(),
      });
      console.log("Product saved successfully");
    }
  } catch (error) {
    console.error("Failed to store supplements", error);
    throw { type: "data", message: "Failed to store supplements. Try again." };
  }
}

export async function storeProducts(supplement, products) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw { type: "login", message: "No user is logged in" };
    }

    const supplementId = await getSupplementIdByName(supplement);

    if (!supplementId) {
      throw { type: "data", message: "Supplement not found in catalog" };
    }
    const productRef = doc(
      collection(db, "users", user.uid, "supplements", supplementId, "products")
    );

    const checkProducttRef = collection(
      db,
      "users",
      user.uid,
      "supplements",
      supplementId,
      "products"
    );
    const q = query(checkProducttRef, where("name", "==", products.fullName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await setDoc(productRef, {
        name: products.fullName,
        content: products,
      });
      console.log("Product saved successfully");
    }
  } catch (error) {
    console.error("Failed to store Products", error);
    throw { type: "product", message: error.message };
  }
}

export async function validateForm(formSubmission) {
  // Check if this is the new comprehensive questionnaire format
  if (formSubmission.role === "user" && formSubmission.action === "list") {
    // New comprehensive questionnaire validation
    if (!formSubmission.age) return "Please enter your age";
    if (!formSubmission.biologicalSex) return "Please select your biological sex";
    if (!formSubmission.height) return "Please enter your height";
    if (!formSubmission.weight) return "Please enter your weight";
    if (!formSubmission.generalHealth) return "Please select your general health status";
    if (!formSubmission.physicalWellness) return "Please answer about your physical wellness";
    if (!formSubmission.painDiscomfort) return "Please answer about pain or discomfort";
    if (!formSubmission.currentSymptoms || formSubmission.currentSymptoms.length === 0) return "Please select your current symptoms";
    if (!formSubmission.medicalConditions || formSubmission.medicalConditions.length === 0) return "Please select your medical conditions";
    if (!formSubmission.digestiveIssues) return "Please answer about digestive issues";
    if (!formSubmission.concerningSymptoms) return "Please answer about concerning symptoms";
    if (!formSubmission.pregnancyStatus) return "Please answer about pregnancy status";
    if (!formSubmission.allergies) return "Please answer about allergies";
    if (!formSubmission.prescriptionMeds) return "Please answer about prescription medications";
    if (!formSubmission.otcSupplements) return "Please answer about over-the-counter supplements";
    if (!formSubmission.advisedNotToTake) return "Please answer about advised supplements";
    if (!formSubmission.bloodTests) return "Please answer about blood tests";
    if (!formSubmission.shareTestResults) return "Please answer about sharing test results";
    if (!formSubmission.specificDiet) return "Please select your diet";
    if (!formSubmission.mealsPerDay) return "Please select meals per day";
    if (!formSubmission.alcoholConsumption) return "Please answer about alcohol consumption";
    if (!formSubmission.tobaccoUse) return "Please answer about tobacco use";
    if (!formSubmission.sleepHours) return "Please select your sleep hours";
    if (!formSubmission.fatigueLevel) return "Please select your fatigue level";
    if (!formSubmission.activityLevel) return "Please select your activity level";
    if (!formSubmission.exerciseDays) return "Please select your exercise days";
    if (!formSubmission.difficultySwallowing) return "Please answer about difficulty swallowing";
    if (!formSubmission.stressLevel) return "Please select your stress level";
    if (!formSubmission.interestPleasure) return "Please answer about interest or pleasure";
    if (!formSubmission.depression) return "Please answer about depression";
    if (!formSubmission.sleepIssues) return "Please answer about sleep issues";
    if (!formSubmission.supplementAdherence) return "Please select your supplement adherence";
    if (!formSubmission.dosingPreference) return "Please select your dosing preference";
    if (!formSubmission.budgetRange) return "Please select your budget range";
    if (!formSubmission.healthGoals || formSubmission.healthGoals.length === 0) return "Please select your health goals";

    // Convert data types
    formSubmission.age = formSubmission.age.toString();
    formSubmission.weight = formSubmission.weight.toString();
    formSubmission.height = formSubmission.height.toString();
    
    return null;
  } else {
    // Legacy form validation (keeping for backward compatibility)
    if (!formSubmission.weight) return "Please enter your weight";
    if (!formSubmission.height) return "Please enter your height";
    if (!formSubmission.gender) return "Please select your gender";
    if (!formSubmission.age) return "Please enter your age";
    if (!formSubmission.activeness) return "Please select your activity level";
    if (!formSubmission.goals) return "Please enter your health goals";

    formSubmission.weight = formSubmission.weight.toString();
    formSubmission.height = formSubmission.height.toString();
    formSubmission.age = formSubmission.age.toString();
    formSubmission.supplements = formSubmission.supplements || "none";
    formSubmission.allergies = formSubmission.allergies || "none";
    return null;
  }
}

export async function submitForm(formSubmission, router, error: string = "") {
  console.log("in submit form");
  const loginState = ref(false);
  try {
    error = "";
    const validationError = await validateForm(formSubmission);
    if (validationError) {
      error = validationError;

      console.log("validation error", error);
      return;
    }

    console.log("detecting log in state");

    //Stores user data after taking quiz locally and Ensures user is logged in/signed up before the info is stored in db and AI is queried
    try {
      const auth = await detectLoginState();
    } catch (err) {
      if (err.type == "login") {
        console.log("User needs to login: ", err);

        sessionStorage.setItem("quizData", JSON.stringify(formSubmission));
        router.push("/log-in");
        return; //route and leave this function completely
      } else {
        console.log(err);
      }
    }

    // Loading state commented out since AI processing is disabled
    // sessionStorage.setItem("loading", "true"); //To flag for AI loading overlah
    // window.dispatchEvent(new Event("loading-change")); //Indicate change in event based of already logged in do AI mode

    // console.log("getting session", sessionStorage.getItem("loading"));

    // Construct request body based on form type
    let requestBody;
    
    if (formSubmission.role === "user" && formSubmission.action === "list") {
      // New comprehensive questionnaire format
      requestBody = {
        role: "user",
        action: "list",
        // Basic demographics
        age: formSubmission.age,
        biologicalSex: formSubmission.biologicalSex,
        height: formSubmission.height,
        weight: formSubmission.weight,
        // Health status
        generalHealth: formSubmission.generalHealth,
        physicalWellness: formSubmission.physicalWellness,
        painDiscomfort: formSubmission.painDiscomfort,
        painDescription: formSubmission.painDescription,
        // Symptoms and conditions
        currentSymptoms: formSubmission.currentSymptoms,
        medicalConditions: formSubmission.medicalConditions,
        digestiveIssues: formSubmission.digestiveIssues,
        concerningSymptoms: formSubmission.concerningSymptoms,
        pregnancyStatus: formSubmission.pregnancyStatus,
        allergies: formSubmission.allergies,
        allergyDetails: formSubmission.allergyDetails,
        // Medications and supplements
        prescriptionMeds: formSubmission.prescriptionMeds,
        prescriptionMedsList: formSubmission.prescriptionMedsList,
        otcSupplements: formSubmission.otcSupplements,
        otcSupplementsList: formSubmission.otcSupplementsList,
        advisedNotToTake: formSubmission.advisedNotToTake,
        bloodTests: formSubmission.bloodTests,
        shareTestResults: formSubmission.shareTestResults,
        // Diet and nutrition
        specificDiet: formSubmission.specificDiet,
        otherDiet: formSubmission.otherDiet,
        mealsPerDay: formSubmission.mealsPerDay,
        foodFrequency: formSubmission.foodFrequency,
        alcoholConsumption: formSubmission.alcoholConsumption,
        tobaccoUse: formSubmission.tobaccoUse,
        // Lifestyle
        sleepHours: formSubmission.sleepHours,
        fatigueLevel: formSubmission.fatigueLevel,
        activityLevel: formSubmission.activityLevel,
        exerciseDays: formSubmission.exerciseDays,
        difficultySwallowing: formSubmission.difficultySwallowing,
        stressLevel: formSubmission.stressLevel,
        // Mental health
        interestPleasure: formSubmission.interestPleasure,
        depression: formSubmission.depression,
        sleepIssues: formSubmission.sleepIssues,
        // Supplement preferences
        pastSupplementExperience: formSubmission.pastSupplementExperience,
        preferredFormats: formSubmission.preferredFormats,
        supplementAdherence: formSubmission.supplementAdherence,
        dosingPreference: formSubmission.dosingPreference,
        budgetRange: formSubmission.budgetRange,
        // Health goals
        healthGoals: formSubmission.healthGoals,
      };
    } else {
      // Legacy format for backward compatibility
      requestBody = {
        role: "user",
        action: "list",
        weight: formSubmission.weight,
        height: formSubmission.height,
        gender: formSubmission.gender,
        age: formSubmission.age,
        activeness: formSubmission.activeness.toLowerCase(),
        supplements: formSubmission.supplements,
        allergies: formSubmission.allergies,
        goals: formSubmission.goals,
      };
    }

    console.log("Storing questionnaire data");
    try {
      // Save the comprehensive questionnaire data to Firebase
      await submitUserData({ type: "comprehensiveQuestionnaire", data: formSubmission });
      console.log("Questionnaire data saved successfully to Firebase");
    } catch (err) {
      if (err.type == "data") {
        console.log("Error saving questionnaire data: ", err);
        throw { type: "quiz", message: "Failed to save questionnaire data. Please try again." };
      } else {
        console.log("submitting user info error: ", err);
        throw err;
      }
    }

    // AI processing commented out for now - just saving data to database
    /*
    console.log("Sending request with body:", requestBody);

    // First API call to get supplement recommendations
    const response = await fetch("https://vitain-ai.onrender.com/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    // Extract supplement list from the response
    let supplementList = [];
    if (data && data.response) {
      supplementList = data.response.split(",").map((s) => s.trim());
    }

    // Second API call to get supplement product information
    let supplementProducts = [];
    if (supplementList.length > 0) {
      const supplementInfoRequest = {
        action: "get_multi_products_packages",
        list: supplementList,
      };

      console.log("Sending supplement info request:", supplementInfoRequest);

      const supplementInfoResponse = await fetch(
        "https://vitain-ai.onrender.com/v1/supplement-info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(supplementInfoRequest),
        }
      );

      if (supplementInfoResponse.ok) {
        const supplementInfoData = await supplementInfoResponse.json();
        console.log("Supplement Info Response:", supplementInfoData);
        supplementProducts = supplementInfoData.response || [];
      } else {
        console.error(
          "Supplement info API error:",
          supplementInfoResponse.status
        );
      }
    }

    console.log(auth.currentUser);
    if (auth.currentUser === null) {
      router.push({
        name: "results",
        query: {
          results: JSON.stringify(data),
          userInfo: JSON.stringify(requestBody),
          supplementProducts: JSON.stringify(supplementProducts),
          showSignup: true,
        },
      });
      return;
    }

    router.push({
      name: "results",
      query: {
        results: JSON.stringify(data),
        userInfo: JSON.stringify(requestBody),
        supplementProducts: JSON.stringify(supplementProducts),
      },
    });
    */

    // For now, just redirect to dashboard after saving data
    console.log("Data saved successfully. Redirecting to dashboard...");
    router.push("/dashboard");
  } catch (error) {
    console.error("Error details:", error);
    error.value =
      "There was an error processing your request. Please try again.";
  }
}

export async function retrieveUserInfo() {
  console.log("detecting log in state");

  // Ensures user is logged in/signed up before the info is stored in db and AI is queried
  try {
    const user = await detectLoginState();
    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const name = `${data.firstName} ${data.lastName}`;
      const email = data.email;
      const joinDate = data.createdAt;

      return { name, email, joinDate };
    } else {
      throw {
        type: "database",
        message: "User document with data not found in database",
      };
    }
  } catch (err) {
    if (err.type == "login") {
      console.log("User needs to login: ", err);
    } else {
      console.log(err);
    }
  }
}


export async function retrieveQuestionnaireData() {
  try {
    const user = await detectLoginState();
    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      // Return the comprehensive questionnaire data if it exists
      return data.comprehensiveQuestionnaire || null;
    } else {
      throw {
        type: "database",
        message: "User document not found in database",
      };
    }
  } catch (err) {
    if (err.type == "login") {
      console.log("User needs to login: ", err);
    } else {
      console.log("Error retrieving questionnaire data: ", err);
    }
    return null;
  }
}
