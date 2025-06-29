<template>
    <BackgroundGradient />
    <div class="relative">
      <!-- LOGIN -->
      <section class="pt-32 pb-20 md:py-32" v-if="state === 'login'">
        <div class="max-w-7xl mx-auto px-4 relative z-10">
          <div class="text-center mb-12">
            <div class="mb-8">
              <div class="w-16 h-16 mx-auto bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 class="text-4xl md:text-6xl font-bold mb-4">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  Welcome Back
                </span>
              </h1>
              <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                Continue your health journey with personalized recommendations
              </p>
            </div>
          </div>
        </div>
        <div class="z-10 flex items-center flex-col justify-center gap-8">
          <div class="auth-container">
            <!--- Error message below -->
              <p v-if="errors.login" class="text-red-600 mt-2 text-sm">
              {{ errors.login }}
              </p>
            <div class="input-group">
              <label class="input-label">
                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                v-model="email"
                class="input-field"
                placeholder="Enter your email address"
              />
            </div>
            <div class="input-group">
              <label class="input-label">
                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </label>
              <input
                type="password"
                v-model="password"
                class="input-field"
                placeholder="Enter your password"
              />
            </div>
            <div class="flex justify-between items-center mt-8">
              <label class="flex items-center gap-3 text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">
                <input type="checkbox" class="custom-checkbox" />
                Remember me
              </label>
              <a href="/forgot-password" class="text-[#4ADE80] text-sm hover:underline hover:text-[#3B82F6] transition-colors">Forgot password?</a>
            </div>
            <button
              @click="handleLogin"
              class="auth-button group"
            >
              <span class="button-bg"></span>
              <span class="button-text">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </span>
            </button>
          </div>
          <div class="text-center">
            <p class="text-gray-400">
              Don't have an account? 
              <span 
                class="text-[#4ADE80] cursor-pointer hover:underline font-medium hover:text-[#3B82F6] transition-colors"
                @click="state = 'signup'"
              >
                Sign up here
              </span>
            </p>
          </div>
        </div>
      </section>
  
      <!-- Sign up page -->
      <section class="pt-32 pb-20 md:py-32" v-if="state === 'signup'">
        <div class="max-w-7xl mx-auto px-4 relative z-10">
          <div class="text-center mb-12">
            <div class="mb-8">
              <div class="w-16 h-16 mx-auto bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 class="text-4xl md:text-6xl font-bold mb-4">
                <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                  Start Your Journey
                </span>
              </h1>
              <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                Create your account and get personalized health recommendations
              </p>
            </div>
          </div>
        </div>
        <div class="z-10 flex items-center flex-col justify-center gap-8">
          <div class="auth-container">
            <div v-for="(msg, key) in errors" :key="key">
            <p v-if="msg" class="text-red-600 mt-2 text-sm">
              {{ msg }}
            </p>
           </div>
              
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="input-group">
                <label class="input-label">
                  <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  First Name
                </label>
                <input
                  type="text"
                  v-model="firstName"
                  class="input-field"
                  placeholder="Enter your first name"
                />
              </div>
              <div class="input-group">
                <label class="input-label">
                  <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Last Name
                </label>
                <input
                  type="text"
                  v-model="lastName"
                  class="input-field"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div class="input-group">
              <label class="input-label">
                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                v-model="email"
                class="input-field"
                placeholder="Enter your email address"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="input-group">
                <label class="input-label">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="input-field"
                  placeholder="Create a password"
                />
              </div>
              <div class="input-group">
                <label class="input-label">Confirm Password</label>
                <input
                  type="password"
                  v-model="confirmPassword"
                  class="input-field"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            <div class="flex items-start gap-3 mt-6">
              <input 
                type="checkbox" 
                v-model="agreeToTerms"
                class="w-5 h-5 rounded border-gray-600 bg-transparent mt-1"
              />
              <label class="text-gray-400 text-sm">
                I agree to the 
                <a href="/terms-of-service" target="_blank" class="text-[#4ADE80] hover:underline">Terms of Service</a> 
                and 
                <a href="/privacy-policy" target="_blank" class="text-[#4ADE80] hover:underline">Privacy Policy</a>
              </label>
            </div>
            <button
              @click="createAccount"
              class="auth-button group"
              :disabled="!agreeToTerms"
            >
              <span class="button-bg"></span>
              <span class="button-text">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Create Account
              </span>
            </button>
          </div>
          <div class="text-center">
            <p class="text-gray-400">
              Already have an account? 
              <span 
                class="text-[#4ADE80] cursor-pointer hover:underline font-medium hover:text-[#3B82F6] transition-colors"
                @click="state = 'login'"
              >
                Sign in here
              </span>
             
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  </template>
  
  <script lang="ts" setup>
  import BackgroundGradient from "@/components/homepage/BackgroundGradient.vue";
  import Footer from "@/components/common/Footer.vue";
  import { onMounted, ref } from "vue";
  import { login, signup } from "../../services/auth";
  import { useRoute, useRouter } from "vue-router";
  import { reactive } from 'vue';

  const state = ref<"signup" | "login">("login");
  const email = ref<string>("");
  const password = ref<string>("");
  const firstName = ref<string>("");
  const lastName = ref<string>("");
  const confirmPassword = ref<string>("");
  const agreeToTerms = ref<boolean>(false);
  
  const route = useRoute();
  const router = useRouter();
  const route_to_results_after = ref<boolean>(false);
  const query_data = ref<any>();
  const errorMessage = ref("");

  const errors = reactive<{
    general: string;
    fill: string;
    password: string;
     login: string;

  }>(
    {
      general: "",
      fill:"",
      password:"",
      login:""
    }
  )
  async function createAccount() {
    try {
      errors.general = "";
      errors.fill = "";
      errors.password = "";
  

      if (!firstName.value.trim() || !lastName.value.trim() || email.value.trim() === "" || password.value.trim() === "") {
        throw  {type:"fill", message: "Please fill in all required fields."}
      }
     
      if (password.value !== confirmPassword.value) {
        throw  {type:"password", message:"Passwords do not match."};
      }
  
      if (!agreeToTerms.value) {
        return;
      }

      console.log("Signing up");
      
      // Store user data for verification (in real app, this would be in a store or passed via route)
     
      await signup(firstName.value, lastName.value, email.value,password.value );
      console.log("Sign up successful!");
    
   
     
      //localStorage.setItem('pendingVerificationEmail', email.value);
      //localStorage.setItem('pendingVerificationName', `${firstName.value} ${lastName.value}`);
      
      // Redirect to verification page
     // router.push("/verify");
   } catch (err: any){

     console.log(err);
     if (err?.type && err?.message ) {
      //Assing the error to the correct slot
      errors[err.type] = err.message;
     
     }
     else{
      console.log("Sign up error occured: ", err);
      errors.general = "An error occurred during signup. Please try again."; 
     }
  
  }
}
  
  async function handleLogin()
  {
      errors.login = "";
      try{
        await login(email.value, password.value);
      } catch (err: any){
        errors.login = err.message;
      }
  }

  async function logIn() {
    try {
      if (email.value.trim() === "" || password.value.trim() === "") {
        throw  {type:"fill", message: "Please fill in all required fields."};
      }
  
      await login(email.value, password.value);

    } catch (err) {
      console.log(err);
      
      
    }
  }
  
  onMounted(() => {
    if (route.query.results) {
      route_to_results_after.value = true;
      query_data.value = route.query.results;
    }
  });
  </script>
  
  <style scoped>
  .auth-container {
    @apply bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl w-full max-w-2xl;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  
  .input-group {
    @apply mb-6;
  }
  
  .input-label {
    @apply font-semibold text-lg block mb-3 text-white flex items-center;
  }
  
  .input-field {
    @apply w-full p-4 border border-white/20 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50 focus:border-[#4ADE80]/30 transition-all duration-300 placeholder:text-white/40;
    backdrop-filter: blur(10px);
  }
  
  .input-field:focus {
    @apply bg-white/10;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(74, 222, 128, 0.2);
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
  
  .custom-checkbox {
    @apply appearance-none border-2 border-gray-600 rounded bg-transparent checked:bg-[#4ADE80] checked:border-[#4ADE80] transition-all duration-200 w-5 h-5;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    background-size: 0;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  .custom-checkbox:checked {
    background-size: 0.75em;
  }
  
  select.input-field {
    @apply appearance-none bg-no-repeat bg-right pr-10;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.75rem center;
    background-size: 1.5em 1.5em;
  }
  
  /* Enhanced animations */
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
  
  .input-group {
    animation: fadeInUp 0.6s ease-out;
    animation-delay: calc(var(--index, 0) * 0.1s);
  }
  
  /* Hover effects for links */
  a:hover {
    text-shadow: 0 0 8px currentColor;
  }
  </style>
  