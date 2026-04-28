export type ConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error'
  | 'closed'

export type ConnectionSliceState = {
  basicConnectionStatus: ConnectionStatus
  detailsConnectionStatus: ConnectionStatus
  basicConnectionError: string | null
  detailsConnectionError: string | null
}

export type ConnectionSliceActions = {
  setBasicConnectionStatus: (status: ConnectionStatus, error: string | null) => void
  setDetailsConnectionStatus: (status: ConnectionStatus, error: string | null) => void
}
