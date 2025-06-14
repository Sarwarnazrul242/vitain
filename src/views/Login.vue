<template>
  <BackgroundGradient />
  <div class="relative">
    <!-- <NavBar /> -->

    <!-- LOGIN -->
    <section class="pt-32 pb-20 md:py-32" v-if="state === 'login'">
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center mb-10">
          <h1 class="text-4xl md:text-6xl mt-32 font-bold mb-6">
            <span
              class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
            >
              Log In
            </span>
          </h1>
          <p class="text-gray-300 text-md mt-10 md:text-xl max-w-3xl mx-auto">
            Welcome back! Continue your jouney
          </p>
        </div>
      </div>
      <div class="z-10 flex items-center flex-col justify-center gap-10">
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] w-96"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Email Address</label
          >
          <input
            type="text"
            v-model="email"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Enter your email address"
          />
        </div>
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] w-96"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Enter your password"
          />
        </div>
        <p
          class="text-gray-600 underline cursor-pointer"
          @click="state = 'signup'"
        >
          Don't have an account?
        </p>
        <button
          class="relative group px-8 py-3 rounded-xl text-lg md:text-xl font-medium overflow-hidden animate-fade-in-up"
          @click="logIn"
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

    <!-- Sign up page -->
    <section class="pt-32 pb-20 md:py-32" v-if="state === 'signup'">
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center mb-10">
          <h1 class="text-4xl md:text-6xl mt-32 font-bold mb-6">
            <span
              class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
            >
              Sign Up
            </span>
          </h1>
          <p class="text-gray-300 text-md mt-10 md:text-xl max-w-3xl mx-auto">
            Start your wellness jouney today!
          </p>
        </div>
      </div>
      <div class="z-10 flex items-center flex-col justify-center gap-10">
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] w-96"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Email Address</label
          >
          <input
            type="text"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Enter your email address"
            v-model="email"
          />
        </div>
        <div
          class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] w-96"
        >
          <label class="font-semibold text-lg block mb-4 text-white"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            class="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 transition-all placeholder:text-white/50"
            placeholder="Enter your password"
          />
        </div>
        <p
          class="text-gray-600 underline cursor-pointer"
          @click="state = 'login'"
        >
          Already have an account?
        </p>
        <button
          @click="createAccount"
          class="relative group px-8 py-3 rounded-xl text-lg md:text-xl font-medium overflow-hidden animate-fade-in-up"
        >
          <span
            class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform duration-300 group-hover:scale-105"
          ></span>
          <span
            class="relative text-white flex text-base items-center justify-center gap-2"
          >
            Crate an account
          </span>
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import BackgroundGradient from "@/components/homepage/BackgroundGradient.vue";
import { ref } from "vue";
import { login, signup } from "../services/auth";

const state = ref<"signup" | "login">("login");
const email = ref<string>("");
const password = ref<string>("");

async function createAccount() {
  try {
    if (email.value.trim() === "" || password.value.trim() === "") {
      alert("You have a missing input field.");
      return;
    }

    await signup(email.value, password.value);
  } catch (err) {
    console.log(err);
  }
}

async function logIn() {
  try {
    if (email.value.trim() === "" || password.value.trim() === "") {
      alert("You have a missing input field.");
      return;
    }

    await login(email.value, password.value);
  } catch (err) {
    console.log(err);
  }
}
</script>
