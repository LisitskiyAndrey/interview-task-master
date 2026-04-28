import type { WsClientOptions, WsConnection } from './ws.types'

export function createWsClient(options: WsClientOptions): WsConnection {
  const ws = new WebSocket(options.url)
  ws.onopen = () => options.onOpen?.()
  ws.onclose = (e) => options.onClose?.(e.code, e.reason)
  ws.onmessage = (e) => options.onRawMessage?.(e.data as string)
  ws.onerror = () => options.onError?.()
  return ws
}
