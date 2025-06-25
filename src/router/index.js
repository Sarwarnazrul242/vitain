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
      meta: { requiresAuth: true },
    },
    {
      path: "/take-quiz",
      name: "TakeQuiz",
      component: () => import("@/views/Quiz.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/quiz-results",
      name: "results",
      component: () => import("@/components/quizpage/Results.vue"),
      props: (route) => ({
        results: route.query.results,
        userInfo: route.query.userInfo,
      }),
      meta: { requiresAuth: true },
    },
    {
      path: "/supplements",
      name: "Supplements",
      component: () => import("@/views/Supplements.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/log-in",
      name: "Login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/verify",
      name: "Verify",
      component: () => import("@/components/account/Verify.vue"),
    },
    {
      path: "/questionnaire",
      name: "Questionnaire",
      component: () => import("@/components/account/Question.vue"),
    },
    {
      path: "/business",
      name: "Business",
      component: () => import("@/views/Business.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/how-it-works",
      name: "HowItWorks",
      component: () => import("@/views/HowItWorks.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/privacy-policy",
      name: "PrivacyPolicy",
      component: () => import("@/components/policy/PrivacyPolicy.vue"),
    },
    {
      path: "/cookie-policy",
      name: "CookiePolicy",
      component: () => import("@/components/policy/Cookie.vue"),
    },
    {
      path: "/terms-of-service",
      name: "TermsOfService",
      component: () => import("@/components/policy/TOS.vue"),
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: () => import("@/components/account/forgotpassword.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/views/Dashboard.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const expiryTime = localStorage.getItem("pinAuthExpiry");
    const currentTime = new Date().getTime();

    if (!expiryTime || currentTime > parseInt(expiryTime)) {
      // PIN not entered or session expired
      next("/pin-auth");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
