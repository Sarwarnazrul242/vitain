<template>
    <section class="relative min-h-screen flex items-center justify-center text-center px-4 py-20 md:py-0">
        <!-- Background image -->
        <div class="absolute inset-0 z-0">
            <img 
                src="@/assets/wood.png" 
                alt="Wood Background" 
                class="w-full h-full object-cover brightness-75"
            />
            <!-- Darker overlay with gradient -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black"></div>
        </div>

        <!-- Animated Content -->
        <div class="relative z-10 max-w-4xl mx-auto">
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 animate-fade-in-down">
                Your Journey to Better Health Starts Here
            </h1>
            <p class="text-white text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
                Discover personalized supplement recommendations backed by AI technology. 
                Take our comprehensive quiz and get tailored solutions for your unique health goals.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in delay-400">
                <button 
                    @click="navigateToQuiz" 
                    class="bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-base md:text-lg hover:bg-primary-dark transition-all hover:scale-105"
                >
                    Take the Quiz
                </button>
                <button 
                    @click="scrollToLearnMore" 
                    class="border-2 border-white text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-base md:text-lg hover:bg-white/10 transition-all hover:scale-105"
                >
                    Learn More
                </button>
            </div>
            
            <!-- Animated Stats -->
            <div class="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 animate-fade-in-up delay-600">
                <div class="text-white hover:scale-105 transition-transform">
                    <div class="text-3xl md:text-4xl font-bold mb-2 animate-count">1000+</div>
                    <div class="text-xs md:text-sm opacity-80">Satisfied Customers</div>
                </div>
                <div class="text-white hover:scale-105 transition-transform">
                    <div class="text-3xl md:text-4xl font-bold mb-2 animate-count">50+</div>
                    <div class="text-xs md:text-sm opacity-80">Premium Supplements</div>
                </div>
                <div class="text-white hover:scale-105 transition-transform sm:col-span-2 md:col-span-1">
                    <div class="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                    <div class="text-xs md:text-sm opacity-80">AI Support</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const navigateToQuiz = () => {
    router.push('/take-quiz');
};
</script>

<style scoped>
.bg-primary {
    background-color: #A0522D; /* Brown color for the button */
}

.bg-primary-dark:hover {
    background-color: #8B4513; /* Darker brown for hover state */
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
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

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-fade-in-down {
    animation: fadeInDown 1s ease-out;
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
</style>