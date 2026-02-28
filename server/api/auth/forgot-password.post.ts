import { Resend } from 'resend'
import { config } from '@vue-email/compiler'
import { randomBytes } from 'crypto'
import path from 'path'

const vueEmail = config(path.resolve(process.cwd(), 'emails'))

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body || {}

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' })
  }

  const db = useDb()
  const user = await db.user.findUnique({ where: { email } })

  // Security: Always return success even if user doesn't exist to prevent email enumeration attacks
  if (!user) {
    return { success: true, message: 'If that email is registered, a reset link will be sent.' }
  }

  // Generate random token and expiry (1 hour)
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

  // Save to database
  await db.user.update({
    where: { id: user.id },
    data: {
      reset_token: token,
      reset_token_expires: expiresAt
    }
  })

  // Construct dynamic fully qualified URL based on the request host
  const host = getRequestHost(event, { xForwardedHost: true }) || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const resetLink = `${protocol}://${host}/admin/reset-password?token=${token}`

  // Send Email
  const runConfig = useRuntimeConfig()
  if (!runConfig.resendApiKey) {
    console.warn('⚠️ Missing RESEND_API_KEY. Simulated Email Delivery:')
    console.warn(`--> Reset Link: ${resetLink}`)
    return { success: true, message: 'If that email is registered, a reset link will be sent.' }
  }

  const resend = new Resend(runConfig.resendApiKey)

  try {
    const template = await vueEmail.render('ResetPassword.vue', {
      props: {
        name: user.name,
        resetLink,
      }
    })

    const { data, error } = await resend.emails.send({
      from: 'AMA Water Security <onboarding@resend.dev>', // Change to verified domain
      to: [user.email],
      subject: 'Reset your AMA Water admin password',
      html: template.html,
      text: template.text,
    })

    if (error) {
      console.error('Resend API Error:', error)
      throw createError({ statusCode: 500, statusMessage: error.message })
    }

    return { success: true, message: 'If that email is registered, a reset link will be sent.' }
  } catch (error: any) {
    console.error('Email sending failed:', error)
    throw createError({ statusCode: 500, statusMessage: error?.message || 'Failed to send password reset email.' })
  }
})
