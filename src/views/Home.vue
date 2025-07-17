<template>
    <div class="relative">
        <BackgroundGradient />
        <div class="relative">
            <NavBar />
            <HeroSection />
            <FeatureSection />
            <HowItWorks />
            <QuizSection />
            <FAQ />
            <Footer />
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
import HowItWorks from '@/components/homepage/HowItWorks.vue'
import FAQ from '@/components/homepage/FAQ.vue'
import ChatButton from '@/components/common/ChatButton.vue'
import BackgroundGradient from '@/components/homepage/BackgroundGradient.vue'
import Footer from '@/components/common/Footer.vue'
</script>
