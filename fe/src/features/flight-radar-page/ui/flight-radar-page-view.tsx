import type { ConnectionStatus } from '@/entities/connection'
import type { PlaneBasic } from '@/entities/plane'
import { ErrorCard } from '@/shared/ui/error-card/error-card'

import { useSelectPlane } from '@/features/select-plane'

import { PlaneDetailPanel } from '@/features/flight-radar-page/ui/components/plane-detail-panel'
import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { PlanesList } from './components/planes-list'
import { ReconnectingBanner } from './components/reconnecting-banner'

const INITIAL_LOADING_MIN_MS = 700

const RadarMap = lazy(() =>
  import('@/features/flight-radar-page/ui/components/radar-map/radar-map').then((module) => ({
    default: module.RadarMap,
  })),
)

type FlightRadarPageViewProps = {
  basicStatus: ConnectionStatus
  basicError: string | null
  planes: PlaneBasic[]
}

export function FlightRadarPageView({ basicStatus, basicError, planes }: FlightRadarPageViewProps) {
  const { selectedPlaneId, selectedDetails, handlePlaneClick, unselectPlane } = useSelectPlane()
  const [isInitialLoadLocked, setIsInitialLoadLocked] = useState(true)

  const handleClickPlane = useCallback(
    (plane: PlaneBasic) => {
      handlePlaneClick(plane.id)
    },
    [handlePlaneClick],
  )

  const isInitialLoading = basicStatus === 'idle' || basicStatus === 'connecting'
  const hasConnectionError = basicStatus === 'error' || basicStatus === 'closed'
  const shouldShowInitialLoading = !hasConnectionError && (isInitialLoading || isInitialLoadLocked)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsInitialLoadLocked(false)
    }, INITIAL_LOADING_MIN_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="relative box-border h-[calc(100vh-theme(spacing.header))] w-screen overflow-hidden bg-app p-4">
      {basicStatus === 'reconnecting' && <ReconnectingBanner />}

      <div className="grid h-full grid-cols-[theme(width.sidebar-left)_minmax(0,1fr)] gap-4">
        <PlanesList
          planes={planes}
          selectedPlaneId={selectedPlaneId}
          handleClick={handleClickPlane}
          isLoading={isInitialLoading}
        />

        <main className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
          <Suspense fallback={<RadarMapFallback />}>
            <RadarMap
              planes={planes}
              selectedPlaneId={selectedPlaneId}
              selectedDetails={selectedDetails}
              onPlaneClick={handleClickPlane}
            />
          </Suspense>
        </main>
      </div>
      <AnimatePresence>
        {selectedDetails !== null && (
          <PlaneDetailPanel onClose={unselectPlane} details={selectedDetails} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shouldShowInitialLoading && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface px-5 py-4 shadow-panel">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand-primary" />
              <p className="text-sm text-muted-foreground">Connecting to radar...</p>
            </div>
          </motion.div>
        )}

        {hasConnectionError && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="w-full max-w-md">
              <ErrorCard
                title="Connection failed"
                message={basicError ?? 'Could not connect to the radar feed.'}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function RadarMapFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand-primary" />
    </div>
  )
}
