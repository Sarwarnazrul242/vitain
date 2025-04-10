<template>
    <div class="bg-[#ffffff] min-h-screen">
        <NavBar />
        <router-view></router-view>
    </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const NavBar = defineAsyncComponent(() => import('@/components/common/NavBar.vue'));
</script> 