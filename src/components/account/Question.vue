<template>
  <BackgroundGradient />
  <div class="relative">
    <section class="pt-32 pb-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <!-- Progress Bar -->
        <div class="mb-12">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-white">Step {{ currentStep }} of {{ totalSteps }}</h2>
            <span class="text-gray-400">{{ Math.round((currentStep / totalSteps) * 100) }}% Complete</span>
          </div>
          <div class="w-full bg-white/10 rounded-full h-2">
            <div 
              class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] h-2 rounded-full transition-all duration-500"
              :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Question Container -->
        <div class="flex items-center justify-center">
          <div class="auth-container w-full max-w-4xl">
            <!-- Step 1: Basic Demographics -->
            <div v-if="currentStep === 1" class="question-step">
              <h3 class="text-3xl font-bold mb-6 text-center">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  Tell Us About Yourself
                </span>
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="input-group">
                  <label class="input-label">Age</label>
                  <input
                    type="number"
                    v-model="formData.age"
                    class="input-field"
                    placeholder="Enter your age"
                    min="13"
                    max="120"
                    step="1"
                    maxlength="3"
                    @input="validateAge"
                  />
                </div>
                
                <div class="input-group">
                  <label class="input-label">Gender</label>
                  <select v-model="formData.gender" class="input-field">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div class="input-group">
                  <label class="input-label">Height</label>
                  <select v-model="formData.height" class="input-field">
                    <option value="">Select height</option>
                    <option v-for="option in heightOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                  </select>
                </div>
                
                <div class="input-group">
                  <label class="input-label">Weight (lbs)</label>
                  <input
                    type="number"
                    v-model="formData.weight"
                    class="input-field"
                    placeholder="Enter your weight in pounds"
                    min="100"
                    max="999"
                    step="1"
                    maxlength="3"
                    @input="validateWeight"
                  />
                </div>
              </div>
            </div>

            <!-- Step 2: Health Goals -->
            <div v-if="currentStep === 2" class="question-step">
              <h3 class="text-3xl font-bold mb-6 text-center">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  What Are Your Health Goals?
                </span>
              </h3>
              
              <div class="space-y-4">
                <div class="goal-option" v-for="goal in healthGoals" :key="goal.value">
                  <input
                    type="checkbox"
                    :id="goal.value"
                    :value="goal.value"
                    v-model="formData.healthGoals"
                    class="goal-checkbox"
                  />
                  <label :for="goal.value" class="goal-label">
                    <div class="goal-icon">{{ goal.icon }}</div>
                    <div>
                      <h4 class="goal-title">{{ goal.title }}</h4>
                      <p class="goal-description">{{ goal.description }}</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Step 3: Medical History -->
            <div v-if="currentStep === 3" class="question-step">
              <h3 class="text-3xl font-bold mb-6 text-center">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  Medical History & Conditions
                </span>
              </h3>
              
              <div class="space-y-8">
                <div class="input-group">
                  <label class="input-label">Do you have any medical conditions? (Select all that apply)</label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="medical-option" v-for="condition in medicalConditions" :key="condition.value">
                      <input
                        type="checkbox"
                        :id="condition.value"
                        :value="condition.value"
                        v-model="formData.medicalConditions"
                        class="medical-checkbox"
                      />
                      <label :for="condition.value" class="medical-label">{{ condition.label }}</label>
                    </div>
                  </div>
                </div>
                
                <div class="input-group">
                  <label class="input-label">Are you currently taking any medications? (Select all that apply)</label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="medical-option" v-for="medication in medications" :key="medication.value">
                      <input
                        type="checkbox"
                        :id="medication.value"
                        :value="medication.value"
                        v-model="formData.medications"
                        class="medical-checkbox"
                      />
                      <label :for="medication.value" class="medical-label">{{ medication.label }}</label>
                    </div>
                  </div>
                </div>
                
                <div class="input-group">
                  <label class="input-label">Do you have any allergies? (Select all that apply)</label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="medical-option" v-for="allergy in allergies" :key="allergy.value">
                      <input
                        type="checkbox"
                        :id="allergy.value"
                        :value="allergy.value"
                        v-model="formData.allergies"
                        class="medical-checkbox"
                      />
                      <label :for="allergy.value" class="medical-label">{{ allergy.label }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 4: Lifestyle -->
            <div v-if="currentStep === 4" class="question-step">
              <h3 class="text-3xl font-bold mb-6 text-center">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  Lifestyle & Activity
                </span>
              </h3>
              
              <div class="space-y-6">
                <div class="input-group">
                  <label class="input-label">Activity Level</label>
                  <select v-model="formData.activityLevel" class="input-field">
                    <option value="">Select your activity level</option>
                    <option value="sedentary">Sedentary (little to no exercise)</option>
                    <option value="lightly-active">Lightly Active (light exercise 1-3 days/week)</option>
                    <option value="moderately-active">Moderately Active (moderate exercise 3-5 days/week)</option>
                    <option value="very-active">Very Active (hard exercise 6-7 days/week)</option>
                    <option value="extremely-active">Extremely Active (very hard exercise, physical job)</option>
                  </select>
                </div>
                
                <div class="input-group">
                  <label class="input-label">Sleep Quality</label>
                  <select v-model="formData.sleepQuality" class="input-field">
                    <option value="">Select your typical sleep quality</option>
                    <option value="excellent">Excellent (7-9 hours, feel rested)</option>
                    <option value="good">Good (6-8 hours, mostly rested)</option>
                    <option value="fair">Fair (5-7 hours, sometimes tired)</option>
                    <option value="poor">Poor (less than 6 hours, often tired)</option>
                  </select>
                </div>
                
                <div class="input-group">
                  <label class="input-label">Stress Level</label>
                  <select v-model="formData.stressLevel" class="input-field">
                    <option value="">Select your typical stress level</option>
                    <option value="low">Low (rarely stressed)</option>
                    <option value="moderate">Moderate (occasionally stressed)</option>
                    <option value="high">High (frequently stressed)</option>
                    <option value="very-high">Very High (constantly stressed)</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Step 5: Diet -->
            <div v-if="currentStep === 5" class="question-step">
              <h3 class="text-3xl font-bold mb-6 text-center">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  Dietary Preferences & Restrictions
                </span>
              </h3>
              
              <div class="space-y-8">
                <div class="input-group">
                  <label class="input-label">Dietary Restrictions (Select all that apply)</label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="diet-option" v-for="diet in dietaryRestrictions" :key="diet.value">
                      <input
                        type="checkbox"
                        :id="diet.value"
                        :value="diet.value"
                        v-model="formData.dietaryRestrictions"
                        class="diet-checkbox"
                      />
                      <label :for="diet.value" class="diet-label">{{ diet.label }}</label>
                    </div>
                  </div>
                </div>
                
                <div class="input-group">
                  <label class="input-label">How many meals do you typically eat per day?</label>
                  <select v-model="formData.mealsPerDay" class="input-field">
                    <option value="">Select number of meals</option>
                    <option value="1-2">1-2 meals</option>
                    <option value="3">3 meals</option>
                    <option value="4">4 meals</option>
                    <option value="5+">5+ meals</option>
                  </select>
                </div>
                
                <div class="input-group">
                  <label class="input-label">Current Supplements (Select all that apply)</label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="supplement-option" v-for="supplement in supplements" :key="supplement.value">
                      <input
                        type="checkbox"
                        :id="supplement.value"
                        :value="supplement.value"
                        v-model="formData.currentSupplements"
                        class="supplement-checkbox"
                      />
                      <label :for="supplement.value" class="supplement-label">{{ supplement.label }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 6: Final Questions -->
            <div v-if="currentStep === 6" class="question-step">
              <h3 class="text-3xl font-bold mb-6 text-center">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  Final Questions
                </span>
              </h3>
              
              <div class="space-y-6">
                <div class="input-group">
                  <label class="input-label">What's your primary reason for seeking supplements?</label>
                  <select v-model="formData.primaryReason" class="input-field">
                    <option value="">Select primary reason</option>
                    <option value="general-health">General health and wellness</option>
                    <option value="energy">Increased energy and vitality</option>
                    <option value="immunity">Immune system support</option>
                    <option value="fitness">Fitness and muscle building</option>
                    <option value="weight-management">Weight management</option>
                    <option value="mental-health">Mental health and focus</option>
                    <option value="specific-condition">Addressing a specific health condition</option>
                  </select>
                </div>
                
                <div class="input-group">
                  <label class="input-label">How much are you willing to spend on supplements monthly?</label>
                  <select v-model="formData.budget" class="input-field">
                    <option value="">Select budget range</option>
                    <option value="under-25">Under $25</option>
                    <option value="25-50">$25 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="over-200">Over $200</option>
                  </select>
                </div>
                
                <div class="input-group">
                  <label class="input-label">Additional Information (Optional)</label>
                  <textarea
                    v-model="formData.additionalInfo"
                    class="input-field"
                    rows="3"
                    placeholder="Any additional information that might help us provide better recommendations..."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between items-center mt-12">
              <button
                v-if="currentStep > 1"
                @click="previousStep"
                class="nav-button group"
              >
                <span class="button-bg-secondary"></span>
                <span class="button-text">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </span>
              </button>
              
              <div v-else></div>
              
              <button
                v-if="currentStep < totalSteps"
                @click="nextStep"
                class="nav-button group"
                :disabled="!canProceed"
              >
                <span class="button-bg"></span>
                <span class="button-text">
                  Next
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
              
              <button
                v-else
                @click="submitQuestionnaire"
                class="nav-button group"
                :disabled="!canProceed"
              >
                <span class="button-bg"></span>
                <span class="button-text">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Complete Profile
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import BackgroundGradient from "@/components/homepage/BackgroundGradient.vue";
import Footer from "@/components/common/Footer.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentStep = ref(1);
const totalSteps = 6;

// Form data
const formData = ref({
  // Step 1: Demographics
  age: '',
  gender: '',
  height: '',
  weight: '',
  
  // Step 2: Health Goals (keep as array for multiple selection)
  healthGoals: [],
  
  // Step 3: Medical History (change back to arrays for multiple selection)
  medicalConditions: [],
  medications: [],
  allergies: [],
  
  // Step 4: Lifestyle
  activityLevel: '',
  sleepQuality: '',
  stressLevel: '',
  
  // Step 5: Diet (change back to array for multiple selection)
  dietaryRestrictions: [],
  mealsPerDay: '',
  currentSupplements: [],
  
  // Step 6: Final
  primaryReason: '',
  budget: '',
  additionalInfo: ''
});

// Health goals options
const healthGoals = [
  { value: 'weight-loss', icon: '⚖️', title: 'Weight Loss', description: 'Lose weight and improve body composition' },
  { value: 'muscle-gain', icon: '💪', title: 'Muscle Building', description: 'Build muscle mass and strength' },
  { value: 'energy', icon: '⚡', title: 'Energy & Vitality', description: 'Increase energy levels and reduce fatigue' },
  { value: 'immunity', icon: '🛡️', title: 'Immune Support', description: 'Strengthen immune system and prevent illness' },
  { value: 'mental-health', icon: '🧠', title: 'Mental Health', description: 'Improve focus, memory, and mental clarity' },
  { value: 'digestive-health', icon: '🫁', title: 'Digestive Health', description: 'Improve gut health and digestion' },
  { value: 'heart-health', icon: '❤️', title: 'Heart Health', description: 'Support cardiovascular health' },
  { value: 'bone-health', icon: '🦴', title: 'Bone Health', description: 'Strengthen bones and prevent osteoporosis' },
  { value: 'skin-health', icon: '✨', title: 'Skin Health', description: 'Improve skin appearance and health' },
  { value: 'sleep', icon: '😴', title: 'Better Sleep', description: 'Improve sleep quality and duration' }
];

// Medical conditions options
const medicalConditions = [
  { value: 'none', label: 'No medical conditions' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension (High Blood Pressure)' },
  { value: 'heart-disease', label: 'Heart Disease' },
  { value: 'asthma', label: 'Asthma' },
  { value: 'arthritis', label: 'Arthritis' },
  { value: 'thyroid', label: 'Thyroid Issues' },
  { value: 'depression', label: 'Depression/Anxiety' },
  { value: 'other', label: 'Other (please specify in additional info)' }
];

// Medications options
const medications = [
  { value: 'none', label: 'No medications' },
  { value: 'blood-pressure', label: 'Blood Pressure Medication' },
  { value: 'diabetes', label: 'Diabetes Medication' },
  { value: 'cholesterol', label: 'Cholesterol Medication' },
  { value: 'antidepressants', label: 'Antidepressants' },
  { value: 'birth-control', label: 'Birth Control' },
  { value: 'pain-relievers', label: 'Pain Relievers' },
  { value: 'other', label: 'Other (please specify in additional info)' }
];

// Allergies options
const allergies = [
  { value: 'none', label: 'No allergies' },
  { value: 'peanuts', label: 'Peanuts' },
  { value: 'tree-nuts', label: 'Tree Nuts' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'shellfish', label: 'Shellfish' },
  { value: 'wheat', label: 'Wheat/Gluten' },
  { value: 'soy', label: 'Soy' },
  { value: 'medication', label: 'Medication Allergies' },
  { value: 'environmental', label: 'Environmental (Pollen, Dust, etc.)' },
  { value: 'other', label: 'Other (please specify in additional info)' }
];

// Dietary restrictions options
const dietaryRestrictions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'dairy-free', label: 'Dairy-Free' },
  { value: 'keto', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'low-carb', label: 'Low-Carb' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'none', label: 'No Restrictions' }
];

// Supplements options
const supplements = [
  { value: 'none', label: 'No supplements' },
  { value: 'multivitamin', label: 'Multivitamin' },
  { value: 'vitamin-d', label: 'Vitamin D' },
  { value: 'omega-3', label: 'Omega-3' },
  { value: 'protein', label: 'Protein Powder' },
  { value: 'probiotics', label: 'Probiotics' },
  { value: 'vitamin-c', label: 'Vitamin C' },
  { value: 'calcium', label: 'Calcium' },
  { value: 'iron', label: 'Iron' },
  { value: 'other', label: 'Other (please specify in additional info)' }
];

// Height options for dropdown
const heightOptions = computed(() => {
  const options: { value: number; label: string }[] = [];
  for (let i = 36; i <= 96; i++) {
    const feet = Math.floor(i / 12);
    const inches = i % 12;
    const label = inches === 0 ? `${feet}'` : `${feet}' ${inches}"`;
    options.push({ value: i, label });
  }
  return options;
});

// Check if current step can proceed
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return formData.value.age && formData.value.gender && formData.value.height && formData.value.weight;
    case 2:
      return formData.value.healthGoals.length > 0;
    case 3:
      return formData.value.medicalConditions.length > 0 && formData.value.medications.length > 0 && formData.value.allergies.length > 0;
    case 4:
      return formData.value.activityLevel && formData.value.sleepQuality && formData.value.stressLevel;
    case 5:
      return formData.value.dietaryRestrictions.length > 0 && formData.value.mealsPerDay;
    case 6:
      return formData.value.primaryReason && formData.value.budget;
    default:
      return false;
  }
});

const nextStep = () => {
  if (currentStep.value < totalSteps && canProceed.value) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const submitQuestionnaire = () => {
  if (!canProceed.value) return;
  
  // Store questionnaire data
  localStorage.setItem('userQuestionnaire', JSON.stringify(formData.value));
  
  // AUTHENTICATION LOGIC COMMENTED OUT FOR FRONTEND DEVELOPMENT
  // Clear verification data
  // localStorage.removeItem('pendingVerificationEmail');
  // localStorage.removeItem('pendingVerificationName');
  // localStorage.removeItem('emailVerified');
  
  // Show success message
  alert('Profile completed successfully! You can now log in and get personalized recommendations.');
  
  // AUTHENTICATION LOGIC COMMENTED OUT FOR FRONTEND DEVELOPMENT
  // Redirect to login
  // router.push('/log-in');
  
  console.log('Questionnaire submitted - data saved to localStorage');
  console.log('Form data:', formData.value);
};

const validateWeight = () => {
  // Remove any non-numeric characters
  let value = formData.value.weight.toString().replace(/\D/g, '');
  
  // Prevent leading zeros
  if (value.length > 1 && value[0] === '0') {
    value = value.substring(1);
  }
  
  // Limit to 3 digits
  if (value.length > 3) {
    value = value.substring(0, 3);
  }
  
  // Ensure minimum value of 100
  const numValue = parseInt(value);
  if (numValue < 100 && value.length === 3) {
    value = '100';
  }
  
  // Update the form data
  formData.value.weight = value;
};

const validateAge = () => {
  // Remove any non-numeric characters
  let value = formData.value.age.toString().replace(/\D/g, '');
  
  // Prevent leading zeros
  if (value.length > 1 && value[0] === '0') {
    value = value.substring(1);
  }
  
  // Limit to 3 digits
  if (value.length > 3) {
    value = value.substring(0, 3);
  }
  
  // Ensure minimum value of 13
  const numValue = parseInt(value);
  if (numValue < 13 && value.length === 3) {
    value = '13';
  }
  
  // Update the form data
  formData.value.age = value;
};

onMounted(() => {
  // AUTHENTICATION LOGIC COMMENTED OUT FOR FRONTEND DEVELOPMENT
  // Check if user has completed email verification by looking for questionnaire data
  // or if they're coming from the verification flow
  // const hasQuestionnaireData = localStorage.getItem('userQuestionnaire');
  // const hasVerifiedEmail = localStorage.getItem('emailVerified');
  
  // If user has already completed questionnaire, redirect to login
  // if (hasQuestionnaireData) {
  //   router.push('/log-in');
  //   return;
  // }
  
  // If user hasn't verified email, redirect to login
  // if (!hasVerifiedEmail) {
  //   router.push('/log-in');
  //   return;
  // }
  
  console.log('Questionnaire page loaded - authentication disabled for frontend development');
});
</script>

<style scoped>
.auth-container {
  @apply bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.question-step {
  animation: fadeInUp 0.6s ease-out;
}

.input-group {
  @apply mb-6;
}

.input-label {
  @apply font-semibold text-lg block mb-3 text-white flex items-center;
}

.input-field {
  @apply w-full p-4 border border-white/20 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 focus:border-[#4ADE80]/30 transition-all duration-300 placeholder:text-white/40;
  backdrop-filter: blur(10px);
}

.input-field:focus {
  @apply bg-white/10;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 222, 128, 0.2);
}

/* Custom select dropdown styling */
select.input-field {
  @apply appearance-none bg-no-repeat bg-right pr-10;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234ADE80' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-size: 1.5em 1.5em;
}

select.input-field option {
  @apply bg-[#0A0A0A] text-white;
}

select.input-field:focus option {
  @apply bg-[#1A1A1A];
}

select.input-field option:hover {
  @apply bg-[#4ADE80]/20;
}

/* Goal options styling */
.goal-option {
  @apply relative;
}

.goal-checkbox {
  @apply absolute opacity-0;
}

.goal-label {
  @apply flex items-start gap-4 p-4 rounded-xl border-2 border-white/10 bg-white/5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20;
}

.goal-checkbox:checked + .goal-label {
  @apply border-[#4ADE80]/50 bg-[#4ADE80]/10;
}

.goal-icon {
  @apply text-3xl flex-shrink-0;
}

.goal-title {
  @apply font-semibold text-white mb-1;
}

.goal-description {
  @apply text-gray-400 text-sm;
}

/* Diet options styling */
.diet-option {
  @apply relative;
}

.diet-checkbox {
  @apply absolute opacity-0;
}

.diet-label {
  @apply block p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20 text-center text-white;
}

.diet-checkbox:checked + .diet-label {
  @apply border-[#4ADE80]/50 bg-[#4ADE80]/10 text-white;
}

/* Medical options styling */
.medical-option {
  @apply relative;
}

.medical-checkbox {
  @apply absolute opacity-0;
}

.medical-label {
  @apply block p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20 text-center text-white;
}

.medical-checkbox:checked + .medical-label {
  @apply border-[#4ADE80]/50 bg-[#4ADE80]/10 text-white;
}

/* Supplement options styling */
.supplement-option {
  @apply relative;
}

.supplement-checkbox {
  @apply absolute opacity-0;
}

.supplement-label {
  @apply block p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20 text-center text-white;
}

.supplement-checkbox:checked + .supplement-label {
  @apply border-[#4ADE80]/50 bg-[#4ADE80]/10 text-white;
}

/* Navigation buttons */
.nav-button {
  @apply relative px-8 py-3 rounded-xl text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105;
}

.nav-button:not(:disabled) {
  @apply hover:shadow-lg;
}

.nav-button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.button-bg {
  @apply absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform duration-300 group-hover:scale-105;
}

.button-bg-secondary {
  @apply absolute inset-0 bg-white/10 border border-white/20 transition-transform duration-300 group-hover:scale-105;
}

.button-text {
  @apply relative text-white flex items-center justify-center gap-2 font-semibold;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects */
a:hover {
  text-shadow: 0 0 8px currentColor;
}
</style>
