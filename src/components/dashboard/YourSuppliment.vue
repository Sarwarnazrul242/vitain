<template>
  <div class="your-supplements">
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-icon">💊</span>
        Your Supplements
      </h2>
      <div class="supplement-count">
        {{ chosenSupplements.length }} supplement{{ chosenSupplements.length !== 1 ? 's' : '' }}
      </div>
    </div>

    <div v-if="chosenSupplements.length === 0" class="empty-state">
      <div class="empty-icon">📦</div>
      <h3 class="empty-title">No supplements added yet</h3>
      <p class="empty-description">
        Add supplements from the recommendations above to see them here
      </p>
    </div>

    <div v-else class="supplements-grid">
      <div 
        v-for="supplement in chosenSupplements" 
        :key="supplement.id" 
        class="supplement-card"
      >
        <div class="supplement-image">
          <img :src="supplement.image" :alt="supplement.name" class="product-image" />
          <button 
            @click="removeSupplement(supplement)"
            class="remove-button"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="supplement-content">
          <h3 class="supplement-name">{{ supplement.name }}</h3>
          <p class="supplement-description">{{ supplement.description }}</p>
          
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
              Details
            </button>
            <button @click="orderSupplement(supplement)" class="order-button">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="chosenSupplements.length > 0" class="summary-section">
      <div class="summary-card">
        <h4 class="summary-title">Supplement Summary</h4>
        <div class="summary-details">
          <div class="summary-item">
            <span class="summary-label">Total Supplements:</span>
            <span class="summary-value">{{ chosenSupplements.length }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Total Cost:</span>
            <span class="summary-value price">${{ totalCost }}</span>
          </div>
        </div>
        <button @click="orderAllSupplements" class="order-all-button">
          Order All Supplements
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import vitaminImage from '@/assets/VitaminD.png';
import magnesiumImage from '@/assets/magnesium.png';

const router = useRouter();

// Chosen supplements from recommendations
const chosenSupplements = ref([
  {
    id: 1,
    name: 'Vitamin D3 + K2',
    description: 'High-potency vitamin D with K2 for optimal absorption and bone health',
    dosage: '2000 IU',
    frequency: 'Once daily',
    price: 24.99,
    image: vitaminImage,
    addedDate: '2025-01-24'
  },
  {
    id: 3,
    name: 'Magnesium Glycinate',
    description: 'Gentle magnesium for better sleep and muscle recovery',
    dosage: '400mg',
    frequency: 'Once daily',
    price: 18.99,
    image: magnesiumImage,
    addedDate: '2025-01-24'
  }
]);

// Computed properties
const totalCost = computed(() => {
  return chosenSupplements.value.reduce((total, supplement) => {
    return total + supplement.price;
  }, 0).toFixed(2);
});

// Methods
const removeSupplement = (supplement: any) => {
  const index = chosenSupplements.value.findIndex(s => s.id === supplement.id);
  if (index > -1) {
    chosenSupplements.value.splice(index, 1);
    console.log('Removed supplement:', supplement.name);
    
    // Update localStorage
    localStorage.setItem('chosenSupplements', JSON.stringify(chosenSupplements.value));
  }
};

const viewDetails = (supplement: any) => {
  console.log('Viewing details for:', supplement.name);
  router.push(`/supplements/${supplement.id}`);
};

const orderSupplement = (supplement: any) => {
  console.log('Ordering supplement:', supplement.name);
  alert(`${supplement.name} added to cart!`);
};

const orderAllSupplements = () => {
  console.log('Ordering all supplements');
  alert(`Ordering ${chosenSupplements.value.length} supplements for $${totalCost.value}!`);
};

// Load chosen supplements from localStorage
onMounted(() => {
  const savedSupplements = localStorage.getItem('chosenSupplements');
  if (savedSupplements) {
    chosenSupplements.value = JSON.parse(savedSupplements);
  }
});

// Listen for supplements added from recommendations
onMounted(() => {
  window.addEventListener('supplementAdded', (event: any) => {
    const supplement = event.detail;
    // Check if supplement is already in the list
    const exists = chosenSupplements.value.find(s => s.id === supplement.id);
    if (!exists) {
      chosenSupplements.value.push({
        ...supplement,
        addedDate: new Date().toISOString().split('T')[0]
      });
      // Save to localStorage
      localStorage.setItem('chosenSupplements', JSON.stringify(chosenSupplements.value));
    }
  });
});
</script>

<style scoped>
.your-supplements {
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

.supplement-count {
  @apply text-gray-400 font-medium;
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
  @apply text-gray-400;
}

.supplements-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8;
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

.remove-button {
  @apply absolute top-3 right-3 w-8 h-8 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all duration-300 hover:scale-110;
}

.remove-button svg {
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

.details-button {
  @apply py-2 px-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300;
}

.summary-section {
  @apply mt-8;
}

.summary-card {
  @apply bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10;
}

.summary-title {
  @apply text-lg font-bold text-white mb-4;
}

.summary-details {
  @apply space-y-2 mb-4;
}

.summary-item {
  @apply flex justify-between items-center;
}

.summary-label {
  @apply text-gray-400;
}

.summary-value {
  @apply text-white font-medium;
}

.summary-value.price {
  @apply text-[#4ADE80] font-bold text-lg;
}

.order-all-button {
  @apply w-full py-3 px-6 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-bold rounded-lg hover:scale-105 transition-all duration-300;
}

/* Responsive design */
@media (max-width: 768px) {
  .supplements-grid {
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
