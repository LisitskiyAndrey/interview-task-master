export type FlightRadarSessionState = {
  subscribedPlaneId: string | null
  reconnectRequestId: number
}

export type FlightRadarSessionActions = {
  subscribeToPlane: (id: string) => void
  unsubscribeFromPlane: () => void
  requestReconnect: () => void
}

export type FlightRadarSessionSlice = FlightRadarSessionState & FlightRadarSessionActions
