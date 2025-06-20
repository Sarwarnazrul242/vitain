<template>
    <div class="relative min-h-screen bg-[#0A0A0A]">
        <BackgroundGradient />
        <div class="relative">
            <NavBar />
            
            <!-- Cookie Policy Content -->
            <section class="relative pt-32 pb-20 md:py-32">
                <div class="max-w-4xl mx-auto px-4 relative z-10">
                    <div class="text-center mb-16">
                        <h1 class="text-4xl md:text-6xl font-bold mb-6">
                            <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
                                Cookie Policy
                            </span>
                        </h1>
                        <p class="text-gray-400 text-lg md:text-xl">
                            Last updated: June 2025
                        </p>
                    </div>

                    <div class="prose prose-invert max-w-none">
                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">1. What Are Cookies</h2>
                            <p class="text-gray-400 mb-4">
                                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
                            </p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">2. How We Use Cookies</h2>
                            <p class="text-gray-400 mb-4">
                                We use cookies for the following purposes:
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• <strong>Essential Cookies:</strong> Required for basic website functionality</li>
                                <li>• <strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                                <li>• <strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                                <li>• <strong>Security Cookies:</strong> Help protect against fraud and ensure secure browsing</li>
                                <li>• <strong>Performance Cookies:</strong> Improve website speed and performance</li>
                            </ul>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">3. Types of Cookies We Use</h2>
                            
                            <h3 class="text-xl font-semibold mb-3 text-white">Essential Cookies</h3>
                            <p class="text-gray-400 mb-4">
                                These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and form submissions.
                            </p>
                            
                            <h3 class="text-xl font-semibold mb-3 text-white">Analytics Cookies</h3>
                            <p class="text-gray-400 mb-4">
                                We use analytics cookies to understand how visitors interact with our website. This helps us improve our services and user experience.
                            </p>
                            
                            <h3 class="text-xl font-semibold mb-3 text-white">Preference Cookies</h3>
                            <p class="text-gray-400 mb-4">
                                These cookies remember your choices and preferences, such as language settings, theme preferences, and health assessment responses.
                            </p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">4. Third-Party Cookies</h2>
                            <p class="text-gray-400 mb-4">
                                We may use third-party services that place cookies on your device:
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• <strong>Google Analytics:</strong> Website analytics and performance tracking</li>
                                <li>• <strong>Payment Processors:</strong> Secure payment processing</li>
                                <li>• <strong>Customer Support:</strong> Chat and support functionality</li>
                                <li>• <strong>Social Media:</strong> Social sharing and integration features</li>
                            </ul>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">5. Managing Your Cookie Preferences</h2>
                            <p class="text-gray-400 mb-4">
                                You can control and manage cookies in several ways:
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• <strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies</li>
                                <li>• <strong>Cookie Consent:</strong> Use our cookie consent banner to manage preferences</li>
                                <li>• <strong>Opt-Out Tools:</strong> Use industry opt-out tools for advertising cookies</li>
                                <li>• <strong>Contact Us:</strong> Reach out to us for assistance with cookie management</li>
                            </ul>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">6. Cookie Retention</h2>
                            <p class="text-gray-400 mb-4">
                                Different types of cookies have different retention periods:
                            </p>
                            <ul class="text-gray-400 space-y-2 ml-6">
                                <li>• <strong>Session Cookies:</strong> Deleted when you close your browser</li>
                                <li>• <strong>Persistent Cookies:</strong> Remain on your device for a set period</li>
                                <li>• <strong>Analytics Cookies:</strong> Typically retained for 2 years</li>
                                <li>• <strong>Preference Cookies:</strong> Retained until you change your preferences</li>
                            </ul>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">7. Updates to This Policy</h2>
                            <p class="text-gray-400 mb-4">
                                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
                            </p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">8. Contact Us</h2>
                            <p class="text-gray-400 mb-4">
                                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

.prose h3 {
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
