<template>
    <div>
        <!-- Hero Banner -->
        <section class="relative pt-32 pb-20 bg-gradient-to-br from-primary-dark to-primary">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Products</h1>
                <p class="text-white/80 text-lg max-w-xl mx-auto">Premium mineral water for every occasion — from
                    everyday hydration to special events.</p>
            </div>
        </section>

        <!-- Products Grid -->
        <section class="py-20 bg-white">
            <div class="max-w-6xl mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="product in products" :key="product.id || product.name"
                        class="group rounded-2xl border border-surface-muted overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div
                            class="aspect-square bg-gradient-to-br from-secondary-light to-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <Icon :name="product.icon || 'lucide:glass-water'" class="text-7xl text-white opacity-80" />
                        </div>
                        <div class="p-6">
                            <h3 class="text-lg font-heading font-semibold text-text-primary mb-1">{{ product.name }}
                            </h3>
                            <p class="text-sm text-text-light mb-3">{{ product.size }}</p>
                            <p class="text-sm text-text-secondary leading-relaxed">{{ product.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Products — AMA Water',
    meta: [
        { name: 'description', content: 'Explore AMA Water\'s range of premium mineral water products — available in multiple sizes for every occasion.' },
    ],
})

const { data: products } = await useFetch<any[]>('/api/products', { default: () => [] })
</script>
