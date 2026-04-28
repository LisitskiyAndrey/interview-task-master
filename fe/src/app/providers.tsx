import { Topbar } from '@/widgets/topbar'
import { Suspense, type ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <span className="text-sm text-muted-foreground">Loading…</span>
        </div>
      }
    >
      <Topbar />
      {children}
    </Suspense>
  )
}
