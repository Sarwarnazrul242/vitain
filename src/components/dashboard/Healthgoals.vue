<template>
  <div class="health-goals">
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-icon">🎯</span>
        Health Goals Progress
      </h2>
      <router-link to="/goals" class="view-all-link">
        View All Goals
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>

    <div class="goals-grid">
      <!-- Weight Loss Goal -->
      <div class="goal-card">
        <div class="goal-header">
          <div class="goal-icon">⚖️</div>
          <div class="goal-info">
            <h3 class="goal-title">Weight Loss</h3>
            <p class="goal-subtitle">{{ weightProgress.current }} lbs → {{ weightProgress.target }} lbs</p>
          </div>
          <div class="goal-status" :class="weightProgress.status">
            {{ weightProgress.status }}
          </div>
        </div>
        
        <div class="progress-section">
          <div class="progress-bar">
            <div 
              class="progress-fill weight-progress"
              :style="{ width: weightProgress.percentage + '%' }"
            ></div>
          </div>
          <div class="progress-stats">
            <span class="progress-text">{{ weightProgress.lost }} lbs lost</span>
            <span class="progress-percentage">{{ weightProgress.percentage }}%</span>
          </div>
        </div>
        
        <div class="goal-actions">
          <button @click="showWeightModal = true" class="quick-add-button">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Log Weight
          </button>
        </div>
      </div>

      <!-- Energy Levels Goal -->
      <div class="goal-card">
        <div class="goal-header">
          <div class="goal-icon">⚡</div>
          <div class="goal-info">
            <h3 class="goal-title">Energy Levels</h3>
            <p class="goal-subtitle">Weekly average: {{ energyProgress.average }}/5</p>
          </div>
          <div class="goal-status" :class="energyProgress.status">
            {{ energyProgress.status }}
          </div>
        </div>
        
        <div class="energy-chart">
          <div class="chart-bars">
            <div 
              v-for="(day, index) in energyProgress.weeklyData" 
              :key="index"
              class="chart-bar"
              :style="{ height: (day.value / 5) * 100 + '%' }"
              :class="day.value >= 4 ? 'high-energy' : day.value >= 3 ? 'medium-energy' : 'low-energy'"
            >
              <span class="bar-value">{{ day.value }}</span>
            </div>
          </div>
          <div class="chart-labels">
            <span v-for="day in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="day" class="chart-label">{{ day }}</span>
          </div>
        </div>
        
        <div class="goal-actions">
          <button @click="showEnergyModal = true" class="quick-add-button">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Log Energy
          </button>
        </div>
      </div>

      <!-- Sleep Quality Goal -->
      <div class="goal-card">
        <div class="goal-header">
          <div class="goal-icon">😴</div>
          <div class="goal-info">
            <h3 class="goal-title">Sleep Quality</h3>
            <p class="goal-subtitle">Target: {{ sleepProgress.target }} hours</p>
          </div>
          <div class="goal-status" :class="sleepProgress.status">
            {{ sleepProgress.status }}
          </div>
        </div>
        
        <div class="sleep-stats">
          <div class="sleep-metric">
            <span class="metric-label">Last Night</span>
            <span class="metric-value">{{ sleepProgress.lastNight }}h</span>
          </div>
          <div class="sleep-metric">
            <span class="metric-label">Weekly Avg</span>
            <span class="metric-value">{{ sleepProgress.weeklyAverage }}h</span>
          </div>
          <div class="sleep-metric">
            <span class="metric-label">Best Night</span>
            <span class="metric-value">{{ sleepProgress.bestNight }}h</span>
          </div>
        </div>
        
        <div class="goal-actions">
          <button @click="showSleepModal = true" class="quick-add-button">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Log Sleep
          </button>
        </div>
      </div>

      <!-- Muscle Gain Goal -->
      <div class="goal-card">
        <div class="goal-header">
          <div class="goal-icon">💪</div>
          <div class="goal-info">
            <h3 class="goal-title">Muscle Gain</h3>
            <p class="goal-subtitle">{{ muscleProgress.workoutsThisWeek }}/{{ muscleProgress.targetWorkouts }} workouts this week</p>
          </div>
          <div class="goal-status" :class="muscleProgress.status">
            {{ muscleProgress.status }}
          </div>
        </div>
        
        <div class="workout-progress">
          <div class="workout-stats">
            <div class="workout-metric">
              <span class="metric-label">This Week</span>
              <span class="metric-value">{{ muscleProgress.workoutsThisWeek }}</span>
            </div>
            <div class="workout-metric">
              <span class="metric-label">Last Week</span>
              <span class="metric-value">{{ muscleProgress.workoutsLastWeek }}</span>
            </div>
            <div class="workout-metric">
              <span class="metric-label">Streak</span>
              <span class="metric-value">{{ muscleProgress.currentStreak }} days</span>
            </div>
          </div>
          
          <div class="workout-calendar">
            <div 
              v-for="(day, index) in muscleProgress.weeklyWorkouts" 
              :key="index"
              class="calendar-day"
              :class="{ 'worked-out': day.workedOut }"
            >
              {{ day.day }}
            </div>
          </div>
        </div>
        
        <div class="goal-actions">
          <button @click="logWorkout" class="quick-add-button">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Log Workout
          </button>
        </div>
      </div>
    </div>

    <!-- Weight Modal -->
    <div v-if="showWeightModal" class="modal-overlay" @click="showWeightModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Log Weight</h3>
          <button @click="showWeightModal = false" class="modal-close">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <label class="input-label">Current Weight (lbs)</label>
          <input 
            v-model="weightInput" 
            type="number" 
            class="modal-input"
            placeholder="Enter your weight"
            @keyup.enter="submitWeight"
          />
        </div>
        <div class="modal-actions">
          <button @click="showWeightModal = false" class="modal-button secondary">Cancel</button>
          <button @click="submitWeight" class="modal-button primary">Save</button>
        </div>
      </div>
    </div>

    <!-- Energy Modal -->
    <div v-if="showEnergyModal" class="modal-overlay" @click="showEnergyModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Log Energy Level</h3>
          <button @click="showEnergyModal = false" class="modal-close">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <label class="input-label">Energy Level (1-5)</label>
          <div class="energy-rating">
            <button 
              v-for="rating in 5" 
              :key="rating"
              @click="energyInput = rating"
              class="rating-button"
              :class="{ active: energyInput === rating }"
            >
              {{ rating }}
            </button>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="showEnergyModal = false" class="modal-button secondary">Cancel</button>
          <button @click="submitEnergy" class="modal-button primary">Save</button>
        </div>
      </div>
    </div>

    <!-- Sleep Modal -->
    <div v-if="showSleepModal" class="modal-overlay" @click="showSleepModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Log Sleep</h3>
          <button @click="showSleepModal = false" class="modal-close">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <label class="input-label">Hours Slept</label>
          <input 
            v-model="sleepInput" 
            type="number" 
            step="0.1"
            class="modal-input"
            placeholder="Enter hours slept"
            @keyup.enter="submitSleep"
          />
        </div>
        <div class="modal-actions">
          <button @click="showSleepModal = false" class="modal-button secondary">Cancel</button>
          <button @click="submitSleep" class="modal-button primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// Modal states
const showWeightModal = ref(false);
const showEnergyModal = ref(false);
const showSleepModal = ref(false);

// Input values
const weightInput = ref('');
const energyInput = ref(3);
const sleepInput = ref('');

// Weight Loss Progress
const weightProgress = ref({
  current: 165,
  target: 150,
  lost: 10,
  percentage: 67,
  status: 'on-track'
});

// Energy Levels Progress
const energyProgress = ref({
  average: 3.8,
  status: 'good',
  weeklyData: [
    { day: 'Monday', value: 4 },
    { day: 'Tuesday', value: 3 },
    { day: 'Wednesday', value: 4 },
    { day: 'Thursday', value: 5 },
    { day: 'Friday', value: 3 },
    { day: 'Saturday', value: 4 },
    { day: 'Sunday', value: 4 }
  ]
});

// Sleep Quality Progress
const sleepProgress = ref({
  target: 8,
  lastNight: 7.5,
  weeklyAverage: 7.8,
  bestNight: 9.2,
  status: 'good'
});

// Muscle Gain Progress
const muscleProgress = ref({
  targetWorkouts: 4,
  workoutsThisWeek: 3,
  workoutsLastWeek: 4,
  currentStreak: 5,
  status: 'on-track',
  weeklyWorkouts: [
    { day: 'M', workedOut: true },
    { day: 'T', workedOut: false },
    { day: 'W', workedOut: true },
    { day: 'T', workedOut: true },
    { day: 'F', workedOut: false },
    { day: 'S', workedOut: false },
    { day: 'S', workedOut: false }
  ]
});

// Methods
const submitWeight = () => {
  if (weightInput.value && !isNaN(Number(weightInput.value))) {
    const oldWeight = weightProgress.value.current;
    weightProgress.value.current = Number(weightInput.value);
    weightProgress.value.lost = weightProgress.value.target + 10 - weightProgress.value.current;
    weightProgress.value.percentage = Math.round(((weightProgress.value.target + 10 - weightProgress.value.current) / 10) * 100);
    
    console.log('Weight logged:', weightInput.value);
    localStorage.setItem('weightProgress', JSON.stringify(weightProgress.value));
    showWeightModal.value = false;
    weightInput.value = '';
  }
};

const submitEnergy = () => {
  if (energyInput.value >= 1 && energyInput.value <= 5) {
    const today = new Date().getDay();
    energyProgress.value.weeklyData[today].value = energyInput.value;
    energyProgress.value.average = Math.round(
      energyProgress.value.weeklyData.reduce((sum, day) => sum + day.value, 0) / 7 * 10
    ) / 10;
    
    console.log('Energy logged:', energyInput.value);
    localStorage.setItem('energyProgress', JSON.stringify(energyProgress.value));
    showEnergyModal.value = false;
    energyInput.value = 3;
  }
};

const submitSleep = () => {
  if (sleepInput.value && !isNaN(Number(sleepInput.value))) {
    sleepProgress.value.lastNight = Number(sleepInput.value);
    
    console.log('Sleep logged:', sleepInput.value);
    localStorage.setItem('sleepProgress', JSON.stringify(sleepProgress.value));
    showSleepModal.value = false;
    sleepInput.value = '';
  }
};

const logWorkout = () => {
  const today = new Date().getDay();
  muscleProgress.value.weeklyWorkouts[today].workedOut = true;
  muscleProgress.value.workoutsThisWeek++;
  
  console.log('Workout logged');
  localStorage.setItem('muscleProgress', JSON.stringify(muscleProgress.value));
};

onMounted(() => {
  // Load saved progress from localStorage
  const savedWeight = localStorage.getItem('weightProgress');
  const savedEnergy = localStorage.getItem('energyProgress');
  const savedSleep = localStorage.getItem('sleepProgress');
  const savedMuscle = localStorage.getItem('muscleProgress');
  
  if (savedWeight) weightProgress.value = JSON.parse(savedWeight);
  if (savedEnergy) energyProgress.value = JSON.parse(savedEnergy);
  if (savedSleep) sleepProgress.value = JSON.parse(savedSleep);
  if (savedMuscle) muscleProgress.value = JSON.parse(savedMuscle);
});
</script>

<style scoped>
.health-goals {
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

.view-all-link {
  @apply text-[#4ADE80] hover:text-[#3B82F6] transition-colors duration-300 font-medium flex items-center;
}

.goals-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.goal-card {
  @apply bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300;
}

.goal-card:hover {
  @apply transform -translate-y-1 shadow-lg;
}

.goal-header {
  @apply flex items-center gap-4 mb-4;
}

.goal-icon {
  @apply text-2xl;
}

.goal-info {
  @apply flex-1;
}

.goal-title {
  @apply text-lg font-bold text-white mb-1;
}

.goal-subtitle {
  @apply text-gray-400 text-sm;
}

.goal-status {
  @apply px-3 py-1 rounded-full text-xs font-medium;
}

.goal-status.on-track {
  @apply bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/30;
}

.goal-status.good {
  @apply bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30;
}

.goal-status.needs-improvement {
  @apply bg-yellow-500/20 text-yellow-400 border border-yellow-500/30;
}

.goal-status.poor {
  @apply bg-red-500/20 text-red-400 border border-red-500/30;
}

/* Progress Bars */
.progress-section {
  @apply mb-4;
}

.progress-bar {
  @apply w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2;
}

.progress-fill {
  @apply h-full transition-all duration-500;
}

.weight-progress {
  @apply bg-gradient-to-r from-[#4ADE80] to-[#3B82F6];
}

.progress-stats {
  @apply flex justify-between items-center;
}

.progress-text {
  @apply text-gray-400 text-sm;
}

.progress-percentage {
  @apply text-[#4ADE80] font-bold;
}

/* Energy Chart */
.energy-chart {
  @apply mb-4;
}

.chart-bars {
  @apply flex items-end justify-between h-20 mb-2;
}

.chart-bar {
  @apply w-8 rounded-t-lg relative transition-all duration-300;
  min-height: 8px;
}

.chart-bar.high-energy {
  @apply bg-[#4ADE80];
}

.chart-bar.medium-energy {
  @apply bg-[#3B82F6];
}

.chart-bar.low-energy {
  @apply bg-yellow-500;
}

.bar-value {
  @apply absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white;
}

.chart-labels {
  @apply flex justify-between;
}

.chart-label {
  @apply text-gray-400 text-xs w-8 text-center;
}

/* Sleep Stats */
.sleep-stats {
  @apply grid grid-cols-3 gap-4 mb-4;
}

.sleep-metric {
  @apply text-center;
}

.metric-label {
  @apply text-gray-400 text-xs block mb-1;
}

.metric-value {
  @apply text-white font-bold text-lg;
}

/* Workout Progress */
.workout-progress {
  @apply mb-4;
}

.workout-stats {
  @apply grid grid-cols-3 gap-4 mb-4;
}

.workout-calendar {
  @apply flex justify-between;
}

.calendar-day {
  @apply w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-gray-400 transition-all duration-300;
}

.calendar-day.worked-out {
  @apply bg-[#4ADE80] text-white border-[#4ADE80];
}

/* Goal Actions */
.goal-actions {
  @apply flex justify-center;
}

.quick-add-button {
  @apply flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-medium rounded-lg hover:scale-105 transition-all duration-300;
}

/* Modal Styles */
.modal-overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50;
}

.modal-content {
  @apply bg-gray-900 border border-white/10 rounded-xl p-6 w-full max-w-md mx-4;
}

.modal-header {
  @apply flex items-center justify-between mb-4;
}

.modal-title {
  @apply text-xl font-bold text-white;
}

.modal-close {
  @apply text-gray-400 hover:text-white transition-colors duration-300;
}

.modal-body {
  @apply mb-6;
}

.input-label {
  @apply block text-gray-300 text-sm font-medium mb-2;
}

.modal-input {
  @apply w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors duration-300;
}

.energy-rating {
  @apply flex gap-2;
}

.rating-button {
  @apply w-12 h-12 rounded-lg border border-white/10 bg-white/5 text-white font-medium transition-all duration-300 hover:bg-white/10;
}

.rating-button.active {
  @apply bg-white/20 border-white/30;
}

.modal-actions {
  @apply flex gap-3 justify-end;
}

.modal-button {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-300;
}

.modal-button.primary {
  @apply bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] hover:scale-105 text-white border-none;
}

.modal-button.secondary {
  @apply bg-transparent text-gray-400 hover:text-white border border-white/10 hover:border-white/20;
}

/* Responsive design */
@media (max-width: 768px) {
  .goals-grid {
    @apply grid-cols-1 gap-4;
  }
  
  .sleep-stats,
  .workout-stats {
    @apply grid-cols-3 gap-2;
  }
  
  .chart-bars {
    @apply h-16;
  }
  
  .chart-bar {
    @apply w-6;
  }
  
  .calendar-day {
    @apply w-6 h-6 text-xs;
  }
  
  .modal-content {
    @apply mx-4 w-auto;
  }
}
</style>