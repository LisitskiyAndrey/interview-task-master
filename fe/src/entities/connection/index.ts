export type {
  ConnectionSliceActions,
  ConnectionSliceState,
  ConnectionStatus,
} from './model/connection.types'

export {
  selectBasicConnectionError,
  selectBasicConnectionStatus,
  selectDetailsConnectionStatus,
} from './model/connection.selectors'
