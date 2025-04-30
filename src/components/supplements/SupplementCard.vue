<template>
    <div class="relative group">
        <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
        <div class="relative z-10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
            <div class="w-full h-48 mb-4 rounded-xl overflow-hidden bg-white/5">
                <img :src="supplement.image" 
                     :alt="supplement.name" 
                     class="w-full h-full object-contain p-4">
            </div>
            <h3 class="text-xl font-bold mb-2 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                {{ supplement.name }}
            </h3>
            <p class="text-gray-400 mb-4">{{ supplement.description }}</p>
            <div class="flex justify-between items-center">
                <span class="text-[#4ADE80]">${{ supplement.price.toFixed(2) }}</span>
                <button @click="$emit('show-details', supplement)" 
                        class="text-white hover:text-[#4ADE80] transition-colors">
                    View Details
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    supplement: {
        type: Object,
        required: true
    }
});

defineEmits(['show-details']);
</script> 