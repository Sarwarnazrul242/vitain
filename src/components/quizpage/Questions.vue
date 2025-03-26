<template>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <!-- Error Message -->
        <div v-if="error" 
            class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative animate-fade-in">
            {{ error }}
        </div>

        <!-- Progress Bar -->
        <div class="mb-8 sm:mb-12 max-w-xl mx-auto animate-slide-down">
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
                    :style="{ width: progress + '%' }"></div>
            </div>
            <div class="flex justify-between mt-3 text-sm text-gray-500">
                <span class="transition-all" :class="{ 'text-primary font-medium': progress >= 33 }">Basic Info</span>
                <span class="transition-all" :class="{ 'text-primary font-medium': progress >= 66 }">Health Info</span>
                <span class="transition-all" :class="{ 'text-primary font-medium': progress >= 100 }">Goals</span>
            </div>
        </div>

        <!-- Questions Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <!-- Basic Info Column -->
            <div class="space-y-6 animate-slide-up" style="--delay: 0s">
                <!-- Weight -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4">What is your weight? (lbs)</label>
                    <input 
                        type="number" 
                        v-model="formData.weight" 
                        class="w-full p-3 border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                        min="0"
                        max="999"
                        placeholder="Enter your weight"
                    />
                </div>

                <!-- Height -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4">What is your height? (ft)</label>
                    <select 
                        v-model="formData.height" 
                        class="w-full p-3 border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                        <option value="">Select height</option>
                        <option v-for="height in heightOptions" :key="height" :value="height">
                            {{ height }} ft
                        </option>
                    </select>
                </div>

                <!-- Gender -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4">What is your gender?</label>
                    <div class="flex gap-3">
                        <button 
                            v-for="option in ['Male', 'Female']"
                            :key="option"
                            @click="formData.gender = option.toLowerCase()"
                            :class="[
                                'flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium',
                                formData.gender === option.toLowerCase()
                                    ? 'bg-primary text-white shadow-lg scale-105'
                                    : 'bg-white/50 hover:bg-white/80'
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
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4">How old are you?</label>
                    <select 
                        v-model="formData.age" 
                        class="w-full p-3 border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                        <option value="">Select age</option>
                        <option v-for="age in ageOptions" :key="age" :value="age">{{ age }} years</option>
                    </select>
                </div>

                <!-- Activity Level -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4">How active are you?</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                        <button 
                            v-for="option in activityLevels"
                            :key="option"
                            @click="formData.activeness = option.toLowerCase()"
                            :class="[
                                'py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2',
                                formData.activeness === option.toLowerCase()
                                    ? 'bg-primary text-white shadow-lg scale-105'
                                    : 'bg-white/50 hover:bg-white/80'
                            ]"
                        >
                            <span>{{ option }}</span>
                        </button>
                    </div>
                </div>

                <!-- Current Supplements -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4">What supplements are you taking?</label>
                    <select 
                        v-model="formData.supplements" 
                        class="w-full p-3 border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                        <option value="none">None</option>
                        <option v-for="supplement in commonSupplements" :key="supplement" :value="supplement">
                            {{ supplement }}
                        </option>
                        <option value="other">Other (Multiple)</option>
                    </select>
                    <input 
                        v-if="formData.supplements === 'other'"
                        v-model="customSupplements"
                        @input="updateSupplements"
                        class="mt-3 w-full p-3 border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Enter supplements separated by commas"
                    />
                </div>
            </div>

            <!-- Additional Info Column -->
            <div class="space-y-6 animate-slide-up" style="--delay: 0.4s">
                <!-- Allergies -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4">Do you have any allergies?</label>
                    <select 
                        v-model="formData.allergies" 
                        class="w-full p-3 border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                        <option value="none">None</option>
                        <option v-for="allergy in commonAllergies" :key="allergy" :value="allergy">
                            {{ allergy }}
                        </option>
                        <option value="other">Other (Multiple)</option>
                    </select>
                    <input 
                        v-if="formData.allergies === 'other'"
                        v-model="customAllergies"
                        @input="updateAllergies"
                        class="mt-3 w-full p-3 border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Enter allergies separated by commas"
                    />
                </div>

                <!-- Goals -->
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <label class="font-semibold text-lg block mb-4">What are your health goals?</label>
                    <select 
                        v-model="selectedGoal" 
                        class="w-full p-3 border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all mb-3"
                    >
                        <option value="">Select a goal</option>
                        <option v-for="goal in commonGoals" :key="goal" :value="goal">
                            {{ goal }}
                        </option>
                        <option value="custom">Custom Goal</option>
                    </select>
                    <textarea 
                        v-model="formData.goals" 
                        :placeholder="selectedGoal === 'custom' ? 'Describe your health goals...' : 'Add additional details (optional)'"
                        class="w-full p-3 border rounded-lg bg-white/50 h-32 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    ></textarea>
                </div>
            </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-12 flex justify-center animate-slide-up" style="--delay: 0.6s">
            <button 
                @click="submitForm"
                class="relative overflow-hidden group text-white px-12 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                :disabled="loading"
            >
                <!-- Background Image with Overlay -->
                <div class="absolute inset-0 z-0">
                    <img 
                        src="@/assets/wood.png" 
                        alt="Wood Background" 
                        class="w-full h-full object-cover brightness-75"
                    />
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
const selectedGoal = ref('');

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

// Watch for goal selection changes
watch(selectedGoal, (newValue) => {
    if (newValue && newValue !== 'custom') {
        formData.value.goals = newValue;
    } else if (newValue === 'custom') {
        formData.value.goals = '';
    }
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
    color: #FF6B35;
}

.bg-primary {
    background-color: #FF6B35;
}

.ring-primary {
    --tw-ring-color: #FF6B35;
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

/* Remove number input arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Custom scrollbar */
textarea::-webkit-scrollbar {
    width: 8px;
}

textarea::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
    background: #FF6B35;
    border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
    background: #E85A2C;
}
</style>
