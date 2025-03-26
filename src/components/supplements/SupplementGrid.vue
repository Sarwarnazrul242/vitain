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
                    Our Supplements
                </h1>
                <p class="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Discover our carefully curated selection of premium supplements
                </p>
            </div>
        </section>

        <!-- Supplements Grid -->
        <section class="max-w-7xl mx-auto px-4 py-16">
            <!-- Filter Bar -->
            <div class="flex flex-wrap gap-4 mb-8">
                <button 
                    v-for="category in categories" 
                    :key="category"
                    @click="selectedCategory = category"
                    :class="[
                        'px-6 py-2 rounded-full transition-all',
                        selectedCategory === category 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'
                    ]"
                >
                    {{ category }}
                </button>
            </div>

            <!-- Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div 
                    v-for="supplement in supplements" 
                    :key="supplement.id"
                    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                    <img 
                        :src="supplement.image" 
                        :alt="supplement.name"
                        class="w-full h-48 object-cover"
                    />
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">{{ supplement.name }}</h3>
                        <p class="text-gray-600 mb-4">{{ supplement.description }}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-primary font-bold text-lg">${{ supplement.price }}</span>
                            <button class="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref } from 'vue';

const categories = ['All', 'Vitamins', 'Minerals', 'Proteins', 'Herbs'];
const selectedCategory = ref('All');

const supplements = [
    {
        id: 1,
        name: 'Vitamin D3',
        description: 'Essential vitamin for bone health and immune system support',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3'
    },
    {
        id: 2,
        name: 'Omega-3 Fish Oil',
        description: 'Supports heart, brain, and joint health',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3'
    },
    {
        id: 3,
        name: 'Magnesium Complex',
        description: 'Supports muscle and nerve function',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3'
    },
    // Add more supplements as needed
];
</script>

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