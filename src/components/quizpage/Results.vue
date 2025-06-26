<template>
  <!-- Signup section commented out for now - will implement later
  <div
    v-if="show_signup"
    class="relative min-h-screen overflow-hidden bg-[#0A0A0A]"
  >
    <div
      class="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-gradient-to-t from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-full blur-[120px] animate-pulse-slower"
    ></div>
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
      <div class="text-center mb-12 sm:mb-16 animate-fade-in">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
        >
          Create an account to view your recommendations!
        </h1>
      </div>

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
  -->
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
      class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 mt-24"
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
          class="text-gray-300 text-lg md:text-xl animate-slide-up max-w-3xl mx-auto"
          style="--delay: 0.2s"
        >
          Based on your unique health profile and goals
        </p>
      </div>

      <!-- Supplements List -->
      <div v-if="!finishedLoadingSupplement" class="flex justify-center mb-8">
        <p class="text-center text-gray-300 text-lg md:text-xl">
          Loading your supplements...
        </p>
      </div>
      
      <div
        v-else
        class="space-y-12"
      >
        <div
          v-for="(supplement, index) in supplements"
          :key="index"
          class="animate-slide-up"
          :style="{ '--delay': `${0.4 + index * 0.1}s` }"
        >
          <!-- Supplement Header -->
          <div class="text-center mb-8">
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
              {{ formatSupplementName(supplement) }}
            </h2>
            <p class="text-gray-300 text-lg max-w-2xl mx-auto">
              {{ getSupplementDescription(supplement) }}
            </p>
          </div>

          <!-- Products Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div
              v-for="product in getProductsForSupplement(supplement)"
              :key="product.id"
              class="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4ADE80]/20 hover:scale-105 h-full flex flex-col"
            >
              <div class="flex flex-col items-center text-center h-full">
                <!-- Product Image -->
                <div class="w-40 h-40 bg-gradient-to-br from-[#4ADE80]/20 to-[#3B82F6]/5 rounded-2xl flex items-center justify-center mb-6 p-2 flex-shrink-0">
                  <img
                    :src="product.image_url"
                    :alt="product.fullName"
                    class="w-full h-full object-cover rounded-xl transition-all duration-300 hover:brightness-110"
                    @error="handleImageError"
                  />
                </div>

                <!-- Product Name -->
                <h3 class="text-lg font-semibold mb-2 text-white line-clamp-2 flex-grow">
                  {{ product.fullName }}
                </h3>

                <!-- Brand Name -->
                <p class="text-[#4ADE80] text-sm mb-3">
                  {{ product.brandName }}
                </p>

                <!-- Product Description -->
                <p class="text-gray-300 text-sm mb-6 line-clamp-3 flex-grow">
                  {{ product.snippet || "Product information available" }}
                </p>

                <!-- Action Buttons -->
                <div class="flex gap-3 w-full mt-auto button-group">
                  <button
                    @click="handlePurchase(product)"
                    class="flex-1 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
                  >
                    Purchase
                  </button>
                  <button
                    @click="openProductDetails(product)"
                    class="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16"
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
      <div class="flex justify-center mt-8">
        <ChatButton />
      </div>
    </div>
  </div>
  <div
    v-if="selectedSupplement"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
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
      class="relative max-w-4xl w-full max-h-[90vh] bg-[#181C1F] rounded-2xl shadow-2xl overflow-y-auto animate-scale-in"
      @click.stop
    >
      <!-- Close Button -->
      <button
        @click="selectedSupplement = null"
        class="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl focus:outline-none focus:ring-2 focus:ring-[#4ADE80] rounded-full bg-black/30 w-10 h-10 flex items-center justify-center transition-colors z-10"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      <div class="p-8">
        <!-- Header Section -->
        <div class="flex flex-col lg:flex-row gap-6 mb-8">
          <!-- Image -->
          <div class="lg:w-1/3">
            <img
              :src="selectedSupplement.image"
              :alt="selectedSupplement.name"
              class="w-full h-64 lg:h-80 object-cover rounded-xl border-4 border-[#23272B] shadow-lg"
            />
          </div>
          
          <!-- Product Info -->
          <div class="lg:w-2/3">
            <h2 class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text mb-4">
              {{ selectedSupplement.title }}
            </h2>
            
            <div class="space-y-3 mb-6">
              <div v-if="selectedSupplement.brandName">
                <span class="font-medium text-white">Brand:</span>
                <span class="text-gray-300 ml-2">{{ selectedSupplement.brandName }}</span>
              </div>
              
              <div v-if="selectedSupplement.targetGroups && selectedSupplement.targetGroups.length">
                <span class="font-medium text-white">Target Groups:</span>
                <div class="flex flex-wrap gap-2 mt-1">
                  <span
                    v-for="group in selectedSupplement.targetGroups"
                    :key="group"
                    class="px-2 py-1 bg-[#4ADE80]/20 text-[#4ADE80] text-xs rounded-full"
                  >
                    {{ group }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-300 text-base mb-6">
              {{ selectedSupplement.description }}
            </p>

            <!-- Purchase Button -->
            <button
              v-if="selectedSupplement.purchase_url"
              @click="handlePurchase(selectedSupplement)"
              class="w-full lg:w-auto bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white px-8 py-3 rounded-xl text-lg font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
              </svg>
              Purchase Now
            </button>
          </div>
        </div>

        <hr class="border-white/10 mb-8" />

        <!-- Detailed Information -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Ingredients -->
          <div v-if="selectedSupplement.ingredients && selectedSupplement.ingredients.length">
            <h3 class="text-xl font-bold text-white mb-4">Ingredients</h3>
            <div class="space-y-3">
              <div
                v-for="ingredient in selectedSupplement.ingredients"
                :key="ingredient.name"
                class="bg-white/5 p-4 rounded-lg"
              >
                <h4 class="font-semibold text-[#4ADE80] mb-2">{{ ingredient.name }}</h4>
                <div v-if="ingredient.quantity && ingredient.quantity.length" class="text-sm text-gray-300">
                  <div v-for="qty in ingredient.quantity" :key="qty.quantity">
                    {{ qty.quantity }} {{ qty.unit }} per {{ qty.servingSizeQuantity }} {{ qty.servingSizeUnit }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Serving Information -->
          <div v-if="selectedSupplement.servingSizes && selectedSupplement.servingSizes.length">
            <h3 class="text-xl font-bold text-white mb-4">Serving Information</h3>
            <div class="space-y-3">
              <div
                v-for="serving in selectedSupplement.servingSizes"
                :key="serving.order"
                class="bg-white/5 p-4 rounded-lg"
              >
                <div class="text-sm text-gray-300">
                  <div><span class="font-medium text-white">Serving Size:</span> {{ serving.minQuantity }}-{{ serving.maxQuantity }} {{ serving.unit }}</div>
                  <div><span class="font-medium text-white">Daily Servings:</span> {{ serving.minDailyServings }}-{{ serving.maxDailyServings }}</div>
                  <div v-if="serving.notes" class="mt-2 text-gray-400">{{ serving.notes }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Statements -->
        <div v-if="selectedSupplement.statements && selectedSupplement.statements.length" class="mt-8">
          <h3 class="text-xl font-bold text-white mb-4">Product Information</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              v-for="statement in selectedSupplement.statements"
              :key="statement.type"
              class="bg-white/5 p-4 rounded-lg"
            >
              <h4 class="font-semibold text-[#4ADE80] mb-2">{{ statement.type }}</h4>
              <p class="text-sm text-gray-300">{{ statement.notes }}</p>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div v-if="selectedSupplement.contacts && selectedSupplement.contacts.length" class="mt-8">
          <h3 class="text-xl font-bold text-white mb-4">Contact Information</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              v-for="contact in selectedSupplement.contacts"
              :key="contact.name"
              class="bg-white/5 p-4 rounded-lg"
            >
              <h4 class="font-semibold text-[#4ADE80] mb-2">{{ contact.name }}</h4>
              <div class="text-sm text-gray-300 space-y-1">
                <div v-if="contact.streetAddress">{{ contact.streetAddress }}</div>
                <div v-if="contact.city || contact.state || contact.zipCode">
                  {{ [contact.city, contact.state, contact.zipCode].filter(Boolean).join(', ') }}
                </div>
                <div v-if="contact.phoneNumber">Phone: {{ contact.phoneNumber }}</div>
                <div v-if="contact.email">Email: {{ contact.email }}</div>
                <div v-if="contact.webAddress">Website: {{ contact.webAddress }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ChatButton from "@/components/common/ChatButton.vue";
// import axios from "axios"; // No longer needed
// import { signup } from "../../services/auth"; // Commented out for now

const route = useRoute();
const router = useRouter();
const selectedSupplement = ref(null);

const supplements = ref([]);
const supplementProducts = ref([]);
const finishedLoadingSupplement = ref(false);
// const show_signup = ref(false); // Commented out for now
// const email = ref(""); // Commented out for now
// const password = ref(""); // Commented out for now

// const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
// const GOOGLE_CSE_ID = import.meta.env.VITE_GOOGLE_CSE_ID;

// async function createAccount() { // Commented out for now
//   try {
//     if (email.value.trim() === "" || password.value.trim() === "") {
//       alert("You have a missing input field.");
//       return;
//     }

//     await signup(email.value, password.value);

//     show_signup.value = false;
//   } catch (err) {
//     console.log(err);
//   }
// }

// Function to handle purchase button click
const handlePurchase = (product) => {
  if (product.purchase_url) {
    window.open(product.purchase_url, "_blank");
  }
};

// Function to open product details modal
const openProductDetails = (product) => {
  selectedSupplement.value = {
    name: product.fullName,
    title: product.fullName,
    image: product.image_url,
    description: product.snippet || "Product information available",
    brandName: product.brandName,
    purchase_url: product.purchase_url,
    ingredients: product.ingredients,
    statements: product.statements,
    servingSizes: product.servingSizes,
    netContents: product.netContents,
    targetGroups: product.targetGroups,
    contacts: product.contacts,
  };
};

// Function to get supplement image
const getSupplementImage = (supplement) => {
  // Find the product in supplementProducts array
  for (const productGroup of supplementProducts.value) {
    for (const product of productGroup) {
      if (product.fullName.toLowerCase().includes(supplement.toLowerCase())) {
        return product.image_url;
      }
    }
  }
  return "https://images.unsplash.com/photo-1577636706176-fd50c6d6d697?w=200";
};

// Function to get supplement description
const getSupplementDescription = (supplement) => {
  // Find the product in supplementProducts array
  for (const productGroup of supplementProducts.value) {
    for (const product of productGroup) {
      if (product.fullName.toLowerCase().includes(supplement.toLowerCase())) {
        return product.snippet || "Supports overall health and wellness.";
      }
    }
  }
  return "Supports overall health and wellness.";
};

// Function to get products for a specific supplement
const getProductsForSupplement = (supplement) => {
  const products = [];
  for (const productGroup of supplementProducts.value) {
    for (const product of productGroup) {
      if (product.fullName.toLowerCase().includes(supplement.toLowerCase())) {
        products.push(product);
      }
    }
  }
  return products;
};

function shopForSupplement(details) {
  if (details?.url) {
    window.open(details.url, "_blank");
  } else {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        supplement + " supplement buy"
      )}`,
      "_blank"
    );
  }
}
const openSupplementInfo = (supplement) => {
  const data = supplementDetails.value[supplement.toLowerCase()];
  selectedSupplement.value = data;
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

    // if (route.query.showSignup) { // Commented out for now
    //   show_signup.value = true;
    // }

    const results = JSON.parse(route.query.results);
    if (results && results.response) {
      supplements.value = results.response.split(",").map((s) => s.trim());
      
      // Parse supplement products data if available
      if (route.query.supplementProducts) {
        supplementProducts.value = JSON.parse(route.query.supplementProducts);
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

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Additional centering and alignment improvements */
.text-center {
  text-align: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-center {
  display: grid;
  place-items: center;
}

/* Ensure consistent card heights */
.card-equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-equal-height > * {
  flex: 1;
}

/* Improve button alignment */
.button-group {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.button-group button {
  flex: 1;
  min-width: 0;
}
</style>
