<template>
    <div class="relative min-h-screen bg-[#0A0A0A]">
        <BackgroundGradient />
        <div class="relative">
            <NavBar />
            
            <!-- Hero Section -->
            <section class="relative pt-32 pb-20">
                <div class="max-w-7xl mx-auto px-4 relative z-10">
                    <div class="text-center mb-12">
                        <h1 class="text-4xl md:text-6xl font-bold mb-6">
                            <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                                Our Supplements
                            </span>
                        </h1>
                        <p class="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
                            Discover our curated selection of high-quality supplements tailored to your health needs.
                        </p>
                    </div>

                    <!-- Filters -->
                    <div class="mb-12">
                        <div class="flex flex-wrap gap-4 justify-center">
                            <button 
                                v-for="category in categories" 
                                :key="category"
                                @click="toggleCategory(category)"
                                :class="[
                                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                                    selectedCategories.includes(category) 
                                        ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                ]"
                            >
                                {{ category }}
                            </button>
                        </div>
                    </div>

                    <!-- Search -->
                    <div class="mb-12 max-w-xl mx-auto">
                        <div class="relative">
                            <input 
                                v-model="searchQuery"
                                type="text"
                                placeholder="Search supplements..."
                                class="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#4ADE80] transition-colors outline-none"
                            >
                            <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                🔍
                            </span>
                        </div>
                    </div>

                    <!-- Supplements Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <SupplementCard
                            v-for="supplement in filteredSupplements"
                            :key="supplement.id"
                            :supplement="supplement"
                            @show-details="handleShowDetails"
                        />
                    </div>

                    <!-- Empty State -->
                    <div v-if="filteredSupplements.length === 0" class="text-center py-20">
                        <p class="text-gray-400 text-lg">No supplements found matching your criteria.</p>
                    </div>
                </div>
            </section>
        </div>

        <!-- Details Modal -->
        <div v-if="selectedSupplement" 
             class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             @click="selectedSupplement = null">
            <div class="max-w-2xl w-full bg-[#1A1A1A] rounded-2xl p-8" @click.stop>
                <div class="flex justify-between items-start mb-6">
                    <h2 class="text-2xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                        {{ selectedSupplement.name }}
                    </h2>
                    <button @click="selectedSupplement = null" class="text-gray-400 hover:text-white">
                        ✕
                    </button>
                </div>
                <img :src="selectedSupplement.image" 
                     :alt="selectedSupplement.name" 
                     class="w-full h-64 object-cover rounded-xl mb-6">
                <p class="text-gray-400 mb-6">{{ selectedSupplement.description }}</p>
                <div class="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 class="text-white font-medium mb-2">Benefits</h3>
                        <ul class="space-y-2">
                            <li v-for="benefit in selectedSupplement.benefits" 
                                :key="benefit"
                                class="text-gray-400 flex items-center gap-2">
                                <span class="text-[#4ADE80]">•</span>
                                {{ benefit }}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-white font-medium mb-2">Details</h3>
                        <div class="space-y-2 text-gray-400">
                            <p>Category: {{ selectedSupplement.category }}</p>
                            <p>Rating: {{ selectedSupplement.rating }} ★</p>
                            <p>Price: ${{ selectedSupplement.price.toFixed(2) }}</p>
                        </div>
                    </div>
                </div>
                <button @click="handleAddToCart(selectedSupplement)" 
                        class="w-full relative group px-6 py-3 rounded-xl text-lg font-medium overflow-hidden">
                    <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform group-hover:scale-105"></span>
                    <span class="relative text-white">Add to Cart</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import NavBar from '@/components/common/NavBar.vue';
import BackgroundGradient from '@/components/homepage/BackgroundGradient.vue';
import SupplementCard from '@/components/supplements/SupplementCard.vue';
import vitaminImage from '@/assets/VitaminD.png';
import magnesiumImage from '@/assets/magnesium.png';    

// Sample data - replace with actual data from your backend
const supplements = ref([
    {
        id: 1,
        name: "Vitamin D3 + K2",
        category: "Vitamins",
        description: "Essential vitamin combination for bone health and immune system support.",
        benefits: [
            "Supports bone health",
            "Boosts immune system",
            "Improves calcium absorption"
        ],
        price: 29.99,
        rating: 4.8,
        image: vitaminImage
    },
    {
        id: 2,
        name: "Magnesium Complex",
        category: "Minerals",
        description: "High-absorption magnesium complex for nerve and muscle function.",
        benefits: [
            "Supports muscle function",
            "Promotes relaxation",
            "Aids in energy production"
        ],
        price: 24.99,
        rating: 4.7,
        image: magnesiumImage
    },
    // Add more supplements as needed
]);

const categories = ["All", "Vitamins", "Minerals", "Proteins", "Herbs", "Amino Acids"];
const selectedCategories = ref(["All"]);
const searchQuery = ref("");
const selectedSupplement = ref(null);

const toggleCategory = (category) => {
    if (category === "All") {
        selectedCategories.value = ["All"];
        return;
    }
    
    const index = selectedCategories.value.indexOf(category);
    if (index === -1) {
        selectedCategories.value = selectedCategories.value.filter(c => c !== "All");
        selectedCategories.value.push(category);
    } else {
        selectedCategories.value = selectedCategories.value.filter(c => c !== category);
    }
    
    if (selectedCategories.value.length === 0) {
        selectedCategories.value = ["All"];
    }
};

const filteredSupplements = computed(() => {
    let filtered = supplements.value;
    
    // Apply category filter
    if (!selectedCategories.value.includes("All")) {
        filtered = filtered.filter(s => selectedCategories.value.includes(s.category));
    }
    
    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(s => 
            s.name.toLowerCase().includes(query) ||
            s.description.toLowerCase().includes(query) ||
            s.category.toLowerCase().includes(query) ||
            s.benefits.some(b => b.toLowerCase().includes(query))
        );
    }
    
    return filtered;
});

const handleAddToCart = (supplement) => {
    // Implement cart functionality
    console.log('Adding to cart:', supplement);
    // You can emit an event or use a store to handle cart functionality
};

const handleShowDetails = (supplement) => {
    selectedSupplement.value = supplement;
};
</script> 