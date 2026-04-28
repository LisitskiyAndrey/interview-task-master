import type { PlaneBasic, PlaneDetailed } from '@/entities/plane'
import { formatNumber } from '@/shared/lib'

export function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress
}

export function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3)
}

export function createPlanesGeoJson(planes: PlaneBasic[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: planes.map((plane) => ({
      type: 'Feature',
      properties: {
        id: plane.id,
        color: plane.color,
      },
      geometry: {
        type: 'Point',
        coordinates: [plane.longitude, plane.latitude],
      },
    })),
  }
}

export function createPlanePopupContent(details: PlaneDetailed): HTMLElement {
  const root = document.createElement('div')
  root.className = 'plane-popup'

  const header = document.createElement('div')
  header.className = 'plane-popup__header'

  const dot = document.createElement('span')
  dot.className = 'plane-popup__dot'
  dot.style.backgroundColor = details.color

  const title = document.createElement('div')
  title.className = 'plane-popup__title'
  title.textContent = details.flightNumber || details.id

  const airline = document.createElement('div')
  airline.className = 'plane-popup__airline'
  airline.textContent = details.airline || 'Unknown airline'

  const meta = document.createElement('div')
  meta.className = 'plane-popup__meta'

  const altitude = document.createElement('span')
  altitude.textContent = `${formatNumber(details.altitude)} ft`

  const speed = document.createElement('span')
  speed.textContent = `${formatNumber(details.speed)} kts`

  header.append(dot, title)
  meta.append(altitude, speed)
  root.append(header, airline, meta)

  return root
}
