export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { token, newPassword } = body || {}

  if (!token || !newPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Token and new password are required' })
  }

  if (newPassword.length < 6) {
    throw createError({ statusCode: 400, statusMessage: 'Password must be at least 6 characters' })
  }

  const db = useDb()
  
  // Look up user by the reset token strictly
  const user = await db.user.findFirst({
    where: {
      reset_token: token
    }
  })

  // Verify token exists and hasn't expired
  if (!user || !user.reset_token_expires || user.reset_token_expires < new Date()) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid or expired password reset token' })
  }

  // Hash the new password securely
  const hashedPassword = await hashPassword(newPassword)

  // Update user's password and instantly wipe the reset token
  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      reset_token: null,
      reset_token_expires: null
    }
  })

  return { success: true, message: 'Password has been successfully reset' }
})
