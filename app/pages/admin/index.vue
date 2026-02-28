<template>
    <div class="p-6 md:p-8">
        <div class="mb-8">
            <h1 class="text-2xl font-heading font-bold text-slate-900">Dashboard</h1>
            <p class="text-slate-500 text-sm mt-1">Overview of your AMA Water management panel</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <div v-for="stat in stats" :key="stat.label"
                class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="stat.bgClass">
                        <Icon :name="stat.icon" class="text-lg" :class="stat.iconClass" />
                    </div>
                </div>
                <p class="text-2xl font-bold text-slate-900">{{ stat.value }}</p>
                <p class="text-sm text-slate-500 mt-1">{{ stat.label }}</p>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="mb-8">
            <h2 class="text-lg font-heading font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <NuxtLink to="/admin/products"
                    class="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all group">
                    <div
                        class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Icon name="lucide:package" class="text-lg" />
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Manage Products</p>
                        <p class="text-xs text-slate-400">Add, edit or remove products</p>
                    </div>
                </NuxtLink>
                <NuxtLink to="/admin/water-quality"
                    class="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all group">
                    <div
                        class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <Icon name="lucide:flask-conical" class="text-lg" />
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Water Quality</p>
                        <p class="text-xs text-slate-400">Update test results</p>
                    </div>
                </NuxtLink>
                <NuxtLink to="/admin/settings"
                    class="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all group">
                    <div
                        class="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all">
                        <Icon name="lucide:settings" class="text-lg" />
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Settings</p>
                        <p class="text-xs text-slate-400">Email & map configuration</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

useHead({ title: 'Dashboard — AMA Admin' })

const { token, fetchUser } = useAuth()

// Guard: redirect if not logged in
onMounted(async () => {
    if (!token.value) {
        navigateTo('/admin/login')
        return
    }
    await fetchUser()
})

// Fetch stats
const stats = ref([
    { icon: 'lucide:package', label: 'Products', value: '...', bgClass: 'bg-blue-50', iconClass: 'text-blue-600' },
    { icon: 'lucide:flask-conical', label: 'Quality Metrics', value: '...', bgClass: 'bg-emerald-50', iconClass: 'text-emerald-600' },
    { icon: 'lucide:mail', label: 'Messages', value: '...', bgClass: 'bg-amber-50', iconClass: 'text-amber-600' },
    { icon: 'lucide:users', label: 'Admin Users', value: '...', bgClass: 'bg-violet-50', iconClass: 'text-violet-600' },
])

onMounted(async () => {
    try {
        const [products, quality] = await Promise.all([
            $fetch<any[]>('/api/admin/products', { headers: { Authorization: `Bearer ${token.value}` } }),
            $fetch<any[]>('/api/admin/water-quality', { headers: { Authorization: `Bearer ${token.value}` } }),
        ])
        if (stats.value[0]) stats.value[0].value = String(products.length)
        if (stats.value[1]) stats.value[1].value = String(quality.length)
        if (stats.value[2]) stats.value[2].value = '—'
        if (stats.value[3]) stats.value[3].value = '—'
    } catch { }
})
</script>
