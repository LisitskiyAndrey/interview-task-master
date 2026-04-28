import { AlertIcon } from '@/shared/ui/icons'
import { Button } from 'flowbite-react'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center">
          <AlertIcon />
        </div>

        <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Error 404
        </p>

        <h1 className="mt-3 text-3xl font-semibold text-foreground">Page not found</h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          The page you are trying to open does not exist, may have been moved, or you may not have
          access to it.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" className="min-w-40">
            Go back
          </Button>
        </div>
      </div>
    </div>
  )
}
