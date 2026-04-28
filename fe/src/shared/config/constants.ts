export const WS_CONFIG = {
  reconnectDelayMs: 3_000,
  maxReconnectAttempts: Number.POSITIVE_INFINITY,
} as const

export const PLANE_CONFIG = {
  defaultCount: 20,
  basicUpdateIntervalMs: 1_000,
  detailedUpdateIntervalMs: 1_000,
} as const
