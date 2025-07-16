<template>
  <nav :class="['navbar', { scrolled: isScrolled }]">
    <div class="nav-content">
      <router-link to="/">
        <div class="nav-logo">
          <img src="@/assets/logo.png" alt="Vitain Logo" class="h-12 w-12" />
          <span
            class="ml-2 text-xl md:text-2xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text"
          >
            Vitain
          </span>
        </div>
      </router-link>

      <div class="nav-links-container">
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/supplements" class="nav-link">Supplements</router-link>
          <router-link to="/business" class="nav-link">Business</router-link>
          <router-link to="/contact" class="nav-link">Contact Us</router-link>
          <router-link to="/api" class="nav-link">API</router-link>
          <router-link to="/pricing" class="nav-link">Pricing</router-link>
          <router-link to="/log-in" class="nav-link" v-if="userState === 'Signed Out'" >Log In</router-link>
        </div>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        class="mobile-menu-toggle"
        @click="toggleMobileMenu"
        :class="{ active: isMobileMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Mobile Menu -->
      <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
        <div class="mobile-menu-links">
          <router-link to="/" class="mobile-nav-link" @click="toggleMobileMenu"
            >Home</router-link
          >
          <router-link
            to="/supplements"
            class="mobile-nav-link"
            @click="toggleMobileMenu"
            >Supplements</router-link
          >
           <router-link
            to="/business"
            class="mobile-nav-link"
            @click="toggleMobileMenu"
            >Business</router-link
          >
          <router-link
            to="/contact"
            class="mobile-nav-link"
            @click="toggleMobileMenu"
            >Contact Us</router-link
          >
          <router-link
            to="/pricing"
            class="mobile-nav-link"
            @click="toggleMobileMenu"
            >Pricing
          </router-link>
          <router-link
            to="/api"
            class="mobile-nav-link"
            @click="toggleMobileMenu"
          >API</router-link>
          <router-link
            to="/log-in"
            class="mobile-nav-link"
            @click="toggleMobileMenu"
            v-if="userState === 'Signed Out'" 
            >Log In</router-link>
        </div>
      </div>

      <router-link to="/take-quiz" class="get-started-btn"
        v-if="userState === 'Signed Out'" >Get Started <span class="arrow">→</span></router-link
      >

      <router-link to="/dashboard" class="get-started-btn"
        v-if="userState === 'Signed In'" >Dashboard <span class="arrow">→</span></router-link
      >
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {userState, updateUserState} from "../../composables/featureCtrl";

const router = useRouter();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "";
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

import { watchEffect } from 'vue';

watchEffect(() => {
    updateUserState();
});

onMounted(() => {
  window.addEventListener("userState-change", updateUserState);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-logo img {
  height: 48px;
  width: 48px;
}

.logo-text {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, #4ade80, #3b82f6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: opacity 0.3s ease;
}

.logo-sup {
  font-size: 1.25rem;
  color: #736ced;
  font-weight: 700;
}

@media (prefers-color-scheme: dark) {
  .logo-text {
    color: white;
  }
}

.nav-links-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-links {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 0.5rem;
  backdrop-filter: blur(10px);
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.nav-link:hover {
  opacity: 1;
}

.get-started-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  font-weight: 600;
  font-size: 0.95rem;
  color: white;
  border: none;
  background: linear-gradient(90deg, #4ade80, #3b82f6);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.get-started-btn .arrow {
  font-size: 1.1em;
}

.get-started-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 24px;
  position: relative;
  z-index: 1001;
  margin-left: auto;
}

.mobile-menu-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: white;
  position: absolute;
  transition: all 0.3s ease;
}

.mobile-menu-toggle span:first-child {
  top: 0;
}

.mobile-menu-toggle span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.mobile-menu-toggle span:last-child {
  bottom: 0;
}

.mobile-menu-toggle.active span:first-child {
  transform: rotate(45deg);
  top: 11px;
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:last-child {
  transform: rotate(-45deg);
  bottom: 11px;
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-menu.active {
  opacity: 1;
  visibility: visible;
}

.mobile-menu-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
  padding: 2rem;
}

.mobile-nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover {
  opacity: 1;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .nav-links-container {
    display: none;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .mobile-menu {
    display: block;
  }

  .nav-content {
    justify-content: space-between;
  }

  .get-started-btn {
    display: none;
  }
}
</style>
