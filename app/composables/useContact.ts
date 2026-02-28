/**
 * Composable for contact form operations.
 */
export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export const useContact = () => {
  const submitting = ref(false)
  const success = ref(false)
  const error = ref<string | null>(null)

  const submitContact = async (payload: ContactPayload) => {
    submitting.value = true
    success.value = false
    error.value = null
    try {
      await $fetch('/api/contact', {
        method: 'POST',
        body: payload,
      })
      success.value = true
    } catch (e: any) {
      error.value = e.message || 'Failed to send message'
    } finally {
      submitting.value = false
    }
  }

  return {
    submitting,
    success,
    error,
    submitContact,
  }
}
