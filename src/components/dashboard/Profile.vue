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
            <div class="subsection-header">
              <h3 class="subsection-title">
                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Demographics
              </h3>
              <button
                @click="toggleDemographicsEdit"
                class="edit-btn"
                :class="{ 'editing': isEditingDemographics }"
              >
                <svg v-if="!isEditingDemographics" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {{ isEditingDemographics ? 'Cancel' : 'Edit' }}
              </button>
            </div>
            
            <div v-if="!isEditingDemographics" class="info-grid">
              <div class="info-card" v-if="questionnaireData.age">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="info-card-title">Age</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.age }} years</div>
              </div>
              <div class="info-card" v-if="questionnaireData.biologicalSex">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="info-card-title">Biological Sex</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.biologicalSex }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.height">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <span class="info-card-title">Height</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.height }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.weight">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <span class="info-card-title">Weight</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.weight }}</div>
              </div>
            </div>

            <!-- Edit Form -->
            <div v-else class="edit-form">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Age -->
                <div class="edit-field">
                  <label class="edit-label">Age</label>
                  <select
                    v-model="editForm.age"
                    class="edit-select"
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
                <div class="edit-field">
                  <label class="edit-label">Biological Sex</label>
                  <div class="flex gap-3">
                    <button
                      v-for="option in ['Male', 'Female']"
                      :key="option"
                      @click="editForm.biologicalSex = option.toLowerCase()"
                      :class="[
                        'flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium',
                        editForm.biologicalSex === option.toLowerCase()
                          ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                          : 'bg-white/10 hover:bg-white/20 text-white',
                      ]"
                    >
                      {{ option }}
                    </button>
                  </div>
                </div>

                <!-- Height -->
                <div class="edit-field">
                  <label class="edit-label">Height</label>
                  <select
                    v-model="editForm.height"
                    class="edit-select"
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
                <div class="edit-field">
                  <label class="edit-label">Weight (lbs)</label>
                  <input
                    type="number"
                    v-model="editForm.weight"
                    class="edit-input"
                    min="0"
                    max="999"
                    placeholder="Enter your weight"
                  />
                </div>
              </div>

              <!-- Save/Cancel Buttons -->
              <div class="edit-actions">
                <button
                  @click="saveDemographics"
                  :disabled="!isDemographicsFormValid"
                  class="save-btn"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </button>
                <button
                  @click="cancelDemographicsEdit"
                  class="cancel-btn"
                >
                  Cancel
                </button>
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
              <div class="info-card" v-if="questionnaireData.generalHealth">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span class="info-card-title">General Health</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.generalHealth }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.physicalWellness">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span class="info-card-title">Physical Wellness</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.physicalWellness }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.painDiscomfort">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span class="info-card-title">Pain/Discomfort</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.painDiscomfort }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.painDescription">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="info-card-title">Pain Description</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.painDescription }}</div>
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
              <div class="info-card" v-if="questionnaireData.currentSymptoms">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span class="info-card-title">Current Symptoms</span>
                </div>
                <div class="info-card-value">{{ formatArray(questionnaireData.currentSymptoms) }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.medicalConditions">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span class="info-card-title">Medical Conditions</span>
                </div>
                <div class="info-card-value">{{ formatArray(questionnaireData.medicalConditions) }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.digestiveIssues">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span class="info-card-title">Digestive Issues</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.digestiveIssues }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.concerningSymptoms">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span class="info-card-title">Concerning Symptoms</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.concerningSymptoms }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.pregnancyStatus">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span class="info-card-title">Pregnancy Status</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.pregnancyStatus }}</div>
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
              <div class="info-card" v-if="questionnaireData.allergies">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span class="info-card-title">Allergies</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.allergies }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.allergyDetails">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="info-card-title">Allergy Details</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.allergyDetails }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.prescriptionMeds">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span class="info-card-title">Prescription Medications</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.prescriptionMeds }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.prescriptionMedsList">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="info-card-title">Medications List</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.prescriptionMedsList }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.otcSupplements">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span class="info-card-title">OTC Supplements</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.otcSupplements }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.otcSupplementsList">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="info-card-title">Supplements List</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.otcSupplementsList }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.advisedNotToTake">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span class="info-card-title">Advised Not To Take</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.advisedNotToTake }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.bloodTests">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span class="info-card-title">Blood Tests</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.bloodTests }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.shareTestResults">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span class="info-card-title">Share Test Results</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.shareTestResults }}</div>
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
              <div class="info-card" v-if="questionnaireData.specificDiet">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  <span class="info-card-title">Specific Diet</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.specificDiet }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.otherDiet">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  <span class="info-card-title">Other Diet</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.otherDiet }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.mealsPerDay">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="info-card-title">Meals Per Day</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.mealsPerDay }}</div>
              </div>
              <div class="info-item food-frequency-item" v-if="questionnaireData.foodFrequency">
                <label class="info-label">Food Frequency</label>
                <div class="food-frequency-grid">
                  <div 
                    v-for="(frequency, food) in parseFoodFrequency(questionnaireData.foodFrequency)" 
                    :key="food"
                    class="food-frequency-card"
                  >
                    <div class="food-name">{{ formatFoodName(food) }}</div>
                    <div class="frequency-badge" :class="getFrequencyClass(frequency)">
                      {{ frequency }}
                    </div>
                  </div>
                </div>
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
              <div class="info-card" v-if="questionnaireData.sleepHours">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span class="info-card-title">Sleep Hours</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.sleepHours }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.fatigueLevel">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span class="info-card-title">Fatigue Level</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.fatigueLevel }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.activityLevel">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span class="info-card-title">Activity Level</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.activityLevel }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.exerciseDays">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span class="info-card-title">Exercise Days</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.exerciseDays }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.difficultySwallowing">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span class="info-card-title">Difficulty Swallowing</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.difficultySwallowing }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.stressLevel">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span class="info-card-title">Stress Level</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.stressLevel }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.alcoholConsumption">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="info-card-title">Alcohol Consumption</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.alcoholConsumption }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.tobaccoUse">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span class="info-card-title">Tobacco Use</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.tobaccoUse }}</div>
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
              <div class="info-card" v-if="questionnaireData.interestPleasure">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="info-card-title">Interest/Pleasure</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.interestPleasure }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.depression">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span class="info-card-title">Depression</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.depression }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.sleepIssues">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span class="info-card-title">Sleep Issues</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.sleepIssues }}</div>
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
              <div class="info-card" v-if="questionnaireData.pastSupplementExperience">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="info-card-title">Past Experience</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.pastSupplementExperience }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.preferredFormats">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span class="info-card-title">Preferred Formats</span>
                </div>
                <div class="info-card-value">{{ formatArray(questionnaireData.preferredFormats) }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.supplementAdherence">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="info-card-title">Supplement Adherence</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.supplementAdherence }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.dosingPreference">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="info-card-title">Dosing Preference</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.dosingPreference }}</div>
              </div>
              <div class="info-card" v-if="questionnaireData.budgetRange">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span class="info-card-title">Budget Range</span>
                </div>
                <div class="info-card-value">{{ questionnaireData.budgetRange }}</div>
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
              <div class="info-card">
                <div class="info-card-header">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="info-card-title">Primary Goals</span>
                </div>
                <div class="info-card-value">{{ formatArray(questionnaireData.healthGoals) }}</div>
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

// State for editing
const isEditingDemographics = ref(false);
const editForm = ref({
  age: '',
  biologicalSex: '',
  height: '',
  weight: ''
});

// Options for dropdowns
const ageOptions = computed(() => {
  const options = [];
  for (let i = 1; i <= 100; i++) {
    options.push(i);
  }
  return options;
});

const heightOptions = computed(() => {
  const heights: string[] = [];
  for (let feet = 4; feet <= 7; feet++) {
    for (let inches = 0; inches < 12; inches++) {
      if (feet === 7 && inches > 0) break; // Stop at 7'0"
      heights.push(`${feet}'${inches.toString().padStart(2, '0')}"`);
    }
  }
  return heights;
});

// Computed property for form validity
const isDemographicsFormValid = computed(() => {
  return editForm.value.age && editForm.value.biologicalSex && editForm.value.height && editForm.value.weight;
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

const parseFoodFrequency = (foodFrequency: any) => {
  if (!foodFrequency) return {};
  
  try {
    // If it's already an object, return it
    if (typeof foodFrequency === 'object' && foodFrequency !== null) {
      return foodFrequency;
    }
    
    // If it's a string, try to parse it
    if (typeof foodFrequency === 'string') {
      return JSON.parse(foodFrequency);
    }
    
    return {};
  } catch (error) {
    console.error('Error parsing food frequency:', error);
    return {};
  }
};

const formatFoodName = (foodName: string) => {
  // Convert camelCase or snake_case to Title Case
  return foodName
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .trim();
};

const getFrequencyClass = (frequency: string) => {
  const freq = frequency.toLowerCase();
  if (freq === 'never') return 'frequency-never';
  if (freq === 'rarely') return 'frequency-rarely';
  if (freq === 'weekly') return 'frequency-weekly';
  if (freq === 'daily') return 'frequency-daily';
  return 'frequency-other';
};

const toggleDemographicsEdit = () => {
  isEditingDemographics.value = !isEditingDemographics.value;
  if (isEditingDemographics.value) {
    editForm.value = {
      age: questionnaireData.value.age || '',
      biologicalSex: questionnaireData.value.biologicalSex || '',
      height: questionnaireData.value.height || '',
      weight: questionnaireData.value.weight || ''
    };
  }
};

const saveDemographics = async () => {
  try {
    // In a real app, you would send this data to an API
    console.log('Saving demographics:', editForm.value);
    // For now, just update the questionnaireData.value
    questionnaireData.value.age = editForm.value.age;
    questionnaireData.value.biologicalSex = editForm.value.biologicalSex;
    questionnaireData.value.height = editForm.value.height;
    questionnaireData.value.weight = editForm.value.weight;
    isEditingDemographics.value = false;
  } catch (error) {
    console.error('Error saving demographics:', error);
  }
};

const cancelDemographicsEdit = () => {
  isEditingDemographics.value = false;
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

onMounted(async () => {
  await loadUserData();
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

.subsection-header {
  @apply flex items-center justify-between mb-8;
}

.subsection-title {
  @apply text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10;
}

.edit-btn {
  @apply inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-300;
}

.edit-btn.editing {
  @apply bg-red-500/20 text-red-400 border border-red-500/30;
}

.edit-form {
  @apply bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6;
}

.edit-field {
  @apply space-y-4;
}

.edit-label {
  @apply text-sm font-medium text-gray-400;
}

.edit-select, .edit-input {
  @apply w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-colors duration-300;
}

.edit-select {
  @apply appearance-none;
}

.edit-select option {
  @apply bg-gray-800;
}

.edit-actions {
  @apply flex justify-end gap-4 mt-6;
}

.save-btn {
  @apply inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105;
}

.cancel-btn {
  @apply inline-flex items-center px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors duration-300;
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

/* Food Frequency Styles */
.food-frequency-item {
  @apply col-span-full;
}

.food-frequency-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4;
}

.food-frequency-card {
  @apply bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 hover:border-white/20 transition-all duration-300;
}

.food-frequency-card:hover {
  @apply transform -translate-y-1 shadow-lg;
}

.food-name {
  @apply text-white font-medium text-sm mb-2;
}

.frequency-badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium;
}

.frequency-never {
  @apply bg-red-500/20 text-red-400 border border-red-500/30;
}

.frequency-rarely {
  @apply bg-yellow-500/20 text-yellow-400 border border-yellow-500/30;
}

.frequency-weekly {
  @apply bg-blue-500/20 text-blue-400 border border-blue-500/30;
}

.frequency-daily {
  @apply bg-green-500/20 text-green-400 border border-green-500/30;
}

.frequency-other {
  @apply bg-gray-500/20 text-gray-400 border border-gray-500/30;
}

/* Info Card Styles */
.info-card {
  @apply bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 hover:border-white/20 transition-all duration-300;
}

.info-card:hover {
  @apply transform -translate-y-1 shadow-lg;
}

.info-card-header {
  @apply flex items-center gap-2 mb-3;
}

.info-card-title {
  @apply text-white font-medium text-sm;
}

.info-card-value {
  @apply text-gray-300 text-sm leading-relaxed;
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

/* Edit Functionality Styles */
.subsection-header {
  @apply flex items-center justify-between mb-4 pb-2 border-b border-white/10;
}

.edit-btn {
  @apply flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium bg-white/10 hover:bg-white/20 text-white;
}

.edit-btn.editing {
  @apply bg-red-500/20 text-red-400 border border-red-500/30;
}

.edit-form {
  @apply space-y-6;
}

.edit-field {
  @apply space-y-2;
}

.edit-label {
  @apply text-white font-medium text-sm;
}

.edit-select {
  @apply w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all;
}

.edit-input {
  @apply w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50;
}

.edit-actions {
  @apply flex gap-4 pt-4 border-t border-white/10;
}

.save-btn {
  @apply flex items-center px-6 py-3 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed;
}

.cancel-btn {
  @apply px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300;
}

/* Remove number input arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Custom scrollbar for selects */
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
