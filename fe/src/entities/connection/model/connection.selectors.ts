import type { ConnectionSliceState, ConnectionStatus } from './connection.types'

export const selectBasicConnectionStatus = (state: ConnectionSliceState): ConnectionStatus =>
  state.basicConnectionStatus

export const selectDetailsConnectionStatus = (state: ConnectionSliceState): ConnectionStatus =>
  state.detailsConnectionStatus

export const selectBasicConnectionError = (state: ConnectionSliceState): string | null =>
  state.basicConnectionError
