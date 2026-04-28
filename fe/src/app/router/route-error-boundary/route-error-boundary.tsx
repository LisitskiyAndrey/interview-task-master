import { ErrorCard } from '@/shared/ui/error-card/error-card'
import { handleError } from '@/shared/errors/error-handler'
import { normalizeError } from '@/shared/errors/normalize-error'
import { Button } from 'flowbite-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class RouteErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, _info: ErrorInfo) {
    handleError(normalizeError(error), 'RouteErrorBoundary')
  }

  override render() {
    if (this.state.hasError) {
      return (
        <ErrorCard
          title={'Something went wrong'}
          message={
            'An unexpected error occurred while loading this page. Reloading usually fixes the issue.'
          }
        >
          <Button type="button" onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </ErrorCard>
      )
    }

    return this.props.children
  }
}
