/**
 * Composable for authentication state and actions.
 */
export const useAuth = () => {
  const user = useState<{ id: number; name: string; email: string } | null>('auth_user', () => null)
  const token = useCookie('auth_token', { maxAge: 60 * 60 * 24 }) // 24h cookie
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<any>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      if (res.requires2FA) {
        return { success: true, requires2FA: true }
      }
      token.value = res.token
      user.value = res.user
      return { success: true, requires2FA: false }
    } catch (e: any) {
      error.value = e.data?.message || e.statusMessage || 'Login failed'
      return { success: false }
    } finally {
      loading.value = false
    }
  }

  const verify2FA = async (email: string, code: string) => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{ token: string; user: any }>('/api/auth/verify-2fa', {
        method: 'POST',
        body: { email, code },
      })
      token.value = res.token
      user.value = res.user
      return true
    } catch (e: any) {
      error.value = e.data?.message || e.statusMessage || 'Invalid 2FA code'
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (name: string, email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{ token: string; user: any }>('/api/auth/register', {
        method: 'POST',
        body: { name, email, password },
      })
      token.value = res.token
      user.value = res.user
      return true
    } catch (e: any) {
      error.value = e.data?.message || e.statusMessage || 'Registration failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
      })
    } catch { }
    token.value = null
    user.value = null
    navigateTo('/admin/login')
  }

  const fetchUser = async () => {
    if (!token.value) return
    try {
      const res = await $fetch<{ user: any }>('/api/auth/me', {
        headers: { Authorization: `Bearer ${token.value}` },
      })
      user.value = res.user
    } catch {
      token.value = null
      user.value = null
    }
  }

  return { user, token, loading, error, isAuthenticated, login, verify2FA, register, logout, fetchUser }
}
