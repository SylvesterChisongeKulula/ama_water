/**
 * Server utility: Runtime configuration loader.
 * Access via `useRuntimeConfig()` in server routes.
 * Equivalent to config/config.go
 */
export function getAppConfig() {
  const config = useRuntimeConfig()
  return {
    dbUrl: config.databaseUrl || '',
    appEnv: config.public.appEnv || 'development',
  }
}
