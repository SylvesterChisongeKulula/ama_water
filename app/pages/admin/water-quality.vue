<template>
    <div class="p-6 md:p-8">
        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-2xl font-heading font-bold text-slate-900">Water Quality</h1>
                <p class="text-slate-500 text-sm mt-1">Manage water quality data shown on Quality & Safety page</p>
            </div>
            <button @click="openForm()"
                class="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-sm cursor-pointer flex items-center gap-2">
                <Icon name="lucide:plus" class="text-lg" />
                Add Metric
            </button>
        </div>

        <!-- Quality Metrics Table -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b border-slate-100 bg-slate-50/50">
                            <th class="text-left px-6 py-3.5 font-semibold text-slate-600">Label</th>
                            <th class="text-left px-6 py-3.5 font-semibold text-slate-600">Value</th>
                            <th class="text-left px-6 py-3.5 font-semibold text-slate-600">Unit</th>
                            <th class="text-left px-6 py-3.5 font-semibold text-slate-600">Subtitle</th>
                            <th class="text-left px-6 py-3.5 font-semibold text-slate-600">Last Tested</th>
                            <th class="text-right px-6 py-3.5 font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in entries" :key="item.id"
                            class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <Icon :name="item.icon || 'lucide:droplets'" class="text-lg" />
                                    </div>
                                    <span class="font-medium text-slate-900">{{ item.label }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 font-bold text-slate-900">{{ item.value }}</td>
                            <td class="px-6 py-4 text-slate-600">{{ item.unit }}</td>
                            <td class="px-6 py-4 text-slate-500 italic">{{ item.subtitle }}</td>
                            <td class="px-6 py-4 text-slate-600">{{ item.last_tested }}</td>
                            <td class="px-6 py-4 text-right">
                                <button @click="openForm(item)"
                                    class="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer">
                                    <Icon name="lucide:pencil" class="text-base" />
                                </button>
                                <button @click="deleteEntry(item.id)"
                                    class="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all ml-1 cursor-pointer">
                                    <Icon name="lucide:trash-2" class="text-base" />
                                </button>
                            </td>
                        </tr>
                        <tr v-if="entries.length === 0">
                            <td colspan="6" class="px-6 py-12 text-center text-slate-400">No water quality metrics yet.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Quality Quote -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 class="text-base font-heading font-semibold text-slate-900 mb-4">Filtration Quote</h2>
            <p class="text-xs text-slate-400 mb-3">Displayed below the water quality cards on the public page</p>
            <textarea v-model="quote" rows="3"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"></textarea>
            <div class="flex justify-end mt-3">
                <button @click="saveQuote"
                    class="px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all cursor-pointer">
                    Save Quote
                </button>
            </div>
        </div>

        <!-- Modal Form -->
        <Teleport to="body">
            <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition duration-150" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    @click.self="showForm = false">
                    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 class="text-lg font-heading font-bold text-slate-900">
                                {{ editingEntry ? 'Edit Metric' : 'Add Metric' }}
                            </h2>
                            <button @click="showForm = false"
                                class="p-1 rounded-lg hover:bg-slate-100 transition-all cursor-pointer">
                                <Icon name="lucide:x" class="text-xl text-slate-400" />
                            </button>
                        </div>
                        <form @submit.prevent="saveEntry" class="p-6 space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-1">Label</label>
                                    <input v-model="form.label" type="text" required
                                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                        placeholder="e.g. Acidity Level" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-1">Value</label>
                                    <input v-model="form.value" type="text" required
                                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                        placeholder="e.g. 7.2" />
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                                    <input v-model="form.unit" type="text"
                                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                        placeholder="e.g. pH, mg/L" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                                    <input v-model="form.icon" type="text"
                                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                        placeholder="lucide:flask-conical" />
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                                    <input v-model="form.subtitle" type="text"
                                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                        placeholder="e.g. Perfectly Balanced" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
                                    <input v-model.number="form.sort_order" type="number"
                                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Last Tested Date</label>
                                <input v-model="form.last_tested" type="date"
                                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                            </div>
                            <div class="flex gap-3 pt-2">
                                <button type="button" @click="showForm = false"
                                    class="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all cursor-pointer">
                                    Cancel
                                </button>
                                <button type="submit"
                                    class="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all cursor-pointer">
                                    {{ editingEntry ? 'Update' : 'Create' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ title: 'Water Quality — AMA Admin' })

const { token } = useAuth()

onMounted(() => {
    if (!token.value) { navigateTo('/admin/login'); return }
    loadEntries()
    loadQuote()
})

const entries = ref<any[]>([])
const quote = ref('')
const showForm = ref(false)
const editingEntry = ref<any>(null)

const form = reactive({
    label: '',
    value: '',
    unit: '',
    subtitle: '',
    icon: 'lucide:droplets',
    sort_order: 0,
    last_tested: new Date().toISOString().split('T')[0],
})

function openForm(entry?: any) {
    if (entry) {
        editingEntry.value = entry
        Object.assign(form, entry)
    } else {
        editingEntry.value = null
        form.label = ''
        form.value = ''
        form.unit = ''
        form.subtitle = ''
        form.icon = 'lucide:droplets'
        form.sort_order = 0
        form.last_tested = new Date().toISOString().split('T')[0]
    }
    showForm.value = true
}

async function loadEntries() {
    try {
        entries.value = await $fetch<any[]>('/api/admin/water-quality', {
            headers: { Authorization: `Bearer ${token.value}` }
        })
    } catch { }
}

async function loadQuote() {
    try {
        const settings = await $fetch<Record<string, string>>('/api/admin/settings', {
            headers: { Authorization: `Bearer ${token.value}` }
        })
        quote.value = settings.quality_quote || ''
    } catch { }
}

async function saveEntry() {
    try {
        if (editingEntry.value) {
            await $fetch(`/api/admin/water-quality/${editingEntry.value.id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token.value}` },
                body: { ...form }
            })
        } else {
            await $fetch('/api/admin/water-quality', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token.value}` },
                body: { ...form }
            })
        }
        showForm.value = false
        await loadEntries()
    } catch (e: any) {
        alert(e.data?.message || 'Failed to save')
    }
}

async function deleteEntry(id: number) {
    if (!confirm('Delete this metric?')) return
    try {
        await $fetch(`/api/admin/water-quality/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token.value}` }
        })
        await loadEntries()
    } catch { }
}

async function saveQuote() {
    try {
        await $fetch('/api/admin/settings', {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token.value}` },
            body: { quality_quote: quote.value }
        })
        alert('Quote saved!')
    } catch { }
}
</script>
