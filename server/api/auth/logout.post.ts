export default defineEventHandler((event) => {
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
  if (token) {
    deleteSession(token)
  }
  return { ok: true }
})
