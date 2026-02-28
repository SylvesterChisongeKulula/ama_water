import { randomInt } from 'crypto'
import { Resend } from 'resend'
import { config } from '@vue-email/compiler'
import path from 'path'

const vueEmail = config(path.resolve(process.cwd(), 'emails'))

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body || {}

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const db = useDb()
  const user = await db.user.findUnique({ where: { email } })

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  // Cryptographically generate purely numeric 4-digit token
  // range: 1000 - 9999
  const code = randomInt(1000, 10000).toString()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  await db.user.update({
    where: { id: user.id },
    data: {
      two_factor_code: code,
      two_factor_expires: expiresAt
    }
  })

  // Send 2FA email
  const runConfig = useRuntimeConfig()
  
  if (!runConfig.resendApiKey) {
    console.warn('⚠️ Missing RESEND_API_KEY. Simulated 2FA Delivery:')
    console.warn(`--> 2FA Code: ${code}`)
    return { requires2FA: true, message: '2FA code sent to your email.' }
  }

  const resend = new Resend(runConfig.resendApiKey)

  try {
    const template = await vueEmail.render('TwoFactorCode.vue', {
      props: { code }
    })

    const { data, error } = await resend.emails.send({
      from: 'AMA Water Security <onboarding@resend.dev>',
      to: [user.email],
      subject: 'Your AMA Water Admin Login Code',
      html: template.html,
      text: template.text,
    })

    if (error) {
      console.error('Resend API Error:', error)
      throw createError({ statusCode: 500, statusMessage: error.message })
    }

    return { requires2FA: true, message: '2FA code sent to your email.' }
  } catch (error: any) {
    console.error('Email sending failed:', error)
    throw createError({ statusCode: 500, statusMessage: error?.message || 'Failed to send 2FA email' })
  }
})
