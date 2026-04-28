import { type PlaneBasic, type PlaneDetailed } from '@/entities/plane'
import {
  ANIMATION_DURATION,
  DEFAULT_CENTER,
  DEFAULT_DURATION,
  DEFAULT_ZOOM,
  SELECTED_PLANE_ZOOM,
} from '@/features/flight-radar-page/ui/components/radar-map/constatns'
import {
  createPlanePopupContent,
  createPlanesGeoJson,
  easeOutCubic,
  lerp,
} from '@/features/flight-radar-page/ui/components/radar-map/helper'
import maplibregl, { type GeoJSONSource } from 'maplibre-gl'
import { useEffect, useRef, useState } from 'react'
import './styles.css'

type RadarMapProps = {
  planes: PlaneBasic[]
  selectedPlaneId: string | null
  selectedDetails: PlaneDetailed | null
  onPlaneClick: (plane: PlaneBasic) => void
}

export function RadarMap({
  planes,
  selectedPlaneId,
  selectedDetails,
  onPlaneClick,
}: RadarMapProps) {
  const [isReady, setIsReady] = useState(false)
  const renderedPlanesRef = useRef<Record<string, PlaneBasic>>({})
  const animationFrameRef = useRef<number | null>(null)
  const popupRef = useRef<maplibregl.Popup | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const isLoadedRef = useRef(false)
  const planesRef = useRef<PlaneBasic[]>(planes)
  const onPlaneClickRef = useRef(onPlaneClick)
  const focusedPlaneIdRef = useRef<string | null>(null)

  planesRef.current = planes
  onPlaneClickRef.current = onPlaneClick

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    })

    mapRef.current = map
    map.addControl(new maplibregl.NavigationControl(), 'top-right')

    map.on('load', () => {
      isLoadedRef.current = true
      setIsReady(true)

      map.addSource('planes', {
        type: 'geojson',
        data: createPlanesGeoJson(planesRef.current),
      })

      map.addLayer({
        id: 'planes-layer',
        type: 'circle',
        source: 'planes',
        paint: {
          'circle-radius': 7,
          'circle-color': ['get', 'color'],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      })

      map.addLayer({
        id: 'selected-plane-layer',
        type: 'circle',
        source: 'planes',
        filter: ['==', ['get', 'id'], ''],
        paint: {
          'circle-radius': 13,
          'circle-color': 'transparent',
          'circle-stroke-width': 3,
          'circle-stroke-color': '#111827',
        },
      })

      map.on('click', 'planes-layer', (event) => {
        const id = event.features?.[0]?.properties?.id
        const plane = planesRef.current.find((item) => item.id === id)

        if (plane) onPlaneClickRef.current(plane)
      })

      map.on('mouseenter', 'planes-layer', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'planes-layer', () => {
        map.getCanvas().style.cursor = ''
      })
    })

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      popupRef.current?.remove()
      popupRef.current = null

      isLoadedRef.current = false
      setIsReady(false)
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current

    if (!map || !isLoadedRef.current) return

    const source = map.getSource('planes') as GeoJSONSource | undefined
    if (!source) return

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    const fromPlanes = renderedPlanesRef.current
    const toPlanes = Object.fromEntries(planes.map((plane) => [plane.id, plane]))

    const startedAt = performance.now()

    function animate(now: number) {
      const rawProgress = Math.min((now - startedAt) / ANIMATION_DURATION, 1)
      const progress = easeOutCubic(rawProgress)

      const animatedPlanes = planes.map((targetPlane) => {
        const fromPlane = fromPlanes[targetPlane.id] ?? targetPlane

        return {
          ...targetPlane,
          latitude: lerp(fromPlane.latitude, targetPlane.latitude, progress),
          longitude: lerp(fromPlane.longitude, targetPlane.longitude, progress),
        }
      })

      renderedPlanesRef.current = Object.fromEntries(
        animatedPlanes.map((plane) => [plane.id, plane]),
      )

      source?.setData(createPlanesGeoJson(animatedPlanes))

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        renderedPlanesRef.current = toPlanes
        animationFrameRef.current = null
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [planes])

  useEffect(() => {
    const map = mapRef.current

    if (!map || !isLoadedRef.current) return

    popupRef.current?.remove()
    popupRef.current = null

    if (!selectedPlaneId) {
      focusedPlaneIdRef.current = null
      map.setFilter('selected-plane-layer', ['==', ['get', 'id'], ''])

      map.flyTo({
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        duration: DEFAULT_DURATION,
        essential: true,
      })

      return
    }

    if (!selectedDetails) return

    map.setFilter('selected-plane-layer', ['==', ['get', 'id'], selectedPlaneId])

    popupRef.current = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 18,
      className: 'plane-map-popup',
    })
      .setLngLat([selectedDetails.longitude, selectedDetails.latitude])
      .setDOMContent(createPlanePopupContent(selectedDetails))
      .addTo(map)

    if (focusedPlaneIdRef.current !== selectedPlaneId) {
      focusedPlaneIdRef.current = selectedPlaneId

      map.flyTo({
        center: [selectedDetails.longitude, selectedDetails.latitude],
        zoom: Math.max(map.getZoom(), SELECTED_PLANE_ZOOM),
        duration: DEFAULT_DURATION,
        essential: true,
      })
    }
  }, [selectedPlaneId, selectedDetails])

  return (
    <div className="relative h-full w-full bg-muted">
      <div
        ref={containerRef}
        className={[
          'h-full w-full transition-opacity duration-500 ease-out',
          isReady ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand-primary" />
        </div>
      )}
    </div>
  )
}
