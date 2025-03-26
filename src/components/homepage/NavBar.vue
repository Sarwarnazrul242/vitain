<template>
    <header class="absolute w-full flex items-center p-6 z-20">
        <!-- Mobile Toggle Button (moved to right) -->
        <div class="md:hidden z-30 absolute right-6">
            <button type="button" class="block focus:outline-none" @click="isMenuOpen = !isMenuOpen">
                <span v-if="isMenuOpen" class="text-5xl">
                    <img src="https://img.icons8.com/ios-filled/100/ffffff/delete-sign.png" alt="close" width="50"
                        height="50">
                </span>
                <span v-else class="text-5xl">
                    <img src="https://img.icons8.com/ios-filled/100/ffffff/menu--v6.png" alt="menu" width="50"
                        height="50">
                </span>
            </button>
        </div>

        <!-- Logo (Centered) -->
        <div class="text-white text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">
            <a href="/">
                <img src="@/assets/logo.png" alt="Logo" class="w-20 h-20" />
            </a>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex w-full justify-center gap-96">
            <router-link to="/supplements" class="text-white text-lg hover:text-primary">Supplements</router-link>
            <router-link to="/how-it-works" class="text-white text-lg hover:text-primary">How It Works</router-link>
        </nav>

        <!-- Mobile Menu -->
        <nav :class="[
            'fixed inset-0 z-20 flex flex-col items-center justify-center md:hidden transition-all duration-300',
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        ]">
            <!-- Background with blur -->
            <div class="absolute inset-0 z-0">
                <img 
                    src="@/assets/wood.png" 
                    alt="Wood Background" 
                    class="w-full h-full object-cover brightness-75"
                />
                <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black backdrop-blur-xl"></div>
            </div>

            <!-- Menu Content -->
            <ul class="relative z-10 flex flex-col items-center space-y-8">
                <li v-for="item in Menu" :key="item.name">
                    <router-link 
                        :to="item.href" 
                        class="block text-white transition-all duration-200 hover:text-primary text-2xl md:text-3xl"
                        @click="isMenuOpen = false"
                    >
                        {{ item.name }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue';

const Menu = ref([
    { name: 'Supplements', href: '/supplements' },
    { name: 'How It Works', href: '/how-it-works' },
]);

const isMenuOpen = ref(false);

const scrollToSection = (href) => {
    isMenuOpen.value = false;
    const section = document.querySelector(href);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
</script>