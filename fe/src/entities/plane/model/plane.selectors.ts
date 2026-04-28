import type { PlaneDetailed, PlaneStatus } from './plane.types'

const STATUS_LABELS: Record<PlaneStatus, string> = {
  departed: 'Departed',
  enroute: 'En Route',
  cruising: 'Cruising',
  landing: 'Landing',
}

export function getPlaneStatusLabel(status: PlaneStatus): string {
  return STATUS_LABELS[status]
}

export function getOccupancyRatio(
  plane: Pick<PlaneDetailed, 'numberOfPassengers' | 'maxPassengers'>,
): number {
  if (plane.maxPassengers === 0) return 0
  return plane.numberOfPassengers / plane.maxPassengers
}
