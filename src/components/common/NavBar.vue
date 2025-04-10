<template>
    <nav 
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        :class="{'bg-[#0A0A0A]/90 backdrop-blur-lg shadow-lg': isScrolled || isMobileMenuOpen, 'bg-transparent': !isScrolled && !isMobileMenuOpen}"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 md:h-20">
                <!-- Logo and Brand -->
                <a href="/" class="flex-shrink-0 flex items-center">
                    <img 
                        src="@/assets/logo.png" 
                        alt="Vitain Logo" 
                        class="h-8 w-8 md:h-10 md:w-10"
                    />
                    <span class="ml-2 text-xl md:text-2xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                        Vitain
                    </span>
                </a>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="nav-link" @click="closeMobileMenu">Home</a>
                    <a href="#features" class="nav-link" @click="closeMobileMenu">Features</a>
                    <a href="#about" class="nav-link" @click="closeMobileMenu">About</a>
                    <a href="#contact" class="nav-link" @click="closeMobileMenu">Contact</a>
                    <a href="/take-quiz" class="primary-button">
                        <span>Take Quiz</span>
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <div class="flex md:hidden">
                    <button 
                        @click="toggleMobileMenu"
                        class="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] rounded-lg p-1"
                        aria-label="Toggle menu"
                    >
                        <svg 
                            class="h-6 w-6 transition-transform duration-200" 
                            :class="{'rotate-180': isMobileMenuOpen}" 
                            stroke="currentColor" 
                            fill="none" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                v-if="!isMobileMenuOpen"
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2" 
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path 
                                v-else
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2" 
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div 
            v-show="isMobileMenuOpen"
            class="md:hidden fixed inset-0 top-16 bg-black transition-all duration-300 ease-in-out"
            @click.self="closeMobileMenu"
        >
            <div class="px-4 py-6 space-y-4">
                <a href="/" class="mobile-nav-link" @click="closeMobileMenu">Home</a>
                <a href="#features" class="mobile-nav-link" @click="closeMobileMenu">Features</a>
                <a href="#about" class="mobile-nav-link" @click="closeMobileMenu">About</a>
                <a href="#contact" class="mobile-nav-link" @click="closeMobileMenu">Contact</a>
                <a href="/take-quiz" class="mobile-primary-button" @click="closeMobileMenu">
                    Take Quiz
                </a>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
};

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    if (isMobileMenuOpen.value) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
};

// Close mobile menu on escape key
const handleEscKey = (event) => {
    if (event.key === 'Escape') {
        closeMobileMenu();
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleEscKey);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('keydown', handleEscKey);
    document.body.style.overflow = '';
});
</script>

<style scoped>
.nav-link {
    @apply text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium relative;
}

.nav-link::after {
    content: '';
    @apply absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-all duration-300;
}

.nav-link:hover::after {
    @apply w-full;
}

.mobile-nav-link {
    @apply block px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 text-center;
}

.primary-button {
    @apply relative px-6 py-2 text-sm font-medium text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105;
}

.primary-button::before {
    content: '';
    @apply absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform duration-300;
}

.primary-button:hover::before {
    @apply scale-105;
}

.primary-button span {
    @apply relative z-10;
}

.mobile-primary-button {
    @apply block w-full px-6 py-4 text-lg font-medium text-white rounded-xl bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] hover:opacity-90 transition-opacity duration-200 text-center mt-8;
}
</style>