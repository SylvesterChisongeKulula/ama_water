<template>
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <div class="flex justify-center text-primary mb-6">
                <Icon name="lucide:droplets" class="text-5xl" />
            </div>
            <h2 class="text-center text-3xl font-heading font-bold tracking-tight text-slate-900">
                Reset your password
            </h2>
            <p class="mt-2 text-center text-sm text-slate-600">
                Enter your email address to receive a password reset link.
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div
                class="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
                <form @submit.prevent="handleForgot" class="space-y-6">
                    <div v-if="success"
                        class="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm">
                        {{ successMessage }}
                    </div>
                    <div v-if="error" class="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                        {{ error }}
                    </div>

                    <div v-if="!success">
                        <label for="email" class="block text-sm font-medium text-slate-700">Email address</label>
                        <div class="mt-2">
                            <input id="email" v-model="email" name="email" type="email" autocomplete="email" required
                                class="block w-full rounded-xl border-slate-200 py-2.5 px-4 text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-slate-50 outline-none border transition-all"
                                placeholder="admin@amawater.com" />
                        </div>
                    </div>

                    <div v-if="!success">
                        <button type="submit" :disabled="loading"
                            class="flex w-full justify-center items-center gap-2 rounded-xl bg-primary py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer">
                            <Icon v-if="loading" name="lucide:loader-2" class="text-lg animate-spin" />
                            {{ loading ? 'Sending link...' : 'Send reset link' }}
                        </button>
                    </div>

                    <div class="mt-6 text-center text-sm">
                        <NuxtLink to="/admin/login"
                            class="font-medium text-primary hover:text-primary-dark transition-colors">
                            Return to login
                        </NuxtLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ title: 'Forgot Password — AMA Admin' })

const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)
const successMessage = ref('')

async function handleForgot() {
    loading.value = true
    error.value = ''

    try {
        const res = await $fetch<{ success: boolean; message: string }>('/api/auth/forgot-password', {
            method: 'POST',
            body: { email: email.value }
        })
        success.value = true
        successMessage.value = res.message
    } catch (err: any) {
        error.value = err.data?.message || 'Something went wrong. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>
