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
import { ref, computed, onMounted, watch } from 'vue';
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
  
  // Summary view state
export const summaryView = ref('weekly');
export const questionnaireData = ref<any>(null);
  
// Weekly data from Firebase
export const weeklyData = ref<HealthSummaryData[]>([]);

// Monthly data from Firebase
export const monthlyData = ref<HealthSummaryData[]>([]);

// Loading states
export const isLoading = ref(false);
export const isSaving = ref(false);

export const getMoodEmoji = (rating: number) => {
    const emojis = ['😞', '😐', '🙂', '😊', '😄'];
    return emojis[rating - 1] || '😐';
  };

export const getMoodLabel = (rating: number) => {
    const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
    return labels[rating] || '';
  };

const getEnergyLabel = (energy: number) => {
    if (energy >= 4) return 'high energy ⚡⚡';
    if (energy >= 3) return 'medium energy ⚡';
    return 'low energy';
  };

const getStressLabel= (stress: number) => {
    if (stress >= 4) return 'high stress 💢💢';
    if (stress >= 3) return 'medium stress 💢';
    return 'low stress';
  };
  

// Today's data
export const todayData = ref({
    mood: 0,
    stress: 0,
    energy: 0,
    sleep: 0,
    sleepQuality: '',
    water: 0,
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: '',
    beverages: '',
    otherMeal: '',
    mealCompleted: false,
    workoutCompleted: false,
    workoutDuration: 0,
    workoutDate: '',
    caloriesBurned: 0,
    workoutType: '',
    workoutNotes: '',
    weight: 0, // Added weight tracking
    weightDate: '', // Added weight tracking
    mentalWellness: '',
    mentalWellnessCompleted: false, 
    physicalWellness: '',
    physicalWellnessCompleted: false
  
  });
export interface DailyHealthData {
  mood: number;
  energy: number;
  sleep: number;
  sleepQuality: string;
  water: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  beverages: string;
  otherMeal: string;
  mealCompleted: boolean;
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

export const recentActivities = ref([]);
// Recent activities data todayData
export const recentActivitiess = ref([
  {
    id: 1,
    type: 'order',
    description: 'Ordered Vitamin D supplement',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: 'completed'
  },
  {
    id: 2,
    type: 'sleep',
    description: 'Logged 7 hours of sleep',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    status: 'completed'
  },
  {
    id: 3,
    type: 'weight',
    description: 'Updated weight: 165 lbs',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    status: 'completed'
  },
  {
    id: 4,
    type: 'checkin',
    description: 'Completed daily check-in',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    status: 'completed'
  },
  {
    id: 5,
    type: 'supplement',
    description: 'Took Omega-3 supplement',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    status: 'completed'
  },{
    id: 6,
    type: 'supplement',
    description: 'yursky',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    status: 'completed'
  }
]);

// Activity summary stats
export const todayActivities = ref(4);
export const thisWeekActivities = ref(18);
export const streakDays = ref(7);

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
export async function hasDataForDate(date): Promise<boolean> {
  try {
    const data = await getDailyHealthData(date);
    return data !== null;
  } catch (error) {
    console.error("Error checking data for date:", error);
    return false;
  }
};

// Function to load real data from Firebase
export const loadRealData = async () => {

    try {
      isLoading.value = true;
      
      // Load weekly data
      const weeklyDataFromFirebase = await getWeeklyHealthData();
      weeklyData.value = weeklyDataFromFirebase;
      //console.log(weeklyData.value);
      // Load monthly data
      const monthlyDataFromFirebase = await getMonthlyHealthData();
      monthlyData.value = monthlyDataFromFirebase;
      
      console.log("Health data loaded from Firebase");
    } catch (error) {
      console.error("Error loading health data:", error);
    } finally {
      isLoading.value = false;
    }
  };

  export const addActivity = (type: string, description: string, timestamp) => {
    const newActivity = {
      id: Date.now(),
      type,
      description,
      timestamp: timestamp,
      status: 'completed'
    };
    
    recentActivities.value.unshift(newActivity);
    
    // Keep only last 5 activities
    if (recentActivities.value.length > 5) {
      recentActivities.value = recentActivities.value.slice(0, 5);
    }
    
    // Update stats
    todayActivities.value++;
    thisWeekActivities.value++;
    
    // Save to localStorage
    localStorage.setItem('recentActivities', JSON.stringify(recentActivities.value));
    localStorage.setItem('activityStats', JSON.stringify({
      today: todayActivities.value,
      week: thisWeekActivities.value,
      streak: streakDays.value
    }));
};

const duration = ref('hours');
const amount = ref('glasses');
export const loadActivity = async ()=> {
  const today = new Date().toISOString().split('T')[0];
  try {
    const savedData = await getDailyHealthData(today);
    const timestamp = savedData?.createdAt;
     if (todayData.value.mood){
    addActivity('mood','You have a ' + getMoodLabel(todayData.value.mood).toLowerCase() + ' mood ' + getMoodEmoji(todayData.value.mood) + ' today', timestamp.toDate()  );
    }

    if (todayData.value.energy){
      addActivity('energy','You have ' + getEnergyLabel(todayData.value.energy), timestamp.toDate());
    }

    if (todayData.value.sleep){
      if (todayData.value.sleep <= 1)
      {
         duration.value='hour';
      }
       addActivity('sleep','You slept for ' + todayData.value.sleep + ' ' + duration.value, timestamp.toDate());
    }

    if (todayData.value.water){
      if (todayData.value.water <= 1)
      {
         amount.value='glass';
      }
      addActivity('water','You drank ' + todayData.value.water + ' ' + amount.value + ' of water today', timestamp.toDate());
    }

    if (todayData.value.mealCompleted){
    
      addActivity('food','You logged your food intake for the day', timestamp.toDate());
    }

    if (todayData.value.workoutCompleted){
    
      addActivity('workout','You logged your workout for today', timestamp.toDate());
    }

     if (todayData.value.weight){
    
      addActivity('weight','You checked your weight', timestamp.toDate());
    }

    if (todayData.value.stress){
    
      addActivity('stress','You have ' + getStressLabel(todayData.value.energy), timestamp.toDate());
    }

    if (todayData.value.mentalWellness){
    
      addActivity('stress','You logged your mental and emotional wellness', timestamp.toDate());
    }

    if (todayData.value.physicalWellness){
    
      addActivity('stress','You logged your physical wellness', timestamp.toDate());
    }


  } catch (error) {
      console.error('Error loading today\'s data:', error);
  }

 
};