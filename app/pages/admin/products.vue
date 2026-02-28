<template>
    <div class="p-6 md:p-8">
        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-2xl font-heading font-bold text-slate-900">Products</h1>
                <p class="text-slate-500 text-sm mt-1">Manage products displayed on the website</p>
            </div>
            <button @click="openForm()"
                class="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-sm cursor-pointer flex items-center gap-2">
                <Icon name="lucide:plus" class="text-lg" />
                Add Product
            </button>
        </div>

        <!-- Products Table -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b border-slate-100 bg-slate-50/50">
                            <th class="text-left px-6 py-3.5 font-semibold text-slate-600">Name</th>
                            <th class="text-left px-6 py-3.5 font-semibold text-slate-600">Size</th>
                            <th class="text-left px-6 py-3.5 font-semibold text-slate-600">Category</th>
                            <th class="text-left px-6 py-3.5 font-semibold text-slate-600">Price</th>
                            <th class="text-left px-6 py-3.5 font-semibold text-slate-600">Stock</th>
                            <th class="text-right px-6 py-3.5 font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id"
                            class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                        <Icon :name="product.icon || 'lucide:package'" class="text-lg" />
                                    </div>
                                    <span class="font-medium text-slate-900">{{ product.name }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-slate-600">{{ product.size }}</td>
                            <td class="px-6 py-4">
                                <span class="px-2.5 py-1 rounded-lg text-xs font-medium capitalize"
                                    :class="product.category === 'still' ? 'bg-blue-50 text-blue-600' : product.category === 'sparkling' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'">
                                    {{ product.category }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-slate-600">K{{ product.price }}</td>
                            <td class="px-6 py-4">
                                <span class="w-2 h-2 rounded-full inline-block mr-1.5"
                                    :class="product.in_stock ? 'bg-emerald-500' : 'bg-red-400'"></span>
                                <span class="text-slate-600">{{ product.in_stock ? 'In Stock' : 'Out' }}</span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button @click="openForm(product)"
                                    class="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer">
                                    <Icon name="lucide:pencil" class="text-base" />
                                </button>
                                <button @click="deleteProduct(product.id)"
                                    class="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all ml-1 cursor-pointer">
                                    <Icon name="lucide:trash-2" class="text-base" />
                                </button>
                            </td>
                        </tr>
                        <tr v-if="products.length === 0">
                            <td colspan="6" class="px-6 py-12 text-center text-slate-400">No products yet. Add your
                                first product.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal Form -->
        <Teleport to="body">
            <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition duration-150" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    @click.self="showForm = false">
                    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 class="text-lg font-heading font-bold text-slate-900">
                                {{ editingProduct ? 'Edit Product' : 'Add Product' }}
                            </h2>
                            <button @click="showForm = false"
                                class="p-1 rounded-lg hover:bg-slate-100 transition-all cursor-pointer">
                                <Icon name="lucide:x" class="text-xl text-slate-400" />
                            </button>
                        </div>
                        <form @submit.prevent="saveProduct" class="p-6 space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input v-model="form.name" type="text" required
                                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                                <input v-model="form.slug" type="text" required
                                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    placeholder="e.g. ama-still" />
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-1">Size</label>
                                    <input v-model="form.size" type="text" required
                                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                        placeholder="500ml · 1L" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-1">Price (K)</label>
                                    <input v-model.number="form.price" type="number" step="0.01"
                                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select v-model="form.category"
                                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                                        <option value="still">Still</option>
                                        <option value="sparkling">Sparkling</option>
                                        <option value="active">Active</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                                    <input v-model="form.icon" type="text"
                                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                        placeholder="lucide:glass-water" />
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea v-model="form.description" rows="3" required
                                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"></textarea>
                            </div>
                            <div class="flex items-center gap-2">
                                <input id="in-stock" v-model="form.in_stock" type="checkbox"
                                    class="rounded border-slate-300" />
                                <label for="in-stock" class="text-sm text-slate-700">In Stock</label>
                            </div>
                            <div class="flex gap-3 pt-2">
                                <button type="button" @click="showForm = false"
                                    class="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all cursor-pointer">
                                    Cancel
                                </button>
                                <button type="submit"
                                    class="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all cursor-pointer">
                                    {{ editingProduct ? 'Update' : 'Create' }}
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
useHead({ title: 'Products — AMA Admin' })

const { token } = useAuth()

onMounted(() => {
    if (!token.value) { navigateTo('/admin/login'); return }
    loadProducts()
})

const products = ref<any[]>([])
const showForm = ref(false)
const editingProduct = ref<any>(null)

const form = reactive({
    name: '',
    slug: '',
    size: '',
    description: '',
    price: 0,
    category: 'still',
    icon: 'lucide:glass-water',
    in_stock: true,
})

function resetForm() {
    form.name = ''
    form.slug = ''
    form.size = ''
    form.description = ''
    form.price = 0
    form.category = 'still'
    form.icon = 'lucide:glass-water'
    form.in_stock = true
}

function openForm(product?: any) {
    if (product) {
        editingProduct.value = product
        Object.assign(form, { ...product, in_stock: !!product.in_stock })
    } else {
        editingProduct.value = null
        resetForm()
    }
    showForm.value = true
}

async function loadProducts() {
    try {
        products.value = await $fetch<any[]>('/api/admin/products', {
            headers: { Authorization: `Bearer ${token.value}` }
        })
    } catch { }
}

async function saveProduct() {
    try {
        if (editingProduct.value) {
            await $fetch(`/api/admin/products/${editingProduct.value.id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token.value}` },
                body: { ...form, in_stock: form.in_stock ? 1 : 0 },
            })
        } else {
            await $fetch('/api/admin/products', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token.value}` },
                body: { ...form, in_stock: form.in_stock ? 1 : 0 },
            })
        }
        showForm.value = false
        await loadProducts()
    } catch (e: any) {
        alert(e.data?.message || 'Failed to save product')
    }
}

async function deleteProduct(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
        await $fetch(`/api/admin/products/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token.value}` }
        })
        await loadProducts()
    } catch { }
}
</script>
