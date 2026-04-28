import { selectBasicConnectionStatus, selectDetailsConnectionStatus } from '@/entities/connection'
import { StatusBadge } from '@/shared/ui/status-badge/status-badge'
import { useAppStore } from '@/processes/shell/store'

export function Topbar() {
  const basicStatus = useAppStore(selectBasicConnectionStatus)
  const detailsStatus = useAppStore(selectDetailsConnectionStatus)
  const requestReconnect = useAppStore((state) => state.requestReconnect)

  return (
    <header className="z-header flex h-header flex-shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-4">
      <div className="flex items-center gap-2">
        <StatusBadge label="Planes" status={basicStatus} />
        <StatusBadge label="Details" status={detailsStatus} />
      </div>

      <button
        type="button"
        onClick={requestReconnect}
        className="rounded border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
      >
        Reconnect WS
      </button>
    </header>
  )
}
