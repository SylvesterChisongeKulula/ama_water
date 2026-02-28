<template>
    <div class="min-h-screen bg-slate-50 flex">
        <!-- Sidebar -->
        <aside class="hidden md:flex w-64 flex-col bg-slate-900 text-white">
            <div class="p-6 border-b border-slate-700/50">
                <NuxtLink to="/admin" class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                        <Icon name="lucide:droplets" class="text-white text-lg" />
                    </div>
                    <span class="font-heading font-bold text-lg">AMA Admin</span>
                </NuxtLink>
            </div>
            <nav class="flex-1 p-4 space-y-1">
                <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
                    class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/10"
                    active-class="!bg-primary/20 !text-primary-light">
                    <Icon :name="item.icon" class="text-lg" />
                    {{ item.label }}
                </NuxtLink>
            </nav>
            <div class="p-4 border-t border-slate-700/50">
                <div class="flex items-center gap-3 mb-3 px-2">
                    <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                        {{ user?.name?.[0]?.toUpperCase() || 'A' }}
                    </div>
                    <div class="truncate">
                        <p class="text-sm font-medium truncate">{{ user?.name || 'Admin' }}</p>
                        <p class="text-xs text-slate-400 truncate">{{ user?.email || '' }}</p>
                    </div>
                </div>
                <button @click="handleLogout"
                    class="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                    <Icon name="lucide:log-out" class="text-lg" />
                    Sign Out
                </button>
            </div>
        </aside>

        <!-- Mobile Header -->
        <div
            class="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
            <NuxtLink to="/admin" class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Icon name="lucide:droplets" class="text-white" />
                </div>
                <span class="font-heading font-bold">AMA Admin</span>
            </NuxtLink>
            <button @click="mobileOpen = !mobileOpen" class="p-2 cursor-pointer">
                <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" class="text-xl" />
            </button>
        </div>

        <!-- Mobile Sidebar Overlay -->
        <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition duration-150" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="mobileOpen" class="md:hidden fixed inset-0 z-40 bg-black/50" @click="mobileOpen = false"></div>
        </Transition>
        <Transition enter-active-class="transition duration-200" enter-from-class="-translate-x-full"
            enter-to-class="translate-x-0" leave-active-class="transition duration-150" leave-from-class="translate-x-0"
            leave-to-class="-translate-x-full">
            <aside v-if="mobileOpen"
                class="md:hidden fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-white flex flex-col">
                <div class="p-6 border-b border-slate-700/50 flex items-center justify-between">
                    <span class="font-heading font-bold text-lg">AMA Admin</span>
                    <button @click="mobileOpen = false" class="cursor-pointer">
                        <Icon name="lucide:x" class="text-xl" />
                    </button>
                </div>
                <nav class="flex-1 p-4 space-y-1">
                    <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
                        class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/10"
                        active-class="!bg-primary/20 !text-primary-light" @click="mobileOpen = false">
                        <Icon :name="item.icon" class="text-lg" />
                        {{ item.label }}
                    </NuxtLink>
                </nav>
                <div class="p-4 border-t border-slate-700/50">
                    <button @click="handleLogout"
                        class="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                        <Icon name="lucide:log-out" class="text-lg" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </Transition>

        <!-- Main Content -->
        <main class="flex-1 min-w-0 md:p-0 pt-14 md:pt-0">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const mobileOpen = ref(false)

const navItems = [
    { icon: 'lucide:layout-dashboard', label: 'Dashboard', to: '/admin' },
    { icon: 'lucide:package', label: 'Products', to: '/admin/products' },
    { icon: 'lucide:flask-conical', label: 'Water Quality', to: '/admin/water-quality' },
    { icon: 'lucide:settings', label: 'Settings', to: '/admin/settings' },
]

async function handleLogout() {
    await logout()
}
</script>
