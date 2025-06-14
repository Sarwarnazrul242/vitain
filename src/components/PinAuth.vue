<template>
  <div class="relative min-h-screen bg-[#0A0A0A] overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-full blur-[120px] animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-full blur-[120px] animate-pulse-slower"
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

    <!-- Content -->
    <div
      class="relative z-10 flex items-center justify-center min-h-screen px-4"
    >
      <div class="w-full max-w-md">
        <!-- PIN Step -->
        <div v-if="!showAgreement" class="animate-fade-in">
          <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              <span
                class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
              >
                Welcome to Vitain
              </span>
            </h1>
            <p class="text-gray-400 text-lg">Enter PIN to access the site</p>
          </div>

          <div class="pin-container animate-fade-in-up">
            <div class="pin-input">
              <input
                type="password"
                v-model="pin"
                maxlength="4"
                placeholder="Enter 4-digit PIN"
                @keyup.enter="verifyPin"
                class="w-full px-6 py-4 text-white text-center text-2xl tracking-widest bg-white/5 border border-white/10 rounded-xl focus:border-[#4ADE80] focus:ring-2 focus:ring-[#4ADE80]/20 outline-none transition-all duration-300"
              />
            </div>
            <button
              @click="verifyPin"
              class="w-full mt-6 px-6 py-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold rounded-xl hover:opacity-90 transform hover:scale-[1.02] transition-all duration-300"
            >
              Verify PIN
            </button>
            <p
              v-if="error"
              class="mt-4 text-red-400 text-center animate-fade-in"
            >
              {{ error }}
            </p>
          </div>
        </div>

        <!-- Agreement Step -->
        <div v-else class="animate-fade-in">
          <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              <span
                class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
              >
                Terms of Access
              </span>
            </h1>
            <p class="text-gray-400 text-lg">
              Please review and accept the terms
            </p>
          </div>

          <div class="agreement-container animate-fade-in-up">
            <div
              class="bg-white/5 border border-white/10 rounded-xl p-6 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar"
            >
              <h3 class="text-xl font-semibold mb-4 text-white">
                Terms and Conditions
              </h3>
              <div class="space-y-4 text-gray-300">
                <p>
                  By accessing this website, you agree to the following terms:
                </p>
                <ol class="list-decimal list-inside space-y-2">
                  <li>
                    You will use the information provided for personal health
                    and wellness purposes only.
                  </li>
                  <li>
                    You understand that supplement recommendations are not a
                    substitute for professional medical advice.
                  </li>
                  <li>
                    You will not share your access credentials with others.
                  </li>
                  <li>
                    You acknowledge that the information provided is based on
                    your input and may need to be adjusted based on your
                    specific circumstances.
                  </li>
                  <li>
                    You agree to consult with healthcare professionals before
                    making significant changes to your supplement regimen.
                  </li>
                </ol>
              </div>
            </div>

            <div class="flex items-center mb-6">
              <input
                type="checkbox"
                id="agree"
                v-model="agreed"
                class="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-[#4ADE80] focus:ring-[#4ADE80]"
              />
              <label for="agree" class="ml-3 text-gray-300">
                I have read and agree to the terms and conditions
              </label>
            </div>

            <button
              @click="acceptTerms"
              :disabled="!agreed"
              class="w-full px-6 py-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold rounded-xl hover:opacity-90 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Accept and Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PinAuth",
  data() {
    return {
      pin: "",
      error: "",
      showAgreement: false,
      agreed: false,
    };
  },
  methods: {
    verifyPin() {
      const correctPin = import.meta.env.VITE_SITE_PIN;
      if (this.pin === correctPin) {
        this.showAgreement = true;
        this.error = "";
      } else {
        this.error = "Invalid PIN. Please try again.";
        this.pin = "";
      }
    },
    acceptTerms() {
      if (this.agreed) {
        // Set session expiry to 1 hour from now
        const expiryTime = new Date().getTime() + 60 * 60 * 1000;
        localStorage.setItem("pinAuthExpiry", expiryTime);
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1);
  animation-delay: 0.2s;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
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

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #4ade80, #3b82f6);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #3b82f6, #4ade80);
}
</style>
