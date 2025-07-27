<template>
  <div class=" group mb-10">
    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
    <div class="relative z-10 p-8">
      <h2 class="text-2xl md:text-5xl font-bold text-center mb-6">
        <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
          Vitain Platform Pricing
        </span>
      </h2>
      <p class="text-gray-300 text-sm md:text-base text-center mb-10">
        Choose a plan that fits your personal health or coaching needs.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="plan in plans"
          :key="plan.title"
          class="bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-md flex flex-col justify-between"
        >
          <div>
            <h3 class="text-2xl font-semibold text-white mb-2">{{ plan.title }}</h3>
            <p class="text-sm text-gray-400 mb-4">{{ plan.description }}</p>
            <p class="text-3xl font-bold text-white mb-4">{{ plan.price }}</p>
            <ul class="space-y-2 mb-6">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="text-gray-300 text-sm flex items-center"
              >
                <span class="mr-2 text-green-400">•</span> {{ feature }}
              </li>
            </ul>
          </div>
          <button
            class="mt-auto bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition"
          >
            {{ plan.button.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const plans = ref([
  {
    title: 'ViLite',
    description: 'Basic access to the Vitain platform.',
    price: 'Free',
    features: [
      'Limited supplement recommendations',
      'Basic quiz access'
    ],
    button: {
      label: 'Get Started',
      class: 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition'
    }
  },
  {
    title: 'ViCore',
    description: 'Unlocks full personalized supplement engine.',
    price: '$249',
    features: [
      'Advanced recommendations',
      'Health goal tracking'
    ],
    button: {
      label: 'Buy now',
      class: 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition'
    }
  },
  {
    title: 'ViTitan',
    description: 'Includes all ViCore features + coach dashboard.',
    price: '$499',
    features: [
      'Team & client support',
      'Analytics dashboard'
    ],
    button: {
      label: 'Buy now',
      class: 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition'
    }
  },
  {
    title: 'Top-up Credits',
    description: 'Flexible credit-based usage add-on.',
    price: 'From $50',
    features: [
      'Add credits any time',
      'Use across ViCore/Titan tools'
    ],
    button: {
      label: 'Top up',
      class: 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition'
    }
  }
])
</script>