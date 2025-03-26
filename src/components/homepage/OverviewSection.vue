<template>
    <section class="bg-black py-12 md:py-20 px-4">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-8 md:mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-4">
                    <span class="text-white">Simplify your</span>
                    <span class="text-primary"> health journey.</span>
                </h2>
            </div>

            <!-- Two Column Layout -->
            <div class="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
                <!-- Left Column - Image -->
                <div class="lg:w-1/2 w-full">
                    <div class="relative">
                        <img 
                            src="@/assets/vitamin.png" 
                            alt="App Preview" 
                            class="rounded-xl shadow-2xl w-full h-auto"
                        />
                    </div>
                </div>

                <!-- Right Column - Features -->
                <div class="lg:w-1/2 space-y-8 md:space-y-12">
                    <!-- Feature 1 -->
                    <div class="flex gap-4 md:gap-6">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <span class="text-primary text-xl">✓</span>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-lg md:text-xl font-bold text-primary mb-2">
                                Weekly Health Tracking
                            </h3>
                            <p class="text-gray-300 text-sm md:text-base">
                                Complete simple weekly surveys to track your symptoms and health changes consistently.
                            </p>
                        </div>
                    </div>

                    <!-- Feature 2 -->
                    <div class="flex gap-4 md:gap-6">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <span class="text-primary text-xl">✓</span>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-lg md:text-xl font-bold text-primary mb-2">
                                AI-Powered Documentation
                            </h3>
                            <p class="text-gray-300 text-sm md:text-base">
                                Our AI automatically converts your survey responses into professional medical documentation.
                            </p>
                        </div>
                    </div>

                    <!-- Feature 3 -->
                    <div class="flex gap-4 md:gap-6">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <span class="text-primary text-xl">✓</span>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-lg md:text-xl font-bold text-primary mb-2">
                                Easy Doctor Communication
                            </h3>
                            <p class="text-gray-300 text-sm md:text-base">
                                Share comprehensive health reports with your healthcare providers in a format they understand.
                            </p>
                        </div>
                    </div>

                    <!-- Feature 4 -->
                    <div class="flex gap-4 md:gap-6">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <span class="text-primary text-xl">✓</span>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-lg md:text-xl font-bold text-primary mb-2">
                                Track Progress Over Time
                            </h3>
                            <p class="text-gray-300 text-sm md:text-base">
                                Monitor your health journey with detailed tracking of symptoms and improvements over time.
                            </p>
                        </div>
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

.bg-primary\/20 {
    background-color: rgba(255, 107, 53, 0.2);
}
</style> 