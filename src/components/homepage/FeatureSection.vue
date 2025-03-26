<template>
    <section class="bg-black text-white py-12 md:py-20 px-4">
        <div class="max-w-7xl mx-auto">
            <!-- Animated Section Header -->
            <div class="text-center mb-12 md:mb-20 animate-fade-in">
                <h2 class="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                    <span class="text-white">Why</span>
                    <span class="text-primary"> Choose Us?</span>
                </h2>
                <p class="text-base md:text-lg max-w-2xl mx-auto text-gray-400">
                    We combine cutting-edge AI technology with expert knowledge to provide 
                    you with the most personalized supplement recommendations.
                </p>
            </div>

            <!-- Animated Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                <!-- Feature cards with staggered animation -->
                <div class="animate-fade-in-up delay-200">
                    <!-- Feature 1 -->
                    <div class="bg-black/30 p-6 md:p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all hover:scale-105 duration-300">
                        <div class="mb-4 md:mb-6">
                            <div class="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                                <img src="https://img.icons8.com/ios-filled/50/ff6b35/pill.png" 
                                     alt="Supplements" 
                                     class="w-5 h-5 md:w-6 md:h-6">
                            </div>
                            <h3 class="text-lg md:text-xl font-bold mb-2 md:mb-3">Personalized Recommendations</h3>
                            <p class="text-gray-400 leading-relaxed text-sm md:text-base">
                                Get tailored supplement plans based on your unique profile, lifestyle, 
                                and health goals.
                            </p>
                        </div>
                        <ul class="space-y-2 md:space-y-3">
                            <li class="flex items-center text-gray-400 text-sm md:text-base">
                                <span class="text-primary mr-2">•</span>
                                Custom combinations
                            </li>
                            <li class="flex items-center text-gray-400 text-sm md:text-base">
                                <span class="text-primary mr-2">•</span>
                                Dosage guidance
                            </li>
                            <li class="flex items-center text-gray-400 text-sm md:text-base">
                                <span class="text-primary mr-2">•</span>
                                Regular updates
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="animate-fade-in-up delay-400">
                    <!-- Feature 2 -->
                    <div class="bg-black/30 p-6 md:p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all hover:scale-105 duration-300">
                        <div class="mb-4 md:mb-6">
                            <div class="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                                <img src="https://img.icons8.com/ios-filled/50/ff6b35/artificial-intelligence.png" 
                                     alt="AI" 
                                     class="w-5 h-5 md:w-6 md:h-6">
                            </div>
                            <h3 class="text-lg md:text-xl font-bold mb-2 md:mb-3">24/7 AI Health Assistant</h3>
                            <p class="text-gray-400 leading-relaxed text-sm md:text-base">
                                Access instant support and guidance through our advanced AI chat assistant.
                            </p>
                        </div>
                        <ul class="space-y-2 md:space-y-3">
                            <li class="flex items-center text-gray-400 text-sm md:text-base">
                                <span class="text-primary mr-2">•</span>
                                Instant responses
                            </li>
                            <li class="flex items-center text-gray-400 text-sm md:text-base">
                                <span class="text-primary mr-2">•</span>
                                Evidence-based info
                            </li>
                            <li class="flex items-center text-gray-400 text-sm md:text-base">
                                <span class="text-primary mr-2">•</span>
                                24/7 availability
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="animate-fade-in-up delay-600">
                    <!-- Feature 3 -->
                    <div class="bg-black/30 p-6 md:p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all hover:scale-105 duration-300">
                        <div class="mb-4 md:mb-6">
                            <div class="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                                <img src="https://img.icons8.com/ios-filled/50/ff6b35/health-graph.png" 
                                     alt="Progress" 
                                     class="w-5 h-5 md:w-6 md:h-6">
                            </div>
                            <h3 class="text-lg md:text-xl font-bold mb-2 md:mb-3">Progress Tracking</h3>
                            <p class="text-gray-400 leading-relaxed text-sm md:text-base">
                                Monitor your health journey with comprehensive tracking tools and insights.
                            </p>
                        </div>
                        <ul class="space-y-2 md:space-y-3">
                            <li class="flex items-center text-gray-400 text-sm md:text-base">
                                <span class="text-primary mr-2">•</span>
                                Health metrics
                            </li>
                            <li class="flex items-center text-gray-400 text-sm md:text-base">
                                <span class="text-primary mr-2">•</span>
                                Goal tracking
                            </li>
                            <li class="flex items-center text-gray-400 text-sm md:text-base">
                                <span class="text-primary mr-2">•</span>
                                Progress reports
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.text-primary {
    color: #FF6B35;
}

.bg-primary {
    background-color: #FF6B35;
}

.bg-primary\/10 {
    background-color: rgba(255, 107, 53, 0.1);
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

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-fade-in-up {
    animation: fadeInUp 1s ease-out;
}

.animate-fade-in {
    animation: fadeIn 1s ease-out;
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

.duration-300 {
    transition-duration: 300ms;
}
</style>
