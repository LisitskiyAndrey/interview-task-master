import { useAppStore } from '@/processes/shell/store'
import { createBasicPlanesChannel } from './create-basic-planes-channel'
import { createPlaneDetailsChannel } from './create-plane-details-channel'

export type FlightRadarSession = {
  start: () => void
  stop: () => void
  reconnect: () => void
  subscribeToPlane: (planeId: string) => void
  unsubscribeFromPlane: () => void
}

export function createFlightRadarSession(): FlightRadarSession {
  const store = useAppStore

  const basicChannel = createBasicPlanesChannel({
    onPlanesUpdate: (planes) => store.getState().setPlanes(planes),
    onStatusChange: (status, error) => store.getState().setBasicConnectionStatus(status, error),
  })

  const detailsChannel = createPlaneDetailsChannel({
    onDetailsUpdate: (details) => store.getState().setPlaneDetails(details),
    onStatusChange: (status, error) => store.getState().setDetailsConnectionStatus(status, error),
    getSubscribedPlaneId: () => store.getState().subscribedPlaneId,
  })

  let started = false
  let unsubscribeStore: (() => void) | null = null

  return {
    start() {
      if (started) return
      started = true

      basicChannel.connect()
      detailsChannel.connect()

      // Reactively send a subscribe message whenever the selected plane changes.
      // If the channel is not yet open, send() is a no-op; the reconnect manager
      // handles re-subscribing once the connection is established.
      unsubscribeStore = store.subscribe((state, prevState) => {
        if (state.reconnectRequestId !== prevState.reconnectRequestId) {
          basicChannel.reconnect()
          detailsChannel.reconnect()
          return
        }

        if (state.subscribedPlaneId !== prevState.subscribedPlaneId) {
          const planeId = state.subscribedPlaneId
          if (planeId !== null) detailsChannel.send({ type: 'subscribe', planeId })
        }
      })
    },

    stop() {
      if (!started) return
      started = false

      basicChannel.disconnect()
      detailsChannel.disconnect()
      unsubscribeStore?.()
      unsubscribeStore = null
    },

    reconnect() {
      basicChannel.reconnect()
      detailsChannel.reconnect()
    },

    subscribeToPlane(planeId) {
      store.getState().subscribeToPlane(planeId)
      // Store subscription above fires synchronously and sends the WS message.
    },

    unsubscribeFromPlane() {
      store.getState().unsubscribeFromPlane()
    },
  }
}
