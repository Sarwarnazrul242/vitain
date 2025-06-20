<template>
    <div class="relative min-h-screen bg-[#0A0A0A]">
        <BackgroundGradient />
        <div class="relative">
            <NavBar />
            
            <!-- Terms of Service Content -->
            <section class="relative pt-32 pb-20 md:py-32">
                <div class="max-w-4xl mx-auto px-4 relative z-10">
                    <div class="text-center mb-16">
                        <h1 class="text-4xl md:text-6xl font-bold mb-6">
                            <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                                Terms of Service
                            </span>
                        </h1>
                        <p class="text-gray-400 text-lg md:text-xl">
                            Last updated: June 2025
                        </p>
                    </div>

                    <div class="prose prose-invert max-w-none">
                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
                            <p class="text-gray-400 mb-4">
                                By accessing and using Vitain's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">2. Description of Service</h2>
                            <p class="text-gray-400 mb-4">
                                Vitain provides AI-powered health assessment and personalized supplement recommendations. Our services include:
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• Health assessment quizzes and questionnaires</li>
                                <li>• AI-generated supplement recommendations</li>
                                <li>• Health tracking and progress monitoring</li>
                                <li>• Educational content about health and wellness</li>
                                <li>• Customer support and consultation services</li>
                            </ul>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">3. User Responsibilities</h2>
                            <p class="text-gray-400 mb-4">
                                As a user of our services, you agree to:
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• Provide accurate and truthful information</li>
                                <li>• Consult with healthcare professionals before taking supplements</li>
                                <li>• Not use our services for any illegal or unauthorized purpose</li>
                                <li>• Maintain the security of your account credentials</li>
                                <li>• Report any adverse reactions to supplements immediately</li>
                            </ul>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">4. Medical Disclaimer</h2>
                            <p class="text-gray-400 mb-4">
                                IMPORTANT: Vitain's recommendations are for informational purposes only and should not be considered as medical advice. Our services are not intended to:
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• Replace professional medical advice, diagnosis, or treatment</li>
                                <li>• Treat, cure, or prevent any disease</li>
                                <li>• Substitute for consultation with qualified healthcare providers</li>
                                <li>• Guarantee specific health outcomes</li>
                            </ul>
                            <p class="text-gray-400 mt-4">
                                Always consult with your healthcare provider before starting any supplement regimen.
                            </p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">5. Intellectual Property</h2>
                            <p class="text-gray-400 mb-4">
                                All content, features, and functionality of our services are owned by Vitain and are protected by international copyright, trademark, and other intellectual property laws.
                            </p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">6. Limitation of Liability</h2>
                            <p class="text-gray-400 mb-4">
                                Vitain shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
                            </p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">7. Termination</h2>
                            <p class="text-gray-400 mb-4">
                                We may terminate or suspend your account and access to our services immediately, without prior notice, for any reason, including breach of these Terms of Service.
                            </p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">8. Changes to Terms</h2>
                            <p class="text-gray-400 mb-4">
                                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our website. Your continued use of our services after such modifications constitutes acceptance of the updated terms.
                            </p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">9. Contact Information</h2>
                            <p class="text-gray-400 mb-4">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div class="text-gray-400 space-y-2">
                                <p>Email: vitain@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/common/NavBar.vue'
import Footer from '@/components/common/Footer.vue'
import BackgroundGradient from '@/components/homepage/BackgroundGradient.vue'
</script>

<style scoped>
.prose {
    color: #9ca3af;
}

.prose h2 {
    color: #ffffff;
    margin-top: 0;
}

.prose p {
    margin-bottom: 1rem;
}

.prose ul {
    margin-bottom: 1rem;
}
</style>
