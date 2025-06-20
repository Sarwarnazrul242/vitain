<template>
  <BackgroundGradient />
  <div class="relative">
    <section class="pt-32 pb-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="flex items-center justify-center">
          <div class="auth-container w-full max-w-md">
            <!-- Step 1: Email Input -->
            <div v-if="currentStep === 1" class="forgot-step">
              <h3 class="text-3xl font-bold mb-6 text-center">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  Forgot Password
                </span>
              </h3>
              
              <p class="text-gray-400 text-center mb-8">
                Enter your email address and we'll send you a verification code to reset your password.
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
                @click="sendOTP"
                class="submit-button"
                :disabled="!isEmailValid || isSending"
              >
                <span v-if="isSending" class="loading-spinner"></span>
                {{ isSending ? 'Sending...' : 'Send Verification Code' }}
              </button>
              
              <div class="text-center mt-6">
                <router-link to="/log-in" class="back-link">
                  ← Back to Login
                </router-link>
              </div>
            </div>

            <!-- Step 2: OTP Verification -->
            <div v-if="currentStep === 2" class="forgot-step">
              <h3 class="text-3xl font-bold mb-6 text-center">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  Verify Code
                </span>
              </h3>
              
              <p class="text-gray-400 text-center mb-8">
                We've sent a 6-digit verification code to <strong>{{ formData.email }}</strong>
              </p>
              
              <div class="input-group">
                <label class="input-label">Verification Code</label>
                <div class="otp-container">
                  <input
                    v-for="(digit, index) in 6"
                    :key="index"
                    type="text"
                    v-model="otpDigits[index]"
                    class="otp-input"
                    maxlength="1"
                    @input="handleOTPInput(index, $event)"
                    @keydown="handleOTPKeydown(index, $event)"
                    @paste="handleOTPPaste"
                    ref="otpInputs"
                  />
                </div>
                <span v-if="otpError" class="error-message">{{ otpError }}</span>
              </div>
              
              <div class="resend-section">
                <p class="text-gray-400 text-center">
                  Didn't receive the code? 
                  <button 
                    @click="resendOTP" 
                    class="resend-link"
                    :disabled="resendCountdown > 0"
                  >
                    {{ resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend Code' }}
                  </button>
                </p>
              </div>
              
              <button
                @click="verifyOTP"
                class="submit-button"
                :disabled="!isOTPComplete || isVerifying"
              >
                <span v-if="isVerifying" class="loading-spinner"></span>
                {{ isVerifying ? 'Verifying...' : 'Verify Code' }}
              </button>
              
              <div class="text-center mt-6">
                <button @click="goBack" class="back-link">
                  ← Back to Email
                </button>
              </div>
            </div>

            <!-- Step 3: New Password -->
            <div v-if="currentStep === 3" class="forgot-step">
              <h3 class="text-3xl font-bold mb-6 text-center">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  Reset Password
                </span>
              </h3>
              
              <p class="text-gray-400 text-center mb-8">
                Create a new password for your account.
              </p>
              
              <div class="input-group">
                <label class="input-label">New Password</label>
                <div class="password-input-container">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="formData.newPassword"
                    class="input-field pr-12"
                    placeholder="Enter new password"
                    @input="validatePassword"
                  />
                  <button
                    @click="togglePassword"
                    type="button"
                    class="password-toggle"
                  >
                    <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
                <div class="password-strength">
                  <div class="strength-bar">
                    <div 
                      class="strength-fill"
                      :class="passwordStrengthClass"
                      :style="{ width: passwordStrength + '%' }"
                    ></div>
                  </div>
                  <span class="strength-text" :class="passwordStrengthClass">
                    {{ passwordStrengthText }}
                  </span>
                </div>
                <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
              </div>
              
              <div class="input-group">
                <label class="input-label">Confirm Password</label>
                <div class="password-input-container">
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    v-model="formData.confirmPassword"
                    class="input-field pr-12"
                    placeholder="Confirm new password"
                    @input="validateConfirmPassword"
                  />
                  <button
                    @click="toggleConfirmPassword"
                    type="button"
                    class="password-toggle"
                  >
                    <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
                <span v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</span>
              </div>
              
              <button
                @click="resetPassword"
                class="submit-button"
                :disabled="!canResetPassword || isResetting"
              >
                <span v-if="isResetting" class="loading-spinner"></span>
                {{ isResetting ? 'Resetting...' : 'Reset Password' }}
              </button>
              
              <div class="text-center mt-6">
                <button @click="goBack" class="back-link">
                  ← Back to Verification
                </button>
              </div>
            </div>

            <!-- Step 4: Success -->
            <div v-if="currentStep === 4" class="forgot-step">
              <div class="success-container">
                <div class="success-icon">
                  <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 class="text-3xl font-bold mb-4 text-center text-white">
                  Password Reset Successfully!
                </h3>
                
                <p class="text-gray-400 text-center mb-8">
                  Your password has been updated. You can now log in with your new password.
                </p>
                
                <router-link to="/log-in" class="submit-button">
                  Go to Login
                </router-link>
              </div>
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
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentStep = ref(1);

// Form data
const formData = ref({
  email: '',
  newPassword: '',
  confirmPassword: ''
});

// OTP handling
const otpDigits = ref(['', '', '', '', '', '']);
const otpInputs = ref<HTMLInputElement[]>([]);

// UI states
const isSending = ref(false);
const isVerifying = ref(false);
const isResetting = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const resendCountdown = ref(0);

// Error messages
const emailError = ref('');
const otpError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');

// Computed properties
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(formData.value.email);
});

const isOTPComplete = computed(() => {
  return otpDigits.value.every(digit => digit !== '');
});

const passwordStrength = computed(() => {
  const password = formData.value.newPassword;
  if (!password) return 0;
  
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[a-z]/.test(password)) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  
  return strength;
});

const passwordStrengthClass = computed(() => {
  if (passwordStrength.value <= 25) return 'weak';
  if (passwordStrength.value <= 50) return 'fair';
  if (passwordStrength.value <= 75) return 'good';
  return 'strong';
});

const passwordStrengthText = computed(() => {
  if (passwordStrength.value <= 25) return 'Weak';
  if (passwordStrength.value <= 50) return 'Fair';
  if (passwordStrength.value <= 75) return 'Good';
  return 'Strong';
});

const canResetPassword = computed(() => {
  return formData.value.newPassword && 
         formData.value.confirmPassword && 
         formData.value.newPassword === formData.value.confirmPassword &&
         passwordStrength.value >= 75 &&
         !passwordError.value &&
         !confirmPasswordError.value;
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

const sendOTP = async () => {
  if (!isEmailValid.value) return;
  
  isSending.value = true;
  emailError.value = '';
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, we'll simulate a successful OTP send
    console.log('OTP sent to:', formData.value.email);
    
    // Start resend countdown
    resendCountdown.value = 60;
    const countdownInterval = setInterval(() => {
      resendCountdown.value--;
      if (resendCountdown.value <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
    
    currentStep.value = 2;
  } catch (error) {
    emailError.value = 'Failed to send verification code. Please try again.';
  } finally {
    isSending.value = false;
  }
};

const handleOTPInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  
  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    target.value = '';
    return;
  }
  
  otpDigits.value[index] = value;
  
  // Move to next input if value is entered
  if (value && index < 5) {
    nextTick(() => {
      otpInputs.value[index + 1]?.focus();
    });
  }
  
  // Move to previous input if value is deleted
  if (!value && index > 0) {
    nextTick(() => {
      otpInputs.value[index - 1]?.focus();
    });
  }
};

const handleOTPKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus();
  }
};

const handleOTPPaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const pastedData = event.clipboardData?.getData('text/plain') || '';
  const digits = pastedData.replace(/\D/g, '').slice(0, 6);
  
  if (digits.length === 6) {
    otpDigits.value = digits.split('');
    nextTick(() => {
      otpInputs.value[5]?.focus();
    });
  }
};

const verifyOTP = async () => {
  if (!isOTPComplete.value) return;
  
  isVerifying.value = true;
  otpError.value = '';
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const enteredOTP = otpDigits.value.join('');
    
    // For demo purposes, accept any 6-digit code
    if (enteredOTP.length === 6 && /^\d{6}$/.test(enteredOTP)) {
      console.log('OTP verified:', enteredOTP);
      currentStep.value = 3;
    } else {
      otpError.value = 'Invalid verification code. Please try again.';
    }
  } catch (error) {
    otpError.value = 'Failed to verify code. Please try again.';
  } finally {
    isVerifying.value = false;
  }
};

const resendOTP = async () => {
  if (resendCountdown.value > 0) return;
  
  isSending.value = true;
  otpError.value = '';
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('OTP resent to:', formData.value.email);
    
    // Reset countdown
    resendCountdown.value = 60;
    const countdownInterval = setInterval(() => {
      resendCountdown.value--;
      if (resendCountdown.value <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
    
    // Clear OTP inputs
    otpDigits.value = ['', '', '', '', '', ''];
    nextTick(() => {
      otpInputs.value[0]?.focus();
    });
  } catch (error) {
    otpError.value = 'Failed to resend code. Please try again.';
  } finally {
    isSending.value = false;
  }
};

const validatePassword = () => {
  passwordError.value = '';
  const password = formData.value.newPassword;
  
  if (!password) {
    passwordError.value = 'Password is required';
  } else if (password.length < 8) {
    passwordError.value = 'Password must be at least 8 characters long';
  } else if (!/[a-z]/.test(password)) {
    passwordError.value = 'Password must contain at least one lowercase letter';
  } else if (!/[A-Z]/.test(password)) {
    passwordError.value = 'Password must contain at least one uppercase letter';
  } else if (!/[0-9]/.test(password)) {
    passwordError.value = 'Password must contain at least one number';
  }
  
  validateConfirmPassword();
};

const validateConfirmPassword = () => {
  confirmPasswordError.value = '';
  const { newPassword, confirmPassword } = formData.value;
  
  if (!confirmPassword) {
    confirmPasswordError.value = 'Please confirm your password';
  } else if (newPassword !== confirmPassword) {
    confirmPasswordError.value = 'Passwords do not match';
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const resetPassword = async () => {
  if (!canResetPassword.value) return;
  
  isResetting.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Password reset successful');
    console.log('New password:', formData.value.newPassword);
    
    currentStep.value = 4;
  } catch (error) {
    passwordError.value = 'Failed to reset password. Please try again.';
  } finally {
    isResetting.value = false;
  }
};

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
