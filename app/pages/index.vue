<template>
    <div>
        <!-- Hero Section -->
        <section
            class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden pt-28 pb-16">
            <!-- Decorative circles -->
            <div class="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

            <div
                class="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                <!-- Left Content -->
                <div class="text-left text-white max-w-xl order-2 lg:order-1">
                    <span
                        class="inline-block px-4 py-1.5 rounded-full bg-white/10 text-secondary-light text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm border border-white/20">
                        NATURALLY PURIFIED
                    </span>

                    <h1 class="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-tight mb-6">
                        Pure From <br />
                        <span class="text-secondary-light">Source</span> to Bottle
                    </h1>

                    <p class="text-lg text-white/90 mb-10 leading-relaxed font-light">
                        Experience the refreshing taste of hydration. AMA Purified Water is processed with
                        state-of-the-art technology to ensure every drop is clean, healthy, and crystal clear.
                    </p>

                    <div class="flex flex-col sm:flex-row items-start gap-4">
                        <NuxtLink to="/products"
                            class="px-8 py-3.5 rounded-xl bg-secondary-light text-primary-dark font-semibold text-sm hover:bg-white transition-all shadow-lg hover:shadow-xl text-center">
                            Order Now
                        </NuxtLink>
                    </div>
                </div>

                <!-- Right Image Placeholder -->
                <div class="relative flex justify-center lg:justify-end order-1 lg:order-2 mt-8 md:mt-12 lg:mt-0">
                    <!-- Placeholder Container -->
                    <div
                        class="w-4/5 sm:w-2/3 lg:w-full max-w-[260px] lg:max-w-sm xl:max-w-md aspect-[4/5] bg-[#E8DCCF] rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden group">

                        <img src="https://sly-moore-klwwx.sevalla.storage/ama_water/bottle-image.png"
                            alt="AMA Water Bottle" class="w-full h-full object-cover relative z-20" />


                    </div>

                    <!-- Subtle glow behind the image container -->
                    <div class="absolute -inset-4 bg-white/20 rounded-3xl blur-2xl -z-10 opacity-50"></div>
                </div>

            </div>
        </section>

        <!-- Features Section -->
        <section class="py-24 bg-white">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">Why AMA Water?</h2>
                    <p class="text-text-secondary max-w-xl mx-auto">Nature's finest minerals, responsibly sourced and
                        carefully bottled for your wellbeing.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="feature in features" :key="feature.title"
                        class="p-8 rounded-2xl bg-surface hover:shadow-lg transition-all duration-300 group">
                        <div
                            class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all">
                            <Icon :name="feature.icon" class="text-2xl" />
                        </div>
                        <h3 class="text-lg font-heading font-semibold text-text-primary mb-2">{{ feature.title }}</h3>
                        <p class="text-sm text-text-secondary leading-relaxed">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-gradient-to-r from-primary to-primary-light">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Ready to experience pure water?
                </h2>
                <p class="text-white/80 mb-8 max-w-xl mx-auto">Contact us today for bulk orders, distribution
                    partnerships, or to find a retailer near you.</p>
                <NuxtLink to="/contact"
                    class="inline-block px-8 py-3.5 rounded-xl bg-white text-primary-dark font-semibold text-sm hover:bg-secondary-light transition-all shadow-lg">
                    Get in Touch
                </NuxtLink>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'AMA Water — Pure Natural Mineral Water',
    meta: [
        { name: 'description', content: 'AMA Water delivers pure, natural mineral water sourced from pristine springs. Experience purity in every drop.' },
    ],
})

const features = [
    {
        icon: 'lucide:droplets',
        title: 'Natural Spring Source',
        description: 'Our water is drawn from protected underground springs, untouched by surface contaminants.',
    },
    {
        icon: 'lucide:microscope',
        title: 'Lab-Tested Purity',
        description: 'Every batch is rigorously tested in certified laboratories to guarantee safety and mineral balance.',
    },
    {
        icon: 'lucide:leaf',
        title: 'Sustainably Packaged',
        description: 'We use eco-friendly packaging and responsible production methods to protect our planet.',
    },
]
</script>
