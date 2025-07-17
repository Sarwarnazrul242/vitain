<template>
    <section class="relative pt-32 pb-20">
        <div class="max-w-7xl mx-auto px-4 relative z-10">
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-6xl font-bold mb-6">
                    <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                        How Vitain Works
                    </span>
                </h1>
                <p class="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
                    Get personalized supplement recommendations in three simple steps, powered by advanced AI technology.
                </p>
            </div>

            <!-- Steps -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <!-- Step 1 -->
                <div class="step-card group">
                    <div class="relative z-10 p-8">
                        <div class="step-number mb-6">1</div>
                        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                            Take the Quiz
                        </h3>
                        <p class="text-gray-400 mb-6">
                            Answer a few questions about your health goals, lifestyle, and current supplements.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-center gap-3 text-gray-400">
                                <span class="text-[#4ADE80]">•</span>
                                Quick 5-minute assessment
                            </li>
                            <li class="flex items-center gap-3 text-gray-400">
                                <span class="text-[#4ADE80]">•</span>
                                Personalized questions
                            </li>
                            <li class="flex items-center gap-3 text-gray-400">
                                <span class="text-[#4ADE80]">•</span>
                                Health goal focused
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="step-card group">
                    <div class="relative z-10 p-8">
                        <div class="step-number mb-6">2</div>
                        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                            Get Recommendations
                        </h3>
                        <p class="text-gray-400 mb-6">
                            Our AI analyzes your responses and creates a personalized supplement plan.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-center gap-3 text-gray-400">
                                <span class="text-[#4ADE80]">•</span>
                                AI-powered analysis
                            </li>
                            <li class="flex items-center gap-3 text-gray-400">
                                <span class="text-[#4ADE80]">•</span>
                                Evidence-based suggestions
                            </li>
                            <li class="flex items-center gap-3 text-gray-400">
                                <span class="text-[#4ADE80]">•</span>
                                Tailored to your needs
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="step-card group">
                    <div class="relative z-10 p-8">
                        <div class="step-number mb-6">3</div>
                        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                            Track Progress
                        </h3>
                        <p class="text-gray-400 mb-6">
                            Monitor your health improvements and adjust recommendations as needed.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-center gap-3 text-gray-400">
                                <span class="text-[#4ADE80]">•</span>
                                Weekly check-ins
                            </li>
                            <li class="flex items-center gap-3 text-gray-400">
                                <span class="text-[#4ADE80]">•</span>
                                Progress visualization
                            </li>
                            <li class="flex items-center gap-3 text-gray-400">
                                <span class="text-[#4ADE80]">•</span>
                                Adaptive recommendations
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
           

            <!-- CTA Section -->
            <!-- <div class="text-center mt-20">
                <router-link 
                    to="/take-quiz"
                    class="relative group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-medium overflow-hidden"
                >
                    <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform group-hover:scale-105"></span>
                    <span class="relative text-white flex items-center gap-2">
                        Start Your Journey
                        <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </router-link>
            </div> -->
        </div>
    </section>
</template>

<script setup>
// No NavBar or BackgroundGradient imports needed for embeddable section
</script>

<style scoped>
.step-card {
    @apply relative p-6 rounded-2xl border border-white/10 hover:border-[#4ADE80] transition-all duration-300;
    background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(59,130,246,0.04) 100%);
    backdrop-filter: blur(8px);
}

.step-number {
    @apply w-12 h-12 rounded-full bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 flex items-center justify-center text-2xl font-bold text-white backdrop-blur-sm;
    background: linear-gradient(to right, rgba(74, 222, 128, 0.2), rgba(59, 130, 246, 0.2));
}

.feature-item {
    @apply p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300;
    background: linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
}
</style> 