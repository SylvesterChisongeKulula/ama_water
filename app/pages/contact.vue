<template>
    <div>
        <!-- Hero Banner -->
        <section class="relative pt-32 pb-20 bg-gradient-to-br from-primary-dark to-primary">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Contact Us</h1>
                <p class="text-white/80 text-lg max-w-xl mx-auto">Have a question or want to partner with us? We'd love
                    to hear from you.</p>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="py-20 bg-white">
            <div class="max-w-5xl mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <!-- Form -->
                    <div>
                        <h2 class="text-2xl font-heading font-bold text-text-primary mb-6">Send us a message</h2>
                        <form @submit.prevent="handleSubmit" class="space-y-5">
                            <div>
                                <label for="contact-name"
                                    class="block text-sm font-medium text-text-primary mb-1.5">Name</label>
                                <input id="contact-name" v-model="form.name" type="text" required
                                    class="w-full px-4 py-2.5 rounded-xl border border-surface-muted bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    placeholder="Your full name" />
                            </div>
                            <div>
                                <label for="contact-email"
                                    class="block text-sm font-medium text-text-primary mb-1.5">Email</label>
                                <input id="contact-email" v-model="form.email" type="email" required
                                    class="w-full px-4 py-2.5 rounded-xl border border-surface-muted bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    placeholder="you@example.com" />
                            </div>
                            <div>
                                <label for="contact-subject"
                                    class="block text-sm font-medium text-text-primary mb-1.5">Subject</label>
                                <input id="contact-subject" v-model="form.subject" type="text" required
                                    class="w-full px-4 py-2.5 rounded-xl border border-surface-muted bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    placeholder="How can we help?" />
                            </div>
                            <div>
                                <label for="contact-message"
                                    class="block text-sm font-medium text-text-primary mb-1.5">Message</label>
                                <textarea id="contact-message" v-model="form.message" rows="5" required
                                    class="w-full px-4 py-2.5 rounded-xl border border-surface-muted bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                                    placeholder="Tell us more..."></textarea>
                            </div>
                            <div v-if="success"
                                class="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm">
                                Thank you! Your message has been sent successfully. We will get back to you shortly.
                            </div>

                            <div v-if="errorMessage"
                                class="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                                {{ errorMessage }}
                            </div>

                            <button type="submit" :disabled="sending"
                                class="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                <Icon v-if="sending" name="lucide:loader-2" class="text-lg animate-spin" />
                                {{ sending ? 'Sending...' : 'Send Message' }}
                            </button>
                        </form>
                    </div>

                    <!-- Contact Info -->
                    <div>
                        <h2 class="text-2xl font-heading font-bold text-text-primary mb-6">Get in touch</h2>
                        <div class="space-y-6">
                            <div v-for="info in contactInfo" :key="info.label" class="flex gap-4">
                                <div
                                    class="w-10 h-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg">
                                    <Icon :name="info.icon" class="text-xl" />
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-text-primary">{{ info.label }}</p>
                                    <p class="text-sm text-text-secondary">{{ info.value }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Map Location -->
                        <div
                            class="mt-10 aspect-video rounded-2xl overflow-hidden bg-surface border border-surface-muted shadow-sm flex items-center justify-center">
                            <ClientOnly>
                                <iframe width="100%" height="100%" frameborder="0" style="border:0"
                                    referrerpolicy="no-referrer-when-downgrade" :src="mapUrl">
                                </iframe>
                                <template #fallback>
                                    <div class="w-full h-full bg-surface-muted animate-pulse"></div>
                                </template>
                            </ClientOnly>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Contact — AMA Water',
    meta: [
        { name: 'description', content: 'Contact AMA Water for enquiries, bulk orders, or distribution partnerships. We\'d love to hear from you.' },
    ],
})

const { data: settings } = await useFetch<Record<string, string>>('/api/settings/public')

const mapUrl = computed(() => {
    const address = settings.value?.map_address || 'Lusaka, Zambia'
    return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(address)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`
})

const contactInfo = computed(() => [
    { icon: 'lucide:mail', label: 'Email', value: settings.value?.contact_email || 'info@amawater.com' },
    { icon: 'lucide:phone', label: 'Phone', value: settings.value?.contact_phone || '+260979148661, +260978980065' },
    { icon: 'lucide:map-pin', label: 'Address', value: settings.value?.map_address || 'Plot 491A Parkview Estates Chalala, Lusaka, Zambia' },
    { icon: 'lucide:clock', label: 'Hours', value: settings.value?.business_hours || 'Mon–Fri: 08:00 – 17:00' },
])

const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: '',
})

const sending = ref(false)
const success = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
    sending.value = true
    errorMessage.value = ''
    success.value = false

    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: form
        })
        success.value = true
        form.name = ''
        form.email = ''
        form.subject = ''
        form.message = ''
    } catch (e: any) {
        errorMessage.value = e.data?.message || 'Failed to send message. Please try again.'
    } finally {
        sending.value = false
    }
}
</script>
