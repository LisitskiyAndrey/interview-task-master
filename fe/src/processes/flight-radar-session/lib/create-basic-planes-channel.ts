import type { WsChannelHandle, WsStatus } from '@/shared/api/ws.types'
import { createWsChannel } from '@/shared/api/ws-channel'
import type { PlaneBasic } from '@/entities/plane/model/plane.types'
import { wsPlanesMessageSchema } from '@/entities/plane/schema/plane.schema'
import { endpoints } from '@/shared/config/endpoints'
import { WS_CONFIG, PLANE_CONFIG } from '@/shared/config/constants'
import { createMessageBuffer } from './message-buffer'
import { createFlushScheduler } from './flush-scheduler'

export type BasicPlanesChannelCallbacks = {
  onPlanesUpdate: (planes: PlaneBasic[]) => void
  onStatusChange: (status: WsStatus, error: string | null) => void
}

export function createBasicPlanesChannel(callbacks: BasicPlanesChannelCallbacks): WsChannelHandle {
  const buffer = createMessageBuffer<PlaneBasic[]>()

  const scheduler = createFlushScheduler(PLANE_CONFIG.basicUpdateIntervalMs, () => {
    const planes = buffer.flush()
    if (planes !== null) callbacks.onPlanesUpdate(planes)
  })

  return createWsChannel({
    url: endpoints.ws.planesBasic,
    schema: wsPlanesMessageSchema,
    onMessage: (msg) => buffer.push(msg.data),
    onStatusChange: (status, error) => {
      callbacks.onStatusChange(status, error)

      if (status === 'connected') {
        scheduler.start()
      } else if (status === 'reconnecting' || status === 'closed' || status === 'error') {
        scheduler.stop()
        buffer.clear()
      }
    },
    reconnectDelayMs: WS_CONFIG.reconnectDelayMs,
    maxReconnectAttempts: WS_CONFIG.maxReconnectAttempts,
  })
}
