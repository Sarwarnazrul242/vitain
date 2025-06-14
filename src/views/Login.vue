<template>
  <BackgroundGradient />
  <div class="relative">
    <NavBar />

    <!-- Hero Section -->
    <section class="pt-32 pb-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            <span
              class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
            >
              Log In
            </span>
          </h1>
          <p class="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Welcome back! Continue where you left off on your supplement
            journey.
          </p>
        </div>
      </div>
      <div class="z-10 flex items-center justify-center gap-10">
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Email Address</label
          >
          <input
            type="text"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Enter your email address"
          />
        </div>
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Password</label
          >
          <input
            type="password"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Enter your password"
          />
        </div>
        <button
          @click="startQuiz"
          class="relative group px-8 py-3 rounded-xl text-lg md:text-xl font-medium overflow-hidden animate-fade-in-up"
        >
          <span
            class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform duration-300 group-hover:scale-105"
          ></span>
          <span
            class="relative text-white flex text-base items-center justify-center gap-2"
          >
            Log in
          </span>
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import BackgroundGradient from "@/components/homepage/BackgroundGradient.vue";
</script>
