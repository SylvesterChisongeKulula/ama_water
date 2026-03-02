<template>
    <div>
        <!-- Hero Banner -->
        <section class="relative pt-32 pb-20 bg-gradient-to-br from-primary-dark to-primary">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">About Us</h1>
                <p class="text-white/80 text-lg max-w-xl mx-auto">The story behind AMA Water — our mission, values, and
                    commitment to purity.</p>
            </div>
        </section>

        <!-- Story Section -->
        <section class="py-20 bg-white">
            <div class="max-w-5xl mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span class="text-sm font-semibold text-primary uppercase tracking-wider">Our Story</span>
                        <h2 class="text-3xl font-heading font-bold text-text-primary mt-2 mb-6">From Source to Sip</h2>
                        <p class="text-text-secondary leading-relaxed mb-4">
                            AMA Water was founded with a simple belief — everyone deserves access to pure, mineral-rich
                            water. Our journey began at the foothills of pristine mountain springs, where nature does
                            the filtering.
                        </p>
                        <p class="text-text-secondary leading-relaxed">
                            Today, we combine traditional sourcing wisdom with modern bottling technology to deliver
                            water that is as close to nature's intent as possible.
                        </p>
                    </div>
                    <div class="aspect-video rounded-2xl overflow-hidden shadow-lg">
                        <img src="https://sly-moore-klwwx.sevalla.storage/ama_water/about_us.png" alt="About AMA Water"
                            class="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section class="py-20 bg-surface">
            <div class="max-w-5xl mx-auto px-6">
                <div class="text-center mb-14">
                    <h2 class="text-3xl font-heading font-bold text-text-primary mb-3">Our Values</h2>
                    <p class="text-text-secondary max-w-lg mx-auto">Guiding principles that shape everything we do.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="value in values" :key="value.title" class="bg-white p-8 rounded-2xl shadow-sm">
                        <Icon :name="value.icon" class="text-4xl mb-4 block text-primary" />
                        <h3 class="text-lg font-heading font-semibold text-text-primary mb-2">{{ value.title }}</h3>
                        <p class="text-sm text-text-secondary leading-relaxed">{{ value.description }}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'About Us — AMA Water',
    meta: [
        { name: 'description', content: 'Learn about AMA Water\'s mission, values, and commitment to delivering pure natural mineral water.' },
    ],
})

const values = [
    {
        icon: 'lucide:waves',
        title: 'Purity First',
        description: 'We never compromise on the quality and purity of our water. Every drop meets the highest standards.',
    },
    {
        icon: 'lucide:recycle',
        title: 'Sustainability',
        description: 'From sourcing to packaging, we prioritize environmental responsibility at every step.',
    },
    {
        icon: 'lucide:users',
        title: 'Community',
        description: 'We invest in the communities around our water sources, ensuring shared prosperity and stewardship.',
    },
]
</script>
