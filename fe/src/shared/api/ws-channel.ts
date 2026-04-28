import type {
  WsChannelHandle,
  WsChannelOptions,
  WsClientFactory,
  WsConnection,
  WsStatus,
} from './ws.types'
import { createWsClient } from './ws-client'
import { handleError } from '@/shared/errors/error-handler'
import { WsError } from '@/shared/errors/ws-error'
import { logger } from '@/shared/lib/logger'
import { sleep } from '@/shared/lib/sleep'

const WS_OPEN = 1
const NON_RETRYABLE_CLOSE_CODES = new Set([1008])

export function createWsChannel<T>(
  options: WsChannelOptions<T>,
  clientFactory: WsClientFactory = createWsClient,
): WsChannelHandle {
  const {
    url,
    schema,
    onMessage,
    onStatusChange,
    reconnectDelayMs = 3_000,
    maxReconnectAttempts = 5,
  } = options

  let ws: WsConnection | null = null
  let attempts = 0
  let disconnected = false
  let reconnectScheduled = false
  let reconnectGeneration = 0

  function setStatus(status: WsStatus, error: string | null = null): void {
    onStatusChange(status, error)
  }

  function handleRawMessage(data: string): void {
    let raw: unknown
    try {
      raw = JSON.parse(data)
    } catch {
      handleError(new WsError('Received non-JSON message'), 'ws-channel')
      return
    }

    const result = schema.safeParse(raw)
    if (!result.success) {
      handleError(new WsError('Message failed schema validation'), 'ws-channel')
      return
    }
    onMessage(result.data)
  }

  function handleClose(connection: WsConnection, code: number, reason: string): void {
    if (ws !== connection) return
    if (disconnected) return
    ws = null

    if (NON_RETRYABLE_CLOSE_CODES.has(code)) {
      const message = `Connection closed with code ${code}${reason ? `: ${reason}` : ''}`
      handleError(new WsError(message, code), 'ws-channel')
      setStatus('error', message)
      return
    }

    scheduleReconnectAfterFailure()
  }

  function handleSocketError(connection: WsConnection): void {
    if (ws !== connection) return
    if (disconnected) return

    handleError(new WsError('Socket error'), 'ws-channel')
    const currentConnection = ws
    ws = null
    scheduleReconnectAfterFailure()
    currentConnection?.close()
  }

  function scheduleReconnectAfterFailure(): void {
    if (reconnectScheduled) return

    if (attempts >= maxReconnectAttempts) {
      const message = 'Max reconnect attempts reached'
      handleError(new WsError(message), 'ws-channel')
      setStatus('error', message)
      return
    }

    attempts++
    reconnectScheduled = true
    setStatus('reconnecting')
    void scheduleReconnect(reconnectGeneration)
  }

  async function scheduleReconnect(generation: number): Promise<void> {
    await sleep(reconnectDelayMs)
    if (!disconnected && reconnectScheduled && generation === reconnectGeneration) {
      reconnectScheduled = false
      openConnection()
    }
  }

  function openConnection(): void {
    setStatus('connecting')
    const connection = clientFactory({
      url,
      onOpen: () => {
        if (ws !== connection) return
        attempts = 0
        setStatus('connected')
      },
      onClose: (code, reason) => handleClose(connection, code, reason),
      onRawMessage: handleRawMessage,
      onError: () => handleSocketError(connection),
    })
    ws = connection
  }

  function resetReconnectState(): void {
    attempts = 0
    reconnectScheduled = false
    reconnectGeneration++
  }

  return {
    connect() {
      disconnected = false
      resetReconnectState()
      openConnection()
    },
    disconnect() {
      if (disconnected) return
      disconnected = true
      setStatus('closed')
      ws?.close()
      ws = null
    },
    reconnect() {
      disconnected = false
      resetReconnectState()
      const currentConnection = ws
      ws = null
      currentConnection?.close()
      openConnection()
    },
    send(data) {
      if (ws?.readyState === WS_OPEN) {
        ws.send(JSON.stringify(data))
      } else {
        logger.warn('ws-channel: cannot send, socket not open')
      }
    },
  }
}
