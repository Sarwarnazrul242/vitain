<template>
  <div class="supplement-recommendations">
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-icon">💊</span>
        Your Supplement Recommendations
      </h2>
      <router-link to="/supplements" class="view-all-link">
        View All
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>

    <div class="recommendations-grid">
      <div 
        v-for="supplement in recommendations" 
        :key="supplement.id" 
        class="supplement-card"
      >
        <div class="supplement-image">
          <img :src="supplement.image" :alt="supplement.name" class="product-image" />
          <button 
            @click="addToCart(supplement)"
            class="add-button"
            :disabled="supplement.ordered"
          >
            <svg v-if="!supplement.ordered" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="supplement-content">
          <h3 class="supplement-name">{{ supplement.name }}</h3>
          <p class="supplement-description">{{ supplement.description }}</p>
          
          <div class="recommendation-reason">
            <span class="reason-label">Why recommended:</span>
            <span class="reason-text">{{ supplement.reason }}</span>
          </div>
          
          <div class="supplement-details">
            <div class="detail-item">
              <span class="detail-label">Dosage:</span>
              <span class="detail-value">{{ supplement.dosage }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Frequency:</span>
              <span class="detail-value">{{ supplement.frequency }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Price:</span>
              <span class="detail-value price">${{ supplement.price }}</span>
            </div>
          </div>
          
          <div class="supplement-actions">
            <button @click="viewDetails(supplement)" class="details-button">
              More Details
            </button>
            <button @click="searchVerified(supplement)" class="verified-button">
              Verified Search
            </button>
            <button @click="searchGeneral(supplement)" class="general-button">
              General Search
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="recommendations.length === 0" class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3 class="empty-title">No recommendations yet</h3>
      <p class="empty-description">
        Complete your health profile to get personalized supplement recommendations
      </p>
      <button @click="completeProfile" class="empty-button">
        Complete Profile
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import vitaminImage from '@/assets/VitaminD.png';
import magnesiumImage from '@/assets/magnesium.png';    

const router = useRouter();

// Supplement recommendations data
const recommendations = ref([
  {
    id: 1,
    name: 'Vitamin D3 + K2',
    description: 'High-potency vitamin D with K2 for optimal absorption and bone health',
    reason: 'Based on your low sun exposure and bone health goals',
    dosage: '2000 IU',
    frequency: 'Once daily',
    price: 24.99,
    image: vitaminImage,
    ordered: false
  },
  {
    id: 2,
    name: 'Omega-3 Fish Oil',
    description: 'Premium fish oil with EPA and DHA for heart and brain health',
    reason: 'Supports your heart health and cognitive function goals',
    dosage: '1000mg',
    frequency: 'Twice daily',
    price: 32.99,
    image: vitaminImage,
    ordered: false
  },
  {
    id: 3,
    name: 'Magnesium Glycinate',
    description: 'Gentle magnesium for better sleep and muscle recovery',
    reason: 'Helps with your sleep quality and stress management',
    dosage: '400mg',
    frequency: 'Once daily',
    price: 18.99,
    image: magnesiumImage,
    ordered: false
  },
  {
    id: 4,
    name: 'Probiotic Complex',
    description: 'Multi-strain probiotic for digestive health and immunity',
    reason: 'Supports your digestive health and immune system',
    dosage: '10 billion CFU',
    frequency: 'Once daily',
    price: 28.99,
    image: vitaminImage,
    ordered: false
  }
]);

// Methods
const searchVerified = (supplement: any) => {
  console.log('Searching verified sources for:', supplement.name);
  // In real app, this would search verified supplement sources
  // For now, just show a message
  alert(`Searching verified sources for ${supplement.name}`);
};

const searchGeneral = (supplement: any) => {
  console.log('Searching general sources for:', supplement.name);
  // In real app, this would search general supplement sources
  // For now, just show a message
  alert(`Searching general sources for ${supplement.name}`);
};

const addToCart = (supplement: any) => {
  supplement.ordered = true;
  console.log('Adding supplement to cart:', supplement.name);
  
  // Emit event for YourSuppliment component to listen to
  window.dispatchEvent(new CustomEvent('supplementAdded', {
    detail: {
      id: supplement.id,
      name: supplement.name,
      description: supplement.description,
      dosage: supplement.dosage,
      frequency: supplement.frequency,
      price: supplement.price,
      image: supplement.image
    }
  }));
  
  // In real app, this would add to cart
  // For now, just show a success message
  alert(`${supplement.name} added to your supplements!`);
};

const viewDetails = (supplement: any) => {
  console.log('Viewing details for:', supplement.name);
  // Navigate to supplement details page
  router.push(`/supplements/${supplement.id}`);
};

const completeProfile = () => {
          router.push('/take-quiz');
};

onMounted(() => {
  // Load recommendations from localStorage or API
  const savedRecommendations = localStorage.getItem('supplementRecommendations');
  if (savedRecommendations) {
    recommendations.value = JSON.parse(savedRecommendations);
  }
});
</script>

<style scoped>
.supplement-recommendations {
  @apply mb-8;
}

.section-header {
  @apply flex items-center justify-between mb-6;
}

.section-title {
  @apply text-2xl font-bold text-white flex items-center gap-2;
}

.title-icon {
  @apply text-2xl;
}

.view-all-link {
  @apply text-[#4ADE80] hover:text-[#3B82F6] transition-colors duration-300 font-medium flex items-center;
}

.recommendations-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

.supplement-card {
  @apply bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg overflow-hidden;
}

.supplement-card:hover {
  @apply transform -translate-y-1;
}

.supplement-image {
  @apply relative h-48 bg-gradient-to-br from-gray-800 to-gray-900;
}

.product-image {
  @apply w-full h-full object-contain;
}

.add-button {
  @apply absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110;
}

.add-button:disabled {
  @apply bg-green-500/80 cursor-not-allowed hover:scale-100;
}

.add-button svg {
  @apply w-4 h-4;
}

.supplement-content {
  @apply p-6;
}

.supplement-name {
  @apply text-xl font-bold text-white mb-2;
}

.supplement-description {
  @apply text-gray-400 text-sm mb-4;
}

.recommendation-reason {
  @apply mb-4 p-3 bg-[#4ADE80]/10 border border-[#4ADE80]/20 rounded-lg;
}

.reason-label {
  @apply text-[#4ADE80] font-medium text-sm block mb-1;
}

.reason-text {
  @apply text-white text-sm;
}

.supplement-details {
  @apply space-y-2 mb-4;
}

.detail-item {
  @apply flex justify-between items-center;
}

.detail-label {
  @apply text-gray-400 text-sm;
}

.detail-value {
  @apply text-white text-sm font-medium;
}

.detail-value.price {
  @apply text-[#4ADE80] font-bold;
}

.supplement-actions {
  @apply flex gap-2;
}

.details-button {
  @apply flex-1 py-2 px-3 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-medium rounded-lg hover:scale-105 transition-all duration-300 text-sm border border-white/10 hover:from-[#3B82F6] hover:to-[#4ADE80];
}

.verified-button {
  @apply flex-1 py-2 px-3 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-medium rounded-lg hover:scale-105 transition-all duration-300 text-sm hover:from-[#3B82F6] hover:to-[#4ADE80];
}

.general-button {
  @apply flex-1 py-2 px-3 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-medium rounded-lg hover:scale-105 transition-all duration-300 text-sm hover:from-[#3B82F6] hover:to-[#4ADE80];
}

.empty-state {
  @apply text-center py-12;
}

.empty-icon {
  @apply text-6xl mb-4;
}

.empty-title {
  @apply text-xl font-bold text-white mb-2;
}

.empty-description {
  @apply text-gray-400 mb-6;
}

.empty-button {
  @apply px-6 py-2 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-medium rounded-lg hover:scale-105 transition-all duration-300;
}

/* Responsive design */
@media (max-width: 768px) {
  .recommendations-grid {
    @apply grid-cols-1 gap-4;
  }
  
  .supplement-actions {
    @apply flex-col;
  }
  
  .order-button,
  .details-button {
    @apply w-full;
  }
}
</style>
