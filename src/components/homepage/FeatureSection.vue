<template>
  <section class="relative py-20 md:py-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 relative z-10" id="learn-more">
      <!-- Section Header -->
      <div class="text-center mb-16 md:mb-24">
        <h2 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          <span
            class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
          >
            Why Choose Vitain?
          </span>
        </h2>
        <p 
          class="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto animate-fade-in-up"
        >
          Discover the future of supplement wellness powered by VitainAI grounded in data from scientific research and 
          government health databases.        </p>
      </div>

      <!-- Features Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        <!-- AI Analysis -->
        <div class="feature-card-simple">
          <div class="icon-wrapper-simple mb-6">
            <!-- Simple SVG icon: Target -->
            <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="14" stroke="#3B82F6" stroke-width="3"/><circle cx="18" cy="18" r="7" stroke="#4ADE80" stroke-width="3"/><circle cx="18" cy="18" r="2" fill="#3B82F6"/></svg>
          </div>
          <h3 class="text-2xl font-bold mb-4 text-gray-100">
            AI-Powered Analysis
          </h3>
          <p class="text-gray-400 leading-relaxed">
            VitainAI is fueled by state-of-the-art technology and powerful algorithms to analyze your health profile alongside its 
            scientific and government sources.
          </p>
        </div>

        <!-- Personalized Plans -->
        <div class="feature-card-simple">
          <div class="icon-wrapper-simple mb-6">
            <!-- Simple SVG icon: Target -->
            <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="14" stroke="#3B82F6" stroke-width="3"/><circle cx="18" cy="18" r="7" stroke="#4ADE80" stroke-width="3"/><circle cx="18" cy="18" r="2" fill="#3B82F6"/></svg>
          </div>
          <h3 class="text-2xl font-bold mb-4 text-gray-100">
            Personalized Plans
          </h3>
          <p class="text-gray-400 leading-relaxed">
            Receive custom supplement suggestions that evolve with your changing health and goals.
          </p>
        </div>

        <!-- Quality Assurance -->
        <div class="feature-card-simple">
          <div class="icon-wrapper-simple mb-6">
            <!-- Simple SVG icon: Shield/Check -->
            <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><path d="M18 4l12 4v7c0 8-5.5 13.5-12 17-6.5-3.5-12-9-12-17V8l12-4z" stroke="#4ADE80" stroke-width="2" fill="none"/><path d="M13 18l3 3 5-5" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h3 class="text-2xl font-bold mb-4 text-gray-100">
            Quality Assurance
          </h3>
          <p class="text-gray-400 leading-relaxed">
            All supplements are thoroughly tested and certified for safety and effectiveness.
          </p>
        </div>

        <!-- Progress Tracking -->
        <div class="feature-card-simple">
          <div class="icon-wrapper-simple mb-6">
            <!-- Simple SVG icon: Chart -->
            <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="8" y="20" width="4" height="8" rx="2" fill="#3B82F6"/><rect x="16" y="14" width="4" height="14" rx="2" fill="#4ADE80"/><rect x="24" y="10" width="4" height="18" rx="2" fill="#3B82F6"/></svg>
          </div>
          <h3 class="text-2xl font-bold mb-4 text-gray-100">
            Progress Tracking
          </h3>
          <p class="text-gray-400 leading-relaxed">
            Monitor your health improvements with detailed analytics and progress reports.
          </p>
        </div>

        <!-- Research Based -->
        <div class="feature-card-simple">
          <div class="icon-wrapper-simple mb-6">
            <!-- Simple SVG icon: DNA -->
            <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><path d="M10 8c6 8 10 12 16 20" stroke="#3B82F6" stroke-width="2"/><path d="M26 8c-6 8-10 12-16 20" stroke="#4ADE80" stroke-width="2"/></svg>
          </div>
          <h3 class="text-2xl font-bold mb-4 text-gray-100">
            Research Based
          </h3>
          <p class="text-gray-400 leading-relaxed">
            All recommendations are backed by the latest scientific research and studies.
          </p>
        </div>
      </div>

      <!-- Call to Action -->
      <div
        class="text-center mt-16 md:mt-24"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        <router-link
          to="/take-quiz"
          class="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-medium overflow-hidden bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white hover:from-[#3B82F6] hover:to-[#4ADE80] transition-colors duration-300"
        >
          Start Your Journey
          <svg
            class="w-5 h-5 inline-block ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });
});
</script>

<style scoped>
.feature-card-simple {
  @apply relative rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:border-[#4ADE80] shadow-md;
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(59,130,246,0.04) 100%);
  backdrop-filter: blur(8px);
  text-align: left;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.icon-wrapper-simple {
  @apply flex items-center justify-center rounded-xl bg-[#232b3a] w-16 h-16 mb-4;
}
</style>
