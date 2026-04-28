import type { PlaneBasic } from '@/entities/plane'
import { formatNumber } from '@/shared/lib'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

type PlanesListProps = {
  planes: PlaneBasic[]
  selectedPlaneId: string | null
  handleClick: (plane: PlaneBasic) => void
  isLoading: boolean
}

export function PlanesList({ planes, selectedPlaneId, handleClick, isLoading }: PlanesListProps) {
  const parentRef = useRef<HTMLDivElement | null>(null)

  const virtualizer = useVirtualizer({
    count: planes.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 8,
  })

  return (
    <aside className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-panel backdrop-blur">
      <header className="border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-foreground">Tracked planes</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {isLoading ? 'Waiting for aircraft feed' : `${planes.length} aircraft currently visible`}
        </p>
      </header>

      <div ref={parentRef} className="flex-1 overflow-y-auto p-2">
        {planes.length === 0 ? (
          <div className="flex h-full items-center justify-center px-4 text-center">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Connecting to radar...' : 'No aircraft currently visible'}
            </p>
          </div>
        ) : (
          <div
            style={{
              height: virtualizer.getTotalSize(),
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const plane = planes[virtualItem.index]
              const isSelected = plane.id === selectedPlaneId

              return (
                <div
                  key={plane.id}
                  ref={virtualizer.measureElement}
                  data-index={virtualItem.index}
                  onClick={() => handleClick(plane)}
                  className={[
                    'absolute left-0 right-0 cursor-pointer rounded-lg px-3 py-2 transition-colors',
                    isSelected ? 'bg-muted ring-1 ring-brand-primary' : 'hover:bg-muted/60',
                  ].join(' ')}
                  style={{
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: plane.color }}
                      />

                      <span className="truncate text-sm font-medium text-foreground">
                        {plane.id}
                      </span>
                    </div>

                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {formatNumber(plane.altitude)} ft
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}
