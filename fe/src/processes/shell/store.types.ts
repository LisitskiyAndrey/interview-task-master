import type { FlightRadarSessionSlice } from '@/processes/flight-radar-session/model/flight-radar-session.types'
import type { ConnectionSlice } from '@/processes/shell/slice/connection.slice'

import type { PlaneSlice } from '@/processes/shell/slice/plane.slice'

export type AppState = PlaneSlice & ConnectionSlice & FlightRadarSessionSlice
