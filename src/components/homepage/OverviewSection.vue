<template>
    <section class="relative py-16 md:py-24 px-4 overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="text-center mb-12 md:mb-20">
                <h2 class="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
                    <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                        Transform Your Health Journey
                    </span>
                </h2>
            </div>

            <!-- Two Column Layout -->
            <div class="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
                <!-- Left Column - Image -->
                <div class="lg:w-1/2 w-full perspective-1000">
                    <div class="relative group animate-float">
                        <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
                        <img 
                            src="@/assets/vitamin.png" 
                            alt="App Preview" 
                            class="rounded-2xl shadow-2xl w-full h-auto relative z-10 transform transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>

                <!-- Right Column - Features -->
                <div class="lg:w-1/2 space-y-8 md:space-y-12">
                    <!-- Feature 1 -->
                    <div class="feature-card" data-aos="fade-left" data-aos-delay="100">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 flex items-center justify-center backdrop-blur-sm">
                                <span class="text-[#4ADE80] text-2xl">⚡</span>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text mb-2">
                                Weekly Health Tracking
                            </h3>
                            <p class="text-gray-400 text-base md:text-lg">
                                Complete simple weekly surveys to track your symptoms and health changes consistently.
                            </p>
                        </div>
                    </div>

                    <!-- Feature 2 -->
                    <div class="feature-card" data-aos="fade-left" data-aos-delay="200">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 flex items-center justify-center backdrop-blur-sm">
                                <span class="text-[#3B82F6] text-2xl">🤖</span>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text mb-2">
                                AI-Powered Documentation
                            </h3>
                            <p class="text-gray-400 text-base md:text-lg">
                                Our AI automatically converts your survey responses into professional medical documentation.
                            </p>
                        </div>
                    </div>

                    <!-- Feature 3 -->
                    <div class="feature-card" data-aos="fade-left" data-aos-delay="300">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 flex items-center justify-center backdrop-blur-sm">
                                <span class="text-[#4ADE80] text-2xl">👨‍⚕️</span>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text mb-2">
                                Easy Doctor Communication
                            </h3>
                            <p class="text-gray-400 text-base md:text-lg">
                                Share comprehensive health reports with your healthcare providers in a format they understand.
                            </p>
                        </div>
                    </div>

                    <!-- Feature 4 -->
                    <div class="feature-card" data-aos="fade-left" data-aos-delay="400">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 flex items-center justify-center backdrop-blur-sm">
                                <span class="text-[#3B82F6] text-2xl">📈</span>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text mb-2">
                                Track Progress Over Time
                            </h3>
                            <p class="text-gray-400 text-base md:text-lg">
                                Monitor your health journey with detailed tracking of symptoms and improvements over time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.perspective-1000 {
    perspective: 1000px;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) rotate(0);
    }
    50% {
        transform: translateY(-10px) rotate(1deg);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.feature-card {
    @apply flex gap-6 p-6 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02] bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-white/20;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fadeIn 1s cubic-bezier(0.23, 1, 0.32, 1);
}

[data-aos="fade-left"] {
    opacity: 0;
    transform: translateX(20px);
    transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

[data-aos="fade-left"].aos-animate {
    opacity: 1;
    transform: translateX(0);
}
</style>

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