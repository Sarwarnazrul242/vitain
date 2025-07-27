<template>
  <div class="step-card group mb-10">
    <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
    <div class="relative z-10 p-8">
      <h2 class="text-2xl md:text-5xl font-bold text-center mb-6">
        <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
          API Pricing
        </span>
      </h2>
      <p class="text-gray-300 text-sm md:text-base text-center mb-10">
        Simple and scalable pricing for developers who want API access to Vitain's supplement engine.
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

<script setup>
import { ref } from 'vue'

const plans = ref([
  {
    title: 'ViStart',
    description: 'Beginner free tier for basic API access.',
    price: 'Free',
    features: [
      'Limited API calls',
      'Basic supplement recommendations'
    ],
    button: {
      label: 'Start Free'
    }
  },
  {
    title: 'ViFlow',
    description: 'Great for hobby projects and side apps.',
    price: '$49/mo',
    features: [
      'Up to 10k requests',
      'Email support'
    ],
    button: {
      label: 'Subscribe'
    }
  },
  {
    title: 'ViEdge',
    description: 'Ideal for developers and research use.',
    price: '$199/mo',
    features: [
      'Up to 100k requests',
      'Priority support'
    ],
    button: {
      label: 'Subscribe'
    }
  },
  {
    title: 'ViPrime',
    description: 'Enterprise tier for large-scale usage.',
    price: 'Custom',
    features: [
      'Unlimited usage',
      'Dedicated account manager'
    ],
    button: {
      label: 'Contact Us'
    }
  }
])
</script>

<style scoped>
</style>