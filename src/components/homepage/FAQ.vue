<template>
    <section class="relative py-20 md:py-32 overflow-hidden">
        <div class="max-w-6xl mx-auto px-4 relative z-10">
            <!-- Section Header -->
            <div class="text-center mb-16 md:mb-24">
                <h2 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                    <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                        Frequently Asked Questions
                    </span>
                </h2>
                <p class="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto animate-fade-in-up">
                    Get answers to the most common questions about our AI-powered health platform and personalized supplement recommendations.
                </p>
            </div>

            <!-- FAQ Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- FAQ Item 1 -->
                <div class="faq-item" @click="toggleFAQ(0)">
                    <div class="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                        <div class="flex justify-between items-start">
                            <h3 class="text-xl font-semibold text-white mb-3 pr-4">
                                How does Vitain's AI create personalized recommendations?
                            </h3>
                            <span class="text-[#4ADE80] text-2xl font-bold transition-transform duration-300" :class="{ 'rotate-45': openFAQ === 0 }">
                                +
                            </span>
                        </div>
                        <div v-if="openFAQ === 0" class="mt-4 text-gray-400 animate-fade-in">
                            <p>Our AI analyzes your health assessment responses, medical history, lifestyle factors, and health goals to create personalized supplement recommendations. The system uses advanced algorithms trained on thousands of research studies and clinical data to ensure evidence-based suggestions tailored to your unique needs.</p>
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 2 -->
                <div class="faq-item" @click="toggleFAQ(1)">
                    <div class="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                        <div class="flex justify-between items-start">
                            <h3 class="text-xl font-semibold text-white mb-3 pr-4">
                                Are the supplement recommendations safe?
                            </h3>
                            <span class="text-[#4ADE80] text-2xl font-bold transition-transform duration-300" :class="{ 'rotate-45': openFAQ === 1 }">
                                +
                            </span>
                        </div>
                        <div v-if="openFAQ === 1" class="mt-4 text-gray-400 animate-fade-in">
                            <p>While our recommendations are based on scientific research, they are for informational purposes only. We always recommend consulting with your healthcare provider before starting any supplement regimen, especially if you have existing medical conditions or are taking medications.</p>
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 3 -->
                <div class="faq-item" @click="toggleFAQ(2)">
                    <div class="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                        <div class="flex justify-between items-start">
                            <h3 class="text-xl font-semibold text-white mb-3 pr-4">
                                How long does the health assessment take?
                            </h3>
                            <span class="text-[#4ADE80] text-2xl font-bold transition-transform duration-300" :class="{ 'rotate-45': openFAQ === 2 }">
                                +
                            </span>
                        </div>
                        <div v-if="openFAQ === 2" class="mt-4 text-gray-400 animate-fade-in">
                            <p>The comprehensive health assessment typically takes 5-10 minutes to complete. It includes questions about your current health status, lifestyle habits, dietary preferences, and wellness goals. The more detailed your responses, the more personalized your recommendations will be.</p>
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 4 -->
                <div class="faq-item" @click="toggleFAQ(3)">
                    <div class="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                        <div class="flex justify-between items-start">
                            <h3 class="text-xl font-semibold text-white mb-3 pr-4">
                                Can I update my recommendations over time?
                            </h3>
                            <span class="text-[#4ADE80] text-2xl font-bold transition-transform duration-300" :class="{ 'rotate-45': openFAQ === 3 }">
                                +
                            </span>
                        </div>
                        <div v-if="openFAQ === 3" class="mt-4 text-gray-400 animate-fade-in">
                            <p>Absolutely! We encourage you to retake the assessment periodically as your health needs change. You can update your profile anytime to reflect new health goals, lifestyle changes, or medical conditions. Our AI will adjust your recommendations accordingly.</p>
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 5 -->
                <div class="faq-item" @click="toggleFAQ(4)">
                    <div class="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                        <div class="flex justify-between items-start">
                            <h3 class="text-xl font-semibold text-white mb-3 pr-4">
                                Do you ship supplements directly?
                            </h3>
                            <span class="text-[#4ADE80] text-2xl font-bold transition-transform duration-300" :class="{ 'rotate-45': openFAQ === 4 }">
                                +
                            </span>
                        </div>
                        <div v-if="openFAQ === 4" class="mt-4 text-gray-400 animate-fade-in">
                            <p>Currently, we provide personalized supplement recommendations and partner with trusted suppliers. You can purchase recommended supplements through our platform or from your preferred retailer. We're working on direct shipping options for the future.</p>
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 6 -->
                <div class="faq-item" @click="toggleFAQ(5)">
                    <div class="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                        <div class="flex justify-between items-start">
                            <h3 class="text-xl font-semibold text-white mb-3 pr-4">
                                Is my health information secure?
                            </h3>
                            <span class="text-[#4ADE80] text-2xl font-bold transition-transform duration-300" :class="{ 'rotate-45': openFAQ === 5 }">
                                +
                            </span>
                        </div>
                        <div v-if="openFAQ === 5" class="mt-4 text-gray-400 animate-fade-in">
                            <p>Yes, we take data security very seriously. All your health information is encrypted, stored securely, and never shared without your explicit consent. We comply with all relevant privacy regulations and use industry-standard security measures to protect your data.</p>
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 7 -->
                <div class="faq-item" @click="toggleFAQ(6)">
                    <div class="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                        <div class="flex justify-between items-start">
                            <h3 class="text-xl font-semibold text-white mb-3 pr-4">
                                What if I experience side effects?
                            </h3>
                            <span class="text-[#4ADE80] text-2xl font-bold transition-transform duration-300" :class="{ 'rotate-45': openFAQ === 6 }">
                                +
                            </span>
                        </div>
                        <div v-if="openFAQ === 6" class="mt-4 text-gray-400 animate-fade-in">
                            <p>If you experience any adverse reactions to supplements, stop taking them immediately and consult your healthcare provider. You can also report side effects through our platform, which helps us improve our recommendations and safety protocols.</p>
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 8 -->
                <div class="faq-item" @click="toggleFAQ(7)">
                    <div class="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                        <div class="flex justify-between items-start">
                            <h3 class="text-xl font-semibold text-white mb-3 pr-4">
                                How often should I reassess my health needs?
                            </h3>
                            <span class="text-[#4ADE80] text-2xl font-bold transition-transform duration-300" :class="{ 'rotate-45': openFAQ === 7 }">
                                +
                            </span>
                        </div>
                        <div v-if="openFAQ === 7" class="mt-4 text-gray-400 animate-fade-in">
                            <p>We recommend reassessing your health needs every 3-6 months, or whenever you experience significant life changes such as new health conditions, medication changes, pregnancy, or major lifestyle modifications. Regular reassessment ensures your recommendations remain optimal.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact CTA -->
            <div class="text-center mt-16">
                <p class="text-gray-400 text-lg mb-6">
                    Still have questions? We're here to help!
                </p>
                <a href="mailto:vitain@gmail.com" class="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-medium bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white hover:scale-105 transition-transform duration-300">
                    Contact Support
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const openFAQ = ref(null)

const toggleFAQ = (index) => {
    if (openFAQ.value === index) {
        openFAQ.value = null
    } else {
        openFAQ.value = index
    }
}
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
}

.animate-fade-in-up {
    animation: fadeIn 0.5s ease-out forwards;
}

.faq-item:hover {
    transform: translateY(-2px);
}
</style>
