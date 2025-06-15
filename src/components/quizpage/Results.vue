<template>
  <div
    v-if="show_signup"
    class="relative min-h-screen overflow-hidden bg-[#0A0A0A]"
  >
    <div
      class="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-gradient-to-t from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-full blur-[120px] animate-pulse-slower"
    ></div>
    <!-- Animated particles -->
    <div class="particles-container">
      <div
        v-for="i in 6"
        :key="i"
        class="particle"
        :style="{ '--delay': `${i * 2}s` }"
      ></div>
    </div>
    <div
      class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 mt-24"
    >
      <!-- Header -->
      <div class="text-center mb-12 sm:mb-16 animate-fade-in">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
        >
          Create an account to view your recommendations!
        </h1>
      </div>

      <!-- Sign up -->
      <section class="pb-20">
        <div class="max-w-7xl mx-auto px-4 relative z-10">
          <div class="text-center mb-10">
            <h1 class="text-4xl md:text-6xl font-bold mb-6"></h1>
            <p class="text-gray-300 text-md md:text-xl max-w-3xl mx-auto">
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
          <!-- <p
            class="text-gray-600 underline cursor-pointer"
            @click="state = 'login'"
          >
            Already have an account?
          </p> -->
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
              View your results
            </span>
          </button>
        </div>
      </section>
    </div>
  </div>
  <div class="relative min-h-screen overflow-hidden bg-[#0A0A0A]" v-else>
    <!-- Animated background elements -->
    <div class="absolute inset-0 z-0">
      <!-- Gradient orbs -->
      <div
        class="absolute top-0 left-[20%] w-[500px] h-[500px] bg-gradient-to-b from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-full blur-[120px] animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-gradient-to-t from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-full blur-[120px] animate-pulse-slower"
      ></div>

      <!-- Animated particles -->
      <div class="particles-container">
        <div
          v-for="i in 6"
          :key="i"
          class="particle"
          :style="{ '--delay': `${i * 2}s` }"
        ></div>
      </div>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 mt-24"
    >
      <!-- Header -->
      <div class="text-center mb-12 sm:mb-16 animate-fade-in">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
        >
          Your Personalized
          <span class="block mt-2"> Supplement Plan </span>
        </h1>
        <p
          class="text-gray-300 text-lg md:text-xl animate-slide-up"
          style="--delay: 0.2s"
        >
          Based on your unique health profile and goals
        </p>
      </div>

      <!-- Supplements List -->
      <p
        v-if="!finishedLoadingSupplement"
        class="text-center text-gray-300 text-lg md:text-xl mb-14"
      >
        Loading your supplements...
      </p>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12"
      >
        <div
          v-for="(supplement, index) in supplements"
          :key="index"
          class="group animate-slide-up"
          :style="{ '--delay': `${0.4 + index * 0.1}s` }"
        >
          <div
            class="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4ADE80]/20 hover:scale-105 h-full"
          >
            <div class="flex flex-col items-center text-center">
              <!-- Supplement Icon -->
              <div
                class="w-40 h-40 bg-gradient-to-br from-[#4ADE80]/20 to-[#3B82F6]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 p-2"
              >
                <img
                  :src="getSupplementImage(supplement)"
                  :alt="supplement"
                  class="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:brightness-110"
                  @error="handleImageError"
                />
              </div>
              <!-- Supplement Name -->
              <h3
                class="text-xl font-semibold mb-3 capitalize text-white group-hover:text-[#4ADE80] transition-colors"
              >
                {{ formatSupplementName(supplement) }}
              </h3>
              <!-- Description -->
              <p
                class="text-gray-300 text-sm mb-4"
                v-html="getSupplementDescription(supplement)"
              ></p>
              <!-- Learn More Button -->
              <button
                @click="openSupplementInfo(supplement)"
                class="mt-auto text-[#4ADE80] hover:text-white bg-[#4ADE80]/10 hover:bg-gradient-to-r hover:from-[#4ADE80] hover:to-[#3B82F6] transition-all duration-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 group-hover:scale-105"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex flex-col sm:flex-row justify-center items-center gap-4"
        style="--delay: 0.8s"
      >
        <button
          @click="$router.push('/take-quiz')"
          class="w-full sm:w-auto border-2 border-[#4ADE80] text-[#4ADE80] hover:text-white hover:bg-gradient-to-r hover:from-[#4ADE80] hover:to-[#3B82F6] px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Retake Quiz
        </button>
      </div>

      <!-- Chat Button Component -->
      <ChatButton />
    </div>
  </div>
  <div
    v-if="selectedSupplement"
    class="fixed inset-0 z-50 flex items-center justify-center"
    @keydown.esc="selectedSupplement = null"
    tabindex="0"
  >
    <!-- Modal Backdrop -->
    <div
      class="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
      @click="selectedSupplement = null"
    ></div>
    <!-- Modal Card -->
    <div
      class="relative max-w-lg w-full bg-[#181C1F] rounded-2xl shadow-2xl p-8 z-10 animate-scale-in"
      @click.stop
    >
      <!-- Close Button -->
      <button
        @click="selectedSupplement = null"
        class="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl focus:outline-none focus:ring-2 focus:ring-[#4ADE80] rounded-full bg-black/30 w-10 h-10 flex items-center justify-center transition-colors"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <!-- Image -->
      <img
        :src="selectedSupplement.image"
        :alt="selectedSupplement.name"
        class="w-full h-56 object-cover rounded-xl border-4 border-[#23272B] shadow-lg mb-6"
      />
      <!-- Title -->
      <h2
        class="text-2xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text mb-2 text-center"
      >
        {{ selectedSupplement.title }}
      </h2>
      <!-- Description -->
      <p class="text-gray-300 text-base mb-6 text-center">
        {{ selectedSupplement.description }}
      </p>
      <hr class="border-white/10 mb-6" />
      <!-- Details Section -->
      <div
        class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6"
      >
        <div class="text-gray-400 text-sm">
          <div>
            <span class="font-medium text-white">Category:</span> Supplement
          </div>
          <div>
            <span class="font-medium text-white">Rating:</span>
            {{ selectedSupplement.rating || "4.5" }} ★
          </div>
        </div>
        <div class="flex-1">
          <input
            type="text"
            class="w-full bg-white/10 text-white rounded-xl px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] border border-white/10"
            placeholder="Add additional information..."
          />
        </div>
      </div>
      <!-- Action Buttons -->
      <div class="flex flex-col gap-3">
        <button
          @click="handleAddToCart(selectedSupplement)"
          class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-lg font-medium bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white shadow-md hover:scale-105 transition-transform group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"
            />
          </svg>
          Add to Cart
        </button>
        <button
          @click="shopForSupplement(selectedSupplement)"
          class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-lg font-medium bg-gradient-to-r from-[#3B82F6] to-[#4ADE80] text-white shadow-md hover:scale-105 transition-transform group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7-7 7M5 5v14"
            />
          </svg>
          Shop for Supplement
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ChatButton from "@/components/common/ChatButton.vue";
import axios from "axios";
import { signup } from "../../services/auth";

const route = useRoute();
const router = useRouter();
const selectedSupplement = ref(null);

const supplements = ref([]);
const supplementDetails = ref({});
const finishedLoadingSupplement = ref(false);
const show_signup = ref(false);
const email = ref("");
const password = ref("");

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_CSE_ID = import.meta.env.VITE_GOOGLE_CSE_ID;

async function createAccount() {
  try {
    if (email.value.trim() === "" || password.value.trim() === "") {
      alert("You have a missing input field.");
      return;
    }

    await signup(email.value, password.value);

    show_signup.value = false;
  } catch (err) {
    console.log(err);
  }
}

// Function to search Google for a supplement image and buy link
const searchGoogleProduct = async (supplement) => {
  try {
    // Search for product images
    const imageRes = await axios.get(
      "https://www.googleapis.com/customsearch/v1",
      {
        params: {
          key: GOOGLE_API_KEY,
          cx: GOOGLE_CSE_ID,
          q: `${supplement} supplement`,
          searchType: "image",
          num: 1,
        },
      }
    );
    const imageUrl = imageRes.data.items?.[0]?.link;

    // Search for buy link (web search)
    const webRes = await axios.get(
      "https://www.googleapis.com/customsearch/v1",
      {
        params: {
          key: GOOGLE_API_KEY,
          cx: GOOGLE_CSE_ID,
          q: `${supplement} supplement buy`,
          num: 1,
        },
      }
    );
    const buyUrl = webRes.data.items?.[0]?.link;
    const title = webRes.data.items?.[0]?.title || supplement;
    const snippet =
      webRes.data.items?.[0]?.snippet ||
      "Supports overall health and wellness.";

    return {
      image:
        imageUrl ||
        "https://images.unsplash.com/photo-1577636706176-fd50c6d6d697?w=200",
      title,
      description: snippet,
      url:
        buyUrl ||
        `https://www.google.com/search?q=${encodeURIComponent(
          supplement + " supplement buy"
        )}`,
    };
  } catch (error) {
    console.error(
      `Error fetching Google product details for ${supplement}:`,
      error
    );
    return {
      image:
        "https://images.unsplash.com/photo-1577636706176-fd50c6d6d697?w=200",
      title: supplement,
      description: "Supports overall health and wellness.",
      url: `https://www.google.com/search?q=${encodeURIComponent(
        supplement + " supplement buy"
      )}`,
    };
  }
};

const getSupplementImage = (supplement) => {
  const details = supplementDetails.value[supplement.toLowerCase()];
  return (
    details?.image ||
    "https://images.unsplash.com/photo-1577636706176-fd50c6d6d697?w=200"
  );
};

function shopForSupplement(details) {
  if (details?.url) {
    window.open(details.url, "_blank");
  } else {
    window.open(
      `https://www.google.com/search?q=${supplement}+supplement+buy`,
      "_blank"
    );
  }
}
const openSupplementInfo = (supplement) => {
  const data = supplementDetails.value[supplement.toLowerCase()];
  selectedSupplement.value = data;
};

const getSupplementDescription = (supplement) => {
  const details = supplementDetails.value[supplement.toLowerCase()];
  return details?.description || "Supports overall health and wellness.";
};

const handleImageError = (event) => {
  event.target.src =
    "https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png";
};

const formatSupplementName = (supplement) => {
  return supplement
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function handleAddToCart(supplement) {
  console.log("add to cart");
}

onMounted(async () => {
  try {
    if (!route.query.results) {
      throw new Error("No results data found");
    }

    if (route.query.showSignup) {
      show_signup.value = true;
    }

    const results = JSON.parse(route.query.results);
    if (results && results.response) {
      supplements.value = results.response.split(",").map((s) => s.trim());
      // Fetch Google product details for each supplement
      for (const supplement of supplements.value) {
        const details = await searchGoogleProduct(supplement);
        if (details) {
          supplementDetails.value[supplement.toLowerCase()] = details;
        }
      }
      finishedLoadingSupplement.value = true;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error parsing results:", error);
    router.push("/take-quiz");
  }
});
</script>

<style scoped>
.text-primary {
  color: #4ade80;
}

.bg-primary {
  background-color: #4ade80;
}

.from-primary {
  --tw-gradient-from: #4ade80;
}

.to-primary-dark {
  --tw-gradient-to: #3b82f6;
}

.border-primary {
  border-color: #4ade80;
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

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-slower {
  animation: pulse-slow 6s ease-in-out infinite;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
  animation-delay: var(--delay);
}

/* Floating particles animation */
.particles-container {
  @apply absolute inset-0 overflow-hidden;
}

.particle {
  @apply absolute w-2 h-2 rounded-full;
  background: linear-gradient(to right, #4ade80, #3b82f6);
  filter: blur(1px);
  animation: float-particle 15s linear infinite;
  animation-delay: var(--delay);
}

.particle:nth-child(1) {
  top: 20%;
  left: 10%;
}
.particle:nth-child(2) {
  top: 50%;
  right: 20%;
}
.particle:nth-child(3) {
  bottom: 30%;
  left: 30%;
}
.particle:nth-child(4) {
  top: 10%;
  right: 30%;
}
.particle:nth-child(5) {
  bottom: 20%;
  right: 10%;
}
.particle:nth-child(6) {
  top: 40%;
  left: 20%;
}

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
  background: #4ade80;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3b82f6;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
