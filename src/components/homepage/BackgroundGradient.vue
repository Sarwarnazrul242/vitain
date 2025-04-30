<template>
    <div class="fixed inset-0 z-0 bg-[#0A0A0A] overflow-hidden">
        <div class="absolute inset-0">
            <div class="absolute top-0 right-0 w-[1200px] h-[1200px] bg-gradient-to-b from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-full blur-[160px] animate-pulse-slow"></div>
            <div class="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-gradient-to-t from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-full blur-[160px] animate-pulse-slower"></div>
        </div>
    </div>
</template>

<style scoped>
@keyframes pulse-slow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.7; }
}

.animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-slower {
    animation: pulse-slow 6s ease-in-out infinite;
}
</style> 