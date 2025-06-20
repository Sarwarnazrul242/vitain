<template>
  <BackgroundGradient />
  <div class="relative">
    <section class="pt-32 pb-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center mb-12">
          <div class="mb-8">
            <div class="w-16 h-16 mx-auto bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold mb-4">
              <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                Verify Your Email
              </span>
            </h1>
            <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              We've sent a verification code to <span class="text-white font-semibold">{{ email }}</span>
            </p>
          </div>
        </div>
      </div>
      
      <div class="z-10 flex items-center flex-col justify-center gap-8">
        <div class="auth-container">
          <!-- OTP Input -->
          <div class="mb-8">
            <label class="input-label text-center justify-center">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Enter Verification Code
            </label>
            <div class="flex justify-center gap-3 mt-4">
              <input
                v-for="(digit, index) in 6"
                :key="index"
                v-model="otpDigits[index]"
                @input="handleOtpInput(index, $event)"
                @keydown="handleOtpKeydown(index, $event)"
                @paste="handleOtpPaste"
                type="text"
                maxlength="1"
                class="otp-input"
                :class="{ 'otp-input-filled': otpDigits[index] }"
                ref="otpInputs"
              />
            </div>
          </div>

          <!-- Timer and Resend -->
          <div class="text-center mb-8">
            <p class="text-gray-400 text-sm mb-4">
              Didn't receive the code? 
              <span 
                v-if="canResend"
                @click="resendCode"
                class="text-[#4ADE80] cursor-pointer hover:underline font-medium hover:text-[#3B82F6] transition-colors"
              >
                Resend code
              </span>
              <span v-else class="text-gray-500">
                Resend code in {{ formatTime(timeLeft) }}
              </span>
            </p>
          </div>

          <!-- Verify Button -->
          <button
            @click="verifyEmail"
            class="auth-button group"
            :disabled="!isOtpComplete"
          >
            <span class="button-bg"></span>
            <span class="button-text">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verify Email
            </span>
          </button>

          <!-- Back to Login -->
          <div class="text-center mt-6">
            <p class="text-gray-400">
              <span 
                @click="goBackToLogin"
                class="text-[#4ADE80] cursor-pointer hover:underline font-medium hover:text-[#3B82F6] transition-colors"
              >
                ← Back to Login
              </span>
            </p>
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref<string>(""); // Will be loaded from localStorage
const otpDigits = ref<string[]>(["", "", "", "", "", ""]);
const timeLeft = ref<number>(300); // 5 minutes
const canResend = ref<boolean>(false);
const otpInputs = ref<HTMLInputElement[]>([]);

const isOtpComplete = computed(() => {
  return otpDigits.value.every(digit => digit !== "");
});

let timer: NodeJS.Timeout | null = null;

const handleOtpInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  
  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    target.value = "";
    return;
  }
  
  otpDigits.value[index] = value;
  
  // Move to next input if value is entered
  if (value && index < 5) {
    otpInputs.value[index + 1]?.focus();
  }
};

const handleOtpKeydown = (index: number, event: KeyboardEvent) => {
  // Move to previous input on backspace if current input is empty
  if (event.key === "Backspace" && !otpDigits.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus();
  }
};

const handleOtpPaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const pastedData = event.clipboardData?.getData("text/plain");
  if (!pastedData) return;
  
  const digits = pastedData.replace(/\D/g, "").slice(0, 6);
  if (digits.length === 6) {
    otpDigits.value = digits.split("");
    // Focus the last input
    otpInputs.value[5]?.focus();
  }
};

const verifyEmail = () => {
  if (!isOtpComplete.value) return;
  
  const otp = otpDigits.value.join("");
  
  // Simulate verification (in real app, this would be an API call)
  console.log("Verifying OTP:", otp);
  
  // For demo purposes, accept any 6-digit code
  if (otp.length === 6 && /^\d{6}$/.test(otp)) {
    // Set email verification flag
    localStorage.setItem('emailVerified', 'true');
    
    // Clear verification data
    localStorage.removeItem('pendingVerificationEmail');
    localStorage.removeItem('pendingVerificationName');
    
    // Show success message
    alert("Email verified successfully! Now let's create your personalized profile.");
    router.push("/questionnaire");
  } else {
    alert("Invalid verification code. Please try again.");
  }
};

const resendCode = () => {
  // Simulate resending code
  console.log("Resending code to:", email.value);
  
  // Reset timer
  timeLeft.value = 300;
  canResend.value = false;
  
  // Clear OTP inputs
  otpDigits.value = ["", "", "", "", "", ""];
  
  alert("Verification code has been resent to your email.");
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const goBackToLogin = () => {
  router.push("/login");
};

const startTimer = () => {
  timer = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      canResend.value = true;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  }, 1000);
};

onMounted(() => {
  // Load email from localStorage
  const storedEmail = localStorage.getItem('pendingVerificationEmail');
  if (storedEmail) {
    email.value = storedEmail;
  } else {
    // If no email found, redirect back to login
    router.push("/login");
    return;
  }
  
  // Focus first OTP input
  setTimeout(() => {
    otpInputs.value[0]?.focus();
  }, 100);
  
  // Start countdown timer
  startTimer();
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.auth-container {
  @apply bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl w-full max-w-2xl;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.input-label {
  @apply font-semibold text-lg block mb-3 text-white flex items-center;
}

.otp-input {
  @apply w-12 h-12 text-center text-xl font-bold border-2 border-white/20 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 focus:border-[#4ADE80]/30 transition-all duration-300;
  backdrop-filter: blur(10px);
}

.otp-input:focus {
  @apply bg-white/10;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 222, 128, 0.2);
}

.otp-input-filled {
  @apply border-[#4ADE80]/50 bg-[#4ADE80]/10;
}

.auth-button {
  @apply relative w-full px-8 py-4 rounded-xl text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] mt-8;
}

.auth-button:not(:disabled) {
  @apply hover:shadow-lg;
}

.auth-button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.button-bg {
  @apply absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform duration-300 group-hover:scale-105;
}

.button-text {
  @apply relative text-white flex items-center justify-center gap-2 font-semibold;
}

/* Enhanced animations */
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

.auth-container {
  animation: fadeInUp 0.6s ease-out;
}

/* Hover effects for links */
a:hover {
  text-shadow: 0 0 8px currentColor;
}
</style>
