<template>
    <div class="relative min-h-screen">
        <!-- Background image -->
        <div class="absolute inset-0 z-0">
            <img 
                src="@/assets/wood.png" 
                alt="Wood Background" 
                class="w-full h-full object-cover brightness-75 fixed"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <!-- Header -->
            <div class="text-center mb-12 sm:mb-16 animate-fade-in">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                    Your Recommended
                    <span class="text-primary block mt-2">Supplements</span>
                </h1>
                <p class="text-gray-300 text-lg md:text-xl animate-slide-up" style="--delay: 0.2s">
                    Based on your unique health profile
                </p>
            </div>

            <!-- Supplements List -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                <div v-for="(supplement, index) in supplements" :key="index" 
                    class="group animate-slide-up"
                    :style="{ '--delay': `${0.4 + index * 0.1}s` }"
                >
                    <div class="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 h-full">
                        <div class="flex flex-col items-center text-center">
                            <!-- Supplement Icon -->
                            <div class="w-40 h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 p-2">
                                <img 
                                    :src="getSupplementImage(supplement)" 
                                    :alt="supplement"
                                    class="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:brightness-110"
                                    @error="handleImageError"
                                />
                            </div>
                            <!-- Supplement Name -->
                            <h3 class="text-xl font-semibold mb-3 capitalize text-white group-hover:text-primary transition-colors">
                                {{ formatSupplementName(supplement) }}
                            </h3>
                            <!-- Description -->
                            <p class="text-gray-300 text-sm mb-4">
                                {{ getSupplementDescription(supplement) }}
                            </p>
                            <!-- Learn More Button -->
                            <button 
                                @click="openSupplementInfo(supplement)"
                                class="mt-auto text-primary hover:text-white bg-primary/10 hover:bg-primary transition-all duration-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 group-hover:scale-105"
                            >
                                Learn More
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 animate-slide-up" style="--delay: 0.8s">
                <button 
                    @click="$router.push('/chat')"
                    class="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Chat with AI Assistant
                </button>
                <button 
                    @click="$router.push('/take-quiz')"
                    class="w-full sm:w-auto border-2 border-primary text-primary hover:text-white hover:bg-primary px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Retake Quiz
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const supplements = ref([]);

// Supplement images mapping
const supplementImages = {
    'omega-3': 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=200', // Fish oil capsules
    'vitamin d': 'https://images.unsplash.com/photo-1631751809139-d0fc97d99c66?w=200', // Vitamin D supplements
    'magnesium': 'https://images.unsplash.com/photo-1633171412647-0163e2f3610e?w=200', // Magnesium tablets
    'vitamin b12': 'https://images.unsplash.com/photo-1577636706176-fd50c6d6d697?w=200', // B12 supplements
    'zinc': 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200', // Zinc supplements
    'iron': 'https://images.unsplash.com/photo-1633171407759-33a5f9e7b614?w=200', // Iron supplements
    'calcium': 'https://images.unsplash.com/photo-1633171407759-33a5f9e7b614?w=200', // Calcium tablets
    'vitamin c': 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=200', // Vitamin C or oranges
    'green tea extract': 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=200', // Green tea
    'fiber supplements': 'https://images.unsplash.com/photo-1622484211817-92c99ec88e19?w=200', // Fiber rich foods
    'glutamine': 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200', // Protein powder
    'protein': 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200', // Protein powder
    'creatine': 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200', // Supplement powder
    'multivitamin': 'https://images.unsplash.com/photo-1577636706176-fd50c6d6d697?w=200', // Various pills
    'probiotics': 'https://images.unsplash.com/photo-1577636706176-fd50c6d6d697?w=200', // Probiotic supplements
    'fish oil': 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=200', // Fish oil capsules
    'vitamin e': 'https://images.unsplash.com/photo-1631751809139-d0fc97d99c66?w=200', // Vitamin E supplements
    'vitamin b': 'https://images.unsplash.com/photo-1577636706176-fd50c6d6d697?w=200' // B complex vitamins
};

// Supplement descriptions
const supplementDescriptions = {
    'omega-3': 'Essential fatty acids that support heart and brain health.',
    'vitamin d': 'Crucial for bone health and immune system function.',
    'magnesium': 'Important for muscle and nerve function.',
    'vitamin b12': 'Vital for red blood cell formation and neurological function.',
    'zinc': 'Supports immune system and wound healing.',
    'iron': 'Essential for blood oxygen transport.',
    'calcium': 'Key mineral for bone and teeth health.',
    'vitamin c': 'Antioxidant supporting immune system and skin health.',
};

const getSupplementImage = (supplement) => {
    const key = supplement.toLowerCase()
        .replace(' fatty acids', '')
        .replace('supplement', '')
        .replace('supplements', '')
        .trim();
    return supplementImages[key] || 'https://images.unsplash.com/photo-1577636706176-fd50c6d6d697?w=200';
};

const handleImageError = (event) => {
    event.target.src = 'https://images.unsplash.com/photo-1577636706176-fd50c6d6d697?w=200';
};

const formatSupplementName = (supplement) => {
    return supplement.replace(/-/g, ' ').split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};

const getSupplementDescription = (supplement) => {
    const key = supplement.toLowerCase().replace(' fatty acids', '');
    return supplementDescriptions[key] || 'Supports overall health and wellness.';
};

const openSupplementInfo = (supplement) => {
    window.open(`https://www.google.com/search?q=${supplement}+supplement+benefits`, '_blank');
};

onMounted(() => {
    try {
        if (!route.query.results) {
            throw new Error('No results data found');
        }

        const results = JSON.parse(route.query.results);
        console.log('Parsed results:', results);
        
        if (results && results.response) {
            supplements.value = results.response.split(',').map(s => s.trim());
            console.log('Parsed supplements:', supplements.value);
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error parsing results:', error);
        router.push('/take-quiz');
    }
});
</script>

<style scoped>
.text-primary {
    color: #FF6B35;
}

.bg-primary {
    background-color: #FF6B35;
}

.from-primary {
    --tw-gradient-from: #FF6B35;
}

.to-primary-dark {
    --tw-gradient-to: #E85A2C;
}

.border-primary {
    border-color: #FF6B35;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
    animation: slideUp 0.8s ease-out forwards;
    animation-delay: var(--delay, 0s);
}

/* Hover effect for supplement cards */
.group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
}

/* Gradient text */
.bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #FF6B35;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #E85A2C;
}
</style> 