<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
        <div class="w-full max-w-md">
            <!-- Logo -->
            <div class="text-center mb-8">
                <img src="https://sly-moore-klwwx.sevalla.storage/ama_water/logo.png" alt="AMA Water Logo"
                    class="w-20 h-20 mx-auto mb-4 object-contain" />
                <h1 v-if="requires2FA" class="text-2xl font-heading font-bold text-white">Security Check</h1>
                <h1 v-else class="text-2xl font-heading font-bold text-white">Welcome back</h1>
                <p v-if="requires2FA" class="text-slate-400 text-sm mt-1">Enter the 4-digit code sent to your email</p>
                <p v-else class="text-slate-400 text-sm mt-1">Sign in to AMA Water Admin</p>
            </div>

            <!-- Form Card -->
            <div class="bg-white rounded-2xl p-8 shadow-2xl shadow-black/20">
                <form v-if="!requires2FA" @submit.prevent="handleLogin" class="space-y-5">
                    <div v-if="error"
                        class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                        {{ error }}
                    </div>

                    <div>
                        <label for="login-email" class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                        <input id="login-email" v-model="email" type="email" required autocomplete="email"
                            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="admin@amawater.com" />
                    </div>

                    <div>
                        <div class="flex items-center justify-between mb-1.5">
                            <label for="login-password"
                                class="block text-sm font-medium text-slate-700">Password</label>
                            <NuxtLink to="/admin/forgot-password"
                                class="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                                Forgot password?
                            </NuxtLink>
                        </div>
                        <input id="login-password" v-model="password" type="password" required
                            autocomplete="current-password"
                            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="••••••••" />
                    </div>

                    <button type="submit" :disabled="loading"
                        class="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer">
                        <span v-if="loading">Signing in...</span>
                        <span v-else>Sign In</span>
                    </button>
                </form>

                <form v-else @submit.prevent="handleVerify" class="space-y-5">
                    <div v-if="error"
                        class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                        {{ error }}
                    </div>

                    <div>
                        <label for="login-code" class="block text-sm font-medium text-slate-700 mb-1.5">4-Digit
                            Code</label>
                        <input id="login-code" v-model="code" type="text" required maxlength="4"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-mono"
                            placeholder="0000" />
                    </div>

                    <button type="submit" :disabled="loading"
                        class="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
                        <Icon v-if="loading" name="lucide:loader-2" class="text-lg animate-spin" />
                        {{ loading ? 'Verifying...' : 'Verify & Sign In' }}
                    </button>

                    <button type="button" @click="requires2FA = false" :disabled="loading"
                        class="w-full pt-1 text-sm text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50 cursor-pointer">
                        Back to Login
                    </button>
                </form>

                <p v-if="!requires2FA" class="text-center text-sm text-slate-500 mt-6">
                    Don't have an account?
                    <NuxtLink to="/admin/register" class="text-primary font-medium hover:underline">Register</NuxtLink>
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

useHead({ title: 'Login — AMA Admin' })

const { login, verify2FA, loading, error } = useAuth()

const requires2FA = ref(false)
const email = ref('')
const password = ref('')
const code = ref('')

async function handleLogin() {
    const res = await login(email.value, password.value)
    if (res.success && res.requires2FA) {
        requires2FA.value = true
        code.value = ''
    } else if (res.success) {
        navigateTo('/admin')
    }
}

async function handleVerify() {
    const success = await verify2FA(email.value, code.value)
    if (success) {
        navigateTo('/admin')
    }
}
</script>
