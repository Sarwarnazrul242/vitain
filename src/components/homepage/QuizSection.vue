<template>
    <section ref="sectionRef" class="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center py-12 md:py-20 overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto gap-8 md:gap-16">
            <!-- Text Content -->
            <div class="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left">
                <h2 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                    <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                        Unlock Your Personalized Wellness Plan
                    </span>
                </h2>
                <p class="text-gray-300 text-lg md:text-xl mb-8 max-w-xl animate-fade-in-up">
                    Discover which supplements are right for you. Take our quick, science-backed quiz and get instant, tailored recommendations—powered by AI.
                </p>
                <button 
                    @click="navigateToQuiz"
                    class="relative group px-8 md:px-12 py-4 md:py-5 rounded-xl text-lg md:text-xl font-medium overflow-hidden animate-fade-in-up shadow-lg"
                >
                    <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform duration-300 group-hover:scale-105"></span>
                    <span class="relative text-white flex items-center justify-center gap-2">
                        Get My Recommendations
                        <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </button>
            </div>
            <!-- Phone Image with 3D effect -->
            <div class="flex-1 flex items-center justify-center">
                <img 
                    :src="phoneImg" 
                    alt="Phone preview vitain.ai" 
                    class="w-64 md:w-96 max-w-full phone-3d"
                    :class="[phoneInView ? 'slide-in-right' : 'phone-offscreen', phoneFloating ? 'animate-float-3d' : '']"
                    @transitionend="onPhoneTransitionEnd"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import phoneImg from '@/assets/phone.png';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import { useRouter } from "vue-router";
const router = useRouter();

const sectionRef = ref(null);
const phoneInView = ref(false);
const phoneFloating = ref(false);

const navigateToQuiz = () => {
  router.push("/take-quiz");
};

let observer;
onMounted(() => {
  observer = new window.IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        phoneInView.value = true;
      }
    },
    { threshold: 0.3 }
  );
  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});
onBeforeUnmount(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value);
  }
});

function onPhoneTransitionEnd(e) {
  // Only trigger on transform transition
  if (e.propertyName === 'transform' && phoneInView.value) {
    phoneFloating.value = true;
  }
}

// onMounted(() => {
//     AOS.init({
//         duration: 1000,
//         once: true,
//         offset: 100
//     });
// });
</script>

<style scoped>
.phone-3d {
  filter: drop-shadow(0 8px 32px rgba(59,130,246,0.25)) drop-shadow(0 2px 8px rgba(74,222,128,0.15));
  transition: transform 0.9s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.9s;
}
.phone-3d:hover {
  transform: perspective(800px) rotateY(-6deg) rotateX(2deg) scale(1.07);
  filter: drop-shadow(0 16px 48px rgba(59,130,246,0.35)) drop-shadow(0 4px 16px rgba(74,222,128,0.25));
}

.phone-offscreen {
  opacity: 0;
  transform: translateX(100vw) perspective(800px) rotateY(-12deg) rotateX(6deg) scale(1.04);
}
.slide-in-right {
  opacity: 1;
  transform: translateX(0) perspective(800px) rotateY(-12deg) rotateX(6deg) scale(1.04);
}

@keyframes float-3d {
  0%, 100% {
    transform: perspective(800px) rotateY(-12deg) rotateX(6deg) translateY(0) scale(1.04);
  }
  50% {
    transform: perspective(800px) rotateY(-10deg) rotateX(8deg) translateY(-16px) scale(1.07);
  }
}
.animate-float-3d {
  animation: float-3d 4s ease-in-out infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
