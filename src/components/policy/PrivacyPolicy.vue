<template>
    <div class="relative min-h-screen bg-[#0A0A0A]">
        <BackgroundGradient />
        <div class="relative">
            <NavBar />
            
            <!-- Privacy Policy Content -->
            <section class="relative pt-32 pb-20 md:py-32">
                <div class="max-w-4xl mx-auto px-4 relative z-10">
                    <div class="text-center mb-16">
                        <h1 class="text-4xl md:text-6xl font-bold mb-6">
                            <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                                Privacy Policy
                            </span>
                        </h1>
                        <p class="text-gray-400 text-lg md:text-xl">
                            Last updated: June 2025
                        </p>
                    </div>

                    <div class="prose prose-invert max-w-none">
                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">1. Information We Collect</h2>
                            <p class="text-gray-400 mb-4">
                                We collect information you provide directly to us, such as when you create an account, take our health assessment quiz, or contact us for support.
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• Personal information (name, email address, date of birth)</li>
                                <li>• Health information and preferences</li>
                                <li>• Quiz responses and health goals</li>
                                <li>• Communication preferences</li>
                            </ul>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">2. How We Use Your Information</h2>
                            <p class="text-gray-400 mb-4">
                                We use the information we collect to provide, maintain, and improve our services:
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• Generate personalized supplement recommendations</li>
                                <li>• Improve our AI algorithms and health assessments</li>
                                <li>• Communicate with you about your health journey</li>
                                <li>• Provide customer support and respond to inquiries</li>
                                <li>• Send important updates about our services</li>
                            </ul>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">3. Information Sharing</h2>
                            <p class="text-gray-400 mb-4">
                                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• With your explicit consent</li>
                                <li>• To comply with legal obligations</li>
                                <li>• To protect our rights and safety</li>
                                <li>• With trusted service providers who assist in our operations</li>
                            </ul>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">4. Data Security</h2>
                            <p class="text-gray-400 mb-4">
                                We implement appropriate security measures to protect your personal information:
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• Encryption of data in transit and at rest</li>
                                <li>• Regular security assessments and updates</li>
                                <li>• Access controls and authentication measures</li>
                                <li>• Secure data storage and backup procedures</li>
                            </ul>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">5. Your Rights</h2>
                            <p class="text-gray-400 mb-4">
                                You have the right to:
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• Access and review your personal information</li>
                                <li>• Update or correct your information</li>
                                <li>• Request deletion of your account and data</li>
                                <li>• Opt-out of marketing communications</li>
                                <li>• Export your data in a portable format</li>
                            </ul>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">6. Contact Us</h2>
                            <p class="text-gray-400 mb-4">
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
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
