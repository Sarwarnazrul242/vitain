<template>
    <main class="min-h-screen">
        <!-- Header Section -->
        <section class="relative h-[40vh] flex items-center justify-center text-center px-4">
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

            <!-- Content -->
            <div class="relative z-10 max-w-4xl mx-auto">
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
                    How It Works
                </h1>
                <p class="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Your journey to personalized supplements in three simple steps
                </p>
            </div>
        </section>

        <!-- Steps Section -->
        <section class="max-w-7xl mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Step 1 -->
                <div class="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="text-2xl font-bold text-white">1</span>
                    </div>
                    <h3 class="text-xl font-bold mb-4">Take the Quiz</h3>
                    <p class="text-gray-600">
                        Answer a few questions about your lifestyle, goals, and health history to help us understand your needs.
                    </p>
                </div>

                <!-- Step 2 -->
                <div class="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="text-2xl font-bold text-white">2</span>
                    </div>
                    <h3 class="text-xl font-bold mb-4">Get Recommendations</h3>
                    <p class="text-gray-600">
                        Receive personalized supplement recommendations based on your unique profile and goals.
                    </p>
                </div>

                <!-- Step 3 -->
                <div class="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="text-2xl font-bold text-white">3</span>
                    </div>
                    <h3 class="text-xl font-bold mb-4">Chat with AI</h3>
                    <p class="text-gray-600">
                        Get instant answers to your questions about supplements and health from our AI assistant.
                    </p>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="text-center mt-16">
                <router-link 
                    to="/take-quiz"
                    class="bg-primary text-white px-8 py-3 rounded-full text-lg hover:bg-primary-dark transition-colors inline-block"
                >
                    Start Your Journey
                </router-link>
            </div>
        </section>
    </main>
</template>

<style scoped>
.bg-primary {
    background-color: #A0522D;
}

.text-primary {
    color: #A0522D;
}

.bg-primary-dark:hover {
    background-color: #8B4513;
}
</style> 