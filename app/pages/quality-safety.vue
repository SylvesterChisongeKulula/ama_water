<template>
    <div>
        <!-- Hero Banner -->
        <section class="relative pt-32 pb-20 bg-gradient-to-br from-primary-dark to-primary">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Quality & Safety</h1>
                <p class="text-white/80 text-lg max-w-xl mx-auto">Our rigorous processes ensure every bottle meets the
                    highest quality and safety standards.</p>
            </div>
        </section>

        <!-- Today's Water Quality Section -->
        <section class="py-20 bg-slate-50/50">
            <div class="max-w-5xl mx-auto px-6">
                <!-- Header -->
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3">Today's Water Quality
                    </h2>
                    <div class="w-20 h-1.5 bg-[#0084ff] mx-auto rounded-full mb-4"></div>
                    <p v-if="lastTested" class="text-slate-500 text-sm font-medium">Last Tested: <span
                            class="text-[#4b6a8e]">{{ lastTested }}</span></p>
                </div>

                <!-- Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div v-for="entry in qualityEntries" :key="entry.id"
                        class="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                        <div
                            class="w-16 h-16 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#0084ff] mb-6">
                            <Icon :name="entry.icon || 'lucide:droplets'" class="text-[28px]" />
                        </div>
                        <h3 class="text-slate-600 font-medium text-[15px] mb-2">{{ entry.label }}</h3>
                        <p class="text-[32px] font-bold text-[#0f2c59] mb-2 tracking-tight">
                            <template v-if="entry.unit === 'pH'">pH: </template>{{ entry.value }}<template
                                v-if="entry.unit && entry.unit !== 'pH'"> {{ entry.unit }}</template>
                        </p>
                        <p class="text-sm"
                            :class="entry.subtitle === 'Perfectly Balanced' ? 'text-[#22c55e] italic font-medium' : 'text-slate-400'">
                            {{
                            entry.subtitle }}</p>
                    </div>
                </div>

                <!-- Footer Text -->
                <div class="max-w-3xl mx-auto text-center flex flex-col items-center">
                    <p class="text-slate-500 italic text-[15px] leading-relaxed mb-8">
                        "{{ qualityQuote }}"
                    </p>
                    <img src="~/assets/ZABS_Certificate.png" alt="ZABS Certificate"
                        class="h-24 w-auto object-contain" />
                </div>
            </div>
        </section>
        <!-- Standards Section -->
        <section class="py-20 bg-white">
            <div class="max-w-5xl mx-auto px-6">
                <div class="text-center mb-14">
                    <h2 class="text-3xl font-heading font-bold text-text-primary mb-3">Our Standards</h2>
                    <p class="text-text-secondary max-w-lg mx-auto">We adhere to international water quality standards
                        and go beyond compliance.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div v-for="standard in standards" :key="standard.title"
                        class="flex gap-5 p-6 rounded-2xl bg-surface">
                        <div
                            class="w-12 h-12 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                            <Icon :name="standard.icon" class="text-2xl" />
                        </div>
                        <div>
                            <h3 class="text-base font-heading font-semibold text-text-primary mb-1">{{ standard.title }}
                            </h3>
                            <p class="text-sm text-text-secondary leading-relaxed">{{ standard.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Process Section -->
        <section class="py-20 bg-surface">
            <div class="max-w-5xl mx-auto px-6">
                <div class="text-center mb-14">
                    <h2 class="text-3xl font-heading font-bold text-text-primary mb-3">Our Process</h2>
                    <p class="text-text-secondary max-w-lg mx-auto">From source to shelf, every step is carefully
                        monitored.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div v-for="(step, i) in processSteps" :key="step.title" class="text-center">
                        <div
                            class="w-14 h-14 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mb-4">
                            {{ i + 1 }}
                        </div>
                        <h3 class="text-sm font-heading font-semibold text-text-primary mb-1">{{ step.title }}</h3>
                        <p class="text-xs text-text-secondary leading-relaxed">{{ step.description }}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Quality & Safety — AMA Water',
    meta: [
        { name: 'description', content: 'Discover AMA Water\'s commitment to water quality and safety — certified processes, lab testing, and international standards.' },
    ],
})

// Fetch water quality data from API
const { data: qualityData } = await useFetch<{ entries: any[]; quote: string }>('/api/water-quality', {
    default: () => ({ entries: [], quote: '' }),
})

const qualityEntries = computed(() => qualityData.value?.entries || [])
const qualityQuote = computed(() => qualityData.value?.quote || 'Our water undergoes rigorous multi-stage filtration including Reverse Osmosis, Carbon Filtration, and UV Treatment to meet ZABS standards.')

const lastTested = computed(() => {
    const first = qualityEntries.value[0]
    if (!first?.last_tested) return null
    return new Date(first.last_tested).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
})

const standards = [
    {
        icon: 'lucide:award',
        title: 'ISO 22000 Certified',
        description: 'Our facilities are certified under ISO 22000 food safety management systems.',
    },
    {
        icon: 'lucide:microscope',
        title: 'Daily Lab Testing',
        description: 'Each production batch is tested for microbial safety, mineral content, and pH balance.',
    },
    {
        icon: 'lucide:clipboard-check',
        title: 'SANS 241 Compliant',
        description: 'We meet and exceed the South African National Standard for drinking water quality.',
    },
    {
        icon: 'lucide:shield-check',
        title: 'HACCP Protocols',
        description: 'Hazard Analysis and Critical Control Points integrated throughout production.',
    },
]

const processSteps = [
    { title: 'Source', description: 'Water drawn from protected underground aquifers.' },
    { title: 'Filter', description: 'Multi-stage filtration while preserving natural minerals.' },
    { title: 'Test', description: 'Comprehensive laboratory analysis of every batch.' },
    { title: 'Bottle', description: 'Sealed in sterile conditions with tamper-proof packaging.' },
]
</script>
