<template>
  <nav class="dashboard-navbar">
    <div class="navbar-container">
      <!-- Left Section - Logo -->
       <router-link to="/">
      <div class="navbar-left">
        <div class="logo-section">
          <img src="@/assets/logo.png" alt="Vitain Logo" class="h-12 w-12" />
          <span class="logo-text">
            Vitain
          </span>
        </div>
      </div>
      </router-link>



      <div class="navbar-right">
        <!-- Notifications -->
        <!-- <button class="nav-button notification-btn" @click="toggleNotifications">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
        </button> -->

        <!-- User Menu -->
        <div class="user-menu-container">
          <button @click="toggleUserMenu" class="user-menu-toggle">
            <div class="user-avatar">
              <div class="avatar-circle">
                {{ userInitials }}
              </div>
            </div>
            <span class="user-name">{{ userName }}</span>
            <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- User Dropdown Menu -->
          <div v-if="isUserMenuOpen" class="user-dropdown">
            <div class="dropdown-header">
              <div class="user-info">
                <h4 class="user-full-name">{{ userName }}</h4>
                <p class="user-email">{{ userEmail }}</p>
              </div>
            </div>
            
            <div class="dropdown-menu">
              <router-link to="/dashboard" class="dropdown-item" @click="closeUserMenu">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Dashboard</span>
              </router-link>
              
              <router-link to="/profile" class="dropdown-item" @click="closeUserMenu">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </router-link>
              
              <router-link to="/settings" class="dropdown-item" @click="closeUserMenu">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </router-link>
              
              <router-link to="/orders" class="dropdown-item" @click="closeUserMenu">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Orders</span>
              </router-link>
              
              <router-link to="/contact" class="dropdown-item" @click="closeUserMenu">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Support</span>
              </router-link>
              
              <div class="dropdown-divider"></div>
              
              <button @click="handleLogout" class="dropdown-item logout-item">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { retrieveUserInfo, logout, retrieveQuestionnaireData } from "../../services/auth";

const router = useRouter();

// Reactive data
const isUserMenuOpen = ref(false);
// const notificationCount = ref(3);

// User data
const userData = ref({
  name: '',
  email: ''
});

const state = ref<"Signed In" | "Signed Out">("Signed Out");
// Computed properties
const userName = ref<ComputedRef <string>>();
const userEmail = ref<ComputedRef <string>>();
const userInitials = ref<ComputedRef <string>>(); 

// Methods
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const closeUserMenu = () => {
  isUserMenuOpen.value = false;
};

const toggleNotifications = () => {
  // Handle notifications toggle
  console.log('Toggle notifications');
};


const handleLogout = async () => {

  try{
      await logout();
      sessionStorage.setItem("userState","Signed Out");
      router.push("/log-in");
  } catch(err)
  {
     console.log(err)
  }

}

// Close user menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.user-menu-container')) {
    closeUserMenu();
  }
};

const getUserInfo = async ()=> {

  try{
     const info = await retrieveUserInfo();

     if (info)
     {
      userData.value = info;
      userName.value = computed(() => userData.value.name);
      userEmail.value = computed(() => userData.value.email);
      userInitials.value = computed(() => {
  return userData.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
});

     }


  } catch (err)
  {
  if (err.type == "login")
      { 
        //Routes user to log in page before they can access dashboard
        router.push("/log-in");
      }

      else{
        console.log(err)
      }
    
  }

}

const submitForm = async () => {
  try {
  const requestBody = await retrieveQuestionnaireData();
  console.log("Sending request with body:", requestBody);

    // First API call to get supplement recommendations
    const response = await fetch("https://vitain-ai.onrender.com/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
  } catch(err)
  {
    throw(err)
  }
}

onMounted(async () => {
  // Load user data from database
  await getUserInfo();
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside); //What does this do?
  
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  
});
</script>

<style scoped>
.dashboard-navbar {
  @apply fixed top-0 left-0 right-0 z-40 bg-transparent backdrop-blur-md border-b border-white/10;
}

.navbar-container {
  @apply flex items-center justify-between px-28 py-4;
}

/* Left Section */
.navbar-left {
  @apply flex items-center;
}

.logo-section {
  @apply flex items-center gap-2;
}

.logo-text {
  @apply ml-2 text-xl md:text-2xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text;
}



/* Right Section */
.navbar-right {
  @apply flex items-center gap-3;
}

.nav-button {
  @apply relative w-10 h-10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors;
}

.notification-badge {
  @apply absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold;
}

/* User Menu */
.user-menu-container {
  @apply relative;
}

.user-menu-toggle {
  @apply flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors;
}

.user-avatar {
  @apply flex-shrink-0;
}

.avatar-circle {
  @apply w-8 h-8 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold text-sm;
}

.user-name {
  @apply text-white font-medium hidden md:block;
}

.dropdown-icon {
  @apply w-4 h-4 text-gray-400 transition-transform;
}

.user-menu-toggle:hover .dropdown-icon {
  @apply text-white;
}

/* User Dropdown */
.user-dropdown {
  @apply absolute top-full right-0 mt-2 w-64 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl z-50;
}

.dropdown-header {
  @apply p-4 border-b border-white/10;
}

.user-full-name {
  @apply text-white font-semibold;
}

.user-email {
  @apply text-gray-400 text-sm;
}

.dropdown-menu {
  @apply py-2;
}

.dropdown-item {
  @apply flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors;
}

.dropdown-item:hover {
  @apply transform translate-x-1;
}

.dropdown-divider {
  @apply my-2 border-t border-white/10;
}

.logout-item {
  @apply text-red-400 hover:text-red-300 hover:bg-red-500/20;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-container {
    @apply px-4;
  }
  
  .user-name {
    @apply hidden;
  }
  
  .user-dropdown {
    @apply w-56;
  }
}

/* Animation */
.user-dropdown {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 