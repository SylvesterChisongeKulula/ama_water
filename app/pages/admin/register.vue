<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
        <div class="w-full max-w-md">
            <!-- Logo -->
            <div class="text-center mb-8">
                <img src="~/assets/logo.png" alt="AMA Water Logo" class="w-20 h-20 mx-auto mb-4 object-contain" />
                <h1 class="text-2xl font-heading font-bold text-white">Create an account</h1>
                <p class="text-slate-400 text-sm mt-1">Register for AMA Water Admin</p>
            </div>

            <!-- Form Card -->
            <div class="bg-white rounded-2xl p-8 shadow-2xl shadow-black/20">
                <form @submit.prevent="handleRegister" class="space-y-5">
                    <div v-if="error"
                        class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                        {{ error }}
                    </div>

                    <div>
                        <label for="reg-name" class="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                        <input id="reg-name" v-model="name" type="text" required autocomplete="name"
                            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="John Doe" />
                    </div>

                    <div>
                        <label for="reg-email" class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                        <input id="reg-email" v-model="email" type="email" required autocomplete="email"
                            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="admin@amawater.com" />
                    </div>

                    <div>
                        <label for="reg-password"
                            class="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                        <input id="reg-password" v-model="password" type="password" required autocomplete="new-password"
                            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="Min 6 characters" />
                    </div>

                    <button type="submit" :disabled="loading"
                        class="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer">
                        <span v-if="loading">Creating account...</span>
                        <span v-else>Create Account</span>
                    </button>
                </form>

                <p class="text-center text-sm text-slate-500 mt-6">
                    Already have an account?
                    <NuxtLink to="/admin/login" class="text-primary font-medium hover:underline">Sign In</NuxtLink>
                </p>
            </div>

            <!-- Back to site -->
            <p class="text-center mt-6">
                <NuxtLink to="/"
                    class="text-slate-400 text-sm hover:text-white transition-colors flex items-center justify-center gap-1">
                    <Icon name="lucide:arrow-left" class="text-sm" />
                    Back to website
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({ title: 'Register — AMA Admin' })

const { register, loading, error } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')

async function handleRegister() {
    const success = await register(name.value, email.value, password.value)
    if (success) {
        navigateTo('/admin')
    }
}
</script>
