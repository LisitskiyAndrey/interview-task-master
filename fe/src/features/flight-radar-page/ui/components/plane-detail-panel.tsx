import type { PlaneDetailed } from '@/entities/plane'
import { getOccupancyRatio, getPlaneStatusLabel } from '@/entities/plane'

import { formatDatetime, formatDecimal, formatNumber, formatSignedNumber } from '@/shared/lib'
import { motion } from 'framer-motion'
import { DetailRow } from './detail-row'

type PlaneDetailPanelProps = {
  details: PlaneDetailed
  onClose: () => void
}

export function PlaneDetailPanel({ details, onClose }: PlaneDetailPanelProps) {
  const occupancy = Math.round(getOccupancyRatio(details) * 100)

  return (
    <motion.aside
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="absolute bottom-0 right-0 top-0 z-10 flex w-sidebar-left flex-col overflow-y-auto border-l border-border bg-surface shadow-panel"
    >
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-4">
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">{details.airline}</p>
          <p className="truncate text-xl font-semibold text-foreground">{details.flightNumber}</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{details.id}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close plane details"
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col divide-y divide-border">
        <DetailRow label="Aircraft" value={details.model} />
        <DetailRow label="Registration" value={details.registration} />
        <DetailRow label="Status" value={getPlaneStatusLabel(details.status)} />
        <DetailRow label="Altitude" value={`${formatNumber(details.altitude)} ft`} />
        <DetailRow label="Speed" value={`${formatNumber(details.speed)} kts`} />
        <DetailRow label="Heading" value={`${formatNumber(details.heading)}°`} />
        <DetailRow
          label="Vertical speed"
          value={`${formatSignedNumber(details.verticalSpeed)} ft/min`}
        />
        <DetailRow label="Flight duration" value={`${details.flightDuration} min`} />
        <DetailRow label="Estimated arrival" value={formatDatetime(details.estimatedArrival)} />
        <DetailRow
          label="Position"
          value={`${formatDecimal(details.latitude)}, ${formatDecimal(details.longitude)}`}
        />
      </div>

      <div className="border-t border-border px-4 py-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Route
        </p>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">{details.origin.airport}</p>
            <p className="text-xs text-muted-foreground">{details.origin.city}</p>
          </div>
          <span className="mt-1 text-xs text-muted-foreground">→</span>
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">{details.destination.airport}</p>
            <p className="text-xs text-muted-foreground">{details.destination.city}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Passengers
        </p>
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-sm text-foreground">
            {details.numberOfPassengers} / {details.maxPassengers}
          </span>
          <span className="text-xs text-muted-foreground">{occupancy}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-[width]"
            style={{
              width: `${occupancy}%`,
              backgroundColor: details.color,
            }}
          />
        </div>
      </div>
    </motion.aside>
  )
}
