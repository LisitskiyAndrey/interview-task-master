import type { PlaneDetailed } from '@/entities/plane'
import {
  selectSelectedPlaneDetails,
  selectSelectedPlaneId,
} from '@/processes/shell/slice/plane.slice'
import { useAppStore } from '@/processes/shell/store'
import { useCallback } from 'react'

export type UseSelectPlaneReturn = {
  selectedPlaneId: string | null
  selectedDetails: PlaneDetailed | null
  handlePlaneClick: (id: string) => void
  unselectPlane: () => void
}

export function useSelectPlane(): UseSelectPlaneReturn {
  const selectedPlaneId = useAppStore(selectSelectedPlaneId)
  const selectedDetails = useAppStore(selectSelectedPlaneDetails)

  const handlePlaneClick = useCallback((id: string) => {
    const state = useAppStore.getState()

    if (id === state.selectedPlaneId) {
      unselectPlane()
    } else {
      state.selectPlane(id)
      state.subscribeToPlane(id)
    }
  }, [])

  const unselectPlane = useCallback(() => {
    const state = useAppStore.getState()

    state.unselectPlane()
    state.unsubscribeFromPlane()
  }, [])

  return {
    selectedPlaneId,
    selectedDetails,
    handlePlaneClick,
    unselectPlane,
  }
}
