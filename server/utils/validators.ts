/**
 * Server utility: Validation helpers.
 * Equivalent to utils/ in Go backend.
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validateRequired(value: string, fieldName: string): void {
  if (!value || !value.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: `${fieldName} is required`,
    })
  }
}
