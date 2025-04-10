<template>
    <div class="relative min-h-screen bg-[#0A0A0A] px-4 py-8 sm:py-12">
        <!-- Animated background elements -->
        <div class="absolute inset-0 z-0">
            <!-- Gradient orbs -->
            <div class="absolute top-0 left-[20%] w-[500px] h-[500px] bg-gradient-to-b from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div class="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-gradient-to-t from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-full blur-[120px] animate-pulse-slower"></div>
            
            <!-- Animated particles -->
            <div class="particles-container">
                <div v-for="i in 6" :key="i" class="particle" :style="{ '--delay': `${i * 2}s` }"></div>
            </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" 
            class="relative z-10 mb-6 bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg animate-fade-in">
            {{ error }}
        </div>

        <!-- Progress Bar -->
        <div class="relative z-10 mb-8 sm:mb-12 max-w-xl mx-auto animate-slide-down">
            <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] rounded-full transition-all duration-500 ease-out" 
                    :style="{ width: progress + '%' }"></div>
            </div>
            <div class="flex justify-between mt-3 text-sm">
                <span class="transition-all" :class="{ 'text-[#4ADE80] font-medium': progress >= 33 }">Basic Info</span>
                <span class="transition-all" :class="{ 'text-[#4ADE80] font-medium': progress >= 66 }">Health Info</span>
                <span class="transition-all" :class="{ 'text-[#4ADE80] font-medium': progress >= 100 }">Goals</span>
            </div>
        </div>

        <!-- Questions Grid -->
        <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <!-- Basic Info Column -->
            <div class="space-y-6 animate-slide-up" style="--delay: 0s">
                <!-- Weight -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4 text-white">What is your weight? (lbs)</label>
                    <input 
                        type="number" 
                        v-model="formData.weight" 
                        class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50" 
                        min="0"
                        max="999"
                        placeholder="Enter your weight"
                    />
                </div>

                <!-- Height -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4 text-white">What is your height? (ft)</label>
                    <select 
                        v-model="formData.height" 
                        class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all"
                    >
                        <option value="" class="bg-[#0A0A0A]">Select height</option>
                        <option v-for="height in heightOptions" :key="height" :value="height" class="bg-[#0A0A0A]">
                            {{ height }} ft
                        </option>
                    </select>
                </div>

                <!-- Gender -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4 text-white">What is your gender?</label>
                    <div class="flex gap-3">
                        <button 
                            v-for="option in ['Male', 'Female']"
                            :key="option"
                            @click="formData.gender = option.toLowerCase()"
                            :class="[
                                'flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium',
                                formData.gender === option.toLowerCase()
                                    ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                                    : 'bg-white/10 hover:bg-white/20 text-white'
                            ]"
                        >
                            {{ option }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Health Info Column -->
            <div class="space-y-6 animate-slide-up" style="--delay: 0.2s">
                <!-- Age -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4 text-white">How old are you?</label>
                    <select 
                        v-model="formData.age" 
                        class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all"
                    >
                        <option value="" class="bg-[#0A0A0A]">Select age</option>
                        <option v-for="age in ageOptions" :key="age" :value="age" class="bg-[#0A0A0A]">{{ age }} years</option>
                    </select>
                </div>

                <!-- Activity Level -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4 text-white">How active are you?</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                        <button 
                            v-for="option in activityLevels"
                            :key="option"
                            @click="formData.activeness = option.toLowerCase()"
                            :class="[
                                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                                formData.activeness === option.toLowerCase()
                                    ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-lg scale-105'
                                    : 'bg-white/10 hover:bg-white/20 text-white'
                            ]"
                        >
                            <span>{{ option }}</span>
                        </button>
                    </div>
                </div>

                <!-- Current Supplements -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4 text-white">What supplements are you taking?</label>
                    <select 
                        v-model="formData.supplements" 
                        class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all"
                    >
                        <option value="none" class="bg-[#0A0A0A]">None</option>
                        <option v-for="supplement in commonSupplements" :key="supplement" :value="supplement" class="bg-[#0A0A0A]">
                            {{ supplement }}
                        </option>
                        <option value="other" class="bg-[#0A0A0A]">Other (Multiple)</option>
                    </select>
                    <input 
                        v-if="formData.supplements === 'other'"
                        v-model="customSupplements"
                        @input="updateSupplements"
                        class="mt-3 w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
                        placeholder="Enter supplements separated by commas"
                    />
                </div>
            </div>

            <!-- Additional Info Column -->
            <div class="space-y-6 animate-slide-up" style="--delay: 0.4s">
                <!-- Allergies -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4 text-white">Do you have any allergies?</label>
                    <select 
                        v-model="formData.allergies" 
                        class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all"
                    >
                        <option value="none" class="bg-[#0A0A0A]">None</option>
                        <option v-for="allergy in commonAllergies" :key="allergy" :value="allergy" class="bg-[#0A0A0A]">
                            {{ allergy }}
                        </option>
                        <option value="other" class="bg-[#0A0A0A]">Other (Multiple)</option>
                    </select>
                    <input 
                        v-if="formData.allergies === 'other'"
                        v-model="customAllergies"
                        @input="updateAllergies"
                        class="mt-3 w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
                        placeholder="Enter allergies separated by commas"
                    />
                </div>

                <!-- Goals -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4 text-white">What are your health goals?</label>
                    <select 
                        v-model="formData.goals" 
                        class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all"
                    >
                        <option value="" class="bg-[#0A0A0A]">Select a goal</option>
                        <option v-for="goal in commonGoals" :key="goal" :value="goal" class="bg-[#0A0A0A]">
                            {{ goal }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Submit Button -->
        <div class="relative z-10 mt-12 flex justify-center animate-slide-up" style="--delay: 0.6s">
            <button 
                @click="submitForm"
                class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                :disabled="loading"
            >
                <!-- Background Image with Overlay -->
                <div class="absolute inset-0 z-0">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"></div>
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                </div>
                
                <!-- Button Text -->
                <span class="relative z-10 font-bold flex items-center gap-2">
                    <span v-if="loading" class="flex items-center gap-2">
                        <span class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                        Processing...
                    </span>
                    <span v-else>Get Your Personalized Plan</span>
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const error = ref('');
const customSupplements = ref('');
const customAllergies = ref('');

// Generate height options from 4'0" to 7'0" with 1" increments
const heightOptions = Array.from({ length: 37 }, (_, i) => (4 + i/12).toFixed(1));

// Generate age options from 18 to 100
const ageOptions = Array.from({ length: 83 }, (_, i) => i + 18);

const activityLevels = ['Low', 'Light', 'Moderate', 'High', 'Very High'];

const commonSupplements = [
    'Vitamin D',
    'Vitamin B12',
    'Fish Oil',
    'Magnesium',
    'Zinc',
    'Iron',
    'Calcium',
    'Protein Powder',
    'Multivitamin'
];

const commonAllergies = [
    'Dairy',
    'Nuts',
    'Soy',
    'Gluten',
    'Shellfish',
    'Eggs',
    'Fish'
];

const commonGoals = [
    'Improve overall health',
    'Boost energy levels',
    'Build muscle mass',
    'Weight management',
    'Better sleep quality',
    'Enhance mental clarity',
    'Support immune system',
    'Heart health',
    'Joint health'
];

const formData = ref({
    role: 'user',
    action: 'list',
    weight: '',
    height: '',
    gender: '',
    age: '',
    activeness: '',
    supplements: 'none',
    allergies: 'none',
    goals: ''
});

const updateSupplements = () => {
    formData.value.supplements = customSupplements.value || 'none';
};

const updateAllergies = () => {
    formData.value.allergies = customAllergies.value || 'none';
};

const progress = computed(() => {
    let filled = 0;
    const total = 8;
    if (formData.value.weight) filled++;
    if (formData.value.height) filled++;
    if (formData.value.gender) filled++;
    if (formData.value.age) filled++;
    if (formData.value.activeness) filled++;
    if (formData.value.supplements) filled++;
    if (formData.value.allergies) filled++;
    if (formData.value.goals) filled++;
    return Math.round((filled / total) * 100);
});

const validateForm = () => {
    if (!formData.value.weight) return 'Please enter your weight';
    if (!formData.value.height) return 'Please enter your height';
    if (!formData.value.gender) return 'Please select your gender';
    if (!formData.value.age) return 'Please enter your age';
    if (!formData.value.activeness) return 'Please select your activity level';
    if (!formData.value.goals) return 'Please enter your health goals';
    
    formData.value.weight = formData.value.weight.toString();
    formData.value.height = formData.value.height.toString();
    formData.value.age = formData.value.age.toString();
    formData.value.supplements = formData.value.supplements || 'none';
    formData.value.allergies = formData.value.allergies || 'none';
    
    return '';
};

const submitForm = async () => {
    try {
        error.value = '';
        const validationError = validateForm();
        if (validationError) {
            error.value = validationError;
            return;
        }

        loading.value = true;

        const requestBody = {
            role: 'user',
            action: 'list',
            weight: formData.value.weight,
            height: formData.value.height,
            gender: formData.value.gender,
            age: formData.value.age,
            activeness: formData.value.activeness.toLowerCase(),
            supplements: formData.value.supplements,
            allergies: formData.value.allergies,
            goals: formData.value.goals
        };

        console.log('Sending request with body:', requestBody);

        const response = await fetch('https://vitain-ai.onrender.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Server responded with ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);

        router.push({ 
            name: 'results', 
            query: { 
                results: JSON.stringify(data),
                userInfo: JSON.stringify(requestBody)
            } 
        });
    } catch (error) {
        console.error('Error details:', error);
        error.value = 'There was an error processing your request. Please try again.';
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.text-primary {
    color: #4ADE80;
}

.bg-primary {
    background-color: #4ADE80;
}

.ring-primary {
    --tw-ring-color: #4ADE80;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
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

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-slide-down {
    animation: slideDown 0.8s ease-out forwards;
}

.animate-slide-up {
    animation: slideUp 0.8s ease-out forwards;
    animation-delay: var(--delay, 0s);
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}

@keyframes pulse-slow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
}

.animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-slower {
    animation: pulse-slow 6s ease-in-out infinite;
}

/* Floating particles animation */
.particles-container {
    @apply absolute inset-0 overflow-hidden;
}

.particle {
    @apply absolute w-2 h-2 rounded-full;
    background: linear-gradient(to right, #4ADE80, #3B82F6);
    filter: blur(1px);
    animation: float-particle 15s linear infinite;
    animation-delay: var(--delay);
}

.particle:nth-child(1) { top: 20%; left: 10%; }
.particle:nth-child(2) { top: 50%; right: 20%; }
.particle:nth-child(3) { bottom: 30%; left: 30%; }
.particle:nth-child(4) { top: 10%; right: 30%; }
.particle:nth-child(5) { bottom: 20%; right: 10%; }
.particle:nth-child(6) { top: 40%; left: 20%; }

@keyframes float-particle {
    0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0.3;
    }
    25% {
        transform: translate(30px, 30px) rotate(90deg);
        opacity: 0.6;
    }
    50% {
        transform: translate(0, 60px) rotate(180deg);
        opacity: 0.3;
    }
    75% {
        transform: translate(-30px, 30px) rotate(270deg);
        opacity: 0.6;
    }
    100% {
        transform: translate(0, 0) rotate(360deg);
        opacity: 0.3;
    }
}

/* Remove number input arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Custom scrollbar */
select::-webkit-scrollbar {
    width: 8px;
}

select::-webkit-scrollbar-track {
    background: #1a1a1a;
    border-radius: 4px;
}

select::-webkit-scrollbar-thumb {
    background: #4ADE80;
    border-radius: 4px;
}

select::-webkit-scrollbar-thumb:hover {
    background: #3B82F6;
}
</style>
