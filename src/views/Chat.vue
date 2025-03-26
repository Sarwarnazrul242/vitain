<template>
    <main class="h-screen overflow-hidden relative">
        <!-- Wooden Background -->
        <div class="absolute inset-0 z-0">
            <img 
                src="@/assets/wood.png" 
                alt="Wood Background" 
                class="w-full h-full object-cover brightness-50"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black"></div>
        </div>

        <!-- Chat Container -->
        <div class="container mx-auto px-4 py-6 max-w-4xl relative z-10 h-full">
            <!-- Chat Box -->
            <div class="bg-black/40 backdrop-blur-sm rounded-lg p-6 flex flex-col shadow-xl border border-white/10 mt-20 h-[calc(100%-5rem)]">
                <!-- Chat Header -->
                <div class="border-b border-white/20 pb-4 mb-4">
                    <h1 class="text-2xl font-bold text-white">Health Assistant</h1>
                    <p class="text-white/70">Ask me anything about health and supplements</p>
                </div>

                <!-- Messages -->
                <div class="flex-1 overflow-y-auto space-y-4 mb-4" ref="messagesContainer">
                    <div v-for="(message, index) in conversation_history" 
                         :key="index"
                         class="flex"
                         :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
                    >
                        <div :class="[
                            'p-4 rounded-lg max-w-[80%] animate-fade-in',
                            message.role === 'user' 
                                ? 'bg-primary text-white rounded-tr-none' 
                                : 'bg-white/20 text-white rounded-tl-none'
                        ]"
                        >
                            <p class="text-sm opacity-75 mb-1">
                                {{ message.role === 'user' ? 'You' : 'Assistant' }}
                            </p>
                            <p class="whitespace-pre-wrap">{{ message.message }}</p>
                        </div>
                    </div>

                    <!-- Loading Animation -->
                    <div v-if="isLoading" class="flex items-center space-x-2 text-white/70">
                        <div class="flex space-x-1">
                            <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0s"></div>
                            <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                            <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        </div>
                        <span class="text-sm">AI is thinking...</span>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="mt-auto border-t border-white/20 pt-4">
                    <div class="flex gap-2">
                        <input 
                            type="text" 
                            v-model="question"
                            @keyup.enter="askQuestion"
                            :disabled="isLoading"
                            placeholder="Ask about health and supplements..."
                            class="flex-1 bg-white/10 text-white rounded-lg px-4 py-3 
                                   placeholder:text-white/50 focus:outline-none focus:ring-2 
                                   focus:ring-primary disabled:opacity-50 transition-all"
                        >
                        <button 
                            @click="askQuestion"
                            :disabled="isLoading || !question.trim()"
                            class="bg-primary hover:bg-primary-dark text-white px-6 py-3 
                                   rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            <span>Send</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import axios from "axios"
import { ref, watch, nextTick } from "vue"

type ConversationType = {
    role: string,
    message: string
}

const question = ref<string>("")
const conversation_history = ref<ConversationType[]>([])
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

// Auto-scroll to bottom when new messages arrive
watch(conversation_history.value, async () => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}, { deep: true })

async function askQuestion() {
    if (!question.value.trim() || isLoading.value) return

    try {
        isLoading.value = true
        
        // Add user message
        conversation_history.value.push({
            role: "user",
            message: question.value
        })

        const saved_question = question.value
        question.value = ""

        // Get AI response
        const res = await axios.post("https://vitain-ai.onrender.com/chat", {
            role: "user",
            action: "send_message",
            message: saved_question
        })

        // Add AI response
        conversation_history.value.push({
            role: "assistant",
            message: res.data.response
        })
    } catch (err) {
        console.error(err)
        conversation_history.value.push({
            role: "assistant",
            message: "Sorry, I encountered an error. Please try again."
        })
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
.bg-primary {
    background-color: #A0522D;
}

.bg-primary-dark:hover {
    background-color: #8B4513;
}

.focus\:ring-primary:focus {
    --tw-ring-color: #A0522D;
}

/* Scrollbar styling */
.overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: #A0522D transparent;
}

.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: #A0522D;
    border-radius: 20px;
}

/* Animation */
@keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
}
</style>