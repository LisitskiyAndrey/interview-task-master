import type { ConnectionStatus } from '@/entities/connection'

const STATUS_TEXT: Record<ConnectionStatus, string> = {
  idle: 'Idle',
  connecting: 'Connecting',
  connected: 'Live',
  reconnecting: 'Reconnecting',
  error: 'Error',
  closed: 'Closed',
}

type StatusBadgeProps = {
  label: string
  status: ConnectionStatus
}

export function StatusBadge({ label, status }: StatusBadgeProps) {
  const textColor =
    status === 'connected'
      ? 'text-success'
      : status === 'error'
        ? 'text-danger'
        : status === 'reconnecting'
          ? 'text-warning'
          : 'text-muted-foreground'

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium shadow-sm">
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${textColor}`} />
      <span className="text-muted-foreground">{label}</span>
      <span className={textColor}>{STATUS_TEXT[status]}</span>
    </div>
  )
}
