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
                        We tailor supplements to your needs, help you monitor your progress, 
                        and give you full visibility into every ingredient and brand we recommend, powered by VitainAI.
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
                        <li><router-link to="/"  class="text-gray-400 hover:text-[#4ADE80] transition-colors duration-300">Home</router-link></li>
                        <li><router-link to="/supplements"  class="text-gray-400 hover:text-[#4ADE80] transition-colors duration-300">Supplements</router-link></li>
                        <li><router-link to="/business"  class="text-gray-400 hover:text-[#4ADE80] transition-colors duration-300">Business</router-link></li>                         
                        <li><router-link to="/contact"  class="text-gray-400 hover:text-[#4ADE80] transition-colors duration-300">Contact</router-link></li>
                        <li><router-link to="/take-quiz"  class="text-gray-400 hover:text-[#4ADE80] transition-colors duration-300"  v-if="userState==='Signed Out'">Take Quiz</router-link></li>
                        <li><router-link to="/log-in"  class="text-gray-400 hover:text-[#4ADE80] transition-colors duration-300"  v-if="userState==='Signed Out'">Log in</router-link></li>
                        <li><router-link to="/dashboard"  class="text-gray-400 hover:text-[#4ADE80] transition-colors duration-300"  v-if="userState==='Signed In'">Dashboard</router-link></li> 
                    </ul>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm">
                    © 2025 Vitain. All rights reserved. Vitain your Vitality.
                </p>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <router-link to="/privacy-policy" class="text-gray-400 hover:text-[#4ADE80] text-sm transition-colors duration-300">Privacy Policy</router-link>
                    <router-link to="/terms-of-service" class="text-gray-400 hover:text-[#4ADE80] text-sm transition-colors duration-300">Terms of Service</router-link>
                    <router-link to="/cookie-policy" class="text-gray-400 hover:text-[#4ADE80] text-sm transition-colors duration-300">Cookie Policy</router-link>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
import {userState, updateUserState} from "../../composables/featureCtrl";
import { onMounted, onUnmounted } from "vue";
onMounted(() => {
  window.addEventListener("userState-change", updateUserState);
});

onUnmounted(() => {
  window.removeEventListener("userState-change", updateUserState);
});
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
