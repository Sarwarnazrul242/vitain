<template>
  <BackgroundGradient />
  <div class="relative">
    <section class="pt-32 pb-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="flex items-center justify-center">
          <div class="auth-container w-full max-w-md">
            <!-- S Email Input -->
              <h3 class="text-3xl font-bold mb-6 text-center">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  Forgot Password
                </span>
              </h3>
              
              <p class="text-gray-400 text-center mb-8">
                Enter your email address and we'll send you an email with a link and instuctions on how to reset your password.<br><br>
                You can login with your new password after following the instructions in the email.
              </p>
              
              <div class="input-group">
                <label class="input-label">Email Address</label>
                <input
                  type="email"
                  v-model="formData.email"
                  class="input-field"
                  placeholder="Enter your email address"
                  @input="validateEmail"
                />
                <span v-if="emailError" class="error-message">{{ emailError }}</span>
              </div>
              
              <button
                @click="handlePassword"
                class="submit-button"
              >
              Get Password Reset Instructions
              </button>
              
              <div class="text-center mt-6">
                <router-link to="/log-in" class="back-link">
                  ← Back to Login
                </router-link>
              </div>
            </div>
          </div>
        </div>
          

    </section>
    
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import BackgroundGradient from "../../components/homepage/BackgroundGradient.vue";
import Footer from "../../components/common/Footer.vue";
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { errors, ErrorType, AppError, isAppError, pastError, submitForm, resetPassword } from "../../services/auth";
const router = useRouter();
// Error messages
const emailError = ref('');
const otpError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');

// Step state (add this to fix the error)
const currentStep = ref(1);


// Computed properties
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(formData.value.email);
});

// Form data
const formData = ref({
  email: '', 
});


// Methods
const validateEmail = () => {
  emailError.value = '';
  if (!formData.value.email) {
    emailError.value = 'Email is required';
  } else if (!isEmailValid.value) {
    emailError.value = 'Please enter a valid email address';
  }
};


const handlePassword = async () =>
{
  if (!isEmailValid.value)
  {
  return
  }
  console.log("in handle password", formData.value.email)
  await resetPassword(formData.value.email)
}
const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    
    // Clear errors when going back
    emailError.value = '';
    otpError.value = '';
    passwordError.value = '';
    confirmPasswordError.value = '';
  }
};

onMounted(() => {
  console.log('Forgot password page loaded');
});
</script>

<style scoped>
.auth-container {
  @apply bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.forgot-step {
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

.error-message {
  @apply text-red-400 text-sm mt-2 block;
}

.submit-button {
  @apply w-full py-4 px-6 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2;
}

.submit-button:disabled {
  @apply opacity-50 cursor-not-allowed hover:scale-100;
}

.back-link {
  @apply text-[#4ADE80] hover:text-[#3B82F6] transition-colors duration-300 font-medium;
}

/* OTP Input Styling */
.otp-container {
  @apply flex gap-3 justify-center;
}

.otp-input {
  @apply w-12 h-12 text-center text-xl font-bold border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 focus:border-[#4ADE80]/30 transition-all duration-300;
  backdrop-filter: blur(10px);
}

.otp-input:focus {
  @apply bg-white/10;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 222, 128, 0.2);
}

.resend-section {
  @apply mb-6;
}

.resend-link {
  @apply text-[#4ADE80] hover:text-[#3B82F6] transition-colors duration-300 font-medium;
}

.resend-link:disabled {
  @apply text-gray-500 cursor-not-allowed;
}

/* Password Input Styling */
.password-input-container {
  @apply relative;
}

.password-toggle {
  @apply absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300;
}

.password-strength {
  @apply mt-3;
}

.strength-bar {
  @apply w-full h-2 bg-white/10 rounded-full overflow-hidden;
}

.strength-fill {
  @apply h-full transition-all duration-300;
}

.strength-fill.weak {
  @apply bg-red-500;
}

.strength-fill.fair {
  @apply bg-yellow-500;
}

.strength-fill.good {
  @apply bg-blue-500;
}

.strength-fill.strong {
  @apply bg-green-500;
}

.strength-text {
  @apply text-sm mt-1 block;
}

.strength-text.weak {
  @apply text-red-400;
}

.strength-text.fair {
  @apply text-yellow-400;
}

.strength-text.good {
  @apply text-blue-400;
}

.strength-text.strong {
  @apply text-green-400;
}

/* Success Step Styling */
.success-container {
  @apply text-center;
}

.success-icon {
  @apply text-[#4ADE80] mb-6;
}

/* Loading Spinner */
.loading-spinner {
  @apply w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin;
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
</style>
