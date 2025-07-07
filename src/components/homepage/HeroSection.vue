<template>
    <section class="relative min-h-screen flex items-center justify-center text-center px-4 py-20 md:py-0 overflow-hidden">
        <!-- Modern Animated Background -->
        <div class="absolute inset-0 z-0">
            <!-- Animated geometric shapes -->
            <div class="absolute top-0 right-0 w-96 h-96">
                <div class="geometric-shape shape-1"></div>
            </div>
            <div class="absolute bottom-0 left-0 w-80 h-80">
                <div class="geometric-shape shape-2"></div>
            </div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                <div class="geometric-shape shape-3"></div>
            </div>
            
            <!-- Floating elements -->
            <div class="floating-element element-1"></div>
            <div class="floating-element element-2"></div>
            <div class="floating-element element-3"></div>
            <div class="floating-element element-4"></div>
            
            <!-- Animated grid lines -->
            <div class="grid-lines">
                <div class="grid-line line-1"></div>
                <div class="grid-line line-2"></div>
                <div class="grid-line line-3"></div>
            </div>
        </div>

        <!-- Responsive Flex Layout: Content Left, Image Right -->
        <div class="relative z-10 w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16">
            <!-- Left: Text Content -->
            <div class="flex-1 max-w-3xl text-left">
                <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text mb-6 animate-fade-in-down leading-tight">
                    Vitain your Vitality
                </h1>
                <p class="text-gray-300 text-lg md:text-xl mb-10 max-w-xl animate-fade-in-up delay-200 leading-relaxed">
                    We tailor supplements to your needs, help you monitor your progress, and give you full visibility into every ingredient 
                    and brand we recommend.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 animate-fade-in delay-400 mb-20">
                    <button 
                        @click="navigateToQuiz" 
                        class="group relative px-8 py-3 rounded-lg text-lg overflow-hidden hover:scale-105 transition-all duration-300"
                    v-if="userState==='Signed Out'">
                        <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform group-hover:scale-105"></span>
                        <span class="relative text-white font-medium">Take the Quiz</span>
                    </button>
                    <button 
                        @click="navigateToDashboard" 
                        class="group relative px-8 py-3 rounded-lg text-lg overflow-hidden hover:scale-105 transition-all duration-300"
                    v-if="userState==='Signed In'">
                        <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform group-hover:scale-105"></span>
                        <span class="relative text-white font-medium">Dashboard</span>
                    </button>
                    <button 
                        @click="scrollToLearnMore" 
                        class="group px-8 py-3 rounded-lg text-lg border border-gray-700 text-gray-300 hover:text-white transition-all hover:border-gray-500 hover:bg-white/5"
                    >
                        Learn More
                    </button>
                </div>
                
                <!-- Stats -->
                <div class="grid grid-cols-3 gap-8 animate-fade-in-up delay-600">
                    <div class="stats-card">
                        <div class="text-3xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">1000+</div>
                        <div class="text-gray-400 text-sm">Users</div>
                    </div>
                    <div class="stats-card">
                        <div class="text-3xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">50+</div>
                        <div class="text-gray-400 text-sm">Products</div>
                    </div>
                    <div class="stats-card">
                        <div class="text-3xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">24/7</div>
                        <div class="text-gray-400 text-sm">Support</div>
                    </div>
                </div>
            </div>
            <!-- Right: AI Capsule Image -->
            <div class="flex-1 flex items-center justify-center w-full md:w-auto mt-12 md:mt-0">
                <img src="@/assets/vitainAI.png" alt="Vitain AI Capsule" class="w-100 max-w-full h-auto drop-shadow-2xl animate-fade-in-up" />
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {userState, updateUserState} from "../../composables/featureCtrl";

const router = useRouter();

const navigateToQuiz = () => {
  router.push("/take-quiz");
};

const navigateToDashboard = () => {
  router.push("/dashboard");
};

const scrollToLearnMore = () => {
  const nextSection = document.querySelector("#learn-more");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
};


onMounted(() => {
  window.addEventListener("userState-change", updateUserState);
});

onUnmounted(() => {
  window.removeEventListener("userState-change", updateUserState);
});
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

/* Geometric shape animations */
@keyframes morph-shape {
  0%, 100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    transform: rotate(0deg);
  }
  25% {
    border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    transform: rotate(90deg);
  }
  50% {
    border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
    transform: rotate(180deg);
  }
  75% {
    border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
    transform: rotate(270deg);
  }
}

@keyframes float-shape {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(-10px) rotate(240deg);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.3;
    box-shadow: 0 0 20px rgba(74, 222, 128, 0.1);
  }
  50% {
    opacity: 0.6;
    box-shadow: 0 0 40px rgba(74, 222, 128, 0.2);
  }
}

/* Floating elements */
@keyframes float-element {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-30px) translateX(20px);
  }
  50% {
    transform: translateY(-15px) translateX(-15px);
  }
  75% {
    transform: translateY(-25px) translateX(10px);
  }
}

/* Grid lines */
@keyframes draw-line {
  0% {
    width: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 0.3;
  }
}

.geometric-shape {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(74, 222, 128, 0.1), rgba(59, 130, 246, 0.1));
  border: 1px solid rgba(74, 222, 128, 0.2);
  animation: morph-shape 20s ease-in-out infinite;
}

.shape-1 {
  animation-delay: 0s;
}

.shape-2 {
  animation-delay: -7s;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(74, 222, 128, 0.1));
  border-color: rgba(59, 130, 246, 0.2);
}

.shape-3 {
  animation-delay: -14s;
  background: linear-gradient(45deg, rgba(74, 222, 128, 0.05), rgba(59, 130, 246, 0.05));
  border-color: rgba(74, 222, 128, 0.1);
}

.floating-element {
  position: absolute;
  width: 4px;
  height: 4px;
  background: linear-gradient(45deg, #4ADE80, #3B82F6);
  border-radius: 50%;
  animation: float-element 15s ease-in-out infinite;
}

.element-1 {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.element-2 {
  top: 60%;
  right: 20%;
  animation-delay: -5s;
}

.element-3 {
  bottom: 30%;
  left: 25%;
  animation-delay: -10s;
}

.element-4 {
  top: 40%;
  right: 35%;
  animation-delay: -7s;
}

.grid-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.grid-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.3), transparent);
  animation: draw-line 8s ease-in-out infinite;
}

.line-1 {
  top: 25%;
  animation-delay: 0s;
}

.line-2 {
  top: 50%;
  animation-delay: -3s;
}

.line-3 {
  top: 75%;
  animation-delay: -6s;
}

.logo-container {
  position: relative;
  display: inline-block;
}

.logo-container::before {
  content: '';
  position: absolute;
  inset: -10px;
  background: linear-gradient(45deg, rgba(74, 222, 128, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 50%;
  animation: pulse-glow 4s ease-in-out infinite;
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
