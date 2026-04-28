import { RouterProvider } from 'react-router-dom'

import { RouteErrorBoundary } from '@/app/router/route-error-boundary'
import { router } from '@/app/router'
import { Providers } from './providers'

export function App() {
  return (
    <RouteErrorBoundary>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </RouteErrorBoundary>
  )
}
