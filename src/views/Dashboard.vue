<template>
  <div class="relative min-h-screen bg-[#0A0A0A]">
    <BackgroundGradient />
    <div class="relative">
    <DashboardNavbar />
      <!-- Dashboard Content -->
      <section class="relative pt-32 pb-20 md:py-32">
        <div class="max-w-7xl mx-auto px-4 relative z-10">
          <div class="dashboard">
            <WelcomeSection />
            <SupplementRecommendation />
            <YourSuppliment />
            <DailyHealthCheckin 
              @showMealModal="showMealModal = true; mealModalData=$event"
              @showWorkoutModal="showWorkoutModal = true; workoutModalData = $event"
              @showMentalWellnessModal="showMentalWellnessModal = true; mentalWellnessModalData=$event"
              @showPhysicalWellnessModal="showPhysicalWellnessModal = true; physicalWellnessModalData=$event"
            />
            <RecentActivity />
          </div>
        </div>
      </section>
    </div>

    <!-- Global Modals -->

      <!-- Meal Modal -->
    <div v-if="showMealModal" class="modal-overlay" @click="showMealModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Log Your Food Intake</h3>
          <button @click="showMealModal = false" class="modal-close">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="workout-form"> 
       
             
              <div class="form-group">
                <label class="input-label">Breakfast</label>
                <textarea 
                  v-if="!todayData.mealCompleted"
                  v-model="breakfast" 
                  type="string" 
                  class="log-input"
                ></textarea>

                <span 
                v-if="todayData.mealCompleted"
                class="log-input full-wrap"
              >
              {{ todayData.breakfast }} 
             </span>

              </div>
               <div class="form-group">
                <label class="input-label">Lunch</label>
                <textarea 
                  v-if="!todayData.mealCompleted"
                  v-model="lunch" 
                  type="string" 
                  class="log-input"
                ></textarea>
             
                  
                <span 
                v-if="todayData.mealCompleted"
                class="log-input full-wrap"
              >
              {{ todayData.lunch }} 
             </span>
              </div>

              <div class="form-group">
                <label class="input-label">Dinner</label>
                <textarea 
                  v-if="!todayData.mealCompleted"
                  v-model="dinner" 
                  type="string" 
                  class="log-input"
                  placeholder=""
                ></textarea>

                <span 
                v-if="todayData.mealCompleted"
                class="log-input full-wrap"
              >
              {{ todayData.dinner }} 
             </span>
              </div>
              
               <div class="form-group">
                <label class="input-label">Snacks</label>
                <textarea 
                  v-if="!todayData.mealCompleted"
                  v-model="snacks" 
                  type="string" 
                  class="log-input"
                ></textarea>

                  <span 
                v-if="todayData.mealCompleted"
                class="log-input full-wrap"
              >
              {{ todayData.snacks }} 
             </span>
              </div>

              <div class="form-group">
                <label class="input-label">Beverages</label>
                <textarea 
                  v-if="!todayData.mealCompleted"
                  v-model="beverages" 
                  type="string" 
                  class="log-input"

                ></textarea>

                   <span 
                v-if="todayData.mealCompleted"
                class="log-input full-wrap"
              >
              {{ todayData.beverages }} 
             </span>
              </div>
              
               <div class="form-group">
                <label class="input-label">Other Meals (Optional)</label>
                <textarea 
                  v-if="!todayData.mealCompleted"
                  v-model="otherMeal" 
                  type="string" 
                  class="log-input"
                > </textarea>

                 <span 
                v-if="todayData.mealCompleted"
                class="log-input full-wrap"
              >
              {{ todayData.otherMeal }} 
             </span>
            </div>
          </div>

        </div>
        <div class="modal-actions">
          <button @click="showMealModal = false" class="modal-button secondary"  v-if="!todayData.mealCompleted">Cancel</button>
          <button @click="submitMeal" class="modal-button primary" v-if="!todayData.mealCompleted">Save</button>
        </div>
      </div>
    </div>

    <!-- Workout Modal -->
    <div v-if="showWorkoutModal" class="modal-overlay" @click="showWorkoutModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Log Workout</h3>
          <button @click="showWorkoutModal = false" class="modal-close">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="workout-form">
            <div class="form-group">
              <label class="input-label">Workout Type</label>
              <select v-model="workoutType" class="modal-input" @change="updateCalories">
                <option value="">Select workout type</option>
                <option value="cardio">Cardio</option>
                <option value="strength">Strength Training</option>
                <option value="yoga">Yoga</option>
                <option value="pilates">Pilates</option>
                <option value="hiit">HIIT</option>
                <option value="walking">Walking</option>
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
                <option value="swimming">Swimming</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="input-label">Duration (minutes)</label>
                <input 
                  v-model.number="workoutDurationInput" 
                  type="number" 
                  min="1"
                  max="300"
                  class="modal-input"
                  placeholder="30"
                  @keyup.enter="submitWorkout"
                  @change="updateCalories"
                />
              </div>
              
              <div class="form-group">
                <label class="input-label">Calories Burned</label>
                <input 
                  v-model.number="caloriesInput" 
                  type="number" 
                  min="1"
                  max="2000"
                  class="modal-input"
                  placeholder="300"
                  @keyup.enter="submitWorkout"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label class="input-label">Notes (optional)</label>
              <textarea 
                v-model="workoutNotes" 
                class="modal-input"
                rows="3"
                placeholder="How was your workout?"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="showWorkoutModal = false" class="modal-button secondary">Cancel</button>
          <button @click="submitWorkout" class="modal-button primary">Save Workout</button>
        </div>
      </div>
    </div>


     <!-- Mental Wellness Modal -->
    <div v-if="showMentalWellnessModal" class="modal-overlay" @click="showMentalWellnessModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Log Mental & Emotional Wellness</h3>
          <button @click="showMentalWellnessModal = false" class="modal-close">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="workout-form">
            
            <div class="form-group">
              <label class="input-label">Notes</label>
              <textarea 
                v-if="!todayData.mentalWellnessCompleted"
                v-model="mentalWellness" 
                class="log-input"
                rows="3"
                placeholder="How have you been mentally and emotionally?"
              ></textarea>

               <span 
                v-if="todayData.mentalWellnessCompleted"
                class="log-input full-wrap"
              >
              {{ todayData.mentalWellness }} 
            </span>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="showMentalWellnessModal = false" class="modal-button secondary"  v-if="!todayData.mentalWellnessCompleted">Cancel</button>
          <button @click="submitMentalWellness" class="modal-button primary" v-if="!todayData.mentalWellnessCompleted">Save</button>
        </div>
      </div>
    </div>


      <!-- Physical Wellness Modal -->
    <div v-if="showPhysicalWellnessModal" class="modal-overlay" @click="showPhysicalWellnessModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Log Physical Wellness</h3>
          <button @click="showPhysicalWellnessModal = false" class="modal-close">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="workout-form">
            
            <div class="form-group">
              <label class="input-label">Notes</label>
              <textarea 
                v-if="!todayData.physicalWellnessCompleted"
                v-model="physicalWellness" 
                class="log-input"
                rows="3"
                placeholder="How is your body feeling today?"
              >
              </textarea>

               <span 
                v-if="todayData.physicalWellnessCompleted"
                class="log-input full-wrap"
              >
              {{ todayData.physicalWellness }} 
            </span>

            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="showPhysicalWellnessModal  = false" class="modal-button secondary"  v-if="!todayData.physicalWellnessCompleted">Cancel</button>
          <button @click="submitPhysicalWellness" class="modal-button primary"  v-if="!todayData.physicalWellnessCompleted">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BackgroundGradient from '@/components/homepage/BackgroundGradient.vue';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue';
import WelcomeSection from '@/components/dashboard/WelcomeSection.vue';
import SupplementRecommendation from '@/components/dashboard/SupplimentRecommendation.vue';
import DailyHealthCheckin from '@/components/dashboard/DailyHealth.vue';
import RecentActivity from '@/components/dashboard/RecentActivity.vue';
import YourSuppliment from '@/components/dashboard/YourSuppliment.vue'; 
import { todayData } from '../services/dailyHealth';

// Modal states
const showMealModal = ref(false);
const showWorkoutModal = ref(false);
const showMentalWellnessModal = ref(false);
const showPhysicalWellnessModal = ref(false);

//User data
const breakfast = ref('');
const lunch = ref('');
const dinner = ref('');
const snacks = ref('');
const beverages = ref('');
const otherMeal = ref('');
const mealCompleted = ref('');
const mentalWellness = ref('');
const physicalWellness = ref('');

// Modal data
const mealModalData = ref({});
const workoutModalData = ref({});
const mentalWellnessModalData=ref('');
const physicalWellnessModalData=ref('');
// Form inputs
const workoutDurationInput = ref('');
const caloriesInput = ref('');
const workoutNotes = ref('');
const workoutType = ref('');

// Calorie calculation helper
const calculateCalories = (duration, type) => {
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
  
  const rate = calorieRates[type] || 6;
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

const  submitMeal  = () => {

  if (breakfast.value || lunch.value || dinner.value || snacks.value || beverages.value || otherMeal.value) {
    // Emit to DailyHealth component
    const event = new CustomEvent('mealSubmitted', { 
      detail: { 
      breakfast : breakfast.value,
       lunch : lunch.value,
       dinner : dinner.value,
       snacks : snacks.value,
       beverages : beverages.value,
       otherMeal : otherMeal.value,
       mealCompleted : mealCompleted.value,
      }
    });

    window.dispatchEvent(event);
    
    showMealModal.value = false;
    breakfast.value = '';
    lunch.value = '';
    dinner.value = '';
    snacks.value = '';
    beverages.value = '';
    otherMeal.value = '';
    mealCompleted.value = '';
  }
};
// Modal methods
const submitMentalWellness = () => {
  if (mentalWellness.value) {
    // Emit to DailyHealth component
    const event = new CustomEvent('mentalWellnessSubmitted', { 
      detail: mentalWellness.value
    });

    window.dispatchEvent(event);
    showMentalWellnessModal.value = false;
    mentalWellness.value = '';

  }
};

const submitPhysicalWellness = () => {
  if (physicalWellness.value) {
    // Emit to DailyHealth component
    const event = new CustomEvent('physicalWellnessSubmitted', { 
      detail: physicalWellness.value
    });

    window.dispatchEvent(event);
    showPhysicalWellnessModal.value = false;
    physicalWellness.value = '';

  }
};

const  submitWorkout  = () => {

  if (workoutDurationInput.value && !isNaN(Number(workoutDurationInput.value))) {
    // Emit to DailyHealth component
    const event = new CustomEvent('workoutSubmitted', { 
      detail: { 
        duration: Number(workoutDurationInput.value),
        calories: Number(caloriesInput.value) || 0,
        type: workoutType.value,
        notes: workoutNotes.value
      }
    });

    window.dispatchEvent(event);
    
    showWorkoutModal.value = false;
    workoutDurationInput.value = '';
    caloriesInput.value = '';
    workoutNotes.value = '';
    workoutType.value = '';
    
  }
};



</script>

<style scoped>
.dashboard {
  @apply space-y-8;
}

/* Ensure consistent styling with other pages */
.dashboard > * {
  @apply backdrop-blur-sm;
}

/* Modals */
.modal-overlay {
  @apply fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4;
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  @apply bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full mx-auto relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  @apply flex items-center justify-between mb-4;
}

.modal-title {
  @apply text-xl font-bold text-white;
}

.modal-close {
  @apply w-8 h-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-full flex items-center justify-center transition-all duration-300;
}

.modal-body {
  @apply mb-6 max-h-[400px] overflow-y-auto pr-4;
}

.input-label {
  @apply block text-sm font-medium text-white mb-2;
}
.log-input {
  @apply w-full min-h-[64px] max-w-full resize-none break-words whitespace-pre-wrap
         bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white
         placeholder-gray-400 focus:outline-none focus:border-[#4ADE80]
         transition-colors duration-300;
  box-sizing: border-box;
  line-height: 1.3;
  font-size: 1rem;
}


/*next after original*/
/* .modal-input {
  @apply w-full min-h-[64px] max-w-full resize-none break-words whitespace-pre-wrap
         bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white 
         placeholder-gray-400 focus:outline-none focus:border-[#4ADE80] 
         transition-colors duration-300;
}

.log-input {
  @apply w-full min-h-[64px] max-w-full resize-none break-words whitespace-pre-wrap overflow-hidden 
         px-4 py-3  bg-white/10 border border-white/20 rounded-lg text-white 
         transition-colors duration-300;
} */

/*original*/

.modal-input {
  @apply w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#4ADE80] transition-colors duration-300;
}
/*
.log-input {
  @apply w-full   min-h-[48px] max-w-full break-words p-3 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white focus:outline-none focus:border-[#4ADE80] transition-colors duration-300;
}
  */
.modal-input:focus {
  @apply ring-2 ring-[#4ADE80]/20;
}

select.modal-input {
  @apply cursor-pointer;
}

select.modal-input option {
  @apply bg-gray-800 text-white;
}

/* Additional styling for better cross-browser compatibility */
select.modal-input {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

select.modal-input option {
  background-color: #1f2937;
  color: white;
  padding: 8px;
}

select.modal-input option:hover {
  background-color: #374151;
}

select.modal-input:focus {
  background-color: rgba(255, 255, 255, 0.15);
}

textarea.modal-input {
  @apply resize-none;
}

.workout-form {
  @apply flex flex-col gap-4;
}

.form-group {
  @apply flex flex-col;
}

.log-row {
  @apply flex gap-4;

}

.form-row {
  @apply flex gap-4;
}

.form-row .form-group {
  @apply flex-1;
}

.modal-actions {
  @apply flex justify-end gap-2;
}

.modal-button {
  @apply px-4 py-2 text-sm rounded-lg border border-white/20 text-gray-400 hover:bg-white/10 transition-all duration-300;
}

.modal-button.primary {
  @apply bg-[#4ADE80] text-white border-[#4ADE80] hover:bg-[#3B82F6] hover:border-[#3B82F6];
}

.modal-button.secondary {
  @apply bg-gray-600 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-700;
}

/* Responsive */
@media (max-width: 768px) {
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

.full-wrap {
  display: block;
  white-space: pre-wrap; /* Preserve line breaks and wrap text */
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  margin-top: 0.5rem;
  line-height: 1.5;
}
</style>
