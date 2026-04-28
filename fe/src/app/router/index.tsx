import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const NotFoundPage = lazy(() => import('@/app/pages/not-found/NotFoundPage'))
const FlightRadarPage = lazy(() =>
  import('@/app/pages/flight-radar-page/flight-radar-page').then((module) => ({
    default: module.FlightRadarPage,
  })),
)

export const router = createBrowserRouter([
  { path: '/', element: <FlightRadarPage /> },
  { path: '*', element: <NotFoundPage /> },
])
