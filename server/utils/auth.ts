import * as argon2 from 'argon2'
import { createHash, randomBytes } from 'crypto'

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password)
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  if (stored.startsWith('$argon2')) {
    try {
      return await argon2.verify(stored, password)
    } catch {
      return false
    }
  } else {
    // Legacy support for older sha256 passwords
    const [salt, hash] = stored.split(':')
    if (!salt || !hash) return false
    const check = createHash('sha256').update(salt + password).digest('hex')
    return check === hash
  }
}

/**
 * Simple session token generation.
 */
export function generateToken(): string {
  return randomBytes(32).toString('hex')
}

// In-memory session store (simple approach for dev/small apps)
const sessions = new Map<string, { userId: number; email: string; name: string; expiresAt: number }>()

export function createSession(userId: number, email: string, name: string): string {
  const token = generateToken()
  sessions.set(token, {
    userId,
    email,
    name,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  })
  return token
}

export function getSession(token: string) {
  const session = sessions.get(token)
  if (!session) return null
  if (Date.now() > session.expiresAt) {
    sessions.delete(token)
    return null
  }
  return session
}

export function deleteSession(token: string) {
  sessions.delete(token)
}
