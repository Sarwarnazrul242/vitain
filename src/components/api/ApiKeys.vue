<template>
  <div class="step-card group">
  <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
  <div class="relative z-10 p-8">
    <h2 class="text-4xl md:text-4xl font-bold mb-4">
      <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
        Your API Keys
      </span>
    </h2>

    <ul class="space-y-3">
      <li
        v-for="(key, index) in apiKeys"
        :key="index"
        class="flex items-center justify-between bg-[#1f1f21] px-4 py-3 rounded-md shadow"
      >
        <span class="font-mono text-sm text-gray-200 truncate">{{ key }}</span>
        <button
          class="text-sm text-blue-400 hover:underline"
          @click="copyKey(key)"
        >
          Copy
        </button>
      </li>
    </ul>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const apiKeys = ref([
  'sk-test-abc1234567890',
  'sk-test-def0987654321'
])

function copyKey(key) {
  navigator.clipboard.writeText(key)
  alert('Key copied to clipboard!')
}
</script>

<style scoped>
.step-card {
    position: relative;
    padding: 1.5rem;
    border-radius: 1rem;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.3s;
}
.step-card:hover {
    border-color: rgba(255,255,255,0.2);
}
</style>
