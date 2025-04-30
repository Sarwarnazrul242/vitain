<template>
  <section
    class="relative min-h-screen flex bg-gradient-to-b from-[#4ADE80]/10 to-[#3B82F6]/10 items-center justify-center text-center px-4 py-20 md:py-0 bg-[#0A0A0A]"
  >
    <!-- Spline Background -->
    <div class="absolute inset-0 z-0">
      <!-- <spline-viewer 
                url="https://prod.spline.design/Gv6CVgMGSDtycZ0l/scene.splinecode"
                class="w-full h-full"
            ></spline-viewer> -->
    </div>

    <!-- Background gradient overlay -->
    <div class="absolute inset-0 z-1 bg-black/60"></div>

    <!-- Animated Content -->
    <div class="relative z-10 max-w-3xl mx-auto">
      <div class="mb-12 animate-float">
        <img
          src="@/assets/logo.png"
          alt="Vitain Logo"
          class="w-20 h-20 mx-auto"
        />
      </div>
      <h1
        class="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text mb-6 animate-fade-in-down leading-tight"
      >
        Your Journey to Better Health
      </h1>
      <p
        class="text-gray-300 text-lg md:text-xl mb-10 max-w-xl mx-auto animate-fade-in-up delay-200 leading-relaxed"
      >
        Get personalized supplement recommendations powered by AI technology.
      </p>
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-400 mb-20"
      >
        <button
          @click="navigateToQuiz"
          class="group relative px-8 py-3 rounded-lg text-lg overflow-hidden"
        >
          <span
            class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform group-hover:scale-105"
          ></span>
          <span class="relative text-white font-medium">Take the Quiz</span>
        </button>
        <button
          @click="scrollToLearnMore"
          class="group px-8 py-3 rounded-lg text-lg border border-gray-700 text-gray-300 hover:text-white transition-all hover:border-gray-500"
        >
          Learn More
        </button>
      </div>

      <!-- Simplified Stats -->
      <div class="grid grid-cols-3 gap-8 animate-fade-in-up delay-600">
        <div class="stats-card">
          <div
            class="text-3xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
          >
            1000+
          </div>
          <div class="text-gray-400 text-sm">Users</div>
        </div>
        <div class="stats-card">
          <div
            class="text-3xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
          >
            50+
          </div>
          <div class="text-gray-400 text-sm">Products</div>
        </div>
        <div class="stats-card">
          <div
            class="text-3xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
          >
            24/7
          </div>
          <div class="text-gray-400 text-sm">Support</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const navigateToQuiz = () => {
  router.push("/take-quiz");
};

const scrollToLearnMore = () => {
  const nextSection = document.querySelector("#learn-more");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
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

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
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

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-400 {
  animation-delay: 400ms;
}

.delay-600 {
  animation-delay: 600ms;
}

.stats-card {
  @apply text-center p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-gray-800 hover:border-gray-700 transition-all hover:scale-105;
}
</style>
