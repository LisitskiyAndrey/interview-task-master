import type { WsStatus } from '@/shared/api/ws.types'

export type ReconnectManagerOptions = {
  getSubscribedPlaneId: () => string | null
  sendSubscribe: (planeId: string) => void
}

export type ReconnectManager = {
  handleStatusChange: (status: WsStatus) => void
}

// Re-subscribes to the currently selected plane after the details channel
// connects or reconnects. Handles the gap between a reconnect and the next
// user-initiated subscribe action.
export function createReconnectManager(options: ReconnectManagerOptions): ReconnectManager {
  const { getSubscribedPlaneId, sendSubscribe } = options

  return {
    handleStatusChange(status) {
      if (status !== 'connected') return
      const planeId = getSubscribedPlaneId()
      if (planeId !== null) sendSubscribe(planeId)
    },
  }
}
