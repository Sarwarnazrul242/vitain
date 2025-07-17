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
      path: "/CompleteProfile",
      name: "CompleteProfile",
      component: () => import("@/views/Quiz.vue"),
      meta: { requiresAuth: true, requiresSignupFlow: true },
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
      meta: { requiresSignupFlow: true },
    },

     {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/views/Dashboard.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("@/components/dashboard/Profile.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/business",
      name: "Business",
      component: () => import("@/views/Business.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("@/views/Contact.vue"),
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
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
    {
      path: "/api",
      name: "APIPage",
      component: () => import("@/views/APiPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/pricing",
      name: "Pricing",
      component: () => import("@/views/Pricing.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  }
});

// Navigation guard
router.beforeEach((to, from, next) => {
  // Check if route requires signup flow (for both auth and non-auth routes)
  if (to.meta.requiresSignupFlow) {
    console.log("Route requires signup flow:", to.path);
    
    if (to.path === "/verify") {
      // For verify path, check if user has pending verification
      const pendingVerification = sessionStorage.getItem("pendingVerification") || localStorage.getItem("pendingVerification");
      console.log("Pending verification check:", pendingVerification);
      
      if (!pendingVerification) {
        // User hasn't gone through signup flow, redirect to login
        console.log("No pending verification, redirecting to login");
        next("/log-in");
        return;
      }
      console.log("Pending verification found, allowing access");
    } else {
      // For other paths like CompleteProfile, check if user has completed signup
      const hasCompletedSignup = sessionStorage.getItem("signupCompleted");
      console.log("Signup completed check:", hasCompletedSignup);
      
      if (!hasCompletedSignup) {
        // User hasn't gone through signup flow, redirect to login
        console.log("No signup completed, redirecting to login");
        next("/log-in");
        return;
      }
      console.log("Signup completed found, allowing access");
    }
  }

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
