<template>
       <div class="bg-[#ffffff] min-h-screen">
        <NavBar v-if="!isDashboardRoute" />
        <!-- Force re-mount on route change -->
        <router-view></router-view>
    </div>
    <!-- Global Loading Overlay -->
    <div
      v-if="loading === 'true'"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div class="text-center max-w-md mx-auto px-6">
        <!-- Loading Animation -->
        <div class="mb-8 flex justify-center items-center">
          <div class="relative flex items-center justify-center w-24 h-24">
            <!-- Outer ring -->
            <div class="absolute inset-0 border-4 border-white/20 rounded-full animate-pulse"></div>
            <!-- Inner ring -->
            <div class="absolute inset-2 border-4 border-[#4ADE80] rounded-full animate-spin"></div>
            <!-- Center dot -->
            <div class="absolute inset-1/2 w-3 h-3 bg-[#3B82F6] rounded-full animate-pulse transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        <!-- Loading Messages -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
            AI is Working Magic! ✨
          </h2>
          
          <div class="space-y-2">
            <p class="text-white text-lg font-medium">
              Analyzing your health profile and creating personalized recommendations...
            </p>
            <p class="text-gray-300 text-sm">
              This may take a few moments while our AI processes your unique needs
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loading, updateLoading } from "./composables/featureCtrl";
import { errors, ErrorType, AppError, isAppError, pastError, detectLoginState } from "./services/auth";

const NavBar = defineAsyncComponent(() => import('./components/common/NavBar.vue'));

const route = useRoute();
const router = useRouter();

// Check if current route is dashboard
const isDashboardRoute = computed(() => {
  return route.name === 'Dashboard' || route.path === '/dashboard' || route.path === '/profile';
});

const isDashboardRouted = ()=>
{
  return route.name === 'Dashboard' || route.path === '/dashboard' || route.path === '/profile';
}
const handleLoginState = async () => {
  try{

   await detectLoginState();
   sessionStorage.setItem("userState","Signed In"); //So that user specific NavBar pops up
  }
   catch(err)
  {

  if (err.type =="login")
  {  
    sessionStorage.setItem("userState","Signed Out"); //So that user specific NavBar pops up
    
    //Ensures user must log in to access dashboard
    if (isDashboardRouted()) 
      {
         router.push("/log-in")
      }
    
  }

  else
  {
    throw err
  }

  }

}

onMounted(async() => {
  await handleLoginState();
  window.addEventListener("loading-change", updateLoading);

});

onBeforeUnmount(() => {
  sessionStorage.removeItem("loading")
  window.removeEventListener("loading-change", updateLoading);

});
</script> 


