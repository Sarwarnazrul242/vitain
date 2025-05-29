import { createRouter, createWebHistory } from "vue-router";
import PinAuth from "@/components/PinAuth.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/pin-auth",
      name: "PinAuth",
      component: PinAuth,
    },
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/take-quiz",
      name: "TakeQuiz",
      component: () => import("@/views/Quiz.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/quiz-results",
      name: "results",
      component: () => import("@/components/quizpage/Results.vue"),
      props: route => ({
        results: route.query.results,
        userInfo: route.query.userInfo
      }),
      meta: { requiresAuth: true }
    },
    {
      path: '/supplements',
      name: 'Supplements',
      component: () => import("@/views/Supplements.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: '/business',
      name: 'Business',
      component: () => import("@/views/Business.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: '/how-it-works',
      name: 'HowItWorks',
      component: () => import("@/views/HowItWorks.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
});

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const expiryTime = localStorage.getItem('pinAuthExpiry')
    const currentTime = new Date().getTime()
    
    if (!expiryTime || currentTime > parseInt(expiryTime)) {
      // PIN not entered or session expired
      next('/pin-auth')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
