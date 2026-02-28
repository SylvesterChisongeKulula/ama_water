<template>
    <div class="p-6 md:p-8">
        <div class="mb-8">
            <h1 class="text-2xl font-heading font-bold text-slate-900">Settings</h1>
            <p class="text-slate-500 text-sm mt-1">Manage contact email and map location</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Contact Email -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div class="flex items-center gap-3 mb-5">
                    <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Icon name="lucide:mail" class="text-lg" />
                    </div>
                    <div>
                        <h2 class="text-base font-heading font-semibold text-slate-900">Contact Email</h2>
                        <p class="text-xs text-slate-400">Email that receives messages from the contact form</p>
                    </div>
                </div>
                <input v-model="settings.contact_email" type="email"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="info@amawater.com" />
            </div>

            <!-- Contact Phone -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div class="flex items-center gap-3 mb-5">
                    <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                        <Icon name="lucide:phone" class="text-lg" />
                    </div>
                    <div>
                        <h2 class="text-base font-heading font-semibold text-slate-900">Contact Phone</h2>
                        <p class="text-xs text-slate-400">Phone numbers shown on the contact page</p>
                    </div>
                </div>
                <input v-model="settings.contact_phone" type="text"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="+260 97X XXX XXX" />
            </div>

            <!-- Business Hours -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div class="flex items-center gap-3 mb-5">
                    <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                        <Icon name="lucide:clock" class="text-lg" />
                    </div>
                    <div>
                        <h2 class="text-base font-heading font-semibold text-slate-900">Business Hours</h2>
                        <p class="text-xs text-slate-400">Opening hours shown on the contact page</p>
                    </div>
                </div>
                <input v-model="settings.business_hours" type="text"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="Mon–Fri: 08:00 – 17:00" />
            </div>

            <!-- Map Address -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div class="flex items-center gap-3 mb-5">
                    <div class="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                        <Icon name="lucide:map-pin" class="text-lg" />
                    </div>
                    <div>
                        <h2 class="text-base font-heading font-semibold text-slate-900">Map Address</h2>
                        <p class="text-xs text-slate-400">Address shown on the contact page</p>
                    </div>
                </div>
                <input v-model="settings.map_address" type="text"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="Plot 491A Parkview Estates Chalala, Lusaka, Zambia" />
            </div>

            <!-- Map Coordinates -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div class="flex items-center gap-3 mb-5">
                    <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Icon name="lucide:locate" class="text-lg" />
                    </div>
                    <div>
                        <h2 class="text-base font-heading font-semibold text-slate-900">Map Coordinates</h2>
                        <p class="text-xs text-slate-400">Latitude and Longitude for the map marker</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-slate-500 mb-1">Latitude</label>
                        <input v-model="settings.map_lat" type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="-15.4167" />
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-500 mb-1">Longitude</label>
                        <input v-model="settings.map_lng" type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="28.2833" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Save -->
        <div class="flex justify-end mt-6">
            <button @click="saveSettings" :disabled="saving"
                class="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-sm disabled:opacity-50 cursor-pointer flex items-center gap-2">
                <Icon v-if="saving" name="lucide:loader-2" class="text-lg animate-spin" />
                <Icon v-else name="lucide:save" class="text-lg" />
                {{ saving ? 'Saving...' : 'Save Settings' }}
            </button>
        </div>

        <!-- Success toast -->
        <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="saved"
                class="fixed bottom-6 right-6 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2">
                <Icon name="lucide:check-circle" class="text-lg" />
                Settings saved successfully
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ title: 'Settings — AMA Admin' })

const { token } = useAuth()

const settings = reactive({
    contact_email: '',
    contact_phone: '',
    business_hours: '',
    map_address: '',
    map_lat: '',
    map_lng: '',
})

const saving = ref(false)
const saved = ref(false)

onMounted(async () => {
    if (!token.value) { navigateTo('/admin/login'); return }
    try {
        const data = await $fetch<Record<string, string>>('/api/admin/settings', {
            headers: { Authorization: `Bearer ${token.value}` }
        })
        Object.assign(settings, data)
    } catch { }
})

async function saveSettings() {
    saving.value = true
    try {
        await $fetch('/api/admin/settings', {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token.value}` },
            body: { ...settings }
        })
        saved.value = true
        setTimeout(() => { saved.value = false }, 3000)
    } catch { }
    saving.value = false
}
</script>
