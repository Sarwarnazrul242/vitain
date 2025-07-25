import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp,
  getFirestore
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

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
}

/**
 * Save daily health data to Firebase
 * @param date - Date in YYYY-MM-DD format
 * @param data - Daily health data
 */
export async function saveDailyHealthData(date: string, data: DailyHealthData): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;
    const healthDataRef = doc(db, "users", userId, "dailyHealth", date);
    
    const dataToSave = {
      ...data,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    };

    await setDoc(healthDataRef, dataToSave);
    console.log("Daily health data saved successfully:", date);
  } catch (error) {
    console.error("Error saving daily health data:", error);
    throw error;
  }
}

/**
 * Get daily health data from Firebase
 * @param date - Date in YYYY-MM-DD format
 */
export async function getDailyHealthData(date: string): Promise<DailyHealthData | null> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;
    const healthDataRef = doc(db, "users", userId, "dailyHealth", date);
    const healthDataSnap = await getDoc(healthDataRef);

    if (healthDataSnap.exists()) {
      return healthDataSnap.data() as DailyHealthData;
    }
    return null;
  } catch (error) {
    console.error("Error getting daily health data:", error);
    throw error;
  }
}

/**
 * Get health summary data for a date range
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 */
export async function getHealthSummaryData(startDate: string, endDate: string): Promise<HealthSummaryData[]> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;
    const healthCollectionRef = collection(db, "users", userId, "dailyHealth");
    
    const q = query(
      healthCollectionRef,
      where("createdAt", ">=", new Date(startDate)),
      where("createdAt", "<=", new Date(endDate)),
      orderBy("createdAt", "asc")
    );

    const querySnapshot = await getDocs(q);
    const summaryData: HealthSummaryData[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as DailyHealthData;
      summaryData.push({
        date: doc.id,
        mood: data.mood || 0,
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

  const startDate = sevenDaysAgo.toISOString().split('T')[0];
  const endDate = today.toISOString().split('T')[0];

  return await getHealthSummaryData(startDate, endDate);
}

/**
 * Get the last 30 days of health data
 */
export async function getMonthlyHealthData(): Promise<HealthSummaryData[]> {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 29);

  const startDate = thirtyDaysAgo.toISOString().split('T')[0];
  const endDate = today.toISOString().split('T')[0];

  return await getHealthSummaryData(startDate, endDate);
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