import type { AppState } from '@/processes/shell/store.types'
import type { StateCreator } from 'zustand'
import type { FlightRadarSessionSlice } from '../../flight-radar-session/model/flight-radar-session.types'

export const createFlightRadarSessionSlice: StateCreator<
  AppState,
  [],
  [],
  FlightRadarSessionSlice
> = (set) => ({
  subscribedPlaneId: null,
  reconnectRequestId: 0,

  subscribeToPlane: (id: string) => set({ subscribedPlaneId: id }),

  unsubscribeFromPlane: () => set({ subscribedPlaneId: null }),

  requestReconnect: () =>
    set((state) => ({
      reconnectRequestId: state.reconnectRequestId + 1,
    })),
})
