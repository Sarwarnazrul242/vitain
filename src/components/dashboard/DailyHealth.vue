<template>
    <div class="health-tracker">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">📊</span>
          Health Tracker & Goals
        </h2>
        <div class="date-display">
          {{ currentDate }}
        </div>
      </div>

       <!-- Authentication Status -->
      <div v-if="errors.database" class="auth-notice">
        <div class="auth-notice-content">
          <span class="auth-icon">🔐</span>
          <span class="auth-text">Please log in to save your health data</span>
        </div>
      </div>
  
      <!-- Today's Check-in -->
      <div class="checkin-section">
        <h3 class="subsection-title">Today's Check-in</h3>
        
        <div class="checkin-grid">
          <!-- Mood Tracker -->
          <div class="tracker-card">
            <div class="tracker-header">
              <span class="tracker-icon">😊</span>
              <h4 class="tracker-title">Mood</h4>
            </div>
            <div class="mood-scale">
              <div 
                v-for="rating in 5" 
                :key="rating"
                class="mood-option"
                :class="{ 'selected': todayData.mood === rating }"
                @click="todayData.mood = rating"
              >
                <span class="mood-emoji">{{ getMoodEmoji(rating) }}</span>
                <span class="mood-label">{{ getMoodLabel(rating) }}</span>
              </div>
            </div>
          </div>
  
          <!-- Energy Level -->
          <div class="tracker-card">
            <div class="tracker-header">
              <span class="tracker-icon">⚡</span>
              <h4 class="tracker-title">Energy Level</h4>
            </div>
            <div class="energy-scale">
              <div 
                v-for="rating in 5" 
                :key="rating"
                class="energy-option"
                :class="{ 'selected': todayData.energy === rating }"
                @click="todayData.energy = rating"
              >
                <div class="energy-bar" :style="{ height: rating * 8 + 'px' }"></div>
                <span class="energy-label">{{ rating }}</span>
              </div>
            </div>
          </div>
  
          <!-- Sleep Hours -->
          <div class="tracker-card">
            <div class="tracker-header">
              <span class="tracker-icon">😴</span>
              <h4 class="tracker-title">Sleep Hours</h4>
            </div>
            <div class="sleep-input">
              <input 
                v-model.number="todayData.sleep" 
                type="number" 
                min="0" 
                max="24" 
                step="0.5"
                class="sleep-field"
                placeholder="Hours"
              />
              <span class="sleep-unit">hours</span>
            </div>
            <div class="sleep-quality">
              <span class="quality-label">Quality:</span>
              <div class="quality-buttons">
                <button 
                  v-for="quality in ['Poor', 'Fair', 'Good', 'Excellent']" 
                  :key="quality"
                  class="quality-btn"
                  :class="{ 'selected': todayData.sleepQuality === quality }"
                  @click="todayData.sleepQuality = quality"
                >
                  {{ quality }}
                </button>
              </div>
            </div>
          </div>
  
          <!-- Water Intake -->
          <div class="tracker-card">
            <div class="tracker-header">
              <span class="tracker-icon">💧</span>
              <h4 class="tracker-title">Water Intake</h4>
            </div>
            <div class="water-tracker">
              <div class="water-display">
                <span class="water-amount">{{ todayData.water }}</span>
                <span class="water-unit">/ 8 glasses</span>
              </div>
              <div class="water-buttons">
                <button @click="addWater" class="water-btn add">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button @click="removeWater" class="water-btn remove">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="water-progress">
              <div class="water-bar">
                <div 
                  class="water-fill"
                  :style="{ width: (todayData.water / 8) * 100 + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Muscle Gain Tracking -->
          <div class="tracker-card">
            <div class="tracker-header">
              <span class="tracker-icon">💪</span>
              <h4 class="tracker-title">Workout</h4>
            </div>
            <div class="workout-tracker">
              <div class="workout-status">
                <div class="workout-indicator" :class="{ 'completed': todayData.workoutCompleted }">
                  <svg v-if="todayData.workoutCompleted" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span v-else class="workout-icon">💪</span>
                </div>
                <div class="workout-info">
                  <span class="workout-label">{{ todayData.workoutCompleted ? 'Workout Done' : 'No Workout' }}</span>
                  <div class="workout-stats" v-if="todayData.workoutCompleted">
                    <span class="workout-type" v-if="todayData.workoutType && todayData.workoutType !== 'quick'">{{ getWorkoutTypeLabel(todayData.workoutType) }}</span>
                    <span class="workout-time">{{ todayData.workoutDuration }} min</span>
                    <span class="workout-calories" v-if="todayData.caloriesBurned">{{ todayData.caloriesBurned }} cal</span>
                  </div>
                </div>
              </div>
              <div class="workout-actions">
                <button @click="openWorkoutModal" class="workout-btn log" v-if="!todayData.workoutCompleted">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Log
                </button>
                <button @click="undoWorkout" class="workout-btn undo" v-if="todayData.workoutCompleted">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Undo
                </button>
              </div>
            </div>
          </div>

          <!-- Weight Tracking -->
          <div class="tracker-card">
            <div class="tracker-header">
              <span class="tracker-icon">⚖️</span>
              <h4 class="tracker-title">Weight</h4>
            </div>
            <div class="weight-tracker">
              <div class="weight-display">
                <div class="weight-input-section">
                  <input 
                    v-model.number="todayData.weight" 
                    type="number" 
                    min="50" 
                    max="500" 
                    step="0.1"
                    class="weight-field"
                    placeholder="0.0"
                    @change="saveWeight"
                  />
                  <span class="weight-unit">lbs</span>
                </div>
                <div class="weight-status" v-if="todayData.weight">
                  <span class="weight-value">{{ todayData.weight }} lbs</span>
                  <span class="weight-date">{{ currentDate }}</span>
                </div>
              </div>
              <div class="weight-actions">
                <button @click="clearWeight" class="weight-btn clear" v-if="todayData.weight">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Save Button -->
        <div class="save-section">
          <button @click="saveTodayData" class="save-button" :disabled="isSaving">
            <svg v-if="!isSaving" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ isSaving ? 'Saving...' : 'Save Today\'s Data' }}
          </button>
        </div>
      </div>

      <!-- Summary Section -->
      <div class="summary-section">
        <div class="summary-header">
          <h3 class="subsection-title">Health Summary</h3>
          <div class="summary-toggle">
            <button 
              @click="summaryView = 'weekly'" 
              class="toggle-btn"
              :class="{ 'active': summaryView === 'weekly' }"
            >
              Weekly
            </button>
            <button 
              @click="summaryView = 'monthly'" 
              class="toggle-btn"
              :class="{ 'active': summaryView === 'monthly' }"
            >
              Monthly
            </button>
          </div>
        </div>
        
        <div class="summary-charts">
          <!-- Mood Chart -->
          <div class="chart-card">
            <h4 class="chart-title">Mood Trend</h4>
            <div class="chart-container">
              <div class="chart-bars">
                <div 
                  v-for="(day, index) in currentSummaryData" 
                  :key="index"
                  class="chart-bar mood-bar"
                  :style="{ height: (day.mood / 5) * 100 + '%' }"
                  :class="getMoodClass(day.mood)"
                >
                  <span class="bar-value">{{ day.mood }}</span>
                </div>
              </div>
              <div class="chart-labels">
                <span v-for="label in currentSummaryLabels" :key="label" class="chart-label">{{ label }}</span>
              </div>
            </div>
          </div>

          <!-- Energy Chart -->
          <div class="chart-card">
            <h4 class="chart-title">Energy Trend</h4>
            <div class="chart-container">
              <div class="chart-bars">
                <div 
                  v-for="(day, index) in currentSummaryData" 
                  :key="index"
                  class="chart-bar energy-bar"
                  :style="{ height: (day.energy / 5) * 100 + '%' }"
                  :class="getEnergyClass(day.energy)"
                >
                  <span class="bar-value">{{ day.energy }}</span>
                </div>
              </div>
              <div class="chart-labels">
                <span v-for="label in currentSummaryLabels" :key="label" class="chart-label">{{ label }}</span>
              </div>
            </div>
          </div>

          <!-- Sleep Chart -->
          <div class="chart-card">
            <h4 class="chart-title">Sleep Hours</h4>
            <div class="chart-container">
              <div class="chart-bars">
                <div 
                  v-for="(day, index) in currentSummaryData" 
                  :key="index"
                  class="chart-bar sleep-bar"
                  :style="{ height: (day.sleep / 10) * 100 + '%' }"
                  :class="getSleepClass(day.sleep)"
                >
                  <span class="bar-value">{{ day.sleep }}h</span>
                </div>
              </div>
              <div class="chart-labels">
                <span v-for="label in currentSummaryLabels" :key="label" class="chart-label">{{ label }}</span>
              </div>
            </div>
          </div>

          <!-- Water Chart -->
          <div class="chart-card">
            <h4 class="chart-title">Water Intake</h4>
            <div class="chart-container">
              <div class="chart-bars">
                <div 
                  v-for="(day, index) in currentSummaryData" 
                  :key="index"
                  class="chart-bar water-bar"
                  :style="{ height: (day.water / 8) * 100 + '%' }"
                  :class="getWaterClass(day.water)"
                >
                  <span class="bar-value">{{ day.water }}</span>
                </div>
              </div>
              <div class="chart-labels">
                <span v-for="label in currentSummaryLabels" :key="label" class="chart-label">{{ label }}</span>
              </div>
            </div>
          </div>

          <!-- Weight Chart --> 
          <div class="chart-card">
            <h4 class="chart-title">Weight Trend</h4>
            <div class="chart-container">
              <div class="chart-bars">
                <div 
                  v-for="(day, index) in currentSummaryData" 
                  :key="index"
                  class="chart-bar weight-bar"
                  :style="{ height: day.weight ? ((day.weight - 140) / 20) * 100 + '%' : '8px' }"
                  :class="getWeightClass(day.weight)"
                >
                  <span class="bar-value">{{ day.weight || '-' }}</span>
                </div>
              </div>
              <div class="chart-labels">
                <span v-for="label in currentSummaryLabels" :key="label" class="chart-label">{{ label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { 
    saveDailyHealthData, 
    getDailyHealthData, 
    getWeeklyHealthData, 
    getMonthlyHealthData,
    type DailyHealthData,
    type HealthSummaryData, duplicateDailyHealthRecords 
  } from '../../services/dailyHealth';
  import { getAuth } from 'firebase/auth';

  import { errors, clearError, ErrorType, AppError, isAppError, pastError, } from '../../services/auth';
  // Current date
  const currentDate = computed(() => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });
  
  // Firebase auth instance
  const auth = getAuth();
  
  // Today's data
  const todayData = ref({
    mood: 0,
    energy: 0,
    sleep: 0,
    sleepQuality: '',
    water: 0,
    workoutCompleted: false,
    workoutDuration: 0,
    workoutDate: '',
    caloriesBurned: 0,
    workoutType: '',
    workoutNotes: '',
    weight: 0, // Added weight tracking
    weightDate: '' // Added weight tracking
  });
  
  // Weekly data from Firebase
  const weeklyData = ref<HealthSummaryData[]>([]);

  // Monthly data from Firebase
  const monthlyData = ref<HealthSummaryData[]>([]);

  // Loading states
  const isLoading = ref(false);
  const isSaving = ref(false);

  // Summary view state
  const summaryView = ref('weekly');

  // Function to load real data from Firebase
  const loadRealData = async () => {

    try {
      isLoading.value = true;
      
      // Load weekly data
      const weeklyDataFromFirebase = await getWeeklyHealthData();
      weeklyData.value = weeklyDataFromFirebase;
      
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

  // Computed properties for summary data
  const currentSummaryData = computed(() => {
    return summaryView.value === 'weekly' ? weeklyData.value : monthlyData.value;
  });

  const currentSummaryLabels = computed(() => {
    if (summaryView.value === 'weekly') {
      return ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    } else {
      // Monthly labels - show week numbers or dates
      return Array.from({ length: 30 }, (_, i) => i + 1);
    }
  });
  
  // Modal states
  const showWeightModal = ref(false);
  const showWorkoutModal = ref(false);

  // Emit events for modal management
  const emit = defineEmits(['showWorkoutModal']);

  // Methods to show modals
  const openWorkoutModal = () => {
    emit('showWorkoutModal', { 
      workoutDurationInput: workoutDurationInput.value,
      caloriesInput: caloriesInput.value,
      workoutType: workoutType.value,
      workoutNotes: workoutNotes.value
    });
  };
  
  // Input values
  const workoutDurationInput = ref('');
  const caloriesInput = ref('');
  const workoutNotes = ref('');
  const workoutType = ref('');

  // Calorie calculation helper
  const calculateCalories = (duration: number, type: string) => {
    const calorieRates = {
      cardio: 8,
      strength: 6,
      yoga: 3,
      pilates: 4,
      hiit: 10,
      walking: 4,
      running: 12,
      cycling: 8,
      swimming: 9,
      other: 6
    };
    
    const rate = calorieRates[type as keyof typeof calorieRates] || 6;
    return Math.round(duration * rate);
  };

  // Auto-calculate calories when duration or type changes
  const updateCalories = () => {
    if (workoutDurationInput.value && workoutType.value) {
      const duration = Number(workoutDurationInput.value);
      const calories = calculateCalories(duration, workoutType.value);
      caloriesInput.value = calories.toString();
    }
  };
  
  // Methods
  const getMoodEmoji = (rating: number) => {
    const emojis = ['😞', '😐', '🙂', '😊', '😄'];
    return emojis[rating - 1] || '😐';
  };
  
  const getMoodLabel = (rating: number) => {
    const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
    return labels[rating] || '';
  };
  
  const addWater = () => {
    if (todayData.value.water < 12) {
      todayData.value.water++;
    }
  };
  
  const removeWater = () => {
    if (todayData.value.water > 0) {
      todayData.value.water--;
    }
  };

  const saveWeight = async () => {
    // if (!auth.currentUser) {
    //   alert('Please log in to save your weight data');
    //   return;
    // }

    const today = new Date().toISOString().split('T')[0];
    todayData.value.weightDate = today;
    
    //Should not save here but in saveDailyHealthData
    // try {
    //   await saveDailyHealthData(today, todayData.value as DailyHealthData);
    //   await loadRealData(); // Update charts
    //   console.log('Weight saved to Firebase:', todayData.value.weight);
    // } catch (error) {
    //   console.error('Error saving weight:', error);
    //   alert('Failed to save weight data. Please try again.');
    // }
  };

  const clearWeight = async () => {
    // if (!auth.currentUser) {
    //   alert('Please log in to clear your weight data');
    //   return;
    // }

    todayData.value.weight = 0;
    todayData.value.weightDate = '';
    
    //Clear then hit submituserdata, clear should just clear what they typed
  //   const today = new Date().toISOString().split('T')[0];
  //  try {
  //     await saveDailyHealthData(today, todayData.value as DailyHealthData);
  //     await loadRealData(); // Update charts
  //     console.log('Weight cleared from Firebase');
  //   } catch (error) {
  //     console.error('Error clearing weight:', error);
  //     alert('Failed to clear weight data. Please try again.');
  //   } 
  };
  
  const saveTodayData = async () => {
    
    //Clears errors

    clearError();
    if (isSaving.value) return; // Prevent multiple saves

    try {
      isSaving.value = true;
      
      // Save to Firebase
      const today = new Date().toISOString().split('T')[0];
      await saveDailyHealthData(today, todayData.value as DailyHealthData);
      
      // Reload real data to update charts
      await loadRealData();
      
      
    } catch (error) {
      console.error('Error saving daily health data:', error);

    } finally {
      isSaving.value = false;
    }
  };

  const submitWorkout = async (workoutData: any) => {
    // if (!auth.currentUser) {
    //   alert('Please log in to log your workout');
    //   return;
    // }

    if (workoutData.duration && !isNaN(Number(workoutData.duration))) {
      todayData.value.workoutDuration = Number(workoutData.duration);
      todayData.value.workoutCompleted = true;
      todayData.value.workoutDate = new Date().toISOString().split('T')[0];
      todayData.value.caloriesBurned = Number(workoutData.calories) || 0;
      todayData.value.workoutType = workoutData.type || '';
      todayData.value.workoutNotes = workoutData.notes || '';
      
      //Should not submit here but in saveDailyHealthData
      // try {
      //   await saveDailyHealthData(todayData.value.workoutDate, todayData.value as DailyHealthData);
      //   await loadRealData(); // Update charts
      //   console.log('Workout logged to Firebase:', workoutData);
      // } catch (error) {
      //   console.error('Error logging workout:', error);
      //   alert('Failed to log workout. Please try again.');
      // }
      
      workoutDurationInput.value = '';
      caloriesInput.value = '';
      workoutNotes.value = '';
      workoutType.value = '';
    }
  };
  
  const undoWorkout = async () => {
    // if (!auth.currentUser) {
    //   alert('Please log in to undo your workout');
    //   return;
    // }

    todayData.value.workoutCompleted = false;
    todayData.value.workoutDuration = 0;
    todayData.value.workoutDate = '';
    todayData.value.caloriesBurned = 0;
    todayData.value.workoutType = '';
    todayData.value.workoutNotes = '';
    
    //Clear but not database, in submit in saveDailyHealthData it will update record for the day
    // try {
    //   const today = new Date().toISOString().split('T')[0];
    //   await saveDailyHealthData(today, todayData.value as DailyHealthData);
    //   await loadRealData(); // Update charts
    //   console.log('Workout undone in Firebase');
    // } catch (error) {
    //   console.error('Error undoing workout:', error);
    //   alert('Failed to undo workout. Please try again.');
    // }
  };
  
  // Chart helper methods
  const getMoodClass = (mood: number) => {
    if (mood >= 4) return 'high-mood';
    if (mood >= 3) return 'medium-mood';
    return 'low-mood';
  };
  
  const getEnergyClass = (energy: number) => {
    if (energy >= 4) return 'high-energy';
    if (energy >= 3) return 'medium-energy';
    return 'low-energy';
  };
  
  const getSleepClass = (sleep: number) => {
    if (sleep >= 8) return 'good-sleep';
    if (sleep >= 7) return 'fair-sleep';
    return 'poor-sleep';
  };
  
  const getWaterClass = (water: number) => {
    if (water >= 8) return 'good-water';
    if (water >= 6) return 'fair-water';
    return 'poor-water';
  };

  const getWeightClass = (weight: number) => {
    if (weight > 160) return 'high-weight';
    if (weight > 140) return 'medium-weight';
    return 'low-weight';
  };

  const getWorkoutTypeLabel = (type: string) => {
    switch (type) {
      case 'cardio':
        return 'Cardio';
      case 'strength':
        return 'Strength';
      case 'yoga':
        return 'Yoga';
      case 'pilates':
        return 'Pilates';
      case 'hiit':
        return 'HIIT';
      case 'walking':
        return 'Walking';
      case 'running':
        return 'Running';
      case 'cycling':
        return 'Cycling';
      case 'swimming':
        return 'Swimming';
      default:
        return type;
    }
  };
  
  onMounted(async () => {
    // Load today's data if exists
    clearError();
    const today = new Date().toISOString().split('T')[0];

    try {
      const savedData = await getDailyHealthData(today);
      if (savedData) {
        todayData.value = savedData;
      }
    } catch (error) {
      console.error('Error loading today\'s data:', error);
    }
    
    
    // Load real data for charts
    await loadRealData();

    // Listen for modal submissions
    window.addEventListener('workoutSubmitted', (event: any) => {
      submitWorkout(event.detail);
    });
  });

  // Watch for summary view changes to refresh data
  watch(summaryView, async () => {
    await loadRealData();
  });
  </script>
  
  <style scoped>
  .health-tracker {
    @apply mb-8;
  }
  
  .section-header {
    @apply flex items-center justify-between mb-6;
  }
  
  .section-title {
    @apply text-2xl font-bold text-white flex items-center gap-2;
  }
  
  .title-icon {
    @apply text-2xl;
  }
  
  .date-display {
    @apply text-gray-400 font-medium;
  }
  
  .subsection-title {
    @apply text-xl font-bold text-white mb-4;
  }
  
  /* Check-in Section */
  .checkin-section {
    @apply mb-8;
  }
  
  .checkin-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6;
  }
  
  .tracker-card {
    @apply bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 min-h-[200px] flex flex-col;
  }
  
  .tracker-card:hover {
    @apply transform -translate-y-1 shadow-lg;
  }
  
  .tracker-header {
    @apply flex items-center gap-2 mb-3;
  }
  
  .tracker-icon {
    @apply text-xl;
  }
  
  .tracker-title {
    @apply text-white font-semibold text-sm;
  }
  
  /* Mood Scale */
  .mood-scale {
    @apply flex justify-between flex-wrap gap-1;
  }
  
  .mood-option {
    @apply flex flex-col items-center gap-1 cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-white/10 flex-1;
  }
  
  .mood-option.selected {
    @apply bg-[#4ADE80]/20 border border-[#4ADE80]/30;
  }
  
  .mood-emoji {
    @apply text-lg;
  }
  
  .mood-label {
    @apply text-xs text-gray-400 text-center;
  }
  
  /* Energy Scale */
  .energy-scale {
    @apply flex justify-between items-end h-20;
  }
  
  .energy-option {
    @apply flex flex-col items-center gap-1 cursor-pointer p-1 rounded-lg transition-all duration-300 hover:bg-white/10;
  }
  
  .energy-option.selected {
    @apply bg-[#3B82F6]/20 border border-[#3B82F6]/30;
  }
  
  .energy-bar {
    @apply w-4 bg-gradient-to-t from-[#3B82F6] to-[#60A5FA] rounded-t;
    min-height: 8px;
  }
  
  .energy-label {
    @apply text-xs text-gray-400;
  }
  
  /* Sleep Input */
  .sleep-input {
    @apply flex items-center gap-2 mb-3;
  }
  
  .sleep-field {
    @apply bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#4ADE80] w-20 transition-colors duration-300 text-sm;
  }
  
  .sleep-unit {
    @apply text-gray-400 text-xs;
  }
  
  .sleep-quality {
    @apply flex flex-col gap-2;
  }
  
  .quality-label {
    @apply text-gray-400 text-xs;
  }
  
  .quality-buttons {
    @apply flex flex-wrap gap-1;
  }
  
  .quality-btn {
    @apply px-2 py-1 text-xs rounded-lg border border-white/20 text-gray-400 hover:bg-white/10 transition-all duration-300;
  }
  
  .quality-btn.selected {
    @apply bg-[#4ADE80] text-white border-[#4ADE80];
  }
  
  /* Water Tracker */
  .water-tracker {
    @apply flex items-center justify-between mb-3;
  }
  
  .water-display {
    @apply flex items-baseline gap-1;
  }
  
  .water-amount {
    @apply text-2xl font-bold text-[#3B82F6];
  }
  
  .water-unit {
    @apply text-gray-400 text-xs;
  }
  
  .water-buttons {
    @apply flex gap-1;
  }
  
  .water-btn {
    @apply w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300;
  }
  
  .water-btn.add {
    @apply bg-[#3B82F6] text-white hover:bg-[#2563EB] hover:scale-105;
  }
  
  .water-btn.remove {
    @apply bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30;
  }
  
  .water-progress {
    @apply w-full;
  }
  
  .water-bar {
    @apply w-full h-2 bg-white/10 rounded-full overflow-hidden;
  }
  
  .water-fill {
    @apply h-full bg-gradient-to-r from-[#3B82F6] to-[#4ADE80] transition-all duration-500;
  }
  
  /* Workout Tracking */
  .workout-tracker {
    @apply flex flex-col gap-3;
  }
  
  .workout-status {
    @apply flex items-center gap-2;
  }
  
  .workout-indicator {
    @apply w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-xl;
  }
  
  .workout-indicator.completed {
    @apply bg-[#4ADE80] text-white;
  }
  
  .workout-icon {
    @apply text-xl;
  }
  
  .workout-info {
    @apply flex flex-col;
  }
  
  .workout-label {
    @apply text-white font-medium text-xs;
  }
  
  .workout-stats {
    @apply flex items-baseline gap-2 text-gray-400 text-xs;
  }
  
  .workout-type {
    @apply font-medium text-gray-400 text-xs;
  }
  
  .workout-time {
    @apply font-medium;
  }
  
  .workout-calories {
    @apply font-medium;
  }
  
  .workout-actions {
    @apply flex gap-1;
  }
  
  .workout-btn {
    @apply flex items-center px-2 py-1 text-xs rounded-lg transition-colors duration-300 hover:scale-105;
  }
  
  .workout-btn.complete {
    @apply bg-[#4ADE80] text-white hover:bg-[#3B82F6] shadow-sm;
  }
  
  .workout-btn.log {
    @apply bg-[#3B82F6] text-white hover:bg-[#2563EB] shadow-sm;
  }
  
  .workout-btn.undo {
    @apply bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:text-red-300;
  }

  /* Weight Tracking */
  .weight-tracker {
    @apply flex flex-col gap-3;
  }

  .weight-display {
    @apply flex flex-col gap-2;
  }

  .weight-input-section {
    @apply flex items-center gap-2;
  }

  .weight-field {
    @apply bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#4ADE80] w-20 transition-colors duration-300 text-sm;
  }

  .weight-unit {
    @apply text-gray-400 text-xs;
  }

  .weight-status {
    @apply flex items-center gap-2 text-gray-400 text-xs;
  }

  .weight-value {
    @apply font-medium;
  }

  .weight-date {
    @apply text-gray-500;
  }

  .weight-actions {
    @apply flex justify-end;
  }

  .weight-btn {
    @apply flex items-center px-3 py-1 text-xs rounded-lg border border-white/20 text-gray-400 hover:bg-white/10 transition-all duration-300;
  }

  .weight-btn.clear {
    @apply bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30;
  }
  
  /* Save Button */
  .save-section {
    @apply flex justify-center;
  }
  
  .save-button {
    @apply flex items-center px-8 py-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg;
  }
  
  .save-button:disabled {
    @apply opacity-50 cursor-not-allowed hover:scale-100;
  }

  /* Authentication Notice */
  .auth-notice {
    @apply mb-6;
  }
  
  .auth-notice-content {
    @apply flex items-center gap-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 text-yellow-300;
  }
  
  .auth-icon {
    @apply text-xl;
  }
  
  .auth-text {
    @apply font-medium;
  }
  
  /* Weekly Summary */
  .summary-section {
    @apply mt-8;
  }
  
  .summary-header {
    @apply flex items-center justify-between mb-6;
  }
  
  .summary-toggle {
    @apply flex gap-2;
  }
  
  .toggle-btn {
    @apply px-4 py-2 text-sm font-medium rounded-lg border border-white/20 text-gray-400 hover:bg-white/10 transition-colors duration-300;
  }
  
  .toggle-btn.active {
    @apply bg-[#3B82F6] text-white border-[#3B82F6];
  }
  
  .summary-charts {
    @apply grid grid-cols-1 md:grid-cols-2 gap-6;
  }
  
  .chart-card {
    @apply bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300;
  }
  
  .chart-card:hover {
    @apply transform -translate-y-1 shadow-lg;
  }
  
  .chart-title {
    @apply text-white font-semibold mb-6 text-center;
  }
  
  .chart-container {
    @apply h-48;
  }
  
  .chart-bars {
    @apply flex items-end justify-between h-40 mb-3;
  }
  
  .chart-bar {
    @apply w-10 rounded-t-lg relative transition-all duration-300;
    min-height: 8px;
  }
  
  .bar-value {
    @apply absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium;
  }
  
  .chart-labels {
    @apply flex justify-between;
  }
  
  .chart-label {
    @apply text-gray-400 text-xs w-10 text-center;
  }
  
  /* Chart Colors */
  .mood-bar.high-mood {
    @apply bg-[#4ADE80];
  }
  
  .mood-bar.medium-mood {
    @apply bg-[#3B82F6];
  }
  
  .mood-bar.low-mood {
    @apply bg-red-500;
  }
  
  .energy-bar.high-energy {
    @apply bg-[#4ADE80];
  }
  
  .energy-bar.medium-energy {
    @apply bg-[#3B82F6];
  }
  
  .energy-bar.low-energy {
    @apply bg-yellow-500;
  }
  
  .sleep-bar.good-sleep {
    @apply bg-[#4ADE80];
  }
  
  .sleep-bar.fair-sleep {
    @apply bg-[#3B82F6];
  }
  
  .sleep-bar.poor-sleep {
    @apply bg-red-500;
  }
  
  .water-bar.good-water {
    @apply bg-[#4ADE80];
  }
  
  .water-bar.fair-water {
    @apply bg-[#3B82F6];
  }
  
  .water-bar.poor-water {
    @apply bg-yellow-500;
  }

  .weight-bar.high-weight {
    @apply bg-[#4ADE80];
  }

  .weight-bar.medium-weight {
    @apply bg-[#3B82F6];
  }

  .weight-bar.low-weight {
    @apply bg-red-500;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .checkin-grid {
      @apply grid-cols-1 gap-4;
    }
    
    .goals-grid {
      @apply grid-cols-1 gap-4;
    }
    
    .summary-charts {
      @apply grid-cols-1 gap-4;
    }
    
    .chart-bars {
      @apply h-32;
    }
    
    .chart-bar {
      @apply w-8;
    }
    
    .chart-label {
      @apply w-8;
    }
    
    .tracker-card {
      @apply min-h-[180px];
    }
    
    .mood-scale {
      @apply gap-0;
    }
    
    .mood-option {
      @apply p-1;
    }
    
    .energy-scale {
      @apply h-16;
    }
    
    .energy-bar {
      @apply w-3;
    }

    /* Modal responsive */
    .modal-overlay {
      @apply p-2;
    }

    .modal-content {
      @apply max-w-sm p-4;
    }

    .form-row {
      @apply flex-col gap-3;
    }

    .modal-actions {
      @apply flex-col gap-2;
    }

    .modal-button {
      @apply w-full;
    }
  }
  </style>