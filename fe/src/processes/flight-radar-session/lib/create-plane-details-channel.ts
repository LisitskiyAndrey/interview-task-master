import type { WsChannelHandle, WsStatus } from '@/shared/api/ws.types'
import { createWsChannel } from '@/shared/api/ws-channel'
import type { PlaneDetailed } from '@/entities/plane/model/plane.types'
import { wsPlaneDetailsMessageSchema } from '@/entities/plane/schema/plane.schema'
import { endpoints } from '@/shared/config/endpoints'
import { WS_CONFIG } from '@/shared/config/constants'
import { createReconnectManager } from './reconnect-manager'

export type PlaneDetailsChannelCallbacks = {
  onDetailsUpdate: (details: PlaneDetailed) => void
  onStatusChange: (status: WsStatus, error: string | null) => void
  getSubscribedPlaneId: () => string | null
}

export function createPlaneDetailsChannel(
  callbacks: PlaneDetailsChannelCallbacks,
): WsChannelHandle {
  // channelRef is set immediately after createWsChannel returns.
  // sendSubscribe is only called when status becomes 'connected', which
  // happens after connect() is called — always after this factory returns.
  let channelRef: WsChannelHandle | null = null

  const reconnectManager = createReconnectManager({
    getSubscribedPlaneId: callbacks.getSubscribedPlaneId,
    sendSubscribe: (planeId) => channelRef?.send({ type: 'subscribe', planeId }),
  })

  const channel = createWsChannel({
    url: endpoints.ws.planesDetails,
    schema: wsPlaneDetailsMessageSchema,
    onMessage: (msg) => callbacks.onDetailsUpdate(msg.data),
    onStatusChange: (status, error) => {
      callbacks.onStatusChange(status, error)
      reconnectManager.handleStatusChange(status)
    },
    reconnectDelayMs: WS_CONFIG.reconnectDelayMs,
    maxReconnectAttempts: WS_CONFIG.maxReconnectAttempts,
  })

  channelRef = channel
  return channel
}
