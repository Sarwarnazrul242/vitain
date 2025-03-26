<template>
    <section class="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center py-12 md:py-0">
        <!-- Background image with overlay -->
        <div class="absolute inset-0 z-0">
            <img 
                src="@/assets/workout.png" 
                alt="Fitness Background" 
                class="w-full h-full object-cover brightness-75"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black/60"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h2 class="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-8">
                Ready to Start Your Journey?
            </h2>
            <p class="text-white text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                Take our comprehensive quiz to receive personalized supplement recommendations 
                tailored to your unique needs and goals.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 justify-center items-center mb-8 md:mb-0">
                <div class="bg-white/10 p-4 md:p-6 rounded-xl">
                    <h3 class="text-white font-bold mb-2 text-sm md:text-base">Quick & Easy</h3>
                    <p class="text-gray-300 text-sm">Takes only 5 minutes</p>
                </div>
                <div class="bg-white/10 p-4 md:p-6 rounded-xl">
                    <h3 class="text-white font-bold mb-2 text-sm md:text-base">Personalized</h3>
                    <p class="text-gray-300 text-sm">Tailored to your needs</p>
                </div>
                <div class="bg-white/10 p-4 md:p-6 rounded-xl sm:col-span-2 md:col-span-1">
                    <h3 class="text-white font-bold mb-2 text-sm md:text-base">Scientific</h3>
                    <p class="text-gray-300 text-sm">Evidence-based approach</p>
                </div>
            </div>
            <button class="bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-base md:text-lg hover:bg-primary-dark transition-colors">
                Take the Quiz Now
            </button>
        </div>
    </section>
</template>

<script setup>
// No script needed for this component
</script>

<style scoped>
.bg-primary {
    background-color: #A0522D; /* Brown color for the button */
}

.bg-primary-dark:hover {
    background-color: #8B4513; /* Darker brown for hover state */
}
</style>
