function getOptional(key: string, fallback: string): string {
  return (import.meta.env[key] as string | undefined) ?? fallback
}

export const env = {
  wsBaseUrl: getOptional('VITE_WS_BASE_URL', 'ws://localhost:3000'),
} as const
