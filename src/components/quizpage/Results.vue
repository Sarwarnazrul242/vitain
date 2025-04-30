<template>
  <div class="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
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
        <button
          @click="downloadPlan"
          class="w-full sm:w-auto bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white hover:opacity-90 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Plan
        </button>
      </div>

      <!-- Chat Button Component -->
      <ChatButton />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ChatButton from "@/components/common/ChatButton.vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const supplements = ref([]);
const supplementDetails = ref({});

const options = {
  method: "GET",
  url: "https://real-time-amazon-data.p.rapidapi.com/search",
  params: {
    query: "supplements",
    page: "1",
    country: "US",
    sort_by: "RELEVANCE",
    product_condition: "ALL",
    is_prime: "false",
    deals_and_discounts: "NONE",
  },
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_API_RAPID_API_KEY,
    "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
  },
};

const finishedLoadingSupplement = ref(false);

// Function to search Amazon for a supplement
const searchAmazonProduct = async (supplement) => {
  try {
    const options = {
      method: "GET",
      url: "https://real-time-amazon-data.p.rapidapi.com/search",
      params: {
        query: supplement + " supplement",
        page: "1",
        country: "US",
        sort_by: "RELEVANCE",
        product_condition: "ALL",
        is_prime: "false",
        deals_and_discounts: "NONE",
      },
      headers: {
        "x-rapidapi-key": "a1cfc4a9f5msh2fab5801d66c8e8p125e38jsn0caeeebe229c",
        "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    // First search for the product
    // const searchResponse = await fetch(
    //   `https://amazon-product-search-api1.p.rapidapi.com/amz/search?query=${encodeURIComponent(
    //     supplement + " supplement"
    //   )}&page=1&country=US&sortBy=relevance`,
    //   {
    //     headers: {
    //       "x-rapidapi-host": "amazon-product-search-api1.p.rapidapi.com",
    //       "x-rapidapi-key":
    //         "0e712f55e6msh4448966ec770992p11841djsna7833fa7e9a6",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    const response = await axios.request(options);

    const searchData = response.data;
    console.log("Search response:", searchData);

    if (searchData.data) {
      // Get the first product's ASIN and thumbnail
      const product = searchData.data.products[0];
      const asin = product?.asin || "";

      // Get the image URL from the response
      const image = product.product_photo;

      return {
        image: image,
        title: product.product_title,
        description: product.product_title,
        url: `https://www.amazon.com/dp/${asin}`,
      };
    }
    throw new Error("No products found");
  } catch (error) {
    console.error(`Error fetching product details for ${supplement}:`, error);
    return null;
  }
};

// Replace getSupplementImage with this
const getSupplementImage = (supplement) => {
  const details = supplementDetails.value[supplement.toLowerCase()];
  return (
    details?.image ||
    "https://images.unsplash.com/photo-1577636706176-fd50c6d6d697?w=200"
  );
};

// Update openSupplementInfo to use Amazon product URL
const openSupplementInfo = (supplement) => {
  const details = supplementDetails.value[supplement.toLowerCase()];
  if (details?.url) {
    window.open(details.url, "_blank");
  } else {
    window.open(
      `https://www.google.com/search?q=${supplement}+supplement+benefits`,
      "_blank"
    );
  }
};

// Update getSupplementDescription to use Amazon product description
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

// Download plan function
const downloadPlan = () => {
  const plan = {
    supplements: supplements.value,
    details: supplementDetails.value,
  };

  const blob = new Blob([JSON.stringify(plan, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vitain-supplement-plan.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

onMounted(async () => {
  try {
    if (!route.query.results) {
      throw new Error("No results data found");
    }

    const results = JSON.parse(route.query.results);
    console.log("Parsed results:", results);

    if (results && results.response) {
      supplements.value = results.response.split(",").map((s) => s.trim());
      console.log("Parsed supplements:", supplements.value);

      // Fetch Amazon product details for each supplement
      for (const supplement of supplements.value) {
        const details = await searchAmazonProduct(supplement);
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
  animation: fadeIn 1s ease-out;
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
</style>
