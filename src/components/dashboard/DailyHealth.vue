<template>
    <div class="daily-health">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">📊</span>
          Daily Health Tracker
        </h2>
        <div class="date-display">
          {{ currentDate }}
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
        </div>
  
        <!-- Supplements -->
        <div class="supplements-section">
          <h4 class="supplements-title">Supplements Taken Today</h4>
          <div class="supplements-grid">
            <div 
              v-for="supplement in supplements" 
              :key="supplement.id"
              class="supplement-item"
              :class="{ 'taken': todayData.supplements.includes(supplement.id) }"
              @click="toggleSupplement(supplement.id)"
            >
              <div class="supplement-checkbox">
                <svg v-if="todayData.supplements.includes(supplement.id)" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="supplement-info">
                <span class="supplement-name">{{ supplement.name }}</span>
                <span class="supplement-dose">{{ supplement.dose }}</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Save Button -->
        <div class="save-section">
          <button @click="saveTodayData" class="save-button">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Save Today's Data
          </button>
        </div>
      </div>
  
      <!-- Weekly Summary -->
      <div class="weekly-summary">
        <h3 class="subsection-title">Weekly Summary</h3>
        
        <div class="summary-charts">
          <!-- Mood Chart -->
          <div class="chart-card">
            <h4 class="chart-title">Mood Trend</h4>
            <div class="chart-container">
              <div class="chart-bars">
                <div 
                  v-for="(day, index) in weeklyData" 
                  :key="index"
                  class="chart-bar mood-bar"
                  :style="{ height: (day.mood / 5) * 100 + '%' }"
                  :class="getMoodClass(day.mood)"
                >
                  <span class="bar-value">{{ day.mood }}</span>
                </div>
              </div>
              <div class="chart-labels">
                <span v-for="day in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="day" class="chart-label">{{ day }}</span>
              </div>
            </div>
          </div>
  
          <!-- Energy Chart -->
          <div class="chart-card">
            <h4 class="chart-title">Energy Trend</h4>
            <div class="chart-container">
              <div class="chart-bars">
                <div 
                  v-for="(day, index) in weeklyData" 
                  :key="index"
                  class="chart-bar energy-bar"
                  :style="{ height: (day.energy / 5) * 100 + '%' }"
                  :class="getEnergyClass(day.energy)"
                >
                  <span class="bar-value">{{ day.energy }}</span>
                </div>
              </div>
              <div class="chart-labels">
                <span v-for="day in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="day" class="chart-label">{{ day }}</span>
              </div>
            </div>
          </div>
  
          <!-- Sleep Chart -->
          <div class="chart-card">
            <h4 class="chart-title">Sleep Hours</h4>
            <div class="chart-container">
              <div class="chart-bars">
                <div 
                  v-for="(day, index) in weeklyData" 
                  :key="index"
                  class="chart-bar sleep-bar"
                  :style="{ height: (day.sleep / 10) * 100 + '%' }"
                  :class="getSleepClass(day.sleep)"
                >
                  <span class="bar-value">{{ day.sleep }}h</span>
                </div>
              </div>
              <div class="chart-labels">
                <span v-for="day in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="day" class="chart-label">{{ day }}</span>
              </div>
            </div>
          </div>
  
          <!-- Water Chart -->
          <div class="chart-card">
            <h4 class="chart-title">Water Intake</h4>
            <div class="chart-container">
              <div class="chart-bars">
                <div 
                  v-for="(day, index) in weeklyData" 
                  :key="index"
                  class="chart-bar water-bar"
                  :style="{ height: (day.water / 8) * 100 + '%' }"
                  :class="getWaterClass(day.water)"
                >
                  <span class="bar-value">{{ day.water }}</span>
                </div>
              </div>
              <div class="chart-labels">
                <span v-for="day in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="day" class="chart-label">{{ day }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  
  // Current date
  const currentDate = computed(() => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });
  
  // Today's data
  const todayData = ref({
    mood: 0,
    energy: 0,
    sleep: 0,
    sleepQuality: '',
    water: 0,
    supplements: [] as number[]
  });
  
  // Supplements list
  const supplements = ref([
    { id: 1, name: 'Vitamin D3', dose: '2000 IU' },
    { id: 2, name: 'Omega-3', dose: '1000mg' },
    { id: 3, name: 'Magnesium', dose: '400mg' },
    { id: 4, name: 'B-Complex', dose: '1 capsule' },
    { id: 5, name: 'Probiotic', dose: '1 capsule' },
    { id: 6, name: 'Zinc', dose: '15mg' }
  ]);
  
  // Weekly data (mock data for now)
  const weeklyData = ref([
    { mood: 4, energy: 3, sleep: 7.5, water: 6 },
    { mood: 3, energy: 4, sleep: 8, water: 7 },
    { mood: 5, energy: 5, sleep: 7, water: 8 },
    { mood: 4, energy: 3, sleep: 6.5, water: 5 },
    { mood: 3, energy: 4, sleep: 8.5, water: 6 },
    { mood: 5, energy: 4, sleep: 9, water: 7 },
    { mood: 4, energy: 3, sleep: 7.5, water: 6 }
  ]);
  
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
  
  const toggleSupplement = (supplementId: number) => {
    const index = todayData.value.supplements.indexOf(supplementId);
    if (index > -1) {
      todayData.value.supplements.splice(index, 1);
    } else {
      todayData.value.supplements.push(supplementId);
    }
  };
  
  const saveTodayData = () => {
    // Save to localStorage
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`dailyHealth_${today}`, JSON.stringify(todayData.value));
    
    // Update weekly data
    const dayOfWeek = new Date().getDay();
    weeklyData.value[dayOfWeek] = {
      mood: todayData.value.mood,
      energy: todayData.value.energy,
      sleep: todayData.value.sleep,
      water: todayData.value.water
    };
    
    localStorage.setItem('weeklyHealthData', JSON.stringify(weeklyData.value));
    
    console.log('Daily health data saved:', todayData.value);
    alert('Daily health data saved successfully!');
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
  
  onMounted(() => {
    // Load today's data if exists
    const today = new Date().toISOString().split('T')[0];
    const savedData = localStorage.getItem(`dailyHealth_${today}`);
    if (savedData) {
      todayData.value = JSON.parse(savedData);
    }
    
    // Load weekly data
    const savedWeekly = localStorage.getItem('weeklyHealthData');
    if (savedWeekly) {
      weeklyData.value = JSON.parse(savedWeekly);
    }
  });
  </script>
  
  <style scoped>
  .daily-health {
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
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6;
  }
  
  .tracker-card {
    @apply bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300;
  }
  
  .tracker-card:hover {
    @apply transform -translate-y-1 shadow-lg;
  }
  
  .tracker-header {
    @apply flex items-center gap-3 mb-4;
  }
  
  .tracker-icon {
    @apply text-2xl;
  }
  
  .tracker-title {
    @apply text-white font-semibold;
  }
  
  /* Mood Scale */
  .mood-scale {
    @apply flex justify-between;
  }
  
  .mood-option {
    @apply flex flex-col items-center gap-2 cursor-pointer p-3 rounded-lg transition-all duration-300 hover:bg-white/10;
  }
  
  .mood-option.selected {
    @apply bg-[#4ADE80]/20 border border-[#4ADE80]/30;
  }
  
  .mood-emoji {
    @apply text-xl;
  }
  
  .mood-label {
    @apply text-xs text-gray-400;
  }
  
  /* Energy Scale */
  .energy-scale {
    @apply flex justify-between items-end h-24;
  }
  
  .energy-option {
    @apply flex flex-col items-center gap-2 cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-white/10;
  }
  
  .energy-option.selected {
    @apply bg-[#3B82F6]/20 border border-[#3B82F6]/30;
  }
  
  .energy-bar {
    @apply w-6 bg-gradient-to-t from-[#3B82F6] to-[#60A5FA] rounded-t;
    min-height: 8px;
  }
  
  .energy-label {
    @apply text-xs text-gray-400;
  }
  
  /* Sleep Input */
  .sleep-input {
    @apply flex items-center gap-3 mb-4;
  }
  
  .sleep-field {
    @apply bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#4ADE80] w-24 transition-colors duration-300;
  }
  
  .sleep-unit {
    @apply text-gray-400 text-sm;
  }
  
  .sleep-quality {
    @apply flex items-center gap-3;
  }
  
  .quality-label {
    @apply text-gray-400 text-sm;
  }
  
  .quality-buttons {
    @apply flex gap-2;
  }
  
  .quality-btn {
    @apply px-3 py-1 text-xs rounded-lg border border-white/20 text-gray-400 hover:bg-white/10 transition-all duration-300;
  }
  
  .quality-btn.selected {
    @apply bg-[#4ADE80] text-white border-[#4ADE80];
  }
  
  /* Water Tracker */
  .water-tracker {
    @apply flex items-center justify-between mb-4;
  }
  
  .water-display {
    @apply flex items-baseline gap-2;
  }
  
  .water-amount {
    @apply text-3xl font-bold text-[#3B82F6];
  }
  
  .water-unit {
    @apply text-gray-400 text-sm;
  }
  
  .water-buttons {
    @apply flex gap-2;
  }
  
  .water-btn {
    @apply w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300;
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
    @apply w-full h-3 bg-white/10 rounded-full overflow-hidden;
  }
  
  .water-fill {
    @apply h-full bg-gradient-to-r from-[#3B82F6] to-[#4ADE80] transition-all duration-500;
  }
  
  /* Supplements */
  .supplements-section {
    @apply mb-6;
  }
  
  .supplements-title {
    @apply text-lg font-semibold text-white mb-4;
  }
  
  .supplements-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
  }
  
  .supplement-item {
    @apply flex items-center gap-4 p-4 rounded-xl border border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/5 hover:border-white/20;
  }
  
  .supplement-item.taken {
    @apply bg-[#4ADE80]/10 border-[#4ADE80]/30;
  }
  
  .supplement-checkbox {
    @apply w-6 h-6 rounded-lg border-2 border-white/30 flex items-center justify-center transition-all duration-300;
  }
  
  .supplement-item.taken .supplement-checkbox {
    @apply bg-[#4ADE80] border-[#4ADE80] text-white;
  }
  
  .supplement-info {
    @apply flex flex-col;
  }
  
  .supplement-name {
    @apply text-white font-medium;
  }
  
  .supplement-dose {
    @apply text-gray-400 text-sm;
  }
  
  /* Save Button */
  .save-section {
    @apply flex justify-center;
  }
  
  .save-button {
    @apply flex items-center px-8 py-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg;
  }
  
  /* Weekly Summary */
  .weekly-summary {
    @apply mt-8;
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
  
  /* Responsive */
  @media (max-width: 768px) {
    .checkin-grid {
      @apply grid-cols-1 gap-4;
    }
    
    .supplements-grid {
      @apply grid-cols-1;
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
  }
  </style>