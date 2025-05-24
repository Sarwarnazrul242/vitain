<template>
  <section
    class="relative min-h-[60vh] flex items-center justify-center text-center px-4 bg-[#0A0A0A] overflow-hidden pb-24 pt-32"
  >
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

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mt-auto mx-auto">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-down">
        <span
          class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
        >
          Your Personalized Health Journey
        </span>
      </h1>
      <p
        class="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto animate-fade-in-up"
      >
        Answer a few questions to help us create your perfect supplement plan
        tailored to your unique needs and goals
      </p>

      <!-- Progress Steps -->
      <div class="flex justify-center items-center gap-16 mt-8 animate-fade-in">
        <div class="step-container group" v-for="step in 3" :key="step">
          <div class="relative">
            <div
              class="w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center"
              :class="[
                step === 1
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] scale-125'
                  : 'bg-white/20',
                'group-hover:scale-110',
              ]"
            >
              <span
                class="text-xs font-bold"
                :class="step === 1 ? 'text-white' : 'text-white/60'"
              >
                {{ step }}
              </span>
            </div>
            <div
              class="absolute -inset-3 bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-full blur-sm"
              v-if="step === 1"
            ></div>
          </div>
          <div
            class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium"
            :class="step === 1 ? 'text-white' : 'text-gray-400'"
          >
            {{ getStepName(step) }}
          </div>
        </div>
      </div>

      <!-- Estimated Time -->
      <div
        class="mt-12 text-gray-400 text-sm animate-fade-in-up"
        style="animation-delay: 0.5s"
      >
        <svg
          class="w-4 h-4 inline-block mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Takes about 2 minutes
      </div>
    </div>
  </section>
</template>

<script setup>
const getStepName = (step) => {
  switch (step) {
    case 1:
      return "Basic Info";
    case 2:
      return "Health Goals";
    case 3:
      return "Preferences";
    default:
      return "";
  }
};
</script>

<style scoped>
.step-container {
  @apply relative flex items-center;
}

.step-container:not(:last-child)::after {
  content: "";
  @apply absolute w-24 h-[2px] bg-white/20 left-8 top-1/2 transform -translate-y-1/2;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-down {
  animation: fadeInDown 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(0.23, 1, 0.32, 1);
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
</style>
