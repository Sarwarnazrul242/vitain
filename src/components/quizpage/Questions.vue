<template>
  <div class="relative min-h-screen bg-[#0A0A0A] px-4 py-8 sm:py-12">
    <!-- Animated background elements -->
    <div class="absolute inset-0 z-0">
      <!-- Gradient orbs -->
      <div
        class="absolute top-0 left-[20%] w-[500px] h-[500px] bg-gradient-to-b from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-full blur-[120px] animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-gradient-to-t from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-full blur-[120px] animate-pulse-slower"
      ></div>

      <!-- Animated particles -->
      <div class="particles-container">
        <div
          v-for="i in 6"
          :key="i"
          class="particle"
          :style="{ '--delay': `${i * 2}s` }"
        ></div>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      class="relative z-10 mb-6 bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg animate-fade-in"
    >
      {{ error }}
    </div>

    <!-- Progress Bar -->
    <div
      class="relative z-10 mb-8 sm:mb-12 max-w-6xl mx-auto animate-slide-down"
    >
      <div class="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] rounded-full transition-all duration-500 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <div class="flex justify-between mt-3 text-xs sm:text-sm text-white/70 px-2">
        <span class="transition-all duration-300" :class="{ 'text-[#4ADE80] font-medium': currentSection >= 1 }">Basic</span>
        <span class="transition-all duration-300" :class="{ 'text-[#4ADE80] font-medium': currentSection >= 2 }">Health</span>
        <span class="transition-all duration-300" :class="{ 'text-[#4ADE80] font-medium': currentSection >= 3 }">Symptoms</span>
        <span class="transition-all duration-300" :class="{ 'text-[#4ADE80] font-medium': currentSection >= 4 }">Medical</span>
        <span class="transition-all duration-300" :class="{ 'text-[#4ADE80] font-medium': currentSection >= 5 }">Meds</span>
        <span class="transition-all duration-300" :class="{ 'text-[#4ADE80] font-medium': currentSection >= 6 }">Diet</span>
        <span class="transition-all duration-300" :class="{ 'text-[#4ADE80] font-medium': currentSection >= 7 }">Lifestyle</span>
        <span class="transition-all duration-300" :class="{ 'text-[#4ADE80] font-medium': currentSection >= 8 }">Mental</span>
        <span class="transition-all duration-300" :class="{ 'text-[#4ADE80] font-medium': currentSection >= 9 }">Prefs</span>
        <span class="transition-all duration-300" :class="{ 'text-[#4ADE80] font-medium': currentSection >= 10 }">Goals</span>
      </div>
      <div class="text-center mt-2 text-xs text-white/50">
        <span class="font-medium">{{ Math.round(progress) }}% Complete</span>
      </div>
    </div>

    <!-- Section 1: Basic Demographics -->
    <div v-if="currentSection === 1" class="relative z-10 max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Basic Demographics</h2>
        <p class="text-white/70">Let's start with some basic information about you</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Age -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >What is your age?</label
          >
          <select
            v-model="formData.age"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all"
          >
            <option value="" class="bg-[#0A0A0A]">Select age</option>
            <option
              v-for="age in ageOptions"
              :key="age"
              :value="age"
              class="bg-[#0A0A0A]"
            >
              {{ age }} years
            </option>
          </select>
        </div>

        <!-- Biological Sex -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >What is your biological sex?</label
          >
          <div class="flex gap-3">
            <button
              v-for="option in ['Male', 'Female']"
              :key="option"
              @click="formData.biologicalSex = option.toLowerCase()"
              :class="[
                'flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium',
                formData.biologicalSex === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <!-- Height -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >What is your height?</label
          >
          <select
            v-model="formData.height"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all"
          >
            <option value="" class="bg-[#0A0A0A]">Select height</option>
            <option
              v-for="height in heightOptions"
              :key="height"
              :value="height"
              class="bg-[#0A0A0A]"
            >
              {{ height }}
            </option>
          </select>
        </div>

        <!-- Weight -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >What is your current weight? (lbs)</label
          >
          <input
            type="number"
            v-model="formData.weight"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            min="0"
            max="999"
            placeholder="Enter your weight"
          />
        </div>
      </div>

      <!-- Next Section Button -->
      <div class="mt-12 flex justify-center">
        <button
          @click="nextSection"
          :disabled="!isSection1Complete"
          class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0 z-0">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"
            ></div>
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
            ></div>
          </div>

          <!-- Button Text -->
          <span class="relative z-10 font-bold flex items-center gap-2">
            Next Section
          </span>
        </button>
      </div>
    </div>

    <!-- Section 2: General Health Status -->
    <div v-if="currentSection === 2" class="relative z-10 max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">General Health Status</h2>
        <p class="text-white/70">Tell us about your current health status</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <!-- General Health -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >In general, would you say your health is:</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in healthOptions"
              :key="option"
              @click="formData.generalHealth = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.generalHealth === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Physical Well-being -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Have you felt physically well in the past 7 days?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Yes', 'No', 'Not sure']"
              :key="option"
              @click="formData.physicalWellness = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.physicalWellness === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Pain or Discomfort -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Are you currently experiencing any pain or discomfort?</label
          >
          <div class="flex gap-3 mb-4">
            <button
              v-for="option in ['Yes', 'No']"
              :key="option"
              @click="formData.painDiscomfort = option.toLowerCase()"
              :class="[
                'flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium',
                formData.painDiscomfort === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              {{ option }}
            </button>
          </div>
          <input
            v-if="formData.painDiscomfort === 'yes'"
            v-model="formData.painDescription"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Please specify your pain or discomfort"
          />
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          @click="previousSection"
          class="px-8 py-4 rounded-full text-lg font-medium bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
        >
          Previous
        </button>
        <button
          @click="nextSection"
          :disabled="!isSection2Complete"
          class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0 z-0">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"
            ></div>
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
            ></div>
          </div>

          <!-- Button Text -->
          <span class="relative z-10 font-bold flex items-center gap-2">
            Next Section
          </span>
        </button>
      </div>
    </div>

    <!-- Section 3: Current Symptoms -->
    <div v-if="currentSection === 3" class="relative z-10 max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Current Symptoms</h2>
        <p class="text-white/70">Select all symptoms that apply to you</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Symptoms Selection -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] md:col-span-2"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Are you currently experiencing:</label
          >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 ">
            <button
              v-for="symptom in symptomsList"
              :key="symptom"
              @click="toggleSymptom(symptom)"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.currentSymptoms.includes(symptom)
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ symptom }}</span>
            </button>
          </div>
            <input
            v-model="formData.additionalSymptoms"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Please specify any other symptoms you are experiencing not listed above"
          />
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          @click="previousSection"
          class="px-8 py-4 rounded-full text-lg font-medium bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
        >
          Previous
        </button>
        <button
          @click="nextSection"
          :disabled="!isSection3Complete"
          class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0 z-0">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"
            ></div>
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
            ></div>
          </div>

          <!-- Button Text -->
          <span class="relative z-10 font-bold flex items-center gap-2">
            Next Section
          </span>
        </button>
      </div>
    </div>

    <!-- Section 4: Medical History -->
    <div v-if="currentSection === 4" class="relative z-10 max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Medical History</h2>
        <p class="text-white/70">Tell us about your medical background</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Medical Conditions -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] md:col-span-2"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Do you have or have you been diagnosed with any of the following conditions?</label
          >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <button
              v-for="condition in medicalConditionsList"
              :key="condition"
              @click="toggleMedicalCondition(condition)"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.medicalConditions.includes(condition)
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ condition }}</span>
            </button>
          </div>

          <input
            v-model="formData.additionalMedicalConditions"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Please specify any other conditions you have been diagnosed with not listed above"
          />
        </div>

        <!-- Digestive Issues -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Do you have any digestive or absorption issues?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Yes', 'No', 'Not sure']"
              :key="option"
              @click="formData.digestiveIssues = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.digestiveIssues === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Concerning Symptoms -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Have you experienced any unexplained weight loss, severe fatigue, or concerning symptoms recently?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Yes', 'No', 'Prefer not to say']"
              :key="option"
              @click="formData.concerningSymptoms = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.concerningSymptoms === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Pregnancy Status -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Are you currently pregnant, planning to become pregnant, or breastfeeding?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Yes', 'No', 'Prefer not to say']"
              :key="option"
              @click="formData.pregnancyStatus = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.pregnancyStatus === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Allergies -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Do you have any allergies or sensitivities to medications, foods, or supplements?</label
          >
          <div class="flex gap-3 mb-4">
            <button
              v-for="option in ['Yes', 'No']"
              :key="option"
              @click="formData.allergies = option.toLowerCase()"
              :class="[
                'flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium',
                formData.allergies === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              {{ option }}
            </button>
          </div>
          <input
            v-if="formData.allergies === 'yes'"
            v-model="formData.allergyDetails"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Please specify your allergies or sensitivities"
          />
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          @click="previousSection"
          class="px-8 py-4 rounded-full text-lg font-medium bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
        >
          Previous
        </button>
        <button
          @click="nextSection"
          :disabled="!isSection4Complete"
          class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0 z-0">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"
            ></div>
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
            ></div>
          </div>

          <!-- Button Text -->
          <span class="relative z-10 font-bold flex items-center gap-2">
            Next Section
          </span>
        </button>
      </div>
    </div>

    <!-- Section 5: Medications & Supplement Use -->
    <div v-if="currentSection === 5" class="relative z-10 max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Medications & Supplement Use</h2>
        <p class="text-white/70">Tell us about your current medications and supplements</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Prescription Medications -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Are you currently taking any prescription medications?</label
          >
          <div class="flex gap-3 mb-4">
            <button
              v-for="option in ['Yes', 'No']"
              :key="option"
              @click="formData.prescriptionMeds = option.toLowerCase()"
              :class="[
                'flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium',
                formData.prescriptionMeds === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              {{ option }}
            </button>
          </div>
          <input
            v-if="formData.prescriptionMeds === 'yes'"
            v-model="formData.prescriptionMedsList"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Please list your prescription medications"
          />
        </div>

        <!-- Over-the-counter Supplements -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Are you currently taking any over-the-counter supplements or herbal products?</label
          >
          <div class="flex gap-3 mb-4">
            <button
              v-for="option in ['Yes', 'No']"
              :key="option"
              @click="formData.otcSupplements = option.toLowerCase()"
              :class="[
                'flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium',
                formData.otcSupplements === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              {{ option }}
            </button>
          </div>
          <input
            v-if="formData.otcSupplements === 'yes'"
            v-model="formData.otcSupplementsList"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Please list your supplements and herbal products"
          />
        </div>

        <!-- Advised Not to Take -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Have you ever been advised not to take certain vitamins or supplements?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Yes', 'No', 'Not sure']"
              :key="option"
              @click="formData.advisedNotToTake = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.advisedNotToTake === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Blood Tests -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Have you had any recent blood tests related to vitamin or mineral levels (e.g., vitamin D, B12, iron)?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Yes', 'No', 'Not sure']"
              :key="option"
              @click="formData.bloodTests = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.bloodTests === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Share Test Results -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Would you be willing to share those test results to personalize your recommendations?</label
          >
          <div class="flex gap-3">
            <button
              v-for="option in ['Yes', 'No']"
              :key="option"
              @click="formData.shareTestResults = option.toLowerCase()"
              :class="[
                'flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium',
                formData.shareTestResults === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          @click="previousSection"
          class="px-8 py-4 rounded-full text-lg font-medium bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
        >
          Previous
        </button>
        <button
          @click="nextSection"
          :disabled="!isSection5Complete"
          class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0 z-0">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"
            ></div>
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
            ></div>
          </div>

          <!-- Button Text -->
          <span class="relative z-10 font-bold flex items-center gap-2">
            Next Section
          </span>
        </button>
      </div>
    </div>

    <!-- Section 6: Diet & Nutrition -->
    <div v-if="currentSection === 6" class="relative z-10 max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Diet & Nutrition</h2>
        <p class="text-white/70">Tell us about your eating habits and preferences</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Specific Diet -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Do you follow a specific diet?</label
          >
          <select
            v-model="formData.specificDiet"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all"
          >
            <option value="" class="bg-[#0A0A0A]">Select diet</option>
            <option value="no special diet" class="bg-[#0A0A0A]">No special diet</option>
            <option value="vegetarian" class="bg-[#0A0A0A]">Vegetarian</option>
            <option value="vegan" class="bg-[#0A0A0A]">Vegan</option>
            <option value="keto" class="bg-[#0A0A0A]">Keto</option>
            <option value="paleo" class="bg-[#0A0A0A]">Paleo</option>
            <option value="low-carb" class="bg-[#0A0A0A]">Low-carb</option>
            <option value="other" class="bg-[#0A0A0A]">Other</option>
          </select>
          <input
            v-if="formData.specificDiet === 'other'"
            v-model="formData.otherDiet"
            class="mt-3 w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Please specify your diet"
          />
        </div>

        <!-- Meals Per Day -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >How many meals do you typically eat per day?</label
          >
          <select
            v-model="formData.mealsPerDay"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all"
          >
            <option value="" class="bg-[#0A0A0A]">Select meals</option>
            <option value="1" class="bg-[#0A0A0A]">1 meal</option>
            <option value="2" class="bg-[#0A0A0A]">2 meals</option>
            <option value="3" class="bg-[#0A0A0A]">3 meals</option>
            <option value="4" class="bg-[#0A0A0A]">4 meals</option>
            <option value="5+" class="bg-[#0A0A0A]">5+ meals</option>
          </select>
        </div>

        <!-- Food Frequency -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] md:col-span-2"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >How often do you consume the following?</label
          >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="food in foodItems"
              :key="food"
              class="space-y-2"
            >
              <label class="text-white font-medium">{{ food }}</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="frequency in ['Daily', 'Weekly', 'Rarely', 'Never']"
                  :key="frequency"
                  @click="setFoodFrequency(food, frequency.toLowerCase())"
                  :class="[
                    'py-2 px-3 rounded-lg transition-all duration-300 text-xs font-medium',
                    formData.foodFrequency[food] === frequency.toLowerCase()
                      ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-white',
                  ]"
                >
                  {{ frequency }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Alcohol Consumption -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Do you consume alcohol?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Never', 'Occasionally', 'Frequently']"
              :key="option"
              @click="formData.alcoholConsumption = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.alcoholConsumption === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Tobacco Use -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Do you smoke or use tobacco products?</label
          >
          <div class="flex gap-3">
            <button
              v-for="option in ['Yes', 'No']"
              :key="option"
              @click="formData.tobaccoUse = option.toLowerCase()"
              :class="[
                'flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium',
                formData.tobaccoUse === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          @click="previousSection"
          class="px-8 py-4 rounded-full text-lg font-medium bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
        >
          Previous
        </button>
        <button
          @click="nextSection"
          :disabled="!isSection6Complete"
          class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0 z-0">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"
            ></div>
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
            ></div>
          </div>

          <!-- Button Text -->
          <span class="relative z-10 font-bold flex items-center gap-2">
            Next Section
          </span>
        </button>
      </div>
    </div>

    <!-- Section 7: Lifestyle & Activity -->
    <div v-if="currentSection === 7" class="relative z-10 max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Lifestyle & Activity</h2>
        <p class="text-white/70">Tell us about your daily habits and activity levels</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Sleep Hours -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >How many hours do you sleep per night?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['<4 hrs', '4–6 hrs', '7–9 hrs', '>9 hrs']"
              :key="option"
              @click="formData.sleepHours = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.sleepHours === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Fatigue Level -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >How often do you feel fatigued during the day?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Never', 'Occasionally', 'Often', 'Always']"
              :key="option"
              @click="formData.fatigueLevel = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.fatigueLevel === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Activity Level -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >How active are you weekly?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Sedentary', 'Lightly active', 'Moderately active', 'Very active', 'Athlete']"
              :key="option"
              @click="formData.activityLevel = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.activityLevel === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Exercise Days -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >How many days per week do you exercise?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['0', '1–2', '3–4', '5+']"
              :key="option"
              @click="formData.exerciseDays = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.exerciseDays === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Difficulty Swallowing -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Do you have difficulty swallowing pills or capsules?</label
          >
          <div class="flex gap-3">
            <button
              v-for="option in ['Yes', 'No']"
              :key="option"
              @click="formData.difficultySwallowing = option.toLowerCase()"
              :class="[
                'flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium',
                formData.difficultySwallowing === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <!-- Stress Levels -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >How would you rate your stress levels?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Low', 'Moderate', 'High']"
              :key="option"
              @click="formData.stressLevel = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.stressLevel === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          @click="previousSection"
          class="px-8 py-4 rounded-full text-lg font-medium bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
        >
          Previous
        </button>
        <button
          @click="nextSection"
          :disabled="!isSection7Complete"
          class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0 z-0">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"
            ></div>
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
            ></div>
          </div>

          <!-- Button Text -->
          <span class="relative z-10 font-bold flex items-center gap-2">
            Next Section
          </span>
        </button>
      </div>
    </div>

    <!-- Section 8: Mental & Emotional Health -->
    <div v-if="currentSection === 8" class="relative z-10 max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Mental & Emotional Health</h2>
        <p class="text-white/70">Tell us about your mental and emotional well-being</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Interest or Pleasure -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']"
              :key="option"
              @click="formData.interestPleasure = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.interestPleasure === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Depression -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Over the past 2 weeks, how often have you felt down, depressed, or hopeless?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']"
              :key="option"
              @click="formData.depression = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.depression === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Sleep Issues -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Over the past 2 weeks, how often have you had trouble sleeping or slept too much?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']"
              :key="option"
              @click="formData.sleepIssues = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.sleepIssues === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          @click="previousSection"
          class="px-8 py-4 rounded-full text-lg font-medium bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
        >
          Previous
        </button>
        <button
          @click="nextSection"
          :disabled="!isSection8Complete"
          class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0 z-0">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"
            ></div>
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
            ></div>
          </div>

          <!-- Button Text -->
          <span class="relative z-10 font-bold flex items-center gap-2">
            Next Section
          </span>
        </button>
      </div>
    </div>

    <!-- Section 9: Supplement Experience & Preferences -->
    <div v-if="currentSection === 9" class="relative z-10 max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Supplement Experience & Preferences</h2>
        <p class="text-white/70">Tell us about your supplement history and preferences</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Past Supplement Experience -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Have you taken any supplements in the past? What were your experiences?</label
          >
          <textarea
            v-model="formData.pastSupplementExperience"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50 resize-none"
            rows="4"
            placeholder="Describe your past supplement experiences, if any..."
          ></textarea>
        </div>

        <!-- Preferred Formats -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Are there specific types or formats you prefer?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="format in supplementFormats"
              :key="format"
              @click="togglePreferredFormat(format)"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.preferredFormats.includes(format)
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ format }}</span>
            </button>
          </div>
        </div>

        <!-- Supplement Adherence -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >How often do you remember to take supplements?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Always', 'Often', 'Sometimes', 'Rarely', 'Never']"
              :key="option"
              @click="formData.supplementAdherence = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.supplementAdherence === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Dosing Preference -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Do you prefer once-daily or multiple daily doses?</label
          >
          <div class="grid grid-cols-1 gap-2">
            <button
              v-for="option in ['Once daily', 'Multiple times', 'No preference']"
              :key="option"
              @click="formData.dosingPreference = option.toLowerCase()"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.dosingPreference === option.toLowerCase()
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Budget Range -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Do you have a budget range for supplements?</label
          >
          <select
            v-model="formData.budgetRange"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all"
          >
            <option value="" class="bg-[#0A0A0A]">Select budget range</option>
            <option value="under $20/month" class="bg-[#0A0A0A]">Under $20/month</option>
            <option value="$20-50/month" class="bg-[#0A0A0A]">$20-50/month</option>
            <option value="$50-100/month" class="bg-[#0A0A0A]">$50-100/month</option>
            <option value="$100+/month" class="bg-[#0A0A0A]">$100+/month</option>
            <option value="no budget limit" class="bg-[#0A0A0A]">No budget limit</option>
          </select>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          @click="previousSection"
          class="px-8 py-4 rounded-full text-lg font-medium bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
        >
          Previous
        </button>
        <button
          @click="nextSection"
          :disabled="!isSection9Complete"
          class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0 z-0">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"
            ></div>
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
            ></div>
          </div>

          <!-- Button Text -->
          <span class="relative z-10 font-bold flex items-center gap-2">
            Next Section
          </span>
        </button>
      </div>
    </div>

    <!-- Section 10: Health Goals -->
    <div v-if="currentSection === 10" class="relative z-10 max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Health Goals</h2>
        <p class="text-white/70">Select up to 3 main health goals that are most important to you</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Health Goals Selection -->
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] md:col-span-2"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >What are your main health goals? (Select up to 3)</label
          >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <button
              v-for="goal in healthGoalsList"
              :key="goal"
              @click="toggleHealthGoal(goal)"
              :class="[
                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                formData.healthGoals.includes(goal)
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]"
            >
              <span>{{ goal }}</span>
            </button>

            <!-- For other goals to be inputed-->

            <button @click="showOtherGoals = !showOtherGoals" 
            :class="[ 
              'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white',
                 showOtherGoals  && formData.healthGoals.length < 3
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                   : 'bg-white/10 hover:bg-white/20 text-white'
              ]"
              :disabled = "formData.healthGoals.length >= 3">Other</button>

          </div>
            
          <input
              v-if="showOtherGoals"
            v-model="formData.otherHealthGoals"
            :disabled = "formData.healthGoals.length >= 3"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Please specify any other health goals you have not listed above"
          />
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          @click="previousSection"
          class="px-8 py-4 rounded-full text-lg font-medium bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
        >
          Previous
        </button>
        <button
          @click="handleFormSubmission"
          :disabled="!isSection10Complete"
          class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0 z-0">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"
            ></div>
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
            ></div>
          </div>

          <!-- Button Text -->
          <span class="relative z-10 font-bold flex items-center gap-2">
            {{ finalButtonText }}
          </span>
        </button>
      </div>
    </div>
  </div>

  <!-- Already Completed Popup -->
  <div v-if="showAlreadyCompletedPopup" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 max-w-md mx-4 text-center">
      <div class="mb-6">
        <div class="w-16 h-16 mx-auto bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-4">Questions Already Completed</h3>
        <p class="text-gray-300 mb-6">
          You have already completed the questions. If you want to update any information, please go to "Profile Settings".
        </p>
      </div>
      <div class="flex gap-4">
        <button
          @click="goToProfileSettings"
          class="flex-1 px-6 py-3 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-medium rounded-xl hover:scale-105 transition-all duration-300"
        >
          Go to Profile Settings
        </button>
        <button
          @click="closePopup"
          class="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>

import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { submitForm, login, signup, detectLoginState, submitUserData, retrieveQuestionnaireData } from "../../services/auth";
import { reactive } from 'vue';
import { 
  heightOptions, 
  ageOptions, 
  healthOptions, 
  symptomsList, 
  medicalConditionsList, 
  foodItems, 
  supplementFormats, 
  healthGoalsList, 
  showOtherGoals
} from './QuestionData';
import { FacebookAuthProvider } from "firebase/auth/web-extension";

const router = useRouter();
const route = useRoute();
const loading = ref<string>("");
const error = ref("");
const currentSection = ref(1);
const showAlreadyCompletedPopup = ref(false);

// Detect if we're on the CompleteProfile route
const isCompleteProfile = computed(() => {
  return route.path === '/CompleteProfile';
});

// Button text based on route
const finalButtonText = computed(() => {
  return isCompleteProfile.value ? 'Complete Profile' : 'Get Your Personalized Plan';
});

// Check if user has already completed questions
const checkIfAlreadyCompleted =  async () => {
  if (route.path === '/take-quiz') {
    // Check if user is logged in and has completed questions
    try{
      const userState = sessionStorage.getItem("userState");
      const hasCompletedQuestions = await retrieveQuestionnaireState();
        
        if (userState === "Signed In" && hasCompletedQuestions) 
        {
          showAlreadyCompletedPopup.value = true;
          return true;
    }
  } catch (err)
    {
      
      throw err;
    }
  }

  return false;
  
};

const formData = ref({
  role: "user",
  action: "list",
  // Section 1: Basic Demographics
  age: "",
  biologicalSex: "",
  height: "",
  weight: "",
  // Section 2: General Health Status
  generalHealth: "",
  physicalWellness: "",
  painDiscomfort: "",
  painDescription: "",
  // Section 3: Current Symptoms
  currentSymptoms: [] as string[],
  additionalSymptoms: "",
  // Section 4: Medical History
  medicalConditions: [] as string[],
  additionalMedicalConditions: "",
  digestiveIssues: "",
  concerningSymptoms: "",
  pregnancyStatus: "",
  allergies: "",
  allergyDetails: "",
  // Section 5: Medications & Supplement Use
  prescriptionMeds: "",
  prescriptionMedsList: "",
  otcSupplements: "",
  otcSupplementsList: "",
  advisedNotToTake: "",
  bloodTests: "",
  shareTestResults: "",
  // Section 6: Diet & Nutrition
  specificDiet: "",
  otherDiet: "",
  mealsPerDay: "",
  foodFrequency: {} as Record<string, string>,
  alcoholConsumption: "",
  tobaccoUse: "",
  // Section 7: Lifestyle & Activity
  sleepHours: "",
  fatigueLevel: "",
  activityLevel: "",
  exerciseDays: "",
  difficultySwallowing: "",
  stressLevel: "",
  // Section 8: Mental & Emotional Health
  interestPleasure: "",
  depression: "",
  sleepIssues: "",
  // Section 9: Supplement Experience & Preferences
  pastSupplementExperience: "",
  preferredFormats: [] as string[],
  supplementAdherence: "",
  dosingPreference: "",
  budgetRange: "",
  // Section 10: Health Goals
  healthGoals: [] as string[],
  otherHealthGoals:""
});

// Section completion checks
const isSection1Complete = computed(() => {
  return formData.value.age && 
         formData.value.biologicalSex && 
         formData.value.height && 
         formData.value.weight;
});

const isSection2Complete = computed(() => {
  return formData.value.generalHealth && 
         formData.value.physicalWellness && 
         formData.value.painDiscomfort &&
         (formData.value.painDiscomfort === 'no' || 
          (formData.value.painDiscomfort === 'yes' && formData.value.painDescription));
});

const isSection3Complete = computed(() => {
  return formData.value.currentSymptoms.length > 0
});

const isSection4Complete = computed(() => {
  return formData.value.medicalConditions.length > 0 &&
         formData.value.digestiveIssues &&
         formData.value.concerningSymptoms &&
         formData.value.pregnancyStatus &&
         formData.value.allergies &&
         (formData.value.allergies === 'no' || 
          (formData.value.allergies === 'yes' && formData.value.allergyDetails))
});

const isSection5Complete = computed(() => {
  return formData.value.prescriptionMeds &&
         formData.value.otcSupplements &&
         formData.value.advisedNotToTake &&
         formData.value.bloodTests &&
         formData.value.shareTestResults &&
         (formData.value.prescriptionMeds === 'no' || 
          (formData.value.prescriptionMeds === 'yes' && formData.value.prescriptionMedsList)) &&
         (formData.value.otcSupplements === 'no' || 
          (formData.value.otcSupplements === 'yes' && formData.value.otcSupplementsList));
});

const isSection6Complete = computed(() => {
  return formData.value.specificDiet &&
         formData.value.mealsPerDay &&
         formData.value.alcoholConsumption &&
         formData.value.tobaccoUse &&
         (formData.value.specificDiet !== 'other' || 
          (formData.value.specificDiet === 'other' && formData.value.otherDiet));
});

const isSection7Complete = computed(() => {
  return formData.value.sleepHours &&
         formData.value.fatigueLevel &&
         formData.value.activityLevel &&
         formData.value.exerciseDays &&
         formData.value.difficultySwallowing &&
         formData.value.stressLevel;
});

const isSection8Complete = computed(() => {
  return formData.value.interestPleasure &&
         formData.value.depression &&
         formData.value.sleepIssues;
});

const isSection9Complete = computed(() => {
  return formData.value.supplementAdherence &&
         formData.value.dosingPreference &&
         formData.value.preferredFormats &&
         formData.value.budgetRange;
});

const isSection10Complete = computed(() => {
  //Account for other health goal field
  if (showOtherGoals.value)
  {
    return formData.value.healthGoals.length > 0 && formData.value.healthGoals.length < 3 && formData.value.otherHealthGoals;
  }

  else{
    return formData.value.healthGoals.length > 0 && formData.value.healthGoals.length <= 3
  }
 
});

const progress = computed(() => {
  const totalSections = 10;
  const completedSections = currentSection.value - 1;
  if (currentSection.value === 1 && isSection1Complete.value) {
    return 10;
  }
  if (currentSection.value === 2 && isSection2Complete.value) {
    return 20;
  }
  if (currentSection.value === 3 && isSection3Complete.value) {
    return 30;
  }
  if (currentSection.value === 4 && isSection4Complete.value) {
    return 40;
  }
  if (currentSection.value === 5 && isSection5Complete.value) {
    return 50;
  }
  if (currentSection.value === 6 && isSection6Complete.value) {
    return 60;
  }
  if (currentSection.value === 7 && isSection7Complete.value) {
    return 70;
  }
  if (currentSection.value === 8 && isSection8Complete.value) {
    return 80;
  }
  if (currentSection.value === 9 && isSection9Complete.value) {
    return 90;
  }
  if (currentSection.value === 10 && isSection10Complete.value) {
    return 100;
  }
  return Math.round((completedSections / totalSections) * 100);
});

const nextSection = () => {
  if (currentSection.value < 10) {
    if (currentSection.value === 1 && isSection1Complete.value) {
      currentSection.value++;
    } else if (currentSection.value === 2 && isSection2Complete.value) {
      currentSection.value++;
    } else if (currentSection.value === 3 && isSection3Complete.value) {
      currentSection.value++;
    } else if (currentSection.value === 4 && isSection4Complete.value) {
      currentSection.value++;
    } else if (currentSection.value === 5 && isSection5Complete.value) {
      currentSection.value++;
    } else if (currentSection.value === 6 && isSection6Complete.value) {
      currentSection.value++;
    } else if (currentSection.value === 7 && isSection7Complete.value) {
      currentSection.value++;
    } else if (currentSection.value === 8 && isSection8Complete.value) {
      currentSection.value++;
    } else if (currentSection.value === 9 && isSection9Complete.value) {
      currentSection.value++;
    }
  }
};

const previousSection = () => {
  if (currentSection.value > 1) {
    currentSection.value--;
  }
};

const toggleSymptom = (symptom: string) => {
  const index = formData.value.currentSymptoms.indexOf(symptom);
  if (index > -1) {
    formData.value.currentSymptoms.splice(index, 1);
  } else {
    // If "None of the above" is selected, clear all other symptoms
    if (symptom === "None of the above") {
      formData.value.currentSymptoms = ["None of the above"];
    } else {
      // If selecting a specific symptom, remove "None of the above"
      formData.value.currentSymptoms = formData.value.currentSymptoms.filter(s => s !== "None of the above");
      formData.value.currentSymptoms.push(symptom);
    }
  }
};

const toggleMedicalCondition = (condition: string) => {
  const index = formData.value.medicalConditions.indexOf(condition);
  if (index > -1) {
    formData.value.medicalConditions.splice(index, 1);
  } else {
    // If "None of the above" is selected, clear all other conditions
    if (condition === "None of the above") {
      formData.value.medicalConditions = ["None of the above"];
    } else {
      // If selecting a specific condition, remove "None of the above"
      formData.value.medicalConditions = formData.value.medicalConditions.filter(c => c !== "None of the above");
      formData.value.medicalConditions.push(condition);
    }
  }
};

const togglePreferredFormat = (format: string) => {
  const index = formData.value.preferredFormats.indexOf(format);
  if (index > -1) {
    formData.value.preferredFormats.splice(index, 1);
  } else {
    formData.value.preferredFormats.push(format);
  }
};

const toggleHealthGoal = (goal: string) => {
  const index = formData.value.healthGoals.indexOf(goal);

  const hasOtherGoal = formData.value.otherHealthGoals.trim() != ''
  const totalSelectedGoals = formData.value.healthGoals.length + (hasOtherGoal ? 1 : 0)
  if (index > -1) {
    formData.value.healthGoals.splice(index, 1);
    formData.value.otherHealthGoals="";
  } else {
    // Limit to 3 goals
    if (totalSelectedGoals < 3) {
      formData.value.healthGoals.push(goal);
    }
  }
};

const setFoodFrequency = (food: string, frequency: string) => {
  formData.value.foodFrequency[food] = frequency;
};

//Determine if user is logged in or not and take the user to be logged if the latter
const handleLoginState = async () => {
  try{
    const auth = await detectLoginState();
    return auth;
  } catch (err) {
    if (err.type == "login") { 
      //Stores formData.value
      sessionStorage.setItem("quizData", JSON.stringify(formData.value));
      router.push("/log-in");
    } else {
      console.log("Handlelogin state error", err)
    }
  }
}

const handleFormSubmission = async () => {
  try {
    console.log("about to handle form")
    error.value = ""
    
    // Save questionnaire data to Firebase and get AI recommendations
    await submitForm(formData.value, router, error.value)
    console.log("In handle form submission")
    
    // Redirect based on route
    if (isCompleteProfile.value) {
      // For CompleteProfile route, redirect to dashboard
      sessionStorage.removeItem("signupCompleted"); // Clear the signup flow flag
      router.push("/dashboard");
    } else {
      // For take-quiz route, store the form data and redirect to signup page
      sessionStorage.setItem("quizData", JSON.stringify(formData.value));
      sessionStorage.setItem("fromTakeQuiz", "true"); // Mark that user came from take-quiz
      router.push("/log-in");
    }
  } catch(err) {
    console.log("Handleform submission", err)
    // Show error to user if needed
    if (err.message) {
      error.value = err.message;
    }
  }
}

const retrieveQuestionnaireState = async  () => {

  try{
    const state = await retrieveQuestionnaireData();
    return state
  } catch (err)
  {
      throw err;
  }
}

const goToProfileSettings = () => {
  // Navigate to profile settings (you can update this path as needed)
  router.push("/profile");
  showAlreadyCompletedPopup.value = false;
};

const closePopup = () => {
  showAlreadyCompletedPopup.value = false;
  router.push("/dashboard");
};

watch ( [()=> formData.value.healthGoals.length, ()=> showOtherGoals.value], ([len, goalFlag])  => 
{
  if (len >= 3 || !goalFlag) //If showother goals is false then it should clear the contents of healthgoals
  {
    formData.value.otherHealthGoals =''
    showOtherGoals.value=false
  }
});

onMounted(async () => {
  // Check if user has already completed questions
  if (await checkIfAlreadyCompleted()) {
    return;
  }
  
  console.log('Questionnaire page loaded');
});

</script>

<style scoped>
.text-primary {
  color: #4ade80;
}

.bg-primary {
  background-color: #4ade80;
}

.ring-primary {
  --tw-ring-color: #4ade80;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slide-down {
  animation: slideDown 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
  animation-delay: var(--delay, 0s);
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-slower {
  animation: pulse-slow 6s ease-in-out infinite;
}

/* Floating particles animation */
.particles-container {
  @apply absolute inset-0 overflow-hidden;
}

.particle {
  @apply absolute w-2 h-2 rounded-full;
  background: linear-gradient(to right, #4ade80, #3b82f6);
  filter: blur(1px);
  animation: float-particle 15s linear infinite;
  animation-delay: var(--delay);
}

.particle:nth-child(1) {
  top: 20%;
  left: 10%;
}
.particle:nth-child(2) {
  top: 50%;
  right: 20%;
}
.particle:nth-child(3) {
  bottom: 30%;
  left: 30%;
}
.particle:nth-child(4) {
  top: 10%;
  right: 30%;
}
.particle:nth-child(5) {
  bottom: 20%;
  right: 10%;
}
.particle:nth-child(6) {
  top: 40%;
  left: 20%;
}

@keyframes float-particle {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, 30px) rotate(90deg);
    opacity: 0.6;
  }
  50% {
    transform: translate(0, 60px) rotate(180deg);
    opacity: 0.3;
  }
  75% {
    transform: translate(-30px, 30px) rotate(270deg);
    opacity: 0.6;
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
    opacity: 0.3;
  }
}

/* Remove number input arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Custom scrollbar */
select::-webkit-scrollbar {
  width: 8px;
}

select::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

select::-webkit-scrollbar-thumb {
  background: #4ade80;
  border-radius: 4px;
}

select::-webkit-scrollbar-thumb:hover {
  background: #3b82f6;
}
</style>

