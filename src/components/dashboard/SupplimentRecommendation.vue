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
          <div class="supplement-badge" :class="supplement.priority">
            {{ supplement.priority }}
          </div>
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
            <button 
              @click="orderSupplement(supplement)"
              class="order-button"
              :disabled="supplement.ordered"
            >
              <span v-if="supplement.ordered" class="ordered-text">✓ Ordered</span>
              <span v-else>Order Now</span>
            </button>
            <button @click="viewDetails(supplement)" class="details-button">
              Details
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
    priority: 'high',
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
    priority: 'medium',
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
    priority: 'medium',
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
    priority: 'low',
    ordered: false
  }
]);

// Methods
const orderSupplement = (supplement: any) => {
  supplement.ordered = true;
  console.log('Ordering supplement:', supplement.name);
  
  // In real app, this would trigger an order flow
  // For now, just show a success message
  alert(`${supplement.name} added to cart!`);
};

const viewDetails = (supplement: any) => {
  console.log('Viewing details for:', supplement.name);
  // Navigate to supplement details page
  router.push(`/supplements/${supplement.id}`);
};

const completeProfile = () => {
  router.push('/questionnaire');
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

.supplement-badge {
  @apply absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-white;
}

.supplement-badge.high {
  @apply bg-red-500;
}

.supplement-badge.medium {
  @apply bg-yellow-500;
}

.supplement-badge.low {
  @apply bg-green-500;
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
  @apply flex gap-3;
}

.order-button {
  @apply flex-1 py-2 px-4 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-medium rounded-lg hover:scale-105 transition-all duration-300;
}

.order-button:disabled {
  @apply bg-green-600 cursor-not-allowed hover:scale-100;
}

.ordered-text {
  @apply flex items-center justify-center gap-1;
}

.details-button {
  @apply py-2 px-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300;
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
