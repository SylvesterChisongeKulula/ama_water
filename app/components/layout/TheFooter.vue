<template>
    <footer class="bg-surface-dark text-text-on-dark">
        <div class="max-w-7xl mx-auto px-6 py-16">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
                <!-- Brand -->
                <div class="md:col-span-1">
                    <div class="flex items-center gap-2 mb-4">
                        <img src="~/assets/logo.png" alt="AMA Water" class="h-9 w-auto object-contain" />
                    </div>
                    <p class="text-sm text-text-light leading-relaxed">
                        Pure, refreshing mineral water sourced from pristine natural springs. Committed to quality,
                        safety, and sustainability.
                    </p>
                </div>

                <!-- Quick Links -->
                <div>
                    <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigate</h4>
                    <ul class="space-y-2">
                        <li v-for="link in quickLinks" :key="link.to">
                            <NuxtLink :to="link.to"
                                class="text-sm text-text-light hover:text-primary-light transition-colors">
                                {{ link.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
                    <ul class="space-y-2 text-sm text-text-light">
                        <li>info@amawater.com</li>
                        <li>+260979148661, +260978980065</li>
                        <li>Plot 491A Parkview Estates Chalala, Lusaka, Zambia</li>
                    </ul>
                </div>

                <!-- Social -->
                <div>
                    <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Follow Us</h4>
                    <div class="flex gap-3">
                        <a href="#"
                            class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-light/20 transition-colors"
                            aria-label="Facebook">
                            <Icon name="mdi:facebook" class="text-xl" />
                        </a>
                        <a href="#"
                            class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-light/20 transition-colors"
                            aria-label="Instagram">
                            <Icon name="mdi:instagram" class="text-xl" />
                        </a>
                        <a href="#"
                            class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-light/20 transition-colors"
                            aria-label="Twitter">
                            <Icon name="mdi:twitter" class="text-xl" />
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div
                class="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p class="text-xs text-text-light">&copy; {{ new Date().getFullYear() }} AMA Water. All rights reserved.
                </p>
                <div class="flex gap-6">
                    <a href="#" class="text-xs text-text-light hover:text-primary-light transition-colors">Privacy
                        Policy</a>
                    <a href="#" class="text-xs text-text-light hover:text-primary-light transition-colors">Terms of
                        Service</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Products', to: '/products' },
    { label: 'Quality & Safety', to: '/quality-safety' },
    { label: 'Contact', to: '/contact' },
]
</script>
