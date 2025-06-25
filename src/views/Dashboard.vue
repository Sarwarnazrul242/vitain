<template>
  <div class="relative min-h-screen bg-[#0A0A0A]">
    <BackgroundGradient />
    <div class="relative">
      <NavBar />
      <Sidebar ref="sidebarRef" />
      <!-- Dashboard Content -->
      <section class="relative pt-32 pb-20 md:py-32">
        <div class="max-w-7xl mx-auto px-4 relative z-10">
          <div class="dashboard">
            <WelcomeSection @open-sidebar="openSidebar" />
            <SupplementRecommendation />
            <HealthGoalsProgress />
            <DailyHealthCheckin />
            <RecentActivity />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BackgroundGradient from '@/components/homepage/BackgroundGradient.vue';
import NavBar from '@/components/common/NavBar.vue';
import WelcomeSection from '@/components/dashboard/WelcomeSection.vue';
import SupplementRecommendation from '@/components/dashboard/SupplimentRecommendation.vue';
import HealthGoalsProgress from '@/components/dashboard/Healthgoals.vue';
import DailyHealthCheckin from '@/components/dashboard/DailyHealth.vue';
import RecentActivity from '@/components/dashboard/RecentActivity.vue';
import Sidebar from '@/components/dashboard/Sidebar.vue';

// Sidebar reference
const sidebarRef = ref();

// Methods
const openSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.openSidebar();
  }
};
</script>

<style scoped>
.dashboard {
  @apply space-y-8;
}

/* Ensure consistent styling with other pages */
.dashboard > * {
  @apply backdrop-blur-sm;
}
</style>
