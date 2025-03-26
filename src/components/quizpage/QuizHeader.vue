<template>
    <section class="relative h-[50vh] flex items-center justify-center text-center px-4">
        <!-- Background image -->
        <div class="absolute inset-0 z-0">
            <img 
                src="@/assets/wood.png" 
                alt="Wood Background" 
                class="w-full h-full object-cover brightness-75"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 max-w-4xl mx-auto">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-down">
                <span class="text-white">Personalize Your</span>
                <span class="text-primary"> Journey</span>
            </h1>
            <p class="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
                Help us understand your unique needs to create your perfect supplement plan
            </p>
            
            <!-- Progress Steps -->
            <div class="flex justify-center items-center gap-4 mt-12 animate-fade-in delay-200">
                <div class="w-3 h-3 rounded-full bg-primary"></div>
                <div class="w-3 h-3 rounded-full bg-white/30"></div>
                <div class="w-3 h-3 rounded-full bg-white/30"></div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.text-primary {
    color: #FF6B35;
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
</style>