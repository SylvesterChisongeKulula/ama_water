<template>
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        :class="scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'">
        <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <!-- Logo -->
            <NuxtLink to="/" class="flex items-center gap-2 group">
                <img src="~/assets/logo.png" alt="AMA Water" class="h-14 md:h-16 w-auto object-contain" />
            </NuxtLink>

            <!-- Desktop Nav -->
            <ul class="hidden md:flex items-center gap-8">
                <li v-for="link in navLinks" :key="link.to">
                    <NuxtLink :to="link.to"
                        class="text-sm font-medium tracking-wide transition-colors hover:text-primary-light"
                        :class="scrolled ? 'text-text-secondary' : 'text-white/90'"
                        active-class="!text-primary font-semibold">
                        {{ link.label }}
                    </NuxtLink>
                </li>
            </ul>

            <!-- Mobile Menu Button -->
            <button class="md:hidden p-2 rounded-lg transition-colors"
                :class="scrolled ? 'text-text-primary hover:bg-surface-muted' : 'text-white hover:bg-white/10'"
                @click="mobileOpen = !mobileOpen" aria-label="Toggle menu">
                <Icon v-if="!mobileOpen" name="mdi:menu" class="text-2xl" />
                <Icon v-else name="mdi:close" class="text-2xl" />
            </button>
        </nav>

        <!-- Mobile Menu -->
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <div v-if="mobileOpen"
                class="md:hidden bg-white/95 backdrop-blur-md border-t border-surface-muted shadow-lg">
                <ul class="px-6 py-4 space-y-3">
                    <li v-for="link in navLinks" :key="link.to">
                        <NuxtLink :to="link.to"
                            class="block py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                            active-class="!text-primary font-semibold" @click="mobileOpen = false">
                            {{ link.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </Transition>
    </header>
</template>

<script setup lang="ts">
const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Products', to: '/products' },
    { label: 'Quality & Safety', to: '/quality-safety' },
    { label: 'Contact', to: '/contact' },
]

const mobileOpen = ref(false)
const scrolled = ref(false)

onMounted(() => {
    const onScroll = () => {
        scrolled.value = window.scrollY > 50
    }
    window.addEventListener('scroll', onScroll)
    onScroll()

    onUnmounted(() => {
        window.removeEventListener('scroll', onScroll)
    })
})
</script>
