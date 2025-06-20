<template>
    <footer class="relative bg-[#0A0A0A] text-white py-16 overflow-hidden">
        <!-- Background Effects -->
        <div class="absolute inset-0 z-0">
            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-full blur-[120px] animate-pulse-slower"></div>
        </div>

        <div class="container mx-auto px-4 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Company Info -->
                <div class="col-span-1 md:col-span-2">
                    <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                        Vitain
                    </h3>
                    <p class="text-gray-400 mb-6 max-w-md">
                        Your AI-powered health companion. Get personalized supplement recommendations based on your unique health profile, goals, and lifestyle. Transform your wellness journey with science-backed insights.
                    </p>
                    <div class="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span class="flex items-center gap-2">
                            <span class="text-[#4ADE80]">✓</span>
                            AI-Powered Recommendations
                        </span>
                        <span class="flex items-center gap-2">
                            <span class="text-[#4ADE80]">✓</span>
                            Science-Backed Supplements
                        </span>
                        <span class="flex items-center gap-2">
                            <span class="text-[#4ADE80]">✓</span>
                            Personalized Health Plans
                        </span>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h4 class="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                    <ul class="space-y-3">
                        <li><a href="/" class="text-gray-400 hover:text-[#4ADE80] transition-colors duration-300">Home</a></li>
                        <li><a href="/how-it-works" class="text-gray-400 hover:text-[#4ADE80] transition-colors duration-300">How It Works</a></li>
                        <li><a href="/take-quiz" class="text-gray-400 hover:text-[#4ADE80] transition-colors duration-300">Take Quiz</a></li>
                        <li><a href="/contact" class="text-gray-400 hover:text-[#4ADE80] transition-colors duration-300">Contact</a></li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm">
                    © 2024 Vitain. All rights reserved. Empowering your health journey with AI.
                </p>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <a href="/privacy-policy" class="text-gray-400 hover:text-[#4ADE80] text-sm transition-colors duration-300">Privacy Policy</a>
                    <a href="/terms-of-service" class="text-gray-400 hover:text-[#4ADE80] text-sm transition-colors duration-300">Terms of Service</a>
                    <a href="/cookie-policy" class="text-gray-400 hover:text-[#4ADE80] text-sm transition-colors duration-300">Cookie Policy</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
// Footer component logic can be added here if needed
</script>

<style scoped>
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
