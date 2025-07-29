import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp,
  getFirestore
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { detectLoginState, errors, clearError, ErrorType, AppError, isAppError, pastError} from "./auth";
import { useRoute, useRouter } from 'vue-router';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSENGERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

const route = useRoute();
const router = useRouter();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export interface DailyHealthData {
  mood: number;
  energy: number;
  sleep: number;
  sleepQuality: string;
  water: number;
  workoutCompleted: boolean;
  workoutDuration: number;
  workoutDate: string;
  caloriesBurned: number;
  workoutType: string;
  workoutNotes: string;
  weight: number;
  weightDate: string;
  stress: 0;
  mentalWellness: string;
  mentalWellnessCompleted: boolean;
  physicalWellness: string;
  physicalWellnessCompleted: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface HealthSummaryData {
  date: string;
  mood: number;
  energy: number;
  sleep: number;
  water: number;
  weight: number;
  stress: number;
}

//Testing purposes
export async function duplicateDailyHealthRecords() {
  const numDays =29;
   const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - numDays);

  // Normalize times
  sevenDaysAgo.setHours(0, 0, 0, 0);  // Start of day
  today.setHours(23, 59, 59, 999);    // End of day

  const user = await detectLoginState();
  const userId = user.uid;

  const healthCollectionRef = collection(db, "users", userId, "dailyHealth");

  // Step 1: Get the first health log (by createdAt)
  const q = query(healthCollectionRef, orderBy("createdAt", "asc"), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.warn("No health log found to duplicate.");
    return;
  }

  const firstDoc = querySnapshot.docs[0];
  const sourceData = firstDoc.data();

  // Get the original date
  const baseDate = sourceData.createdAt.toDate(); // assuming it's a Firestore Timestamp

  // Step 2: Duplicate this log for `numDays` additional days
  for (let i = numDays; i >= 1; i--) {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() - i);

    const dateStr = newDate.toISOString().split("T")[0]; // use YYYY-MM-DD format as doc ID

    const newData = {
      ...sourceData,
      createdAt: newDate,
      updatedAt: new Date()
    };

    const newDocRef = doc(db, "users", userId, "dailyHealth", dateStr);
    await setDoc(newDocRef, newData);

    console.log(`✔️ Duplicated health log for ${dateStr}`);
  }
}
/**
 * Save daily health data to Firebase
 * @param date - Date in YYYY-MM-DD format
 * @param data - Daily health data
 */
export async function saveDailyHealthData(date: string, data: DailyHealthData): Promise<void> {
  try {

    const user = await detectLoginState()

    const userId = user.uid;
    const healthDataRef = doc(db, "users", userId, "dailyHealth", date);
    
    const dataToSave = {
      ...data,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    };

    await setDoc(healthDataRef, dataToSave);
    console.log("Daily health data saved successfully:", date);
  } catch (err) {
    
   
    console.error("Error saving daily health data:", err);
    pastError.value = "login"
    errors["login"]= err.message;
    console.log(err);
      
    
  
  }
}

export async function handleLoginState()
{
try{
     const user = await detectLoginState();
  } catch (err) {
     if (err.type == "login")
      { 
        //Routes user to log in page before they can access dashboard
        console.error(err)
        router.push("/log-in");
      }
      else
      {
        throw err;
      }
}
}
/**
 * Get daily health data from Firebase
 * @param date - Date in YYYY-MM-DD format
 */
export async function getDailyHealthData(date: string): Promise<DailyHealthData | null | undefined> {
  try {
    const user = await detectLoginState();

    const userId = user.uid;
    const healthDataRef = doc(db, "users", userId, "dailyHealth", date);
    const healthDataSnap = await getDoc(healthDataRef);

    if (healthDataSnap.exists()) {
      return healthDataSnap.data() as DailyHealthData;
    }
    return null;
  } catch (err) {
     
    console.error("Error getting daily health data:", err);
    

   
  }
}

/**
 * Get health summary data for a date range
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 */
export async function getHealthSummaryData(startDate, endDate): Promise<HealthSummaryData[]> {
  try {
    const user = await detectLoginState();

    const userId = user.uid;
    const healthCollectionRef = collection(db, "users", userId, "dailyHealth");
    
    const q = query(
      healthCollectionRef,
      orderBy("createdAt", "asc"),
      where("createdAt", ">=", new Date(startDate)),
      where("createdAt", "<=", new Date(endDate))
    );

    const querySnapshot = await getDocs(q);
    const summaryData: HealthSummaryData[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as DailyHealthData;
      summaryData.push({
        date: doc.id,
        mood: data.mood || 0,
        stress: data.stress || 0,
        energy: data.energy || 0,
        sleep: data.sleep || 0,
        water: data.water || 0,
        weight: data.weight || 0
      });
    });
    
    return summaryData;
  } catch (error) {
    console.error("Error getting health summary data:", error);
    throw error;
  }
}

/**
 * Get the last 7 days of health data
 */
export async function getWeeklyHealthData(): Promise<HealthSummaryData[]> {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);

  // Normalize times
  sevenDaysAgo.setHours(0, 0, 0, 0);  // Start of day
  today.setHours(23, 59, 59, 999);    // End of day

  return await getHealthSummaryData(sevenDaysAgo, today);
}

/**
 * Get the last 30 days of health data
 */
export async function getMonthlyHealthData(): Promise<HealthSummaryData[]> {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 29);

  // Normalize times
  thirtyDaysAgo.setHours(0, 0, 0, 0);  // Start of day
  today.setHours(23, 59, 59, 999);    // End of day

  return await getHealthSummaryData(thirtyDaysAgo, today);
}

/**
 * Check if user has data for a specific date
 * @param date - Date in YYYY-MM-DD format
 */
export async function hasDataForDate(date: string): Promise<boolean> {
  try {
    const data = await getDailyHealthData(date);
    return data !== null;
  } catch (error) {
    console.error("Error checking data for date:", error);
    return false;
  }
} 