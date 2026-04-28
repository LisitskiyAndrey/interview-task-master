import { AlertIcon } from '@/shared/ui/icons'
import clsx from 'clsx'
import type { ReactNode } from 'react'

interface IProps {
  title?: string | undefined
  message: ReactNode
  className?: string
  children?: ReactNode
}

export function ErrorCard({
  title = 'Something went wrong',
  message,
  children,
  className,
}: IProps) {
  return (
    <div
      className={clsx(
        'flex items-start gap-3 rounded-lg border border-status-failed-fg/20 bg-status-failed-bg/30 p-3',
        className,
      )}
    >
      <div className="text-danger">
        <AlertIcon className="w-[1.5em]" />
      </div>

      <div className={clsx('flex flex-col', message && 'gap-0.5')}>
        <span className="text-sm font-medium text-danger">{title}</span>
        {message && <span className="text-center text-sm text-danger/80">{message}</span>}

        {children && <div className={'pt-4'}>{children && children}</div>}
      </div>
    </div>
  )
}
