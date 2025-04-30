import { createRouter, createWebHistory } from "vue-router";

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
      component: () => import("@/views/Supplements.vue")
    },
    {
      path: '/business',
      name: 'Business',
      component: () => import("@/views/Business.vue"),
    },
    {
      path: '/how-it-works',
      name: 'HowItWorks',
      component: () => import("@/views/HowItWorks.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
});

export default router;
