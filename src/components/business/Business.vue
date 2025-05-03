<template>
    <div class="relative min-h-screen bg-[#0A0A0A]">
        <BackgroundGradient />
        <div class="relative">
            <NavBar />
            
            <!-- Hero Section -->
            <section class="relative pt-32 pb-20 md:py-32">
                <div class="max-w-7xl mx-auto px-4 relative z-10">
                    <div class="text-center mb-16">
                        <h1 class="text-4xl md:text-6xl font-bold mb-6">
                            <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                                Partner With Vitain
                            </span>
                        </h1>
                        <p class="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
                            Join our platform to reach health-conscious customers and grow your supplement business with AI-powered recommendations.
                        </p>
                    </div>

                    <!-- Benefits Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div class="benefit-card group">
                            <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                            <div class="relative z-10 p-8">
                                <div class="icon-wrapper mb-4">
                                    <span class="text-3xl">📊</span>
                                </div>
                                <h3 class="text-xl font-bold mb-3 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                                    Data-Driven Insights
                                </h3>
                                <p class="text-gray-400">
                                    Access detailed analytics about customer preferences and supplement effectiveness.
                                </p>
                            </div>
                        </div>

                        <div class="benefit-card group">
                            <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                            <div class="relative z-10 p-8">
                                <div class="icon-wrapper mb-4">
                                    <span class="text-3xl">🎯</span>
                                </div>
                                <h3 class="text-xl font-bold mb-3 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                                    Targeted Marketing
                                </h3>
                                <p class="text-gray-400">
                                    Reach customers who are specifically matched to your products through our AI system.
                                </p>
                            </div>
                        </div>

                        <div class="benefit-card group">
                            <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
                            <div class="relative z-10 p-8">
                                <div class="icon-wrapper mb-4">
                                    <span class="text-3xl">🤝</span>
                                </div>
                                <h3 class="text-xl font-bold mb-3 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                                    Seamless Integration
                                </h3>
                                <p class="text-gray-400">
                                    Easy-to-use dashboard for managing your product listings and viewing performance metrics.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- CTA Section -->
                    <div class="text-center mb-20">
                        <button @click="scrollToForm" class="relative group px-8 py-4 rounded-xl text-lg font-medium overflow-hidden">
                            <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform group-hover:scale-105"></span>
                            <span class="relative text-white flex items-center gap-2">
                                Become a Partner
                                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="relative py-20">
                <div class="max-w-7xl mx-auto px-4 relative z-10">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 class="text-3xl md:text-5xl font-bold mb-8">
                                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                                    Why Partner With Us?
                                </span>
                            </h2>
                            <div class="space-y-6">
                                <div class="feature-item">
                                    <h3 class="text-xl font-bold mb-2 text-white">AI-Powered Matching</h3>
                                    <p class="text-gray-400">Our advanced AI algorithms match your products with the right customers based on their health goals and preferences.</p>
                                </div>
                                <div class="feature-item">
                                    <h3 class="text-xl font-bold mb-2 text-white">Increased Visibility</h3>
                                    <p class="text-gray-400">Get your products in front of a highly engaged audience actively seeking health supplements.</p>
                                </div>
                                <div class="feature-item">
                                    <h3 class="text-xl font-bold mb-2 text-white">Performance Analytics</h3>
                                    <p class="text-gray-400">Track your products' performance with detailed analytics and customer feedback.</p>
                                </div>
                            </div>
                        </div>
                        <div class="relative group">
                            <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
                            <div class="relative z-10 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <h3 class="text-2xl font-bold mb-6 text-white">Partnership Form</h3>
                                <form @submit.prevent="handleSubmit" class="space-y-4" ref="partnershipForm">
                                    <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
                                    <input type="hidden" name="botcheck" class="hidden">
                                    <div>
                                        <label class="block text-gray-300 mb-2">Company Name</label>
                                        <input type="text" v-model="formData.companyName" name="companyName" class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ADE80] transition-colors" required>
                                    </div>
                                    <div>
                                        <label class="block text-gray-300 mb-2">Email</label>
                                        <input type="email" v-model="formData.email" name="email" class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ADE80] transition-colors" required>
                                    </div>
                                    <div>
                                        <label class="block text-gray-300 mb-2">Product Categories</label>
                                        <input type="text" v-model="formData.categories" name="categories" class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ADE80] transition-colors" placeholder="e.g., Vitamins, Proteins, Minerals" required>
                                    </div>
                                    <div>
                                        <label class="block text-gray-300 mb-2">Message</label>
                                        <textarea v-model="formData.message" name="message" rows="4" class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ADE80] transition-colors" required></textarea>
                                    </div>
                                    <button type="submit" class="w-full relative group px-8 py-4 rounded-xl text-lg font-medium overflow-hidden">
                                        <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform group-hover:scale-105"></span>
                                        <span class="relative text-white flex items-center justify-center gap-2">
                                            <span v-if="!isSubmitting">Submit Application</span>
                                            <span v-else class="flex items-center gap-2">
                                                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </span>
                                        </span>
                                    </button>
                                    <transition
                                        enter-active-class="transition duration-300 ease-out"
                                        enter-from-class="transform scale-95 opacity-0"
                                        enter-to-class="transform scale-100 opacity-100"
                                        leave-active-class="transition duration-200 ease-in"
                                        leave-from-class="transform scale-100 opacity-100"
                                        leave-to-class="transform scale-95 opacity-0"
                                    >
                                        <div v-if="showResult" id="result" :class="['text-center mt-4 p-4 rounded-lg', resultClass]">
                                            <div class="flex items-center justify-center gap-2">
                                                <svg v-if="isSuccess" class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <svg v-else class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                                <span>{{ resultMessage }}</span>
                                            </div>
                                        </div>
                                    </transition>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@/components/common/NavBar.vue';
import BackgroundGradient from '@/components/homepage/BackgroundGradient.vue';

const formData = ref({
    companyName: '',
    email: '',
    categories: '',
    message: ''
});

const isSubmitting = ref(false);
const showResult = ref(false);
const isSuccess = ref(false);
const resultMessage = ref('');
const resultClass = ref('');

const handleSubmit = async () => {
    isSubmitting.value = true;
    showResult.value = true;
    resultMessage.value = "Please wait...";
    resultClass.value = "bg-blue-500/10 text-blue-400";
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: import.meta.env.VITE_EMAIL_ACCESS_KEY,
                botcheck: '',
                companyName: formData.value.companyName,
                email: formData.value.email,
                categories: formData.value.categories,
                message: formData.value.message
            })
        });

        const json = await response.json();
        
        if (response.status === 200) {
            isSuccess.value = true;
            resultMessage.value = "Form submitted successfully!";
            resultClass.value = "bg-green-500/10 text-green-400";
            
            // Reset form
            formData.value = {
                companyName: '',
                email: '',
                categories: '',
                message: ''
            };
        } else {
            isSuccess.value = false;
            resultMessage.value = json.message || "Something went wrong!";
            resultClass.value = "bg-red-500/10 text-red-400";
        }
    } catch (error) {
        console.log(error);
        isSuccess.value = false;
        resultMessage.value = "Something went wrong!";
        resultClass.value = "bg-red-500/10 text-red-400";
    } finally {
        isSubmitting.value = false;
        
        // Hide result after 3 seconds
        setTimeout(() => {
            showResult.value = false;
        }, 3000);
    }
};

const scrollToForm = () => {
    document.querySelector('.feature-item').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
};
</script>

<style scoped>
.benefit-card {
    @apply relative p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300;
}

.icon-wrapper {
    @apply w-12 h-12 rounded-xl bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 flex items-center justify-center backdrop-blur-sm;
}

.feature-item {
    @apply p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300;
    background: linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
}

input, textarea {
    @apply outline-none;
}

input:focus, textarea:focus {
    @apply ring-2 ring-[#4ADE80]/50;
}

/* Add smooth transitions for form elements */
input, textarea, button {
    @apply transition-all duration-300;
}

/* Add hover effect for form elements */
input:hover, textarea:hover {
    @apply border-white/20;
}

/* Add focus animation */
input:focus, textarea:focus {
    @apply transform scale-[1.02];
}
</style>
