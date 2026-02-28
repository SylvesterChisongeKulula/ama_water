/**
 * POST /api/contact
 * Handles contact form submissions.
 * Equivalent to controllers/contact_controller.go -> Create
 */
import { createContactMessage } from '~~/server/services/contactService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  validateRequired(body.name, 'Name')
  validateRequired(body.email, 'Email')
  validateRequired(body.subject, 'Subject')
  validateRequired(body.message, 'Message')

  if (!validateEmail(body.email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  const message = createContactMessage({
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message,
  })

  return { success: true, message }
})
