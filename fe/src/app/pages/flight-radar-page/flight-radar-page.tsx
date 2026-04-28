import { selectBasicConnectionError, selectBasicConnectionStatus } from '@/entities/connection'
import type { FlightRadarSession } from '@/processes/flight-radar-session'
import { createFlightRadarSession } from '@/processes/flight-radar-session'
import { selectPlanesList } from '@/processes/shell/slice/plane.slice'
import { useAppStore } from '@/processes/shell/store'
import { useEffect, useRef } from 'react'
import { FlightRadarPageView } from '../../../features/flight-radar-page/ui/flight-radar-page-view'

export function FlightRadarPage() {
  const sessionRef = useRef<FlightRadarSession | null>(null)

  if (sessionRef.current === null) {
    sessionRef.current = createFlightRadarSession()
  }

  useEffect(() => {
    const session = sessionRef.current
    if (session === null) return
    session.start()
    return () => {
      session.stop()
    }
  }, [])

  const basicStatus = useAppStore(selectBasicConnectionStatus)
  const basicError = useAppStore(selectBasicConnectionError)
  const planes = useAppStore(selectPlanesList)

  return <FlightRadarPageView basicError={basicError} basicStatus={basicStatus} planes={planes} />
}
