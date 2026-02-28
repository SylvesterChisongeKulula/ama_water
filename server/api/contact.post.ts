import { Resend } from 'resend'
import { config } from '@vue-email/compiler'
import path from 'path'

const vueEmail = config(path.resolve(process.cwd(), 'emails'))

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, subject, message } = body || {}

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'All fields are required' })
  }

  const runConfig = useRuntimeConfig()
  
  if (!runConfig.resendApiKey) {
    console.warn('⚠️ Missing RESEND_API_KEY. Simulated Contact Form Delivery:')
    console.warn(`--> From: ${name} (${email})\n--> Message: ${message}`)
    return { success: true, id: 'mock-id-123' }
  }

  const resend = new Resend(runConfig.resendApiKey)

  // Fetch the target contact email from the database
  const db = useDb()
  const adminEmailSetting = await db.setting.findUnique({ where: { key: 'contact_email' } })
  const adminEmail = adminEmailSetting?.value || 'info@amawater.com'

  try {
    const template = await vueEmail.render('ContactForm.vue', {
      props: {
        name,
        email,
        message,
      }
    })

    const { data, error } = await resend.emails.send({
      from: 'AMA Water <onboarding@resend.dev>', // You will change this to your verified domain later
      to: [adminEmail],
      replyTo: email,
      subject: subject || `New Contact Request from ${name}`,
      html: template.html,
      text: template.text,
    })

    if (error) {
      console.error('Resend API Error:', error)
      throw createError({ statusCode: 500, statusMessage: error.message || 'Failed to send email' })
    }

    return { success: true, id: data?.id }
  } catch (error: any) {
    console.error('Email sending failed:', error)
    throw createError({ statusCode: 500, statusMessage: error?.message || 'Failed to send email' })
  }
})
