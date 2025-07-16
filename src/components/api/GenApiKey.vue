<template>
  <div>
    <h2 class="text-4xl md:text-4xl font-bold text-center mb-10">
      <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
        Generate API Key
      </span>
    </h2>

    <p class="text-sm text-gray-400 mb-6 text-center max-w-lg mx-auto">
      Click the button below to generate a new API key. This key will be shown only once, so be sure to store it safely.
    </p>

    <div class="flex justify-center">
      <button
        class="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black shadow hover:bg-gray-100 transition"
        @click="generateKey"
      >
        Generate Key
      </button>
    </div>
  </div>
</template>

<script setup>
function generateKey() {
  alert('API key generated! (backend connection needed)')
}
</script>