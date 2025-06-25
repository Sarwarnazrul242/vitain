<template>
  <div class="welcome-section">
    <div class="welcome-header">
      <div class="welcome-text">
        <h1 class="welcome-title">
          Welcome back, <span class="user-name">{{ userName }}</span>! 👋
        </h1>
        <p class="welcome-subtitle">
          {{ welcomeMessage }}
        </p>
      </div>
      
      <div class="welcome-actions">
        <!-- Sidebar Toggle Button -->
        <button @click="openSidebar" class="sidebar-toggle">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <!-- User Avatar -->
        <div class="welcome-avatar">
          <div class="avatar-circle">
            {{ userInitials }}
          </div>
        </div>
      </div>
    </div>

    <div class="quick-stats">
      <div class="stat-card">
        <div class="stat-icon">📅</div>
        <div class="stat-content">
          <div class="stat-value">{{ daysSinceJoining }}</div>
          <div class="stat-label">Days with us</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-content">
          <div class="stat-value">{{ activeGoals }}</div>
          <div class="stat-label">Active goals</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">💊</div>
        <div class="stat-content">
          <div class="stat-value">{{ currentSupplements }}</div>
          <div class="stat-label">Supplements</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <div class="stat-value">{{ checkInStreak }}</div>
          <div class="stat-label">Day streak</div>
        </div>
      </div>
    </div>

    <div v-if="!profileComplete" class="onboarding-banner">
      <div class="banner-content">
        <div class="banner-icon">⚡</div>
        <div class="banner-text">
          <h3 class="banner-title">Complete your profile</h3>
          <p class="banner-description">Get personalized supplement recommendations by completing your health profile</p>
        </div>
        <button @click="completeProfile" class="banner-button">
          Complete Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Notification state
const showNotifications = ref(false);
const notificationsPanel = ref();

// Sidebar reference
const sidebarRef = ref();

// User data (in real app, this would come from user store/API)
const userData = ref({
  name: 'John Doe',
  email: 'john@example.com',
  joinDate: new Date('2024-01-15'),
  activeGoals: 3,
  currentSupplements: 5,
  checkInStreak: 7,
  profileComplete: true
});

// Computed properties
const userName = computed(() => userData.value.name);
const userInitials = computed(() => {
  return userData.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
});

const daysSinceJoining = computed(() => {
  const today = new Date();
  const joinDate = userData.value.joinDate;
  const diffTime = Math.abs(today.getTime() - joinDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

const activeGoals = computed(() => userData.value.activeGoals);
const currentSupplements = computed(() => userData.value.currentSupplements);
const checkInStreak = computed(() => userData.value.checkInStreak);
const profileComplete = computed(() => userData.value.profileComplete);

const welcomeMessage = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! Ready to start your day with optimal health?";
  if (hour < 17) return "Good afternoon! How's your health journey going?";
  return "Good evening! Time to reflect on your wellness goals.";
});

// Notification computed properties
const unreadCount = computed(() => {
  return notificationsPanel.value?.unreadCount || 0;
});

const urgentCount = computed(() => {
  return notificationsPanel.value?.urgentCount || 0;
});

// Methods
const completeProfile = () => {
  router.push('/questionnaire');
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.notification-container')) {
    showNotifications.value = false;
  }
};

// Sidebar methods
const openSidebar = () => {
  // Emit event to parent component to open sidebar
  emit('open-sidebar');
};

// Add notification method (for other components to use)
const addNotification = (type: string, title: string, message: string, priority: string = 'normal') => {
  if (notificationsPanel.value) {
    notificationsPanel.value.addNotification(type, title, message, priority);
  }
};

// Define emits
const emit = defineEmits(['open-sidebar']);

// Expose methods for other components
defineExpose({
  addNotification,
  openSidebar
});

onMounted(() => {
  // Load user data from localStorage or API
  const savedUserData = localStorage.getItem('userData');
  if (savedUserData) {
    const parsed = JSON.parse(savedUserData);
    userData.value = { ...userData.value, ...parsed };
  }
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  // Remove click outside listener
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.welcome-section {
  @apply mb-8;
}

.welcome-header {
  @apply flex items-center justify-between mb-6;
}

.welcome-text {
  @apply flex-1;
}

.welcome-title {
  @apply text-3xl font-bold text-white mb-2;
}

.user-name {
  @apply bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text;
}

.welcome-subtitle {
  @apply text-gray-400 text-lg;
}

.welcome-actions {
  @apply flex items-center gap-4;
}

/* Sidebar Toggle Button */
.sidebar-toggle {
  @apply w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105;
}

.sidebar-toggle:hover {
  @apply transform scale-105;
}

.sidebar-toggle:active {
  @apply transform scale-95;
}

/* Notification Styles */
.notification-container {
  @apply relative;
}

.notification-bell {
  @apply relative w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40;
}

.notification-bell.has-notifications {
  @apply border-[#4ADE80]/50 bg-[#4ADE80]/10;
}

.notification-bell:hover {
  @apply transform scale-105;
}

.notification-badge {
  @apply absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center;
}

.urgent-indicator {
  @apply absolute -bottom-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse;
}

.notifications-dropdown {
  @apply absolute top-full right-0 mt-2 w-80 z-50;
}

.welcome-avatar {
  @apply ml-2;
}

.avatar-circle {
  @apply w-16 h-16 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold text-xl;
}

.quick-stats {
  @apply grid grid-cols-2 md:grid-cols-4 gap-4 mb-6;
}

.stat-card {
  @apply bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg;
}

.stat-card:hover {
  @apply transform -translate-y-1;
}

.stat-icon {
  @apply text-2xl mb-2;
}

.stat-value {
  @apply text-2xl font-bold text-white mb-1;
}

.stat-label {
  @apply text-gray-400 text-sm;
}

.onboarding-banner {
  @apply bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 border border-[#4ADE80]/20 rounded-xl p-6;
}

.banner-content {
  @apply flex items-center gap-4;
}

.banner-icon {
  @apply text-3xl;
}

.banner-text {
  @apply flex-1;
}

.banner-title {
  @apply text-lg font-semibold text-white mb-1;
}

.banner-description {
  @apply text-gray-400 text-sm;
}

.banner-button {
  @apply px-6 py-2 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-medium rounded-lg hover:scale-105 transition-all duration-300;
}

/* Animation for notification badge */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Responsive design */
@media (max-width: 768px) {
  .welcome-header {
    @apply flex-col text-center;
  }
  
  .welcome-actions {
    @apply justify-center mt-4;
  }
  
  .notifications-dropdown {
    @apply w-full right-0;
  }
  
  .quick-stats {
    @apply grid-cols-2 gap-3;
  }
  
  .banner-content {
    @apply flex-col text-center;
  }
  
  .notification-bell {
    @apply w-10 h-10;
  }
  
  .sidebar-toggle {
    @apply w-10 h-10;
  }
  
  .avatar-circle {
    @apply w-12 h-12 text-lg;
  }
}

@media (max-width: 480px) {
  .welcome-title {
    @apply text-2xl;
  }
  
  .welcome-subtitle {
    @apply text-base;
  }
  
  .welcome-actions {
    @apply gap-2;
  }
}
</style>
