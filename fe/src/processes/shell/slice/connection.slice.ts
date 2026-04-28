import type { AppState } from '@/processes/shell/store.types'
import type { StateCreator } from 'zustand'
import type {
  ConnectionSliceActions,
  ConnectionSliceState,
  ConnectionStatus,
} from '../../../entities/connection/model/connection.types'

export type ConnectionSlice = ConnectionSliceState & ConnectionSliceActions

export const createConnectionSlice: StateCreator<AppState, [], [], ConnectionSlice> = (set) => ({
  basicConnectionStatus: 'idle',
  detailsConnectionStatus: 'idle',
  basicConnectionError: null,
  detailsConnectionError: null,

  setBasicConnectionStatus: (status: ConnectionStatus, error: string | null) =>
    set({ basicConnectionStatus: status, basicConnectionError: error }),

  setDetailsConnectionStatus: (status: ConnectionStatus, error: string | null) =>
    set({ detailsConnectionStatus: status, detailsConnectionError: error }),
})
