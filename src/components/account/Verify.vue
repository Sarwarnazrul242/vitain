<template>
  <BackgroundGradient />
  <div class="relative">
    <section class="pt-32 pb-20 md:py-32">
      <div class="max-w-2xl mx-auto px-4 relative z-10">
        <div class="text-center mb-12">
          <div class="mb-8">
            <div class="w-16 h-16 mx-auto bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold mb-4">
              <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                Verify Your Email
              </span>
            </h1>
            <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              We've sent a verification link to <span class="text-white font-semibold">{{ email }}</span>.<br>
              Please check your inbox and click the link to verify your email address.
            </p>
          </div>
        </div>
        <div class="z-10 flex flex-col items-center justify-center gap-8">
          <div class="auth-container">
            <div class="text-center mb-8">
              <p class="text-gray-400 text-sm mb-4">
                After verifying, return to this page and click the button below.
              </p>
              <button
                @click="checkVerification"
                class="auth-button group"
              >
                <span class="button-bg"></span>
                <span class="button-text">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  I've Verified
                </span>
              </button>
              <p v-if="errors['verify']" class="text-red-400 mt-4">{{ errors['verify'] }}</p>
            </div>
            <div class="text-center mt-6">
              <p class="text-gray-400">
                <span 
                  @click="goBackToLogin"
                  class="text-[#4ADE80] cursor-pointer hover:underline font-medium hover:text-[#3B82F6] transition-colors"
                >
                  ← Back to Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import BackgroundGradient from "@/components/homepage/BackgroundGradient.vue";
import Footer from "@/components/common/Footer.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { errors, ErrorType, AppError, isAppError, pastError, submitForm, checkEmailVerification } from "../../services/auth";

const router = useRouter();
const email = ref<string>("");
const isChecking = ref(false);
const errorMessage = ref("");
const verifyFlag =  ref(false);

onMounted(async () => {
  // Load email from localStorage
  const storedEmail = localStorage.getItem('email');
  if (storedEmail) {
    email.value = storedEmail;
  // } else {
  //   router.push("/login");
  //   return;
  // }

  // // Send verification email if not already sent
  // const auth = getAuth();
  // if (auth.currentUser && !auth.currentUser.emailVerified) {
  //   try {
  //     await sendEmailVerification(auth.currentUser);
  //   } catch (e) {
  //     // Ignore if already sent
  //   }
  // }
  }
});

const checkVerification = async () => {
  errorMessage.value = "";

  try {
    console.log("check verification clicked")
    verifyFlag.value = await checkEmailVerification();
  
    if (!verifyFlag.value)
    {   
      console.log("email not verified")
      throw {type:"verify", message:"Please verify your email."}
      return;
    }

    console.log("email verified")
    const formSubmission = sessionStorage.getItem("quizData");
       
    //Handles formdat of new users who have not logged in
    try{
    if (formSubmission)
    {  
     sessionStorage.removeItem("quizData"); //Clear lcal storage ebcause sessions torage has been passed abck for the quiz data
      await handleFormSubmission(JSON.parse(formSubmission))
      return
    }

    else 
    {
      //Should take to quiz? for them to fill out info or verification page or something
      router.push("/take-quiz"); 
    }} catch (err)
    {
    console.log("signup formsubmission error", err)
    }
      
  } catch (err) {
    
    if (isAppError(err)){
      //Assing the error to the correct slot

      pastError.value = err.type;
      errors[err.type] = err.message;
      console.log(errors[err.type]);
     }

     else{
      console.log("Verification Check Error: ", err)
     }
  } 
};

const goBackToLogin = () => {
  router.push("/login");
};


const handleFormSubmission = async (formSubmission) =>
{
  try{
    await submitForm(formSubmission, router)

  } catch (err)
  {
    console.log(err)
  }
}
</script>

<style scoped>
.auth-container {
  @apply bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl w-full max-w-2xl;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.input-label {
  @apply font-semibold text-lg block mb-3 text-white flex items-center;
}

.auth-button {
  @apply relative w-full px-8 py-4 rounded-xl text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] mt-8;
}

.auth-button:not(:disabled) {
  @apply hover:shadow-lg;
}

.auth-button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.button-bg {
  @apply absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] transition-transform duration-300 group-hover:scale-105;
}

.button-text {
  @apply relative text-white flex items-center justify-center gap-2 font-semibold;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-container {
  animation: fadeInUp 0.6s ease-out;
}

a:hover {
  text-shadow: 0 0 8px currentColor;
}
</style>
