<template>
  <div class="sidebar" :class="{ 'sidebar-open': isOpen }">
    <!-- Sidebar Overlay -->
    <div v-if="isOpen" @click="closeSidebar" class="sidebar-overlay"></div>
    
    <!-- Sidebar Content -->
    <div class="sidebar-content">
      <!-- Sidebar Header -->
      <div class="sidebar-header">

      </div>

      <!-- User Profile Section -->
      <div class="user-profile">
        <div class="user-avatar">
          <div class="avatar-circle">
            {{ userInitials }}
          </div>
        </div>
        <div class="user-info">
          <h3 class="user-name">{{ userName }}</h3>
          <p class="user-email">{{ userEmail }}</p>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <div class="nav-section">
          <h4 class="nav-section-title">Main</h4>
          <ul class="nav-list">
            <li>
              <router-link 
                to="/dashboard" 
                class="nav-item"
                :class="{ 'active': currentRoute === '/dashboard' }"
                @click="closeSidebar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
                <span>Dashboard</span>
                <div v-if="currentRoute === '/dashboard'" class="active-indicator"></div>
              </router-link>
            </li>
            
            <li>
              <router-link 
                to="/supplements" 
                class="nav-item"
                :class="{ 'active': currentRoute === '/supplements' }"
                @click="closeSidebar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span>My Supplements</span>
                <div v-if="currentRoute === '/supplements'" class="active-indicator"></div>
              </router-link>
            </li>
            
            <li>
              <router-link 
                to="/health-tracker" 
                class="nav-item"
                :class="{ 'active': currentRoute === '/health-tracker' }"
                @click="closeSidebar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Health Tracker</span>
                <div v-if="currentRoute === '/health-tracker'" class="active-indicator"></div>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <h4 class="nav-section-title">Goals & Progress</h4>
          <ul class="nav-list">
            <li>
              <router-link 
                to="/goals" 
                class="nav-item"
                :class="{ 'active': currentRoute === '/goals' }"
                @click="closeSidebar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Goals & Progress</span>
                <div v-if="currentRoute === '/goals'" class="active-indicator"></div>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <h4 class="nav-section-title">Account</h4>
          <ul class="nav-list">
            <li>
              <router-link 
                to="/orders" 
                class="nav-item"
                :class="{ 'active': currentRoute === '/orders' }"
                @click="closeSidebar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Orders</span>
                <div v-if="currentRoute === '/orders'" class="active-indicator"></div>
              </router-link>
            </li>
            
            <li>
              <router-link 
                to="/profile" 
                class="nav-item"
                :class="{ 'active': currentRoute === '/profile' }"
                @click="closeSidebar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
                <div v-if="currentRoute === '/profile'" class="active-indicator"></div>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <h4 class="nav-section-title">Support</h4>
          <ul class="nav-list">
            <li>
              <router-link 
                to="/support" 
                class="nav-item"
                :class="{ 'active': currentRoute === '/support' }"
                @click="closeSidebar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Support</span>
                <div v-if="currentRoute === '/support'" class="active-indicator"></div>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <button @click="logout" class="logout-button">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Sidebar state
const isOpen = ref(false);

// User data
const userData = ref({
  name: 'John Doe',
  email: 'john@example.com'
});

// Computed properties
const currentRoute = computed(() => route.path);
const userName = computed(() => userData.value.name);
const userEmail = computed(() => userData.value.email);
const userInitials = computed(() => {
  return userData.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
});

// Methods
const openSidebar = () => {
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeSidebar = () => {
  isOpen.value = false;
  document.body.style.overflow = 'auto';
};

const logout = () => {
  // Clear user data
  localStorage.removeItem('userData');
  localStorage.removeItem('authToken');
  
  // Redirect to login
  router.push('/login');
};

// Expose methods for parent components
defineExpose({
  openSidebar,
  closeSidebar
});

onMounted(() => {
  // Load user data from localStorage
  const savedUserData = localStorage.getItem('userData');
  if (savedUserData) {
    userData.value = JSON.parse(savedUserData);
  }
});
</script>

<style scoped>
.sidebar {
  @apply fixed top-0 left-0 h-full z-50;
}

.sidebar-overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm z-40;
}

.sidebar-content {
  @apply relative w-80 h-full bg-black/90 backdrop-blur-md border-r border-white/10 flex flex-col z-50 transform transition-transform duration-300 ease-in-out;
  transform: translateX(-100%);
}

.sidebar-open .sidebar-content {
  transform: translateX(0);
}

/* Sidebar Header */
.sidebar-header {
  @apply flex items-center justify-between p-6 border-b border-white/10;
}

.logo-section {
  @apply flex items-center gap-3;
}

.logo-icon {
  @apply text-2xl;
}

.logo-text {
  @apply text-xl font-bold text-white;
}

.close-button {
  @apply w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors;
}

/* User Profile */
.user-profile {
  @apply flex items-center gap-4 p-6 border-b border-white/10;
}

.user-avatar {
  @apply flex-shrink-0;
}

.avatar-circle {
  @apply w-12 h-12 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold;
}

.user-info {
  @apply flex-1 min-w-0;
}

.user-name {
  @apply text-white font-semibold mb-1;
}

.user-email {
  @apply text-gray-400 text-sm;
}

/* Navigation */
.sidebar-nav {
  @apply flex-1 overflow-y-auto p-6 space-y-8;
}

.nav-section {
  @apply space-y-2;
}

.nav-section-title {
  @apply text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3;
}

.nav-list {
  @apply space-y-1;
}

.nav-item {
  @apply flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 relative;
}

.nav-item.active {
  @apply text-white bg-[#4ADE80]/20 border border-[#4ADE80]/30;
}

.active-indicator {
  @apply absolute right-3 w-2 h-2 bg-[#4ADE80] rounded-full;
}

.nav-item:hover {
  @apply transform translate-x-1;
}

/* Sidebar Footer */
.sidebar-footer {
  @apply p-6 border-t border-white/10;
}

.logout-button {
  @apply flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-red-500/20 transition-all duration-300;
}

.logout-button:hover {
  @apply transform translate-x-1;
}

/* Scrollbar styling */
.sidebar-nav::-webkit-scrollbar {
  @apply w-2;
}

.sidebar-nav::-webkit-scrollbar-track {
  @apply bg-white/5 rounded;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  @apply bg-white/20 rounded;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  @apply bg-white/30;
}

/* Responsive design */
@media (max-width: 768px) {
  .sidebar-content {
    @apply w-full;
  }
}

/* Animation for nav items */
.nav-item {
  animation: slideInNav 0.3s ease-out;
}

@keyframes slideInNav {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
