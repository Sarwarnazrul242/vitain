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

                    <!-- Search -->
                    <div class="mb-12 max-w-xl mx-auto">
                        <div class="relative">
                            <input 
                                v-model="searchQuery"
                                @keyup.enter="performSearch"
                                @input="handleInput"
                                type="text"
                                placeholder="Search supplements (e.g., Magnesium, Vitamin D, Caffeine)..."
                                class="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#4ADE80] transition-colors outline-none"
                            >
                            <button 
                                @click="performSearch"
                                :disabled="!searchQuery.trim() || isLoading"
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                🔍
                            </button>
                        </div>
                        
                        <!-- Spelling Suggestions -->
                        <div v-if="spellingSuggestions.length > 0 && !hasSearched" class="mt-4">
                            <p class="text-gray-400 text-sm mb-2">Did you mean:</p>
                            <div class="flex flex-wrap gap-2">
                                <button 
                                    v-for="suggestion in spellingSuggestions" 
                                    :key="suggestion"
                                    @click="useSuggestion(suggestion)"
                                    class="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 text-gray-300 rounded-full transition-colors"
                                >
                                    {{ suggestion }}
                                </button>
                            </div>
                        </div>
                        
                        <div v-if="isLoading" class="text-center mt-4">
                            <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#4ADE80]"></div>
                            <p class="text-gray-400 mt-2">Searching for supplements...</p>
                        </div>
                    </div>

                    <!-- Supplements Grid -->
                    <div v-if="!isLoading && supplements.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <SupplementCard
                            v-for="supplement in supplements"
                            :key="supplement.id"
                            :supplement="supplement"
                            @show-details="handleShowDetails"
                        />
                    </div>

                    <!-- Empty State -->
                    <div v-if="!isLoading && supplements.length === 0 && hasSearched" class="text-center py-20">
                        <p class="text-gray-400 text-lg">No supplements found matching your search.</p>
                        <p class="text-gray-500 text-sm mt-2">Try searching for: Magnesium, Vitamin D, Caffeine, etc.</p>
                    </div>

                    <!-- Initial State -->
                    <div v-if="!isLoading && supplements.length === 0 && !hasSearched" class="text-center py-20">
                        <p class="text-gray-400 text-lg">Search for supplements to get started.</p>
                        <p class="text-gray-500 text-sm mt-2">Try searching for: Magnesium, Vitamin D, Caffeine, etc.</p>
                    </div>
                </div>
            </section>
        </div>

        <!-- Details Modal -->
        <div v-if="selectedSupplement" 
             class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             @click="selectedSupplement = null">
            <div class="max-w-4xl w-full bg-[#1A1A1A] rounded-2xl p-8 max-h-[90vh] overflow-y-auto" @click.stop>
                <div class="flex justify-between items-start mb-6">
                    <h2 class="text-2xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                        {{ selectedSupplement.fullName }}
                    </h2>
                    <button @click="selectedSupplement = null" class="text-gray-400 hover:text-white">
                        ✕
                    </button>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                    <div>
                        <img :src="selectedSupplement.image_url" 
                             :alt="selectedSupplement.fullName" 
                             class="w-full h-64 object-cover rounded-xl mb-4">
                        <div class="flex justify-between items-center">
                            <span class="text-[#4ADE80] font-semibold">{{ selectedSupplement.brandName }}</span>
                            <a v-if="selectedSupplement.purchase_url" 
                               :href="selectedSupplement.purchase_url" 
                               target="_blank"
                               class="text-[#3B82F6] hover:text-[#4ADE80] transition-colors">
                                View on Amazon →
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-white font-medium mb-4">Product Details</h3>
                        <div class="space-y-3 text-gray-400">
                            <p><span class="text-white">Brand:</span> {{ selectedSupplement.brandName }}</p>
                            <p><span class="text-white">Product Type:</span> {{ selectedSupplement.productType?.langualCodeDescription || 'N/A' }}</p>
                            <p><span class="text-white">Physical State:</span> {{ selectedSupplement.physicalState?.langualCodeDescription || 'N/A' }}</p>
                            <p v-if="selectedSupplement.servingsPerContainer"><span class="text-white">Servings:</span> {{ selectedSupplement.servingsPerContainer }}</p>
                            <p v-if="selectedSupplement.netContents && selectedSupplement.netContents.length > 0">
                                <span class="text-white">Net Contents:</span> 
                                {{ selectedSupplement.netContents.map(nc => nc.display).join(', ') }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Ingredients -->
                <div v-if="selectedSupplement.ingredients && selectedSupplement.ingredients.length > 0" class="mb-6">
                    <h3 class="text-white font-medium mb-4">Ingredients</h3>
                    <div class="space-y-3">
                        <div v-for="ingredient in selectedSupplement.ingredients" :key="ingredient.name" class="bg-white/5 p-4 rounded-lg">
                            <h4 class="text-[#4ADE80] font-medium mb-2">{{ ingredient.name }}</h4>
                            <div v-if="ingredient.quantity && ingredient.quantity.length > 0" class="text-gray-400 text-sm">
                                <p v-for="qty in ingredient.quantity" :key="qty.quantity">
                                    {{ qty.quantity }} {{ qty.unit }} per serving
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Statements/Benefits -->
                <div v-if="selectedSupplement.statements && selectedSupplement.statements.length > 0" class="mb-6">
                    <h3 class="text-white font-medium mb-4">Benefits & Information</h3>
                    <div class="space-y-3">
                        <div v-for="statement in selectedSupplement.statements" :key="statement.type" class="bg-white/5 p-4 rounded-lg">
                            <h4 class="text-[#4ADE80] font-medium mb-2">{{ statement.type }}</h4>
                            <p class="text-gray-400 text-sm whitespace-pre-line">{{ statement.notes }}</p>
                        </div>
                    </div>
                </div>

                <!-- Usage Directions -->
                <div v-if="selectedSupplement.servingSizes && selectedSupplement.servingSizes.length > 0" class="mb-6">
                    <h3 class="text-white font-medium mb-4">Usage Directions</h3>
                    <div class="space-y-3">
                        <div v-for="serving in selectedSupplement.servingSizes" :key="serving.order" class="bg-white/5 p-4 rounded-lg">
                            <p class="text-gray-400">
                                <span class="text-white">Serving Size:</span> {{ serving.minQuantity }}{{ serving.maxQuantity !== serving.minQuantity ? '-' + serving.maxQuantity : '' }} {{ serving.unit }}
                            </p>
                            <p class="text-gray-400">
                                <span class="text-white">Daily Servings:</span> {{ serving.minDailyServings }}{{ serving.maxDailyServings !== serving.minDailyServings ? '-' + serving.maxDailyServings : '' }} times daily
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button @click="handleAddToCart(selectedSupplement)" 
                            class="flex-1 relative group px-6 py-3 rounded-xl text-lg font-medium overflow-hidden">
                        <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform group-hover:scale-105"></span>
                        <span class="relative text-white">Add to Cart</span>
                    </button>
                    <a v-if="selectedSupplement.purchase_url" 
                       :href="selectedSupplement.purchase_url" 
                       target="_blank"
                       class="flex-1 px-6 py-3 rounded-xl text-lg font-medium border border-[#4ADE80] text-[#4ADE80] hover:bg-[#4ADE80] hover:text-white transition-colors text-center">
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import NavBar from '@/components/common/NavBar.vue';
import BackgroundGradient from '@/components/homepage/BackgroundGradient.vue';
import SupplementCard from '@/components/supplements/SupplementCard.vue';

const API_BASE_URL = 'https://vitain-ai.onrender.com/v1/supplement-info';

const supplements = ref([]);
const searchQuery = ref("");
const selectedSupplement = ref(null);
const isLoading = ref(false);
const hasSearched = ref(false);
const spellingSuggestions = ref([]);

// Common supplement names for spelling suggestions
const commonSupplements = [
    'Magnesium', 'Vitamin D', 'Vitamin C', 'Vitamin B12', 'Vitamin B6', 'Vitamin E',
    'Calcium', 'Iron', 'Zinc', 'Omega 3', 'Omega-3', 'Fish Oil', 'Probiotics',
    'Creatine', 'Protein', 'BCAA', 'Glutamine', 'Caffeine', 'Melatonin',
    'Biotin', 'Folic Acid', 'Niacin', 'Riboflavin', 'Thiamine', 'CoQ10',
    'L-Carnitine', 'L-Arginine', 'L-Lysine', 'L-Tyrosine', 'L-Theanine'
];

// Debounce function to avoid too many API calls
let searchTimeout = null;

const handleInput = () => {
    clearTimeout(searchTimeout);
    
    if (!searchQuery.value.trim()) {
        supplements.value = [];
        hasSearched.value = false;
        spellingSuggestions.value = [];
        return;
    }

    // Generate spelling suggestions
    generateSpellingSuggestions();
};

const generateSpellingSuggestions = () => {
    const query = searchQuery.value.toLowerCase().trim();
    const suggestions = [];
    
    // Check for common misspellings and similar terms
    const misspellings = {
        'magnesium': ['magnesium', 'magnesuim', 'magnesum', 'magnesuim'],
        'vitamin': ['vitamin', 'vitimin', 'vitamim', 'vitamim'],
        'caffeine': ['caffeine', 'caffiene', 'caffine', 'caffiene'],
        'protein': ['protein', 'proteim', 'proteim', 'proteim'],
        'calcium': ['calcium', 'calcuim', 'calcuim', 'calcuim'],
        'omega': ['omega', 'omege', 'omege', 'omege'],
        'probiotics': ['probiotics', 'probiotcs', 'probiotcs', 'probiotcs'],
        'creatine': ['creatine', 'creatin', 'creatin', 'creatin'],
        'melatonin': ['melatonin', 'melatonim', 'melatonim', 'melatonim']
    };

    // Check for exact matches in misspellings
    for (const [correct, variants] of Object.entries(misspellings)) {
        if (variants.includes(query)) {
            suggestions.push(correct.charAt(0).toUpperCase() + correct.slice(1));
        }
    }

    // Check for partial matches in common supplements
    const partialMatches = commonSupplements.filter(supplement => 
        supplement.toLowerCase().includes(query) && 
        supplement.toLowerCase() !== query &&
        !suggestions.includes(supplement)
    ).slice(0, 3);

    suggestions.push(...partialMatches);

    // Remove duplicates and limit to 5 suggestions
    spellingSuggestions.value = [...new Set(suggestions)].slice(0, 5);
};

const useSuggestion = (suggestion) => {
    searchQuery.value = suggestion;
    spellingSuggestions.value = [];
    performSearch();
};

const performSearch = () => {
    if (!searchQuery.value.trim()) return;
    
    clearTimeout(searchTimeout);
    searchSupplements();
};

const searchSupplements = async () => {
    if (!searchQuery.value.trim()) return;
    
    isLoading.value = true;
    hasSearched.value = true;
    spellingSuggestions.value = []; // Clear suggestions when searching
    
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: "get_multi_products_packages",
                list: [searchQuery.value.trim()]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch supplements');
        }

        const data = await response.json();
        
        if (data.response && Array.isArray(data.response)) {
            // Flatten the response array and filter out empty arrays
            const allSupplements = data.response
                .filter(group => Array.isArray(group) && group.length > 0)
                .flat();
            
            supplements.value = allSupplements.map(supplement => ({
                ...supplement,
                // Add computed properties for the card component
                name: supplement.fullName || supplement.title || 'Unknown Product',
                description: supplement.snippet || 'No description available',
                price: extractPriceFromUrl(supplement.purchase_url) || 29.99, // Default price
                rating: 4.5, // Default rating since API doesn't provide it
                category: supplement.productType?.langualCodeDescription || 'Supplement',
                image: supplement.image_url || '/placeholder-supplement.jpg'
            }));
        } else {
            supplements.value = [];
        }
    } catch (error) {
        console.error('Error searching supplements:', error);
        supplements.value = [];
    } finally {
        isLoading.value = false;
    }
};

// Helper function to extract price from URL (this is a placeholder - you might want to implement actual price extraction)
const extractPriceFromUrl = (url) => {
    if (!url) return 29.99;
    // This is a placeholder - in a real implementation, you might want to scrape the price from the URL
    // or have a separate API endpoint for pricing
    return Math.floor(Math.random() * 50) + 15; // Random price between $15-$65 for demo
};

const handleAddToCart = (supplement) => {
    // Implement cart functionality
    console.log('Adding to cart:', supplement);
    // You can emit an event or use a store to handle cart functionality
};

const handleShowDetails = (supplement) => {
    selectedSupplement.value = supplement;
};
</script> 