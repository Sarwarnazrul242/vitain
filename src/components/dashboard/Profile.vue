<template>
  <div class="min-h-screen">
    <BackgroundGradient />
    <DashboardNavbar />
    <div class="profile-container pt-32 pb-12">
      <div class="profile-header">
        <h1 class="profile-title">Profile Settings</h1>
        <p class="profile-subtitle">Manage your account and view your health information</p>
      </div>

      <div class="profile-content">
        <!-- Basic Information Section -->
        <div class="profile-section">
          <div class="section-header">
            <h2 class="section-title">Basic Information</h2>
            <div class="avatar-section">
              <div class="avatar-circle">
                {{ userInitials }}
              </div>
            </div>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <label class="info-label">Full Name</label>
              <p class="info-value">{{ userInfo.name || 'Not available' }}</p>
            </div>
            <div class="info-item">
              <label class="info-label">Email Address</label>
              <p class="info-value">{{ userInfo.email || 'Not available' }}</p>
            </div>
            <div class="info-item">
              <label class="info-label">Member Since</label>
              <p class="info-value">{{ formatDate(userInfo.joinDate) }}</p>
            </div>
          </div>
        </div>

        <!-- Health Questionnaire Section -->
        <div class="profile-section" v-if="questionnaireData">
          <div class="section-header">
            <h2 class="section-title">Health Questionnaire</h2>
            <p class="section-subtitle">Your comprehensive health profile and preferences</p>
          </div>

          <!-- Demographics -->
          <div class="questionnaire-section" v-if="hasDemographics">
            <h3 class="subsection-title">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Demographics
            </h3>
            <div class="info-grid">
              <div class="info-item" v-if="questionnaireData.age">
                <label class="info-label">Age</label>
                <p class="info-value">{{ questionnaireData.age }} years</p>
              </div>
              <div class="info-item" v-if="questionnaireData.biologicalSex">
                <label class="info-label">Biological Sex</label>
                <p class="info-value">{{ questionnaireData.biologicalSex }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.height">
                <label class="info-label">Height</label>
                <p class="info-value">{{ questionnaireData.height }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.weight">
                <label class="info-label">Weight</label>
                <p class="info-value">{{ questionnaireData.weight }}</p>
              </div>
            </div>
          </div>

          <!-- Health Status -->
          <div class="questionnaire-section" v-if="hasHealthStatus">
            <h3 class="subsection-title">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Health Status
            </h3>
            <div class="info-grid">
              <div class="info-item" v-if="questionnaireData.generalHealth">
                <label class="info-label">General Health</label>
                <p class="info-value">{{ questionnaireData.generalHealth }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.physicalWellness">
                <label class="info-label">Physical Wellness</label>
                <p class="info-value">{{ questionnaireData.physicalWellness }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.painDiscomfort">
                <label class="info-label">Pain/Discomfort</label>
                <p class="info-value">{{ questionnaireData.painDiscomfort }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.painDescription">
                <label class="info-label">Pain Description</label>
                <p class="info-value">{{ questionnaireData.painDescription }}</p>
              </div>
            </div>
          </div>

          <!-- Symptoms & Conditions -->
          <div class="questionnaire-section" v-if="hasSymptoms">
            <h3 class="subsection-title">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Symptoms & Conditions
            </h3>
            <div class="info-grid">
              <div class="info-item" v-if="questionnaireData.currentSymptoms">
                <label class="info-label">Current Symptoms</label>
                <p class="info-value">{{ formatArray(questionnaireData.currentSymptoms) }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.medicalConditions">
                <label class="info-label">Medical Conditions</label>
                <p class="info-value">{{ formatArray(questionnaireData.medicalConditions) }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.digestiveIssues">
                <label class="info-label">Digestive Issues</label>
                <p class="info-value">{{ questionnaireData.digestiveIssues }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.concerningSymptoms">
                <label class="info-label">Concerning Symptoms</label>
                <p class="info-value">{{ questionnaireData.concerningSymptoms }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.pregnancyStatus">
                <label class="info-label">Pregnancy Status</label>
                <p class="info-value">{{ questionnaireData.pregnancyStatus }}</p>
              </div>
            </div>
          </div>

          <!-- Allergies & Medications -->
          <div class="questionnaire-section" v-if="hasAllergiesMedications">
            <h3 class="subsection-title">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Allergies & Medications
            </h3>
            <div class="info-grid">
              <div class="info-item" v-if="questionnaireData.allergies">
                <label class="info-label">Allergies</label>
                <p class="info-value">{{ questionnaireData.allergies }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.allergyDetails">
                <label class="info-label">Allergy Details</label>
                <p class="info-value">{{ questionnaireData.allergyDetails }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.prescriptionMeds">
                <label class="info-label">Prescription Medications</label>
                <p class="info-value">{{ questionnaireData.prescriptionMeds }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.prescriptionMedsList">
                <label class="info-label">Medications List</label>
                <p class="info-value">{{ questionnaireData.prescriptionMedsList }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.otcSupplements">
                <label class="info-label">OTC Supplements</label>
                <p class="info-value">{{ questionnaireData.otcSupplements }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.otcSupplementsList">
                <label class="info-label">Supplements List</label>
                <p class="info-value">{{ questionnaireData.otcSupplementsList }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.advisedNotToTake">
                <label class="info-label">Advised Not To Take</label>
                <p class="info-value">{{ questionnaireData.advisedNotToTake }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.bloodTests">
                <label class="info-label">Blood Tests</label>
                <p class="info-value">{{ questionnaireData.bloodTests }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.shareTestResults">
                <label class="info-label">Share Test Results</label>
                <p class="info-value">{{ questionnaireData.shareTestResults }}</p>
              </div>
            </div>
          </div>

          <!-- Diet & Nutrition -->
          <div class="questionnaire-section" v-if="hasDiet">
            <h3 class="subsection-title">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              Diet & Nutrition
            </h3>
            <div class="info-grid">
              <div class="info-item" v-if="questionnaireData.specificDiet">
                <label class="info-label">Specific Diet</label>
                <p class="info-value">{{ questionnaireData.specificDiet }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.otherDiet">
                <label class="info-label">Other Diet</label>
                <p class="info-value">{{ questionnaireData.otherDiet }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.mealsPerDay">
                <label class="info-label">Meals Per Day</label>
                <p class="info-value">{{ questionnaireData.mealsPerDay }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.foodFrequency">
                <label class="info-label">Food Frequency</label>
                <p class="info-value">{{ questionnaireData.foodFrequency }}</p>
              </div>
            </div>
          </div>

          <!-- Lifestyle -->
          <div class="questionnaire-section" v-if="hasLifestyle">
            <h3 class="subsection-title">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Lifestyle
            </h3>
            <div class="info-grid">
              <div class="info-item" v-if="questionnaireData.sleepHours">
                <label class="info-label">Sleep Hours</label>
                <p class="info-value">{{ questionnaireData.sleepHours }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.fatigueLevel">
                <label class="info-label">Fatigue Level</label>
                <p class="info-value">{{ questionnaireData.fatigueLevel }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.activityLevel">
                <label class="info-label">Activity Level</label>
                <p class="info-value">{{ questionnaireData.activityLevel }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.exerciseDays">
                <label class="info-label">Exercise Days</label>
                <p class="info-value">{{ questionnaireData.exerciseDays }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.difficultySwallowing">
                <label class="info-label">Difficulty Swallowing</label>
                <p class="info-value">{{ questionnaireData.difficultySwallowing }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.stressLevel">
                <label class="info-label">Stress Level</label>
                <p class="info-value">{{ questionnaireData.stressLevel }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.alcoholConsumption">
                <label class="info-label">Alcohol Consumption</label>
                <p class="info-value">{{ questionnaireData.alcoholConsumption }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.tobaccoUse">
                <label class="info-label">Tobacco Use</label>
                <p class="info-value">{{ questionnaireData.tobaccoUse }}</p>
              </div>
            </div>
          </div>

          <!-- Mental Health -->
          <div class="questionnaire-section" v-if="hasMentalHealth">
            <h3 class="subsection-title">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Mental Health
            </h3>
            <div class="info-grid">
              <div class="info-item" v-if="questionnaireData.interestPleasure">
                <label class="info-label">Interest/Pleasure</label>
                <p class="info-value">{{ questionnaireData.interestPleasure }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.depression">
                <label class="info-label">Depression</label>
                <p class="info-value">{{ questionnaireData.depression }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.sleepIssues">
                <label class="info-label">Sleep Issues</label>
                <p class="info-value">{{ questionnaireData.sleepIssues }}</p>
              </div>
            </div>
          </div>

          <!-- Supplement Preferences -->
          <div class="questionnaire-section" v-if="hasSupplementPrefs">
            <h3 class="subsection-title">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Supplement Preferences
            </h3>
            <div class="info-grid">
              <div class="info-item" v-if="questionnaireData.pastSupplementExperience">
                <label class="info-label">Past Experience</label>
                <p class="info-value">{{ questionnaireData.pastSupplementExperience }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.preferredFormats">
                <label class="info-label">Preferred Formats</label>
                <p class="info-value">{{ formatArray(questionnaireData.preferredFormats) }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.supplementAdherence">
                <label class="info-label">Supplement Adherence</label>
                <p class="info-value">{{ questionnaireData.supplementAdherence }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.dosingPreference">
                <label class="info-label">Dosing Preference</label>
                <p class="info-value">{{ questionnaireData.dosingPreference }}</p>
              </div>
              <div class="info-item" v-if="questionnaireData.budgetRange">
                <label class="info-label">Budget Range</label>
                <p class="info-value">{{ questionnaireData.budgetRange }}</p>
              </div>
            </div>
          </div>

          <!-- Health Goals -->
          <div class="questionnaire-section" v-if="questionnaireData.healthGoals">
            <h3 class="subsection-title">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Health Goals
            </h3>
            <div class="info-grid">
              <div class="info-item">
                <label class="info-label">Primary Goals</label>
                <p class="info-value">{{ formatArray(questionnaireData.healthGoals) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- No Questionnaire Data Message -->
        <div class="profile-section" v-else>
          <div class="section-header">
            <h2 class="section-title">Health Questionnaire</h2>
          </div>
          <div class="no-data-message">
            <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="no-data-text">You haven't completed the health questionnaire yet.</p>
            <router-link to="/take-quiz" class="complete-quiz-btn">
              Complete Questionnaire
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DashboardNavbar from './DashboardNavbar.vue';
import BackgroundGradient from '../homepage/BackgroundGradient.vue';
import { ref, computed, onMounted } from 'vue';
import { retrieveUserInfo, retrieveQuestionnaireData } from '../../services/auth';

// Reactive data
const userInfo = ref({
  name: '',
  email: '',
  joinDate: ''
});

const questionnaireData = ref<any>(null);
const loading = ref(true);

// Computed properties
const userInitials = computed(() => {
  if (!userInfo.value.name) return 'U';
  return userInfo.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
});

const hasDemographics = computed(() => {
  return questionnaireData.value && (
    questionnaireData.value.age ||
    questionnaireData.value.biologicalSex ||
    questionnaireData.value.height ||
    questionnaireData.value.weight
  );
});

const hasHealthStatus = computed(() => {
  return questionnaireData.value && (
    questionnaireData.value.generalHealth ||
    questionnaireData.value.physicalWellness ||
    questionnaireData.value.painDiscomfort ||
    questionnaireData.value.painDescription
  );
});

const hasSymptoms = computed(() => {
  return questionnaireData.value && (
    questionnaireData.value.currentSymptoms ||
    questionnaireData.value.medicalConditions ||
    questionnaireData.value.digestiveIssues ||
    questionnaireData.value.concerningSymptoms ||
    questionnaireData.value.pregnancyStatus
  );
});

const hasAllergiesMedications = computed(() => {
  return questionnaireData.value && (
    questionnaireData.value.allergies ||
    questionnaireData.value.allergyDetails ||
    questionnaireData.value.prescriptionMeds ||
    questionnaireData.value.prescriptionMedsList ||
    questionnaireData.value.otcSupplements ||
    questionnaireData.value.otcSupplementsList ||
    questionnaireData.value.advisedNotToTake ||
    questionnaireData.value.bloodTests ||
    questionnaireData.value.shareTestResults
  );
});

const hasDiet = computed(() => {
  return questionnaireData.value && (
    questionnaireData.value.specificDiet ||
    questionnaireData.value.otherDiet ||
    questionnaireData.value.mealsPerDay ||
    questionnaireData.value.foodFrequency
  );
});

const hasLifestyle = computed(() => {
  return questionnaireData.value && (
    questionnaireData.value.sleepHours ||
    questionnaireData.value.fatigueLevel ||
    questionnaireData.value.activityLevel ||
    questionnaireData.value.exerciseDays ||
    questionnaireData.value.difficultySwallowing ||
    questionnaireData.value.stressLevel ||
    questionnaireData.value.alcoholConsumption ||
    questionnaireData.value.tobaccoUse
  );
});

const hasMentalHealth = computed(() => {
  return questionnaireData.value && (
    questionnaireData.value.interestPleasure ||
    questionnaireData.value.depression ||
    questionnaireData.value.sleepIssues
  );
});

const hasSupplementPrefs = computed(() => {
  return questionnaireData.value && (
    questionnaireData.value.pastSupplementExperience ||
    questionnaireData.value.preferredFormats ||
    questionnaireData.value.supplementAdherence ||
    questionnaireData.value.dosingPreference ||
    questionnaireData.value.budgetRange
  );
});

// Methods
const formatDate = (dateString: string) => {
  if (!dateString) return 'Not available';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return 'Not available';
  }
};

const formatArray = (arrayData: any) => {
  if (!arrayData) return 'Not specified';
  if (Array.isArray(arrayData)) {
    return arrayData.join(', ');
  }
  return arrayData;
};

const loadUserData = async () => {
  try {
    loading.value = true;
    
    // Load user info
    const userData = await retrieveUserInfo();
    if (userData) {
      userInfo.value = userData;
    }
    
    // Load questionnaire data
    const questionnaire = await retrieveQuestionnaireData();
    if (questionnaire) {
      questionnaireData.value = questionnaire;
    }
    
  } catch (error) {
    console.error('Error loading user data:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadUserData();
});
</script>

<style scoped>
.profile-container {
  @apply max-w-6xl mx-auto px-4 md:px-8;
}

.profile-header {
  @apply text-center mb-12;
}

.profile-title {
  @apply text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text;
}

.profile-subtitle {
  @apply text-gray-400 text-lg max-w-2xl mx-auto;
}

.profile-content {
  @apply space-y-8;
}

.profile-section {
  @apply bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8;
}

.section-header {
  @apply flex items-center justify-between mb-8;
}

.section-title {
  @apply text-2xl font-bold text-white;
}

.section-subtitle {
  @apply text-gray-400 text-sm;
}

.avatar-section {
  @apply flex items-center;
}

.avatar-circle {
  @apply w-16 h-16 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold text-xl;
}

.info-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

.info-item {
  @apply space-y-2;
}

.info-label {
  @apply text-sm font-medium text-gray-400 uppercase tracking-wide;
}

.info-value {
  @apply text-white font-medium;
}

.questionnaire-section {
  @apply mb-8 last:mb-0;
}

.subsection-title {
  @apply text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10;
}

.no-data-message {
  @apply text-center py-12;
}

.no-data-text {
  @apply text-gray-400 text-lg mb-6;
}

.complete-quiz-btn {
  @apply inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105;
}

/* Responsive design */
@media (max-width: 768px) {
  .profile-container {
    @apply p-4;
  }
  
  .profile-section {
    @apply p-6;
  }
  
  .info-grid {
    @apply grid-cols-1;
  }
  
  .section-header {
    @apply flex-col items-start space-y-4;
  }
}

/* Animation */
.profile-section {
  animation: fadeInUp 0.6s ease-out;
}

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
</style>