<template>
    <section class="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center py-16 md:py-24 overflow-hidden">
        <!-- Content -->
        <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h2 class="text-4xl md:text-6xl font-bold mb-6 md:mb-8 animate-fade-in">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                    Ready to Transform Your Health?
                </span>
            </h2>
            <p class="text-gray-300 text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto animate-fade-in-up">
                Take our comprehensive quiz to receive personalized supplement recommendations 
                tailored to your unique needs and goals.
            </p>
            
            <!-- Feature cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                <div class="feature-card group" data-aos="zoom-in" data-aos-delay="100">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                    <div class="relative z-10">
                        <div class="text-[#4ADE80] text-3xl mb-3">⚡</div>
                        <h3 class="text-white font-bold mb-2 text-lg">Quick & Easy</h3>
                        <p class="text-gray-400">Takes only 5 minutes</p>
                    </div>
                </div>
                
                <div class="feature-card group" data-aos="zoom-in" data-aos-delay="200">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                    <div class="relative z-10">
                        <div class="text-[#3B82F6] text-3xl mb-3">🎯</div>
                        <h3 class="text-white font-bold mb-2 text-lg">Personalized</h3>
                        <p class="text-gray-400">Tailored to your needs</p>
                    </div>
                </div>
                
                <div class="feature-card group" data-aos="zoom-in" data-aos-delay="300">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                    <div class="relative z-10">
                        <div class="text-[#4ADE80] text-3xl mb-3">🧬</div>
                        <h3 class="text-white font-bold mb-2 text-lg">Scientific</h3>
                        <p class="text-gray-400">Evidence-based approach</p>
                    </div>
                </div>
            </div>

            <!-- CTA Button -->
            <button 
                @click="startQuiz"
                class="relative group px-8 md:px-12 py-4 md:py-5 rounded-xl text-lg md:text-xl font-medium overflow-hidden animate-fade-in-up"
            >
                <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform duration-300 group-hover:scale-105"></span>
                <span class="relative text-white flex items-center justify-center gap-2">
                    Take the Quiz Now
                    <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </span>
            </button>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from "vue";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

const startQuiz = () => {
  // Add your quiz navigation logic here
};

// onMounted(() => {
//     AOS.init({
//         duration: 1000,
//         once: true,
//         offset: 100
//     });
// });
</script>

<style scoped>
.feature-card {
  @apply relative p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02];
}

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
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(to right, #4ade80, #3b82f6);
  border-radius: 50%;
  filter: blur(1px);
  animation: float-particle 15s linear infinite;
}

.particle:nth-child(1) {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.particle:nth-child(2) {
  top: 50%;
  right: 20%;
  animation-delay: -5s;
}

.particle:nth-child(3) {
  bottom: 30%;
  left: 30%;
  animation-delay: -10s;
}

@keyframes float-particle {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, 30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 50px) rotate(240deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}
</style>
