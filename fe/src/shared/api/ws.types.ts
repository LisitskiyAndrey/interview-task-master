export type WsStatus = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'error' | 'closed'

export type WsClientOptions = {
  url: string
  onOpen?: () => void
  onClose?: (code: number, reason: string) => void
  onRawMessage?: (data: string) => void
  onError?: () => void
}

export interface WsConnection {
  readonly readyState: number
  send(data: string): void
  close(): void
}

export type WsClientFactory = (options: WsClientOptions) => WsConnection

export interface ParseableSchema<T> {
  safeParse(data: unknown): { success: true; data: T } | { success: false; error: unknown }
}

export type WsChannelOptions<T> = {
  url: string
  schema: ParseableSchema<T>
  onMessage: (message: T) => void
  onStatusChange: (status: WsStatus, error: string | null) => void
  reconnectDelayMs?: number
  maxReconnectAttempts?: number
}

export type WsChannelHandle = {
  connect: () => void
  disconnect: () => void
  reconnect: () => void
  send: (data: unknown) => void
}
