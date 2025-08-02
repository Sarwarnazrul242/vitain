<template>
  <div class="recent-activity">
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-icon">📋</span>
        Recent Activity
      </h2>
      <router-link to="/activity" class="view-all-link">
        View All Activity
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>

    <div class="activity-list">
      <div 
        v-for="activity in recentActivities" 
        :key="activity.id"
        class="activity-item"
      >
        <div class="activity-icon" :class="activity.type">
          <svg v-if="activity.type === 'order'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <svg v-else-if="activity.type === 'sleep'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else-if="activity.type === 'weight'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <svg v-else-if="activity.type === 'checkin'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else-if="activity.type === 'supplement'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <svg v-else-if="activity.type === 'workout'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <svg v-else-if="activity.type === 'water'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        
        <div class="activity-content">
          <div class="activity-description">
            {{ activity.description }}
          </div>
          <div class="activity-time">
            {{ formatTime(activity.timestamp) }}
          </div>
        </div>
        
        <div class="activity-status" v-if="activity.status">
          <span class="status-badge" :class="activity.status">
            {{ activity.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- Activity Summary -->
    <div class="activity-summary">
      <div class="summary-stats">
        <div class="stat-item">
          <span class="stat-number">{{ todayActivities }}</span>
          <span class="stat-label">Today</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ thisWeekActivities }}</span>
          <span class="stat-label">This Week</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ streakDays }}</span>
          <span class="stat-label">Day Streak</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { todayData, getMoodEmoji, getMoodLabel, loadRealData, summaryView,
  recentActivities, todayActivities, thisWeekActivities, streakDays, addActivity, loadActivity
} from '../../services/dailyHealth';


// Format timestamp
const formatTime = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else {
    return timestamp.toLocaleDateString();
  }
};


// Expose addActivity method for other components
defineExpose({
  addActivity
});

onMounted(() => {
  loadActivity();
  // Load saved activities from localStorage
  // const savedActivities = localStorage.getItem('recentActivities');
  // const savedStats = localStorage.getItem('activityStats');
  
  // if (savedActivities) {
  //   const activities = JSON.parse(savedActivities);
  //   // Convert timestamp strings back to Date objects
  //   activities.forEach((activity: any) => {
  //     activity.timestamp = new Date(activity.timestamp);
  //   });
  //   recentActivities.value = activities;
  // }
  
  // if (savedStats) {
  //   const stats = JSON.parse(savedStats);
  //   todayActivities.value = stats.today;
  //   thisWeekActivities.value = stats.week;
  //   streakDays.value = stats.streak;
  // }
});
</script>

<style scoped>
.recent-activity {
  @apply mb-8;
}

.section-header {
  @apply flex items-center justify-between mb-6;
}

.section-title {
  @apply text-2xl font-bold text-white flex items-center gap-2;
}

.title-icon {
  @apply text-2xl;
}

.view-all-link {
  @apply text-[#4ADE80] hover:text-[#3B82F6] transition-colors duration-300 font-medium flex items-center;
}

.activity-list {
  @apply space-y-3 mb-6;
}

.activity-item {
  @apply flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300;
}

.activity-item:hover {
  @apply transform -translate-y-1;
}

.activity-icon {
  @apply w-10 h-10 rounded-full flex items-center justify-center text-white;
}

.activity-icon.order {
  @apply bg-blue-500;
}

.activity-icon.sleep {
  @apply bg-purple-500;
}

.activity-icon.weight {
  @apply bg-green-500;
}

.activity-icon.checkin {
  @apply bg-[#4ADE80];
}

.activity-icon.supplement {
  @apply bg-orange-500;
}

.activity-icon.workout {
  @apply bg-red-500;
}

.activity-icon.water {
  @apply bg-cyan-500;
}

.activity-content {
  @apply flex-1;
}

.activity-description {
  @apply text-white font-medium mb-1;
}

.activity-time {
  @apply text-gray-400 text-sm;
}

.activity-status {
  @apply flex-shrink-0;
}

.status-badge {
  @apply px-2 py-1 rounded-full text-xs font-medium text-white;
}

.status-badge.completed {
  @apply bg-green-500;
}

.status-badge.pending {
  @apply bg-yellow-500;
}

.status-badge.failed {
  @apply bg-red-500;
}

/* Activity Summary */
.activity-summary {
  @apply bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10;
}

.summary-stats {
  @apply grid grid-cols-3 gap-4;
}

.stat-item {
  @apply text-center;
}

.stat-number {
  @apply block text-2xl font-bold text-[#4ADE80] mb-1;
}

.stat-label {
  @apply text-gray-400 text-sm;
}

/* Responsive design */
@media (max-width: 768px) {
  .activity-item {
    @apply p-3 gap-3;
  }
  
  .activity-icon {
    @apply w-8 h-8;
  }
  
  .activity-description {
    @apply text-sm;
  }
  
  .summary-stats {
    @apply grid-cols-3 gap-2;
  }
  
  .stat-number {
    @apply text-xl;
  }
  
  .stat-label {
    @apply text-xs;
  }
}

/* Animation for new activities */
.activity-item {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects */
.activity-item:hover .activity-icon {
  @apply scale-110;
  transition: transform 0.2s ease;
}

.activity-item:hover .activity-description {
  @apply text-[#4ADE80];
  transition: color 0.2s ease;
}
</style>