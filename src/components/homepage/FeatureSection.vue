<template>
    <section class="relative py-20 md:py-32 bg-[#0A0A0A] overflow-hidden">
        <!-- Background Effects -->
        <div class="absolute inset-0 z-0">
            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-full blur-[120px] animate-pulse-slower"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 relative z-10">
            <!-- Section Header -->
            <div class="text-center mb-16 md:mb-24">
                <h2 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                    <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                        Why Choose Vitain?
                    </span>
                </h2>
                <p class="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto animate-fade-in-up">
                    Experience the future of personalized supplements with our cutting-edge AI technology and expert-backed recommendations.
                </p>
            </div>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                <!-- AI Analysis -->
                <div class="feature-card group" data-aos="fade-up" data-aos-delay="100">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                    <div class="relative z-10 p-8">
                        <div class="icon-wrapper mb-6">
                            <span class="text-4xl">🤖</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                            AI-Powered Analysis
                        </h3>
                        <p class="text-gray-400 leading-relaxed">
                            Our advanced AI analyzes your health data to create perfectly tailored supplement recommendations.
                        </p>
                    </div>
                </div>

                <!-- Personalized Plans -->
                <div class="feature-card group" data-aos="fade-up" data-aos-delay="200">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                    <div class="relative z-10 p-8">
                        <div class="icon-wrapper mb-6">
                            <span class="text-4xl">🎯</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                            Personalized Plans
                        </h3>
                        <p class="text-gray-400 leading-relaxed">
                            Get custom supplement plans that adapt to your changing health needs and goals.
                        </p>
                    </div>
                </div>

                <!-- Quality Assurance -->
                <div class="feature-card group" data-aos="fade-up" data-aos-delay="300">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                    <div class="relative z-10 p-8">
                        <div class="icon-wrapper mb-6">
                            <span class="text-4xl">✨</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                            Quality Assurance
                        </h3>
                        <p class="text-gray-400 leading-relaxed">
                            All supplements are thoroughly tested and certified for maximum safety and effectiveness.
                        </p>
                    </div>
                </div>

                <!-- Expert Support -->
                <div class="feature-card group" data-aos="fade-up" data-aos-delay="400">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                    <div class="relative z-10 p-8">
                        <div class="icon-wrapper mb-6">
                            <span class="text-4xl">👨‍⚕️</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                            Expert Support
                        </h3>
                        <p class="text-gray-400 leading-relaxed">
                            Access to healthcare professionals for guidance and consultation when needed.
                        </p>
                    </div>
                </div>

                <!-- Progress Tracking -->
                <div class="feature-card group" data-aos="fade-up" data-aos-delay="500">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                    <div class="relative z-10 p-8">
                        <div class="icon-wrapper mb-6">
                            <span class="text-4xl">📊</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                            Progress Tracking
                        </h3>
                        <p class="text-gray-400 leading-relaxed">
                            Monitor your health improvements with detailed analytics and progress reports.
                        </p>
                    </div>
                </div>

                <!-- Research Based -->
                <div class="feature-card group" data-aos="fade-up" data-aos-delay="600">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                    <div class="relative z-10 p-8">
                        <div class="icon-wrapper mb-6">
                            <span class="text-4xl">🧬</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                            Research Based
                        </h3>
                        <p class="text-gray-400 leading-relaxed">
                            All recommendations are backed by the latest scientific research and studies.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="text-center mt-16 md:mt-24" data-aos="fade-up" data-aos-delay="700">
                <button class="relative group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-medium overflow-hidden">
                    <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform duration-300 group-hover:scale-105"></span>
                    <span class="relative text-white">
                        Start Your Journey
                        <svg class="w-5 h-5 inline-block ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

onMounted(() => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});
</script>

<style scoped>
.feature-card {
    @apply relative rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02];
}

.icon-wrapper {
    @apply w-16 h-16 rounded-2xl bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 flex items-center justify-center backdrop-blur-sm;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
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
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.7; }
}

.animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-slower {
    animation: pulse-slow 6s ease-in-out infinite;
}
</style>
