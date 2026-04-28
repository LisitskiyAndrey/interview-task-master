import { createConnectionSlice } from '@/processes/shell/slice/connection.slice'
import { createFlightRadarSessionSlice } from '@/processes/shell/slice/flight-radar-session.slice'

import { createPlaneSlice } from '@/processes/shell/slice/plane.slice'
import { create } from 'zustand'
import type { AppState } from './store.types'

export function createAppStore() {
  return create<AppState>()((...args) => ({
    ...createPlaneSlice(...args),
    ...createConnectionSlice(...args),
    ...createFlightRadarSessionSlice(...args),
  }))
}
