/**
 * Server middleware: Request logger.
 * Equivalent to middleware/ in Go backend.
 * Runs on every server request.
 */
export default defineEventHandler((event) => {
  const method = event.method
  const path = getRequestURL(event).pathname
  console.log(`[${new Date().toISOString()}] ${method} ${path}`)
})
