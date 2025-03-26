<template>
    <router-link 
        to="/chat"
        class="fixed bottom-8 right-8 z-50 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-3"
    >
        <span class="hidden md:block">Chat with AI Assistant</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
    </router-link>
</template>

<style scoped>
.bg-primary {
    background-color: #FF6B35;
}

.bg-primary-dark:hover {
    background-color: #E85A24;
}
</style> 