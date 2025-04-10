<template>
    <div class="relative">
        <!-- Chat Button -->
        <button 
            @click="toggleChat"
            class="fixed bottom-8 right-8 z-50 group flex items-center gap-3 overflow-hidden rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        >
            <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] opacity-90 group-hover:opacity-100 transition-opacity"></span>
            <span class="relative px-6 py-4 text-white flex items-center gap-3">
                <span class="hidden md:block">Chat with AI Assistant</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </span>
        </button>

        <!-- Chat Popup -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <div v-if="isOpen" class="fixed bottom-28 right-8 w-[400px] max-w-[calc(100vw-2rem)] z-50">
                <div class="bg-[#0A0A0A]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col h-[600px] max-h-[80vh]">
                    <!-- Chat Header -->
                    <div class="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10">
                        <div>
                            <h3 class="font-bold text-white">AI Health Assistant</h3>
                            <p class="text-sm text-gray-400">Ask me anything about health</p>
                        </div>
                        <button 
                            @click="toggleChat"
                            class="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Chat Messages -->
                    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
                        <div v-for="(message, index) in conversation_history" 
                             :key="index"
                             class="flex"
                             :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
                        >
                            <div :class="[
                                'p-3 rounded-2xl max-w-[80%] animate-fade-in shadow-lg',
                                message.role === 'user' 
                                    ? 'bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white' 
                                    : 'bg-white/10 text-white'
                            ]">
                                <p class="text-sm whitespace-pre-wrap">{{ message.message }}</p>
                            </div>
                        </div>

                        <!-- Loading Animation -->
                        <div v-if="isLoading" class="flex items-center space-x-2">
                            <div class="flex space-x-1">
                                <div class="w-2 h-2 rounded-full bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] animate-bounce" style="animation-delay: 0s"></div>
                                <div class="w-2 h-2 rounded-full bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] animate-bounce" style="animation-delay: 0.1s"></div>
                                <div class="w-2 h-2 rounded-full bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] animate-bounce" style="animation-delay: 0.2s"></div>
                            </div>
                            <span class="text-sm text-gray-400">AI is thinking...</span>
                        </div>
                    </div>

                    <!-- Chat Input -->
                    <div class="p-4 border-t border-white/10 bg-gradient-to-r from-[#4ADE80]/5 to-[#3B82F6]/5">
                        <div class="flex gap-2">
                            <input 
                                v-model="question"
                                @keyup.enter="sendMessage"
                                type="text"
                                placeholder="Type your message..."
                                class="flex-1 bg-white/10 text-white rounded-xl px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] border border-white/10"
                                :disabled="isLoading"
                            >
                            <button 
                                @click="sendMessage"
                                :disabled="isLoading || !question.trim()"
                                class="group relative px-4 py-2 rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-50"
                            >
                                <span class="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] opacity-90 group-hover:opacity-100 transition-opacity"></span>
                                <span class="relative text-white flex items-center gap-2">
                                    <span>Send</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import axios from 'axios';

const isOpen = ref(false);
const question = ref('');
const conversation_history = ref([]);
const isLoading = ref(false);
const messagesContainer = ref(null);

const toggleChat = () => {
    isOpen.value = !isOpen.value;
};

// Auto-scroll to bottom when new messages arrive
watch(conversation_history.value, async () => {
    await nextTick();
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
}, { deep: true });

async function sendMessage() {
    if (!question.value.trim() || isLoading.value) return;

    try {
        isLoading.value = true;
        
        // Add user message
        conversation_history.value.push({
            role: "user",
            message: question.value
        });

        const saved_question = question.value;
        question.value = "";

        // Get AI response
        const res = await axios.post("https://vitain-ai.onrender.com/chat", {
            role: "user",
            action: "send_message",
            message: saved_question
        });

        // Add AI response
        conversation_history.value.push({
            role: "assistant",
            message: res.data.response
        });
    } catch (err) {
        console.error(err);
        conversation_history.value.push({
            role: "assistant",
            message: "Sorry, I encountered an error. Please try again."
        });
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped>
/* Scrollbar styling */
.overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(74, 222, 128, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #4ADE80, #3B82F6);
    border-radius: 20px;
}

/* Message animation */
@keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
}
</style> 