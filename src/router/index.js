import { createRouter, createWebHistory } from "vue-router";
import SupplementGrid from '@/components/supplements/SupplementGrid.vue'
import HowItWorks from '@/components/howitworks/HowItWorks.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/take-quiz",
      name: "TakeQuiz",
      component: () => import("@/views/Quiz.vue"),
    },
    {
      path: "/quiz-results",
      name: "results",
      component: () => import("@/components/quizpage/Results.vue"),
      props: route => ({
        results: route.query.results,
        userInfo: route.query.userInfo
      })
    },
    {
      path: '/supplements',
      name: 'Supplements',
      component: SupplementGrid
    },
    {
      path: '/how-it-works',
      name: 'HowItWorks',
      component: HowItWorks
    }
  ],
});

export default router;
