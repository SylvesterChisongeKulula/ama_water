/**
 * Contact service — business logic for contact form.
 * Equivalent to services/contact_service.go
 */
export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

// In-memory store for now. Replace with DB or email service.
const messages: ContactMessage[] = []

export function createContactMessage(data: Omit<ContactMessage, 'createdAt'>): ContactMessage {
  const message: ContactMessage = {
    ...data,
    createdAt: new Date(),
  }
  messages.push(message)
  return message
}

export function getAllMessages(): ContactMessage[] {
  return messages
}
