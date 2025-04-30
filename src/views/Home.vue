<template>
    <div class="relative">
        <BackgroundGradient />
        <div class="relative">
            <NavBar />
            <HeroSection />
            <FeatureSection />
            <OverviewSection />
            <QuizSection />
            <ChatButton />
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/common/NavBar.vue'
import HeroSection from '@/components/homepage/HeroSection.vue'
import FeatureSection from '@/components/homepage/FeatureSection.vue'
import OverviewSection from '@/components/homepage/OverviewSection.vue'
import QuizSection from '@/components/homepage/QuizSection.vue'
import ChatButton from '@/components/common/ChatButton.vue'
import BackgroundGradient from '@/components/homepage/BackgroundGradient.vue'
</script>
