<template>
    <div class="relative min-h-screen bg-gradient-to-b from-[#0e0e10] to-[#1c1c1e] overflow-hidden">
    <BackgroundGradient />

    <div class="px-6 py-12 pt-32 max-w-7xl mx-auto min-h-screen relative z-10 text-white">
      <h1 class="text-4xl md:text-6xl font-bold mb-10 text-center">
        <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
        Subscription & API Pricing
        </span>
      </h1>

      <!-- Tab Bar -->
      <div class="w-full mb-10">
        <div class="relative right-0 max-w-2xl mx-auto w-full">
          <ul
            ref="tabList"
            class="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100 dark:bg-gray-800 overflow-hidden"
            role="tablist"
          >
            <span
              v-if="tabRects.length"
              :style="highlightStyle"
              class="absolute top-0 h-full rounded-md bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-all duration-300 ease-in-out z-10"
            ></span>

            <li
              v-for="(tab, index) in tabs"
              :key="tab"
              class="z-20 text-center relative w-1/2"
              :ref="el => setTabRef(el, index)"
            >
              <button
                @click="setTab(tab, index)"
                :class="[
                  'relative z-20 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer',
                  currentTab === tab
                    ? 'text-white font-semibold'
                    : 'text-slate-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                ]"
                role="tab"
                :aria-selected="currentTab === tab"
              >
                {{ tab }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tab Content -->
      <transition name="fade-slide" mode="out-in">
        <component :is="currentComponent" />
      </transition>
    </div>
    <Footer />
    <ChatButton />
  </div>
</template>

<script setup>
import BackgroundGradient from '@/components/homepage/BackgroundGradient.vue'
import ChatButton from '@/components/common/ChatButton.vue'
import Footer from '@/components/common/Footer.vue'
import ApiPricing from '@/components/pricing/apiPricing.vue'
import VitainPricing from '@/components/pricing/vitainPricing.vue'

import { ref, computed, onMounted, nextTick } from 'vue'

const tabs = ['API Pricing', 'Subscription Pricing']
const currentTab = ref('API Pricing')
const tabRefs = ref([])
const tabList = ref(null)
const tabRects = ref([])

const setTab = (tab, index) => {
  currentTab.value = tab
  updateRects()
}

const setTabRef = (el, index) => {
  if (el) tabRefs.value[index] = el
}

const activeTabIndex = computed(() =>
  tabs.findIndex(t => t === currentTab.value)
)

const highlightStyle = computed(() => {
  if (!tabRects.value.length) return {}
  const { left, width } = tabRects.value[activeTabIndex.value] || {}
  return {
    left: `${left}px`,
    width: `${width}px`
  }
})

const updateRects = async () => {
  await nextTick()
  tabRects.value = tabRefs.value.map(el => {
    const rect = el?.getBoundingClientRect()
    const parentRect = tabList.value?.getBoundingClientRect()
    return {
      left: rect.left - parentRect.left,
      width: rect.width
    }
  })
}

const currentComponent = computed(() => {
  return currentTab.value === 'API Pricing' ? ApiPricing : VitainPricing
})

onMounted(() => {
  updateRects()
})
</script>

<style scoped>
</style>