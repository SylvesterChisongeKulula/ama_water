<template>
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <div class="flex justify-center text-primary mb-6">
                <Icon name="lucide:key" class="text-5xl" />
            </div>
            <h2 class="text-center text-3xl font-heading font-bold tracking-tight text-slate-900">
                Choose a new password
            </h2>
            <p class="mt-2 text-center text-sm text-slate-600">
                Enter your new secure password below to regain access securely.
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div
                class="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
                <form @submit.prevent="handleReset" class="space-y-6">
                    <div v-if="success"
                        class="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm flex flex-col items-center text-center gap-3">
                        <div>
                            <Icon name="lucide:check-circle-2" class="text-3xl text-emerald-500" />
                        </div>
                        <p>{{ successMessage }}</p>
                        <NuxtLink to="/admin/login"
                            class="mt-2 w-full flex justify-center py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all cursor-pointer">
                            Go to Login
                        </NuxtLink>
                    </div>

                    <div v-if="error" class="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                        {{ error }}
                    </div>

                    <div v-if="!success">
                        <label for="password" class="block text-sm font-medium text-slate-700">New Password</label>
                        <div class="mt-2">
                            <input id="password" v-model="password" name="password" type="password" required
                                class="block w-full rounded-xl border-slate-200 py-2.5 px-4 text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-slate-50 outline-none border transition-all"
                                placeholder="••••••••" />
                        </div>
                    </div>

                    <div v-if="!success">
                        <label for="confirm_password" class="block text-sm font-medium text-slate-700">Confirm
                            Password</label>
                        <div class="mt-2">
                            <input id="confirm_password" v-model="confirmPassword" name="confirm_password"
                                type="password" required
                                class="block w-full rounded-xl border-slate-200 py-2.5 px-4 text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-slate-50 outline-none border transition-all"
                                placeholder="••••••••" />
                        </div>
                    </div>

                    <div v-if="!success">
                        <button type="submit" :disabled="loading"
                            class="flex w-full justify-center items-center gap-2 rounded-xl bg-primary py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer">
                            <Icon v-if="loading" name="lucide:loader-2" class="text-lg animate-spin" />
                            {{ loading ? 'Saving...' : 'Reset password' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ title: 'Reset Password — AMA Admin' })

const route = useRoute()
const token = route.query.token as string

const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)
const successMessage = ref('')

onMounted(() => {
    if (!token) {
        error.value = 'Invalid or missing password reset link.'
    }
})

async function handleReset() {
    if (!token) {
        error.value = 'Missing reset token.'
        return
    }

    if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match.'
        return
    }

    if (password.value.length < 6) {
        error.value = 'Password must be at least 6 characters long.'
        return
    }

    loading.value = true
    error.value = ''

    try {
        const res = await $fetch<{ success: boolean; message: string }>('/api/auth/reset-password', {
            method: 'POST',
            body: {
                token,
                newPassword: password.value
            }
        })
        success.value = true
        successMessage.value = res.message
    } catch (err: any) {
        error.value = err.data?.message || 'Failed to reset password. The link may be expired.'
    } finally {
        loading.value = false
    }
}
</script>
